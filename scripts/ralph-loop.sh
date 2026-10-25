#!/usr/bin/env bash
# ==============================================================================
# Ralph Loop CLI Entry Point
# Autonomous Feedback Loop: Plan -> Code -> Test -> Auto-Fix -> Commit
# ==============================================================================

set -euo pipefail

SCRIPT_DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")" && pwd)"
PROJECT_ROOT="$(cd "${SCRIPT_DIR}/.." && pwd)"

cd "${PROJECT_ROOT}"

TASK_DESC="${1:-Autonomous quality verification loop}"
shift || true

TEST_CMD="npm run lint && npm run build"
MAX_RETRIES=3

python3 "${SCRIPT_DIR}/ralph_loop.py" \
  --task "${TASK_DESC}" \
  --test-cmd "${TEST_CMD}" \
  --max-retries "${MAX_RETRIES}" \
  "$@"
