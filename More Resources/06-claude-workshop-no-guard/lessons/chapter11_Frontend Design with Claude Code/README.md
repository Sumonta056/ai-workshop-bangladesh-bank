## Chapter 12: Frontend Design with Claude Code

In this chapter, we will explore reliable ways to convert frontend design into code.

### We will cover

1. Google Stitch MCP server and Stitch Skills for design-to-code workflows

```bash
# install the stitch MCP server and replace api key from stitch website

claude mcp add stitch --transport http https://stitch.googleapis.com/mcp --header "X-Goog-Api-Key: api-key" -s project
```

```bash
# List all available skills in this repository

npx skills add google-labs-code/stitch-skills --list
```


References:

https://stitch.withgoogle.com/docs/mcp/setup
https://github.com/google-labs-code/stitch-skills


