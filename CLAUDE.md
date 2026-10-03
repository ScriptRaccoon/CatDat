# CatDat

_CatDat_ ([catdat.app](https://catdat.app)) is a searchable database of categorical structures and their properties, built by and for people who love category theory. It is an open-source community project.

Four types of categorical structures are supported: **categories**, **functors**, **morphisms**, and **symmetric monoidal categories** (`STRUCTURE_TYPES` in [shared/config.ts](shared/config.ts)). The data has three kinds of entries:

- **Structures**: e.g. `Set`, `Grp`, the abelianization functor. Each has a definition, satisfied and unsatisfied properties with proofs, and related structures.
- **Properties**: e.g. "cocomplete", "cartesian closed", "left adjoint". Each property belongs to one structure type.
- **Implications**: e.g. "abelian ⟹ regular", each with a proof.

From the implications, a **deduction system** infers further properties of each structure and **dualizes** implications and property assignments automatically. The app has detail pages for structures, properties, and implications, a search for structures by satisfied and unsatisfied properties (which also detects inconsistent combinations), a comparison of structures, and a page that lists missing data (`/missing`). Long-form proofs and lemmas are Markdown pages in [content/](content/), rendered at `/content/<name>`.

The admin functionality is in a separate repository, [CatDatAdmin](https://github.com/ScriptRaccoon/CatDatAdmin).

## Tech stack

TypeScript, SvelteKit (Svelte 5), SQLite via `better-sqlite3`, KaTeX for math rendering, Playwright for end-to-end tests, Netlify for deployment, pnpm as package manager. Most pages are prerendered at build time; only the search and comparison pages are dynamic. See [DEPLOYMENT.md](DEPLOYMENT.md).

## Repository layout

- [database/data/](database/data/): **the source of truth.** YAML files for all structures, properties, and implications, one folder per kind and type (e.g. `categories/`, `category-properties/`, `category-implications/`, `functors/`, ...), plus `config.yaml` (tags, relations, special object and morphism kinds), `macros.yaml` (KaTeX macros), and `special-morphism-rules.yaml`.
- [database/schema/](database/schema/): SQL schema files, applied in order of their `NNN_` prefix.
- [database/scripts/](database/scripts/): the `db:*` scripts (seeding, deduction, tests). `expected-data/` holds the expected property data used by `db:test`.
- [shared/](shared/): code used by both the database scripts and the app (`$shared/*` alias), e.g. the DB client and the structure type config. `structure.history.json` records when each structure was added; `db:seed` updates it, and the homepage reads it for "Recently added structures".
- [src/](src/): the SvelteKit app. Routes are generic over the structure type (`src/routes/[type]`, `[type]-property`, `[type]-implication`, `[type]-search`, ...). Page components are in `src/pages/`, shared components in `src/components/`, server-side DB access in `src/lib/server/`.
- [content/](content/): Markdown content pages for long proofs and reusable lemmas.
- [tests/](tests/): Playwright end-to-end tests.

## Commands

General:

- `pnpm dev`: start the dev server.
- `pnpm build` / `pnpm preview`: build and preview the production app.
- `pnpm check`: run the Svelte and TypeScript checks (also runs as a pre-push hook).
- `pnpm format` / `pnpm lint`: format with Prettier / check formatting.
- `pnpm cspell`: spell-check `content/` and `database/`.
- `pnpm e2e`: run the Playwright end-to-end tests (`e2e:debug` and `e2e:ui` are variants).

Database (all scripts run with `tsx` using [database/tsconfig.json](database/tsconfig.json)):

- `pnpm db:setup`: delete `database/catdat.db` and recreate it from the SQL schema files. It also stores a hash of the schema in `database/schema/schema.json`. Required after any schema change; `db:seed` aborts if the schema hash is outdated.
- `pnpm db:seed`: clear all data and insert the entries parsed from the YAML files (validated with `valibot` schemas in `database/scripts/utils/seed.schemas.ts`).
- `pnpm db:deduce`: for each structure type, dualize implications and deduce satisfied and unsatisfied properties (for categories also special objects and morphisms). Deduced rows are marked with `is_deduced`.
- `pnpm db:test`: check data quality: properties and their duals are mutual, structures and their duals are mutual, all properties are decided for the structures listed in `expected-data/decided-*.json`, and the properties of selected structures (`Set`, `Ab`, `Top`, ...) exactly match `expected-data/`.
- `pnpm db:snapshot`: copy the database to `static/databases/catdat-snapshot.db` for the download page.
- `pnpm db:update`: run `db:seed`, `db:deduce`, `db:test`, and `db:snapshot` in sequence. **This is the standard command after editing any YAML data.** Use `--watch` to rerun it whenever a file in `database/data/` changes.
- `pnpm db:text`: fast path for text-only changes to existing structures (names, notations, descriptions, nLab links, proofs). It updates changed fields without rebuilding relations or running deductions. Properties and implications are not covered. Supports `--watch`.
- `pnpm db:redundancies`: report property assignments that could already be deduced from others. It reports at most one per structure and kind, so rerun it after each removal. Not part of `db:update`.
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
- `property_assignments`: links structures to properties with `is_satisfied` (TRUE, FALSE, or NULL for undecidable), `proof`, `is_deduced`, `check_redundancy`, and an optional `label`. Proofs can cite labeled assignments, recorded in `proof_references`.
- `implications`, `assumptions`, `conclusions`: implications between properties of one type, with `is_equivalence`, `is_deduced`, and `dual_implication_id`. The `implications_view` view combines them into JSON arrays.
- `associated_assumptions`: implication assumptions about associated structures, e.g. a functor implication that requires the domain category to be complete.
- `special_objects` / `special_object_assignments` and `special_morphisms` / `special_morphism_assignments` / `special_morphism_rules`: special objects (terminal, initial, products, coproducts) and special morphisms (isos, monos, epis, regular monos and epis) of categories.
- Additional tables: tags (`structure_tags`, `property_tags`, and their assignment tables), `related_structures`, `related_properties`, `structure_comments`, `relations`.

The YAML files never contain derived data. Everything marked `is_deduced` is produced by `db:deduce`.

## YAML data format

Use existing files as templates: [database/data/categories/N.yaml](database/data/categories/N.yaml) for categories, [database/data/functors/abelianization.yaml](database/data/functors/abelianization.yaml) for functors, `category-properties/*.yaml` for properties (one property per file), and `category-implications/*.yaml` for implications (a list of related implications per file). Property and structure references in YAML use the human-readable property ID, e.g. `finitely cocomplete`.

- String values may contain HTML (`<a>`, `<i>`, `<ol>`, ...) and KaTeX math (`$...$`, `$$...$$`).
- Use single quotes for values that contain `:`, and escape a literal single quote as `''`.
- Use `>-` for multiline text rendered as one paragraph, and `|-` when line breaks should be kept (rendered as `<br>`).
- Set `check_redundancy: false` on a satisfied property assignment that is redundant but deliberately kept (see below).

## Contribution guidelines

Full guidelines: [CONTRIBUTING.md](CONTRIBUTING.md). Contributions come in through the suggestion form on the site, GitHub issues, or pull requests from forks. The essentials for data changes:

- **Proofs for every claim**: satisfied and unsatisfied properties, implications, and special morphisms all need a proof or reference. If a proof refers to another proof, make the link explicit with labels and references. Move very long proofs or reusable lemmas into a `content/` page and link to it.
- **Reduce unknowns**: when adding a structure, decide as many of its properties as possible. When adding a property, try to decide it for all existing structures, and include implications connecting it to existing properties. For the structures in `expected-data/decided-*.json`, deciding every property is mandatory (enforced by `db:test`).
- **No redundant assignments**: only assign properties that cannot be deduced. Redundant satisfied assignments may be kept when the proof is trivial anyway, insightful, constructs (co)limits used later, avoids an overly complex automatic deduction, or establishes an intermediate result used later. Mark them with `check_redundancy: false`. Removing redundant assignments is not required but recommended, especially for unsatisfied properties.
- **Atomic implications**: do not add implications that follow from others, and do not add dual implications, since dualization is automatic. Prefer the "limit" variant over the "colimit" variant. When adding an implication, check whether it simplifies existing ones.
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
- Define recurring LaTeX notation as a macro in [database/data/macros.yaml](database/data/macros.yaml) (e.g. `\IN`, `\Grp`, `\Ab`).
- Run `pnpm cspell` after editing text, and add legitimate new words to `.cspell.json`.

Responsible use of AI (from CONTRIBUTING.md): AI-generated code and data (including proofs) are accepted if they are readable, understandable, and checked thoroughly by the human author, who must understand every line and argument and takes responsibility for every claim, link, and citation; PR descriptions and commit messages must be written manually.

## Writing proofs

Proofs are written for professional mathematicians. Readers are expected to know groups, rings, modules, topological spaces, and basic category theory (limits, adjunctions, the Yoneda lemma, ...), so standard facts from these areas need no proof. More specialized notions should be defined or linked.

Content:

- **Self-contained**: a reader should be able to follow the proof using only the structure's description, the property's definition, and the pages the proof links to. Prefer a direct argument to a bare citation. When citing a source, consider adding a direct argument as well ("Alternatively, here is a direct proof: ..."). Citing alone is fine for deep or standard theorems, such as the Special Adjoint Functor Theorem.
- **Easy to understand**: state the claim or key idea first, then the details ("We claim that ... To see this, ..."). Name objects and morphisms explicitly with source and target (`f : X \to Y`). For unsatisfied properties, give a concrete counterexample (e.g. "the embedding $C_2 \hookrightarrow S_3$") rather than an existence argument, whenever possible.
- **Complete**: do not skip steps. Phrases like "It is easy to see" or "clearly" are only for exceptional cases, namely steps that are routine for the intended reader. One-line proofs such as "This is trivial." or "This holds by definition." are only for claims that follow immediately from the definitions.
- **Classifications and equivalences**: when one direction is immediate, prove only the other one and say so ("For the non-trivial direction, ..."), as in most special-morphism proofs. In content pages, mark the two directions with `($\Rightarrow$)` and `($\Leftarrow$)`.
- **Building on known facts**: a proof may use properties of the same structure that are assigned earlier in the file or deduced from them ("We already know that ..."), as well as its classification of special morphisms ("(see below)"). Results about other structures may be used with a link to them. If a proof depends on the proof of another assignment, give that assignment a `label` of the form `<structure id>_<short description>` (e.g. `grp_no_cogenerator`) and list the label under `references`.
- **Reuse instead of repetition**: put general lemmas in `content/` pages instead of repeating an argument in several YAML files, and apply them explicitly, e.g. "apply the contrapositive of the dual of Lemma 2 <a href="/content/subcategories">here</a> to the forgetful functor $\Ab \to \Grp$".

Format:

- Write in full sentences, using "we". Introduce notation with `\coloneqq`, and use `$$...$$` for displayed formulas. In long YAML proofs, use a `>-` block and separate paragraphs with a blank line.
- Internal links in YAML: structures as `<a href="/category/Set">$\Set$</a>` (with the notation as link text), properties as `<a href="/category-property/<id>">...</a>`, and content pages as `<a href="/content/<name>">here</a>` or `<a href="/content/<name>">this lemma</a>`.
- External links in YAML get `target="_blank"` and point to a specific result: `See Prop. 4.2 at the <a href="..." target="_blank">nLab</a>.`, `<a href="https://math.stackexchange.com/questions/601463/" target="_blank">MSE/601463</a>` (`MO/...` for MathOverflow), and books with the author as link text followed by the location, e.g. `<a href="https://ncatlab.org/nlab/show/Categories+for+the+Working+Mathematician" target="_blank">Mac Lane</a>, Ch. V, Theorem 5.1`.
- Content pages are Markdown with `title` and `description` in the front matter and use Markdown links. Statements go in blocks such as `::: Lemma 1` (also `Proposition`, `Corollary`, `Claim`), closed by `:::`, followed by a `::: Proof` block. Where useful, also state the dual version of a result.

## Workflow after changing data

1. Edit the YAML files in `database/data/` (or the `content/` pages).
2. Run `pnpm db:update`, or `pnpm db:text` for text-only structure changes. If the schema changed, run `pnpm db:setup` first.
3. If `db:update` fails, the cause is usually malformed YAML or a schema validation error, a contradiction found during deduction, or a failing data-quality test.
4. Optionally run `pnpm db:redundancies`, and run `pnpm cspell`.
