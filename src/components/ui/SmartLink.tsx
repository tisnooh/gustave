type SmartLinkProps = {
  href?: string;
  children: React.ReactNode;
  className?: string;
  ariaLabel?: string;
  title?: string;
  target?: string;
  rel?: string;
  onClick?: () => void;
};

/**
 * Rend un <a> si un href valide existe ; sinon un <span> inerte
 * (placeholder non renseigné dans site-config.ts) — aucun lien mort.
 */
export function SmartLink({
  href,
  children,
  className = '',
  ariaLabel,
  title,
  target,
  rel,
  onClick,
}: SmartLinkProps) {
  if (!href) {
    return (
      <span
        className={className}
        aria-label={ariaLabel}
        title={title ?? 'Information à configurer (src/config/site-config.ts)'}
        aria-disabled="true"
      >
        {children}
      </span>
    );
  }
  return (
    <a
      href={href}
      className={className}
      aria-label={ariaLabel}
      title={title}
      target={target}
      rel={rel}
      onClick={onClick}
    >
      {children}
    </a>
  );
}
