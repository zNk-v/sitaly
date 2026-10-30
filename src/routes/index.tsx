import { createFileRoute } from "@tanstack/react-router";
import { SiteHeader } from "@/components/SiteHeader";
import { SiteFooter } from "@/components/SiteFooter";
import {
  BoiteApp,
  Confiance,
  Faq,
  FAQ_PRODUIT,
  GrilleTarifs,
  TEXTE_GRIS,
  TitreSection,
} from "@/components/produit/Produit";
import {
  BarreCollante,
  Carrousel,
  Conversation,
  Familles,
  GrilleFonctions,
  OutilsRemplaces,
} from "@/components/produit/Vitrine";
import { CREATEUR_IA as IA } from "@/data/offres";

/**
 * L'accueil de sitaly.fr (30 octobre 2026) : la vitrine de Sitaly App.
 *
 * Deuxième version, le jour même, après l'étude de durable.com demandée par
 * Teddy : des métiers en action en grand (photos créées par l'IA, le site
 * généré en surimpression), la barre IA qui suit le visiteur, des fonctions
 * qui s'animent, une conversation avec l'IA qui retouche un site sous nos
 * yeux, et les outils qu'un abonnement remplace. Les blocs vivent dans
 * src/components/produit/ ; l'allure suit DESIGN.md §13.
 */

const TITRE = "Sitaly : créez votre site internet avec l'IA, en une minute";
const DESCRIPTION = `Décrivez votre activité en une phrase : l'IA de Sitaly écrit votre site, crée vos photos et le met en ligne. Gratuit pour commencer, puis dès ${IA.essentiel.mensuel} €/mois.`;

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: TITRE },
      { name: "description", content: DESCRIPTION },
      { name: "robots", content: "index, follow, max-snippet:-1, max-image-preview:large" },
      { property: "og:title", content: TITRE },
      { property: "og:description", content: DESCRIPTION },
      { property: "og:url", content: "https://sitaly.fr/" },
      { property: "og:image", content: "https://sitaly.fr/vitrine/metiers/fleuriste-1536.webp" },
    ],
    links: [
      { rel: "canonical", href: "https://sitaly.fr/" },
      {
        rel: "preload",
        as: "image",
        href: "/vitrine/metiers/fleuriste-1536.webp",
        media: "(min-width: 641px)",
      },
    ],
    scripts: [
      {
        type: "application/ld+json",
        children: JSON.stringify({
          "@context": "https://schema.org",
          "@graph": [
            {
              "@type": "WebPage",
              "@id": "https://sitaly.fr/#webpage",
              url: "https://sitaly.fr/",
              name: TITRE,
              description: DESCRIPTION,
              isPartOf: { "@id": "https://sitaly.fr/#website" },
              about: { "@id": "https://sitaly.fr/#app" },
              inLanguage: "fr-FR",
            },
            {
              "@type": "SoftwareApplication",
              "@id": "https://sitaly.fr/#app",
              name: "Sitaly",
              applicationCategory: "BusinessApplication",
              operatingSystem: "Web",
              url: "https://app.sitaly.fr/",
              description: DESCRIPTION,
              publisher: { "@id": "https://sitaly.fr/#business" },
              offers: [
                { "@type": "Offer", name: IA.decouverte.nom, price: "0", priceCurrency: "EUR" },
                {
                  "@type": "Offer",
                  name: IA.essentiel.nom,
                  price: String(IA.essentiel.mensuel),
                  priceCurrency: "EUR",
                },
                {
                  "@type": "Offer",
                  name: IA.pro.nom,
                  price: String(IA.pro.mensuel),
                  priceCurrency: "EUR",
                },
              ],
            },
            {
              "@type": "FAQPage",
              "@id": "https://sitaly.fr/#faq",
              mainEntity: FAQ_PRODUIT.map((f) => ({
                "@type": "Question",
                name: f.q,
                acceptedAnswer: { "@type": "Answer", text: f.a },
              })),
            },
          ],
        }),
      },
    ],
  }),
  component: Accueil,
});

function Accueil() {
  return (
    <div className="min-h-screen bg-white text-[#09090b]">
      <SiteHeader accueil />
      <div id="top" className="pt-[var(--entete-hauteur)]">
        <section className="px-4 pt-14 pb-8 sm:px-6 sm:pt-20">
          <div className="mx-auto max-w-4xl text-center">
            <h1 className="titre-produit text-[2.6rem] sm:text-6xl lg:text-[5.25rem]">
              Votre site internet, créé par l'IA en une minute
            </h1>
            <p
              className={`mx-auto mt-6 max-w-2xl text-lg leading-7 sm:text-xl sm:leading-8 ${TEXTE_GRIS}`}
            >
              Décrivez votre activité. Sitaly écrit vos pages, crée vos photos et met votre site en
              ligne. Ensuite, vous le retouchez en parlant à l'IA.
            </p>
          </div>
          <div className="mx-auto mt-10 max-w-3xl">
            <BoiteApp />
          </div>
          <Confiance />
        </section>

        <div id="exemples" className="scroll-mt-28">
          <Carrousel />
        </div>

        <section className="px-4 py-20 sm:px-6 sm:py-28">
          <div className="mx-auto max-w-6xl">
            <TitreSection
              surtitre="Pour qui"
              titre="Pensé pour toutes les activités"
              sousTitre="Artisan, commerçant, soignant ou créatif : choisissez la vôtre, l'IA démarre avec."
            />
            <div className="mt-12">
              <Familles />
            </div>
          </div>
        </section>

        <section id="fonctionnalites" className="scroll-mt-28 px-4 py-20 sm:px-6 sm:py-28">
          <div className="mx-auto max-w-6xl">
            <TitreSection
              surtitre="Fonctionnalités"
              titre="Tout pour lancer votre activité en ligne"
              sousTitre="Un site complet, vos demandes de contact, Google, vos photos : l'IA s'occupe du travail."
            />
            <div className="mt-14">
              <GrilleFonctions />
            </div>
          </div>
        </section>

        <section className="bg-[#0d0f14] px-4 py-20 text-white sm:px-6 sm:py-28">
          <div className="mx-auto max-w-6xl">
            <div className="mx-auto max-w-3xl text-center">
              <div className="text-sm font-medium text-[#c4b5fd]">Retouches</div>
              <h2 className="titre-produit mt-3 text-[2.15rem] text-white sm:text-5xl lg:text-6xl">
                Votre site change quand vous lui parlez
              </h2>
              <p className="mx-auto mt-5 max-w-2xl text-lg leading-7 text-white/60">
                Écrivez ce que vous voulez, comme à une personne. L'IA modifie votre site en
                quelques secondes, et un clic annule.
              </p>
            </div>
            <div className="mt-14">
              <Conversation />
            </div>
          </div>
        </section>

        <section className="px-4 py-20 sm:px-6 sm:py-28">
          <div className="mx-auto max-w-5xl">
            <TitreSection
              surtitre="Un seul abonnement"
              titre="Moins d'outils à assembler"
              sousTitre="Créateur de site, hébergement, rédaction, photos, référencement, formulaire : tout est déjà dans Sitaly."
            />
            <OutilsRemplaces />
            <div className="mx-auto mt-2 grid max-w-xl grid-cols-2 gap-4 text-center">
              <div className="rounded-3xl bg-black/[0.03] p-6">
                <div className={`text-sm ${TEXTE_GRIS}`}>Avec Sitaly</div>
                <div className="mt-1 text-4xl font-semibold tracking-tight">0 €</div>
                <div className={`mt-1 text-sm ${TEXTE_GRIS}`}>pour commencer</div>
              </div>
              <div className="rounded-3xl bg-black/[0.03] p-6">
                <div className={`text-sm ${TEXTE_GRIS}`}>Tout compris</div>
                <div className="mt-1 text-4xl font-semibold tracking-tight">
                  {IA.essentiel.mensuel} €
                </div>
                <div className={`mt-1 text-sm ${TEXTE_GRIS}`}>par mois, sans engagement</div>
              </div>
            </div>
          </div>
        </section>

        <section id="tarifs" className="scroll-mt-28 px-4 py-20 sm:px-6 sm:py-28">
          <div className="mx-auto max-w-6xl">
            <TitreSection
              surtitre="Tarifs"
              titre="Commencez gratuitement"
              sousTitre="Payez seulement si votre site vous plaît. Au mois ou à l'année, 15 % moins cher."
            />
            <div className="mt-14">
              <GrilleTarifs />
            </div>
          </div>
        </section>

        <section className="px-4 py-20 sm:px-6 sm:py-28">
          <div className="mx-auto max-w-3xl">
            <TitreSection surtitre="Questions" titre="Questions fréquentes" />
            <div className="mt-12">
              <Faq />
            </div>
          </div>
        </section>

        <section className="px-4 pt-10 pb-32 sm:px-6">
          <div className="mx-auto max-w-4xl text-center">
            <h2 className="titre-produit text-[2.15rem] sm:text-5xl lg:text-6xl">
              Votre site, dans une minute
            </h2>
            <p className={`mx-auto mt-5 max-w-xl text-lg ${TEXTE_GRIS}`}>
              Décrivez votre activité en une phrase. C'est gratuit.
            </p>
          </div>
          <div className="mx-auto mt-10 max-w-3xl">
            <BoiteApp idees={false} />
          </div>
          <Confiance />
        </section>
      </div>
      <SiteFooter />
      <BarreCollante />
    </div>
  );
}
