'use client';

import Image from 'next/image';
import { motion, useReducedMotion, useScroll, useTransform } from 'framer-motion';
import { useRef } from 'react';
import { Reveal } from '@/components/ui/Reveal';

export function Story() {
  const ref = useRef<HTMLDivElement>(null);
  const reduce = useReducedMotion();
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ['start end', 'end start'],
  });
  const yMain = useTransform(scrollYProgress, [0, 1], reduce ? ['0%', '0%'] : ['4%', '-4%']);
  const yInset = useTransform(scrollYProgress, [0, 1], reduce ? ['0%', '0%'] : ['-6%', '6%']);

  return (
    <section
      id="a-propos"
      ref={ref}
      aria-labelledby="story-titre"
      className="relative scroll-mt-24 overflow-hidden bg-noir py-28 text-ivory lg:py-40"
    >
      {/* Wordmark en fond */}
      <p
        aria-hidden
        className="pointer-events-none absolute -bottom-6 left-1/2 -translate-x-1/2 select-none whitespace-nowrap font-display text-[22vw] leading-none tracking-[0.04em] text-ivory/[0.035]"
      >
        Gustave
      </p>

      <div className="relative mx-auto grid max-w-[1440px] items-center gap-16 px-6 lg:grid-cols-12 lg:gap-8 lg:px-10">
        {/* Texte */}
        <div className="lg:col-span-5">
          <Reveal>
            <p className="label-xs flex items-center gap-4 text-bronze-light">
              <span aria-hidden className="h-px w-8 bg-current opacity-70" />
              De Paris, pour Paris.
            </p>
            <h2
              id="story-titre"
              className="mt-6 font-display text-[clamp(1.9rem,3.6vw,3rem)] leading-[1.15] tracking-[-0.01em] text-blanc"
            >
              Du premier rendez-vous du matin{' '}
              <span className="italic text-bronze-light">au dernier trajet</span> de la soirée.
            </h2>
            <p className="mt-7 max-w-md text-[15px] leading-relaxed text-blanc/60 md:text-base">
              Gustave accompagne vos déplacements avec une seule idée en tête :
              transformer un simple trajet en expérience fluide.
            </p>
            <p className="mt-4 max-w-md text-[15px] leading-relaxed text-blanc/60 md:text-base">
              Une connaissance fine de la ville, de ses horaires et de ses quartiers —
              et le soin du détail, de la ponctualité à la discrétion.
            </p>
          </Reveal>
          <Reveal delay={0.2}>
            <p className="label-xs mt-10 flex items-center gap-3 text-blanc/55">
              <span aria-hidden className="h-px w-6 bg-bronze" />
              Paris, tôt le matin
            </p>
          </Reveal>
        </div>

        {/* Composition photographique asymétrique */}
        <div className="relative lg:col-span-7">
          <motion.div style={{ y: yMain }} className="relative ml-auto aspect-[3/4] w-[78%] max-w-[520px] overflow-hidden sm:w-[68%]">
            <Image
              src="/images/story-main.jpg"
              alt="Rue parisienne déserte au petit matin, lampadaires encore allumés sur les pavés mouillés"
              fill
              sizes="(max-width: 1024px) 80vw, 40vw"
              loading="lazy"
              quality={82}
              className="object-cover"
            />
          </motion.div>
          <motion.div
            style={{ y: yInset }}
            className="relative -mt-16 aspect-[4/3] w-[58%] max-w-[360px] overflow-hidden border-[6px] border-noir shadow-[0_30px_60px_-20px_rgba(0,0,0,0.7)] lg:absolute lg:-left-4 lg:bottom-8 lg:-mt-0 lg:w-[46%]"
          >
            <Image
              src="/images/story-inset.jpg"
              alt="Intérieur de voiture premium : cuir sombre et lumières de la ville en bokeh"
              fill
              sizes="(max-width: 1024px) 60vw, 30vw"
              loading="lazy"
              quality={82}
              className="object-cover"
            />
          </motion.div>
        </div>
      </div>
    </section>
  );
}
