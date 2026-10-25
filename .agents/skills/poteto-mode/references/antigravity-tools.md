# Google Antigravity Tool Mapping for pstack

pstack skills originated with Cursor and Claude Code tool semantics (`AskUserQuestion`, the `Agent` tool, `TaskCreate`/`TaskUpdate`, `opus`/`sonnet` model names). 

In Google Antigravity, the skills and playbooks operate through Antigravity's native agentic runtime and Gemini model family. This document defines the exact platform mapping for tools, execution models, and workspace isolation.

---

## 1. Tool Action Mappings

| Upstream / Claude Action | Google Antigravity Native Equivalent | Architecture & Notes |
| :--- | :--- | :--- |
| **Ask the human a question** (`AskUserQuestion`) | `ask_question` | Renders an interactive modal in the UI with discrete selectable options and custom write-in fallback. |
| **Dispatch a subagent** (`Agent` / `Task`) | `invoke_subagent` | Dispatches specialized subagents with explicit `Role`, `Prompt`, and `Model`. |
| **Workspace Isolation** | `Workspace: "branch"` or `"share"` | Spawns workers inside an isolated git branch or worktree, preventing working copy clobbering. |
| **Background Execution** | Agent Manager | Reactive wakeups notify the orchestrator when subagents or commands complete without polling loops. |
| **Plan & Step Checkpoint** (`todo.md`) | Antigravity Plan Artifact | Generated via `write_file` with `ArtifactMetadata: { RequestFeedback: true }` (interactive Proceed Gate). |
| **File Read** | `read_file` | Direct byte/line ranged read. |
| **File Create / Edit** | `write_file` / `edit_file` | Strict drop-in replacement with regex/exact target verification. |
| **Run Shell Command** | `run_command` | Executes in workspace shell (PowerShell/Bash) with background task fallback (`WaitMsBeforeAsync`). |
| **Web Search** | `search_web` | Native Grounded Google Search. |

---

## 2. Gemini Model Tier Configuration

In Google Antigravity, model tiers map to the Gemini family:

| pstack Role Tier | Upstream Slugs | Antigravity Model Mapping | Antigravity Flag |
| :--- | :--- | :--- | :--- |
| **Strongest Judgment** | `fable` / `gpt-6-astra` | Gemini 3.8 Pro or Gemini 3.8 Flash (High Reasoning) | `Model: "pro"` or `Model: "inherit"` |
| **Coordinator & Default** | `opus` / `gpt-6-sol` | Gemini 3.8 Flash (High Reasoning Effort) | `Model: "inherit"` |
| **Worker / Coding** | `sonnet` / `gpt-6-sol` | Gemini 3.8 Flash | `Model: "flash"` |
| **Linter / Sweeper** | `haiku` / `gpt-6-luna` | Gemini 3.8 Flash Lite | `Model: "flash_lite"` |
| **Diverse Review Panel** | Multi-vendor | Gemini Pro + Flash + Flash Lite | Panels in `arena`, `architect`, `interrogate` |

---

## 3. Subagent Governance & Directed Acyclic Graph (DAG)

To prevent infinite recursion, subagents are strictly leaf nodes:
1. `poteto-agent`: General code-writing worker. Executes in isolated `Workspace: "branch"`.
2. `comment-sicko`: Aggressive comment and suppression remover. Runs on `Model: "flash_lite"`.
3. `thermo-nuclear-review`: Read-only audit gate. Cannot spawn subagents (`EnableSubagentTools: false`) and cannot mutate files (`EnableWriteTools: false`).
