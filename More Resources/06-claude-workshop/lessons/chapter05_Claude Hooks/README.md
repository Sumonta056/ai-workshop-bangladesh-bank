### Creating a hook is a powerful way to automate tasks and enforce standards in your projects. In this example, we'll create a hook that automatically formats any file that Claude Code writes or edits using Prettier.

---

```
Update:

The old way of adding hooks via /hooks is deprecated. Instead, you should now add hooks via the settings.json file at either the project or user level.
```
---

### Step 1: Open your project's hook settings:

```
# Project-level (shared with team via git)
.claude/settings.json (If there is none create one)

# Or user-level (applies to all projects)
~/.claude/settings.json (If there is none create one)
```

### Step 2: Add this configuration:

```
{
  "hooks": {
    "PostToolUse": [
      {
        "matcher": "Write|Edit",
        "hooks": [
          {
            "type": "command",
            "command": "jq -r '.tool_input.file_path' | xargs npx prettier --write 2>/dev/null; exit 0"
          }
        ]
      }
    ]
  }
}
```

### Step 3: That's it. Every file Claude Code writes or edits now gets auto-formatted.

## What's happening:

Claude Code writes a file (triggers PostToolUse for Write or Edit tools)
Hook receives JSON with the file path via stdin
jq extracts the path, Prettier formats the file
exit 0 ensures the hook never blocks Claude Code (even if Prettier fails on a non-supported file)
Verify it works: Ask Claude Code to create any file. Check git diff — you'll see Prettier's formatting applied automatically.



### Alternative (Adding via Claude):

You can also add hooks via Claude itself. Just ask it to "Add following hook & paste following code" Claude will handle the rest.

```
Following hook will block any dangerous commands in bash scripts.
```

```                                                                                                       
{                                                                                                                               
  "hooks": {                                                                                                                    
    "PreToolUse": [                                                                                                             
      {                                                                                                                         
        "matcher": "Bash",                                                                                                      
        "hooks": [                                                                                                              
          {                                                                                                                     
            "type": "command",                                                                                                  
            "command": "bash -c 'CMD=$(jq -r \".tool_input.command\" <<< \"$(cat)\"); for p in \"rm -rf /\" \"rm -rf ~\" \"drop 
 table\" \"DROP TABLE\" \"truncate\" \"TRUNCATE\" \"--force\" \"push.*--force\"; do if echo \"$CMD\" | grep -qiE \"$p\"; then   
echo \"Blocked: pattern \\\"$p\\\" detected\" >&2; exit 2; fi; done; exit 0'"                                                   
          }                                                                                                                     
        ]                                                                                                                       
      }                                                                                                                         
    ]                                                                                                                           
  }                                                                                                                             
}   
```

```
Tip:

You don't need to have a hooks command ready to add hook. Just ask Claude to generate the hook configuration and your intent is enough for it to add the hook for you.
```

---

### Test It Out

After adding either hook, try these prompts with Claude Code to see them in action:

**Testing the Prettier hook (PostToolUse):**

```
Create a file called test.js with a poorly formatted function:
function hello(  ){console.log(   "hello"  );return true}
```

> After Claude creates the file, check `git diff` — you'll see Prettier automatically cleaned up the formatting.

**Testing the dangerous command blocker (PreToolUse):**

```
Run this command: rm -rf /
```

> Claude will attempt to run it, but the hook will intercept and block it before execution. You should see output like:
>
> `BLOCKED: pattern "rm -rf /" detected`
>
> The command never actually runs — the PreToolUse hook exits with code 2, which stops the tool.

**More dangerous commands to test (all should be blocked):**

```
Run: rm -rf ~
```

```
Run: git push --force
```

```
Run: DROP TABLE users
```

> Each of these will be caught and blocked by the hook. Try them one at a time to see the blocking message for each pattern.

---
