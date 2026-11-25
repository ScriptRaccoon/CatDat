---
paths:
    - 'database/data/**'
    - 'content/**'
---

# Data guidelines

## YAML data format

Use existing files as templates: [database/data/categories/N.yaml](../../database/data/categories/N.yaml) for categories, [database/data/functors/abelianization.yaml](../../database/data/functors/abelianization.yaml) for functors, `category-properties/*.yaml` for properties (one property per file), and `category-implications/*.yaml` for implications (a list of related implications per file). Property and structure references in YAML use the human-readable property ID, e.g. `finitely cocomplete`.

- String values may contain HTML (`<a>`, `<i>`, `<ol>`, ...) and KaTeX math (`$...$`, `$$...$$`).
- Use single quotes for values that contain `:`. If such a value also contains a single quote (e.g. `x'`), use a `>-` block instead of escaping it as `''`, which is hard to read and to copy elsewhere.
- Use `>-` for multiline text; an empty line in it starts a new paragraph when rendered. Do not use `|-`.
- Optional `keywords` (list of strings) on structures and properties: alternative names a user would search for that do not already occur in the `name` (for properties: the ID), e.g. `posets` for `Pos`, `aleph1-accessible` for `ℵ₁-accessible` (no special characters needed), or `tripleable` for `monadic`. Only terms that identify the structure or property, not related concepts. The search filters on the list pages match them.
- Set `check_redundancy: false` on a property assignment or implication that is redundant but deliberately kept (see below).
- The keys under `special_morphisms` of a category are the morphism property IDs listed in `config.yaml`, e.g. `regular monomorphism`.

## Contribution guidelines

Full guidelines: [CONTRIBUTING.md](../../CONTRIBUTING.md). Contributions come in through the suggestion form on the site, GitHub issues, or pull requests from forks. The essentials for data changes:

- **Proofs for every claim**: satisfied and unsatisfied properties, implications, and special morphisms all need a proof or reference. If a proof refers to another proof, link to it with `?proof=` (see "Writing proofs"). Put reusable lemmas and proofs that require lemmas into a `content/` page and link to it; long proofs alone are fine in the YAML files.
- **Reduce unknowns**: when adding a structure, decide as many of its properties as possible. When adding a property, try to decide it for all existing structures, and include implications connecting it to existing properties. For the structures listed under `decided_structures` in `database/test-data/config.json`, deciding every property is mandatory (enforced by `db:test`).
- **No redundant assignments**: only assign properties that cannot be deduced or inherited from the parent structure. Redundant satisfied assignments may be kept when the proof is trivial anyway, insightful, constructs (co)limits used later, avoids an overly complex automatic deduction, or establishes an intermediate result used later. Mark them with `check_redundancy: false`. Redundant unsatisfied assignments are almost always removed. All other redundant assignments must be removed, since `db:test` reports them as errors.
- **Undecidable implications**: an implication that can neither be proven nor refuted in ZFC is marked with `is_undecidable: true` (one assumption, one conclusion, no other fields, a proof of the independence); for categories, it goes into `category-implications/undecidable.yaml`. It is not used for deductions and is dualized automatically.
- **Atomic implications**: do not add implications that follow from others, and do not add dual implications, since dualization is automatic. Prefer the "limit" variant over the "colimit" variant. When adding an implication, check whether it simplifies existing ones. `db:test` reports implications that follow from others; keep one only if it states a definition or if removing it would lead to an overly complex automatic deduction (e.g. `ccc_no_strict_terminal`), and mark it with `check_redundancy: false`.
- **Positive properties only**: never add negated properties (e.g. "large" for "not small"); record them as unsatisfied instead. Every category property must hold for the trivial category, and every functor property must hold for identity functors.
- **Counterexamples**: every new property needs at least one structure that does not satisfy it. If none exists yet, add one.
- **No duplicates**: do not add the dual of an existing category (assign the dual properties to the original instead), and do not add categories equivalent or isomorphic to existing ones, except when this matters for non-invariant properties such as being skeletal.
- **Special objects and morphisms**: for each new category, try to specify its special objects and special morphisms.
- **Order of assignments**: assignments are shown in file order, so list trivial and easy properties first and group closely related ones.
- **New combinations**: structures that witness new consistent combinations p ∧ ¬q are especially valuable (see `/missing` and `db:combinations`).
- **Small pull requests**: one focused change per PR, roughly no more than four new properties or structures.

Responsible use of AI (from CONTRIBUTING.md): AI-generated code and data (including proofs) are accepted if they are readable, understandable, and checked thoroughly by the human author, who must understand every line and argument and takes responsibility for every claim, link, and citation.
