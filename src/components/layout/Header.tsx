'use client';

import { useEffect, useState } from 'react';
import { AnimatePresence, useMotionValueEvent, useScroll } from 'framer-motion';
import { Phone } from 'lucide-react';
import { siteConfig } from '@/config/site-config';
import { telHref } from '@/lib/links';
import { Brand } from '@/components/ui/Brand';
import { SmartLink } from '@/components/ui/SmartLink';
import { WhatsAppIcon } from '@/components/ui/WhatsAppIcon';
import { whatsappHref, defaultWhatsappMessage } from '@/lib/links';
import { MobileMenu } from '@/components/layout/MobileMenu';

export function Header() {
  const { scrollY } = useScroll();
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);

  useMotionValueEvent(scrollY, 'change', (v) => setScrolled(v > 48));

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => e.key === 'Escape' && setOpen(false);
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, []);

  /* Texte clair uniquement tant que le hero est visible et le menu fermé */
  const lightText = !scrolled && !open;
  const callHref = telHref();
  const waHref = whatsappHref(defaultWhatsappMessage);

  return (
    <>
      <header
        className={`fixed inset-x-0 top-0 z-50 transition-all duration-500 ${
          scrolled && !open
            ? 'border-b border-ink/8 bg-ivory/85 backdrop-blur-md'
            : 'border-b border-transparent bg-transparent'
        } ${lightText ? 'text-blanc' : 'text-ink'}`}
      >
        <div
          className={`mx-auto flex max-w-[1440px] items-center justify-between px-5 transition-all sm:px-6 duration-500 lg:px-10 ${
            scrolled ? 'h-16' : 'h-20 lg:h-24'
          }`}
        >
          <a
            href="#contenu"
            aria-label={`${siteConfig.brandName} — retour en haut`}
            className="transition-opacity hover:opacity-70"
          >
            <Brand tone={lightText ? 'ivory' : 'ink'} />
          </a>

          {/* Navigation desktop, centrée */}
          <nav aria-label="Navigation principale" className="absolute left-1/2 hidden -translate-x-1/2 lg:block">
            <ul className="flex items-center gap-9">
              {siteConfig.navigation.map((item) => (
                <li key={item.href}>
                  <a
                    href={item.href}
                    className={`group label-xs relative py-2 transition-colors duration-300 ${
                      lightText ? 'text-blanc/80 hover:text-blanc' : 'text-ink/70 hover:text-ink'
                    }`}
                  >
                    {item.label}
                    <span
                      aria-hidden
                      className="absolute inset-x-0 -bottom-0.5 h-px origin-left scale-x-0 bg-bronze transition-transform duration-500 group-hover:scale-x-100"
                    />
                  </a>
                </li>
              ))}
            </ul>
          </nav>

          <div className="flex items-center gap-3">
            {/* WhatsApp — icône discrète */}
            <SmartLink
              href={waHref}
              target={waHref ? '_blank' : undefined}
              rel={waHref ? 'noopener noreferrer' : undefined}
              ariaLabel="Écrire sur WhatsApp"
              title={waHref ? 'WhatsApp' : 'Numéro WhatsApp à configurer'}
              className={`hidden size-10 items-center justify-center rounded-full border transition-all duration-500 sm:inline-flex ${
                lightText
                  ? 'border-blanc/30 hover:border-bronze hover:text-bronze-light'
                  : 'border-ink/20 hover:border-bronze hover:text-bronze'
              }`}
            >
              <WhatsAppIcon size={17} />
            </SmartLink>

            {/* Action principale : appeler */}
            <SmartLink
              href={callHref}
              ariaLabel={`Appeler ${siteConfig.brandName}`}
              title={callHref ? 'Appeler' : 'Numéro à configurer'}
              className={`inline-flex min-h-[40px] items-center gap-2 rounded-full border px-5 label-xs transition-all duration-500 ${
                lightText
                  ? 'border-blanc/40 hover:bg-blanc hover:text-ink'
                  : 'border-ink/25 hover:bg-ink hover:text-ivory'
              }`}
            >
              <Phone size={13} strokeWidth={1.5} aria-hidden />
              Appeler
            </SmartLink>

            {/* Menu mobile */}
            <button
              type="button"
              onClick={() => setOpen((v) => !v)}
              aria-expanded={open}
              aria-controls="menu-mobile"
              aria-label={open ? 'Fermer le menu' : 'Ouvrir le menu'}
              className="relative flex size-10 items-center justify-center lg:hidden"
            >
              <span aria-hidden className="relative block h-3 w-6">
                <span
                  className={`absolute left-0 top-0 h-px w-full bg-current transition-all duration-400 ${
                    open ? 'top-1/2 rotate-45' : ''
                  }`}
                />
                <span
                  className={`absolute bottom-0 left-0 h-px w-full bg-current transition-all duration-400 ${
                    open ? 'bottom-1/2 -rotate-45' : ''
                  }`}
                />
              </span>
            </button>
          </div>
        </div>
      </header>

      <AnimatePresence>
        {open && <MobileMenu onClose={() => setOpen(false)} />}
      </AnimatePresence>
    </>
  );
}
