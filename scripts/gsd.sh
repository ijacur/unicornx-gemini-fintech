#!/usr/bin/env bash
# ==============================================================================
# GSD Core CLI: Spec-Driven Development Management Tool
# Commands: board, new <spec-name>, status, help
# ==============================================================================

set -euo pipefail

SCRIPT_DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")" && pwd)"
PROJECT_ROOT="$(cd "${SCRIPT_DIR}/.." && pwd)"
GSD_DIR="${PROJECT_ROOT}/gsd"

cmd="${1:-status}"

case "$cmd" in
  board)
    echo "========================================================"
    echo "                 GSD Core: Task Board                   "
    echo "========================================================"
    cat "${GSD_DIR}/BOARD.md"
    echo "========================================================"
    ;;

  status)
    echo "========================================================"
    echo "             GSD Core: Active Specifications            "
    echo "========================================================"
    active_count=0
    for spec in "${GSD_DIR}/active"/*.md; do
      if [[ -f "$spec" ]]; then
        active_count=$((active_count + 1))
        spec_name="$(basename "$spec")"
        status_line="$(grep -Ei "\*{0,2}status\*{0,2}:" "$spec" | head -n 1 | tr -d '*' || echo "Status: Not defined")"
        echo "[$active_count] ${spec_name}"
        echo "    ${status_line}"
      fi
    done
    if [[ $active_count -eq 0 ]]; then
      echo "No active specifications found in gsd/active/."
    fi
    echo ""
    echo "Task Board: ${GSD_DIR}/BOARD.md"
    echo "========================================================"
    ;;

  new)
    shift || true
    SPEC_NAME="${1:-}"
    if [[ -z "${SPEC_NAME}" ]]; then
      echo "Error: Please provide a feature or spec name."
      echo "Usage: ./scripts/gsd.sh new <feature-name>"
      exit 1
    fi

    TIMESTAMP="$(date +%Y%m%d)"
    SLUG="$(echo "${SPEC_NAME}" | tr '[:upper:]' '[:lower:]' | tr ' ' '-')"
    TARGET_FILE="${GSD_DIR}/active/SPEC-${TIMESTAMP}-${SLUG}.md"

    if [[ -f "${TARGET_FILE}" ]]; then
      echo "Specification already exists: ${TARGET_FILE}"
      exit 1
    fi

    cat <<EOF > "${TARGET_FILE}"
# SPEC-${TIMESTAMP}: ${SPEC_NAME}

- **Spec ID**: SPEC-${TIMESTAMP}
- **Status**: 01-DISCUSS
- **Created**: $(date +%Y-%m-%d)
- **Author**: $(whoami)

---

## 1. Problem Exploration (Discuss)
$(cat "${GSD_DIR}/01-discuss/discuss-template.md")

---

## 2. Technical Specification (Plan)
$(cat "${GSD_DIR}/02-plan/spec-template.md")

---

## 3. Work Packages (Execute)
$(cat "${GSD_DIR}/03-execute/task-template.md")

---

## 4. Verification Matrix (Verify)
$(cat "${GSD_DIR}/04-verify/verify-template.md")

---

## 5. Release Checklist (Ship)
$(cat "${GSD_DIR}/05-ship/ship-template.md")
EOF

    echo "✓ Created new spec: ${TARGET_FILE}"
    echo "Added to '01-DISCUSS' phase. Edit the file and update gsd/BOARD.md."
    ;;

  help|*)
    echo "GSD Core CLI: Spec-Driven Development Management"
    echo ""
    echo "Commands:"
    echo "  ./scripts/gsd.sh board             - Print the active task board"
    echo "  ./scripts/gsd.sh status            - Show all active specifications"
    echo "  ./scripts/gsd.sh new <name>        - Scaffold a new 5-phase spec file"
    echo "  ./scripts/gsd.sh help              - Show this help message"
    ;;
esac
