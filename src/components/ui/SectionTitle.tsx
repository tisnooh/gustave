import { Reveal } from '@/components/ui/Reveal';

type SectionTitleProps = {
  label: string;
  title: React.ReactNode;
  intro?: React.ReactNode;
  /** Fond de la section : ivory (texte noir) ou sombre (texte ivoire) */
  tone?: 'ivory' | 'dark';
  align?: 'left' | 'center';
  className?: string;
  as?: 'h1' | 'h2' | 'h3';
};

export function SectionTitle({
  label,
  title,
  intro,
  tone = 'ivory',
  align = 'left',
  className = '',
  as = 'h2',
}: SectionTitleProps) {
  const dark = tone === 'dark';
  const Tag = as;
  return (
    <Reveal className={className}>
      <div
        className={`flex flex-col ${align === 'center' ? 'items-center text-center' : 'items-start'}`}
      >
        <p
          className={`label-xs flex items-center gap-3 ${dark ? 'text-bronze-light' : 'text-bronze-deep'}`}
        >
          <span aria-hidden className="h-px w-8 bg-current opacity-70" />
          {label}
        </p>
        <Tag
          className={`mt-5 font-display text-[clamp(2.1rem,4.6vw,3.9rem)] leading-[1.04] tracking-[-0.01em] text-balance ${
            dark ? 'text-blanc' : 'text-ink'
          }`}
        >
          {title}
        </Tag>
        {intro ? (
          <p
            className={`mt-5 max-w-xl text-[15px] leading-relaxed md:text-base ${
              dark ? 'text-blanc/60' : 'text-ink/60'
            }`}
          >
            {intro}
          </p>
        ) : null}
      </div>
    </Reveal>
  );
}
