# WMT Monorepo

This repository is now a `pnpm` workspace powered by `Turborepo`.

## Structure

```text
apps/
  main/      Existing multilingual Next.js website
  career/    Dedicated career portal app

packages/
  ui/        Shared React UI components
  config/    Shared Tailwind, ESLint, and TypeScript config
  shared/    Shared utilities and cross-app types
```

## Requirements

- Node.js 20+
- Corepack enabled

## Install

```bash
corepack pnpm install
```

## Development

Run the main marketing site:

```bash
corepack pnpm dev:main
```

Run the career app:

```bash
corepack pnpm dev:career
```

Run both apps together through Turbo:

```bash
corepack pnpm dev
```

## Quality Checks

```bash
corepack pnpm lint
corepack pnpm typecheck
corepack pnpm build
```

## Shared Packages

### `@wmt/ui`

Reusable UI lives in `packages/ui`. Current shared components include:

- `ProductCard`
- `ProductFilterCard`
- `HeroBanner`
- `BrandLogoCarousel`
- `SiteFooter`

### `@wmt/config`

Shared config lives in `packages/config`:

- ESLint config
- Tailwind v4 global CSS
- PostCSS config
- TypeScript base config

### `@wmt/shared`

Common cross-app code that is not UI-specific, such as:

- shared domain types
- slug helpers

## Notes

- The original app has moved from the repo root into `apps/main`.
- Shared Tailwind styling is imported from `@wmt/config/tailwind.css`.
- The repo uses a single `pnpm-lock.yaml` at the root.
