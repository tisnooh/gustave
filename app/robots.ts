import type { MetadataRoute } from 'next';

/* Générés au build : compatible mode natif Vercel ET export statique */
export const dynamic = 'force-static';
import { effectiveSiteUrl } from '@/lib/links';

export default function robots(): MetadataRoute.Robots {
  const base = effectiveSiteUrl();
  return {
    rules: {
      userAgent: '*',
      allow: '/',
      /* Les pages légales sont indexables mais non prioritaires ;
         aucune route technique n'est exposée par l'application. */
    },
    sitemap: base ? `${base}/sitemap.xml` : undefined,
  };
}
