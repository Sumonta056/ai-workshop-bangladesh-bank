# NetDevOps Demo — Claude Code for Network Engineers

A small, **fully runnable** project that shows how a networking engineer can use
Claude / Claude Code day-to-day. Everything here runs **offline with zero
installs** (Python standard library only). The only parts that need extra
packages or real gear are clearly marked **LIVE mode**.

Built around a tiny fake network:

```
        ISP-A                         ISP-B
          |                             |
     edge-rtr01  --- 10.0.0.0/30 --- edge-rtr02
          |                             |
     core-sw01  ---trunk---  core-sw02
          |
      dist-sw01
```

## What's inside

```
netdevops-demo/
├── README.md
├── requirements.txt          # only for LIVE mode
├── inventory.csv             # device list
├── configs/                  # 5 sample device configs (seeded with issues)
│   ├── core-sw01.cfg ...
├── logs/
│   └── syslog-collector.log  # contains a simulated flap incident ~14:00–14:30
├── acls/
│   └── acl-101.txt           # has shadowed + duplicate + permissive rules
├── scripts/
│   ├── config_audit.py       # audit configs -> markdown report   (stdlib)
│   ├── log_triage.py         # find flaps, build timeline          (stdlib)
│   ├── acl_analyzer.py       # detect shadowed/duplicate rules      (stdlib)
│   ├── subnet_planner.py     # carve a network into subnets         (stdlib)
│   ├── collect_facts.py      # netmiko collector w/ offline sim
│   ├── add_ntp.yml           # Ansible playbook template (LIVE)
│   └── hosts.ini             # Ansible inventory template (LIVE)
└── output/                   # reports/artifacts land here
```

## Quick start (no installs needed)

From the project root:

```bash
# 1. Audit every config for security/hygiene issues
python scripts/config_audit.py --dir configs --out output/audit_report.md

# 2. Triage the syslog and zoom into the incident window
python scripts/log_triage.py --file logs/syslog-collector.log --from 14:00 --to 14:30

# 3. Find shadowed / overly-permissive ACL rules
python scripts/acl_analyzer.py --file acls/acl-101.txt

# 4. Plan IP space: carve a /22 into /26 blocks with labels
python scripts/subnet_planner.py 10.50.0.0/22 --prefix 26 --label mgmt voice data guest

# 5. "Collect" show output from every device — simulated from configs
python scripts/collect_facts.py --offline
```

### What you should see

- **config_audit** flags plaintext `enable password`, telnet on VTY, default
  SNMP communities (`public`/`private`), disabled password encryption, and
  interfaces with no description — summarized per device in a Markdown table.
- **log_triage** spots `edge-rtr01 Gi0/0` flapping 5× and correlates the
  downstream BGP resets on `core-sw01`, then prints a root-cause hint.
- **acl_analyzer** shows that `permit ip any any` on line 1 shadows every rule
  below it, plus the duplicate `443` permit.
- **subnet_planner** prints subnet / gateway / usable range / broadcast per block.
- **collect_facts** writes per-device `show` output into `output/facts/`.

## Going LIVE (real devices)

```bash
pip install -r requirements.txt
export NET_USER=netadmin
export NET_PASS='your-password'        # or use SSH keys

python scripts/collect_facts.py --live --command "show ip interface brief"
```

Ansible NTP push — **always dry-run first**:

```bash
ansible-galaxy collection install cisco.ios
ansible-playbook -i scripts/hosts.ini scripts/add_ntp.yml --check --diff   # preview
ansible-playbook -i scripts/hosts.ini scripts/add_ntp.yml                  # apply
```

> Safety: never push to production without `--check` + a config backup, and keep
> credentials in env vars / Ansible Vault — never in the scripts.

## How this maps to using Claude Code

The point isn't these exact scripts — it's that you describe the goal in plain
language and Claude Code writes, runs, and iterates on the tooling against your
real files. Prompts to try inside this folder:

| Goal | Prompt to Claude Code |
|------|----------------------|
| Extend the audit | "Add a check to `config_audit.py` for any VTY line missing `login local`, severity HIGH." |
| New incident view | "In `log_triage.py`, add a `--device` filter and a count of total flaps per hour." |
| Build a diff tool | "Write a script that compares `show ip bgp summary` across devices and lists neighbors Established on one side but down on the other." |
| Config-as-code | "Set up a git pre-commit hook that runs `config_audit.py` and blocks the commit if any HIGH finding exists." |
| Generate config | "From `subnet_planner.py` output for 10.50.0.0/22 /26, generate IOS DHCP pool config for the mgmt and voice blocks." |

## Notes
- All offline scripts are standard-library only; tested on Python 3.10+.
- Sample IPs use documentation ranges (RFC 5737 / RFC 1918) on purpose.
- The configs are intentionally imperfect so the tools have something to find.
