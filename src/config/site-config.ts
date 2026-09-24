/**
 * ─────────────────────────────────────────────────────────────
 *  GUSTAVE — CONFIGURATION CENTRALE DU SITE
 *  Toutes les informations commerciales vivent ici.
 *  Modifiez ce fichier : chaque composant suit automatiquement.
 *
 *  Les valeurs entre crochets [ ... ] sont des placeholders :
 *  elles doivent être remplacées par les vraies informations
 *  avant la mise en ligne. Tant qu'elles restent en l'état :
 *  — les liens tel: / wa.me: / mailto: sont désactivés proprement ;
 *  — le JSON-LD n'expose que les champs réellement renseignés ;
 *  — le sitemap s'appuie sur l'URL Vercel automatique si présente.
 * ─────────────────────────────────────────────────────────────
 */

export type ServiceEntry = {
  id: string;
  number: string;
  title: string;
  description: string;
  image: string;
  imageAlt: string;
};

export type AirportEntry = { name: string; code: string };

export type Commitment = {
  icon: 'clock' | 'phone' | 'map' | 'gem';
  title: string;
  text: string;
};

export type MapPoint = {
  id: string;
  label: string;
  x: number;
  y: number;
  labelPosition: 'left' | 'right' | 'top' | 'bottom';
  /** Aéroports & gares lointaines : reliés par un trait pointillé */
  gateway?: boolean;
  leaderFrom?: { x: number; y: number };
};

export const siteConfig = {
  /* ── Identité ─────────────────────────────────────────── */
  brandName: 'Gustave',
  brandSuffix: 'Paris',
  tagline: 'Taxi · Paris & Île-de-France',
  footerNote: 'Site conçu pour une expérience rapide et directe.',

  /* ── Coordonnées (à remplacer) ────────────────────────── */
  /** Format d'appel, chiffres seuls. Ex réel : +33612345678 */
  phone: '[NUMÉRO À REMPLACER]',
  /** Format affiché à l'écran. Ex réel : 06 12 34 56 78 */
  phoneDisplay: '[NUMÉRO À REMPLACER]',
  /** WhatsApp : format international, chiffres uniquement. Ex réel : 33612345678 */
  whatsapp: '[NUMÉRO WHATSAPP À REMPLACER]',
  email: '[EMAIL À REMPLACER]',
  openingHours: '[HORAIRES À REMPLACER]',

  /* ── Localisation ─────────────────────────────────────── */
  location: {
    address: '[ADRESSE À REMPLACER]',
    city: 'Paris, France',
    zone: 'Paris & Île-de-France',
  },

  /* ── URL du site (SEO, sitemap, Open Graph) ─────────────
     Tant que cette valeur est un placeholder, le site utilise
     automatiquement l'URL Vercel (*.vercel.app) si disponible. */
  siteUrl: 'https://[DOMAINE-A-REMPLACER].fr',

  /* ── Disponibilité affichée dans le hero ─────────────────
     Ne renseigner cette valeur QUE si elle correspond
     réellement au service (ex. 'Disponible 7j/7').
     Sinon, le hero affiche un message neutre et vrai :
     « Prise en charge sur demande ».                      */
  availabilityBadge: undefined as string | undefined,

  /* ── Navigation principale ────────────────────────────── */
  navigation: [
    { label: 'Services', href: '#services' },
    { label: 'Destinations', href: '#destinations' },
    { label: 'À propos', href: '#a-propos' },
    { label: 'Contact', href: '#contact' },
  ],

  /* ── Hero ─────────────────────────────────────────────── */
  hero: {
    label: 'Taxi · Paris & Île-de-France',
    titleLine1: 'Paris,',
    titleLine2: 'sans détour.',
    subtitle:
      'Un service de taxi disponible pour vos trajets à Paris, transferts gares et aéroports, rendez-vous professionnels et déplacements sur demande.',
  },

  /* ── Services ────────────────────────────────────────── */
  services: [
    {
      id: 'trajets-paris',
      number: '01',
      title: 'Trajets Paris',
      description: 'Déplacements personnels ou professionnels dans Paris.',
      image: '/images/service-paris.jpg',
      imageAlt: 'Coin de rue parisien au petit matin, terrasse de café et façades haussmanniennes',
    },
    {
      id: 'aeroports',
      number: '02',
      title: 'Aéroports',
      description: 'Transferts vers Paris-Charles de Gaulle et Paris-Orly.',
      image: '/images/service-airport.jpg',
      imageAlt: 'Terminal d’aéroport au crépuscule, berline noire à quai',
    },
    {
      id: 'gares',
      number: '03',
      title: 'Gares',
      description:
        'Gare du Nord, Gare de Lyon, Montparnasse, Gare de l’Est, Saint-Lazare.',
      image: '/images/service-gare.jpg',
      imageAlt: 'Façade Beaux-Arts d’une grande gare parisienne et son horloge',
    },
    {
      id: 'longue-distance',
      number: '04',
      title: 'Longue distance',
      description: 'Trajets hors Paris et déplacements longue distance sur demande.',
      image: '/images/service-longue.jpg',
      imageAlt: 'Route française à l’aube, bordée d’arbres dans la brume',
    },
    {
      id: 'professionnels',
      number: '05',
      title: 'Professionnels',
      description: 'Rendez-vous, entreprises, hôtels, restaurants et événements.',
      image: '/images/service-pro.jpg',
      imageAlt: 'Entrée d’un hôtel parisien de nuit, porte éclairée de vert et de laiton',
    },
  ] as ServiceEntry[],

  /* ── Plan stylisé : quartiers & destinations ──────────── */
  mapPoints: [
    { id: 'defense', label: 'La Défense', x: 118, y: 238, labelPosition: 'top' },
    { id: 'champs', label: 'Champs-Élysées', x: 224, y: 286, labelPosition: 'left' },
    { id: 'opera', label: 'Opéra', x: 302, y: 246, labelPosition: 'top' },
    { id: 'marais', label: 'Le Marais', x: 354, y: 292, labelPosition: 'right' },
    { id: 'st-germain', label: 'Saint-Germain', x: 292, y: 352, labelPosition: 'left' },
    { id: 'montparnasse', label: 'Montparnasse', x: 252, y: 408, labelPosition: 'bottom' },
    {
      id: 'cdg',
      label: 'CDG',
      x: 508,
      y: 88,
      labelPosition: 'right',
      gateway: true,
      leaderFrom: { x: 434, y: 168 },
    },
    {
      id: 'orly',
      label: 'Orly',
      x: 352,
      y: 548,
      labelPosition: 'right',
      gateway: true,
      leaderFrom: { x: 330, y: 474 },
    },
  ] as MapPoint[],

  /* ── Aéroports & gares ────────────────────────────────── */
  airports: [
    { name: 'Paris-Charles de Gaulle', code: 'CDG' },
    { name: 'Paris-Orly', code: 'ORY' },
  ] as AirportEntry[],
  stations: [
    'Gare du Nord',
    'Gare de Lyon',
    'Gare Montparnasse',
    'Gare de l’Est',
    'Gare Saint-Lazare',
    'Gare d’Austerlitz',
  ],

  /* ── Engagements (textes éditables) ───────────────────── */
  commitments: [
    {
      icon: 'clock',
      title: 'Ponctualité',
      text: 'Un service organisé autour de votre horaire de prise en charge.',
    },
    {
      icon: 'phone',
      title: 'Contact direct',
      text: 'Appelez ou échangez directement via WhatsApp.',
    },
    {
      icon: 'map',
      title: 'Paris & alentours',
      text: 'Prises en charge à Paris et trajets vers l’Île-de-France.',
    },
    {
      icon: 'gem',
      title: 'Service professionnel',
      text: 'Une expérience simple, discrète et soignée.',
    },
  ] as Commitment[],

  /* ── CTA final ────────────────────────────────────────── */
  finalCta: {
    label: 'Un trajet ?',
    title: 'Gustave vous attend.',
    text: 'Indiquez votre départ et votre destination pour organiser votre prise en charge.',
  },

  /* ── Réseaux sociaux (vides pour l’instant) ───────────── */
  socials: [] as { label: string; href: string }[],
};

export type SiteConfig = typeof siteConfig;
