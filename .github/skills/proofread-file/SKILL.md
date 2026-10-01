---
name: proofread-file
description: Proofread and directly fix spelling, grammar, and clear notation typos in the currently open file. Use when asked to proofread, correct, or lightly polish the active file.
user-invocable: true
disable-model-invocation: true
---

# Proofread File

Proofread the entire currently active editor file, not only the selection, and apply clear corrections directly. Work on the active editor buffer, including unsaved changes. Keep the active file as the focus of proofreading; you may read another file when directly relevant context is needed.

## Scope

- Correct genuine spelling, grammar, punctuation, and typographical mistakes in prose, comments, and human-readable string values.
- Support common source formats such as YAML, Markdown, Svelte, and TypeScript. In structured or code files, edit only human-language text and obvious text typos; preserve keys, identifiers, APIs, program behavior, markup, interpolation, and syntax.
- In mathematical notation, correct only an obvious local typo, such as a variable name that inconsistently changes from `$a$` to `$x$` where the surrounding text makes the intended symbol unambiguous. Preserve formulas and claims otherwise.
- Do not assess or correct the mathematical validity of proofs. That is the role of `/check-proofs-file`. Language mistakes inside proof text may still be corrected without changing the mathematical argument.
- Make stylistic changes sparingly. Only adjust wording when it is clearly awkward or ambiguous and a small change improves readability while preserving the author's meaning and voice. Prefer leaving acceptable personal style alone.

## Boundaries

- Keep all edits confined to the active file. Do not broaden the proofreading scope or modify supporting files.
- Do not reformat unrelated content, change meaning, rewrite whole passages, or make speculative edits. When a correction is not unambiguous, leave it as written.
- Apply the clear corrections directly to the active file. Do not modify any other file or create a separate report file.

## Response

Briefly summarize the types of corrections made. If nothing needed correction, say so. Mention any potentially problematic wording or notation you left unchanged because intent was unclear, without proposing mathematical proof changes.
