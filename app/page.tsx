import { siteConfig } from '@/config/site-config';
import { isPlaceholder } from '@/lib/links';
import { Header } from '@/components/layout/Header';
import { Footer } from '@/components/layout/Footer';
import { Hero } from '@/components/sections/Hero';
import { BookingRequest } from '@/components/sections/BookingRequest';
import { Services } from '@/components/sections/Services';
import { ParisCoverage } from '@/components/sections/ParisCoverage';
import { AirportStationSection } from '@/components/sections/AirportStationSection';
import { WhyGustave } from '@/components/sections/WhyGustave';
import { Story } from '@/components/sections/Story';
import { ContactSection } from '@/components/sections/ContactSection';
import { FinalCta } from '@/components/sections/FinalCta';
import { WhatsAppButton } from '@/components/floating/WhatsAppButton';
import { MobileContactBar } from '@/components/floating/MobileContactBar';

export default function Home() {
  return (
    <>
      <Header />
      <main id="contenu">
        <Hero />
        <BookingRequest />
        <Services />
        <ParisCoverage />
        <AirportStationSection />
        <WhyGustave />
        <Story />
        <ContactSection />
        <FinalCta />
      </main>
      <Footer />
      <WhatsAppButton />
      <MobileContactBar />
      <JsonLd />
    </>
  );
}

/**
 * Données structurées LocalBusiness / TaxiService.
 * Seules les informations réellement renseignées dans
 * site-config.ts sont publiées (aucune donnée inventée).
 */
function JsonLd() {
  const ld: Record<string, unknown> = {
    '@context': 'https://schema.org',
    '@type': 'LocalBusiness',
    additionalType: 'https://schema.org/TaxiService',
    name: `${siteConfig.brandName} — Taxi Paris`,
    description:
      'Service de taxi à Paris et en Île-de-France : trajets dans Paris, transferts aéroports et gares, déplacements professionnels.',
    areaServed: { '@type': 'Area', name: siteConfig.location.zone },
    address: {
      '@type': 'PostalAddress',
      addressLocality: 'Paris',
      addressCountry: 'FR',
    },
  };

  if (!isPlaceholder(siteConfig.phone)) ld.telephone = siteConfig.phone;
  if (!isPlaceholder(siteConfig.email)) ld.email = siteConfig.email;
  if (!isPlaceholder(siteConfig.siteUrl)) ld.url = siteConfig.siteUrl;
  if (!isPlaceholder(siteConfig.location.address)) {
    ld.address = {
      '@type': 'PostalAddress',
      streetAddress: siteConfig.location.address,
      addressLocality: 'Paris',
      addressCountry: 'FR',
    };
  }

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(ld) }}
    />
  );
}
