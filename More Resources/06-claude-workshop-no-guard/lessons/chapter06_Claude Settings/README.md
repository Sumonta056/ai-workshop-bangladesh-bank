# Claude Settings

In this section, we will explore the various settings available in Claude and how to configure them to optimize your experience. Claude environment variables will allow your to customize the behavior of Claude and tailor it to your specific needs.

## Official Documentation

All of the claude code settings and environment variables are recorded in following website:

- [Environment Variables Documentation](https://code.claude.com/docs/en/env-vars)
- [Available Settings Documentation](https://code.claude.com/docs/en/settings#available-settings)

## Global Claude Settings

Use global claude settings to apply common settings across all your projects.

```bash
code ~/.claude/settings.json
```

## Examaple settings for environment:

```json
"env": {
    "cleanupPeriodDays": "120",
    "BASH_MAX_OUTPUT_LENGTH": "150000", 
},
```

Default value for cleanupPeriodDays is 30 days.  
Default value for BASH_MAX_OUTPUT_LENGTH is 30000.

## Environment Variables

1. **cleanupPeriodDays**  
    Sessions inactive for longer than this period are deleted at startup (default: 30 days). Setting to 0 deletes all existing transcripts at startup and disables session persistence entirely. No new .jsonl files are written, /resume shows no conversations, and hooks receive an empty transcript_path.

2. **BASH_MAX_OUTPUT_LENGTH**  
    Maximum number of characters in bash outputs before they are middle-truncated.

3. **CLAUDE_CODE_FILE_READ_MAX_OUTPUT_TOKENS**  
    Override the default token limit for file reads. Useful when you need to read larger files in full. Default 25000 tokens. Change it to **100000** for larger file for 1M context window size models.

4. **CLAUDE_AUTOCOMPACT_PCT_OVERRIDE**  
    Calude auto compact override. Set the percentage of context capacity (1-100) at which auto-compaction triggers. By default, auto-compaction triggers at approximately 95% capacity. Use lower values like 50 to compact earlier. Values above the default threshold have no effect. Applies to both main conversations and subagents. This percentage aligns with the context_window.used_percentage field available in status line.

```json
"CLAUDE_AUTOCOMPACT_PCT_OVERRIDE" : "75"
```

5. **Experimental feature 'Agent Team'**

```text
Set to 1 to enable agent teams. Agent teams are experimental and disabled by default

"CLAUDE_CODE_EXPERIMENTAL_AGENT_TEAMS" : "1"
```

More info: [Agent Teams Documentation](https://code.claude.com/docs/en/agent-teams)


6. **Disable analytics for claude code:**

```text
"DISABLE_TELEMETRY": "1"
"DISABLE_ERROR_REPORTING": "1"
"CLAUDE_CODE_DISABLE_FEEDBACK_SURVEY": "1"
```

