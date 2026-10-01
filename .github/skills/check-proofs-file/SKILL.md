---
name: check-proofs-file
description: Review every mathematical proof in the active CatDat YAML data file or Markdown content page. Use when asked to check or review proofs in CatDat files.
argument-hint: '[optional focus or mathematical context]'
user-invocable: true
disable-model-invocation: true
---

# Check Proofs

Review every proof in the active CatDat data file or content page. Supported files are YAML under `database/data/` and Markdown under `content/`. Review the entire file, not only the selection. If the user provides additional context after the command, consider it without narrowing the review unless requested.

## Procedure

1. Identify the active file from the editor context. Accept YAML files under `database/data/` and Markdown files under `content/`. If it is outside these locations or its identity is ambiguous, ask the user to open or provide the intended file rather than guessing.
2. Read the whole file and locate every proof using its format:
    - In YAML, find every `proof` field, including fields nested in property assignments, implications, special morphisms, and other records, as well as block scalars and quoted multiline values. Associate each proof with its enclosing record and claim.
    - In Markdown content pages, find every `::: Proof` directive block, from its opening line through the closing `:::`. Associate it with the preceding claim or statement block, which may be introduced by directives such as `::: Lemma`, `::: Proposition`, `::: Corollary`, or `::: Claim`. Preserve the distinction between the claim and its proof; do not mistake ordinary prose or displayed equations outside a proof block for a proof.
3. Assess each argument against the definitions, hypotheses, and prior steps stated in the file. Check that inferences are valid, important cases and edge conditions are handled, cited results support the claims, and the conclusion proves the associated claim. Do not silently supply missing assumptions or lemmas. Before accepting a proof, make a separate adversarial pass: check that every map and equation has the stated source and target; test degenerate cases such as equal variables, empty or singleton objects, zero or identity morphisms, and boundary values; and verify that constructions used to distinguish cases are well-defined morphisms satisfying all required conditions. In particular, when a proof handles arbitrary elements or pairs, check whether they may coincide, and when it claims a classification or universal property, test both directions and small counterexamples.
4. Use relevant repository context when a proof depends on a local definition or referenced CatDat entry. Keep the assessment grounded in available sources; flag context that cannot be checked.
    - Prefer opening a known source file directly, especially when a CatDat link or entry ID identifies it. For content links, check the matching Markdown file under `content/`; for data entries, locate the YAML source under the appropriate `database/data/` directory. Do not rely on generated files under `build/`.
    - When the path is unknown, search only the relevant source directory (`content/` or `database/data/`) with one short, distinctive plain-text term or the entry's filename/ID. Avoid long LaTeX expressions, complex regular expressions, and queries combining many alternatives.
    - If search reports no matches or says the pattern may be excluded, treat that as an inconclusive search, not evidence that the reference is absent. Check the intended source path/file list, then retry with a simpler term or exact filename. Only report that context is unavailable after these checks fail; do not attribute a miss to ignore settings unless those settings actually exclude the source directory.
5. Do not edit files, suggest or apply fixes unless separately asked, run commands, or invoke database update workflows.

## Report

Start with an overall assessment. Then list actionable findings, each identified by the YAML record/property and `proof` field or by the Markdown claim and `::: Proof` block (include line numbers when available). For each finding, state severity (`major`, `minor`, or `uncertain`), the specific step or omission, and why it affects the argument. Distinguish a demonstrated logical gap from missing context or uncertainty. Avoid reporting style preferences as mathematical errors.

If no actionable issue is found, say so, but make clear that this is an AI review and not a proof of correctness. Do not claim formal verification or certainty. The author remains responsible for checking the argument and writing the final proof in their own words, consistent with CatDat's contribution guidance.
