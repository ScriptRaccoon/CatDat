# How to Contribute

[Watch the YouTube video](https://youtu.be/NoZWdMFfQfg)

There are three ways to contribute:

- [Use the Suggestion Form](#option-1-use-the-suggestion-form)
- [Create an Issue](#option-2-create-an-issue)
- [Create a Pull Request](#option-3-create-a-pull-request)

## Option 1: Use the Suggestion Form

On most pages of CatDat, you will find a suggestion form at the bottom. Use it to contribute new data, report an issue, or make a suggestion. After submission, the form automatically creates a GitHub issue, which we then review and try to resolve and implement.

This option does not require any knowledge of GitHub or coding, making it accessible to everyone. It also does not require following any guidelines for adding new data (see below).

## Option 2: Create an Issue

If you want to report a bug or submit a feature request, you can [**create an issue**](https://github.com/ScriptRaccoon/CatDat/issues/new). You will need a GitHub account for this.

## Option 3: Create a Pull Request

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
6. Create the local database with `pnpm db:setup`.
7. Update the local database with `pnpm db:update`.
8. Start the local development server with `pnpm dev`.

**For Maintainers:** Redis is required for admin features and submissions. Start a local instance on port 6379 via `redis-server --port 6379`.

### Updating the Database

All updates to the database are made by modifying the YAML files in the folder [/databases/catdat/data](databases/catdat/data). See [DATABASE.md](/DATABASE.md) for an overview of the database structure.

Apply the updates using:

```sh
pnpm db:update
```

You can also use

```sh
pnpm db:watch
```

to continuously run this update when a file in the subfolder [/databases/catdat/data](/databases/catdat/data) changes.

### Troubleshooting

- If the local database is corrupted, or its schema has changed, recreate it using `pnpm db:setup`.
- If the `pnpm db:update` command fails, examine the error message to determine the cause. It could be due to malformed YAML, a contradictory property, or a failing test in the `pnpm db:test` script (which also runs as part of the update command), as explained below.

### Tests for Data Quality

The `pnpm db:test` command runs several tests to ensure the data behaves as expected and maintains good quality:

1. Properties and their duals are mutual.
2. Categories and their duals are mutual.
3. For a specified list of categories (see [decided-categories.json](/databases/catdat/scripts/expected-data/decided-categories.json)), all properties have been decided.
4. Every property of the categories `Set`, `Ab`, `Top` matches precisely the expected properties defined in the [/databases/catdat/scripts/expected-data](/databases/catdat/scripts/expected-data/) folder.

If any of these tests fail, adjust the data accordingly.

### Example Commits

_These commits refer to an old version of CatDat and will be replaced by more current ones._

- [Add category of Hausdorff spaces](https://github.com/ScriptRaccoon/CatDat/commit/390ed9c7996334138f8bc61c0b3f8e822003248a)
- [Add two tiny categories](https://github.com/ScriptRaccoon/CatDat/commit/e5781d87bdc084a65cf0ec67c7efc5b3e29c4303)
- [Add regular and coregular categories](https://github.com/ScriptRaccoon/CatDat/commit/e06f85fa13e5f8eeb42049880b5662be7fc36a50)

### Example Pull Requests

_These pull requests refer to an old version of CatDat and will be replaced by more current ones._

- [CMon is not coregular](https://github.com/ScriptRaccoon/CatDat/pull/27/changes)
- [Add "locally cartesian closed" property](https://github.com/ScriptRaccoon/CatDat/pull/3/changes)
- [Add "locally strongly finitely presentable" as a property](https://github.com/ScriptRaccoon/CatDat/pull/21/changes)
- [Add filtered and cofiltered categories](https://github.com/ScriptRaccoon/CatDat/pull/40/changes)
- [Add the simplex category](https://github.com/ScriptRaccoon/CatDat/pull/81)

### Guidelines for Adding New Data

When contributing new data (categories, functors, properties, implications), please follow these guidelines:

- **Consistency**: Stick to the format indicated by the existing data. This is enforced by the database definition.

- **Reduce Unknowns**: Try to reduce the number of unknown properties of categories, in particular when adding a new category. Use the category detail page to see its unknown properties. Use the [page with missing data](https://catdat.app/missing) to identify categories with unknown properties. The same remarks apply to functors.

- **Avoid redundant assignments**: Only assign properties (satisfied or not) to a category or functor if they cannot be deduced from other assignments. For example, if a category is complete, record that it is complete, but do not also record that it has a terminal object; the application infers this automatically. Redundant assignments can be identified using the redundancy script described below.

- **No dual categories**: Instead of adding the dual of a category already in the database, consider adding properties to the original category (use the corresponding dual properties).

- **No equivalent categories**: Do not add categories that are equivalent or even isomorphic to categories already in the database. If the equivalence is non-trivial, mention it in the description of the original category. Some exceptions are allowed, since certain properties (such as being skeletal) are not invariant under equivalence.

- **Special Objects and Morphisms**: For each new category, try to specify its special objects (terminal object, initial object, etc.) in the corresponding table. Also try to specify its special morphisms (isomorphisms, monomorphisms, epimorphisms).

- **Proofs for New Properties**: For every new property, for each existing category or functor, try to find a proof for whether it has this property or not, in case this has not already been deduced automatically via some implication. Use the property detail page to check unknown categories. These proofs may also refer to other categories, in which case you may add links to their corresponding pages. As mentioned in the section on tests, for a list of selected categories it is actually mandatory to decide their properties.

- **Counterexamples**: Ensure that at least one category does not satisfy any new property of categories that is added. If no existing category fits, add a new category that does not have the new property. The same remarks apply to properties of functors.

- **Easy properties first**: The order in which properties are assigned to a category will also be shown on its page. For this reason, prefer an order in which the trivial and easy assignments appear first. More technical properties should usually appear later. Assignments of closely related properties should also be grouped together whenever possible.

- **Positive Properties**: Do not add negated properties to the database. For example, do not add "large" as the negation of "small". Instead, add "small" to the list of unsatisfied properties for a category. Every registered property of categories should be satisfied at least by the trivial category. Similarly, every property of functors should be satisfied at least by the identity functor.

- **Proofs for Claims**: Provide proofs for all new claims (satisfied properties, unsatisfied properties, implications, special morphisms).

- **Atomic Implications**: Do not add implications that can be deduced from others. For example, do not add "complete => finite products" since it can be deduced from "complete => finitely complete" and "finitely complete => finite products". These are deduced automatically.

- **No dual implications**: Implications are dualized automatically when applicable. For this reason, adding the category implication "finitely cocomplete => pushouts" is not necessary when "finitely complete => pullbacks" has already been added. Similarly, the functor implication "comonadic => left adjoint" is automatically dualized from "monadic => right adjoint". When an implication can be phrased both in a "limit" or "colimit" variant, prefer the "limit" variant (unless the literature focusses on the "colimit" variant).

- **Relevant implications**: When adding a new property, include implications involving this property and existing properties. For example, when adding the property of categories of having "countable products", also add the implication "countable products => finite products". Refactor existing implications if necessary. Ensure that for most categories and functors, it will be inferred if the property holds or not.

- **Simplify Implications**: When adding a new implication, check if it simplifies existing implications and if it deduces some previously non-deduced properties for categories.

- **Avoid repetition**: When the same argument is used repeatedly for various categories but cannot be added as an implication, create a lemma and refer to its page where needed.

- **New Combinations**: Add new categories that satisfy combinations of satisfied properties and unsatisfied properties and not yet in the database. For example, you may add a category that is abelian but neither cocomplete nor essentially small (if it is not already present). The [page with missing data](https://catdat.app/missing) lists consistent combinations of the form $p \land \neg q$ that are not yet witnessed by a category in the database. The same remarks apply to functors.

### Redundancy Script

As noted above, avoid redundant property assignments to a category. To detect redundancies, run `pnpm db:redundancies`.

The script reports at most one redundant assignment per category for each of satisfied and unsatisfied properties, even if multiple exist. After removing an assignment, run the script again to ensure that all remaining redundancies are handled.

Removing redundant assignments is not required, but it is recommended, especially for all unsatisfied properties. For satisfied properties, removal depends on context: keep them if the proof is meaningful, otherwise consider removing them if it is purely technical or uninformative.

In particular, it often makes sense to **keep** a redundant assignment of a satisfied property in the following cases:

- The proof for the property is straight forward anyway (e.g. showing that a category is pointed).
- The proof provides useful insight.
- The proof constructs objects (especially limits or colimits) that are used later.
- Removing the assignment would lead to an overly complex deduction generated by _CatDat_.
- The proof establishes an intermediate result that is used as an assumption in a later argument.

For example, you may first prove that a category has zero morphisms, and then prove that it is normal. Although the database contains the implication "normal => zero morphisms", in practice the latter is used as a prerequisite. Similarly, when proving that a category is extensive, it is often clearer to first show that finite coproducts exist, rather than relying on the implication "extensive => finite coproducts". Also, an explicit description of finite coproducts is useful for deciding other properties involving coproducts.

Every redundant assignment of a satisfied property that is intentionally kept must be explicitly marked to skip the redundancy check. See `N.yaml` for an example.

### Keep Pull Requests Focused

Please keep each pull request limited in scope. Large pull requests are harder to review, more likely to conflict with ongoing changes on the main branch, and more difficult to merge cleanly.

If you plan to contribute multiple additions or improvements, split the work into several smaller pull requests and submit them one at a time. A pull request cannot be too small, but it can certainly be too large.

Examples of appropriate pull requests include:

- adding a single category property and determining it for several categories in the database,
- adding a single category together with its properties,
- adding a single missing proof
- clarifying definitions, explanations, or documentation.

As a practical guideline, avoid introducing more than four properties (or four categories) in a single pull request.

### Conventions

1. Use `\varnothing` to display the empty set, not `\emptyset`.
2. Write `non-empty`, not `nonempty`. Same for `non-unital`, `non-expansive`, etc.
3. For LaTeX symbols that are used repeatedly, in particular category-theoretic notation, define a LaTeX macro in [macros.yaml](databases/catdat/data/macros.yaml).

### Responsible Use of AI

AI tools may be used to assist with development in this repository, but not to replace the act of programming.

- Use AI to support your workflow (e.g. by asking questions, getting suggestions, or creating snippets), not to generate complete features or large portions of code without your active involvement.
- AI agents that autonomously generate or modify code are not allowed. Pull requests that are mainly written by AI agents will be closed.
- AI can also be used to find proofs for properties of categories, but they must be checked thoroughly and written in your own words.
- AI may also be used to improve English writing (e.g. grammar, clarity, phrasing), particularly if you are not a native speaker.
- Every line of code in a pull request must be understood by the developer submitting it.
- Pull request descriptions and commit messages must be written manually. AI-generated summaries are often superficial, meaningless, and do not tell the whole story.

In summary, treat AI as a productivity tool, not as a substitute for understanding or authorship.

### Authoring of YAML files

If you are not familiar with YAML, a short beginner-friendly introduction can be found at https://www.youtube.com/watch?v=1uFVr15xDGg. You can also look at the existing files in the data folder to get a feel for how the data is structured.

1. It is recommended to enable word wrap in your editor when working with YAML files.
2. HTML may be used inside string values, for example for links (`<a>`), italic text (`<i>`), and ordered lists (`<ol>`).
3. Use single-quoted strings (`'...'`) for values containing `:`. See `Cat.yaml` for an example. Inside single-quoted strings, a literal single quote must be escaped as `''`. See `Man.yaml` for an example.
4. Use `>-` for multiline text that should be rendered as a single paragraph without line breaks. This is particularly useful for improving readability of longer texts or HTML lists in the YAML file itself. See `core-thin.yaml` for an example.
5. Use `|-` for multiline text where line breaks should be preserved. These line breaks are automatically converted to `<br>` when rendered. See `FreeAb.yaml` for an example.
