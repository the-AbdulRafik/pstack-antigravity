# GitHub Workflows & Issue Templates

This directory contains the GitHub Actions CI/CD workflows and structured issue templates for `pstack-antigravity`.

## Workflows
* `ci.yml`: Runs automated schema validation, token budget checks, DAG assertions, and behavioral evals on every push and pull request.
* `sync-upstream.yml`: Weekly scheduled workflow detecting drift from upstream `cursor/plugins` and `michael-denyer/pstack-claude`.
