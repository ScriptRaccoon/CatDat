---
paths:
    - 'tests/**'
    - 'playwright.config.ts'
---

# End-to-end tests

[tests/](../../tests/) contains the Playwright end-to-end tests: one folder per structure type with one file per feature (e.g. `categories/proof-navigation.spec.ts`, `functors/property-lookup.spec.ts`), and top-level files for type-independent pages (homepage, missing data, content pages, structure selector). Tag pages are tested in `list.spec.ts` and `property-list.spec.ts`.

- Keep files below about 200 lines and split by feature when one grows; shared helpers go to `tests/utils.ts`.
- Since the pages are generic over the structure type, `categories/` tests each feature with its variants, while `functors/` has one test per feature (to catch code that only works for categories) plus the functor-specific parts (domain, codomain, adjoints, assumptions on associated structures).
- Morphisms and symmetric monoidal categories get tests only when code specific to them is added.
