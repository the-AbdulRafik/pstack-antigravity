# Directed Acyclic Graph (DAG) Subagent Governance

To prevent recursive loops where subagents spawn other subagents endlessly:
* All subagents enforce `"enableSubagentTools": false`.
* Audit subagents enforce `"enableWriteTools": false`.
* Only the root coordinator session is permitted to orchestrate and spawn delegates.
