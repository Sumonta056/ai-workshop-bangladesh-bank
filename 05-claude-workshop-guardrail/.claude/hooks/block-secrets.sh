#!/bin/bash
# Guardrail 4 — Stop AI accessing env & secrets.
# Wired via settings.json: hooks.PreToolUse -> matcher "Read"
INPUT=$(cat)
FILE=$(echo "$INPUT" | jq -r '.tool_input.file_path')
case "$FILE" in
  *.env|*.env.*|*/secrets/*|*/customer/*)
    echo "Blocked: secret file" >&2
    exit 2 ;;   # 2 = deny the call
esac
