# Architecture Overview: pstack-antigravity

`pstack-antigravity` adapts Lauren Tan (@poteto)'s SpaceX-inspired engineering playbooks to Google Antigravity.

## Architectural Pillars
1. **Hierarchical Discovery:** Discovers `.agents/skills/` and `.agents/rules/` walking up to the workspace root.
2. **Progressive Disclosure:** Inlines frontmatter metadata initially; loads skill bodies only when activated.
3. **Directed Acyclic Graph (DAG):** Subagents enforce `"enableSubagentTools": false`, eliminating recursive loops.
4. **Interactive Proceed Gates:** Generates Antigravity Plan Artifacts with `RequestFeedback: true`.
5. **Isolated Worktrees:** Delegates execute in `Workspace: "branch"` background workspaces.
