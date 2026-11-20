# CatDat

_CatDat_ ([catdat.app](https://catdat.app)) is a searchable database of categorical structures and their properties, built by and for people who love category theory. It is an open-source community project.

Four types of categorical structures are supported: **categories**, **functors**, **morphisms**, and **symmetric monoidal categories** (`STRUCTURE_TYPES` in [shared/config.ts](shared/config.ts)). The data has three kinds of entries:

- **Structures**: e.g. `Set`, `Grp`, the abelianization functor. Each has a definition, satisfied and unsatisfied properties with proofs, and related structures.
- **Properties**: e.g. "cocomplete", "cartesian closed", "left adjoint". Each property belongs to one structure type.
- **Implications**: e.g. "abelian ⟹ additive", each with a proof.

From the implications, a **deduction system** infers further properties of each structure and **dualizes** implications and property assignments automatically. The app has detail pages for structures, properties, and implications, a search for structures by satisfied and unsatisfied properties (which also detects inconsistent combinations), a comparison of structures, and a page that lists missing data (`/missing`). Reusable lemmas and proofs that require lemmas are Markdown pages in [content/](content/), rendered at `/content/<name>`.

The admin functionality is in a separate repository, [CatDatAdmin](https://github.com/ScriptRaccoon/CatDatAdmin).

## Detailed guidelines

These files in [.claude/rules/](.claude/rules/) load automatically when working on matching files. Read them before writing data, proofs, or tests in any other way (e.g. when drafting a proof in chat):

- [data-guidelines.md](.claude/rules/data-guidelines.md): YAML data format and contribution guidelines (proofs for every claim, no redundant assignments, atomic implications, ...).
- [writing-proofs.md](.claude/rules/writing-proofs.md): writing and notation conventions, and how to write proofs (content, links, format).
- [database.md](.claude/rules/database.md): database tables and the details of `db:test` and `db:text`.
- [e2e-tests.md](.claude/rules/e2e-tests.md): organization of the Playwright tests.

## Tech stack

TypeScript, SvelteKit (Svelte 5), SQLite via `better-sqlite3`, KaTeX for math rendering, Playwright for end-to-end tests, Netlify for deployment, pnpm as package manager. Most pages are prerendered at build time; only the search and comparison pages are dynamic. See [DEPLOYMENT.md](DEPLOYMENT.md).

## Repository layout

- [database/data/](database/data/): **the source of truth.** YAML files for all structures, properties, and implications, one folder per kind and type (e.g. `categories/`, `category-properties/`, `category-implications/`, `functors/`, ...), plus `config.yaml` (tags, relations, special object and morphism kinds), `macros.yaml` (KaTeX macros), `special-morphism-rules.yaml`, and `undecidable-implications.yaml`.
- [database/schema/](database/schema/): SQL schema files, applied in order of their `NNN_` prefix.
- [database/scripts/](database/scripts/): the `db:*` scripts (seeding, deduction, tests).
- [database/test-data/](database/test-data/): data for `db:test`: `config.json` (per structure type, e.g. the structures with all properties decided) and `expected/` (the expected properties of selected structures, one JSON file per structure in a folder per type).
- [shared/](shared/): code used by both the database scripts and the app (`#shared/*` subpath import), e.g. the DB client and the structure type config. `history.json` records the order in which structures and properties were added; `db:seed` appends new entries, and the homepage reads it. When renaming a structure or property, rename it in the history as well.
- [src/](src/): the SvelteKit app. Routes are generic over the structure type (`src/routes/[type]`, `[type]-property`, `[type]-implication`, `[type]-search`, ...). Page components are in `src/pages/`, shared components in `src/components/`, server-side DB access in `src/lib/server/`.
- [content/](content/): Markdown content pages for reusable lemmas and proofs that require lemmas.
- [tests/](tests/): Playwright end-to-end tests.

## Commands

- `pnpm dev`, `pnpm build`, `pnpm preview`.
- `pnpm check`: Svelte and TypeScript checks (also type-checks the database scripts). `pnpm format` / `pnpm lint`: Prettier. `pnpm cspell`: spell-check `content/` and `database/`. All three checks run as pre-push hooks and in CI.
- `pnpm e2e`: Playwright tests (`e2e:debug` and `e2e:ui` are variants).
- `pnpm db:setup`: recreate `database/catdat.db` from the schema. Required after any schema change; `db:seed` aborts if the schema hash is outdated.
- `pnpm db:update`: runs `db:sort`, `db:seed`, `db:deduce`, `db:test`, and `db:snapshot`. **The standard command after editing any YAML data.** `--watch` reruns it on changes.
- `pnpm db:text`: fast path for text-only changes to existing entries (descriptions, proofs, names, ...), without rebuilding relations or running deductions. Supports `--watch`.
- `pnpm db:test`: data-quality checks (duals, positivity, decided structures, expected properties, proof links, history, redundant implications and assignments, ...).
- `pnpm db:combinations <id> [<id> ...]`: the combinations p ∧ ¬q that only the given structures (or their duals) witness.
- `pnpm db:structure <id> [group]`: the satisfied, unsatisfied, unknown, and undecidable properties of a structure.
- `pnpm db:shell`: `sqlite3` shell on the local database.

While `pnpm dev` is running, the browser reloads after `db:update`, after `db:text`, and when a file in `content/` changes; a change to `macros.yaml` restarts the dev server.

First-time setup: `pnpm install`, `pnpm db:setup`, `pnpm db:update`, `pnpm dev`. The database is generated, never committed, and never edited directly.

## Workflow after changing data

1. Edit the YAML files in `database/data/` (or the `content/` pages).
2. Run `pnpm db:update`, or `pnpm db:text` for text-only changes to existing structures, properties, and implications. If the schema changed, run `pnpm db:setup` first.
3. If `db:update` fails, the cause is usually malformed YAML or a schema validation error, a contradiction found during deduction, a failing data-quality test, or a redundant assignment or implication.
4. Run `pnpm cspell`.
