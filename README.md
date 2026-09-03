# Operly Landing

Operly's public landing page, maintained separately from the SaaS application.

## Development

```bash
pnpm install
pnpm dev
```

## Build

```bash
pnpm build
```

## Vercel

- Framework preset: Vite
- Build command: `pnpm build`
- Output directory: `dist`
- Primary domain: `operlyapp.com`
- `www.operlyapp.com` should redirect to the primary domain.

Environment variables:

```env
VITE_APP_URL=https://app.operlyapp.com
VITE_CALCOM_EMBED_LINK=operly-eeqtsh/30min
```
