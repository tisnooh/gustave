import { SmartLink } from '@/components/ui/SmartLink';

type Variant = 'solid-light' | 'solid-dark' | 'outline-light' | 'outline-dark';

type ButtonProps = {
  children: React.ReactNode;
  href?: string;
  onClick?: () => void;
  type?: 'button' | 'submit';
  variant?: Variant;
  className?: string;
  ariaLabel?: string;
  title?: string;
};

const base =
  'group/btn inline-flex min-h-[48px] items-center justify-center gap-2.5 rounded-full px-7 py-3 label-xs transition-all duration-500 select-none';

const variants: Record<Variant, string> = {
  /* Sur fond sombre */
  'solid-light':
    'bg-blanc text-ink hover:-translate-y-0.5 hover:shadow-[0_14px_30px_-12px_rgba(0,0,0,0.55)]',
  /* Sur fond clair */
  'solid-dark':
    'bg-ink text-ivory hover:-translate-y-0.5 hover:shadow-[0_16px_32px_-14px_rgba(17,17,17,0.5)]',
  'outline-light':
    'border border-blanc/35 text-blanc hover:border-blanc/80 hover:bg-blanc/10',
  'outline-dark':
    'border border-ink/25 text-ink hover:border-ink/70 hover:bg-ink hover:text-ivory',
};

export function Button({
  children,
  href,
  onClick,
  type = 'button',
  variant = 'solid-dark',
  className = '',
  ariaLabel,
  title,
}: ButtonProps) {
  const classes = `${base} ${variants[variant]} ${className}`;

  if (href !== undefined) {
    return (
      <SmartLink
        href={href}
        className={classes}
        ariaLabel={ariaLabel}
        title={title}
        target={href.startsWith('http') ? '_blank' : undefined}
        rel={href.startsWith('http') ? 'noopener noreferrer' : undefined}
      >
        {children}
      </SmartLink>
    );
  }
  return (
    <button type={type} onClick={onClick} className={classes} aria-label={ariaLabel} title={title}>
      {children}
    </button>
  );
}
