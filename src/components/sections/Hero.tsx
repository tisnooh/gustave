'use client';

import Image from 'next/image';
import { motion, useReducedMotion } from 'framer-motion';
import { ArrowDown, Phone } from 'lucide-react';
import { siteConfig } from '@/config/site-config';
import { telHref, whatsappHref, defaultWhatsappMessage } from '@/lib/links';
import { EASE } from '@/lib/motion';
import { Button } from '@/components/ui/Button';
import { WhatsAppIcon } from '@/components/ui/WhatsAppIcon';

export function Hero() {
  const reduce = useReducedMotion();
  const { hero } = siteConfig;
  const badge = siteConfig.availabilityBadge ?? 'Prise en charge sur demande';

  const line = (delay: number) => ({
    initial: reduce ? { opacity: 1, y: 0 } : { y: '112%' },
    animate: { y: 0 },
    transition: { duration: 1.15, ease: EASE, delay },
  });

  return (
    <section aria-label="Introduction" className="relative isolate">
      {/* Photographie & voiles */}
      <div className="absolute inset-0 -z-10 overflow-hidden">
        <Image
          src="/images/hero.jpg"
          alt="Boulevard haussmannien au crépuscule : façades en pierre de taille, lampadaires allumés et berline noire s’éloignant sur l’asphalte mouillé"
          fill
          priority
          sizes="100vw"
          quality={82}
          className="object-cover kenburns"
        />
        <div aria-hidden className="absolute inset-0 bg-gradient-to-t from-noir/85 via-noir/25 to-noir/45" />
        <div aria-hidden className="absolute inset-0 bg-gradient-to-r from-noir/75 via-noir/20 to-noir/35" />
      </div>

      <div className="mx-auto flex min-h-[100svh] max-w-[1440px] flex-col justify-end px-6 pb-40 pt-32 md:pb-48 lg:px-10">
        <div className="flex items-end justify-between gap-10">
          <div className="max-w-4xl">
            {/* Libellé */}
            <motion.p
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 1, delay: 0.15 }}
              className="label-xs flex items-center gap-4 text-blanc/75"
            >
              <span aria-hidden className="h-px w-10 bg-bronze" />
              {hero.label}
            </motion.p>

            {/* Titre — révélation ligne à ligne */}
            <h1 className="mt-7 font-display text-[clamp(2.75rem,9.5vw,7.6rem)] leading-[0.95] tracking-[-0.015em] text-blanc">
              <span className="block overflow-hidden pb-[0.08em]">
                <motion.span className="block" {...line(0.25)}>
                  {hero.titleLine1}
                </motion.span>
              </span>
              <span className="block overflow-hidden pb-[0.08em]">
                <motion.span className="block italic" {...line(0.38)}>
                  {hero.titleLine2}
                </motion.span>
              </span>
            </h1>

            {/* Sous-titre */}
            <motion.p
              initial={{ opacity: 0, y: 18 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 1, delay: 0.7, ease: EASE }}
              className="mt-7 max-w-xl text-[15px] font-light leading-relaxed text-blanc/70 md:text-lg"
            >
              {hero.subtitle}
            </motion.p>

            {/* Actions */}
            <motion.div
              initial={{ opacity: 0, y: 18 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 1, delay: 0.85, ease: EASE }}
              className="mt-10 flex flex-wrap items-center gap-4"
            >
              <Button href={telHref()} variant="solid-light" ariaLabel="Appeler maintenant">
                <Phone size={14} strokeWidth={1.6} aria-hidden />
                Appeler maintenant
              </Button>
              <Button
                href={whatsappHref(defaultWhatsappMessage)}
                variant="outline-light"
                ariaLabel="Envoyer un message WhatsApp"
              >
                <WhatsAppIcon size={15} />
                WhatsApp
              </Button>
              <a
                href="#demande"
                className="group label-xs ml-1 inline-flex items-center gap-2 border-b border-blanc/30 pb-1 text-blanc/80 transition-colors hover:border-bronze hover:text-bronze-light"
              >
                Demander un trajet
                <ArrowDown
                  size={13}
                  strokeWidth={1.5}
                  aria-hidden
                  className="transition-transform duration-500 group-hover:translate-y-0.5"
                />
              </a>
            </motion.div>

            {/* Disponibilité */}
            <motion.p
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 1, delay: 1.1 }}
              className="label-xs mt-12 flex items-center gap-3 text-blanc/55"
            >
              <span aria-hidden className="size-1.5 rounded-full bg-bronze" />
              {badge}
            </motion.p>
          </div>

          {/* Indicateur de scroll */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 1.2, delay: 1.3 }}
            className="hidden shrink-0 flex-col items-center gap-4 md:flex"
            aria-hidden
          >
            <span className="label-xs text-[9px] text-blanc/45 [writing-mode:vertical-rl]">
              Défiler
            </span>
            <span className="relative block h-16 w-px overflow-hidden bg-blanc/20">
              <span className="scroll-dot absolute left-1/2 top-0 size-[3px] -translate-x-1/2 rounded-full bg-bronze-light" />
            </span>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
