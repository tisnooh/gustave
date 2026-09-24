import Image from 'next/image';
import { ArrowRight } from 'lucide-react';
import { siteConfig } from '@/config/site-config';
import { Button } from '@/components/ui/Button';
import { Reveal } from '@/components/ui/Reveal';
import { SectionTitle } from '@/components/ui/SectionTitle';

export function AirportStationSection() {
  return (
    <section
      id="transferts"
      aria-labelledby="transferts-titre"
      className="scroll-mt-24 bg-ivory"
    >
      <div className="grid lg:min-h-[640px] lg:grid-cols-2">
        {/* Photographie */}
        <div className="group relative order-2 h-[420px] overflow-hidden lg:order-1 lg:h-auto lg:min-h-full">
          <Image
            src="/images/transfer.jpg"
            alt="Berline noire stationnée devant un terminal d’aéroport au crépuscule, bagage de cuir posé à côté"
            fill
            sizes="(max-width: 1024px) 100vw, 50vw"
            loading="lazy"
            quality={82}
            className="object-cover transition-transform duration-[1600ms] ease-out group-hover:scale-[1.04]"
          />
          <div aria-hidden className="absolute inset-0 bg-gradient-to-t from-noir/35 to-transparent" />
          <p className="label-xs absolute bottom-6 left-6 text-blanc/70">
            Prise en charge au terminal
          </p>
        </div>

        {/* Informations */}
        <div className="order-1 px-6 py-20 lg:order-2 lg:self-center lg:px-16 lg:py-28 xl:px-24">
          <SectionTitle
            label="Transferts"
            title={
              <span id="transferts-titre">
                Aéroports <span className="italic">& gares.</span>
              </span>
            }
            intro="Une prise en charge soignée, du terminal au pied de votre adresse — ou l’inverse."
          />

          <div className="mt-12 grid gap-12 sm:grid-cols-2">
            {/* Aéroports */}
            <Reveal delay={0.1}>
              <p className="label-xs text-bronze-deep">Aéroports</p>
              <ul className="mt-5 border-t border-ink/12">
                {siteConfig.airports.map((a) => (
                  <li
                    key={a.code}
                    className="flex items-baseline justify-between gap-4 border-b border-ink/12 py-4"
                  >
                    <span className="text-[15px] text-ink/80">{a.name}</span>
                    <span className="font-display text-sm italic text-bronze">{a.code}</span>
                  </li>
                ))}
              </ul>
            </Reveal>

            {/* Gares */}
            <Reveal delay={0.2}>
              <p className="label-xs text-bronze-deep">Gares</p>
              <ul className="mt-5 border-t border-ink/12">
                {siteConfig.stations.map((s) => (
                  <li
                    key={s}
                    className="flex items-baseline justify-between gap-4 border-b border-ink/12 py-[0.9rem]"
                  >
                    <span className="text-[15px] text-ink/80">{s}</span>
                    <span aria-hidden className="size-1 rounded-full bg-bronze/70" />
                  </li>
                ))}
              </ul>
            </Reveal>
          </div>

          <Reveal delay={0.25}>
            <p className="mt-10 max-w-md border-l border-bronze/50 pl-5 text-sm leading-relaxed text-ink/65">
              Indiquez votre heure d’arrivée ou de départ lors de votre demande —
              la prise en charge est organisée en conséquence.
            </p>
            <div className="mt-8">
              <Button href="#demande" variant="solid-dark">
                Organiser mon transfert
                <ArrowRight size={14} strokeWidth={1.6} aria-hidden />
              </Button>
            </div>
          </Reveal>
        </div>
      </div>
    </section>
  );
}
