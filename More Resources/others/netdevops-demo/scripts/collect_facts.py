#!/usr/bin/env python3
"""
collect_facts.py — Connect to devices in inventory.csv and save 'show'
command output per device.

Two modes:
  --offline   (default for this demo) Simulates device responses by reading
              the local configs/ folder, so you can run the whole pipeline
              WITHOUT any real network gear or the netmiko package installed.

  --live      Uses netmiko to SSH to real devices. Requires:
                pip install netmiko
              and real reachable devices + credentials (env vars below).

Live-mode credentials come from environment variables (never hardcode):
    export NET_USER=netadmin
    export NET_PASS=...           # or use SSH keys

Usage:
    python scripts/collect_facts.py --offline
    python scripts/collect_facts.py --live --command "show ip interface brief"
"""
import argparse
import csv
import os
import re

COMMANDS = [
    "show ip interface brief",
    "show ip bgp summary",
]


def simulate(host, command, cfg_dir):
    """Produce believable output from the device's .cfg (offline mode)."""
    path = os.path.join(cfg_dir, f"{host}.cfg")
    if not os.path.exists(path):
        return f"% no local config for {host}"
    text = open(path, encoding="utf-8", errors="replace").read()

    if "interface" in command:
        rows = ["Interface                  IP-Address      OK? Method Status                Protocol"]
        cur = None
        ip = "unassigned"
        for ln in text.splitlines():
            m = re.match(r"^interface\s+(\S+)", ln)
            if m:
                if cur:
                    rows.append(f"{cur:26} {ip:15} YES manual up                    up")
                cur, ip = m.group(1), "unassigned"
            mi = re.search(r"ip address (\S+)", ln)
            if mi and cur:
                ip = mi.group(1)
        if cur:
            rows.append(f"{cur:26} {ip:15} YES manual up                    up")
        return "\n".join(rows)

    if "bgp" in command:
        rows = ["Neighbor        V     AS  State/PfxRcd"]
        for ln in text.splitlines():
            m = re.search(r"neighbor (\S+) remote-as (\d+)", ln)
            if m:
                rows.append(f"{m.group(1):15} 4  {m.group(2):>5}  Established")
        if len(rows) == 1:
            rows.append("% BGP not active")
        return "\n".join(rows)

    return f"% unsupported simulated command: {command}"


def run_live(host, ip, dtype, command, user, password):
    from netmiko import ConnectHandler  # imported lazily so offline mode needs no install
    conn = ConnectHandler(
        device_type=dtype,
        host=ip,
        username=user,
        password=password,
    )
    out = conn.send_command(command)
    conn.disconnect()
    return out


def main():
    ap = argparse.ArgumentParser()
    ap.add_argument("--inventory", default="inventory.csv")
    ap.add_argument("--configs", default="configs")
    ap.add_argument("--outdir", default="output/facts")
    ap.add_argument("--command", default=None, help="single command (default: built-in set)")
    mode = ap.add_mutually_exclusive_group()
    mode.add_argument("--offline", action="store_true", help="simulate from configs (default)")
    mode.add_argument("--live", action="store_true", help="SSH to real devices via netmiko")
    args = ap.parse_args()

    live = args.live
    commands = [args.command] if args.command else COMMANDS

    os.makedirs(args.outdir, exist_ok=True)

    user = os.environ.get("NET_USER", "")
    password = os.environ.get("NET_PASS", "")
    if live and not user:
        raise SystemExit("Live mode needs NET_USER / NET_PASS environment variables.")

    with open(args.inventory, newline="") as fh:
        devices = list(csv.DictReader(fh))

    for d in devices:
        host = d["host"]
        for cmd in commands:
            if live:
                try:
                    out = run_live(host, d["ip"], d["type"], cmd, user, password)
                except Exception as e:  # noqa: BLE001
                    out = f"% ERROR connecting to {host}: {e}"
            else:
                out = simulate(host, cmd, args.configs)

            safe = cmd.replace(" ", "_")
            fpath = os.path.join(args.outdir, f"{host}__{safe}.txt")
            with open(fpath, "w", encoding="utf-8") as out_fh:
                out_fh.write(out + "\n")
            print(f"[+] {host:12} {cmd:28} -> {fpath}")
            print("    " + out.replace("\n", "\n    "))
            print()


if __name__ == "__main__":
    main()
