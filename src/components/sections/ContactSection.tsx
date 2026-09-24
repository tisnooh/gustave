import { ArrowUpRight, Clock, Mail, MapPin, Phone } from 'lucide-react';
import { siteConfig } from '@/config/site-config';
import { mailHref, telHref, whatsappHref, defaultWhatsappMessage } from '@/lib/links';
import { Reveal } from '@/components/ui/Reveal';
import { SectionTitle } from '@/components/ui/SectionTitle';
import { SmartLink } from '@/components/ui/SmartLink';
import { WhatsAppIcon } from '@/components/ui/WhatsAppIcon';

export function ContactSection() {
  const rows = [
    {
      icon: Phone,
      label: 'Téléphone',
      value: siteConfig.phoneDisplay,
      href: telHref(),
      external: false,
    },
    {
      icon: WhatsAppIcon,
      label: 'WhatsApp',
      value: siteConfig.whatsapp,
      href: whatsappHref(defaultWhatsappMessage),
      external: true,
    },
    {
      icon: Mail,
      label: 'Email',
      value: siteConfig.email,
      href: mailHref(),
      external: false,
    },
  ];

  return (
    <section id="contact" aria-labelledby="contact-titre" className="scroll-mt-24 bg-ivory py-24 lg:py-36">
      <div className="mx-auto grid max-w-[1440px] gap-14 px-6 lg:grid-cols-12 lg:gap-10 lg:px-10">
        {/* Intro */}
        <div className="min-w-0 lg:col-span-5">
          <SectionTitle
            label="Contact"
            title={
              <span id="contact-titre">
                Votre prochain <span className="italic">trajet.</span>
              </span>
            }
            intro="Décrivez votre parcours — départ, destination, date et heure. Nous confirmons la disponibilité directement, sans intermédiaire."
          />
          <Reveal delay={0.15}>
            <dl className="mt-10 space-y-5">
              <div className="flex items-start gap-4">
                <MapPin size={16} strokeWidth={1.4} aria-hidden className="mt-0.5 text-bronze" />
                <div>
                  <dt className="label-xs text-[10px] text-ink/55">Zone desservie</dt>
                  <dd className="mt-1 text-[15px] text-ink/75">{siteConfig.location.zone}</dd>
                </div>
              </div>
              <div className="flex items-start gap-4">
                <Clock size={16} strokeWidth={1.4} aria-hidden className="mt-0.5 text-bronze" />
                <div>
                  <dt className="label-xs text-[10px] text-ink/55">Horaires</dt>
                  <dd className="mt-1 text-[15px] text-ink/75">{siteConfig.openingHours}</dd>
                </div>
              </div>
            </dl>
          </Reveal>
        </div>

        {/* Panneau sombre : coordonnées cliquables */}
        <Reveal className="min-w-0 lg:col-span-7" delay={0.1} y={34}>
          <div className="bg-noir p-7 text-ivory sm:p-10 lg:p-12">
            <ul className="border-t border-ivory/12">
              {rows.map(({ icon: Icon, label, value, href, external }) => (
                <li key={label} className="border-b border-ivory/12">
                  <SmartLink
                    href={href}
                    target={external && href ? '_blank' : undefined}
                    rel={external && href ? 'noopener noreferrer' : undefined}
                    ariaLabel={`${label} — ${value}`}
                    className="group flex min-w-0 items-center justify-between gap-6 py-6"
                  >
                    <span className="flex min-w-0 items-center gap-5">
                      <Icon
                        size={17}
                        strokeWidth={1.4}
                        aria-hidden
                        className="shrink-0 text-bronze transition-transform duration-500 group-hover:-translate-y-0.5"
                      />
                      <span className="min-w-0">
                        <span className="label-xs block text-[9.5px] text-ivory/60">{label}</span>
                        <span className="mt-1.5 block break-words font-display text-[1.35rem] leading-tight text-blanc transition-colors duration-400 group-hover:text-bronze-light sm:text-[1.6rem]">
                          {value}
                        </span>
                      </span>
                    </span>
                    <ArrowUpRight
                      size={18}
                      strokeWidth={1.3}
                      aria-hidden
                      className="shrink-0 text-ivory/50 transition-all duration-500 group-hover:translate-x-1 group-hover:-translate-y-1 group-hover:text-bronze-light"
                    />
                  </SmartLink>
                </li>
              ))}
            </ul>
            <p className="mt-7 text-sm leading-relaxed text-ivory/60">
              Un message suffit : départ, destination, horaire.
              Nous revenons vers vous pour confirmer la prise en charge.
            </p>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
