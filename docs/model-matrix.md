# Gemini 4 Hydrogen-First Model Matrix

`pstack-antigravity` eliminates dependencies on expensive proprietary model tiers (`opus`, `fable`, `gpt-6-astra`), leveraging Google Antigravity's **Gemini 4 Hydrogen** tier with multi-model orchestration (**Carbon** / **Argon**).

| Role | Antigravity Model | Effort | Responsibility |
| :--- | :--- | :--- | :--- |
| **Coordinator** | `inherit` / `Gemini 4 Carbon` | High | Matches playbooks, enforces invariants, writes plan artifacts |
| **Worker Delegate** | `Gemini 4 Hydrogen` | Medium / High | Writes and edits code in isolated branch workspaces |
| **Comment Stripper** | `Gemini 4 Hydrogen` | Low | Ultra-fast AST comment deletion and corpse cleanup |
| **Security Auditor** | `inherit` / `Gemini 4 Carbon` | High / xhigh | Read-only independent audit for security and regressions |
| **Code Quality** | `inherit` / `Gemini 4 Carbon` | High | Enforces 1,000-line limit and flags spaghetti branching |
