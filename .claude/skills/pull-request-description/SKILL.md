---
name: pull-request-description
description: Summarize the commits of the current branch as a pull request title and description, focusing on what changed rather than how it was implemented. Use when asked to write or draft a PR description.
argument-hint: '[optional base branch or additional context] (base defaults to main)'
disable-model-invocation: true
allowed-tools: Bash(git log:*), Bash(git diff:*), Bash(git merge-base:*), Bash(git branch:*), Bash(git rev-parse:*), Bash(gh pr list:*), Bash(gh issue view:*), Read, Grep, Glob
---

# Pull request description

Write a title and description for a pull request of the current branch.

Arguments: `$ARGUMENTS`

## Input

- The base branch is `main`, unless the arguments name another one. Other argument text is additional context, such as an issue the PR belongs to.
- Collect the commits with `git log --reverse <base>..HEAD` (full messages) and the overall changes with `git diff --stat <base>...HEAD` and `git diff <base>...HEAD`. If there are no commits, say so and stop.
- The commit messages are only a starting point. Read the diff to understand what each change does for the reader, and summarize the branch as a whole: drop changes that were reverted or reworked in later commits, and merge commits that belong to the same change.
- If a commit message or the arguments mention an issue or PR (`#123`), you may look it up with `gh issue view` to get its context.

## Focus

The description says **what** has changed, not **how**. The "Files changed" tab already shows the implementation, so skip internals:

- Describe changes as a user, contributor, or maintainer of CatDat experiences them: new or changed pages and UI, new data and mathematical results, new or changed scripts and commands, changed conventions or YAML format, changed tests and checks, fixed bugs.
- Leave out renamed variables, refactored functions, moved or extracted components, internal helpers, type changes, and similar details, unless the refactoring is the point of the PR. In that case, state its purpose and effect in a sentence or two.
- Name files, commands, folders, or settings only when the reader needs them, e.g. a new `pnpm` script, a new folder contributors must use, or a new YAML field.
- For data changes, list what was added (structures, properties, implications) and the notable new results, e.g. which properties are now decided for which structures, or which redundant assignments were removed. Use the structures' notations in bold (`**Set**`) or their IDs in code formatting.
- For UI changes, add a placeholder `<!-- screenshots -->` where screenshots would help, since the user adds them manually.

## Style

Match the style of previous PRs in this repository (`gh pr list --state merged --limit 10 --json title,body` shows examples):

- **Title:** short, in sentence case, describing the change, without a trailing period and without prefixes such as `feat:`.
- **Description:** start with one or two sentences, usually beginning with "This PR ...", that state the overall change and, if applicable, the issue it fixes or the PR it continues (`fixes #135`, `continues #424`).
- For a small PR, those sentences are the whole description. For a larger one, add sections with `###` headings in sentence case, and bullet lists, optionally with bold labels in sentence case (`- **New script:** ...`).
- Be concise. Do not pad the description with motivation the reader already knows, test instructions, or checklists. Do not mention that the description was generated.

## Output

Print the title and then the description in a single fenced `markdown` code block, ready to paste into GitHub. Do not create the PR, push, or edit any files.
