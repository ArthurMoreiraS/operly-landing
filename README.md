# Operly Landing

Landing page pública do Operly, separada da aplicação SaaS.

## Desenvolvimento

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
- Domínio principal: `operlyapp.com`
- `www.operlyapp.com` deve redirecionar para o domínio principal.

Variáveis:

```env
VITE_APP_URL=https://app.operlyapp.com
VITE_CALCOM_EMBED_LINK=operly-eeqtsh/30min
```
