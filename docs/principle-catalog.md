# Engineering Principles Catalog (24 Principles)

The complete index of all 24 SpaceX / First-Principles skills in `.agents/skills/principle-*/`:

### Core Engineering (10)
1. `laziness-protocol`: Bias to deletion and minimal sufficient change.
2. `foundational-thinking`: Define core types and state shapes before logic.
3. `redesign-from-first-principles`: Redesign systems as if new requirements existed from day one.
4. `attack-the-premise`: Challenge root assumptions when repeated fixes fail.
5. `subtract-before-you-add`: Strip dead paths and unused abstractions first.
6. `minimize-reader-load`: Minimize mental indirection and collapse wrappers.
7. `outcome-oriented-execution`: Target working final architectures without throwaway intermediate states.
8. `experience-first`: Prioritize user delight over developer convenience.
9. `exhaust-the-design-space`: Prototype competing alternatives before committing.
10. `build-the-lever`: Automate non-trivial verification with reusable codemods or scripts.

### Architecture & Boundaries (6)
11. `model-the-domain`: Structure state machines and typed schemas over scattered conditionals.
12. `boundary-discipline`: Strict validation at system gates; trust internal invariants.
13. `type-system-discipline`: Make illegal states unrepresentable with branded types.
14. `make-operations-idempotent`: Ensure commands converge safely under retries.
15. `migrate-callers-then-delete-legacy-apis`: Execute API deprecations in a single clean wave.
16. `separate-before-serializing-shared-state`: Decouple concurrency before adding locks.

### Verification & Testing (5)
17. `prove-it-works`: Verify against real execution artifacts; reject "it compiles" self-attestation.
18. `fix-root-causes`: Trace defects to initial origin; reject defensive guards on invalid states.
19. `sequence-verifiable-units`: Break execution into small, self-proving units.
20. `test-behavior-not-implementation`: Assert observable contracts so refactoring does not break tests.
21. `explain-the-number`: Determine baselines and limits before reporting performance metrics.

### Delegation & Meta (3)
22. `guard-the-context-window`: Route heavy reads, AST searches, and diffs to isolated subagents.
23. `never-block-on-the-human`: Auto-execute reversible choices; do not ask trivial questions.
24. `encode-lessons-in-structure`: Convert lessons into linters or type checks rather than chat notes.
