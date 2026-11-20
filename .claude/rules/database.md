---
paths:
    - 'database/**'
    - 'shared/**'
    - 'src/lib/server/**'
---

# Database

The SQLite database `database/catdat.db` is generated entirely from the YAML files and is **read-only at runtime**. Never edit the database directly; change the YAML files (or the schema) and regenerate. See [DATABASE.md](../../DATABASE.md) for details.

Main tables (full schema in [database/schema/](../../database/schema/)):

- `structure_types`: the four types. Most tables carry a `type` column, and composite foreign keys `(id, type)` ensure that, for example, a category property is only assigned to categories.
- `structures`: data common to all structures (`id`, `type`, `name`, `notation`, `description`, `nlab_link`, `dual_structure_id`, `parent_structure_id`). The `categories` table adds `objects` and `morphisms` for categories.
- `structure_associations` / `associated_structures`: typed links between structures, e.g. a functor's `domain`, `codomain`, `left_adjoint`, `right_adjoint`, a morphism's `category`, or a symmetric monoidal category's `underlying_category`.
- `properties`: primary key `(id, type)`, with a `relation` ("is", "has", "preserves", ...), `description`, `dual_property_id`, and `invariant_under_equivalences`.
- `property_assignments`: links structures to properties with `is_satisfied` (TRUE, FALSE, or NULL for undecidable), `proof`, `is_deduced`, `is_inherited` (deduced from the parent structure), and `check_redundancy`.
- `implications`, `assumptions`, `conclusions`: implications between properties of one type, with `is_equivalence`, `is_deduced`, `check_redundancy`, and `dual_implication_id`. The `implications_view` view combines them into JSON arrays.
- `associated_assumptions`: implication assumptions about associated structures, e.g. a functor implication that requires the domain category to be complete.
- `undecidable_implications`: implications P ⟹ Q of one type with one assumption and one conclusion that are undecidable in ZFC. They are not used for deductions; the property pages and the implications list show them in a separate section, and `/missing` omits the combination P ∧ ¬Q.
- `special_objects` / `special_object_assignments` and `special_morphisms` / `special_morphism_assignments` / `special_morphism_rules`: special objects (terminal, initial, products, coproducts) and special morphisms of categories. The kinds of special morphisms are morphism properties (isomorphism, monomorphism, epimorphism, regular monomorphism, regular epimorphism), and their duals are the dual properties. A special morphism assignment classifies the morphisms of a category with this property. The rules assign such a classification to every category with a given property.
- Additional tables: tags (`structure_tags`, `property_tags`, and their assignment tables), `related_structures`, `related_properties`, `structure_comments`, `structure_keywords`, `property_keywords`, `relations`.

The YAML files never contain derived data. Everything marked `is_deduced` is produced by `db:deduce`.

## Details of the scripts

`db:seed` clears all data and inserts the entries parsed from the YAML files (validated with `valibot` schemas in `database/scripts/utils/seed.schemas.ts`). `db:deduce` dualizes implications and deduces satisfied and unsatisfied properties for each structure type (for categories also special objects and morphisms); deduced rows are marked with `is_deduced`, and those inherited from a parent structure additionally with `is_inherited`. `db:sort` sorts the arrays in the JSON files in `database/test-data/` and formats them. `db:snapshot` copies the database to `static/databases/catdat-snapshot.db` for the download page. After `db:update`, and after `db:text` when it changed something, the script writes a timestamp to `database/.last-update` (gitignored), which a Vite plugin in [vite.config.ts](../../vite.config.ts) watches.

`db:test` checks data quality: every property has a dual (except those listed under `properties_without_dual` in `database/test-data/config.json`) and duals are mutual, structures and their duals are mutual, the structures listed under `positive_structures` there have no unsatisfied properties (positivity), all properties are decided for the structures listed under `decided_structures`, the properties of selected structures exactly match their JSON files in `database/test-data/expected/`, adjoint functors are recorded on both sides with matching domains and codomains, links in proofs point to existing entries (`?proof=` links to assigned proofs, unless marked with `data-allow-deduced`), all entries of the history file exist, no undecidable implication follows from the implications or is refuted by a structure, no implication follows from the others (not even one conclusion or one direction of an equivalence), and no property assignment can be deduced from others or inherited from the parent structure (both except those marked with `check_redundancy: false`). The redundancy tests run last and list all redundancies: one line per implication, and at most one per structure and kind (satisfied or unsatisfied) for assignments.

`db:text` covers text-only changes to existing structures (names, notations, alternative notations, descriptions, nLab links, comments, keywords, objects and morphisms of categories, proofs of property assignments), properties (descriptions, nLab links, keywords), and implications and undecidable implications (proofs). Special objects, special morphisms, and special morphism rules are not covered.
