#!/usr/bin/env bash
# PostToolUse hook — runs pretty-format-json on edited JSON files.
# Triggered on Edit|Write events.

INPUT=$(cat)
SCRIPT_DIR="$(cd -- "$(dirname -- "${BASH_SOURCE[0]}")" && pwd)"
# shellcheck disable=SC1091
source "$SCRIPT_DIR/_extract-tool-input-files.sh"

mapfile -t FILES < <(extract_tool_input_files "$INPUT")
mapfile -t TARGETS < <(printf '%s\n' "${FILES[@]}" | awk '/\.json$/')
[[ ${#TARGETS[@]} -gt 0 ]] || exit 0

cd "$(project_dir_from_env)" || exit 1

prek=$(command -v prek || echo "$HOME/.local/bin/prek")
output=$("$prek" run pretty-format-json --files "${TARGETS[@]}" 2>&1)
status=$?

if [[ $status -ne 0 ]]; then
  # If it autofixed, it might still return non-zero.
  # Let's check if there are still errors.
  output=$("$prek" run pretty-format-json --files "${TARGETS[@]}" 2>&1)
  status=$?
fi

if [[ $status -ne 0 ]]; then
  printf '%s\n' "$output" >&2
  exit 2
fi
