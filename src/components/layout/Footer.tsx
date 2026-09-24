import Link from 'next/link';
import { siteConfig } from '@/config/site-config';
import { mailHref, telHref, whatsappHref, defaultWhatsappMessage } from '@/lib/links';
import { Brand } from '@/components/ui/Brand';
import { SmartLink } from '@/components/ui/SmartLink';

const footerNav = [
  { label: 'Accueil', href: '#contenu' },
  { label: 'Services', href: '#services' },
  { label: 'Aéroports & gares', href: '#transferts' },
  { label: 'Contact', href: '#contact' },
];

export function Footer() {
  const year = new Date().getFullYear();

  return (
    <footer className="relative overflow-hidden bg-noir-deep pb-28 pt-20 text-ivory md:pb-12">
      <div className="mx-auto max-w-[1440px] px-6 lg:px-10">
        <div className="grid gap-12 lg:grid-cols-12">
          {/* Marque */}
          <div className="lg:col-span-4">
            <Brand tone="ivory" />
            <p className="mt-6 max-w-xs text-sm leading-relaxed text-ivory/50">
              Service de taxi à {siteConfig.location.zone.replace('Paris & ', 'Paris et en ')} — trajets,
              transferts et déplacements sur demande.
            </p>
          </div>

          {/* Navigation */}
          <nav aria-label="Navigation pied de page" className="lg:col-span-3">
            <p className="label-xs text-bronze">Navigation</p>
            <ul className="mt-5 space-y-3">
              {footerNav.map((item) => (
                <li key={item.label}>
                  <a
                    href={item.href}
                    className="text-sm text-ivory/65 transition-colors hover:text-bronze-light"
                  >
                    {item.label}
                  </a>
                </li>
              ))}
            </ul>
          </nav>

          {/* Contact */}
          <div className="lg:col-span-3">
            <p className="label-xs text-bronze">Contact</p>
            <ul className="mt-5 space-y-3">
              <li>
                <SmartLink
                  href={telHref()}
                  className="text-sm text-ivory/65 transition-colors hover:text-bronze-light"
                >
                  {siteConfig.phoneDisplay}
                </SmartLink>
              </li>
              <li>
                <SmartLink
                  href={whatsappHref(defaultWhatsappMessage)}
                  className="text-sm text-ivory/65 transition-colors hover:text-bronze-light"
                >
                  WhatsApp
                </SmartLink>
              </li>
              <li>
                <SmartLink
                  href={mailHref()}
                  className="text-sm text-ivory/65 transition-colors hover:text-bronze-light"
                >
                  {siteConfig.email}
                </SmartLink>
              </li>
            </ul>
          </div>

          {/* Informations */}
          <div className="lg:col-span-2">
            <p className="label-xs text-bronze">Informations</p>
            <ul className="mt-5 space-y-3">
              <li className="text-sm text-ivory/65">{siteConfig.location.city}</li>
              <li>
                <Link
                  href="/mentions-legales"
                  className="text-sm text-ivory/65 transition-colors hover:text-bronze-light"
                >
                  Mentions légales
                </Link>
              </li>
              <li>
                <Link
                  href="/confidentialite"
                  className="text-sm text-ivory/65 transition-colors hover:text-bronze-light"
                >
                  Politique de confidentialité
                </Link>
              </li>
            </ul>
          </div>
        </div>

        {/* Bas de page */}
        <div className="mt-16 flex flex-col gap-3 border-t border-ivory/10 pt-6 text-xs text-ivory/55 md:flex-row md:items-center md:justify-between">
          <p>
            © {year} {siteConfig.brandName}. Tous droits réservés.
          </p>
          <p>{siteConfig.footerNote}</p>
        </div>
      </div>

      {/* Wordmark graphique */}
      <p
        aria-hidden
        className="pointer-events-none mt-14 select-none text-center font-display text-[clamp(4rem,15.5vw,14rem)] leading-[0.8] tracking-[0.06em] text-ivory/[0.045]"
      >
        {siteConfig.brandName.toUpperCase()}
      </p>
    </footer>
  );
}
