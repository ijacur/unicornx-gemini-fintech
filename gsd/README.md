# GSD Core: Spec-Driven Development Workflow

**GSD Core** (Get Stuff Done) is a systematic, spec-driven engineering methodology designed for high-velocity human-AI pair programming. It eliminates ambiguity, prevents regression loops, and guarantees auditability across the entire development lifecycle.

---

## The 5-Phase Lifecycle

```
[01 - DISCUSS]  ──►  [02 - PLAN]  ──►  [03 - EXECUTE]  ──►  [04 - VERIFY]  ──►  [05 - SHIP]
 Problem & RFC        Tech Spec          Ralph Loop         Quality Gate       Release & Tag
```

### 1. Discuss (`gsd/01-discuss/`)
* **Objective**: Explore the problem space, uncover tacit constraints, and define user requirements.
* **Artifact**: Discussion RFC / Problem Statement based on `discuss-template.md`.
* **Exit Gate**: Consensus reached on requirements and architectural direction.

### 2. Plan (`gsd/02-plan/`)
* **Objective**: Design the concrete technical architecture, interface contracts, data models, and dependency graphs.
* **Artifact**: Technical Specification based on `spec-template.md`.
* **Exit Gate**: Formal sign-off on API schemas, file changes, and test requirements.

### 3. Execute (`gsd/03-execute/`)
* **Objective**: Implement the solution in modular, testable increments using AI code generation tools (Roo Code, Claude, Ralph Loop).
* **Artifact**: Work Package Checklist based on `task-template.md`.
* **Exit Gate**: All implementation tasks coded.

### 4. Verify (`gsd/04-verify/`)
* **Objective**: Validate the changes against quality gates (typechecks, linters, unit tests, a11y, build pipelines).
* **Artifact**: Verification Report based on `verify-template.md`.
* **Exit Gate**: 100% green tests, 0 build errors, CodeRabbit pre-review approval.

### 5. Ship (`gsd/05-ship/`)
* **Objective**: Deploy, tag releases, update documentation, and archive completed specifications.
* **Artifact**: Release Notice based on `ship-template.md`.
* **Exit Gate**: Merged PR, production deployment verified, spec moved to `gsd/archive/`.

---

## Directory Organization

```text
gsd/
├── README.md               # Architecture documentation (this file)
├── BOARD.md                # Live Markdown Task Board
├── 01-discuss/             # Phase 1: Problem statements and RFC templates
│   └── discuss-template.md
├── 02-plan/                # Phase 2: Architecture and technical specs
│   └── spec-template.md
├── 03-execute/             # Phase 3: Implementation tasks & work packages
│   └── task-template.md
├── 04-verify/              # Phase 4: Quality gate reports & test matrices
│   └── verify-template.md
├── 05-ship/                # Phase 5: Release checklists & changelogs
│   └── ship-template.md
├── active/                 # Currently active feature specifications
└── archive/                # Shipped and completed specifications
```

---

## GSD CLI Commands

```bash
# View the live markdown task board
./scripts/gsd.sh board

# Scaffold a new feature spec from templates
./scripts/gsd.sh new "my-feature-name"

# Check active spec lifecycle status
./scripts/gsd.sh status
```
