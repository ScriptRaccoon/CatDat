# Test data

This folder contains the data used by `pnpm db:test` in addition to the database. Run `pnpm db:sort` to sort all arrays in these files alphabetically.

## Configuration

The file [config.json](config.json) contains for each structure type:

- `positive_structures`: structures that must satisfy every property. This enforces that all properties are positive.
- `decided_structures`: structures for which every property must be decided. If a new property is added to the database, decide it at least for these structures.
- `properties_without_dual`: properties that have no dual. Every other property must have one.

## Expected properties

The JSON files in [expected](expected/), in one folder per structure type, specify precisely which properties are satisfied and which are unsatisfied by a small selection of structures, as two arrays `satisfied` and `unsatisfied`. The file name is the ID of the structure. If a new property is added to the database, add it to the correct array in the files of its type.
