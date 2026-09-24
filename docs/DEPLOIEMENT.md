# Déploiement — Gustave

Trois chemins possibles, du plus recommandé au plus simple.

## A. GitHub → Vercel (recommandé)

```bash
git remote add origin git@github.com:votre-compte/gustave.git
git push -u origin main
```

1. Vercel → **Add New… → Project** → importer le repository.
2. Framework détecté automatiquement (Next.js) : aucun réglage,
   pas de variable d'environnement, pas de `vercel.json`.
3. Deploy → `*.vercel.app`. Domaine personnalisé plus tard
   (Vercel → Domains), puis `siteUrl` dans `src/config/site-config.ts`.

Le fichier `.vercelignore` exclut déjà `tests/`, `docs/` et `shots/`
de l'upload des sources.

## B. Export statique (zip / glisser-déposer)

```bash
npm run export:static     # génère out/
```

- `out/` (ou son zip) se dépose sur **Netlify Drop**, **Cloudflare Pages**
  (upload direct), **GitHub Pages**, ou un hébergement mutualisé
  (contenu de `out/` dans `www/` / `public_html/`).
- URLs en `/dossier/` : compatible Apache sans rewrite.
- Aucune fonctionnalité perdue : la landing est 100 % statique,
  le module de demande ouvre WhatsApp/e-mail côté visiteur.

## C. Vercel CLI

```bash
npx vercel            # preview
npx vercel --prod     # production
# ou, sur l'export statique :
npx vercel deploy out
```

## Régénérer après modification

1. Modifier `src/config/site-config.ts` (ou le code).
2. `npm run build` (mode natif) ou `npm run export:static` (mode statique).
3. Pousser sur GitHub : Vercel redéploie automatiquement.
