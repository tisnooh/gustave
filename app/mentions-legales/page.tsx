import type { Metadata } from 'next';
import { siteConfig } from '@/config/site-config';
import { LegalLayout, LegalSection, Placeholder } from '@/components/layout/LegalLayout';
import { Footer } from '@/components/layout/Footer';
import { Header } from '@/components/layout/Header';

export const metadata: Metadata = {
  title: 'Mentions légales',
  robots: { index: false, follow: true },
};

export default function MentionsLegales() {
  return (
    <>
      <Header />
      <LegalLayout title="Mentions légales" updated="[DATE À REMPLACER]">
        <p className="border-l border-bronze/50 pl-4 text-[13px] italic text-ink/60">
          Page provisoire : les éléments entre crochets sont à compléter avant la mise
          en ligne, puis à faire relire par un professionnel du droit.
        </p>

        <LegalSection heading="Éditeur du site">
          <p>
            Le présent site est édité par <Placeholder>RAISON SOCIALE À REMPLACER</Placeholder>,{' '}
            <Placeholder>FORME JURIDIQUE</Placeholder> au capital de{' '}
            <Placeholder>MONTANT DU CAPITAL</Placeholder>, dont le siège social est situé{' '}
            <Placeholder>ADRESSE À REMPLACER</Placeholder>, immatriculée au RCS de{' '}
            <Placeholder>VILLE</Placeholder> sous le numéro <Placeholder>NUMÉRO RCS</Placeholder>,
            SIRET <Placeholder>NUMÉRO SIRET</Placeholder>, TVA intracommunautaire{' '}
            <Placeholder>NUMÉRO TVA</Placeholder>.
          </p>
          <p>
            Directeur de la publication : <Placeholder>NOM À REMPLACER</Placeholder>.
          </p>
          <p>
            Contact : {siteConfig.phoneDisplay} — {siteConfig.email}.
          </p>
        </LegalSection>

        <LegalSection heading="Hébergement">
          <p>
            Le site est hébergé par <Placeholder>HÉBERGEUR À REMPLACER</Placeholder>,{' '}
            <Placeholder>ADRESSE DE L’HÉBERGEUR</Placeholder>.
          </p>
        </LegalSection>

        <LegalSection heading="Propriété intellectuelle">
          <p>
            L’ensemble des contenus de ce site (textes, identité visuelle, photographies,
            éléments graphiques) est la propriété exclusive de l’éditeur, sauf mention
            contraire. Toute reproduction ou représentation, totale ou partielle, sans
            autorisation écrite préalable est interdite.
          </p>
        </LegalSection>

        <LegalSection heading="Crédits photographiques">
          <p>
            Photographies d’illustration en attente des visuels officiels de la marque —{' '}
            <Placeholder>CRÉDITS À REMPLACER</Placeholder>.
          </p>
        </LegalSection>

        <LegalSection heading="Responsabilité">
          <p>
            Les informations présentées sur ce site le sont à titre indicatif. L’éditeur
            s’efforce de les tenir à jour mais ne saurait être tenu responsable des erreurs
            ou omissions indépendantes de sa volonté.
          </p>
        </LegalSection>
      </LegalLayout>
      <Footer />
    </>
  );
}
