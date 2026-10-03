---
name: check-proofs
description: Review every mathematical proof in a CatDat YAML data file or Markdown content page, or in all such files directly inside a folder. Use when asked to check or review proofs in a CatDat file or folder.
argument-hint: '[file or folder path] [optional focus or mathematical context] (defaults to the current file)'
disable-model-invocation: true
allowed-tools: Read, Grep, Glob
---

# Check Proofs

Review every proof in the target file or folder. Supported files are YAML (`.yaml`, `.yml`) and Markdown (`.md`), typically under `database/data/` and `content/`. Always review entire files, not only a selection.

Arguments: `$ARGUMENTS`

## Target

- If the arguments start with a path to a **folder**, review all `.yaml`, `.yml`, and `.md` files directly inside it (Glob with `<folder>/*`). Do not process subfolders or other file types.
- If the arguments start with a path to a **file**, review that file.
- Otherwise, review the current file, i.e. the file most recently opened or selected in the IDE (from the IDE context, such as `ide_opened_file` or `ide_selection`). If there is none, or it is not a supported file, ask the user for the intended file or folder.

All other argument text is additional context; consider it without narrowing the review unless explicitly requested. State the reviewed file or folder at the start of the report.

## Procedure

1. Read each target file in full and locate every proof using its format:
    - In YAML, find every `proof` field, including fields nested in property assignments, implications, special morphisms, and other records, as well as block scalars and quoted multiline values. Associate each proof with its enclosing record and claim.
    - In Markdown content pages, find every `::: Proof` directive block, from its opening line through the closing `:::`. Associate it with the preceding claim or statement block, which may be introduced by directives such as `::: Lemma`, `::: Proposition`, `::: Corollary`, or `::: Claim`. Preserve the distinction between the claim and its proof; do not mistake ordinary prose or displayed equations outside a proof block for a proof.
2. Assess each argument against the definitions, hypotheses, and prior steps stated in the file. Check that inferences are valid, important cases and edge conditions are handled, cited results support the claims, and the conclusion proves the associated claim. Do not silently supply missing assumptions or lemmas.
3. Before accepting a proof, make a separate adversarial pass: check that every map and equation has the stated source and target; test degenerate cases such as equal variables, empty or singleton objects, zero or identity morphisms, and boundary values; and verify that constructions used to distinguish cases are well-defined morphisms satisfying all required conditions. In particular, when a proof handles arbitrary elements or pairs, check whether they may coincide, and when it claims a classification or universal property, test both directions and small counterexamples.
4. Use relevant repository context when a proof depends on a local definition or referenced CatDat entry. Keep the assessment grounded in available sources; flag context that cannot be checked.
    - Prefer reading a known source file directly, especially when a CatDat link or entry ID identifies it. For content links, check the matching Markdown file under `content/`; for data entries, locate the YAML source under the appropriate `database/data/` directory (use Glob with the entry's ID as filename). Do not rely on generated files under `build/`.
    - When the path is unknown, Grep only the relevant source directory (`content/` or `database/data/`) for one short, distinctive plain-text term or the entry's ID. Avoid long LaTeX expressions, complex regular expressions, and queries combining many alternatives.
    - Treat a search with no matches as inconclusive, not as evidence that the reference is absent. Check the intended source path, then retry with a simpler term or exact filename. Only report that context is unavailable after these checks fail.
5. This is a read-only review. Do not edit files, apply fixes, or invoke database update workflows. Do not propose rewritten proofs unless the user separately asks.

## Report

Start with an overall assessment (for a folder, also state how many files were reviewed). Then list actionable findings, grouped by file for a folder, each identified by the YAML record/property and `proof` field or by the Markdown claim and `::: Proof` block, with a `path:line` reference. For each finding, state severity (`major`, `minor`, or `uncertain`), the specific step or omission, and why it affects the argument. Distinguish a demonstrated logical gap from missing context or uncertainty. Do not report style preferences as mathematical errors.

If no actionable issue is found, say so, but make clear that this is an AI review and not a proof of correctness. Do not claim formal verification or certainty. The author remains responsible for checking the argument and writing the final proof in their own words, consistent with CatDat's contribution guidance.
