# Agent Tuneup

1. Agents don't inherit skills by default, but if you want that a agent will inherit specific skills, you can set the skills flag:

```yaml
skills:
    - code-reviewer
```

2. You also can set effort parameter:

```yaml
effort: low | medium | high
model: haiku
```

3. You can set if the agent should always run on background by setting the background flag to true:

```yaml
background: true
```

4. Run agent in isolated mode in a seperate work tree: (usecase: Experimental refactor)

```yaml
isolation: worktree
```

5. /insights command help you to find out where you are lacking using Claude.

6. claude --agent <subagent-name>

```bash
claude --agent <subagent-name>
```

Then deleigate task to that claude agent. this will be reduce loading the agent every time you want to use it.

7. you can also set hooks inside agent if you need by adding a hooks scection to the agent:

```yaml
hooks:
    PostToolUse:
        - matcher: "Read"
          hooks:
            - type: "command"
              command: "echo 'Read tool was used'"
```