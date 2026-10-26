# pstack-antigravity Evaluation Suite

This directory contains automated behavioral evaluations testing that agent execution strictly conforms to Lauren Tan (@poteto)'s SpaceX-inspired engineering invariants.

## Eval Scenarios
1. **`eval-fork-classification.mjs`:** Tests **Never Block on the Human**. Asserts that empirical questions (perf, syntax, layout) are prototyped autonomously, while only product/preference forks query the user via `ask_question`.
2. **`eval-context-guarding.mjs`:** Tests **Guard the Context Window**. Asserts that bulk reads and multi-file refactoring delegate to isolated subagents (`poteto-agent`) rather than blowing up the coordinator's context window.
3. **`eval-audit-gate.mjs`:** Tests **Independent Review Gate**. Asserts that no task or PR can be marked complete without a non-empty verdict from `thermo-nuclear-review`.
4. **`eval-unslop-linter.mjs`:** Tests **Unslop Prose Rules**. Asserts that text outputs contain zero em-dashes (`—`), zero connective mid-sentence colons, and zero conversational filler.
5. **`eval-domain-modeling.mjs`:** Tests **Model the Domain**. Asserts that states and boundaries are structured into types and reducers rather than scattered ad-hoc `if/else` checks.
