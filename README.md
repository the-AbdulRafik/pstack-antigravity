# pstack-antigravity

<div align="center">

[![License: MIT](https://img.shields.io/badge/License-MIT-blue.svg)](LICENSE)
[![Antigravity](https://img.shields.io/badge/Google-Antigravity%20Native-4285F4.svg)](https://antigravity.google)
[![Tests](https://img.shields.io/badge/Tests-Passing%20(100%25)-success.svg)](evals/)
[![Model: Gemini 3.8 Flash](https://img.shields.io/badge/Model-Gemini%203.8%20Flash-orange.svg)](#gemini-flash-first-architecture)
[![PRs Welcome](https://img.shields.io/badge/PRs-welcome-brightgreen.svg)](CONTRIBUTING.md)

**Lauren Tan ([@poteto](https://github.com/poteto))'s SpaceX-inspired engineering playbooks and skills, natively ported for the Google Antigravity agentic workspace.**

[Installation](#installation) • [Architecture](#architecture) • [Quickstart](#quickstart) • [24 Principles](#the-24-engineering-principles) • [23 Playbooks](#the-23-operational-playbooks) • [Subagents](#sandboxed-subagent-dag) • [Attribution](#attribution--lineage)

</div>

---

## Overview

Modern AI coding assistants suffer from severe bad habits: they patch symptoms with defensive `if (!x) return` guards, hallucinate completion without running code, clutter repositories with corpse comments, and pester developers with trivial technical forks.

**`pstack-antigravity`** eliminates AI slop by applying the **SpaceX 5-Step Engineering Algorithm** (*1. Question requirements → 2. Delete parts → 3. Simplify → 4. Accelerate cycle time → 5. Automate*) to agentic workflows inside Google Antigravity.

Originally developed for Cursor by Lauren Tan and researched across harnesses by Michael Denyer, this port brings the complete pstack discipline natively to **Google Antigravity 2.0**.

---

## Key Highlights

* **First-Class Artifacts & Proceed Gates:** Multi-step plans and checkpoints render an interactive **Proceed** button in the Antigravity UI (`RequestFeedback: true`) before code is touched.
* **Isolated Git Workspaces (`Workspace: "branch"`):** Subagents write and compile code in isolated background branches, preventing dirty working copies.
* **Gemini Flash-First Architecture:** Tuned specifically for **Gemini 3.8 Flash (High Reasoning Effort)** for coordination and adversarial audits, with **Flash Lite** for ultra-fast comment stripping. Zero paid Pro or Argon tier required.
* **Zero Recursion (Directed Acyclic Graph):** Subagents are strictly leaf nodes (`enableSubagentTools: false`) with read-only gates on auditors.
* **Protected Context Budget:** Enforces a compact workspace invariants rule (`AGENTS.md` < 400 words / ~300 tokens), preserving the dedicated 20,000-token rules budget for deep pair programming.

---

## Architecture

```text
  Developer Prompt: "/poteto-mode fix race condition"
                         │
                         ▼
┌─────────────────────────────────────────────────────────────┐
│ Phase 1: Progressive Disclosure (Context Protected)         │
│  • Antigravity scans .agents/skills/ index (under 600 tok)  │
│  • Matches intent to target playbook & engineering skills   │
└────────────────────────┬────────────────────────────────────┘
                         │
                         ▼
┌─────────────────────────────────────────────────────────────┐
│ Phase 2: Interactive Plan & Proceed Gate                    │
│  • Enforces SpaceX engineering invariants (AGENTS.md)       │
│  • Writes standalone reproduction test to prove bug exists  │
│  • Emits Plan Artifact with interactive [Proceed] button    │
└────────────────────────┬────────────────────────────────────┘
                         │ (Developer clicks Proceed)
                         ▼
┌─────────────────────────────────────────────────────────────┐
│ Phase 3: Isolated Subagent Execution (Leaf DAG)             │
│  ┌───────────────────────────────────────────────────────┐  │
│  │ poteto-agent (Gemini Flash, Workspace: "branch")      │  │
│  │ Fixes root cause cleanly in isolated git branch       │  │
│  └──────────────────────────┬────────────────────────────┘  │
│                             ▼                               │
│  ┌───────────────────────────────────────────────────────┐  │
│  │ comment-sicko (Gemini Flash Lite, Fast AST Sweep)     │  │
│  │ Deletes corpse code, excuse comments & dead paths     │  │
│  └──────────────────────────┬────────────────────────────┘  │
│                             ▼                               │
│  ┌───────────────────────────────────────────────────────┐  │
│  │ thermo-nuclear-review (Read-Only Security Auditor)    │  │
│  │ Audits diff for regressions, leaks & security holes   │  │
│  └───────────────────────────────────────────────────────┘  │
└────────────────────────┬────────────────────────────────────┘
                         │
                         ▼
        VERDICT: PASS → Clean Diff & Merged Report
```

---

## Installation

You can install `pstack-antigravity` into your workspace in seconds using any of these methods:

### Method 1: One-Line `npx` Command (Recommended)
Navigate to your project root in your terminal and run:
```bash
# Install to current project (.agents/)
npx pstack-antigravity

# Or install globally for all Antigravity projects
npx pstack-antigravity --global
```

### Method 2: Antigravity Native Plugin CLI
```bash
agy plugin install the-AbdulRafik/pstack-antigravity
```

### Method 3: Direct Git Clone
Simply clone or copy the `.agents/` folder into your repository root:
```bash
git clone https://github.com/the-AbdulRafik/pstack-antigravity.git .pstack-temp
cp -r .pstack-temp/.agents ./
rm -rf .pstack-temp
```

---

## Quickstart

Once installed in your project root, open Google Antigravity and start working:

```text
/poteto-mode Fix the authentication timeout race condition on reload
```

### What Happens Automatically:
1. **Playbook Matching:** `poteto-mode` matches the task to `playbooks/bug-fix.md`.
2. **Repro Test Written First:** The agent writes a standalone reproduction script to prove the defect exists before touching application code.
3. **Interactive Plan Artifact:** Emits an interactive plan with `RequestFeedback: true`. Click **Proceed** in the chat canvas to authorize execution.
4. **Isolated Worker:** Dispatches `poteto-agent` in an isolated git branch (`Workspace: "branch"`).
5. **Comment Stripper:** Dispatches `comment-sicko` to eliminate corpse code, excuse comments, and useless suppressions.
6. **Independent Review Gate:** Dispatches `thermo-nuclear-review` (read-only audit gate) to guarantee zero regressions before reporting completion.

---

## The 24 Engineering Principles

All 24 principles reside under individual directories in `.agents/skills/principle-*/` and are pulled on demand:

| Category | Principles |
| :--- | :--- |
| **Core Engineering (10)** | `laziness-protocol`, `foundational-thinking`, `redesign-from-first-principles`, `attack-the-premise`, `subtract-before-you-add`, `minimize-reader-load`, `outcome-oriented-execution`, `experience-first`, `exhaust-the-design-space`, `build-the-lever` |
| **Architecture (6)** | `model-the-domain`, `boundary-discipline`, `type-system-discipline`, `make-operations-idempotent`, `migrate-callers-then-delete-legacy-apis`, `separate-before-serializing-shared-state` |
| **Verification (5)** | `prove-it-works`, `fix-root-causes`, `sequence-verifiable-units`, `test-behavior-not-implementation`, `explain-the-number` |
| **Delegation & Meta (3)** | `guard-the-context-window`, `never-block-on-the-human`, `encode-lessons-in-structure` |

---

## The 23 Operational Playbooks

Located in `.agents/skills/poteto-mode/playbooks/`:

* **Diagnostics & Forensics:** `investigation.md`, `bug-fix.md`, `perf-issue.md`, `runtime-forensics.md`, `trace-forensics.md`
* **Development & Execution:** `feature.md`, `refactoring.md`, `prototype.md`, `visual-parity.md`, `hillclimb.md`
* **Autonomous & Programs:** `autonomous-run.md`, `orchestrate.md`, `autopilot-full.md`, `autopilot-stack.md`, `multi-phase-plan.md`
* **Delivery & Shipping:** `babysit.md`, `shipping.md`, `opening-a-pr.md`, `session-pickup.md`, `pause-safely.md`
* **System Maintenance:** `worktree-cleanup.md`, `authoring-a-skill.md`, `eval.md`

---

## Sandboxed Subagent DAG

To prevent runaway recursive loops where subagents spawn other subagents, all subagents enforce a strict **Directed Acyclic Graph (DAG)** topology:

| Subagent | Role | Model Tier | Tools & Permissions |
| :--- | :--- | :--- | :--- |
| **`poteto-agent`** | Worker Delegate | `Gemini 3.8 Flash` | `Workspace: "branch"`, Read/Write, `enableSubagentTools: false` |
| **`comment-sicko`** | Comment Stripper | `Gemini 3.8 Flash Lite` | AST / Comment sweep, Read/Write, `enableSubagentTools: false` |
| **`thermo-nuclear-review`** | Security Auditor | `Gemini 3.8 Flash (High)` | **Read-Only** (`enableWriteTools: false`), `enableSubagentTools: false` |
| **`thermo-nuclear-code-quality`** | 1k-Line Auditor | `Gemini 3.8 Flash (High)` | **Read-Only** (`enableWriteTools: false`), `enableSubagentTools: false` |

---

## Gemini Flash-First Architecture

Upstream pstack relied on expensive proprietary tiers (`opus`, `fable`, `gpt-6-astra`). 

`pstack-antigravity` is engineered from first principles to run on **Gemini 3.8 Flash with High Reasoning Effort**:
* **High Reasoning Effort:** Delivers senior-architect reasoning, deep invariant checking, and thorough diff audits at 5x the speed and a fraction of the cost.
* **Flash Lite:** Handles high-volume, low-complexity AST sweeps and comment stripping with near-instant turnarounds.

---

## Running the Test Suite

Verify that all skills, manifests, and behavioral evals pass:
```bash
npm test
```
Runs:
* 65 skills and 23 playbooks YAML frontmatter validation.
* `AGENTS.md` token budget assertion (< 400 words).
* Subagent non-recursion DAG validation.
* 7 behavioral evaluations testing SpaceX invariants.

---

## Attribution & Lineage

`pstack-antigravity` is an open-source, native Google Antigravity port of:
* **[Lauren Tan (@poteto)](https://github.com/poteto)**'s original SpaceX-inspired engineering playbooks and skills for Cursor ([`cursor/plugins (plugins/pstack)`](https://github.com/cursor/plugins/tree/main/plugins/pstack)).
* Cross-harness and runtime architecture research from **[Michael Denyer](https://github.com/michael-denyer)**'s [`pstack-claude`](https://github.com/michael-denyer/pstack-claude).

All original principles, concepts, and playbooks remain under their respective MIT Licenses. See [NOTICE.md](NOTICE.md) for complete details.

---

## License

Released under the [MIT License](LICENSE). Copyright (c) 2025-2026 Lauren Tan, Michael Denyer, and pstack-antigravity contributors.

---

## Disclaimer

This is an independent open-source community port. It is not affiliated with, sponsored by, or endorsed by Google LLC or Space Exploration Technologies Corp. (SpaceX). Google Antigravity is a product of Google LLC. SpaceX is a registered trademark of Space Exploration Technologies Corp.
