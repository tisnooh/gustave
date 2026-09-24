import type { Metadata } from 'next';
import { LegalLayout, LegalSection, Placeholder } from '@/components/layout/LegalLayout';
import { Footer } from '@/components/layout/Footer';
import { Header } from '@/components/layout/Header';

export const metadata: Metadata = {
  title: 'Politique de confidentialité',
  robots: { index: false, follow: true },
};

export default function Confidentialite() {
  return (
    <>
      <Header />
      <LegalLayout title="Politique de confidentialité" updated="[DATE À REMPLACER]">
        <p className="border-l border-bronze/50 pl-4 text-[13px] italic text-ink/60">
          Page provisoire : à compléter selon les traitements réellement mis en œuvre,
          puis à faire relire par un professionnel du droit.
        </p>

        <LegalSection heading="Principe">
          <p>
            Ce site est une page de présentation et de contact. Il ne comporte ni compte
            utilisateur, ni paiement en ligne, ni base de données clients : aucune donnée
            n’est enregistrée par le site lui-même.
          </p>
        </LegalSection>

        <LegalSection heading="Données transmises volontairement">
          <p>
            Lorsque vous appelez, écrivez sur WhatsApp ou envoyez un e-mail, les
            informations que vous choisissez de partager (nom, numéro, détails de trajet)
            sont transmises directement au service via ces canaux. Elles ne sont utilisées
            que pour répondre à votre demande et organiser votre prise en charge.
          </p>
          <p>
            Le module « Demande de trajet » prépare uniquement un message dans votre
            propre application de messagerie : rien n’est stocké ni envoyé par le site.
          </p>
        </LegalSection>

        <LegalSection heading="Cookies & mesure d’audience">
          <p>
            Ce site ne dépose aucun cookie publicitaire et n’utilise aucun outil de mesure
            d’audience. <Placeholder>À CONFIRMER SI UN OUTIL D’ANALYSE EST AJOUTÉ</Placeholder>
          </p>
        </LegalSection>

        <LegalSection heading="Vos droits">
          <p>
            Conformément au Règlement général sur la protection des données (RGPD), vous
            disposez d’un droit d’accès, de rectification, d’effacement et d’opposition sur
            vos données. Pour l’exercer : <Placeholder>EMAIL À REMPLACER</Placeholder>.
          </p>
          <p>
            Vous pouvez également saisir la Commission nationale de l’informatique et des
            libertés (CNIL) — cnil.fr.
          </p>
        </LegalSection>
      </LegalLayout>
      <Footer />
    </>
  );
}
