# Gustave

Landing page premium pour un service de taxi à Paris & Île-de-France.
Frontend uniquement : pas de backend, pas de base de données, pas de paiement.
Objectif business : transformer les visiteurs en prises de contact
(appel téléphonique, WhatsApp, demande de trajet, e-mail).

Stack : **Next.js 15 (App Router) · TypeScript · Tailwind CSS v4 · Framer Motion · Lucide**.

---

## Installation

```bash
npm install
```

## Développement local

```bash
npm run dev        # http://localhost:3000
```

## Build production

```bash
npm run build      # build de production
npm run start      # sert le build localement
npm run lint       # ESLint
npm run typecheck  # tsc --noEmit
```

## Configuration

**Tout se pilote depuis un fichier unique : `src/config/site-config.ts`.**

| Information   | Clé dans `site-config.ts`                          |
| ------------- | -------------------------------------------------- |
| Nom de marque | `brandName` (+ `brandSuffix`, `tagline`)           |
| Téléphone     | `phone` (format d'appel) + `phoneDisplay` (affiché) |
| WhatsApp      | `whatsapp` (format international : `33612345678`)  |
| Email         | `email`                                            |
| Horaires      | `openingHours`                                     |
| Localisation  | `location.address`, `location.city`, `location.zone` |
| Domaine       | `siteUrl`                                          |
| Services      | `services`                                         |
| Aéroports     | `airports`                                         |
| Gares         | `stations`                                         |
| Navigation    | `navigation`                                       |
| Engagements   | `commitments`                                      |
| Textes hero / CTA final | `hero`, `finalCta`                        |

Comportement des **placeholders** (`[ ... À REMPLACER ]`) tant qu'ils ne sont
pas remplacés :

- les liens `tel:`, `wa.me/…`, `mailto:` sont désactivés proprement
  (rendus comme texte inerte — jamais de lien mort) ;
- le module « Demande de trajet » bascule sur e-mail si WhatsApp n'est pas
  renseigné, et affiche un message clair si rien ne l'est ;
- le JSON-LD n'expose que les champs réellement renseignés (aucune donnée
  inventée : pas d'avis, pas de note, pas de statistique) ;
- le sitemap et l'URL Open Graph utilisent automatiquement l'URL Vercel
  (`*.vercel.app`) si `siteUrl` est encore un placeholder.

### Disponibilité « 7j/7 »

`availabilityBadge` est `undefined` par défaut : le hero affiche alors un
message neutre et vrai (« Prise en charge sur demande »).
Ne renseignez `availabilityBadge: 'Disponible 7j/7'` **que si c'est exact**.

## Informations à personnaliser avant mise en ligne

1. `phone`, `phoneDisplay`, `whatsapp`, `email`, `openingHours`,
   `location.address`, `siteUrl` dans `src/config/site-config.ts`.
2. Pages `/mentions-legales` et `/confidentialite` : remplacer les placeholders
   juridiques (`[RAISON SOCIALE…]`, `[SIREN/SIRET…]`, `[HÉBERGEUR…]`…) puis les
   faire relire par un professionnel du droit.
3. Remplacer les photographies d'illustration (`public/images/`, mêmes noms de
   fichiers) par les visuels officiels de la marque.
4. Favicon définitif : remplacer `src/app/icon.svg` (+ `apple-icon.png`).

## Cookies & mesure d'audience

Le site ne dépose **aucun cookie** et n'embarque **aucun outil analytics ou
publicitaire** : aucun bandeau de consentement n'est nécessaire en l'état.
Si un outil de mesure d'audience est ajouté plus tard, mettre à jour la page
`/confidentialite` et ajouter le mécanisme de consentement correspondant.

## Export statique — le « fichier » à déployer partout

En plus du mode natif, le projet peut produire **un site 100 % statique**
(dossier `out/`, zippable) déployable sans Node.js ni configuration :

```bash
npm run export:static     # génère out/ (HTML, CSS, JS, images, robots, sitemap)
```

- `out/` se dépose tel quel sur : **Netlify Drop** (glisser-déposer du zip ou
  du dossier), **Cloudflare Pages** (upload direct), **GitHub Pages**,
  un hébergement mutualisé (FTP vers `www/`/`public_html/`), ou
  `npx vercel deploy out` ;
- URLs en `/dossier/` : fonctionne même sur Apache sans rewrite ;
- aucune fonctionnalité serveur n'est perdue : la landing est entièrement
  statique (le module de demande ouvre WhatsApp/e-mail côté visiteur) ;
- pour régénérer le zip après modification : relancer `npm run export:static`
  puis zipper le contenu de `out/` ;
- `export:static` efface `.next` en fin de script (les deux modes partagent
  des manifestes de build) : pour resservir le site en mode natif ensuite,
  relancer simplement `npm run build`.

Le mode natif (`npm run build` + Vercel) reste recommandé pour un domaine
personnel et les futures évolutions ; les deux modes partagent le même code.

## Variables d'environnement

**Aucune variable d'environnement obligatoire pour la landing page actuelle.**
(Aucune clé API, aucun secret : le site est 100 % statique côté serveur.
Vercel injecte automatiquement `VERCEL_URL`, utilisé comme URL de repli pour
le sitemap / Open Graph tant que `siteUrl` n'est pas renseigné.)

## Déploiement Vercel

1. Pousser ce repository sur GitHub.
2. Vercel → **Add New… → Project** → importer le repository.
3. Vercel détecte automatiquement **Next.js** : aucune configuration
   supplémentaire, pas de `vercel.json` nécessaire.
4. **Deploy** : le site est en ligne sur `*.vercel.app`.
5. Plus tard : connecter le domaine personnalisé dans Vercel → Domains,
   puis renseigner `siteUrl` dans `src/config/site-config.ts`.

## Structure du projet

```
├── next.config.ts               # mode natif + mode export statique (STATIC_EXPORT=1)
├── vitest.config.mts            # tests unitaires (alias @ → src/)
├── package.json / package-lock.json
├── README.md · .editorconfig · .gitignore · .vercelignore
├── docs/                        # documentation projet
│   ├── DIRECTION-ARTISTIQUE.md  # palette, typos, principes, interdits
│   ├── CHECKLIST-MISE-EN-LIGNE.md
│   └── DEPLOIEMENT.md           # GitHub→Vercel, export statique, Vercel CLI
├── tests/
│   ├── unit/links.test.ts       # 17 tests : tel:, wa.me:, mailto:, message, URL
│   └── e2e/*.mjs                # Playwright : largeurs, routes, contacts, captures
├── public/images/               # photographies optimisées
├── app/                         # routes Next.js (App Router)
│   ├── layout.tsx               # polices (Bodoni Moda + Jost), metadata, Open Graph
│   ├── page.tsx                 # landing + JSON-LD LocalBusiness / TaxiService
│   ├── not-found.tsx · error.tsx
│   ├── icon.svg · apple-icon.png
│   ├── sitemap.ts · robots.ts
│   ├── mentions-legales/ · confidentialite/
│   └── globals.css              # design tokens (palette, grain, keyframes)
└── src/
    ├── config/site-config.ts    # ← TOUTE la configuration commerciale
    ├── lib/links.ts · motion.ts # liens + placeholders ; courbes d'animation
    └── components/
        ├── layout/              # Header, MobileMenu, Footer, LegalLayout
        ├── sections/            # Hero, BookingRequest, Services, ParisCoverage,
        │                        # AirportStationSection, WhyGustave, Story,
        │                        # ContactSection, FinalCta
        ├── floating/            # WhatsAppButton, MobileContactBar
        └── ui/                  # Button, SmartLink, SectionTitle, Reveal, Brand, WhatsAppIcon
```

Commandes : `npm run dev` · `npm run build` · `npm run start` · `npm run lint` ·
`npm run typecheck` · `npm test` (unitaires) · `npm run export:static` (zip déployable).

## Module « Demande de trajet »

Le formulaire (départ, destination, date, heure, passagers + nom, téléphone et
précisions facultatifs) **prépare un message structuré** puis ouvre WhatsApp
avec ce message prérempli ; repli automatique sur e-mail si le numéro WhatsApp
n'est pas configuré. Rien n'est stocké ni envoyé par le site : c'est le
visiteur qui confirme l'envoi dans son application. Aucune base de données
n'est nécessaire pour cette V1.

## Direction artistique

Palette ivoire `#F3F0EA` / noir `#151515` / bronze `#A88C62` (filets, numéros,
icônes, hover) / pierre `#D8D0C3` / blanc `#FAFAF8` ; bronze assombri
`#7A6142` pour les petits textes sur fond clair (contraste AA).
Typographies : Bodoni Moda (serif éditoriale) + Jost (sans-serif française).
Grain cinématographique, Ken Burns lent du hero, révélations masquées,
plan de Paris dessiné en SVG animé, aperçu photo suivant le curseur
(index des services, desktop), `prefers-reduced-motion` respecté.

## Qualité & tests

- Build production : ✓ sans erreur · ESLint : ✓ · `tsc --noEmit` : ✓
- Responsive validé de 320 px à 1920 px : aucun débordement horizontal.
- Console navigateur : aucune erreur sur `/`, `/mentions-legales`,
  `/confidentialite` et sur la 404.
- Chaînes `tel:` / `wa.me:` / `mailto:` et message WhatsApp structuré
  vérifiés par script (voir `scripts/contacts.mjs`).
- Accessibilité : H1 unique, hiérarchie H2/H3, labels de formulaires,
  focus visible, aria-labels, cibles tactiles ≥ 44 px, safe-area iPhone.
"# gustave" 
