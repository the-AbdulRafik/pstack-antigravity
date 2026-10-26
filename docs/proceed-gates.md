# The Proceed Gate Protocol

In Google Antigravity, multi-step tasks emit an Antigravity Plan Artifact with `RequestFeedback: true`.

## Flow
1. **Plan Formulation:** Coordinator drafts the plan using `templates/plan-artifact.md`.
2. **Interactive UI Interruption:** The IDE pauses and displays a clickable **Proceed** button.
3. **Authorization:** Work resumes only when the human clicks Proceed or provides steering directions.
