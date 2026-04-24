# The database of _CatDat_

## Overview

_CatDat_ is based on a [SQLite database](https://sqlite.org/). During runtime of the application, it is read-only.

The local copy of the database is located at `/databases/catdat/catdat.db`. It has three main tables:

- `categories`
- `category_properties`
- `category_implications`

To associate properties with categories (satisfied or not), there is a table:

- `category_property_assignments`

To mark properties as assumptions or conclusions of an implication, there are two tables:

- `category_implication_assumptions`
- `category_implication_conclusions`

But they are abstracted away by using the view `category_implications_view`.

Further tables are:

- `tags`
- `category_tag_assignments`
- `related_categories`
- `relations`
- `special_object_types`
- `special_objects`
- `special_morphism_types`
- `special_morphisms`
- `related_category_properties`
- `category_comments`
- `lemmas` (a flexible variant of implications)

For functors there are similar tables, such as:

- `functors`
- `functor_properties`
- `functor_implications`
- `functor_property_assignments`

## Migrations vs. Data

Migrations update the database structure: tables, views, indexes, and triggers. They are defined in SQL files located in the subfolder [/databases/catdat/migrations](/databases/catdat/migrations/). The command `pnpm db:migrate` applies any new migrations.

Database entries (categories, properties, implications, etc.) are defined via SQL files in the subfolder [/databases/catdat/data](/databases/catdat/data). The command `pnpm db:seed` replaces the current database by clearing all existing data and inserting the entries defined in these SQL files.

## Derived Data

From the defined satisfied properties of a given category, new properties can be automatically deduced using the implications. (For example, when a category has equalizers and products, we can infer that it is complete.) The same applies to unsatisfied properties. Additionally, suitable implications may be dualized, and a category inherits all dualized properties of its dual category, if available. Note that the SQL files mentioned above do _not_ contain any derived data.

The command `pnpm db:deduce` deduces implications, satisfied properties, and unsatisfied properties.

## Test Data

The command `pnpm db:test` executes some tests and verifies that the data behaves as expected.

## One command for everything

Use `pnpm db:update` to run all the commands in sequence: `pnpm db:migrate`, `pnpm db:seed`,`pnpm db:deduce`, and `pnpm db:test`.

Use `pnpm db:watch` to run this command automatically every time a file in the subfolder [/databases/catdat/data](/databases/catdat/data) changes. This is useful in particular during development.

## Diagram

This is the database schema as of 24.04.2026; changes may occur.

<img alt="database diagram" src="https://github.com/user-attachments/assets/f315b67e-1bb1-4e93-970a-1e5288dba60e" />

## Application Database

The application itself uses another database to store user submissions and page visits. The local copy of this database is at `/databases/app/app.db`.
