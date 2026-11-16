# CatDat

_CatDat_ ([catdat.app](https://catdat.app)) is a searchable database of categorical structures and their properties, built by and for people who love category theory. It is an open-source community project.

Four types of categorical structures are supported: **categories**, **functors**, **morphisms**, and **symmetric monoidal categories** (`STRUCTURE_TYPES` in [shared/config.ts](shared/config.ts)). The data has three kinds of entries:

- **Structures**: e.g. `Set`, `Grp`, the abelianization functor. Each has a definition, satisfied and unsatisfied properties with proofs, and related structures.
- **Properties**: e.g. "cocomplete", "cartesian closed", "left adjoint". Each property belongs to one structure type.
- **Implications**: e.g. "abelian ⟹ regular", each with a proof.

From the implications, a **deduction system** infers further properties of each structure and **dualizes** implications and property assignments automatically. The app has detail pages for structures, properties, and implications, a search for structures by satisfied and unsatisfied properties (which also detects inconsistent combinations), a comparison of structures, and a page that lists missing data (`/missing`). Reusable lemmas and proofs that require lemmas are Markdown pages in [content/](content/), rendered at `/content/<name>`.

The admin functionality is in a separate repository, [CatDatAdmin](https://github.com/ScriptRaccoon/CatDatAdmin).

## Tech stack

TypeScript, SvelteKit (Svelte 5), SQLite via `better-sqlite3`, KaTeX for math rendering, Playwright for end-to-end tests, Netlify for deployment, pnpm as package manager. Most pages are prerendered at build time; only the search and comparison pages are dynamic. See [DEPLOYMENT.md](DEPLOYMENT.md).

## Repository layout

- [database/data/](database/data/): **the source of truth.** YAML files for all structures, properties, and implications, one folder per kind and type (e.g. `categories/`, `category-properties/`, `category-implications/`, `functors/`, ...), plus `config.yaml` (tags, relations, special object and morphism kinds), `macros.yaml` (KaTeX macros), and `special-morphism-rules.yaml`.
- [database/schema/](database/schema/): SQL schema files, applied in order of their `NNN_` prefix.
- [database/scripts/](database/scripts/): the `db:*` scripts (seeding, deduction, tests).
- [database/test-data/](database/test-data/): data for `db:test`: `config.json` (per structure type, e.g. the structures with all properties decided) and `expected/` (the expected properties of selected structures, one JSON file per structure in a folder per type).
- [shared/](shared/): code used by both the database scripts and the app (`#shared/*` subpath import), e.g. the DB client and the structure type config. `history.json` records the order in which structures and properties were added (each entry with type and ID); `db:seed` appends new entries, and the homepage reads it for "Recently added structures" and "Recently added properties". When renaming a structure or property, rename it in the history as well (`db:test` checks that all entries exist).
- [src/](src/): the SvelteKit app. Routes are generic over the structure type (`src/routes/[type]`, `[type]-property`, `[type]-implication`, `[type]-search`, ...). Page components are in `src/pages/`, shared components in `src/components/`, server-side DB access in `src/lib/server/`.
- [content/](content/): Markdown content pages for reusable lemmas and proofs that require lemmas.
- [tests/](tests/): Playwright end-to-end tests.

## Commands

General:

- `pnpm dev`: start the dev server.
- `pnpm build` / `pnpm preview`: build and preview the production app.
- `pnpm check`: run the Svelte and TypeScript checks (also runs as a pre-push hook and in CI).
- `pnpm format` / `pnpm lint`: format with Prettier / check formatting (`lint` also runs as a pre-push hook and in CI).
- `pnpm cspell`: spell-check `content/` and `database/` (also runs as a pre-push hook and in CI).
- `pnpm e2e`: run the Playwright end-to-end tests (`e2e:debug` and `e2e:ui` are variants).

Database (all scripts run with `tsx` and are type-checked by `pnpm check` via the root `tsconfig.json`):

- `pnpm db:setup`: delete `database/catdat.db` and recreate it from the SQL schema files. It also stores a hash of the schema in `database/schema/schema.json`. Required after any schema change; `db:seed` aborts if the schema hash is outdated.
- `pnpm db:seed`: clear all data and insert the entries parsed from the YAML files (validated with `valibot` schemas in `database/scripts/utils/seed.schemas.ts`).
- `pnpm db:deduce`: for each structure type, dualize implications and deduce satisfied and unsatisfied properties (for categories also special objects and morphisms). Deduced rows are marked with `is_deduced`, and those inherited from a parent structure additionally with `is_inherited`.
- `pnpm db:test`: check data quality: every property has a dual (except those listed under `properties_without_dual` in `database/test-data/config.json`) and duals are mutual, structures and their duals are mutual, the structures listed under `positive_structures` there have no unsatisfied properties (positivity), all properties are decided for the structures listed under `decided_structures`, the properties of selected structures exactly match their JSON files in `database/test-data/expected/`, adjoint functors are recorded on both sides with matching domains and codomains, links in proofs point to existing entries (`?proof=` links to assigned proofs, unless marked with `data-allow-deduced`), all entries of the history file exist, no implication follows from the others (not even one conclusion or one direction of an equivalence), and no property assignment can be deduced from others or inherited from the parent structure (both except those marked with `check_redundancy: false`). The redundancy tests run last and list all redundancies: one line per implication, and at most one per structure and kind (satisfied or unsatisfied) for assignments.
- `pnpm db:sort`: sort the arrays in the JSON files in `database/test-data/` alphabetically and format them with Prettier.
- `pnpm db:snapshot`: copy the database to `static/databases/catdat-snapshot.db` for the download page.
- `pnpm db:update`: run `db:sort`, `db:seed`, `db:deduce`, `db:test`, and `db:snapshot` in sequence. **This is the standard command after editing any YAML data.** It also runs in the test workflow in CI. Use `--watch` to rerun it whenever a file in `database/data/` changes.
- `pnpm db:text`: fast path for text-only changes to existing structures (names, notations, alternative notations, descriptions, nLab links, comments, keywords, objects and morphisms of categories, proofs of property assignments), properties (descriptions, nLab links, keywords), and implications (proofs). It updates changed fields without rebuilding relations or running deductions. Special objects, special morphisms, and special morphism rules are not covered. Supports `--watch`.
- After `db:update`, and after `db:text` when it changed something, the script writes a timestamp to `database/.last-update` (gitignored). A Vite plugin in [vite.config.ts](vite.config.ts) watches this file and the Markdown files in `content/`, and reloads the browser when one of them changes while `pnpm dev` is running. When `database/data/macros.yaml` changes, it restarts the dev server, since the KaTeX macros are only read on startup.
- `pnpm db:combinations <id> [<id> ...]`: list the combinations p ∧ ¬q that the given structures (or their duals) witness and that no other structure in the database witnesses. Needs only the IDs, not the type (all IDs must have the same type). Useful to judge whether a structure adds new information.
- `pnpm db:structure <id> [group]`: print the property IDs of a structure, grouped into `satisfied`, `unsatisfied`, `unknown`, and `undecidable` with counts (a terminal version of the structure detail page). An optional group argument restricts the output to that group, e.g. `pnpm db:structure Ab unsatisfied`. Needs only the ID, not the type.
- `pnpm db:shell`: open a `sqlite3` shell on the local database.

First-time setup: `pnpm install`, `pnpm db:setup`, `pnpm db:update`, `pnpm dev`. Neither `database/catdat.db` nor the snapshot is committed; both are generated.

## Database

The SQLite database `database/catdat.db` is generated entirely from the YAML files and is **read-only at runtime**. Never edit the database directly; change the YAML files (or the schema) and regenerate. User submissions and page visits are stored in a separate database (`app.db`, hosted on Turso), which is unrelated to the data scripts. See [DATABASE.md](DATABASE.md) for details.

Main tables (full schema in [database/schema/](database/schema/)):

- `structure_types`: the four types. Most tables carry a `type` column, and composite foreign keys `(id, type)` ensure that, for example, a category property is only assigned to categories.
- `structures`: data common to all structures (`id`, `type`, `name`, `notation`, `description`, `nlab_link`, `dual_structure_id`, `parent_structure_id`). The `categories` table adds `objects` and `morphisms` for categories.
- `structure_associations` / `associated_structures`: typed links between structures, e.g. a functor's `domain`, `codomain`, `left_adjoint`, `right_adjoint`, a morphism's `category`, or a symmetric monoidal category's `underlying_category`.
- `properties`: primary key `(id, type)`, with a `relation` ("is", "has", "preserves", ...), `description`, `dual_property_id`, and `invariant_under_equivalences`.
- `property_assignments`: links structures to properties with `is_satisfied` (TRUE, FALSE, or NULL for undecidable), `proof`, `is_deduced`, `is_inherited` (deduced from the parent structure), and `check_redundancy`.
- `implications`, `assumptions`, `conclusions`: implications between properties of one type, with `is_equivalence`, `is_deduced`, `check_redundancy`, and `dual_implication_id`. The `implications_view` view combines them into JSON arrays.
- `associated_assumptions`: implication assumptions about associated structures, e.g. a functor implication that requires the domain category to be complete.
- `special_objects` / `special_object_assignments` and `special_morphisms` / `special_morphism_assignments` / `special_morphism_rules`: special objects (terminal, initial, products, coproducts) and special morphisms of categories. The kinds of special morphisms are morphism properties (isomorphism, monomorphism, epimorphism, regular monomorphism, regular epimorphism), and their duals are the dual properties. A special morphism assignment classifies the morphisms of a category with this property. The rules assign such a classification to every category with a given property.
- Additional tables: tags (`structure_tags`, `property_tags`, and their assignment tables), `related_structures`, `related_properties`, `structure_comments`, `structure_keywords`, `property_keywords`, `relations`.

The YAML files never contain derived data. Everything marked `is_deduced` is produced by `db:deduce`.

## YAML data format

Use existing files as templates: [database/data/categories/N.yaml](database/data/categories/N.yaml) for categories, [database/data/functors/abelianization.yaml](database/data/functors/abelianization.yaml) for functors, `category-properties/*.yaml` for properties (one property per file), and `category-implications/*.yaml` for implications (a list of related implications per file). Property and structure references in YAML use the human-readable property ID, e.g. `finitely cocomplete`.

- String values may contain HTML (`<a>`, `<i>`, `<ol>`, ...) and KaTeX math (`$...$`, `$$...$$`).
- Use single quotes for values that contain `:`. If such a value also contains a single quote (e.g. `x'`), use a `>-` block instead of escaping it as `''`, which is hard to read and to copy elsewhere.
- Use `>-` for multiline text; an empty line in it starts a new paragraph when rendered. Do not use `|-`.
- Optional `keywords` (list of strings) on structures and properties: alternative names a user would search for that do not already occur in the `name` (for properties: the ID), e.g. `posets` for `Pos`, `aleph1-accessible` for `ℵ₁-accessible` (no special characters needed), or `tripleable` for `monadic`. Only terms that identify the structure or property, not related concepts. The search filters on the list pages match them.
- Set `check_redundancy: false` on a property assignment or implication that is redundant but deliberately kept (see below).
- The keys under `special_morphisms` of a category are the morphism property IDs listed in `config.yaml`, e.g. `regular monomorphism`.

## Contribution guidelines

Full guidelines: [CONTRIBUTING.md](CONTRIBUTING.md). Contributions come in through the suggestion form on the site, GitHub issues, or pull requests from forks. The essentials for data changes:

- **Proofs for every claim**: satisfied and unsatisfied properties, implications, and special morphisms all need a proof or reference. If a proof refers to another proof, link to it with `?proof=` (see "Writing proofs"). Put reusable lemmas and proofs that require lemmas into a `content/` page and link to it; long proofs alone are fine in the YAML files.
- **Reduce unknowns**: when adding a structure, decide as many of its properties as possible. When adding a property, try to decide it for all existing structures, and include implications connecting it to existing properties. For the structures listed under `decided_structures` in `database/test-data/config.json`, deciding every property is mandatory (enforced by `db:test`).
- **No redundant assignments**: only assign properties that cannot be deduced or inherited from the parent structure. Redundant satisfied assignments may be kept when the proof is trivial anyway, insightful, constructs (co)limits used later, avoids an overly complex automatic deduction, or establishes an intermediate result used later. Mark them with `check_redundancy: false`. Redundant unsatisfied assignments are almost always removed. All other redundant assignments must be removed, since `db:test` reports them as errors.
- **Atomic implications**: do not add implications that follow from others, and do not add dual implications, since dualization is automatic. Prefer the "limit" variant over the "colimit" variant. When adding an implication, check whether it simplifies existing ones. `db:test` reports implications that follow from others; keep one only if it states a definition or if removing it would lead to an overly complex automatic deduction (e.g. `ccc_no_strict_terminal`), and mark it with `check_redundancy: false`.
- **Positive properties only**: never add negated properties (e.g. "large" for "not small"); record them as unsatisfied instead. Every category property must hold for the trivial category, and every functor property must hold for identity functors.
- **Counterexamples**: every new property needs at least one structure that does not satisfy it. If none exists yet, add one.
- **No duplicates**: do not add the dual of an existing category (assign the dual properties to the original instead), and do not add categories equivalent or isomorphic to existing ones, except when this matters for non-invariant properties such as being skeletal.
- **Special objects and morphisms**: for each new category, try to specify its special objects and special morphisms.
- **Order of assignments**: assignments are shown in file order, so list trivial and easy properties first and group closely related ones.
- **New combinations**: structures that witness new consistent combinations p ∧ ¬q are especially valuable (see `/missing` and `db:combinations`).
- **Small pull requests**: one focused change per PR, roughly no more than four new properties or structures.

Writing and notation conventions:

- Write `non-empty`, `non-unital`, `non-expansive` (with a hyphen).
- Use `\varnothing` (not `\emptyset`), `f : X \to Y` (not `\colon`), and `\coloneqq` (not `:=`).
- Write concrete sets as `\varnothing`, `\{\ast\}`, `\{0,1\}` (or `\{a,b\}`), never as `0`, `1`, `2`. This also applies to the initial and terminal objects of a specific category (e.g. `x : \{\ast\} \to X` in `\Set`, the trivial category `\1`, or "the terminal object $T$" of a presheaf category). Only abstract initial and terminal objects in statements about arbitrary categories, monoidal units, and the zero and trivial objects of algebra (the zero module $0$, the trivial group $1$) may be called `0` and `1`.
- Write parallel morphisms as `f,g : A \rightrightarrows B`.
- Write cardinalities as `\card(X)` (not `|X|`, which denotes underlying sets and spaces), preimages as `f^*(A)` (not `f^{-1}(A)`, which denotes the inverse map), localizations as `A[f^{-1}]` (not `A_f`), and polynomial variables in uppercase, as in `R[T]` and `K[X,Y]` (lowercase letters denote elements).
- Write applications of several functors in nested form `F(G(X))`, never `FG(X)`.
- Choose meaningful names: derive them from related objects (a subspace of $Y$ is $Y'$, its preimage in $X$ is $X'$, and the restriction of $q$ is $q' : X' \to Y'$) instead of using random letters, and do not name maps like elements (no homomorphism $a$ out of a ring $A$). Do not name objects or morphisms that are used only once.
- Never write "class" or "proper class" in the set-theoretic sense, since [content/foundations.md](content/foundations.md) works with sets and collections: write e.g. "the collection of all singletons is not a set". Equivalence classes and isomorphism classes are fine.
- State assumptions on rings at each use, e.g. "a local commutative ring $T$" (in this word order), never as a global convention such as "All rings are commutative."
- A (locally) ringed space or scheme $X$ has underlying space `|X|` and structure sheaf `\O_X`, so points are `x \in |X|` and open subsets are `U \subseteq |X|`. A morphism `f : X \to Y` has continuous map `|f| : |X| \to |Y|` and sheaf map `f^\sharp : \O_Y \to |f|_* \O_X`; write `|f|(x)`, `|f|^*(V)`, and stalk maps `f^\sharp_x`. Never let $X$ or $f$ stand for the underlying space or map; in particular, `X = (|X|,\O_X)` is fine, but `(X,\O_X)` with $X$ the space is not. The same holds in words: "$\Spec(A)$ has a single point", not "is a one-point space".
- Write metric spaces as pairs `(X,d_X)`, never as `|X|`: letters denote sets, and maps act on sets, e.g. a non-expansive map `f : (X,d_X) \to (Y,d_Y)`. Constructed objects are pairs as well: `(X/{\sim},\bar{d})`, `(Y,d_Y)` with $d_Y$ the restriction, `(\IQ,d) \hookrightarrow (\IR,d)`, never "the set $X$ with the induced metric". The terminal object may be written `\{\ast\}`.
- Write (pre)ordered sets as pairs `(X,\leq)`: letters denote sets, so `x \in X` needs no comment. Morphisms are `f : (X,\leq) \to (Y,\leq)`, and their underlying maps are `f : X \to Y`, e.g. "$f : X \to Y$ is surjective". Write diagrams as `D : \I \to \Ord`, `i \mapsto (X_i,\leq)`. Concrete ordered sets that show their order stay as they are (`\{0 < 1\}`, `[n]`, `\{\ast\}`), but never write `x \in [n]`. Give other orders as relations, e.g. the discrete order `(\{0,1\},=)` and the chaotic preorder `(\{0,1\},\{0,1\} \times \{0,1\})`.
- Never use one-off font commands such as `\mathcal`, `\mathrm`, `\mathbf`, or `\operatorname` directly. Reuse a macro from [database/data/macros.yaml](database/data/macros.yaml) (e.g. `\IN`, `\Grp`, `\Ab`, `\C`, `\Q`, `\T`) or define a new one there.
- In displayed formulas containing indexed big operators such as `\prod`, `\coprod`, `\sum`, `\sup`, or `\lim`, add `\textstyle` for the more compact layout, e.g. `$$\textstyle h : A \to \prod_{i \in I} Q_i$$`.
- Run `pnpm cspell` after editing text, and add legitimate new words to `.cspell.json`.

Responsible use of AI (from CONTRIBUTING.md): AI-generated code and data (including proofs) are accepted if they are readable, understandable, and checked thoroughly by the human author, who must understand every line and argument and takes responsibility for every claim, link, and citation.

## Writing proofs

Proofs are written for professional mathematicians. Readers are expected to know groups, rings, modules, topological spaces, and basic category theory (limits, adjunctions, the Yoneda lemma, ...), so standard facts from these areas need no proof. More specialized notions should be defined or linked.

Content:

- **Self-contained**: a reader should be able to follow the proof using only the structure's description, the property's definition, and the pages the proof links to. Prefer a direct argument to a bare citation. When citing a source, consider adding a direct argument as well ("Alternatively, here is a direct proof: ..."). Citing alone is fine for deep or standard theorems, such as the Special Adjoint Functor Theorem.
- **Easy to understand**: state the claim or key idea first, then the details ("We claim that ... To see this, ..."). Name objects and morphisms explicitly with source and target (`f : X \to Y`). For unsatisfied properties, give a concrete counterexample (e.g. "the embedding $C_2 \hookrightarrow S_3$") rather than an existence argument, whenever possible.
- **Complete**: do not skip steps. Phrases like "It is easy to see" or "clearly" are only for exceptional cases, namely steps that are routine for the intended reader. One-line proofs such as "This is trivial." or "This holds by definition." are only for claims that follow immediately from the definitions.
- **Classifications and equivalences**: when one direction is immediate, prove only the other one and say so ("For the non-trivial direction, ..."), as in most special-morphism proofs. In content pages, mark the two directions with `($\implies$)` and `($\impliedby$)`, and steps in a cycle of equivalences with `(1) $\implies$ (2)`.
- **Building on known facts**: a proof may use properties of the same structure that are assigned earlier in the file or deduced from them ("We already know that ..."), as well as its classification of special morphisms ("(see below)"). Results about other structures may be used with a link to them. **Whenever a proof refers to the proof of another assignment**, including loose references such as "the idea is the same as for $\CAlg(R)$", link to it with `?proof=<encoded property ID or special morphism kind>`. The link text is "proof" (or a specific noun such as "counterexample"), placed on that word in the sentence, e.g. `the same <a href="/category/Quiv?proof=semi-strongly_connected">counterexample</a> as for $\Quiv$`, or otherwise in parentheses at the end of the cited statement, e.g. `$\Bin$ is locally cartesian closed (<a href="/category/Bin?proof=locally_cartesian_closed">proof</a>)`. The sentence names the structure the link leads to. The target must be an assigned (not deduced) proof, which `db:test` checks, so that removing a cited assignment cannot leave a dead reference. A proof that uses only the statement of another assignment needs no link. If such a link is still useful, mark it with `data-allow-deduced` after the href, e.g. `<a href="/category/Grp?proof=monomorphism" data-allow-deduced>proof</a>`; then the target may also be deduced. When changing or removing a proof, grep for its link (e.g. `/category/BD?proof=sifted`) and check the citing proofs.
- **Auxiliary results in the description**: easy results about the structure that several of its proofs use, mainly adjunctions to well-known categories, go into a separate paragraph at the end of the description. It starts with "In the proofs of properties, we use the following adjunctions:" (or "results:") and lists the statements in an `<ol>` (whose margins separate it from the surrounding text) without proofs, since they are elementary for the intended reader (see `GrpAct.yaml`). A single result is written as a sentence instead: "In the proofs of properties, we use that ..." (see `omega-Set.yaml`). A result that only one proof uses, or only for an alternative argument, is stated in that proof instead (e.g. the adjoints of the forgetful functor in the classifications of monomorphisms and epimorphisms of `Bin.yaml`). Proofs use these results directly, without "see above" or "see the description", since the reader is expected to know the description. A functor from the description is not cited by its bare letter, which is easy to forget: write its domain and codomain, and its definition unless the context makes it clear, e.g. "the fully faithful functor $L : \Grp \to \GrpAct$, $G \mapsto (G,\varnothing)$". A result that needs a real proof goes into the first proof that needs it, as a `<strong>Claim</strong>` that later proofs cite with a `?proof=` link (e.g. the proof of mono-regularity in `GrpAct.yaml`).
- **Reuse instead of repetition**: put general lemmas in `content/` pages instead of repeating an argument in several YAML files, and apply them explicitly, e.g. "apply the contrapositive of the dual of Lemma 2 <a href="/content/subcategories">here</a> to the forgetful functor $\Ab \to \Grp$".
- **Functors, especially adjunctions**: before computing with elements, look for functors that connect the structure to well-understood ones, such as forgetful and free functors and embeddings of simple objects (e.g. $\Grp \to \GrpAct$, $G \mapsto (G,\varnothing)$ and $\Set \to \GrpAct$, $Y \mapsto (1,Y)$). Determine which of them are adjoints or fully faithful, state them in the description (see above), and justify steps by what they preserve or reflect: left adjoints preserve colimits and epimorphisms, right adjoints preserve limits and (regular) monomorphisms, and fully faithful functors reflect them. Many properties, and their failures, then transfer by a lemma in [content/subcategories.md](content/subcategories.md). If a transfer has no lemma yet, add one, and check which other proofs of the property and its dual can use it. Do not recompute what such a functor or an established property of the structure already gives, e.g. coproducts of objects $(G,\varnothing)$ via the cocontinuity of $G \mapsto (G,\varnothing)$, or epimorphisms via balancedness.
- **Generalize concrete proofs**: once a proof for a specific structure works, check which features of the structure it really uses. If these are general properties (e.g. infinitary extensivity, existence of certain limits), state the result as an implication, or as a lemma in a `content/` page if it cannot be phrased with existing properties. An implication is much more powerful than a single assignment: the deduction system applies it, and its dual, to every structure, which decides further properties and makes existing direct proofs redundant. After adding one, run `pnpm db:update` and remove the redundant assignments (or mark them with `check_redundancy: false` if other proofs cite them). Example: the proof that $\LRS_R$ is not coaccessible only used that $\LRS_R$ is infinitary extensive, which led to the implication `infinitary_extensive_not_coaccessible`. It also decided `Met_c` and made the proofs for `LRS_R`, `Sch_R`, `Top`, and `Quiv_fc` redundant.

Format:

- Write in full sentences, using "we". Introduce notation with `\coloneqq`, and use `$$...$$` for displayed formulas. In long YAML proofs, use a `>-` block and separate paragraphs with a blank line.
- Label paragraphs in YAML proofs in bold: `<strong>Claim 1.</strong>`, `<strong>Remark.</strong>` (not `<i>`).
- Displayed formulas must not overflow on mobile devices: split chains of equations and side-by-side definitions with `align*`, one step or definition per line. In content pages, put `$$` on its own line before `\begin{align*}` and after `\end{align*}`, with blank lines around the block, since Prettier mangles it otherwise.
- Internal links in YAML: structures as `<a href="/category/Set">$\Set$</a>` (with the notation as link text), proofs of structures as `<a href="/category/Set?proof=cartesian_closed">proof</a>` (see above), properties as `<a href="/category-property/<id>">...</a>`, and content pages as `<a href="/content/<name>">here</a>` or `<a href="/content/<name>">this lemma</a>`.
- External links, in YAML and in content pages (as Markdown links there), point to a specific result: `See Prop. 4.2 at the <a href="...">nLab</a>.`, `<a href="https://math.stackexchange.com/questions/601463">MSE/601463</a>` (`MO/...` for MathOverflow; the link text always names the question ID, while the URL may target a specific answer as `/a/<answer id>` without a user-ID suffix), and books and papers with the author's last name as link text (not the title; multiple authors joined by an en-dash, e.g. `Carboni–Lack–Walters`), followed by the location, e.g. `<a href="https://ncatlab.org/nlab/show/Categories+for+the+Working+Mathematician">Mac Lane</a>, Ch. V, Theorem 5.1`. See "Citations" in CONTRIBUTING.md. Do not add `target="_blank"`: external links get it automatically when rendered (`render_nested_text` in `src/lib/server/text.ts`).
- Content pages are Markdown with `title` and `description` in the front matter and use Markdown links. Statements go in blocks such as `::: Lemma 1` (also `Proposition`, `Corollary`, `Claim`), closed by `:::`, followed by a `::: Proof` block. Do not state the dual version of a result unless it is used often (as for Lemma 2 in [content/subcategories.md](content/subcategories.md)).

## Workflow after changing data

1. Edit the YAML files in `database/data/` (or the `content/` pages).
2. Run `pnpm db:update`, or `pnpm db:text` for text-only changes to existing structures, properties, and implications. If the schema changed, run `pnpm db:setup` first.
3. If `db:update` fails, the cause is usually malformed YAML or a schema validation error, a contradiction found during deduction, a failing data-quality test, or a redundant assignment or implication.
4. Run `pnpm cspell`.
