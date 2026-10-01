---
name: proofread-folder
description: Proofread and directly fix spelling, grammar, and clear notation typos in YAML and Markdown files directly inside a specified folder. Use when asked to proofread multiple files in one folder.
argument-hint: <folder path>
user-invocable: true
disable-model-invocation: true
---

# Proofread Folder

Proofread all YAML and Markdown files directly inside the folder specified by the user, and apply clear corrections directly. Include `.yaml`, `.yml`, and `.md` files. Do not process files in subfolders. If the folder path is missing or ambiguous, ask the user to specify it before proceeding.

## Scope

- Correct genuine spelling, grammar, punctuation, and typographical mistakes in prose, comments, and human-readable string values.
- In YAML and Markdown, edit only human-language text and obvious text typos. Preserve YAML keys, Markdown structure, identifiers, markup, links, interpolation, and syntax.
- In mathematical notation, correct only an obvious local typo, such as a variable name that inconsistently changes from `$a$` to `$x$` where the surrounding text makes the intended symbol unambiguous. Preserve formulas and claims otherwise.
- Do not assess or correct the mathematical validity of proofs. That is the role of `/check-proofs`. Language mistakes inside proof text may still be corrected without changing the mathematical argument.
- Make stylistic changes sparingly. Only adjust wording when it is clearly awkward or ambiguous and a small change improves readability while preserving the author's meaning and voice. Prefer leaving acceptable personal style alone.

## Procedure

1. Resolve the user-specified folder and list its immediate files only. Do not traverse or inspect subfolders.
2. Select only files with `.yaml`, `.yml`, or `.md` extensions. Ignore all other file types.
3. Read and proofread each selected file in full. If a file has unsaved editor changes, preserve and work from those changes rather than replacing them with an older on-disk version.
4. Apply only unambiguous corrections to the selected files. If context from outside the specified folder is necessary to decide whether wording or notation is correct, leave it unchanged rather than expanding the read scope.

## Boundaries

- Read and edit only eligible files directly inside the specified folder. Do not touch files outside it, files in nested folders, or unsupported file types.
- Do not reformat unrelated content, change meaning, rewrite whole passages, or make speculative edits. When a correction is not unambiguous, leave it as written.
- Do not create report files or modify any other files.

## Response

Briefly list the files changed and summarize the types of corrections made. Also list eligible files that needed no changes. Mention any unclear wording or notation left untouched, without proposing mathematical proof changes.
