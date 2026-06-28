#!/usr/bin/env python3
"""
subnet_planner.py — Carve a parent network into equal subnets and print
usable range, gateway (first host), and broadcast for each.

Usage:
    python scripts/subnet_planner.py 10.50.0.0/22 --prefix 26
    python scripts/subnet_planner.py 10.50.0.0/22 --prefix 26 --label mgmt voice data guest

Standard library only.
"""
import argparse
import ipaddress


def main():
    ap = argparse.ArgumentParser()
    ap.add_argument("network", help="parent network, e.g. 10.50.0.0/22")
    ap.add_argument("--prefix", type=int, required=True, help="new prefix length, e.g. 26")
    ap.add_argument("--label", nargs="*", default=[], help="optional labels for first N subnets")
    args = ap.parse_args()

    parent = ipaddress.ip_network(args.network, strict=False)
    if args.prefix <= parent.prefixlen:
        raise SystemExit(f"--prefix must be longer than parent /{parent.prefixlen}")

    subnets = list(parent.subnets(new_prefix=args.prefix))
    print(f"Parent {parent} -> {len(subnets)} x /{args.prefix} subnets\n")
    print(f"{'#':<4}{'Subnet':<20}{'Gateway':<16}{'Usable range':<34}{'Broadcast':<16}Label")
    print("-" * 110)

    for i, s in enumerate(subnets):
        hosts = list(s.hosts())
        if hosts:
            gw = hosts[0]
            usable = f"{hosts[0]} - {hosts[-1]}"
        else:
            gw = "-"
            usable = "(no usable hosts)"
        bcast = s.broadcast_address
        label = args.label[i] if i < len(args.label) else ""
        print(f"{i:<4}{str(s):<20}{str(gw):<16}{usable:<34}{str(bcast):<16}{label}")


if __name__ == "__main__":
    main()
