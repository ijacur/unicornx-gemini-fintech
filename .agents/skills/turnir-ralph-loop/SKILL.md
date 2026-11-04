---
name: turnir-ralph-loop
description: "USE WHEN running autonomous task loops, GSD scripts, or CodeRabbit reviews in Turnir. DO NOT USE FOR general web browsing or external API setup."
---

# `turnir-ralph-loop`: Autonomous Script Loop & Review Runner

## Operational Mandate
Orchestrate and monitor the autonomous test and review scripts in `Turnir/scripts/` (`gsd.sh`, `ralph-loop.sh`, `coderabbit-review.sh`), logging progress and validating that automated iteration cycles converge cleanly.

## Deterministic Protocol
1. **Reconnaissance**: Check status of `scripts/` and active state files.
2. **Pre-flight Check**: Confirm script permissions (`chmod +x scripts/*.sh`).
3. **Execution**: Run the designated workflow (`npm run gsd` or `npm run review` or `npm run ralph`).
4. **Verification**: Verify logs show successful execution and exit status 0.

## Anti-Rationalization Rules
- NEVER let a background loop run indefinitely without convergence checks.
- NEVER ignore non-zero exit codes from child shell scripts.
- NEVER run automated loops without first verifying git working tree cleanliness.

## Mandatory CLI Verification Gate
```bash
bash scripts/coderabbit-review.sh --dry-run 2>/dev/null || npm run lint
```
