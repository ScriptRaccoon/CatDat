# CatDat

![Contributions welcome](https://img.shields.io/badge/contributions-welcome-brightgreen)
[![License](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)
![Build](https://github.com/ScriptRaccoon/CatDat/actions/workflows/deploy-prod.yaml/badge.svg?label=xyz)
![Last commit](https://img.shields.io/github/last-commit/ScriptRaccoon/CatDat)

## [**https://catdat.app**](https://catdat.app)

_CatDat_ provides a growing collection of categories and functors, each with detailed descriptions
and properties. Built by and for those who love [category theory](https://en.wikipedia.org/wiki/Category_theory).

[Watch the YouTube video](https://youtu.be/dQXbPxk__qA)

## Features

- **Category Detail Pages**: Explore a category's definition, its satisfied and unsatisfied properties, and related categories.
- **Functor Detail Pages**: Explore a functors's definition along with its satisfied and unsatisfied properties.
- **Property Detail Pages**: Explore the definition of a property and view categories or functors that satisfy it and those that don't.
- **Reasons and References**: Each property and implication includes a reason or reference, forming a data-driven knowledge base for category theory.
- **Deduction System**: Automatically infers properties from existing ones using a database of implications, both for categories and functors.
- **Automatic Dualization**: Automatically dualizes implications and property assignments.
- **Searchable Database**: Find categories and functors based on satisfied properties and unsatisfied properties.
- **Comparison Feature**: Compare multiple categories to identify their differences and similarities.
- **Customizable Display**: Light/dark mode and optional display of deduced properties.
- **Intuitive User Interface**: Usable on both mobile and desktop.

## How to contribute

This project is a **community effort**. Whether you're a mathematician spotting missing data or a developer improving the interface, your contributions are welcome. See our [contribution guidelines](CONTRIBUTING.md) for details.

## Documentation

- [The database of _CatDat_](DATABASE.md)
- [Deployment](DEPLOYMENT.md)
- [Status Page](https://catdat.openstatus.dev/)

## Local Setup

You need to have [Git](https://git-scm.com/), [NodeJS](https://nodejs.org/) and [pnpm](https://pnpm.io/) installed.

1. Fork `ScriptRaccoon/CatDat` on GitHub.
2. Clone your fork with `git clone https://github.com/{your_username}/CatDat.git`.
3. Change into the directory with `cd CatDat`.
4. Install dependencies with `pnpm install`.
5. Create a local `.env` file from `.env.example`.
6. Create the local database with `pnpm db:update`.
7. Start the local development server with `pnpm dev`.

**For Maintainers:** Redis is required for admin features and submissions. Start a local instance on port 6379 via `redis-server --port 6379`.

## Tech Stack

Built with modern web technologies:

- Language: [TypeScript](https://www.typescriptlang.org)
- Framework: [SvelteKit](https://svelte.dev/docs/kit/introduction)
- Database: [SQLite](https://sqlite.org/) / [Turso](https://turso.tech)
- Deployment: [Netlify](https://netlify.com)
- Math Rendering: [katex](https://www.npmjs.com/package/katex)

## Similar projects

_CatDat_ draws inspiration from and complements other resources in category theory:

- **[Catabase](https://catabase.fly.dev)**: A similar project that appears to be abandoned. It is more ambitious in terms of available data types but less complete for basic categories. The UI is not very intuitive, and it lacks an integrated deduction system between properties. See the [nForum announcement](https://nforum.ncatlab.org/discussion/13419/catabase-a-database-of-categories/).
- **[SmallCategories](https://smallcats.info/)**: A similar project that also appears to be abandoned. A particular emphasis is given to enumerating all finite categories.
- **[nLab](https://ncatlab.org)**: A wiki for (higher) category theory. _CatDat_ refers to nLab pages for detailed information on its entries.
- **[Clowder Project](https://clowderproject.com)**: A new online reference for category theory. Unlike _CatDat_, which is data-based, Clowder follows a textbook-based approach.
- **[Database of Ring Theory](https://ringtheory.herokuapp.com/)**: This database focuses on ring theory and module theory rather than category theory, but is very similar in nature and was a major inspiration for _CatDat_.
- **[pi-Base](https://topology.pi-base.org/)**: This is a database of examples and counterexamples in topology. Just like _CatDat_ it uses three types of entries (objects, properties, and theorems) and automatically derives properties from the theorems.

**[MathBases](https://mathbases.org/)** lists many other databases for other kinds of mathematical structure.

## Financial Support

If you find this project useful, you can support its development:

[![Buy Me a Coffee](https://img.shields.io/badge/Buy%20Me%20a%20Coffee-00AA00?logo=buymeacoffee&logoColor=white)](https://www.buymeacoffee.com/scriptraccoon)

**Cost transparency.** The project currently only incurs domain costs of about $10 per year. There are no costs for hosting or the database. All development is done in free time.
