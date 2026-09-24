'use client';

import Image from 'next/image';
import { ArrowDown, Phone } from 'lucide-react';
import { motion, useReducedMotion, useScroll, useTransform } from 'framer-motion';
import { useRef } from 'react';
import { siteConfig } from '@/config/site-config';
import { telHref, whatsappHref, defaultWhatsappMessage } from '@/lib/links';
import { Button } from '@/components/ui/Button';
import { Reveal } from '@/components/ui/Reveal';
import { WhatsAppIcon } from '@/components/ui/WhatsAppIcon';

export function FinalCta() {
  const ref = useRef<HTMLElement>(null);
  const reduce = useReducedMotion();
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ['start end', 'end end'],
  });
  const y = useTransform(scrollYProgress, [0, 1], reduce ? ['0%', '0%'] : ['5%', '-3%']);

  return (
    <section
      ref={ref}
      aria-labelledby="cta-titre"
      className="relative isolate overflow-hidden py-32 text-ivory lg:py-48"
    >
      <div className="absolute inset-0 -z-10 overflow-hidden">
        <motion.div style={{ y }} className="absolute inset-[-10%]">
          <Image
            src="/images/cta-night.jpg"
            alt=""
            fill
            sizes="100vw"
            loading="lazy"
            quality={80}
            className="object-cover"
          />
        </motion.div>
        <div aria-hidden className="absolute inset-0 bg-noir/70" />
        <div aria-hidden className="absolute inset-0 bg-gradient-to-t from-noir-deep/90 via-transparent to-noir/60" />
      </div>

      <div className="mx-auto max-w-3xl px-6 text-center">
        <Reveal>
          <p className="label-xs flex items-center justify-center gap-4 text-bronze-light">
            <span aria-hidden className="h-px w-8 bg-current opacity-70" />
            {siteConfig.finalCta.label}
            <span aria-hidden className="h-px w-8 bg-current opacity-70" />
          </p>
          <h2
            id="cta-titre"
            className="mt-6 font-display text-[clamp(2.6rem,6.5vw,5.2rem)] leading-[1.02] tracking-[-0.015em] text-blanc"
          >
            {siteConfig.finalCta.title.replace('.', '')}
            <span className="text-bronze-light">.</span>
          </h2>
          <p className="mx-auto mt-6 max-w-md text-[15px] leading-relaxed text-blanc/65 md:text-base">
            {siteConfig.finalCta.text}
          </p>
        </Reveal>
        <Reveal delay={0.15}>
          <div className="mt-11 flex flex-wrap items-center justify-center gap-4">
            <Button href={telHref()} variant="solid-light" ariaLabel="Appeler">
              <Phone size={14} strokeWidth={1.6} aria-hidden />
              Appeler
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
          </div>
        </Reveal>
      </div>
    </section>
  );
}
