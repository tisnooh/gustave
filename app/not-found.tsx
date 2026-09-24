import type { Metadata } from 'next';
import Link from 'next/link';
import { ArrowLeft } from 'lucide-react';
import { Brand } from '@/components/ui/Brand';

export const metadata: Metadata = {
  title: 'Page introuvable',
  robots: { index: false, follow: false },
};

/** 404 cohérente avec l'identité Gustave : sobre, centrée, un seul lien. */
export default function NotFound() {
  return (
    <main
      id="contenu"
      className="flex min-h-[100svh] flex-col items-center justify-center bg-ivory px-6 text-center"
    >
      <Brand tone="ink" className="items-center" />
      <p className="label-xs mt-14 flex items-center gap-3 text-bronze-deep">
        <span aria-hidden className="h-px w-8 bg-current opacity-70" />
        Erreur 404
        <span aria-hidden className="h-px w-8 bg-current opacity-70" />
      </p>
      <h1 className="mt-6 font-display text-[clamp(2.2rem,6vw,4rem)] leading-[1.05] tracking-[-0.01em] text-ink">
        Cette adresse <span className="italic">n’existe pas.</span>
      </h1>
      <p className="mt-5 max-w-sm text-[15px] leading-relaxed text-ink/65">
        La page demandée est introuvable. Reprenons depuis le début :
        votre prochain trajet vous attend.
      </p>
      <Link
        href="/"
        className="label-xs mt-10 inline-flex min-h-[48px] items-center gap-2.5 rounded-full bg-ink px-7 text-ivory transition-all duration-500 hover:-translate-y-0.5 hover:shadow-[0_16px_32px_-14px_rgba(17,17,17,0.5)]"
      >
        <ArrowLeft size={14} strokeWidth={1.6} aria-hidden />
        Retour à l’accueil
      </Link>
    </main>
  );
}
