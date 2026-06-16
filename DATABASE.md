# The database of _CatDat_

## Overview

_CatDat_ is based on a [SQLite database](https://sqlite.org/). During runtime of the application, it is read-only.

The local copy of the database is located at `/databases/catdat/catdat.db`. It contains three main tables:

- `structures`
- `properties`
- `implications`

The `structures` table stores data that is common to all types of categorical structures. Two types are currently supported: categories and functors. They are stored in the following table:

- `structure_types`

Structure-specific data is stored in additional tables, such as:

- `categories`
- `functors`

Properties (whether satisfied or not) are associated with categorical structures via the following table:

- `property_assignments`

To mark properties as assumptions or conclusions of an implication, there are two tables:

- `assumptions`
- `conclusions`

These tables are abstracted through the `implications_view` view.

Functor implications may also depend on properties of the source or target category. Such dependencies are stored in the table:

- `mapped_assumptions`

Additional tables are available. For a complete overview, see the diagram below.

## Schema vs. Data

The schema defines the structure of the database: tables, views, indexes, and triggers. It is specified in several SQL files located in the subfolder [/databases/catdat/schema](/databases/catdat/schema/). The command

```
pnpm db:setup
```

deletes the old database file (if it exists) and creates a new one using this schema. This is required when the schema changes.

Database entries (categories, functors, properties, implications, etc.) are defined in YAML files located in the subfolder [/databases/catdat/data](/databases/catdat/data/). The command

```
pnpm db:seed
```

rebuilds the database by clearing all existing data and then parsing and inserting the entries defined in these YAML files.

## Derived Data

From the defined satisfied properties of a given categorical structure, new properties can be automatically deduced using the implications. (For example, when a category has equalizers and products, we can infer that it is complete.) The same applies to unsatisfied properties.

Additionally, suitable implications may be dualized, and a categorical structure inherits all dualized properties of its dual structure, if available. Note that the YAML files mentioned above do _not_ contain any derived data.

The command

```
pnpm db:deduce
```

deduces implications, satisfied properties, and unsatisfied properties.

## Test Data

The command

```
pnpm db:test
```

executes some tests and verifies that the data behaves as expected.

## One command for everything

Use the command

```
pnpm db:update
```

to run all the commands in sequence: `pnpm db:seed`,`pnpm db:deduce`, and `pnpm db:test`. This also creates a copy of the local database in the `/static` folder.

Use

```
pnpm db:watch
```

to run this command automatically every time a file in the subfolder [/databases/catdat/data](/databases/catdat/data) changes. This is useful in particular during development.

## Redundancies

There is another script that intentionally does not run with each update. Use the command

```
pnpm db:redundancies
```

to check for redundant assignments of properties to categorical structures.

## Diagram

This is the database schema as of 17.06.2026; changes may occur.

<img alt="database diagram" src="https://github.com/user-attachments/assets/8625e58a-660b-47f7-8e01-ab74a1286617" />

## Application Database

The application itself uses another database to store user submissions and page visits. The local copy of this database is at `/databases/app/app.db`.
