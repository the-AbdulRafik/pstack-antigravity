# Gemini Flash-First Model Matrix

`pstack-antigravity` eliminates dependencies on expensive proprietary model tiers (`opus`, `fable`, `gpt-6-astra`).

| Role | Antigravity Model | Effort | Responsibility |
| :--- | :--- | :--- | :--- |
| **Coordinator** | `Gemini 3.8 Flash` | High | Matches playbooks, enforces invariants, writes plan artifacts |
| **Worker Delegate** | `Gemini 3.8 Flash` | Medium | Writes and edits code in isolated branch workspaces |
| **Comment Stripper** | `Gemini 3.8 Flash Lite` | Low | Ultra-fast AST comment deletion and corpse cleanup |
| **Security Auditor** | `Gemini 3.8 Flash` | High | Read-only independent audit for security and regressions |
| **Code Quality** | `Gemini 3.8 Flash` | High | Enforces 1,000-line limit and flags spaghetti branching |
