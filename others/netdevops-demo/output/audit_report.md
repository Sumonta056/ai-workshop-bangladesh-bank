# Network Config Audit Report

Scanned **5** device(s) in `configs/`.

## Summary

| Device | HIGH | MEDIUM | LOW |
|--------|------|--------|-----|
| core-sw01 | 4 | 1 | 2 |
| core-sw02 | 0 | 0 | 2 |
| dist-sw01 | 3 | 1 | 5 |
| edge-rtr01 | 3 | 1 | 2 |
| edge-rtr02 | 0 | 0 | 1 |

**Total findings: 25**

## Details

### core-sw01  (`core-sw01.cfg`)

| Severity | Finding |
|----------|---------|
| HIGH | Plaintext 'enable password' in use (use 'enable secret') |
| HIGH | Telnet enabled on VTY (line 16): transport input telnet ssh |
| HIGH | Default SNMP community 'public' (line 12) |
| HIGH | Default SNMP community 'private' (line 13) |
| MEDIUM | 'service password-encryption' is disabled |
| LOW | Interface GigabitEthernet0/2 has no description |
| LOW | Interface GigabitEthernet0/3 has no description |

### core-sw02  (`core-sw02.cfg`)

| Severity | Finding |
|----------|---------|
| LOW | Interface GigabitEthernet0/2 has no description |
| LOW | Interface GigabitEthernet0/3 has no description |

### dist-sw01  (`dist-sw01.cfg`)

| Severity | Finding |
|----------|---------|
| HIGH | Plaintext 'enable password' in use (use 'enable secret') |
| HIGH | Telnet enabled on VTY (line 13): transport input telnet ssh |
| HIGH | Default SNMP community 'public' (line 10) |
| MEDIUM | 'service password-encryption' is disabled |
| LOW | Interface Vlan10 has no description |
| LOW | Interface GigabitEthernet0/1 has no description |
| LOW | Interface GigabitEthernet0/2 has no description |
| LOW | Interface GigabitEthernet0/3 has no description |
| LOW | Interface GigabitEthernet0/4 has no description |

### edge-rtr01  (`edge-rtr01.cfg`)

| Severity | Finding |
|----------|---------|
| HIGH | Plaintext 'enable password' in use (use 'enable secret') |
| HIGH | Telnet enabled on VTY (line 13): transport input telnet |
| HIGH | Default SNMP community 'public' (line 10) |
| MEDIUM | 'service password-encryption' is disabled |
| LOW | Interface GigabitEthernet0/1 has no description |
| LOW | Interface GigabitEthernet0/2 has no description |

### edge-rtr02  (`edge-rtr02.cfg`)

| Severity | Finding |
|----------|---------|
| LOW | Interface GigabitEthernet0/1 has no description |
