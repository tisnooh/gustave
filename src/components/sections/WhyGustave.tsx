import { Clock, Gem, MapPin, Phone } from 'lucide-react';
import type { Commitment } from '@/config/site-config';
import { siteConfig } from '@/config/site-config';
import { Reveal } from '@/components/ui/Reveal';
import { SectionTitle } from '@/components/ui/SectionTitle';

const icons = {
  clock: Clock,
  phone: Phone,
  map: MapPin,
  gem: Gem,
} as const;

export function WhyGustave() {
  return (
    <section aria-labelledby="engagements-titre" className="bg-ivory py-24 lg:py-32">
      <div className="mx-auto max-w-[1440px] px-6 lg:px-10">
        <SectionTitle
          align="center"
          className="mx-auto"
          label="Pourquoi Gustave"
          title={
            <span id="engagements-titre">
              Des engagements <span className="italic">simples.</span>
            </span>
          }
          intro="Pas de promesses chiffrées : quatre principes de travail, appliqués à chaque course."
        />

        {/* Grille en filets — aucun carton arrondi */}
        <Reveal delay={0.1} y={32}>
          <ul className="mt-16 grid gap-px border border-ink/12 bg-ink/12 sm:grid-cols-2 lg:grid-cols-4">
            {siteConfig.commitments.map((c, i) => (
              <FeatureItem key={c.title} commitment={c} index={i} />
            ))}
          </ul>
        </Reveal>
      </div>
    </section>
  );
}

function FeatureItem({ commitment, index }: { commitment: Commitment; index: number }) {
  const Icon = icons[commitment.icon];
  return (
    <li className="group bg-ivory p-8 transition-colors duration-500 hover:bg-blanc lg:p-10">
      <div className="flex items-center justify-between">
        <Icon
          size={19}
          strokeWidth={1.25}
          aria-hidden
          className="text-bronze-deep transition-transform duration-500 group-hover:-translate-y-0.5"
        />
        <span className="font-display text-xs italic text-ink/45">0{index + 1}</span>
      </div>
      <h3 className="mt-8 font-display text-[1.55rem] leading-snug text-ink">
        {commitment.title}
      </h3>
      <p className="mt-3 text-sm leading-relaxed text-ink/65">{commitment.text}</p>
    </li>
  );
}
