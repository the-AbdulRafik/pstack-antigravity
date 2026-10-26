# Contributing to pstack-antigravity

Thank you for your interest in contributing to **pstack-antigravity**! We welcome community contributions that improve existing playbooks, refine principles, enhance subagent sandboxing, or extend documentation.

---

## 1. Ground Rules & Code Invariants

All contributions must adhere to Lauren Tan (@poteto)'s SpaceX-inspired engineering standards enforced in [`.agents/rules/AGENTS.md`](.agents/rules/AGENTS.md):

1. **Unslop Prose:** Write short, declarative sentences. Eliminate conversational filler, em-dashes (`—`), and connective mid-sentence colons.
2. **Repro-First Verification:** Bug fixes must include a reproducible failing test before code is changed.
3. **Domain Modeling:** Structure domain models (state machines, schemas, types) before writing control flow.
4. **Token Budget Discipline:** Keep `AGENTS.md` under 400 words (~300 tokens) to preserve the context window.
5. **Subagent DAG Invariant:** All subagents must maintain `"enableSubagentTools": false` to prevent recursion.

---

## 2. Local Development Workflow

### Prerequisites
* **Node.js:** v18.0.0 or higher
* **Git:** Any modern git client

### Running the Test Suite
Before opening a pull request, verify that all test suites pass:
```bash
npm test
```
This runs:
1. `tools/verify-skills.mjs`: Validates all 65 skills and 23 playbooks for YAML frontmatter and link integrity.
2. `tools/test-engine.mjs`: Asserts subagent DAG topology and rules token budget.
3. `tests/subagent-dag.test.mjs` & `tests/token-budget.test.mjs`: Unit tests.
4. `tools/run-evals.mjs`: Runs 7 behavioral evaluations testing SpaceX invariants.

---

## 3. Submitting Changes

1. Fork the repository and create your branch from `main`:
   ```bash
   git checkout -b feature/my-new-playbook
   ```
2. Commit your changes using [Conventional Commits](https://www.conventionalcommits.org/):
   * `feat(skills): add my-new-skill`
   * `fix(playbooks): refine bug-fix step 3`
   * `docs(readme): clarify npx installation`
3. Ensure `npm test` passes with 0 errors.
4. Open a pull request against `main`. All PRs must pass GitHub Actions CI checks before merging.
