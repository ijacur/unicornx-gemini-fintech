---
name: turnir-oxlint-guard
description: "USE WHEN linting React 19, TypeScript, and Tailwind code in Turnir using oxlint. DO NOT USE FOR backend C/C++ or non-Turnir workspaces."
---

# `turnir-oxlint-guard`: Rust-Powered Oxlint Hygiene Enforcer

## Operational Mandate
Run ultra-fast static analysis over the Turnir React 19 + TypeScript codebase using `oxlint`, catching unused variables, dead code, syntax regressions, and React hook dependency pitfalls before committing.

## Deterministic Protocol
1. **Reconnaissance**: Scan modified files in `src/`.
2. **Analysis**: Run `npm run lint` (`oxlint`).
3. **Remediation**: Fix identified lint errors immediately at the root cause.
4. **Verification**: Re-run `oxlint` and ensure zero warnings or errors.

## Anti-Rationalization Rules
- NEVER disable oxlint rules inline (`/* oxlint-disable */`) to mask unhandled errors.
- NEVER leave unused imports or dead variables in React components.
- NEVER commit changes without running `npm run lint`.

## Mandatory CLI Verification Gate
```bash
npm run lint
```
