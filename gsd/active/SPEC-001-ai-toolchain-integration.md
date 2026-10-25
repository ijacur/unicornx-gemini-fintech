# SPEC-001: AI Development Workflow Tools Integration

- **Spec ID**: SPEC-001
- **Feature**: Multi-Tier AI Toolchain (Roo Code, CodeRabbit, Ralph Loop, GSD Core)
- **Status**: 04-VERIFY
- **Created**: 2026-10-07
- **Author**: DevOps & Toolchain Integrator

---

## 1. Executive Summary & Goals
Integrate four complementary AI engineering tools to create an end-to-end development system:
1. **Roo Code (Code Generation)**: In-editor agent with custom role modes and automatic API key mapping.
2. **CodeRabbit (Code Review)**: Automated PR review configuration, GitHub Actions workflow, and local CLI audit checks.
3. **Ralph Loop (Autonomous Feedback Loop)**: Self-healing development loop that plans, codes, tests, auto-fixes failures, and commits on green.
4. **GSD Core (Workflow & Spec Architecture)**: Spec-driven lifecycle spanning Discuss, Plan, Execute, Verify, and Ship with structured markdown task boards.

---

## 2. Integrated Components Specification

### 2.1 Roo Code Extension
- **Extension ID**: `rooveterinaryinc.roo-cline`
- **Installation Target**: VS Code (`code`) & Cursor (`cursor`)
- **Key Providers**:
  - Google Gemini (`GEMINI_API_KEY`)
  - Anthropic Claude (`ANTHROPIC_API_KEY`)
  - OpenAI / OpenRouter (`OPENAI_API_KEY`, `OPENROUTER_API_KEY`)
- **Configuration**:
  - `.vscode/settings.json` and `.cursor/settings.json`
  - `.roo/config.json` (auto-imported profiles)
  - `.roomodes` (custom modes: `gsd-architect`, `turnir-engineer`, `ralph-agent`, `code-reviewer`)
  - `.clinerules` (project engineering instructions)
  - `scripts/roo-key-sync.sh` (environment sync utility)

### 2.2 CodeRabbit Automated Code Review
- **Repository Configuration**: `.coderabbit.yaml`
  - Strict tone instructions for TypeScript/React 19/Python
  - File exclusions (binaries, office docs, build artifacts)
  - Custom rules for a11y, memory purity, and type safety
- **CI Workflow**: `.github/workflows/coderabbit.yml`
  - Runs on PR creation, update, and issue comments (`@coderabbitai review`)
- **CLI Workflow**: `scripts/coderabbit-review.sh`
  - Pre-flight local diff analysis and static audits before PR creation

### 2.3 Ralph Loop Autonomous Feedback Loop
- **Engine**: `scripts/ralph_loop.py` & `scripts/ralph-loop.sh`
- **Phases**:
  1. `PLAN`: Task analysis & pre-flight state logging
  2. `CODE`: Agent execution dispatch
  3. `TEST`: Validation suite (`npm run lint && npm run build`)
  4. `AUTO-FIX`: Failure log capture & iterative recovery loop (up to 3 retries)
  5. `COMMIT`: Conventional git commit on green
- **Audit Log**: `gsd/logs/ralph-audit.log`

### 2.4 GSD Core Spec-Driven Architecture
- **Directory Structure**:
  - `gsd/01-discuss/discuss-template.md`
  - `gsd/02-plan/spec-template.md`
  - `gsd/03-execute/task-template.md`
  - `gsd/04-verify/verify-template.md`
  - `gsd/05-ship/ship-template.md`
  - `gsd/BOARD.md` (active markdown kanban)
  - `scripts/gsd.sh` (CLI management tool)

---

## 3. Verification Log
- [x] Roo Code installed in VS Code: `v3.54.0` verified
- [x] Roo Code installed in Cursor: `v3.54.0` verified
- [x] Provider keys checked and synchronized via `scripts/roo-key-sync.sh`
- [x] `.coderabbit.yaml` and `.github/workflows/coderabbit.yml` validated
- [x] Pre-review script tested via `scripts/coderabbit-review.sh`
- [x] Ralph Loop tested with `--no-commit` pre-flight run (passed in 2.53s)
- [x] GSD Core templates and board verified with `scripts/gsd.sh`
