# How to contribute

[Watch the YouTube video](https://youtu.be/NoZWdMFfQfg)

There are three ways to contribute:

- [Use the suggestion form](#option-1-use-the-suggestion-form)
- [Create an issue](#option-2-create-an-issue)
- [Create a pull request](#option-3-create-a-pull-request)

## Option 1: Use the suggestion form

On most pages of CatDat, you will find a suggestion form at the bottom. Use it to contribute new data, report an issue, or make a suggestion. Submissions are reviewed before a GitHub issue is created automatically, which we then try to resolve or implement.

This option does not require any knowledge of GitHub or coding, making it accessible to everyone. It also does not require following any guidelines for adding new data (see below).

## Option 2: Create an issue

If you want to report a bug or submit a feature request, you can [**create an issue**](https://github.com/ScriptRaccoon/CatDat/issues/new). You will need a GitHub account.

## Option 3: Create a pull request

Create a [**pull request**](https://github.com/ScriptRaccoon/CatDat/pulls). You will need a GitHub account.

### New to open source?

If you have not contributed to an open-source project before, start by forking the repository on GitHub. A _fork_ is your own copy of the project under your GitHub account. It lets you make changes safely without affecting the original repository. A _pull request_ is a way to propose changes to the project and have them reviewed before they are merged into the original repository.

The typical process is:

- Fork `ScriptRaccoon/CatDat` on GitHub.
- Clone your fork to your computer.
- Create a new branch for your change.
- Apply your changes locally.
- Push the changes to your fork.
- Open a pull request from your fork back to the original repository.

More info can be found in GitHub's help section:

- [Collaborating with pull requests](https://docs.github.com/en/pull-requests/collaborating-with-pull-requests)

### Local setup

You need to have [Git](https://git-scm.com/), [Node.js](https://nodejs.org/) and [pnpm](https://pnpm.io/) installed.

1. Fork `ScriptRaccoon/CatDat` on GitHub.
2. Clone your fork with `git clone https://github.com/{your_username}/CatDat.git`.
3. Change into the directory with `cd CatDat`.
4. Install dependencies with `pnpm install`.
5. Create the local database with `pnpm db:setup`.
6. Update the local database with `pnpm db:update`.
7. Start the local development server with `pnpm dev`.

### Updating the database

All updates to the database are made by modifying the YAML files in the folder [/database/data](database/data). See [DATABASE.md](/DATABASE.md) for an overview of the database structure, and see [below](#authoring-of-yaml-files) for some tips on how to edit YAML files.

Apply the updates using:

```sh
pnpm db:update
```

To continuously run the update when a file in the data folder changes, use

```sh
pnpm db:update --watch
```

For text-only changes to existing structures, properties, or implications (such as descriptions or proofs), use `pnpm db:text`. It updates changed texts without rebuilding relations or running deductions. Add `--watch` to keep it running and update whenever a YAML file changes.

While `pnpm dev` is running, the browser reloads automatically after `pnpm db:update` or `pnpm db:text` has changed the database. Combined with `--watch`, saving a YAML file thus updates the open page.

### Troubleshooting

- If the local database is corrupted, or its schema has changed, recreate it using `pnpm db:setup`.
- If the `pnpm db:update` command fails, examine the error message to determine the cause. It could be due to malformed YAML, a contradictory property, or a failing test in the `pnpm db:test` script (which also runs as part of the update command), as explained below.

### Tests for data quality

The `pnpm db:test` command runs several tests to ensure the data behaves as expected and maintains good quality:

1. Properties of categories and functors and their duals are mutual.
2. Categories and their duals are mutual.
3. A selection of trivial structures has no unsatisfied properties, i.e. all properties are positive (see the guidelines below).
4. For a selection of structures of each type, all properties have been decided (see the JSON files in the [/database/scripts/decided-structures](/database/scripts/decided-structures/) folder).
5. For a selection of structures, every property matches precisely the expected properties defined in the [/database/scripts/expected-data](/database/scripts/expected-data/) folder.
6. Adjoint functors are recorded on both sides (left and right adjoint), and their domains and codomains match.
7. All links in proofs point to existing structures, properties, implications, and content pages.
8. Every entry of the history file [history.json](/shared/history.json) exists. When you rename a structure or property, rename it in the history file as well (new entries are added automatically by `pnpm db:seed`).
9. There are no redundant property assignments (see [below](#redundant-assignments)) and no redundant implications (see [below](#redundant-implications)).

When you add a property to the JSON files in these two folders, you can insert it anywhere: `pnpm db:update` sorts them alphabetically.

If any of these tests fail, adjust the data accordingly.

**For maintainers:** The command `pnpm e2e` executes end-to-end tests via Playwright.

### Example pull requests

- [Add category of compact Hausdorff spaces](https://github.com/ScriptRaccoon/CatDat/pull/160)
- [Add new property: locally finite](https://github.com/ScriptRaccoon/CatDat/pull/180)
- [Add the category of countable groups](https://github.com/ScriptRaccoon/CatDat/pull/171)

### Guidelines for adding new data

When contributing new data (categories, functors, properties, implications, etc.), please follow these guidelines:

- **Consistency**: Stick to the format indicated by the existing data. This is enforced by the database definition.

- **Reduce unknowns**: Try to reduce the number of unknown properties of categories, in particular when adding a new category. Use the category detail page to see its unknown properties. Use the [page with missing data](https://catdat.app/missing) to identify categories with unknown properties. The same remarks apply to functors and other categorical structures.

- **Avoid redundant assignments**: Only assign properties (satisfied or not) to a category or any other categorical structure if they cannot be deduced from other assignments or inherited from a parent structure. For example, if a category is complete by a direct proof, record that it is complete, but do not also record that it has a terminal object; the application infers this automatically. Redundant assignments are reported by `pnpm db:test`, see below.

- **References and labels**: If a proof refers to another proof, use references and labels to make this connection explicit. See [this PR](https://github.com/ScriptRaccoon/CatDat/pull/319) for details.

- **No dual categories**: Instead of adding the dual of a category already in the database, consider adding properties to the original category (use the corresponding dual properties).

- **No equivalent categories**: Do not add categories that are equivalent or even isomorphic to categories already in the database. If the equivalence is non-trivial, mention it in the description of the original category. Some exceptions are allowed, since certain properties (such as being skeletal) are not invariant under equivalence.

- **Special objects and morphisms**: For each new category, try to specify its special objects (terminal object, initial object, etc.) in the corresponding table. Also try to specify its special morphisms (isomorphisms, monomorphisms, epimorphisms, regular monomorphisms, regular epimorphisms).

- **Proofs for new properties**: For every new property of categories, for each existing category, try to find a proof for whether it has this property or not, in case this has not already been deduced automatically via some implication. Use the property detail page to check unknown cases. These proofs may also refer to other categories, in which case you may add links to their corresponding pages. As mentioned in the section on tests, for a list of selected categories it is actually mandatory to decide their properties. The same remarks apply to functors and other categorical structures.

- **Counterexamples**: For any added property of categories, ensure that at least one category does not satisfy it. If no existing category fits, add a new category that does not have the new property. The same remarks apply to properties of functors and other categorical structures.

- **Easy properties first**: The order in which properties are assigned to a category (or any other categorical structure) will also be shown on its page. For this reason, prefer an order in which the trivial and easy assignments appear first. More technical properties should usually appear later. Assignments of closely related properties should also be grouped together whenever possible.

- **Positive properties**: Do not add negated properties to the database. For example, do not add "large" as the negation of "small". Instead, add "small" to the list of unsatisfied properties for a category. Every registered property of categories should be satisfied at least by the trivial category. Similarly, every property of functors should be satisfied at least by the identity functor.

- **Proofs for claims**: Provide proofs for all new claims (satisfied properties, unsatisfied properties, implications, special morphisms).

- **Atomic implications**: Do not add implications that can be deduced from others. For example, do not add "complete => finite products" since it can be deduced from "complete => finitely complete" and "finitely complete => finite products". These are combined automatically. This also applies to single conclusions of an implication and to single directions of an equivalence. Redundant implications are reported by `pnpm db:test`, see below.

- **No dual implications**: Implications are dualized automatically when applicable. For this reason, adding the category implication "finitely cocomplete => pushouts" is not necessary when "finitely complete => pullbacks" has already been added. Similarly, the functor implication "comonadic => left adjoint" is automatically dualized from "monadic => right adjoint". When an implication can be phrased in either a "limit" or a "colimit" variant, prefer the "limit" variant (unless the literature focusses on the "colimit" variant).

- **Relevant implications**: When adding a new property, include implications involving this property and existing properties. For example, when adding the property of categories of having "countable products", also add the implication "countable products => finite products". Refactor existing implications if necessary. Ensure that for most categorical structures, it will be inferred whether the property holds or not.

- **Simplify implications**: When adding a new implication, check if it simplifies existing implications and if it deduces some previously non-deduced properties.

- **Content pages**: Use Markdown-generated content pages for reusable lemmas that apply to multiple property assignments, and for proofs that require their own lemmas. Long proofs that do not fall into these cases can stay in the YAML files. Content pages are located in the [`/content`](/content/) folder. For example, `/content/subcategories.md` is rendered at [`/content/subcategories`](https://catdat.app/content/subcategories).

- **New combinations**: Add new categories that satisfy combinations of satisfied and unsatisfied properties that are not yet in the database. For example, you may add a category that is abelian but neither cocomplete nor essentially small (if it is not already present). The [page with missing data](https://catdat.app/missing) lists consistent combinations of the form $p \land \neg q$ that are not yet witnessed by a category in the database. The same remarks apply to functors and other categorical structures.

### Redundant assignments

As noted above, avoid redundant property assignments to a categorical structure. They are reported by `pnpm db:test`, which runs as part of `pnpm db:update`.

Redundant assignments must be removed, or, if they are deliberately kept, marked with `check_redundancy: false`. For unsatisfied properties, removal is almost always the right choice. For satisfied properties, it depends on context: keep them if the proof is meaningful, otherwise remove them if it is purely technical or uninformative.

In particular, it often makes sense to **keep** a redundant assignment of a satisfied property in the following cases:

- The proof for the property is straightforward anyway (e.g. showing that a category is pointed).
- The proof provides useful insight.
- The proof constructs objects (especially limits or colimits) that are used later.
- Removing the assignment would lead to an overly complex deduction generated by _CatDat_.
- The proof establishes an intermediate result that is used as an assumption in a later argument.

For example, you may first prove that a category has zero morphisms, and then prove that it is normal. Although the database contains the implication "normal => zero morphisms", in practice the latter is used as a prerequisite. Similarly, when proving that a category is extensive, it is often clearer to first show that finite coproducts exist, rather than relying on the implication "extensive => finite coproducts". Also, an explicit description of finite coproducts is useful for deciding other properties involving coproducts.

Every redundant assignment that is intentionally kept must be explicitly marked to skip the redundancy check. See [`Man.yaml`](/database/data/categories/Man.yaml) for an example.

### Redundant implications

As noted above, implications should be atomic. `pnpm db:test` reports an implication if one of its conclusions (or one direction of an equivalence) can be deduced from the other implications.

Redundant implications must be removed, or, if they are deliberately kept, marked with `check_redundancy: false`. Usually, removal is the right choice, since _CatDat_ combines implications automatically. It makes sense to **keep** a redundant implication in the following cases:

- It states a definition or a standard characterization from the literature, even if one of its conclusions follows from the others.
- Removing it would lead to an overly complex deduction, typically when the deduction needs a long chain or a detour through unrelated notions, while the implication has a short direct proof.

For example, the implication "cartesian closed + strict terminal object => thin" can be deduced via natural numbers objects, one-way categories, and core-thin categories. Its direct proof takes three lines, and it is used for many deductions, such as that **Set** has no strict terminal object. Without it, these deductions would go through the long chain.

Every redundant implication that is intentionally kept must be explicitly marked to skip the redundancy check. See [`accessible.yaml`](/database/data/category-implications/accessible.yaml) for some examples.

### Keep pull requests focused

Please keep each pull request limited in scope. Large pull requests are harder to review, more likely to conflict with ongoing changes on the main branch, and more difficult to merge cleanly.

If you plan to contribute multiple additions or improvements, split the work into several smaller pull requests and submit them one at a time. A pull request cannot be too small, but it can certainly be too large.

Examples of appropriate pull requests include:

- adding a single category property and determining it for several categories in the database,
- adding a single category together with its properties,
- adding a single missing proof,
- clarifying definitions, explanations, or documentation.

As a practical guideline, avoid introducing more than four properties (or four categories) in a single pull request.

### Conventions

1. Write `non-empty`, not `nonempty`. Same for `non-unital`, `non-expansive`, etc.
2. Use `\varnothing` to display the empty set, not `\emptyset`.
3. Write concrete sets explicitly, not as `0`, `1`, `2`: the empty set as `\varnothing`, a singleton as `\{\ast\}`, a two-element set as `\{0,1\}` or `\{a,b\}`, also when they are initial or terminal objects (e.g. `x : \{\ast\} \to X` in `\Set`).
4. For declarations of functions or morphisms, use `f : X \to Y`, not `f \colon X \to Y`.
5. For definitions, use `\coloneqq` instead of `:=`.
6. For LaTeX symbols that are used repeatedly, in particular category-theoretic notation, define a LaTeX macro in [macros.yaml](database/data/macros.yaml).

### Citations

When citing a book or paper, follow these rules:

1. The link text is the author's last name, not the title of the work.
2. The location (theorem, proposition, section, etc.) comes after the link, separated by a comma.
3. Multiple authors are joined with an en-dash (`–`), not a hyphen.

For example:

```yaml
proof: See <a href="https://doi.org/10.1016/0022-4049(93)90035-R">Carboni–Lack–Walters</a>, Prop. 4.5.
```

```yaml
proof: See <a href="https://pi.math.cornell.edu/~hatcher/AT/ATpage.html">Hatcher</a>, Example 1B.7.
```

For posts on [Mathematics Stack Exchange](https://math.stackexchange.com) and [MathOverflow](https://mathoverflow.net), follow these rules:

1. The link text is `MSE/<question id>` or `MO/<question id>`, not the title of the question.
2. To cite the question as a whole, link to `https://math.stackexchange.com/questions/<question id>` (resp. `https://mathoverflow.net/questions/<question id>`), without the title slug.
3. To cite a specific answer, link to `https://math.stackexchange.com/a/<answer id>` (resp. `https://mathoverflow.net/a/<answer id>`), but keep the question ID in the link text.
4. Remove the user ID that the "Share" button appends to answer links (e.g. `/a/511519/2841` becomes `/a/511519`).

For example:

```yaml
proof: See <a href="https://math.stackexchange.com/questions/601463">MSE/601463</a>.
```

```yaml
proof: This is shown in <a href="https://mathoverflow.net/a/510809">MO/510744</a>.
```

### Responsible use of AI

AI tools may be used for both code and data in this repository, as long as a human author takes full responsibility for the result.

- AI-generated code and data (proofs, structures, properties, implications) are accepted as long as they are readable, understandable, and have been checked thoroughly by you.
- You are the author: you must understand every line of code and every argument and be able to explain them, check every claim, link, and citation, and fix anything that is unclear, incomplete, or wrong before submitting it.
- AI may also be used to improve English writing (e.g. grammar, clarity, phrasing), particularly if you are not a native speaker.

In summary, treat AI as a productivity tool, not as a substitute for understanding or authorship.

### Authoring of YAML files

If you are not familiar with YAML, a short beginner-friendly introduction can be found at https://www.youtube.com/watch?v=1uFVr15xDGg. You can also look at the existing files in the data folder to get a feel for how the data is structured.

1. It is recommended to enable word wrap in your editor when working with YAML files.
2. HTML may be used inside string values, for example for links (`<a>`), italic text (`<i>`), and ordered lists (`<ol>`).
3. Use single-quoted strings (`'...'`) for values containing `:`. See [`Cat.yaml`](/database/data/categories/Cat.yaml) for an example. Inside single-quoted strings, a literal single quote must be escaped as `''`. See [`Man.yaml`](/database/data/categories/Man.yaml) for an example.
4. Use `>-` for multiline text. Single line breaks are ignored when rendered, which is useful for improving readability of longer texts or HTML lists in the YAML file itself. See [`core-thin.yaml`](/database/data/category-properties/core-thin.yaml) for an example.
5. In a `>-` block, an empty line starts a new paragraph when rendered. See [`Ab_fg.yaml`](/database/data/categories/Ab_fg.yaml) for an example. Do not use `|-`.

The command `pnpm cspell` checks for spelling mistakes. It runs automatically before every push and in the CI. If it reports a legitimate word (for example, the name of an author), add it to [`.cspell.json`](/.cspell.json).
