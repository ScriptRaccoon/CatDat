# Deployment

This page is only relevant to the maintainer(s) of this project.

- [GitHub repository](https://github.com/ScriptRaccoon/catdat)
- [Netlify project](https://app.netlify.com/sites/catdat/overview)

## Prerendering

Most pages are prerendered for performance reasons. This implies that the database is consumed at build time to generate static HTML pages. The only non-prerendered pages are the search and comparison pages, since they involve dynamic lists of properties and categories resp. functors.

## Databases

The CatDat SQLite database `catdat.db` is deployed as a file alongside the web application to Netlify and is located at `/var/task/database/catdat.db` after deployment. The file system on Netlify is ephemeral, so this only works because the database is read-only during the runtime of the application.

However, the SQLite database `app.db` (used for user submissions and page visits) requires writes and is hosted remotely on [Turso](https://turso.tech).

## Deployment Process

Follow these steps to deploy to production:

1. **Preview Deployment.** On [GitHub's Actions page](https://github.com/ScriptRaccoon/CatDat/actions), manually trigger the preview pipeline [deploy-preview.yaml](.github/workflows/deploy-preview.yaml).

    It creates the database via `pnpm db:update`, builds the application, and creates a [deployment preview](https://docs.netlify.com/deploy/deploy-types/deploy-previews/) on Netlify. For testing purposes, this step can also be used on branches other than `main`.

2. **Production Deployment.** If the deployment preview looks correct, on [GitHub's Actions page](https://github.com/ScriptRaccoon/CatDat/actions), manually trigger the pipeline [deploy-prod.yaml](.github/workflows/deploy-prod.yaml).

    This pipeline creates the database via `pnpm db:update`, builds the application, and deploys it on Netlify. The previous deployment preview is no longer live. Moreover, a tag is created on GitHub.

## Domains

- Main domain: <https://catdat.app>
- Backup domain: <https://catdat.netlify.app>
