import { siteConfig } from '@/config/site-config';

type BrandProps = {
  /** 'ink' sur fond clair, 'ivory' sur fond sombre */
  tone?: 'ink' | 'ivory';
  className?: string;
};

/**
 * Logo texte provisoire :
 *   GUSTAVE
 *   — PARIS
 * Remplaçable facilement (future identité visuelle).
 */
export function Brand({ tone = 'ink', className = '' }: BrandProps) {
  const main = tone === 'ink' ? 'text-ink' : 'text-blanc';
  return (
    <span className={`flex flex-col items-start leading-none ${className}`}>
      <span
        className={`font-display text-[1.15rem] font-medium uppercase tracking-[0.38em] ${main}`}
      >
        {siteConfig.brandName}
      </span>
      <span className="mt-1.5 flex items-center gap-2" aria-hidden>
        <span className="h-px w-4 bg-bronze" />
        <span className="label-xs text-[8.5px] tracking-[0.34em] text-bronze">
          {siteConfig.brandSuffix}
        </span>
      </span>
    </span>
  );
}
