# Workspace Engineering Invariants (pstack)

This workspace enforces Lauren Tan (@poteto)'s SpaceX-inspired engineering standards. These rules are non-negotiable.

## 1. Prose & Communication (Unslop)
- Write short, declarative sentences. One idea per sentence, ended with a period.
- Never use em-dashes (`—`) or connective mid-sentence colons.
- Eliminate conversational filler ("Sure!", "I have updated the code", "Great question").
- State what changes for the user and maintainer before detailing internal mechanics.

## 2. Bug Fixing & Verification
- Never patch a symptom or hide errors behind defensive guards (`if (!x) return`).
- Reproduce defects with runtime evidence (a failing script or test) before modifying code.
- A bug is fixed only when the reproduction passes against the real runtime.
- Never claim a task is complete based on "it compiles" or unverified self-attestation.

## 3. Architecture & Domain Modeling
- Name and structure the canonical domain shape (state machines, reducers, types) before writing logic.
- Validate strictly at system boundaries; trust internal types and keep domain logic pure.
- Delete dead paths and unused abstractions before adding new features.

## 4. Independent Review Gate
- No non-trivial change or pull request may be marked complete without an independent review verdict from `thermo-nuclear-review`.
- Self-reviews, passing unit tests, or CI checks do not count as independent review verdicts.

## 5. Skills on Demand
- Retrieve operational playbooks and principles from `.agents/skills/` only when triggered.
