import { createFileRoute } from "@tanstack/react-router";
import { SiteChrome } from "@/components/SiteChrome";
import {
  BoiteApp,
  Confiance,
  Faq,
  FAQ_PRODUIT,
  GrilleTarifs,
  TableauFormules,
  TEXTE_GRIS,
  TitreSection,
} from "@/components/produit/Produit";
import { BASE_URL } from "@/lib/sitemap";
import { CREATEUR_IA as IA, MENTION_TVA } from "@/data/offres";

/**
 * Les tarifs de sitaly.fr (30 octobre 2026) : seulement Sitaly App, comme sur
 * durable.com. Les offres de l'agence (Présence et les autres) se vendent au
 * téléphone ; leurs pages /offres/… restent en ligne hors menu.
 */

const URL = `${BASE_URL}/tarifs/`;
const TITRE = `Tarifs de Sitaly : gratuit, puis dès ${IA.essentiel.mensuel} €/mois`;
const DESCRIPTION = `Découverte gratuit, ${IA.essentiel.nom} ${IA.essentiel.mensuel} €/mois, ${IA.pro.nom} ${IA.pro.mensuel} €/mois, ou 15 % de moins à l'année. Sans engagement au mois, ${MENTION_TVA.toLowerCase()}.`;

export const Route = createFileRoute("/tarifs")({
  head: () => ({
    meta: [
      { title: TITRE },
      { name: "description", content: DESCRIPTION },
      { property: "og:title", content: TITRE },
      { property: "og:description", content: DESCRIPTION },
      { property: "og:url", content: URL },
    ],
    links: [{ rel: "canonical", href: URL }],
    scripts: [
      {
        type: "application/ld+json",
        children: JSON.stringify({
          "@context": "https://schema.org",
          "@graph": [
            {
              "@type": "FAQPage",
              "@id": `${URL}#faq`,
              mainEntity: FAQ_PRODUIT.map((f) => ({
                "@type": "Question",
                name: f.q,
                acceptedAnswer: { "@type": "Answer", text: f.a },
              })),
            },
            {
              "@type": "BreadcrumbList",
              itemListElement: [
                { "@type": "ListItem", position: 1, name: "Accueil", item: `${BASE_URL}/` },
                { "@type": "ListItem", position: 2, name: "Tarifs", item: URL },
              ],
            },
          ],
        }),
      },
    ],
  }),
  component: Tarifs,
});

function Tarifs() {
  return (
    <div className="min-h-screen bg-white text-[#09090b]">
      <SiteChrome>
        <section className="px-4 pt-16 pb-24 sm:px-6 sm:pt-24 sm:pb-32">
          <div className="mx-auto max-w-4xl text-center">
            <div className="text-sm font-medium text-brand-ink">Tarifs</div>
            <h1 className="titre-produit mt-3 text-[2.5rem] sm:text-6xl lg:text-7xl">
              Commencez gratuitement
            </h1>
            <p className={`mx-auto mt-6 max-w-2xl text-lg leading-7 ${TEXTE_GRIS}`}>
              Créez votre site et mettez-le en ligne sans payer. Passez à une formule quand vous
              voulez plus de retouches et votre propre adresse.
            </p>
          </div>
          <div className="mx-auto mt-14 max-w-6xl">
            <GrilleTarifs />
          </div>
        </section>

        <section className="px-4 py-20 sm:px-6 sm:py-28">
          <div className="mx-auto max-w-5xl">
            <TitreSection
              surtitre="Comparer"
              titre="Toutes les fonctions, formule par formule"
              sousTitre="Ce que comprend chaque formule, ligne par ligne."
            />
            <div className="mt-14">
              <TableauFormules />
            </div>
          </div>
        </section>

        <section className="px-4 py-24 sm:px-6 sm:py-32">
          <div className="mx-auto max-w-3xl">
            <TitreSection surtitre="Questions" titre="Questions fréquentes" />
            <div className="mt-12">
              <Faq />
            </div>
          </div>
        </section>

        <section className="px-4 pt-8 pb-28 sm:px-6">
          <div className="mx-auto max-w-4xl text-center">
            <h2 className="titre-produit text-[2.15rem] sm:text-5xl lg:text-6xl">
              Essayez, c'est gratuit
            </h2>
            <p className={`mx-auto mt-5 max-w-xl text-lg ${TEXTE_GRIS}`}>
              Décrivez votre activité en une phrase : votre site est prêt une minute plus tard.
            </p>
          </div>
          <div className="mx-auto mt-10 max-w-3xl">
            <BoiteApp idees={false} />
          </div>
          <Confiance />
        </section>
      </SiteChrome>
    </div>
  );
}
