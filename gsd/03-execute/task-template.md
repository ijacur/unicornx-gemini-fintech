# [EXECUTE] Work Packages & Task Breakdown: {{FEATURE_NAME}}

- **Spec ID**: SPEC-{{ID}}
- **Status**: IN PROGRESS (Execute)

---

## 1. Actionable Work Packages

### Package 1: Core Setup
- [ ] Task 1.1: Initialize schema and dependencies
- [ ] Task 1.2: Implement core services

### Package 2: User Interface / CLI
- [ ] Task 2.1: Implement UI components or CLI flags
- [ ] Task 2.2: Hook up state and event handlers

### Package 3: Integration & Wiring
- [ ] Task 3.1: Connect end-to-end data pipeline
- [ ] Task 3.2: Add error boundary and telemetry

## 2. Ralph Loop Agent Prompts
```bash
# Execute autonomous loop for Package 1
./scripts/ralph-loop.sh "Implement Package 1 tasks for SPEC-{{ID}}"
```

## 3. Exit Criteria for Execute Phase
- [ ] All code implemented and passing preliminary checks
- [ ] Ready to transition to `04-verify`
