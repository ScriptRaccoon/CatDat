# CatDat

![Contributions welcome](https://img.shields.io/badge/contributions-welcome-brightgreen)
[![License](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)

_A comprehensive and searchable database of categories and their properties_

👉 <https://catdat.app>

👉 [Watch the YouTube video](https://youtu.be/dQXbPxk__qA)

## Features

- **Searchable Database**: Easily find [categories](https://en.wikipedia.org/wiki/Category_theory) based on properties and non-properties.
- **Deduction System**: Automatically infers properties from existing ones, powered by a database of implications.
- **Reason/Reference for Implications**: Each implication has a reason/reference, providing a data-based knowledge base of category theory.
- **Automatic Dualization**: Automatically dualizes implications.
- **Comprehensive Definitions**: Detailed definitions of properties and categories.
- **Comparison Feature**: Compare multiple categories to see their differences.
- **Find Related Categories**: Discover categories related to your search.
- **Customizable Display**: Light/dark mode, show/hide deduced properties.
- **References to nLab**: Links to the [nLab](https://ncatlab.org) for detailed information.
- **Intuitive User Interface**: Easy to use on both mobile and desktop.

## How to contribute

This project is a **community effort**. See our [contribution guidelines](CONTRIBUTING.md) for more information

## Documentation

- [The database of _CatDat_](DATABASE.md)
- [Deployment](DEPLOYMENT.md)

## Local Setup

You need to have [NodeJS](https://nodejs.org/) and [pnpm](https://pnpm.io/) installed.

1. Clone the repository with `git clone https://github.com/ScriptRaccoon/CatDat.git`.
2. Change the directory with `cd CatDat`.
3. Install the dependencies with `pnpm install`.
4. Create the local `.env` file based on `.env.example`.
5. Create or Update the local database with `pnpm db:update`.
6. Start the local development server with `pnpm dev`.

## Tech Stack

- Language: [TypeScript](https://www.typescriptlang.org)
- App framework: [SvelteKit](https://svelte.dev/docs/kit/introduction)
- Database: [SQLite](https://sqlite.org/)
- App Deployment: [Netlify](https://netlify.com)
- Database Deployment: [Turso](https://turso.tech)
- TeX math rendering: [katex](https://www.npmjs.com/package/katex)

## Similar projects

- **[Catabase](https://catabase.fly.dev)**: A similar project that appears to be abandoned. It is more ambitious in terms of available data types but less complete for basic categories. The UI is not very intuitive, and it lacks an integrated deduction system between properties. See the [nForum announcement](https://nforum.ncatlab.org/discussion/13419/catabase-a-database-of-categories/).
- **[SmallCategories](https://smallcats.info/)**: A similar project that also appears to be abandoned. A particular emphasis is given to enumerating all finite categories.
- **[nLab](https://ncatlab.org)**: A wiki for (higher) category theory. _CatDat_ refers to nLab pages for detailed information on its entries.
- **[Clowder Project](https://clowderproject.com)**: A new online reference for category theory. Unlike _CatDat_, which is data-based, Clowder follows a textbook-based approach.
- **[Database of Ring Theory](https://ringtheory.herokuapp.com/)**: This database focuses on ring theory and module theory rather than category theory, but is very similar in nature and was a major inspiration for _CatDat_.

**[MathBases](https://mathbases.org/)** lists many other databases for other kinds of mathematical structure.
