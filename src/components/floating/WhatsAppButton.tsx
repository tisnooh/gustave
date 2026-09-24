'use client';

import { siteConfig } from '@/config/site-config';
import { whatsappHref, defaultWhatsappMessage } from '@/lib/links';
import { SmartLink } from '@/components/ui/SmartLink';
import { WhatsAppIcon } from '@/components/ui/WhatsAppIcon';

/**
 * Bouton WhatsApp flottant — discret, ton sur ton,
 * jamais un gros pastille verte : cercle noir profond,
 * glyphe ivoire, liseré bronze au survol.
 */
export function WhatsAppButton() {
  const href = whatsappHref(defaultWhatsappMessage);
  return (
    <div className="group fixed bottom-6 right-6 z-40 hidden md:block">
      <SmartLink
        href={href}
        target={href ? '_blank' : undefined}
        rel={href ? 'noopener noreferrer' : undefined}
        ariaLabel={`Écrire sur WhatsApp à ${siteConfig.brandName}`}
        className="flex size-13 items-center justify-center rounded-full border border-ivory/20 bg-noir/90 text-ivory shadow-[0_16px_36px_-14px_rgba(0,0,0,0.65)] backdrop-blur transition-all duration-500 hover:border-bronze hover:text-bronze-light"
      >
        <WhatsAppIcon size={20} />
        <span className="label-xs pointer-events-none absolute right-[calc(100%+12px)] top-1/2 -translate-y-1/2 whitespace-nowrap border border-ink/10 bg-blanc px-3 py-1.5 text-[9px] text-ink opacity-0 shadow-sm transition-all duration-400 group-hover:opacity-100">
          Écrire sur WhatsApp
        </span>
      </SmartLink>
    </div>
  );
}
