#!/usr/bin/env python3
"""
acl_analyzer.py — Detect shadowed rules, duplicates, and overly permissive
entries in a simple Cisco IOS extended ACL.

Usage:
    python scripts/acl_analyzer.py --file acls/acl-101.txt

This is a teaching-grade analyzer: it understands proto/src/dst/port well
enough to show the concept of rule shadowing. Standard library only.
"""
import argparse
import re


def parse_rule(line):
    """Parse an extended ACL line into a normalized dict, or None."""
    line = line.strip()
    m = re.match(
        r"access-list\s+(\d+)\s+(permit|deny)\s+(\S+)\s+(.*)$", line
    )
    if not m:
        return None
    _, action, proto, rest = m.groups()
    tokens = rest.split()

    def take_endpoint(toks):
        if not toks:
            return ("any", toks)
        if toks[0] == "any":
            return ("any", toks[1:])
        if toks[0] == "host":
            return (f"host {toks[1]}", toks[2:])
        # addr wildcard
        if len(toks) >= 2:
            return (f"{toks[0]} {toks[1]}", toks[2:])
        return (toks[0], toks[1:])

    src, tokens = take_endpoint(tokens)
    # optional src port (skip eq X)
    if tokens[:1] == ["eq"]:
        tokens = tokens[2:]
    dst, tokens = take_endpoint(tokens)
    dport = None
    if tokens[:1] == ["eq"]:
        dport = tokens[1] if len(tokens) > 1 else None

    return {
        "action": action,
        "proto": proto,
        "src": src,
        "dst": dst,
        "dport": dport,
        "raw": line,
    }


def covers(broad, specific):
    """Does rule `broad` fully cover (shadow) `specific`?"""
    def proto_covers(a, b):
        return a == "ip" or a == b
    def ep_covers(a, b):
        return a == "any" or a == b
    def port_covers(a, b):
        return a is None or a == b
    return (
        proto_covers(broad["proto"], specific["proto"])
        and ep_covers(broad["src"], specific["src"])
        and ep_covers(broad["dst"], specific["dst"])
        and port_covers(broad["dport"], specific["dport"])
    )


def main():
    ap = argparse.ArgumentParser()
    ap.add_argument("--file", required=True)
    args = ap.parse_args()

    rules = []
    with open(args.file, encoding="utf-8") as fh:
        for i, line in enumerate(fh, 1):
            if not line.strip():
                continue
            r = parse_rule(line)
            if r:
                r["line"] = i
                rules.append(r)

    print(f"Parsed {len(rules)} ACL entries from {args.file}\n")

    issues = []

    # shadowing + duplicates
    for idx, r in enumerate(rules):
        for prev in rules[:idx]:
            if covers(prev, r):
                if (prev["action"], prev["proto"], prev["src"], prev["dst"], prev["dport"]) == \
                   (r["action"], r["proto"], r["src"], r["dst"], r["dport"]):
                    issues.append(
                        (r["line"], "DUPLICATE",
                         f"line {r['line']} duplicates line {prev['line']}")
                    )
                else:
                    issues.append(
                        (r["line"], "SHADOWED",
                         f"line {r['line']} is shadowed by line {prev['line']} "
                         f"('{prev['action']} {prev['proto']} {prev['src']} {prev['dst']}')")
                    )
                break

    # overly permissive
    for r in rules:
        if r["action"] == "permit" and r["proto"] == "ip" and r["src"] == "any" and r["dst"] == "any":
            issues.append((r["line"], "PERMISSIVE",
                           f"line {r['line']} permits ALL IP any->any (very broad)"))

    if not issues:
        print("No issues found.")
        return

    print(f"{'LINE':<6}{'TYPE':<12}DETAIL")
    print("-" * 70)
    for ln, typ, detail in sorted(issues):
        print(f"{ln:<6}{typ:<12}{detail}")

    print("\nReminder: in IOS, ACL entries are evaluated top-down, first match wins.")


if __name__ == "__main__":
    main()
