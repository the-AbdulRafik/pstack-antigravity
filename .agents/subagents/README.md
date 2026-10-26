# Sandboxed Subagents Directory

This directory defines the native subagents used by `pstack-antigravity`.

## Directed Acyclic Graph (DAG) Rule
To prevent runaway recursive loops where subagents spawn other subagents endlessly:
* **All subagents must have `"enableSubagentTools": false`.**
* Only the root coordinator session is permitted to orchestrate and spawn delegates.

## Tool Permissions
* **`poteto-agent`:** Read/Write in isolated git workspaces (`Workspace: "branch"`).
* **`comment-sicko`:** Read/Write, restricted to comment and dead-code deletion.
* **`thermo-nuclear-review`:** **Read-Only** (`"enableWriteTools": false`).
* **`thermo-nuclear-code-quality`:** **Read-Only** (`"enableWriteTools": false`).
