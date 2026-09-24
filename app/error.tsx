'use client';

/**
 * Garde-fou d'exécution : si une erreur inattendue survient côté client,
 * l'utilisateur voit un message compréhensible au lieu d'un écran vide.
 */
export default function GlobalError({
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  return (
    <main
      id="contenu"
      className="flex min-h-[100svh] flex-col items-center justify-center bg-ivory px-6 text-center"
    >
      <p className="label-xs flex items-center gap-3 text-bronze-deep">
        <span aria-hidden className="h-px w-8 bg-current opacity-70" />
        Imprevu
        <span aria-hidden className="h-px w-8 bg-current opacity-70" />
      </p>
      <h1 className="mt-6 font-display text-[clamp(2rem,5vw,3.4rem)] leading-[1.05] tracking-[-0.01em] text-ink">
        Quelque chose s’est <span className="italic">mal passé.</span>
      </h1>
      <p className="mt-5 max-w-sm text-[15px] leading-relaxed text-ink/65">
        La page n’a pas pu s’afficher correctement. Rechargez-la :
        dans la plupart des cas, cela suffit.
      </p>
      <button
        type="button"
        onClick={reset}
        className="label-xs mt-10 inline-flex min-h-[48px] items-center justify-center rounded-full bg-ink px-7 text-ivory transition-all duration-500 hover:-translate-y-0.5 hover:shadow-[0_16px_32px_-14px_rgba(17,17,17,0.5)]"
      >
        Recharger la page
      </button>
    </main>
  );
}
