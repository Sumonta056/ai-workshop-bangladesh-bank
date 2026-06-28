#!/usr/bin/env python3
"""
config_audit.py — Scan a folder of Cisco-style .cfg files for common
security and hygiene issues, and write a Markdown report.

Usage:
    python scripts/config_audit.py --dir configs --out output/audit_report.md

No external dependencies (standard library only).
"""
import argparse
import glob
import os
import re


def audit_file(path):
    """Return (hostname, list_of_findings) for one config file."""
    with open(path, encoding="utf-8", errors="replace") as fh:
        lines = fh.readlines()

    text = "".join(lines)
    hostname = "unknown"
    m = re.search(r"^hostname\s+(\S+)", text, re.MULTILINE)
    if m:
        hostname = m.group(1)

    findings = []

    # 1. Plaintext enable password (instead of enable secret)
    if re.search(r"^enable password\s", text, re.MULTILINE):
        findings.append(("HIGH", "Plaintext 'enable password' in use (use 'enable secret')"))

    # 2. Password encryption disabled
    if re.search(r"^no service password-encryption", text, re.MULTILINE):
        findings.append(("MEDIUM", "'service password-encryption' is disabled"))

    # 3. Telnet enabled on VTY
    for i, ln in enumerate(lines, 1):
        if "transport input" in ln and "telnet" in ln:
            findings.append(("HIGH", f"Telnet enabled on VTY (line {i}): {ln.strip()}"))

    # 4. Weak SNMP communities
    for i, ln in enumerate(lines, 1):
        m = re.search(r"snmp-server community\s+(\S+)", ln)
        if m and m.group(1).lower() in ("public", "private"):
            findings.append(("HIGH", f"Default SNMP community '{m.group(1)}' (line {i})"))

    # 5. Interfaces with no description
    iface = None
    has_desc = False
    body_seen = False

    def flush(iface, has_desc, body_seen):
        # only flag real, configured interfaces (some config under them)
        if iface and body_seen and not has_desc:
            findings.append(("LOW", f"Interface {iface} has no description"))

    for ln in lines:
        stripped = ln.rstrip("\n")
        if re.match(r"^interface\s+", stripped):
            flush(iface, has_desc, body_seen)
            iface = stripped.split(None, 1)[1]
            has_desc = False
            body_seen = False
        elif iface is not None:
            if stripped.startswith(" "):
                body_seen = True
                if "description" in stripped:
                    has_desc = True
            elif stripped and not stripped.startswith("!"):
                flush(iface, has_desc, body_seen)
                iface = None
    flush(iface, has_desc, body_seen)

    return hostname, findings


def main():
    ap = argparse.ArgumentParser()
    ap.add_argument("--dir", default="configs", help="folder of .cfg files")
    ap.add_argument("--out", default="output/audit_report.md")
    args = ap.parse_args()

    files = sorted(glob.glob(os.path.join(args.dir, "*.cfg")))
    if not files:
        print(f"No .cfg files found in {args.dir}")
        return

    os.makedirs(os.path.dirname(args.out) or ".", exist_ok=True)

    total = 0
    out = ["# Network Config Audit Report", ""]
    out.append(f"Scanned **{len(files)}** device(s) in `{args.dir}/`.\n")

    summary_rows = []
    detail_blocks = []

    for f in files:
        host, findings = audit_file(f)
        total += len(findings)
        sev_counts = {"HIGH": 0, "MEDIUM": 0, "LOW": 0}
        for sev, _ in findings:
            sev_counts[sev] += 1
        summary_rows.append(
            f"| {host} | {sev_counts['HIGH']} | {sev_counts['MEDIUM']} | {sev_counts['LOW']} |"
        )

        detail_blocks.append(f"### {host}  (`{os.path.basename(f)}`)\n")
        if not findings:
            detail_blocks.append("No issues found.\n")
        else:
            detail_blocks.append("| Severity | Finding |")
            detail_blocks.append("|----------|---------|")
            for sev, msg in sorted(findings, key=lambda x: {"HIGH": 0, "MEDIUM": 1, "LOW": 2}[x[0]]):
                detail_blocks.append(f"| {sev} | {msg} |")
            detail_blocks.append("")

    out.append("## Summary\n")
    out.append("| Device | HIGH | MEDIUM | LOW |")
    out.append("|--------|------|--------|-----|")
    out.extend(summary_rows)
    out.append("")
    out.append(f"**Total findings: {total}**\n")
    out.append("## Details\n")
    out.extend(detail_blocks)

    report = "\n".join(out)
    with open(args.out, "w", encoding="utf-8") as fh:
        fh.write(report)

    print(report)
    print(f"\n[+] Report written to {args.out}")


if __name__ == "__main__":
    main()
