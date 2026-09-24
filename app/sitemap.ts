import type { MetadataRoute } from 'next';

/* Générés au build : compatible mode natif Vercel ET export statique */
export const dynamic = 'force-static';
import { effectiveSiteUrl } from '@/lib/links';

/* Sitemap émis dès qu'une URL publique existe :
   domaine configuré dans site-config.ts, ou URL Vercel automatique. */
export default function sitemap(): MetadataRoute.Sitemap {
  const base = effectiveSiteUrl();
  if (!base) return [];
  const now = new Date();
  return [
    { url: base, lastModified: now, changeFrequency: 'weekly', priority: 1 },
    { url: `${base}/mentions-legales`, lastModified: now, changeFrequency: 'yearly', priority: 0.3 },
    { url: `${base}/confidentialite`, lastModified: now, changeFrequency: 'yearly', priority: 0.3 },
  ];
}
