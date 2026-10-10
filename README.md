# SPARTIAN | Desarrollo Inmobiliario

Spanish-language concept demo for evaluation by Leo. Next.js + TypeScript + Tailwind + Motion, prepared for Netlify. No properties for sale, no investment solicitation or payments.

## Start and build

Requires Node.js 22 and npm. `package-lock.json` pins dependencies.

```bash
npm ci
npm run dev
# Open http://localhost:3000
npm run typecheck
npm test
npm run build
npm start
```

## Implemented

- Responsive editorial homepage, eight navigation sections, accessible native dialog menu, scroll reveals and reduced-motion support.
- Three fictitious properties, six combined filters, detail pages, inspiration images and conceptual plans.
- Six-category 2D configurator: layout, materials, floor, colors, finishes and kitchen. Live preview, summary, JSON download, contextual demo quote request. No binding price calculation.
- Forms validate required fields/email and save only in this browser. They explicitly confirm that nothing was sent.
- `/admin/demo`: public local sandbox. Create/edit/delete properties, projects and blog posts; upload JPEG/PNG/WebP up to 400 KB; manage prices/status; inspect/delete requests and change status; toggle supported configurator options; export JSON and reset.
- Edits immediately affect public pages in the same browser and persist after reload. Visitors have independent data. localStorage is neither a database nor secure storage.
- `/admin`: optional Supabase login. `/admin/panel` verifies the current user server-side and checks admin/editor assignment. Without configuration it is closed. Even when enabled, dashboard content still uses local demo data.
- Legal placeholders, SEO metadata, Next Image, robots.txt plus meta/header noindex. No analytics or advertising pixels.

## Walkthrough for Leo

1. `/viviendas`: filter the examples and open a detail.
2. `/configurador`: change the six choices; request a demo quote using fictitious data.
3. `/admin/demo` > Contactos: see the quote and update status. Investor forms appear under Inversores.
4. Edit a property, return to the catalog and check it.
5. Export JSON before resetting. Reset only clears this site's local demo content. JSON import is not implemented in v1.

## GitHub repository

Repository: https://github.com/Iamywh/spartian-real-estate

The user created this dedicated public repository. The full demo source is maintained here; no other repository is involved. Never commit credentials, `.env.local`, node_modules or `.next`.

## New Netlify project

No Netlify connector or authenticated deployment access was available. **No deployment or URL is claimed.**

1. Netlify → Add new project → Import an existing project → GitHub.
2. Select only the new repository, branch `main`.
3. Build: `npm run build`. Publish: `.next`. Node: `22`. `netlify.toml` also sets these.
4. Netlify applies its current Next.js adapter automatically. Verify the generated URL and all routes before sharing.
5. Set site name `spartian-real-estate` if free; otherwise use and communicate the actual assigned URL.
6. No environment variables are needed for the local demo. Once repository integration is authorized, pushes to `main` trigger builds.
7. Respect existing account/build limits; do not purchase add-ons. A private repository does not make the deployed site private. Protect access before using confidential information.

Reference: https://docs.netlify.com/build/frameworks/framework-setup-guides/nextjs/overview/

## Optional Supabase authentication

1. Use a NEW dedicated project; review/apply `supabase/schema.sql`. It has not been executed remotely.
2. Disable public registration, invite authorized users and assign `user_roles` through trusted SQL. Clients cannot assign themselves roles.
3. Copy `.env.example` to `.env.local`; set Supabase URL and anon key. Add them to Netlify and rebuild. Never expose a service-role key.
4. `/admin` signs in through Supabase; provider rate limits apply. Set password/session policies and MFA before production.
5. Proxy refreshes cookies. `/admin/panel` checks `getUser()` and role; responses are private/no-store.

This connects authentication only. **Database CRUD and image storage are not connected.** Implement the repository adapter, role-specific UI/API operations, storage policies, validated contact endpoints and data lifecycle before using real data. Live auth/RLS integration tests remain necessary after provisioning.

## Key files

- `src/app/page.tsx`: homepage.
- `src/app/globals.css`: design tokens, responsive styles and Tailwind.
- `src/components/content.tsx`: content, property/article detail pages.
- `src/lib/data.ts`: seed properties, projects, blog and options.
- `src/components/catalog.tsx`, `src/lib/filter.ts`: catalog and filters.
- `src/components/configurator.tsx`, `floorplan.tsx`: selection and 2D renderer.
- `src/components/dashboard.tsx`: local demo management.
- `src/components/store.tsx`: local persistence and storage errors.
- `src/lib/contracts.ts`: future data/3D contracts and locale configuration.
- `src/lib/supabase/`, `src/app/admin/`, `src/proxy.ts`: optional auth boundary.
- `supabase/schema.sql`: future schema and row-level policies, not deployed.

## Remaining before production

- Create GitHub/Netlify project, deploy and verify desktop/mobile behavior in a real browser.
- Connect Supabase content and image storage; test roles, RLS, validation, abuse protection, backups and retention.
- Provide verified company/contact details, genuine properties, rights, approved plans and project permissions. Do not invent them or replace demo notices prematurely.
- Complete legal/privacy/cookie texts with professional review of actual processing.
- Add verified email delivery and consent; current forms send nothing.
- Multilingual config is prepared; extract Spanish strings to dictionaries and add Italian/English translations and routes. No unfinished language switch is shown.
- 3D remains future work. 2D plans are non-scaled illustrations, not technical drawings or approved layouts.
- Domain purchase requires explicit authorization. Remove robots/meta/header noindex only at approved production launch.

See `CREDITS.md` for image references and `VALIDATION.md` for actual checks and limits.
