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
- `category_property_comments`
- `lemmas` (a flexible variant of implications)

For functors there are similar tables, such as:

- `functors`
- `functor_properties`
- `functor_implications`
- `functor_property_assignments`

## Schema vs. Data

The schema defines the structure of the database: tables, views, indexes, and triggers. It is specified in several SQL files located in the subfolder [/databases/catdat/schema](/databases/catdat/schema/). The command `pnpm db:setup` deletes the old database file (if it exists) and creates a new one using this schema. This is required when the schema changes, so it is recommended to run it periodically.

Database entries (categories, properties, implications, etc.) are defined in YAML files located in the subfolder [/databases/catdat/data](/databases/catdat/data/). The command `pnpm db:seed` rebuilds the database by clearing all existing data and then parsing and inserting the entries defined in these YAML files.

## Derived Data

From the defined satisfied properties of a given category, new properties can be automatically deduced using the implications. (For example, when a category has equalizers and products, we can infer that it is complete.) The same applies to unsatisfied properties. Additionally, suitable implications may be dualized, and a category inherits all dualized properties of its dual category, if available. Note that the YAML files mentioned above do _not_ contain any derived data.

The command `pnpm db:deduce` deduces implications, satisfied properties, and unsatisfied properties.

## Test Data

The command `pnpm db:test` executes some tests and verifies that the data behaves as expected.

## One command for everything

Use `pnpm db:update` to run all the commands in sequence: `pnpm db:seed`,`pnpm db:deduce`, and `pnpm db:test`.

Use `pnpm db:watch` to run this command automatically every time a file in the subfolder [/databases/catdat/data](/databases/catdat/data) changes. This is useful in particular during development.

## Redundancies

There is another script that intentionally does not run with each update: `pnpm db:redundancies` checks for redundant assignments of properties to categories.

## Diagram

This is the database schema as of 24.04.2026; changes may occur.

<img alt="database diagram" src="https://github.com/user-attachments/assets/411f9d8a-c28b-4d8f-919c-0ff2aad6a989" />

## Application Database

The application itself uses another database to store user submissions and page visits. The local copy of this database is at `/databases/app/app.db`.
