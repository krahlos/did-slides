#!/usr/bin/env bash
# PostToolUse hook — rebuilds the *.index.html after edits to slides or slide code.
# Triggered on Edit|Write events.

INPUT=$(cat)
SCRIPT_DIR="$(cd -- "$(dirname -- "${BASH_SOURCE[0]}")" && pwd)"
# shellcheck disable=SC1091
source "$SCRIPT_DIR/_extract-tool-input-files.sh"

mapfile -t FILES < <(extract_tool_input_files "$INPUT")
mapfile -t TARGETS < <(printf '%s\n' "${FILES[@]}" | awk '/(^|\/)data\/[^/]+\/(deck\.toml|slides\/[^/]+\.md)$|(^|\/)src\/[^/]+\.js$/')
[[ ${#TARGETS[@]} -gt 0 ]] || exit 0

cd "$(project_dir_from_env)" || exit 1

mapfile -t JS < <(printf '%s\n' "${TARGETS[@]}" | awk '/\.js$/')
for f in "${JS[@]}"; do
  if ! output=$(node --check "$f" 2>&1); then
    printf '%s\n' "$output" >&2
    exit 2
  fi
done

if ! output=$(node src/build.js 2>&1); then
  printf '%s\n' "$output" >&2
  exit 2
fi
