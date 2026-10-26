## Description
Provide a concise, declarative summary of what changes for the user and maintainer.

## pstack Invariant Checklist
- [ ] Prose follows unslop standards (short sentences, no em-dashes `—`, no mid-sentence colons, no conversational filler)
- [ ] Reproducible runtime evidence or test included for any bug fix
- [ ] `npm test` passes with 0 errors
- [ ] No subagents have `enableSubagentTools: true` (DAG preserved)
- [ ] `AGENTS.md` remains under 400 words (~300 tokens)
