# Code Quality Audit Report: {{PROJECT_OR_PR}}

> **Auditor Subagent:** `thermo-nuclear-code-quality`  
> **Model:** `Gemini 3.8 Flash (High Reasoning Effort)`  
> **Verdict:** `{{QUALITY_VERDICT}}`  
> **Max File Length Observed:** `{{MAX_FILE_LINES}} lines`

---

## 1. 1,000-Line Limit & Sprawl Audit

| File Path | Total Lines | Threshold | Status | Recommended Extraction |
| :--- | :--- | :--- | :--- | :--- |
{{FILE_LENGTH_ROWS}}

---

## 2. Spaghetti Branching & Cyclomatic Complexity
{{BRANCHING_FINDINGS}}

---

## 3. Code Judo & Simplification Recommendations
{{SIMPLIFICATION_RECOMMENDATIONS}}
