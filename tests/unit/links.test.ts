import { describe, expect, it, afterEach } from 'vitest';
import {
  buildBookingMessage,
  effectiveSiteUrl,
  formatFrenchDate,
  isPlaceholder,
  mailHref,
  telHref,
  whatsappHref,
} from '@/lib/links';

/**
 * Tests unitaires de la logique de conversion :
 * les liens tel: / wa.me: / mailto: et le message WhatsApp structuré
 * sont le cœur business du site — ils ne doivent jamais régresser.
 */

describe('isPlaceholder', () => {
  it('détecte les placeholders entre crochets', () => {
    expect(isPlaceholder('[NUMÉRO À REMPLACER]')).toBe(true);
    expect(isPlaceholder('')).toBe(true);
    expect(isPlaceholder(undefined)).toBe(true);
  });
  it('accepte les valeurs réelles', () => {
    expect(isPlaceholder('+33612345678')).toBe(false);
    expect(isPlaceholder('contact@gustave.fr')).toBe(false);
  });
});

describe('telHref', () => {
  it('retourne undefined tant que le numéro est un placeholder', () => {
    expect(telHref()).toBeUndefined();
  });
  it('normalise un numéro affiché en format tel: propre', () => {
    expect(telHref('+33 6 12 34 56 78')).toBe('tel:+33612345678');
    expect(telHref('06.12.34.56.78')).toBe('tel:0612345678');
  });
});

describe('whatsappHref', () => {
  it('retourne undefined tant que le numéro est un placeholder', () => {
    expect(whatsappHref('coucou')).toBeUndefined();
  });
  it('encode correctement le message prérempli', () => {
    const msg = 'Bonjour Gustave,\n\nDépart : Opéra';
    const href = whatsappHref(msg, '33600000000');
    expect(href).toBe(`https://wa.me/33600000000?text=${encodeURIComponent(msg)}`);
  });
  it('construit wa.me/<numéro>?text=…', () => {
    const href = whatsappHref('msg test', '33 6 00 00 00 00');
    expect(href?.startsWith('https://wa.me/33600000000?text=')).toBe(true);
    expect(decodeURIComponent(href?.split('?text=')[1] ?? '')).toBe('msg test');
  });
});

describe('mailHref', () => {
  it('retourne undefined tant que l’email est un placeholder', () => {
    expect(mailHref()).toBeUndefined();
  });
  it('assemble sujet et corps', () => {
    const href = mailHref('Sujet', 'Corps du message', 'contact@gustave.fr');
    expect(href).toBe('mailto:contact@gustave.fr?subject=Sujet&body=Corps+du+message');
  });
});

describe('formatFrenchDate', () => {
  it('convertit ISO → JJ/MM/AAAA', () => {
    expect(formatFrenchDate('2026-10-02')).toBe('02/10/2026');
  });
  it('tolère une valeur vide ou invalide', () => {
    expect(formatFrenchDate('')).toBe('');
    expect(formatFrenchDate('pas-une-date')).toBe('pas-une-date');
  });
});

describe('buildBookingMessage', () => {
  const base = {
    depart: 'Hôtel Lutetia',
    destination: 'CDG terminal 2E',
    date: '2026-10-02',
    heure: '06:30',
    passagers: '2',
  };

  it('suit exactement la structure commerciale attendue', () => {
    expect(buildBookingMessage(base)).toBe(
      [
        'Bonjour Gustave,',
        '',
        'Nouvelle demande de trajet :',
        '',
        'Départ : Hôtel Lutetia',
        'Destination : CDG terminal 2E',
        'Date : 02/10/2026',
        'Heure : 06:30',
        'Passagers : 2',
        '',
        'Pouvez-vous me confirmer votre disponibilité ?',
      ].join('\n'),
    );
  });

  it('n’ajoute les champs facultatifs que s’ils sont renseignés', () => {
    const sans = buildBookingMessage(base);
    expect(sans).not.toContain('Nom :');
    const avec = buildBookingMessage({
      ...base,
      nom: 'Camille',
      telephone: '06 98 76 54 32',
      informations: '2 valises',
    });
    expect(avec).toContain('Nom : Camille');
    expect(avec).toContain('Téléphone : 06 98 76 54 32');
    expect(avec).toContain('Informations : 2 valises');
  });

  it('ignore les champs facultatifs vides ou blancs', () => {
    const msg = buildBookingMessage({ ...base, nom: '   ' });
    expect(msg).not.toContain('Nom :');
  });
});

describe('effectiveSiteUrl', () => {
  afterEach(() => {
    delete process.env.VERCEL_URL;
    delete process.env.VERCEL_PROJECT_PRODUCTION_URL;
  });

  it('retourne undefined en local tant que siteUrl est un placeholder', () => {
    expect(effectiveSiteUrl()).toBeUndefined();
  });

  it('bascule sur l’URL Vercel automatique si présente', () => {
    process.env.VERCEL_URL = 'gustave-abc123.vercel.app';
    expect(effectiveSiteUrl()).toBe('https://gustave-abc123.vercel.app');
  });

  it('préfère l’URL de production Vercel', () => {
    process.env.VERCEL_URL = 'gustave-abc123.vercel.app';
    process.env.VERCEL_PROJECT_PRODUCTION_URL = 'gustave-prod.vercel.app';
    expect(effectiveSiteUrl()).toBe('https://gustave-prod.vercel.app');
  });
});
