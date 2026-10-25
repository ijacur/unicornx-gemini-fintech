#!/usr/bin/env bash
# ==============================================================================
# CodeRabbit CLI Pre-Review & PR Review Workflow
# Evaluates diffs, runs static code audits, and interacts with PR reviews.
# ==============================================================================

set -euo pipefail

SCRIPT_DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")" && pwd)"
PROJECT_ROOT="$(cd "${SCRIPT_DIR}/.." && pwd)"

cd "${PROJECT_ROOT}"

echo "========================================================"
echo "         CodeRabbit CLI Review & Audit Workflow         "
echo "========================================================"

TARGET_BRANCH="main"
CURRENT_BRANCH="$(git rev-parse --abbrev-ref HEAD)"

echo "Current Branch: ${CURRENT_BRANCH}"
echo "Target Branch:  ${TARGET_BRANCH}"
echo ""

# 1. Run local linting gate
echo "--- [Stage 1/3] Running Static Code Audits (oxlint) ---"
if npm run lint 2>&1 | tail -n 10; then
  echo "✓ oxlint checks passed."
else
  echo "⚠ Linting found warnings or errors. Check output above."
fi
echo ""

# 2. Run TypeScript build/typecheck gate
echo "--- [Stage 2/3] Checking TypeScript Build & Types ---"
if npm run build >/dev/null 2>&1; then
  echo "✓ TypeScript type check and build succeeded (0 errors)."
else
  echo "❌ TypeScript build failed. Fix compilation errors before requesting review."
fi
echo ""

# 3. Analyze Git Diff
echo "--- [Stage 3/3] Diff Analysis vs ${TARGET_BRANCH} ---"
if [[ "${CURRENT_BRANCH}" == "${TARGET_BRANCH}" ]]; then
  DIFF_STAT="$(git diff --stat HEAD)"
  CHANGED_FILES="$(git status -s)"
  echo "On ${TARGET_BRANCH} branch. Uncommitted working tree changes:"
  if [[ -z "${CHANGED_FILES}" ]]; then
    echo "Working tree clean. Nothing to review locally."
  else
    echo "${CHANGED_FILES}"
  fi
else
  echo "Changes against ${TARGET_BRANCH}:"
  git diff --stat "${TARGET_BRANCH}...HEAD" || true
fi

# 4. Check GitHub PR Status via gh CLI
echo ""
echo "--- GitHub PR & Remote Status ---"
if command -v gh >/dev/null 2>&1; then
  if gh pr view --json number,title,url,state 2>/dev/null; then
    echo "✓ Active GitHub PR detected for this branch."
    echo "To request a CodeRabbit review comment on PR:"
    echo "  gh pr comment --body '@coderabbitai review'"
  else
    echo "No open PR found for branch '${CURRENT_BRANCH}'."
    echo "To create a PR and trigger automated CodeRabbit review:"
    echo "  gh pr create --base ${TARGET_BRANCH} --title '...' --body '...'"
  fi
else
  echo "gh CLI not detected. Automated GitHub PR review triggers via .github/workflows/coderabbit.yml upon push."
fi

echo ""
echo "========================================================"
echo "✓ Pre-review audit complete."
echo "========================================================"
