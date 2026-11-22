#!/usr/bin/env bash

# Extract changed file paths from tool input for create/edit/apply_patch events.
extract_tool_input_files() {
  local input="$1"
  local patch

  {
    printf '%s' "$input" | jq -r '
      [
        .tool_input.file_path,
        .tool_input.path,
        .tool_input.filename
      ] | .[] | select(type == "string" and length > 0)
    '

    patch=$(printf '%s' "$input" | jq -r '.tool_input.patch // empty')
    if [[ -n "$patch" ]]; then
      printf '%s\n' "$patch" | awk '
        /^\*\*\* Add File: /    { sub(/^\*\*\* Add File: /, ""); print; next }
        /^\*\*\* Update File: / { sub(/^\*\*\* Update File: /, ""); print; next }
        /^\*\*\* Move to: /     { sub(/^\*\*\* Move to: /, ""); print; next }
      '
    fi
  } | awk 'NF && !seen[$0]++'
}

project_dir_from_env() {
  local git_root
  git_root=$(git rev-parse --show-toplevel 2>/dev/null || echo .)
  printf '%s\n' "${CLAUDE_PROJECT_DIR:-${GEMINI_PROJECT_DIR:-$git_root}}"
}
