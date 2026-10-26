# Independent Audit Verdict: {{PR_OR_BRANCH}}

> **Auditor Subagent:** `thermo-nuclear-review`  
> **Model:** `Gemini 3.8 Flash (High Reasoning Effort)`  
> **Verdict:** `{{VERDICT_STATUS}}` <!-- PASS | FAIL | BLOCKED -->  
> **Timestamp:** `{{TIMESTAMP}}`

---

## 1. Diff Scope & Impact Radius
* **Base Branch:** `{{BASE_BRANCH}}`
* **Head Revision:** `{{HEAD_REVISION}}`
* **Files Changed:** `{{CHANGED_FILES_COUNT}}`
* **Lines Added / Removed:** `+{{LINES_ADDED}} / -{{LINES_REMOVED}}`

```mermaid
pie title Diff Distribution
    "Application Logic" : {{LOGIC_PERCENT}}
    "Tests & Mocks" : {{TEST_PERCENT}}
    "Configuration & Types" : {{CONFIG_PERCENT}}
```

---

## 2. Findings & Severity Triage

| Severity | Category | File & Line | Finding & Consequence | Recommendation |
| :--- | :--- | :--- | :--- | :--- |
{{FINDINGS_ROWS}}

---

## 3. Structural & 1,000-Line Rule Assessment
* **Spaghetti Branching Growth:** {{BRANCHING_ASSESSMENT}}
* **1,000-Line Limit Violations:** {{LINE_LIMIT_ASSESSMENT}}
* **Dead Abstractions / Unused Exports:** {{DEAD_CODE_ASSESSMENT}}

---

## 4. Final Verdict Statement
{{FINAL_VERDICT_STATEMENT}}
