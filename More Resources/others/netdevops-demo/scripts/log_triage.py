#!/usr/bin/env python3
"""
log_triage.py — Stream a syslog file, find interface up/down and BGP
adjacency changes, count flaps per device, and print an incident timeline.

Usage:
    python scripts/log_triage.py --file logs/syslog-collector.log
    python scripts/log_triage.py --file logs/syslog-collector.log --from 14:00 --to 14:30

Streams line-by-line, so it works on very large files without loading
everything into memory. Standard library only.
"""
import argparse
import re
from collections import defaultdict

LINE_RE = re.compile(
    r"^(?P<mon>\w{3})\s+(?P<day>\d+)\s+(?P<time>\d{2}:\d{2}:\d{2})\s+"
    r"(?P<host>\S+)\s+%(?P<facility>[\w-]+):\s*(?P<msg>.*)$"
)


def in_window(t, start, end):
    if not start and not end:
        return True
    if start and t < start:
        return False
    if end and t > end:
        return False
    return True


def main():
    ap = argparse.ArgumentParser()
    ap.add_argument("--file", required=True)
    ap.add_argument("--from", dest="start", default=None, help="HH:MM")
    ap.add_argument("--to", dest="end", default=None, help="HH:MM")
    args = ap.parse_args()

    start = args.start + ":00" if args.start else None
    end = args.end + ":59" if args.end else None

    link_flaps = defaultdict(int)   # (host, iface) -> down count
    bgp_flaps = defaultdict(int)    # (host, neighbor) -> down count
    timeline = []

    with open(args.file, encoding="utf-8", errors="replace") as fh:
        for line in fh:
            m = LINE_RE.match(line.strip())
            if not m:
                continue
            t = m.group("time")
            if not in_window(t, start, end):
                continue
            host = m.group("host")
            msg = m.group("msg")

            mi = re.search(r"Interface (\S+?),? changed state to (up|down)", msg)
            if mi:
                iface, state = mi.group(1).rstrip(","), mi.group(2)
                if state == "down":
                    link_flaps[(host, iface)] += 1
                timeline.append((t, host, f"LINK {iface} -> {state}"))
                continue

            mb = re.search(r"neighbor (\S+) (Up|Down)", msg)
            if mb:
                nbr, state = mb.group(1), mb.group(2)
                if state == "Down":
                    bgp_flaps[(host, nbr)] += 1
                timeline.append((t, host, f"BGP {nbr} -> {state}"))

    print("=" * 60)
    print("INTERFACE FLAPS (down events)")
    print("=" * 60)
    if link_flaps:
        for (host, iface), n in sorted(link_flaps.items(), key=lambda x: -x[1]):
            flag = "  <-- FLAPPING" if n >= 3 else ""
            print(f"  {host:12} {iface:24} {n} down event(s){flag}")
    else:
        print("  none")

    print("\n" + "=" * 60)
    print("BGP ADJACENCY DROPS")
    print("=" * 60)
    if bgp_flaps:
        for (host, nbr), n in sorted(bgp_flaps.items(), key=lambda x: -x[1]):
            print(f"  {host:12} neighbor {nbr:18} {n} drop(s)")
    else:
        print("  none")

    print("\n" + "=" * 60)
    print("TIMELINE" + (f"  ({args.start or 'start'} - {args.end or 'end'})" if (start or end) else ""))
    print("=" * 60)
    for t, host, ev in timeline:
        print(f"  {t}  {host:12} {ev}")

    # crude root-cause hint
    print("\n" + "=" * 60)
    print("HINT")
    print("=" * 60)
    worst_link = max(link_flaps.items(), key=lambda x: x[1], default=None)
    if worst_link and worst_link[1] >= 3:
        (host, iface), n = worst_link
        print(f"  {host} {iface} flapped {n}x. Downstream BGP resets likely")
        print(f"  follow this physical interface (cabling/SFP/ISP circuit).")
    else:
        print("  No single dominant flapping interface detected.")


if __name__ == "__main__":
    main()
