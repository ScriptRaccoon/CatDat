---
name: structure-proofs
description: Decide the unknown properties (and, for categories, the special objects and special morphisms) of an existing CatDat structure YAML file by proving or disproving them one at a time, then clean up redundant assignments and summarize. Use when asked to fill in, decide, or prove the properties of a structure.
argument-hint: '[structure file or ID] [optional time limit, e.g. 30m or 2h (default 60m)] (defaults to the current file)'
disable-model-invocation: true
allowed-tools: Read, Edit, Write, Grep, Glob, Bash(pnpm db:update), Bash(pnpm db:structure *), Bash(pnpm db:redundancies), Bash(pnpm db:redundancies *), Bash(pnpm cspell), Bash(date *), Bash(grep *), Bash(sqlite3 database/catdat.db *)
---

# Structure Proofs

Starting from an existing structure YAML file (category, functor, morphism, or symmetric monoidal category) that already defines the structure (ID, name, description, and for categories the objects and morphisms) but has few or no decided properties, decide as many of its unknown properties as possible, one at a time, with proofs. Follow the proof guidelines in [CLAUDE.md](../../../CLAUDE.md) ("Writing proofs") and [CONTRIBUTING.md](../../../CONTRIBUTING.md) throughout.

Arguments: `$ARGUMENTS`

## Target and time limit

- If the arguments contain a path to a YAML file under `database/data/<structure folder>/`, use it. If they contain a bare structure ID, locate the file with Glob (`database/data/*/<ID>.yaml`).
- Otherwise, use the current file, i.e. the file most recently opened or selected in the IDE. If there is none, or it is not a structure file, ask the user.
- The structure type follows from the folder (`categories/`, `functors/`, `morphisms/`, `symmetric_monoidal_categories/`), and the property and implication folders follow from the type (e.g. `category-properties/`, `category-implications/`; for symmetric monoidal categories `symmetric_monoidal_category_properties/` and `symmetric_monoidal_category_implications/`).
- A time limit such as `30m`, `90m`, or `2h` may be given; the default is **60 minutes**. Record the start time with `date +%s` before the first decision and check it with `date +%s` before every new pick. Once the limit is exceeded, finish the property currently being written (or drop it if the proof is not yet complete), and go to the redundancy phase.

State the target file, structure type, and time limit at the start.

## Preparation

1. Read the structure file in full. Understand the definition precisely: what the objects and morphisms are, how composition works, and any parameters (for parametrized structures such as `BG` or `R-Mod`, properties may depend on the parameter).
2. Read the files of the structures listed under `related`, `dual`, `parent`, and `associated`. Their proofs are templates for style and often for content (a proof for a similar category can frequently be adapted, or a property can be transferred along a functor via a lemma in `content/`).
3. Skim [database/data/macros.yaml](../../../database/data/macros.yaml) for available KaTeX macros and the file names in `content/` for reusable lemmas (e.g. `missing_cogenerator`, `subcategories`, `relationships-epis-monos`, `thin_extremal_generator`).
4. Run `pnpm db:update`, so that the database reflects the current YAML (a new structure only exists in the database after this). If it fails, stop and report the error to the user; do not start editing on a broken database.
5. Run `pnpm db:structure <ID>` to see all groups and counts. For categories, also check which special objects and special morphisms are known, including deduced ones (from rules, parents, and dual categories):

    ```
    sqlite3 database/catdat.db "SELECT kind, is_deduced, description FROM special_morphism_assignments WHERE category_id = '<ID>'"
    sqlite3 database/catdat.db "SELECT kind, is_deduced, description FROM special_object_assignments WHERE category_id = '<ID>'"
    ```

## Special objects and morphisms (categories only)

Special morphisms and properties depend on each other in both directions. Classifying the monomorphisms may need limits or a suitable functor (e.g. a representable forgetful functor), and conversely properties such as `balanced`, `well-powered`, `mono-regular`, `CSP`, `normal`, or the generators often need the classification of monomorphisms or epimorphisms. Therefore, treat each open special morphism kind as one more candidate in the decision loop, alongside the unknown properties, and attempt it whenever its prerequisites are available. Do not force it early.

- **Special morphisms**: the kinds are `isomorphisms`, `monomorphisms`, `epimorphisms`, `regular monomorphisms`, and `regular epimorphisms`. A kind is open if it is neither in the YAML nor deduced. Classify the morphisms of that kind, with a proof, in the `special_morphisms` record (fields `description` and `proof`). Follow the style of existing entries (e.g. [Top.yaml](../../../database/data/categories/Top.yaml), [Pos.yaml](../../../database/data/categories/Pos.yaml), [Grp.yaml](../../../database/data/categories/Grp.yaml)): for the trivial direction write "For the non-trivial direction, ...", and use "same as monomorphisms" / "same as isomorphisms" style descriptions where appropriate. A classification proof may use properties assigned earlier in the file, and a property proof may use the classification ("(see below)"). Skip a kind you cannot classify with a complete proof; it stays open.
- **Special objects**: whenever the category is known to have a terminal object, initial object, products, or coproducts (already at the start or proven along the way), add a short `description` to the `special_objects` record (keys `terminal object`, `initial object`, `products`, `coproducts`). These entries take no proof.

## Decision loop

Repeat until no unknown properties (and, for categories, no open special morphism kinds) are left, every remaining candidate has been attempted without success, or the time limit is exceeded:

1. **List the unknowns**: run `pnpm db:structure <ID> unknown`. For categories, also re-run the `special_morphism_assignments` query from the preparation to see which special morphism kinds are still open (deduction may have filled some in).
2. **Pick one candidate**, i.e. an unknown property or an open special morphism kind, that you have not yet attempted, or that you skipped earlier but whose missing prerequisites have since been established. Keep a running list of skipped candidates with a one-line reason each, including what they are waiting for. Priority guidelines:
    - Pick whatever is provable now with the knowledge at hand. If a candidate needs another fact first (a limit construction for a monomorphism classification, the epimorphisms for `balanced` or `CSP`, ...), work on that fact first, and come back afterwards.
    - Prefer well-known, basic properties over exotic ones, and easy ones over hard ones. If a property is defined in terms of others, or the implications show that it requires others (e.g. `generalized variety` requires `sifted colimits`; `locally presentable` requires `cocomplete`), decide the simpler prerequisites first.
    - Exception: if a strong, standard classification clearly applies and has a standard proof or citation (e.g. the category is obviously `one-sorted finitary algebraic`, a `Grothendieck topos`, `locally finitely presentable`, `abelian`, or `small` and `finite`), decide it early, because deduction then settles many other properties at once. Likewise, an easy failure of a weak property (e.g. no `binary products`, not `locally small`) refutes many stronger ones.
    - For **categories**, a typical order, based on what existing files assign directly, is:
        1. size and shape: `locally small`, `small`, `essentially small`, `finite`, `countable`, `essentially countable`, `locally finite`, `skeletal`, `thin`, `groupoid`, `connected`, `semi-strongly connected`, `strongly connected`, `pointed`, `self-dual`;
        2. (co)limits: `terminal object`, `initial object`, `binary products`, `binary coproducts`, `equalizers`, `coequalizers`, `pullbacks`, `pushouts`, `complete`, `cocomplete`, `filtered colimits`, `sifted colimits`, `cofiltered limits`, `sequential colimits`;
        3. generators and special morphisms: `generator`, `cogenerator`, `extremal generator`, `extremal cogenerator`, `well-powered`, `well-copowered`, `balanced`, `mono-regular`, `epi-regular`, `normal`, `conormal`, `CIP`, `CSP`, `unital`, `counital`;
        4. exactness and structure: `regular`, `coregular`, `Malcev`, `co-Malcev`, `effective congruences`, `effective cocongruences`, `infinitary extensive`, `distributive`, `cartesian closed`, `locally cartesian closed`, `subobject classifier`, `regular subobject classifier`, `regular quotient object classifier`, `natural numbers object`, `preadditive`, `additive`, `abelian`, `split abelian`;
        5. advanced: `accessible`, `ℵ₁-accessible`, `finitely accessible`, `locally presentable`, `coaccessible`, `generalized variety`, `multi-algebraic`, `finitary algebraic`, `elementary topos`, `Grothendieck topos`, `total`, `cototal`, `exact filtered colimits`, `cartesian filtered colimits`, `cofiltered-limit-stable epimorphisms`, `filtered-colimit-stable monomorphisms`, `cocartesian cofiltered limits`, `ℵ₁-cofiltered limits`.
    - For **functors**, start with `faithful`, `full`, `essentially injective`, `essentially surjective`, `conservative`, `left adjoint` / `right adjoint`, `representable`, and the preservation of monomorphisms, epimorphisms, initial and terminal objects, (co)products, and (co)equalizers, before `finitary` and more specialized preservation properties. For **morphisms**, start with `monomorphism`, `epimorphism`, `isomorphism`, `split monomorphism`, `split epimorphism`, `constant`, `coconstant`, `zero morphism`, then the regular, strong, extremal, strict, normal, and effective variants. For **symmetric monoidal categories**, start with `strict`, `cartesian`, `cocartesian`, `closed`, `well-pointed`, then the remaining ones. In doubt, sample a few files of the same type for typical orderings.
3. **Understand the property**: read its definition in `database/data/<type>-properties/<property>.yaml` (do not rely on memory; CatDat definitions can differ in details from the literature, e.g. regarding size conditions). Grep the property ID in the implication folder to see what implies it and what it implies.
4. **Look for templates**: grep the property ID in the structure folder of the same type (e.g. `database/data/categories/`) and read how similar structures prove or refute it. Reuse lemmas from `content/` instead of repeating their arguments.
5. **Prove or disprove it** mathematically, rigorously and completely, following "Writing proofs" in CLAUDE.md: state the key idea first, name morphisms with source and target, give concrete counterexamples for unsatisfied properties, link to other structures and content pages, and use labels and `references` when a proof builds on another proof. You may use properties of this structure that are already satisfied or deduced ("We already know that ...") and its special morphisms ("(see below)").
    - **Aim for the right generality, not an ad hoc argument.** Do not just aim to reach the goal. First find out which feature of the situation makes the claim true, and write the proof at that level, so that it also conveys why the claim holds:
        - If a refutation works for every object or morphism with some property (e.g. every non-regular epimorphism, every non-finitely generated subobject), argue with an arbitrary one, and give a concrete instance only as an illustration.
        - If a step is an instance of a general categorical fact (e.g. a regular epimorphism is the coequalizer of its kernel pair, fully faithful functors reflect (co)limits, a limit-preserving inclusion computes limits as in the ambient category), cite that fact. Do not recompute it with elements in the specific category.
        - Do as little manual work as possible: reduce to properties, classifications, and proofs already established (in this file, related structures, implications, or `content/` lemmas) before computing anything by hand. Repeating an element computation that another proof in the file already does is a sign that you missed a reduction.
        - If the same general argument applies to several structures, mention in the summary that it could become a `content/` lemma.
    - Before writing anything, check your argument adversarially: test degenerate cases (empty objects, identities, zero morphisms, coinciding elements), check every map is a morphism of this category, and check both directions of every "if and only if".
    - Only write a proof you are confident is correct. If you are not confident, or the proof would require a substantial new result you cannot establish, do **not** guess: add the property to the skipped list with a note on what you tried and go to the next property. A wrong claim is far worse than an open one.
6. **Record the result** in the YAML file:
    - satisfied → `satisfied_properties`; unsatisfied → `unsatisfied_properties`;
    - `undecidable_properties` (rare): only with a proof that the answer depends on the parameters of the structure (e.g. "This holds if and only if $G$ is countable.") or that the question is independent of ZFC.
    - Insert the entry at a sensible position: easy and trivial properties first, closely related properties grouped together (see "Order of assignments" in CLAUDE.md), not necessarily at the end. Create the list key if it does not exist yet (e.g. `unsatisfied_properties: []` must become a proper list).
    - Do not add `check_redundancy: false` when recording an entry, even if the template you adapted has it. The flag is only set in the redundancy phase, for an assignment that the redundancy script actually reports.
    - Use `>-` with blank lines between paragraphs for long proofs, single quotes for values containing `:`, existing macros, and the notation conventions from CLAUDE.md (`\varnothing`, `f : X \to Y`, `\coloneqq`, `non-empty`). Very long or reusable arguments may go into a new `content/` page, but prefer proofs inside the YAML file.
7. **Run `pnpm db:update` after every single proof**, so that new properties are deduced before the next pick. Then continue with step 1; deduction often decides many further properties at once.
    - If seeding fails, fix the YAML syntax or schema error.
    - If deduction reports a **contradiction**, the new claim conflicts with the existing data. Remove the new entry, re-examine the argument, and re-run `pnpm db:update`. If you remain convinced the new claim is right, leave it out and report the suspected inconsistency (with the conflicting implications or assignments) to the user instead of changing other files.
    - If `db:test` fails because of this structure, report it; do not edit `expected-data/`.
8. Whenever a new (co)limit property is proven, also add the corresponding special object description (see above). Steps 3 to 7 apply in the same way to special morphism classifications.

Edit only the target structure file, plus new `content/` pages if really needed and `.cspell.json` for legitimate new words. Never edit other structures, properties, implications, or `expected-data/`, and never edit the database directly. Do not commit.

## Redundancy phase

After the loop ends (also when the time limit was reached, since this phase is quick and leaves the file clean):

1. Run `pnpm db:redundancies` and look for lines mentioning this structure (`for <ID>:`). The script reports at most one redundant satisfied and one redundant unsatisfied assignment per structure.
2. For a redundant **satisfied** assignment: keep it with `check_redundancy: false` if the proof is illuminating, constructs (co)limits used later, establishes an intermediate result used by later proofs, or avoids an overly complex deduction (see "No redundant assignments" in CLAUDE.md). Otherwise remove it.
3. For a redundant **unsatisfied** assignment: almost always remove it.
4. Before removing an entry, grep the file for its `label` and for phrases like "we already know"; if another proof relies on it, either keep the entry (with `check_redundancy: false`) or adjust the dependent proof and its `references`.
5. Run `pnpm db:update`, then `pnpm db:redundancies` again. Repeat until no redundancy for this structure is reported.
6. Test every `check_redundancy: false` flag in the file, one at a time: remove the flag, run `pnpm db:update` and `pnpm db:redundancies`. If the script does not report that assignment as redundant, the flag was unnecessary: keep it removed. Only restore the flag if the assignment is reported and should be kept (see step 2).

Finally, run `pnpm cspell` and fix spelling issues in the target file (add legitimate mathematical terms to `.cspell.json`).

## Summary

End with a summary for the user:

- **Counts** before and after (from `pnpm db:structure <ID>`): satisfied, unsatisfied, undecidable, unknown.
- **Decided in this run**: the properties added directly to the YAML file, grouped into satisfied, unsatisfied, and undecidable, and the number of properties that were deduced from them. For categories, the special objects and special morphisms that were added.
- **Redundancies**: which assignments were removed and which were kept with `check_redundancy: false` (and why).
- **Still unknown**: each remaining unknown property (and unclassified special morphism kind), with a short note on what was tried, why it was hard, or whether the time limit stopped the run. These are left open for further investigation.
- **Difficulty estimate**: a rough overall rating of how easy the proofs were, and a short list of the proofs that were involved (multi-step constructions, delicate counterexamples), relied on external citations, or used non-trivial theorems from other branches of mathematics (e.g. set theory, general topology, commutative algebra, group theory). Name the theorem in each case.
- A reminder that all proofs were written by AI and must be checked thoroughly by the contributor before submission, who must understand every argument and verify every claim, link, and citation (CONTRIBUTING.md). Point out claims that most need checking (e.g. citations that could not be verified), and suggest running `/check-proofs` on the file.
