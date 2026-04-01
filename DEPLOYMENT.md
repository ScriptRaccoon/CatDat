# Deployment

This page is only relevant for the maintainer(s) of this project.

## Hosting

The application is deployed on [Netlify](https://netlify.com). The database is hosted on [Turso](https://turso.tech).

- [GitHub repository](https://github.com/ScriptRaccoon/catdat)
- [Netlify project](https://app.netlify.com/sites/catdat/overview)

## Prerendering

Most pages are prerendered for performance reasons. This implies that the database is consumed at build time to generate static HTML pages. The only non-prerendered pages are the search and comparison pages, since they involve a dynamic list of properties and categories.

## Preview Database

Since deployment requires running `pnpm db:update`, which temporarily clears all tables in the database, we maintain a separate remote database `catdat-preview` on Turso as a copy of the production database `catdat`. This prevents temporary disruptions and data inconsistencies in production.

## Deployment Process

Follow these steps to deploy to production:

1. **Preview Deployment.** On [GitHub's actions page](https://github.com/ScriptRaccoon/CatDat/actions), manually trigger the preview pipeline [deploy-preview.yaml](.github/workflows/deploy-preview.yaml).

It updates the remote preview database (`catdat-preview`) via `pnpm db:update`, builds the application, and creates a [deployment preview](https://docs.netlify.com/deploy/deploy-types/deploy-previews/) on Netlify. The production database and application remain unchanged in this step.

2. **Promote to Production.** If the deployment preview looks correct, promote it to production in [Netlify's Deploys UI](https://app.netlify.com/projects/catdat/deploys).

The updated application goes live and uses the preview database.

3. **Production Deployment.** On [GitHub's actions page](https://github.com/ScriptRaccoon/CatDat/actions), manually trigger the pipeline [deploy-prod.yaml](.github/workflows/deploy-prod.yaml).

This pipeline updates the remote production database (`catdat`) via `pnpm db:update` (hence, consolidates it with the preview database `catdat-preview`), builds the application, and deploys it on Netlify. The previous deployment preview is no longer live.

In case only the application, not the database has been updated since the last production deployment, the pipeline [deploy-prod-skip-db](.github/workflows/deploy-prod-skip-db.yaml) can be used. The preview deployment is not required.

## Backups

Since the whole database is defined by static SQL files in this repository, a database backup is not strictly necessary. Still, there is an API endpoint `/api/db_dump` that dumps the SQLite database. It is secured with an API key. A Google Apps Script regularly fetches this API endpoint and saves the dump to Google Drive.

## Domains

- Main domain: <https://catdat.app>
- Backup domain: <https://catdat.netlify.app>
