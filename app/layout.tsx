import type { Metadata, Viewport } from 'next';
import { Bodoni_Moda, Jost } from 'next/font/google';
import { siteConfig } from '@/config/site-config';
import { effectiveSiteUrl } from '@/lib/links';
import './globals.css';

/* Typographies :
   — Bodoni Moda : serif éditoriale à fort contraste (titres, chiffres)
   — Jost : sans-serif géométrique d'esprit français (interface, textes) */
const bodoni = Bodoni_Moda({
  subsets: ['latin'],
  style: ['normal', 'italic'],
  variable: '--font-bodoni',
  display: 'swap',
});

const jost = Jost({
  subsets: ['latin'],
  variable: '--font-jost',
  display: 'swap',
});

/* URL de base : domaine configuré, sinon URL Vercel automatique,
   sinon localhost en développement. Aucune URL codée en dur. */
function baseUrl(): URL {
  const url = effectiveSiteUrl();
  try {
    if (url) return new URL(url);
  } catch {
    /* URL invalide : on ignore */
  }
  return new URL('http://localhost:3000');
}

export const metadata: Metadata = {
  metadataBase: baseUrl(),
  title: {
    default: `${siteConfig.brandName} | Taxi à Paris & Île-de-France`,
    template: `%s | ${siteConfig.brandName}`,
  },
  description:
    'Service de taxi pour vos déplacements à Paris, transferts aéroports et gares et trajets en Île-de-France. Contact direct par téléphone ou WhatsApp.',
  keywords: [
    'taxi Paris',
    'taxi Paris aéroport',
    'taxi CDG Paris',
    'taxi Orly Paris',
    'taxi gare Paris',
    'taxi Île-de-France',
  ],
  openGraph: {
    type: 'website',
    locale: 'fr_FR',
    siteName: siteConfig.brandName,
    title: `${siteConfig.brandName} — Taxi Paris & Île-de-France`,
    description:
      'Trajets à Paris, transferts aéroports et gares, déplacements professionnels. Un service de taxi discret, ponctuel et professionnel.',
    images: [
      {
        url: '/images/og.jpg',
        width: 1200,
        height: 630,
        alt: `${siteConfig.brandName} — Taxi Paris`,
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: `${siteConfig.brandName} — Taxi Paris & Île-de-France`,
    description:
      'Trajets à Paris, transferts aéroports et gares, déplacements professionnels.',
    images: ['/images/og.jpg'],
  },
  robots: {
    index: true,
    follow: true,
  },
};

export const viewport: Viewport = {
  themeColor: '#151515',
  width: 'device-width',
  initialScale: 1,
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="fr" className={`${bodoni.variable} ${jost.variable}`}>
      <body>
        <a
          href="#contenu"
          className="sr-only focus:not-sr-only focus:fixed focus:left-4 focus:top-4 focus:z-[100] focus:bg-ink focus:text-ivory focus:px-5 focus:py-3 focus:label-xs"
        >
          Aller au contenu
        </a>
        {children}
      </body>
    </html>
  );
}
