---
name: turnir-pack-verifier
description: "USE WHEN packaging or testing Turnir tournament build and submission zip. DO NOT USE FOR general linting or unverified code edits."
---

# `turnir-pack-verifier`: Build & Submission Package Gatekeeper

## Operational Mandate
Ensure the Turnir competition build compiles cleanly, produces no TypeScript errors across `tsconfig.app.json` and `tsconfig.node.json`, generates optimized Vite output, and creates a verified `submission.zip` free from `.DS_Store` or stray artifacts.

## Deterministic Protocol
1. **Reconnaissance**: Inspect `package.json`, `vite.config.ts`, and target assets in `src/` and `public/`.
2. **Type & Compilation Validation**: Execute `tsc -b` and verify zero errors.
3. **Bundle & Pack**: Execute `npm run pack` to assemble `submission.zip`.
4. **Verification**: Confirm `submission.zip` exists and contains required manifest files.

## Anti-Rationalization Rules
- NEVER bypass TypeScript errors with `any` or `@ts-ignore`.
- NEVER include unminified large binaries or `.env` files in `submission.zip`.
- NEVER consider packaging successful if `tsc -b` returned non-zero.

## Mandatory CLI Verification Gate
```bash
npm run pack && unzip -l submission.zip | grep -E "(index.html|src|package.json)"
```
