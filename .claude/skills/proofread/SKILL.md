---
name: proofread
description: Proofread and directly fix spelling, grammar, and clear notation typos in a single file, or in the YAML and Markdown files directly inside a folder. Use when asked to proofread, correct, or lightly polish a file or folder.
argument-hint: '[file or folder path] (defaults to the current file)'
disable-model-invocation: true
allowed-tools: Read, Edit, Grep, Glob
---

# Proofread

Proofread the target file or folder in full and apply clear corrections directly.

Arguments: `$ARGUMENTS`

## Target

- If a path to a **folder** is given, proofread all `.yaml`, `.yml`, and `.md` files directly inside it (Glob with `<folder>/*`). Do not process subfolders or other file types.
- If a path to a **file** is given, proofread that file.
- Otherwise, proofread the current file, i.e. the file most recently opened or selected in the IDE (from the IDE context, such as `ide_opened_file` or `ide_selection`). If there is none, ask the user which file or folder to proofread.

Name the proofread file or folder in the response. Always proofread whole files, not only a selection. Edits are made to the files on disk, so remind the user to save any unsaved editor changes first if a file may have them. You may read another file when directly relevant context is needed.

## Scope

- Correct genuine spelling, grammar, punctuation, and typographical mistakes in prose, comments, and human-readable string values.
- Support common source formats such as YAML, Markdown, Svelte, and TypeScript. In structured or code files, edit only human-language text and obvious text typos; preserve keys, identifiers, APIs, program behavior, markup, links, interpolation, and syntax.
- Do fix violations of the project's writing and format conventions (see CLAUDE.md and CONTRIBUTING.md), even in markup and links: for example citation link texts (authors' last names, not titles, with the location after the link), `target="_blank"` on links, and notation conventions such as `\varnothing` and `\coloneqq`. Keep link targets unchanged.
- In mathematical notation, correct only an obvious local typo, such as a variable name that inconsistently changes from `$a$` to `$x$` where the surrounding text makes the intended symbol unambiguous. Preserve formulas and claims otherwise.
- Do not assess or correct the mathematical validity of proofs. That is the role of `/check-proofs`. Language mistakes inside proof text may still be corrected without changing the mathematical argument.
- Make stylistic changes sparingly. Only adjust wording when it is clearly awkward or ambiguous and a small change improves readability while preserving the author's meaning and voice. Prefer leaving acceptable personal style alone.

## Boundaries

- Edit only the target file(s). Do not modify supporting files, files in nested folders, or unsupported file types.
- Do not reformat unrelated content, change meaning, rewrite whole passages, or make speculative edits. When a correction is not unambiguous, leave it as written.
- Apply the clear corrections directly with Edit. Do not create a separate report file.

## Response

Briefly summarize the types of corrections made. For a folder, list the files changed and the files that needed no changes. If nothing needed correction, say so. Mention any potentially problematic wording or notation you left unchanged because intent was unclear (with `path:line`), without proposing mathematical proof changes.
