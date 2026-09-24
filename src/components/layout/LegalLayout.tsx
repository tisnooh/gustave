import Link from 'next/link';
import { ArrowLeft } from 'lucide-react';

type LegalLayoutProps = {
  title: string;
  updated: string;
  children: React.ReactNode;
};

/** Gabarit sobre des pages légales */
export function LegalLayout({ title, updated, children }: LegalLayoutProps) {
  return (
    <>
      <main id="contenu" className="bg-ivory pb-32 pt-36 md:pb-20 lg:pt-44">
        <div className="mx-auto max-w-3xl px-6">
          <Link
            href="/"
            className="label-xs inline-flex items-center gap-2 text-ink/50 transition-colors hover:text-bronze"
          >
            <ArrowLeft size={13} strokeWidth={1.5} aria-hidden />
            Retour à l’accueil
          </Link>
          <p className="label-xs mt-12 flex items-center gap-3 text-bronze">
            <span aria-hidden className="h-px w-8 bg-current opacity-70" />
            Informations légales
          </p>
          <h1 className="mt-5 font-display text-[clamp(2.2rem,5vw,3.6rem)] leading-[1.05] tracking-[-0.01em] text-ink">
            {title}
          </h1>
          <p className="mt-3 text-xs text-ink/55">Dernière mise à jour : {updated}</p>
          <div className="mt-12 space-y-10 text-[15px] leading-relaxed text-ink/70">
            {children}
          </div>
        </div>
      </main>
    </>
  );
}

export function LegalSection({ heading, children }: { heading: string; children: React.ReactNode }) {
  return (
    <section>
      <h2 className="font-display text-[1.45rem] text-ink">{heading}</h2>
      <div className="mt-3 space-y-3">{children}</div>
    </section>
  );
}

export function Placeholder({ children }: { children: React.ReactNode }) {
  return (
    <span className="rounded-sm border border-bronze/40 bg-blanc px-1.5 py-0.5 text-[13px] text-bronze">
      {children}
    </span>
  );
}
