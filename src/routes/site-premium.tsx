import { createFileRoute } from "@tanstack/react-router";
import premiumCss from "@/premium.css?url";
import { SiteChrome } from "@/components/SiteChrome";
import { HeroPremium } from "@/components/premium/HeroPremium";
import { ScenePremium } from "@/components/premium/ScenePremium";
import { MosaiquePremium } from "@/components/premium/MosaiquePremium";
import { BasculePremium } from "@/components/premium/BasculePremium";
import { MethodePremium } from "@/components/premium/MethodePremium";
import { PreuvePremium } from "@/components/premium/PreuvePremium";
import { TarifPremium } from "@/components/premium/TarifPremium";
import { FaqPremium } from "@/components/premium/FaqPremium";
import { AppelPremium } from "@/components/premium/AppelPremium";
import { BarreAppelMobile } from "@/components/premium/BarreAppelMobile";
import { BASE_URL } from "@/lib/sitemap";
import { FAQ_PREMIUM, MEDIA_EFFET, PREMIUM_PUBLIE } from "@/data/premium";
import { offre, prixCourt } from "@/data/offres";

/**
 * Sitaly Premium (23 octobre 2026) : la page est elle-même la démonstration.
 * Un cadre collé montre un site inventé qui change de métier au défilement,
 * puis la page passe à la bascule, à la méthode, à la preuve et au tarif.
 * Spécification : DESIGN.md §12. Texte et réglages : src/data/premium.ts.
 *
 * Tant que PREMIUM_PUBLIE vaut false, la page est en noindex, hors menu et
 * hors sitemap ; vite.config.ts la prérend pour qu'on la relise à son adresse.
 */

const PREMIUM = offre("site-premium");
const URL = `${BASE_URL}/site-premium/`;
const TITRE = `Site internet sur mesure ${prixCourt(PREMIUM)} | Sitaly Premium`;
const DESCRIPTION = `Un site internet sur mesure, dessiné pour votre métier : direction artistique, textes, animations et code. ${prixCourt(PREMIUM).replace(/^dès/, "Dès")} en trois acomptes, et le site vous appartient.`;

/* Pose la classe du mode effet avant le premier affichage : sans elle, la
   page s'afficherait en galerie puis sauterait. Si le pilote n'a pas répondu
   six secondes après le chargement (script bloqué, erreur), la galerie
   revient. */
const SCRIPT_EFFET = `(function(){try{var h=document.documentElement;if(matchMedia(${JSON.stringify(
  MEDIA_EFFET,
)}).matches){h.classList.add("premium-effet");addEventListener("load",function(){setTimeout(function(){if(!window.__premiumScene)h.classList.remove("premium-effet")},6000)})}}catch(e){}})();`;

export const Route = createFileRoute("/site-premium")({
  head: () => ({
    meta: [
      { title: TITRE },
      { name: "description", content: DESCRIPTION },
      ...(PREMIUM_PUBLIE ? [] : [{ name: "robots", content: "noindex, follow" }]),
      { property: "og:title", content: TITRE },
      { property: "og:description", content: DESCRIPTION },
      { property: "og:url", content: URL },
    ],
    links: [
      { rel: "canonical", href: URL },
      { rel: "stylesheet", href: premiumCss },
    ],
    scripts: [
      { children: SCRIPT_EFFET },
      {
        type: "application/ld+json",
        children: JSON.stringify({
          "@context": "https://schema.org",
          "@type": "Service",
          name: PREMIUM.nom,
          serviceType: "Création de site internet sur mesure",
          description: PREMIUM.pour,
          url: URL,
          provider: { "@type": "Organization", name: "Sitaly", url: BASE_URL },
          areaServed: "FR",
          offers: {
            "@type": "Offer",
            priceCurrency: "EUR",
            priceSpecification: {
              "@type": "PriceSpecification",
              minPrice: PREMIUM.depart,
              priceCurrency: "EUR",
            },
          },
        }),
      },
      {
        type: "application/ld+json",
        children: JSON.stringify({
          "@context": "https://schema.org",
          "@type": "FAQPage",
          mainEntity: FAQ_PREMIUM.map((f) => ({
            "@type": "Question",
            name: f.q,
            acceptedAnswer: { "@type": "Answer", text: f.a },
          })),
        }),
      },
      {
        type: "application/ld+json",
        children: JSON.stringify({
          "@context": "https://schema.org",
          "@type": "BreadcrumbList",
          itemListElement: [
            { "@type": "ListItem", position: 1, name: "Accueil", item: `${BASE_URL}/` },
            { "@type": "ListItem", position: 2, name: "Tarifs", item: `${BASE_URL}/tarifs/` },
            { "@type": "ListItem", position: 3, name: PREMIUM.nom, item: URL },
          ],
        }),
      },
    ],
  }),
  component: SitePremium,
});

function SitePremium() {
  return (
    <div className="min-h-screen bg-background text-foreground">
      <SiteChrome appel={{ label: "Présenter mon projet", offre: "site-premium" }}>
        <a href="#tarif" className="premium-eviter">
          Passer la démonstration et voir le tarif
        </a>
        <main>
          <HeroPremium />
          <ScenePremium />
          <MosaiquePremium />
          <BasculePremium />
          <MethodePremium />
          <PreuvePremium />
          <TarifPremium />
          <FaqPremium />
          <AppelPremium />
        </main>
        <BarreAppelMobile />
      </SiteChrome>
    </div>
  );
}
