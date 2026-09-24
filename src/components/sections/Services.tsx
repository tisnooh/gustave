'use client';

import { useEffect, useRef, useState } from 'react';
import Image from 'next/image';
import { AnimatePresence, motion, useMotionValue, useSpring } from 'framer-motion';
import { siteConfig } from '@/config/site-config';
import { SectionTitle } from '@/components/ui/SectionTitle';
import { Reveal } from '@/components/ui/Reveal';

export function Services() {
  const [active, setActive] = useState<number | null>(null);
  const [finePointer, setFinePointer] = useState(false);
  const listRef = useRef<HTMLUListElement>(null);

  const mx = useMotionValue(-400);
  const my = useMotionValue(-400);
  const x = useSpring(mx, { stiffness: 180, damping: 22, mass: 0.6 });
  const y = useSpring(my, { stiffness: 180, damping: 22, mass: 0.6 });

  useEffect(() => {
    setFinePointer(window.matchMedia('(pointer: fine)').matches);
  }, []);

  const onMove = (e: React.MouseEvent) => {
    if (!finePointer) return;
    mx.set(e.clientX + 28);
    my.set(e.clientY - 170);
  };

  return (
    <section id="services" className="scroll-mt-24 bg-ivory py-24 lg:py-36">
      <div className="mx-auto max-w-[1440px] px-6 lg:px-10">
        {/* En-tête éditorial asymétrique */}
        <div className="grid gap-8 lg:grid-cols-12">
          <SectionTitle
            className="lg:col-span-7"
            label="Services"
            title={
              <>
                Un taxi pour <span className="italic">chaque trajet.</span>
              </>
            }
          />
          <Reveal className="flex items-end lg:col-span-4 lg:col-start-9" delay={0.15}>
            <p className="max-w-xs border-l border-bronze/50 pl-5 text-[15px] leading-relaxed text-ink/65">
              Du déplacement ponctuel au transfert organisé, un même niveau d’exigence —
              à Paris comme en Île-de-France.
            </p>
          </Reveal>
        </div>

        {/* Index éditorial */}
        <ul
          ref={listRef}
          onMouseMove={onMove}
          onMouseLeave={() => setActive(null)}
          className="mt-16 border-t border-ink/12 lg:mt-24"
        >
          {siteConfig.services.map((service, i) => (
            <ServiceItem
              key={service.id}
              index={i}
              number={service.number}
              title={service.title}
              description={service.description}
              image={service.image}
              imageAlt={service.imageAlt}
              onEnter={() => setActive(i)}
            />
          ))}
        </ul>
      </div>

      {/* Aperçu flottant suivant le curseur (desktop uniquement) */}
      {finePointer && (
        <motion.div
          aria-hidden
          style={{ x, y }}
          className="pointer-events-none fixed left-0 top-0 z-30 hidden lg:block"
        >
          <AnimatePresence mode="sync">
            {active !== null && (
              <motion.div
                key={active}
                initial={{ opacity: 0, scale: 0.94 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.97 }}
                transition={{ duration: 0.35 }}
                className="relative h-[340px] w-[250px] overflow-hidden border border-ink/10 shadow-[0_30px_60px_-25px_rgba(13,13,12,0.5)]"
              >
                <Image
                  src={siteConfig.services[active].image}
                  alt=""
                  fill
                  sizes="250px"
                  className="object-cover"
                />
              </motion.div>
            )}
          </AnimatePresence>
        </motion.div>
      )}
    </section>
  );
}

type ServiceItemProps = {
  index: number;
  number: string;
  title: string;
  description: string;
  image: string;
  imageAlt: string;
  onEnter: () => void;
};

function ServiceItem({
  index,
  number,
  title,
  description,
  image,
  imageAlt,
  onEnter,
}: ServiceItemProps) {
  return (
    <Reveal delay={index * 0.05} y={20}>
      <li
        onMouseEnter={onEnter}
        className="group relative border-b border-ink/12"
      >
        {/* Voile subtil au survol */}
        <span
          aria-hidden
          className="absolute inset-0 origin-left scale-x-0 bg-ink/[0.035] transition-transform duration-700 group-hover:scale-x-100"
        />
        <div className="relative grid grid-cols-[auto_1fr_auto] items-start gap-5 py-8 lg:grid-cols-[5rem_minmax(0,1fr)_minmax(0,26rem)] lg:items-baseline lg:gap-10 lg:py-11">
          <span className="pt-1 font-display text-sm italic text-bronze-deep lg:pt-2">{number}</span>
          <h3 className="font-display text-[1.9rem] leading-tight tracking-[-0.01em] text-ink transition-transform duration-700 group-hover:translate-x-2 lg:text-[2.9rem]">
            {title}
          </h3>
          <div className="col-span-2 flex items-start justify-between gap-6 lg:col-span-1 lg:block">
            <p className="max-w-sm text-[15px] leading-relaxed text-ink/65">{description}</p>
            {/* Vignette mobile */}
            <div className="relative h-[88px] w-[64px] shrink-0 overflow-hidden lg:hidden">
              <Image src={image} alt={imageAlt} fill sizes="64px" className="object-cover" loading="lazy" />
            </div>
          </div>
        </div>
      </li>
    </Reveal>
  );
}
