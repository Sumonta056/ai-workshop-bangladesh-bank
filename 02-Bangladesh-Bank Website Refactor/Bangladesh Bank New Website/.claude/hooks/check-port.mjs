#!/usr/bin/env node
/**
 * PostToolUse hook — runs after Edit/Write/MultiEdit.
 * Flags design-tool syntax that was copied from the source HTML but never
 * ported to Vue. These tokens are valid in the DC design runtime but are bugs
 * in a Nuxt component, so we surface them back to the agent (exit 2).
 */
import { readFileSync } from 'node:fs'

let raw = ''
try {
  raw = readFileSync(0, 'utf8') // stdin
} catch {
  process.exit(0)
}

let payload
try {
  payload = JSON.parse(raw)
} catch {
  process.exit(0)
}

const filePath =
  payload?.tool_input?.file_path || payload?.tool_input?.filePath || ''
if (!filePath || !/\.(vue|ts)$/.test(filePath)) process.exit(0)

let content = ''
try {
  content = readFileSync(filePath, 'utf8')
} catch {
  process.exit(0)
}

const forbidden = [
  { re: /style-hover\s*=/, msg: 'style-hover="..." (convert to a scoped :hover rule)' },
  { re: /<sc-(for|if)\b/, msg: '<sc-for>/<sc-if> (use v-for / v-if)' },
  { re: /onClick\s*=\s*"\{\{/, msg: 'onClick="{{ }}" (use @click)' },
  { re: /hint-placeholder-(count|val)/, msg: 'hint-placeholder-* attribute (design-tool only, remove it)' },
  { re: /\bdangerouslySetInnerHTML\b/, msg: 'dangerouslySetInnerHTML (React-ism, use v-html)' },
]

const hits = forbidden.filter((f) => f.re.test(content)).map((f) => f.msg)
if (hits.length) {
  console.error(
    `[port-check] ${filePath} still contains design-tool syntax:\n` +
      hits.map((h) => `  - ${h}`).join('\n')
  )
  process.exit(2)
}
process.exit(0)
