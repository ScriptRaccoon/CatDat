# How to Contribute

There are three ways to contribute:

- [Use the Suggestion Form](#option-1-use-the-suggestion-form)
- [Create a Pull Request](#option-2-create-a-pull-request)
- [Create an Issue](#option-3-create-an-issue)

## Option 1: Use the Suggestion Form

On most pages of CatDat, you will find a suggestion form at the bottom. Use it to contribute new data, report an issue, or make a suggestion. After submission, the form automatically creates a GitHub issue, which we then review and try to resolve and implement.

This option does not require any knowledge of GitHub or coding, making it accessible to everyone. It also does not require following any guidelines for adding new data (see below).

## Option 2: Create a Pull Request

Create a [**pull request**](https://github.com/ScriptRaccoon/CatDat/pulls). You will need a GitHub account.

### New to open source?

If you have not contributed to an open source project before, start by forking the repository on GitHub. A _fork_ is your own copy of the project under your GitHub account. It lets you make changes safely without affecting the original repository. A _pull request_ is a way to propose changes to the project and have them reviewed before they are merged into the original repository.

The typical process is:

- Fork `ScriptRaccoon/CatDat` on GitHub.
- Clone your fork to your computer.
- Create a new branch for your change.
- Apply your changes locally.
- Push the changes to your fork.
- Open a pull request from your fork back to the original repository.

More info can be found in GitHub's help section:

- [Collaborating with pull requests](https://docs.github.com/en/pull-requests/collaborating-with-pull-requests)

### Local Setup

You need to have [Git](https://git-scm.com/), [NodeJS](https://nodejs.org/) and [pnpm](https://pnpm.io/) installed.

1. Fork `ScriptRaccoon/CatDat` on GitHub.
2. Clone your fork with `git clone https://github.com/{your_username}/CatDat.git`.
3. Change into the directory with `cd CatDat`.
4. Install dependencies with `pnpm install`.
5. Create a local `.env` file from `.env.example`.
6. Create the local database with `pnpm db:update`.
7. Start the local development server with `pnpm dev`.

**For Maintainers:** Redis is required for admin features and submissions. Start a local instance on port 6379 via `redis-server --port 6379`.

### Updating the Database

All updates to the database are made by updating the SQL files in the folder [/database](database/) (see also [DATABASE.md](/DATABASE.md)).

Apply the updates using:

```sh
pnpm db:update
```

You can also use

```sh
pnpm db:watch
```

to continuously run this update when a file in the subfolder [/database/data](/database/data) changes.

### Troubleshooting

- If the local database is corrupted, delete the `local.db` file and recreate it using `pnpm db:update`.
- If the `pnpm db:update` command fails, examine the error message to determine the cause. It could be due to malformed SQL or a failing test in the `pnpm db:test` script (which also runs as part of the update command), as explained below.

### Tests for Data Quality

The `pnpm db:test` command runs several tests to ensure the data behaves as expected and maintains good quality:

1. Properties and their duals are mutual.
2. Categories and their duals are mutual.
3. For a specified list of categories (see [decided-categories.json](/scripts/expected-data/decided-categories.json)), all properties have been decided.
4. Every property of the "core categories" (currently: `Set`, `Ab`, `Top`) matches precisely the expected properties defined in the [/scripts/expected-data](/scripts/expected-data/) folder.

If any of these tests fail, adjust the data accordingly.

### Example Commits

- [Add category of Hausdorff spaces](https://github.com/ScriptRaccoon/CatDat/commit/390ed9c7996334138f8bc61c0b3f8e822003248a)
- [Add two tiny categories](https://github.com/ScriptRaccoon/CatDat/commit/e5781d87bdc084a65cf0ec67c7efc5b3e29c4303)
- [Add regular and coregular categories](https://github.com/ScriptRaccoon/CatDat/commit/e06f85fa13e5f8eeb42049880b5662be7fc36a50)

### Example Pull Requests

- [CMon is not coregular](https://github.com/ScriptRaccoon/CatDat/pull/27/changes)
- [Add "locally cartesian closed" property](https://github.com/ScriptRaccoon/CatDat/pull/3/changes)
- [Add "locally strongly finitely presentable" as a property](https://github.com/ScriptRaccoon/CatDat/pull/21/changes)
- [Add filtered and cofiltered categories](https://github.com/ScriptRaccoon/CatDat/pull/40/changes)
- [Add the simplex category](https://github.com/ScriptRaccoon/CatDat/pull/81)

### Guidelines for Adding New Data

When contributing new data (categories, functors, properties, implications), please follow these guidelines:

- **Consistency**: Stick to the format indicated by the existing data. This is enforced by the database definition.

- **Reduce Unknowns**: Try to reduce the number of unknown properties of categories, in particular when adding a new category. Use the category detail page to see its unknown properties. Use the [page with missing data](https://catdat.app/missing) to identify categories with unknown properties. The same remarks apply to functors.

- **Atomic Properties**: Only assign properties to a category or functor that cannot be deduced from other properties (satisfied or not). For example, if a category is complete, add the property "complete", but do not add "terminal object". The application infers this property automatically.

- **No dual categories**: Instead of adding the dual of a category already in the database, consider adding properties to the original category (use the corresponding dual properties).

- **No equivalent categories**: Do not add categories that are equivalent or even isomorphic to categories already in the database. If the equivalence is non-trivial, mention it in the description of the original category. Some exceptions are allowed, since certain properties (such as being skeletal) are not invariant under equivalence.

- **Special Objects and Morphisms**: For each new category, try to specify its special objects (terminal object, initial object, etc.) in the corresponding table. Also try to specify its special morphisms (isomorphisms, monomorphisms, epimorphisms).

- **Proofs for New Properties**: For every new property, for each existing category or functor, try to find a proof for whether it has this property or not, in case this has not already been deduced automatically via some implication. Use the property detail page to check unknown categories. As mentioned in the section on tests, for a list of selected categories it is actually mandatory to decide their properties.

- **Counterexamples**: Ensure that at least one category does not satisfy any new property of categories that is added. If no existing category fits, add a new category that does not have the new property. The same remarks apply to properties of functors.

- **Positive Properties**: Do not add negated properties to the database. For example, do not add "large" as the negation of "small". Instead, add "small" to the list of unsatisfied properties for a category. Every registered property of categories should be satisfied at least by the trivial category. Similarly, every property of functors should be satisfied at least by the identity functor.

- **Proofs for Claims**: Provide proofs for all new claims (satisfied properties, unsatisfied properties, implications, special morphisms). (We are currently working on filling in the existing ones.)

- **Atomic Implications**: Do not add implications that can be deduced from others. For example, do not add "complete => finite products" since it can be deduced from "complete => finitely complete" and "finitely complete => finite products". These are deduced automatically.

- **No dual implications**: Implications are dualized automatically when applicable. For this reason, adding the category implication "finitely cocomplete => pushouts" is not necessary when "finitely complete => pullbacks" has already been added. Similarly, the functor implication "comonadic => left adjoint" is automatically dualized from "monadic => right adjoint". When an implication can be phrased both in a "limit" or "colimit" variant, prefer the "limit" variant (unless the literature focusses on the "colimit" variant).

- **Relevant implications**: When adding a new property, include implications involving this property and existing properties. For example, when adding the property of categories of having "countable products", also add the implication "countable products => finite products". Refactor existing implications if necessary. Ensure that for most categories and functors, it will be inferred if the property holds or not.

- **Simplify Implications**: When adding a new implication, check if it simplifies existing implications and if it deduces some previously non-deduced properties for categories.

- **Avoid repetition**: When the same argument is used repeatedly for various categories but cannot be added as an implication, create a lemma and refer to its page where needed.

- **New Combinations**: Add new categories that satisfy combinations of satisfied properties and unsatisfied properties and not yet in the database. For example, you may add a category that is abelian but neither cocomplete nor essentially small (if it is not already present). The [page with missing data](https://catdat.app/missing) lists consistent combinations of the form $p \land \neg q$ that are not yet witnessed by a category in the database. The same remarks apply to functors.

### Keep Pull Requests Focused

Please keep each pull request limited in scope. Large pull requests are harder to review, more likely to conflict with ongoing changes on the main branch, and more difficult to merge cleanly.

If you plan to contribute multiple additions or improvements, split the work into several smaller pull requests and submit them one at a time. A pull request cannot be too small, but it can certainly be too large.

Examples of appropriate pull requests include:

- adding a single category property and determining it for several categories in the database,
- adding a single category together with its properties,
- adding a single missing proof ([Example](https://github.com/ScriptRaccoon/CatDat/pull/27))
- clarifying definitions, explanations, or documentation.

As a practical guideline, avoid introducing more than four properties (or four categories) in a single pull request.

### Conventions

1. Use `\varnothing` to display the empty set, not `\emptyset`.
2. Write `non-empty`, not `nonempty`. Same for `non-unital`, `non-expansive`, etc.

## Option 3: Create an Issue

If you want to report a bug or submit a feature request, you can [**create an issue**](https://github.com/ScriptRaccoon/CatDat/issues/new). You will need a GitHub account for this.

## Deprecated Options

Before the Suggestion Form (Option 1) was introduced, you could use a [Google Form](https://forms.gle/8LBmro5FfSa43pD2A). It is deprecated and will be removed soon.
