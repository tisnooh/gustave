import type { NextConfig } from "next";

/**
 * Deux modes de déploiement :
 *
 * 1. MODE NATIF (défaut, recommandé pour Vercel) :
 *    `npm run build` — Next.js sert le site, images optimisées à la volée.
 *
 * 2. MODE EXPORT STATIQUE (fichier unique à déployer partout) :
 *    `npm run export:static` — génère le dossier `out/` (HTML/CSS/JS/images),
 *    déposable tel quel sur Netlify Drop, Cloudflare Pages, Vercel CLI
 *    ou tout hébergeur statique. Aucune fonctionnalité serveur requise :
 *    la landing est 100 % statique.
 */
const staticExport = process.env.STATIC_EXPORT === "1";

const nextConfig: NextConfig = {
  /* Pas d'en-tête « powered-by » : un détail, mais propre. */
  poweredByHeader: false,
  images: {
    /* Formats modernes servis par l'optimiseur Next (poids réduit) */
    formats: ["image/webp"],
  },
  ...(staticExport && {
    output: "export" as const,
    /* Build intermédiaire séparé : ne touche pas au .next du mode natif */
    distDir: ".next-export",
    /* URLs en /dossier/ : fonctionne sur TOUS les hébergeurs statiques
       (Apache sans rewrite, Netlify, Cloudflare Pages, GitHub Pages…) */
    trailingSlash: true,
    /* En statique, pas d'optimiseur serveur : les JPG/WebP publics
       sont déjà compressés et servis tels quels. */
    images: { unoptimized: true },
  }),
};

export default nextConfig;
