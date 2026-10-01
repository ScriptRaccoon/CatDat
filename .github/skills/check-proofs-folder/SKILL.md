---
name: check-proofs-folder
description: Review every mathematical proof in YAML and Markdown files directly inside a specified folder. Use when asked to check proofs across a folder.
argument-hint: <folder path>
user-invocable: true
disable-model-invocation: true
---

# Check Proofs in a Folder

Review every proof in all eligible files directly inside the folder specified by the user. Include `.yaml`, `.yml`, and `.md` files. Do not process files in subfolders. If the folder path is missing or ambiguous, ask the user to specify it before proceeding.

## Procedure

1. Resolve the specified folder and list its immediate entries only. Do not traverse or inspect subfolders.
2. Select only files with `.yaml`, `.yml`, or `.md` extensions. Ignore all other file types.
3. Read each selected file in full and locate every proof using its format:
    - In YAML, find every `proof` field, including fields nested in property assignments, implications, special morphisms, and other records, as well as block scalars and quoted multiline values. Associate each proof with its enclosing record and claim.
    - In Markdown content pages, find every `::: Proof` directive block, from its opening line through the closing `:::`. Associate it with the preceding claim or statement block, which may be introduced by directives such as `::: Lemma`, `::: Proposition`, `::: Corollary`, or `::: Claim`. Preserve the distinction between the claim and its proof; do not mistake ordinary prose or displayed equations outside a proof block for a proof.
4. Assess every argument against definitions, hypotheses, and prior steps in its file. Check whether inferences follow, important cases are justified, references support the claims, and conclusions establish their associated claims. Do not silently supply missing assumptions or lemmas.
5. Make a separate adversarial pass over each proof before accepting it: check that every map and equation has the stated source and target; test degenerate cases such as equal variables, empty or singleton objects, zero or identity morphisms, and boundary values; and verify that constructions used to distinguish cases are well-defined morphisms satisfying all required conditions. In particular, when a proof handles arbitrary elements or pairs, check whether they may coincide, and when it claims a classification or universal property, test both directions and small counterexamples.
6. Use relevant repository context when a proof depends on a local definition or referenced CatDat entry. Prefer opening a known source file directly. For an unknown path, search only the relevant source directory with one short, distinctive plain-text term or exact filename/ID; avoid long LaTeX expressions, complex regular expressions, and queries with many alternatives. Treat a no-match or exclusion warning as inconclusive: verify the intended path and retry with a simpler term before reporting context unavailable. Do not rely on generated files under `build/`.
7. Do not edit files, suggest or apply fixes unless separately asked, run commands, or invoke database update workflows. Keep the review scope to eligible files directly inside the specified folder; read a supporting file outside it only when needed to verify a cited definition or result.

## Report

Start with an overall assessment and state how many eligible files were reviewed. List actionable findings grouped by file. Identify each finding by YAML record/property and `proof` field, or by Markdown claim and `::: Proof` block; include line numbers when available. For each finding, give severity (`major`, `minor`, or `uncertain`), the specific issue, and why it affects the argument. Distinguish a demonstrated logical gap from missing context or uncertainty. Do not report style preferences as mathematical errors.

If no actionable issues are found, say so, but make clear that this is an AI review and not a proof of correctness. Do not claim formal verification or certainty. Authors remain responsible for checking arguments and writing final proofs in their own words, consistent with CatDat's contribution guidance.
