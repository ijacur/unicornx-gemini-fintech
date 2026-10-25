#!/usr/bin/env bash
# ==============================================================================
# Roo Code API Provider Key Synchronization Tool
# Reads environment variables & .env files, validates provider keys,
# and generates/syncs .roo/config.json for automatic import into Roo Code.
# ==============================================================================

set -euo pipefail

SCRIPT_DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")" && pwd)"
PROJECT_ROOT="$(cd "${SCRIPT_DIR}/.." && pwd)"
ROO_DIR="${PROJECT_ROOT}/.roo"
CONFIG_FILE="${ROO_DIR}/config.json"

mkdir -p "${ROO_DIR}"

# 1. Source local .env if present
if [[ -f "${PROJECT_ROOT}/.env" ]]; then
  # export non-comment lines
  set -a
  # shellcheck source=/dev/null
  source "${PROJECT_ROOT}/.env" 2>/dev/null || true
  set +a
elif [[ -f "${PROJECT_ROOT}/.env.local" ]]; then
  set -a
  # shellcheck source=/dev/null
  source "${PROJECT_ROOT}/.env.local" 2>/dev/null || true
  set +a
fi

echo "========================================================"
echo "  Roo Code Provider Key Mapping & Verification Utility  "
echo "========================================================"

GEMINI_KEY="${GEMINI_API_KEY:-}"
ANTHROPIC_KEY="${ANTHROPIC_API_KEY:-}"
OPENAI_KEY="${OPENAI_API_KEY:-}"
OPENROUTER_KEY="${OPENROUTER_API_KEY:-}"
DEEPSEEK_KEY="${DEEPSEEK_API_KEY:-}"

mask_key() {
  local key="$1"
  if [[ -z "$key" ]]; then
    echo "NOT SET"
  elif [[ ${#key} -le 8 ]]; then
    echo "******** (length: ${#key})"
  else
    echo "${key:0:4}...${key: -4} (length: ${#key})"
  fi
}

echo ""
echo "Detected Provider Keys:"
echo " - GEMINI_API_KEY:     $(mask_key "$GEMINI_KEY")"
echo " - ANTHROPIC_API_KEY:  $(mask_key "$ANTHROPIC_KEY")"
echo " - OPENAI_API_KEY:     $(mask_key "$OPENAI_KEY")"
echo " - OPENROUTER_API_KEY: $(mask_key "$OPENROUTER_KEY")"
echo " - DEEPSEEK_API_KEY:   $(mask_key "$DEEPSEEK_KEY")"
echo ""

# Determine active default provider
ACTIVE_PROVIDER="Gemini-Flash"
if [[ -n "$ANTHROPIC_KEY" && -z "$GEMINI_KEY" ]]; then
  ACTIVE_PROVIDER="Anthropic-Claude"
elif [[ -n "$OPENROUTER_KEY" && -z "$GEMINI_KEY" && -z "$ANTHROPIC_KEY" ]]; then
  ACTIVE_PROVIDER="OpenRouter"
fi

python3 - <<EOF
import json, os

config_path = "${CONFIG_FILE}"

config = {
    "providerProfiles": {
        "currentApiConfigName": "${ACTIVE_PROVIDER}",
        "apiConfigs": {
            "Gemini-Flash": {
                "id": "gemini-profile-turnir",
                "apiProvider": "gemini",
                "apiModelId": "gemini-2.5-flash",
                "apiKey": "${GEMINI_KEY}"
            },
            "Anthropic-Claude": {
                "id": "anthropic-profile-turnir",
                "apiProvider": "anthropic",
                "apiModelId": "claude-3-7-sonnet-20250219",
                "apiKey": "${ANTHROPIC_KEY}"
            },
            "OpenRouter": {
                "id": "openrouter-profile-turnir",
                "apiProvider": "openrouter",
                "apiModelId": "anthropic/claude-3.7-sonnet",
                "apiKey": "${OPENROUTER_KEY}"
            },
            "OpenAI": {
                "id": "openai-profile-turnir",
                "apiProvider": "openai",
                "apiModelId": "gpt-4o",
                "apiKey": "${OPENAI_KEY}"
            }
        }
    },
    "globalSettings": {
        "autoApprovalEnabled": False,
        "telemetrySetting": "disabled"
    }
}

with open(config_path, "w") as f:
    json.dump(config, f, indent=2)

print(f"Successfully updated Roo Code configuration at: {config_path}")
print(f"Primary active provider profile set to: ${ACTIVE_PROVIDER}")
EOF

echo ""
echo "✓ Roo Code configuration synchronized."
echo "Roo Code extension will auto-import these provider profiles upon opening VS Code / Cursor."
echo "========================================================"
