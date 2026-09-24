# Direction artistique — Gustave

Référence rapide de l'identité visuelle. **Toute évolution du site doit
respecter ces règles** ; le détail vivant est dans le code (`src/app/globals.css`,
`src/config/site-config.ts`).

## Palette

| Rôle              | Valeur    | Usage                                             |
| ----------------- | --------- | ------------------------------------------------- |
| Ivoire (fond)     | `#F3F0EA` | Fond principal des sections claires               |
| Noir profond      | `#151515` | Sections sombres, panneaux, barre mobile          |
| Noir d'encre      | `#111111` | Texte principal, boutons pleins sur fond clair    |
| Bronze            | `#A88C62` | Filets, numéros, icônes, hover — jamais en aplats |
| Bronze clair      | `#C9B48E` | Accents sur fonds sombres                         |
| Bronze profond    | `#7A6142` | Petits textes & focus sur fond clair (contraste AA) |
| Pierre            | `#D8D0C3` | Détails, séparateurs secondaires                  |
| Blanc cassé       | `#FAFAF8` | Cartes, module de demande                         |

Le bronze ne devient jamais une couleur flashy : petites lignes, détails,
numéros, survols uniquement.

## Typographies

- **Bodoni Moda** (serif à fort contraste) : titres, chiffres, citations,
  wordmark. Italique pour les accents éditoriaux.
- **Jost** (sans-serif géométrique d'esprit français) : navigation, boutons,
  paragraphes, libellés en petites capitales espacées (`label-xs`).

## Principes de composition

- Grilles éditoriales asymétriques, filets hairline (1 px, encre/ivoire à
  faible opacité) plutôt que des cartes arrondies.
- Sections alternées clair / sombre pour le rythme de page.
- Photographie cinématographique : Paris tôt le matin ou au crépuscule,
  lumière chaude, reflets, jamais de cliché touristique centré.
- Grain cinématographique fixe très léger ; Ken Burns lent du hero ;
  révélations de texte masquées ligne à ligne ; aucune animation agressive.
- `prefers-reduced-motion` respecté : le site reste complet sans animation.

## Interdits (anti-template)

Pas de dégradés violets/bleus SaaS, pas d'icônes géantes, pas de fausses
statistiques, pas de faux avis, pas de copie du look Uber/VTC low-cost,
pas d'informations commerciales inventées.
