import { siteConfig } from '@/config/site-config';

/**
 * Une valeur est considérée comme placeholder tant qu'elle
 * contient des crochets (ex. « [NUMÉRO À REMPLACER] »).
 * Les liens correspondants sont alors désactivés proprement.
 */
export function isPlaceholder(value: string | undefined): boolean {
  if (!value) return true;
  const v = value.trim();
  return v.length === 0 || v.includes('[') || v.includes(']');
}

/**
 * URL publique effective du site :
 * 1. `siteUrl` si elle est renseignée dans site-config.ts ;
 * 2. sinon l'URL automatique Vercel (déploiements *.vercel.app) ;
 * 3. sinon undefined (développement local, sitemap non émis).
 * Aucune URL absolue n'est codée en dur : le domaine personnalisé
 * pourra être connecté plus tard sans modifier le code.
 */
export function effectiveSiteUrl(): string | undefined {
  if (!isPlaceholder(siteConfig.siteUrl)) return siteConfig.siteUrl;
  const vercel =
    process.env.VERCEL_PROJECT_PRODUCTION_URL || process.env.VERCEL_URL;
  if (vercel) return `https://${vercel}`;
  return undefined;
}

/** tel:+33612345678 — undefined si le numéro n'est pas encore renseigné */
export function telHref(phone: string = siteConfig.phone): string | undefined {
  if (isPlaceholder(phone)) return undefined;
  return `tel:${phone.replace(/[^+\d]/g, '')}`;
}

/** https://wa.me/33612345678?text=... — undefined si placeholder */
export function whatsappHref(
  message?: string,
  whatsapp: string = siteConfig.whatsapp,
): string | undefined {
  if (isPlaceholder(whatsapp)) return undefined;
  const digits = whatsapp.replace(/\D/g, '');
  if (!digits) return undefined;
  const base = `https://wa.me/${digits}`;
  return message ? `${base}?text=${encodeURIComponent(message)}` : base;
}

/** mailto:... — undefined si placeholder */
export function mailHref(
  subject?: string,
  body?: string,
  email: string = siteConfig.email,
): string | undefined {
  if (isPlaceholder(email)) return undefined;
  const params = new URLSearchParams();
  if (subject) params.set('subject', subject);
  if (body) params.set('body', body);
  const qs = params.toString();
  return `mailto:${email}${qs ? `?${qs}` : ''}`;
}

/** 2026-09-24 → 24/09/2026 ; toute valeur non ISO est retournée telle quelle */
export function formatFrenchDate(isoDate: string): string {
  if (!/^\d{4}-\d{2}-\d{2}$/.test(isoDate)) return isoDate;
  const [y, m, d] = isoDate.split('-');
  return `${d}/${m}/${y}`;
}

export type BookingDetails = {
  depart: string;
  destination: string;
  date: string;
  heure: string;
  passagers: string;
  nom?: string;
  telephone?: string;
  informations?: string;
};

/**
 * Message structuré préparé pour WhatsApp / e-mail.
 * Les champs facultatifs ne sont ajoutés que s'ils sont renseignés.
 */
export function buildBookingMessage(d: BookingDetails): string {
  const lines = [
    `Bonjour ${siteConfig.brandName},`,
    '',
    'Nouvelle demande de trajet :',
    '',
    `Départ : ${d.depart}`,
    `Destination : ${d.destination}`,
    `Date : ${formatFrenchDate(d.date)}`,
    `Heure : ${d.heure}`,
    `Passagers : ${d.passagers}`,
  ];
  if (d.nom?.trim()) lines.push(`Nom : ${d.nom.trim()}`);
  if (d.telephone?.trim()) lines.push(`Téléphone : ${d.telephone.trim()}`);
  if (d.informations?.trim()) lines.push(`Informations : ${d.informations.trim()}`);
  lines.push('', 'Pouvez-vous me confirmer votre disponibilité ?');
  return lines.join('\n');
}

/** Message WhatsApp par défaut (boutons « WhatsApp » génériques). */
export const defaultWhatsappMessage = [
  `Bonjour ${siteConfig.brandName},`,
  '',
  'Je souhaite réserver un trajet.',
  '',
  'Pouvez-vous me confirmer votre disponibilité ?',
].join('\n');
