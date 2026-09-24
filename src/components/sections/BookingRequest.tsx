'use client';

import { useMemo, useState } from 'react';
import { motion } from 'framer-motion';
import { ArrowRight } from 'lucide-react';
import { siteConfig } from '@/config/site-config';
import { buildBookingMessage, mailHref, whatsappHref } from '@/lib/links';
import { EASE } from '@/lib/motion';
import { Reveal } from '@/components/ui/Reveal';

type Status =
  | { kind: 'idle' }
  | { kind: 'error'; message: string }
  | { kind: 'sent'; channel: 'whatsapp' | 'email' };

const fieldShell =
  'group relative bg-blanc px-6 py-5 transition-colors duration-300 focus-within:bg-[#FBFAF7]';
const underline =
  'pointer-events-none absolute bottom-0 left-0 h-px w-0 bg-bronze transition-all duration-500 group-focus-within:w-full';
const labelText = 'label-xs mb-2.5 block text-[10px] text-ink/60';
const inputText =
  'w-full bg-transparent text-[15px] font-normal text-ink placeholder:font-light placeholder:text-ink/45 focus:outline-none';

export function BookingRequest() {
  const [depart, setDepart] = useState('');
  const [destination, setDestination] = useState('');
  const [date, setDate] = useState('');
  const [heure, setHeure] = useState('');
  const [passagers, setPassagers] = useState('1');
  const [nom, setNom] = useState('');
  const [telephone, setTelephone] = useState('');
  const [informations, setInformations] = useState('');
  const [status, setStatus] = useState<Status>({ kind: 'idle' });

  const today = useMemo(() => new Date().toISOString().split('T')[0], []);

  const details = { depart, destination, date, heure, passagers, nom, telephone, informations };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!depart.trim() || !destination.trim() || !date || !heure) {
      setStatus({
        kind: 'error',
        message: 'Merci d’indiquer au moins le départ, la destination, la date et l’heure.',
      });
      return;
    }
    const message = buildBookingMessage(details);
    const wa = whatsappHref(message);
    if (wa) {
      window.open(wa, '_blank', 'noopener,noreferrer');
      setStatus({ kind: 'sent', channel: 'whatsapp' });
      return;
    }
    const mail = mailHref(`Demande de trajet — ${siteConfig.brandName}`, message);
    if (mail) {
      window.open(mail, '_self');
      setStatus({ kind: 'sent', channel: 'email' });
      return;
    }
    setStatus({
      kind: 'error',
      message:
        'Coordonnées de contact non configurées : renseignez-les dans src/config/site-config.ts.',
    });
  };

  const emailFallback = mailHref(
    `Demande de trajet — ${siteConfig.brandName}`,
    buildBookingMessage(details),
  );

  return (
    <section
      id="demande"
      aria-label="Demande de trajet"
      className="relative z-20 -mt-24 scroll-mt-24 px-5 sm:px-6 md:-mt-28 lg:px-10"
    >
      <Reveal y={36}>
        <motion.form
          noValidate
          onSubmit={handleSubmit}
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, ease: EASE }}
          className="mx-auto max-w-6xl border border-ink/10 bg-blanc shadow-[0_44px_90px_-38px_rgba(13,13,12,0.5)]"
        >
          {/* En-tête du module */}
          <div className="flex items-baseline justify-between gap-4 border-b border-ink/10 px-6 py-4">
            <p className="label-xs text-bronze-deep">Demande de trajet</p>
            <p className="hidden text-xs font-light text-ink/60 md:block">
              Réponse par WhatsApp ou par téléphone
            </p>
          </div>

          {/* Champs du trajet */}
          <div className="grid gap-px bg-ink/10 md:grid-cols-2 xl:grid-cols-[1.15fr_1.15fr_0.85fr_0.7fr_0.95fr_auto]">
            <div className={fieldShell}>
              <label htmlFor="depart" className={labelText}>
                Départ
              </label>
              <input
                id="depart"
                name="depart"
                type="text"
                autoComplete="off"
                placeholder="Adresse, hôtel, gare…"
                value={depart}
                onChange={(e) => setDepart(e.target.value)}
                className={inputText}
                required
              />
              <span aria-hidden className={underline} />
            </div>

            <div className={fieldShell}>
              <label htmlFor="destination" className={labelText}>
                Destination
              </label>
              <input
                id="destination"
                name="destination"
                type="text"
                autoComplete="off"
                placeholder="Adresse, aéroport, gare…"
                value={destination}
                onChange={(e) => setDestination(e.target.value)}
                className={inputText}
                required
              />
              <span aria-hidden className={underline} />
            </div>

            <div className={fieldShell}>
              <label htmlFor="date" className={labelText}>
                Date
              </label>
              <input
                id="date"
                name="date"
                type="date"
                min={today}
                value={date}
                onChange={(e) => setDate(e.target.value)}
                className={inputText}
                required
              />
              <span aria-hidden className={underline} />
            </div>

            <div className={fieldShell}>
              <label htmlFor="heure" className={labelText}>
                Heure
              </label>
              <input
                id="heure"
                name="heure"
                type="time"
                value={heure}
                onChange={(e) => setHeure(e.target.value)}
                className={inputText}
                required
              />
              <span aria-hidden className={underline} />
            </div>

            <div className={fieldShell}>
              <label htmlFor="passagers" className={labelText}>
                Passagers
              </label>
              <select
                id="passagers"
                name="passagers"
                value={passagers}
                onChange={(e) => setPassagers(e.target.value)}
                className={`${inputText} select-field cursor-pointer`}
              >
                {['1', '2', '3', '4', '5', '6', '7'].map((n) => (
                  <option key={n} value={n}>
                    {n} {n === '1' ? 'passager' : 'passagers'}
                  </option>
                ))}
                <option value="8 et plus">8 et plus</option>
              </select>
              <span aria-hidden className={underline} />
            </div>

            <div className="flex items-stretch bg-blanc p-4 md:col-span-2 xl:col-span-1">
              <button
                type="submit"
                className="label-xs inline-flex min-h-[48px] w-full items-center justify-center gap-2.5 rounded-full bg-ink px-7 text-ivory transition-all duration-500 hover:-translate-y-0.5 hover:shadow-[0_16px_32px_-14px_rgba(17,17,17,0.55)] lg:w-auto lg:whitespace-nowrap"
              >
                Demander ce trajet
                <ArrowRight size={14} strokeWidth={1.6} aria-hidden />
              </button>
            </div>
          </div>

          {/* Coordonnées & précisions — facultatives */}
          <div className="grid gap-px border-t border-ink/10 bg-ink/10 md:grid-cols-3">
            <div className={fieldShell}>
              <label htmlFor="nom" className={labelText}>
                Nom <span className="normal-case tracking-normal text-ink/45">(facultatif)</span>
              </label>
              <input
                id="nom"
                name="nom"
                type="text"
                autoComplete="name"
                placeholder="Votre nom"
                value={nom}
                onChange={(e) => setNom(e.target.value)}
                className={inputText}
              />
              <span aria-hidden className={underline} />
            </div>
            <div className={fieldShell}>
              <label htmlFor="telephone" className={labelText}>
                Téléphone <span className="normal-case tracking-normal text-ink/45">(facultatif)</span>
              </label>
              <input
                id="telephone"
                name="telephone"
                type="tel"
                autoComplete="tel"
                placeholder="Pour être rappelé·e"
                value={telephone}
                onChange={(e) => setTelephone(e.target.value)}
                className={inputText}
              />
              <span aria-hidden className={underline} />
            </div>
            <div className={`${fieldShell} md:col-span-1`}>
              <label htmlFor="informations" className={labelText}>
                Informations <span className="normal-case tracking-normal text-ink/45">(facultatif)</span>
              </label>
              <input
                id="informations"
                name="informations"
                type="text"
                autoComplete="off"
                placeholder="Bagages, siège enfant, adresse précise…"
                value={informations}
                onChange={(e) => setInformations(e.target.value)}
                className={inputText}
              />
              <span aria-hidden className={underline} />
            </div>
          </div>

          {/* Retour utilisateur */}
          <div aria-live="polite" className="min-h-[1.25rem] px-6 pb-4 pt-3 text-[13px]">
            {status.kind === 'error' && <p className="text-terre">{status.message}</p>}
            {status.kind === 'sent' && status.channel === 'whatsapp' && (
              <p className="text-ink/65">
                Votre message est prêt dans WhatsApp — confirmez l’envoi pour nous le transmettre.{' '}
                {emailFallback && (
                  <a
                    href={emailFallback}
                    className="underline decoration-bronze/60 underline-offset-4 transition-colors hover:text-bronze-deep"
                  >
                    Ou par e-mail
                  </a>
                )}
              </p>
            )}
            {status.kind === 'sent' && status.channel === 'email' && (
              <p className="text-ink/65">
                Votre message est prêt dans votre messagerie — envoyez-le pour nous le transmettre.
              </p>
            )}
          </div>
        </motion.form>
      </Reveal>
    </section>
  );
}
