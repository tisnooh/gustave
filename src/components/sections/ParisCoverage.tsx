'use client';

import Image from 'next/image';
import { motion, useInView, useReducedMotion } from 'framer-motion';
import { useEffect, useRef, useState } from 'react';
import { siteConfig } from '@/config/site-config';
import { EASE } from '@/lib/motion';
import { Reveal } from '@/components/ui/Reveal';

const stats = [
  { value: 20, label: 'arrondissements' },
  { value: 2, label: 'aéroports' },
  { value: 6, label: 'gares principales' },
];

export function ParisCoverage() {
  return (
    <section
      id="destinations"
      aria-labelledby="destinations-titre"
      className="relative scroll-mt-24 overflow-hidden bg-noir py-24 text-ivory lg:py-36"
    >
      {/* Toits de Paris, en fond très discret */}
      <div aria-hidden className="absolute inset-0 opacity-[0.12]">
        <Image
          src="/images/paris-roofs.jpg"
          alt=""
          fill
          sizes="100vw"
          loading="lazy"
          className="object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-r from-noir via-noir/70 to-noir/30" />
      </div>

      <div className="relative mx-auto grid max-w-[1440px] gap-16 px-6 lg:grid-cols-12 lg:gap-10 lg:px-10">
        {/* Texte */}
        <div className="lg:col-span-5">
          <Reveal>
            <p className="label-xs flex items-center gap-4 text-bronze-light">
              <span aria-hidden className="h-px w-8 bg-current opacity-70" />
              Destinations
            </p>
            <h2
              id="destinations-titre"
              className="mt-5 font-display text-[clamp(2.1rem,4.6vw,3.9rem)] leading-[1.04] tracking-[-0.01em] text-blanc"
            >
              Paris est <span className="italic">notre terrain.</span>
            </h2>
            <p className="mt-6 max-w-md text-[15px] leading-relaxed text-blanc/60 md:text-base">
              Des trajets dans les différents arrondissements de Paris et en Île-de-France,
              avec prise en charge sur demande.
            </p>
          </Reveal>

          {/* Repères chiffrés — faits vérifiables, aucun chiffre inventé */}
          <Reveal delay={0.15}>
            <dl className="mt-12 flex flex-wrap items-baseline gap-x-9 gap-y-5 border-y border-ivory/12 py-6">
              {stats.map((s) => (
                <div key={s.label} className="flex items-baseline gap-3">
                  <dd className="font-display text-[2.2rem] leading-none text-bronze-light">
                    <CountUp value={s.value} />
                  </dd>
                  <dt className="label-xs text-[9.5px] leading-snug text-blanc/60">{s.label}</dt>
                </div>
              ))}
            </dl>
          </Reveal>
        </div>

        {/* Plan stylisé */}
        <Reveal className="lg:col-span-7" delay={0.1} y={36}>
          <ParisMap />
        </Reveal>
      </div>
    </section>
  );
}

/* ── Compteur sobre ─────────────────────────────────────── */
function CountUp({ value }: { value: number }) {
  const ref = useRef<HTMLSpanElement>(null);
  const inView = useInView(ref, { once: true, margin: '-60px' });
  const reduce = useReducedMotion();
  const [display, setDisplay] = useState(0);

  useEffect(() => {
    if (!inView) return;
    if (reduce) {
      setDisplay(value);
      return;
    }
    let raf = 0;
    const start = performance.now();
    const duration = 1400;
    const tick = (now: number) => {
      const p = Math.min(1, (now - start) / duration);
      const eased = 1 - Math.pow(1 - p, 3);
      setDisplay(Math.round(eased * value));
      if (p < 1) raf = requestAnimationFrame(tick);
    };
    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, [inView, value, reduce, setDisplay]);

  return <span ref={ref}>{display}</span>;
}

/* ── Plan de Paris dessiné ───────────────────────────────── */
function ParisMap() {
  const reduce = useReducedMotion();
  const draw = {
    initial: reduce ? { pathLength: 1 } : { pathLength: 0 },
    whileInView: { pathLength: 1 },
    viewport: { once: true, margin: '-80px' },
  };

  return (
    <div className="relative mx-auto w-full max-w-[620px]">
      <svg
        viewBox="0 0 640 600"
        role="img"
        aria-label="Plan stylisé de Paris : quartiers desservis et liaisons vers les aéroports Charles de Gaulle et Orly"
        className="h-auto w-full"
      >
        {/* Périphérique suggéré */}
        <motion.circle
          cx={310}
          cy={310}
          r={238}
          fill="none"
          stroke="rgba(243,240,234,0.14)"
          strokeWidth={1}
          strokeDasharray="2 7"
          {...draw}
          transition={{ duration: 2, ease: 'easeInOut' }}
        />
        {/* Ceinture intérieure */}
        <motion.circle
          cx={310}
          cy={310}
          r={122}
          fill="none"
          stroke="rgba(243,240,234,0.08)"
          strokeWidth={1}
          {...draw}
          transition={{ duration: 1.6, ease: 'easeInOut', delay: 0.2 }}
        />

        {/* La Seine, ruban de bronze */}
        <motion.path
          d="M 58 424 C 140 402 182 330 266 322 C 350 314 374 354 450 330 C 526 306 562 262 600 248"
          fill="none"
          stroke="rgba(168,140,98,0.65)"
          strokeWidth={1.6}
          strokeLinecap="round"
          {...draw}
          transition={{ duration: 2.2, ease: 'easeInOut', delay: 0.35 }}
        />

        {/* Liaisons aéroports */}
        {siteConfig.mapPoints
          .filter((p) => p.gateway && p.leaderFrom)
          .map((p) => (
            <motion.line
              key={`leader-${p.id}`}
              x1={p.leaderFrom!.x}
              y1={p.leaderFrom!.y}
              x2={p.x}
              y2={p.y}
              stroke="rgba(243,240,234,0.22)"
              strokeWidth={1}
              strokeDasharray="1 6"
              strokeLinecap="round"
              initial={reduce ? { opacity: 1 } : { opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 1, delay: 1.3 }}
            />
          ))}

        {/* Quartiers & portes */}
        {siteConfig.mapPoints.map((p, i) => (
          <motion.g
            key={p.id}
            initial={reduce ? { opacity: 1 } : { opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true, margin: '-60px' }}
            transition={{ duration: 0.8, delay: 0.9 + i * 0.11, ease: EASE }}
          >
            <circle
              cx={p.x}
              cy={p.y}
              r={7}
              fill="none"
              stroke="rgba(168,140,98,0.5)"
              strokeWidth={1}
              className="map-halo"
              style={{ animationDelay: `${i * 0.45}s` }}
            />
            <circle cx={p.x} cy={p.y} r={3} fill="#A88C62" />
            <text
              x={p.x + labelOffset(p.labelPosition).dx}
              y={p.y + labelOffset(p.labelPosition).dy}
              fill="rgba(250,250,248,0.72)"
              style={{
                fontFamily: 'var(--font-jost)',
                fontSize: 12,
                letterSpacing: '0.18em',
                textTransform: 'uppercase',
              }}
              textAnchor={p.labelPosition === 'left' ? 'end' : p.labelPosition === 'right' ? 'start' : 'middle'}
            >
              {p.label}
            </text>
          </motion.g>
        ))}

        {/* Nord & échelle — détails cartographiques */}
        <g opacity={0.45}>
          <text
            x={596}
            y={52}
            fill="rgba(250,250,248,0.8)"
            textAnchor="middle"
            style={{ fontFamily: 'var(--font-jost)', fontSize: 11, letterSpacing: '0.2em' }}
          >
            N
          </text>
          <line x1={596} y1={60} x2={596} y2={76} stroke="rgba(250,250,248,0.5)" strokeWidth={1} />
          <path d="M 592 62 L 596 56 L 600 62" fill="none" stroke="rgba(250,250,248,0.5)" strokeWidth={1} />
        </g>
        <g opacity={0.4}>
          <line x1={52} y1={556} x2={112} y2={556} stroke="rgba(250,250,248,0.6)" strokeWidth={1} />
          <line x1={52} y1={552} x2={52} y2={560} stroke="rgba(250,250,248,0.6)" strokeWidth={1} />
          <line x1={112} y1={552} x2={112} y2={560} stroke="rgba(250,250,248,0.6)" strokeWidth={1} />
          <text
            x={120}
            y={560}
            fill="rgba(250,250,248,0.7)"
            style={{ fontFamily: 'var(--font-jost)', fontSize: 10, letterSpacing: '0.16em' }}
          >
            2 KM
          </text>
        </g>
      </svg>
    </div>
  );
}

function labelOffset(position: 'left' | 'right' | 'top' | 'bottom') {
  switch (position) {
    case 'left':
      return { dx: -14, dy: 4 };
    case 'right':
      return { dx: 14, dy: 4 };
    case 'top':
      return { dx: 0, dy: -14 };
    case 'bottom':
      return { dx: 0, dy: 24 };
  }
}
