# Checklist de mise en ligne — Gustave

À parcourir dans l'ordre avant toute ouverture au public.
Tant que cette checklist n'est pas complète, le site reste en mode
« placeholders sûrs » : aucun lien mort, aucune information inventée.

## 1. Coordonnées (`src/config/site-config.ts`)

- [ ] `phone` — format d'appel, ex. `+33612345678`
- [ ] `phoneDisplay` — format affiché, ex. `06 12 34 56 78`
- [ ] `whatsapp` — format international sans `+`, ex. `33612345678`
- [ ] `email`
- [ ] `openingHours` — ex. `7j/7, 24h/24` (uniquement si exact)
- [ ] `location.address`
- [ ] `availabilityBadge` — laisser `undefined` sauf si le service est
      réellement disponible 7j/7
- [ ] `siteUrl` — domaine définitif (sinon l'URL Vercel est utilisée)

Vérification automatique : `npm test` (tests unitaires des liens) puis
`node tests/e2e/contacts.mjs` après un build avec les vraies valeurs
(le script ouvre réellement une popup WhatsApp de test).

## 2. Juridique

- [ ] `/mentions-legales` : raison sociale, forme juridique, capital, RCS,
      SIRET, TVA, directeur de publication, hébergeur — faire relire par
      un professionnel du droit.
- [ ] `/confidentialite` : confirmer l'absence de cookies/analytics ou
      documenter l'outil ajouté + mécanisme de consentement.

## 3. Marque & médias

- [ ] Remplacer les photographies d'illustration (`public/images/`,
      mêmes noms de fichiers) par les visuels officiels.
- [ ] Favicon définitif : `app/icon.svg` + `app/apple-icon.png`.
- [ ] Image Open Graph : `public/images/og.jpg` (1200×630).
- [ ] Si le nom de marque change : `brandName` / `brandSuffix` dans
      `site-config.ts` (tout le site suit, y compris le JSON-LD).

## 4. Technique

- [ ] `npm run lint` · `npm run typecheck` · `npm test` · `npm run build`
- [ ] `npm run export:static` si déploiement statique (rezipper `out/`)
- [ ] Pousser sur GitHub → vérifier le déploiement Vercel de preview
- [ ] Connecter le domaine personnalisé (Vercel → Domains) puis
      renseigner `siteUrl`

## 5. Après mise en ligne

- [ ] Tester appel / WhatsApp / demande de trajet depuis un vrai mobile
- [ ] Vérifier la fiche d'identité Google (JSON-LD) avec l'outil de test
      des données structurées
- [ ] Contrôler l'aperçu Open Graph (partage sur WhatsApp/iMessage)
