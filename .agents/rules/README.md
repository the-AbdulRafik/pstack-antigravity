# Workspace Rules Directory

This directory contains hierarchical workspace rules loaded automatically by Google Antigravity.

## Token Budget Architecture
Antigravity allocates a dedicated 20,000-token rules budget (`defaultRulesBudget`) across all discovered rule files (`AGENTS.md` / `GEMINI.md`).

To preserve maximum context window for active coding, **`AGENTS.md` is strictly kept under 400 words (~300 tokens)**. It defines non-negotiable workspace invariants:
1. **Unslop Prose:** Short declarative sentences, zero fluff.
2. **Repro-First Bug Fixing:** No fixes without failing test reproduction.
3. **Domain Modeling:** Data structures before control flow.
4. **Independent Review Gate:** Mandatory third-party audit before merge.

Operational playbooks and detailed principles are kept in `.agents/skills/` and retrieved on demand via progressive disclosure.
