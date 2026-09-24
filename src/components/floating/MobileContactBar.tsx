'use client';

import { Phone } from 'lucide-react';
import { telHref, whatsappHref, defaultWhatsappMessage } from '@/lib/links';
import { SmartLink } from '@/components/ui/SmartLink';
import { WhatsAppIcon } from '@/components/ui/WhatsAppIcon';

/**
 * Barre d'action mobile — les trois conversions principales
 * restent accessibles à tout moment, d'un pouce.
 */
export function MobileContactBar() {
  const tel = telHref();
  const wa = whatsappHref(defaultWhatsappMessage);

  const itemClass =
    'flex min-h-[56px] flex-col items-center justify-center gap-1.5 label-xs text-[9px] text-ivory/85 transition-colors active:text-bronze-light';

  return (
    <nav
      aria-label="Actions de contact rapides"
      className="fixed inset-x-0 bottom-0 z-40 border-t border-ivory/12 bg-noir/92 pb-[env(safe-area-inset-bottom)] backdrop-blur-md md:hidden"
    >
      <ul className="grid grid-cols-3 divide-x divide-ivory/10">
        <li>
          <SmartLink href={tel} ariaLabel="Appeler" className={itemClass}>
            <Phone size={17} strokeWidth={1.5} aria-hidden className="text-bronze-light" />
            Appeler
          </SmartLink>
        </li>
        <li>
          <SmartLink
            href={wa}
            target={wa ? '_blank' : undefined}
            rel={wa ? 'noopener noreferrer' : undefined}
            ariaLabel="Envoyer un message WhatsApp"
            className={itemClass}
          >
            <WhatsAppIcon size={17} className="text-bronze-light" />
            WhatsApp
          </SmartLink>
        </li>
        <li>
          <a href="#demande" className={itemClass}>
            <span aria-hidden className="flex h-[17px] items-center font-display text-[13px] italic leading-none text-bronze-light">
              →
            </span>
            Trajet
          </a>
        </li>
      </ul>
    </nav>
  );
}
