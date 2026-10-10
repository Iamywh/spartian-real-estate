# Validation — 2026-10-10

## Passed

- `npm run build`: Next.js 16.4.0 production compilation, TypeScript check and static generation succeeded. The build includes public pages, dynamic property/article routes, admin routes and auth proxy.
- `npm run typecheck`: passed.
- `npm test`: 15 tests passed across 3 files (Vitest + jsdom).
- Generated HTML checked for 13 public/demo routes: present, `lang="es"`, noindex metadata. robots.txt disallows all crawling. Next config and Netlify config include noindex headers.
- Downloaded all three stock assets successfully and inspected their contents.

## Tested behaviors

1. Catalog: unfiltered results, combined price/area/bedroom constraints including equality, contradictory ranges, location/status/availability, no real sale availability.
2. Request flow: save fictitious investor request, see it in dashboard, update its status.
3. Property CRUD: create, edit price, persist across component remount, delete; seed data remains unchanged.
4. Configurator: visual/accessible state responds to layout/color selection and resets.
5. Option administration: final available choice cannot be disabled.
6. Quota failure: no false success confirmation if localStorage fails.
7. Authorization: missing configuration, invalid session, missing role and unexpected role are rejected; assigned admin accepted after mocked provider verification.

## Not verified

- No live browser/layout/screenshot or full browser end-to-end verification. The supported browser-control capability was unavailable. No preview server was launched.
- No live Supabase project was provisioned. Auth boundary tests use mocks, not a live provider. SQL/RLS migrations, refresh, password policies, uploads and shared persistence require integration tests after setup.
- No GitHub repository was created or pushed; the connector did not expose repository creation.
- No Netlify deployment, URL, automatic builds or production HTTP headers were verified remotely.
- No Lighthouse/Core Web Vitals or physical-device accessibility audit.

## Known scope limits

- All content edits and inquiries are browser-local, even if optional Supabase login is enabled. No emails or transactions occur.
- Demo admin is intentionally public and accepts only fictitious content. Private route fails closed without configured authentication.
- 2D plans are illustrative, without scale or technical validation. Stock gallery images do not depict a single real property.
- Spanish only. Locale configuration and renderer/repository contracts prepare future translation, 3D and backend work but do not implement them.
