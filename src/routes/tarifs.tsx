import { createFileRoute, Link } from "@tanstack/react-router";
import { ShieldCheck } from "lucide-react";
import { Apparition } from "@/components/Apparition";
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
import { BASE_URL } from "@/lib/config";
import {
  CREATEUR_IA as IA,
  GARANTIE,
  GARANTIE_JOURS,
  offresStructurees,
  PHRASE_APERCU,
  PRIX_APPEL,
} from "@/data/offres";
import { PILIER_DEVIS, PILIER_SITE } from "@/data/piliers";

/**
 * Les tarifs de sitaly.fr (30 octobre 2026) : seulement Sitaly App, comme sur
 * durable.com. Les offres de l'agence (Présence et les autres) se vendent au
 * téléphone ; leurs pages /offres/… restent en ligne hors menu.
 */

const URL = `${BASE_URL}/tarifs/`;
const TITRE = `Tarifs de Sitaly : ${IA.essentiel.nom} et ${IA.pro.nom}, aperçu gratuit`;
const DESCRIPTION = `Aperçu gratuit. ${IA.essentiel.nom} ${PRIX_APPEL.mensuel} €/mois les ${PRIX_APPEL.mois} premiers mois puis ${PRIX_APPEL.ensuite} €, ${IA.pro.nom} ${IA.pro.mensuel} €/mois, 15 % de moins à l'année. ${GARANTIE}.`;

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
            // L'application et ses deux formules, comme sur l'accueil : la
            // page Tarifs est celle que Google doit relier aux prix.
            {
              "@type": "SoftwareApplication",
              "@id": "https://sitaly.fr/#app",
              name: "Sitaly",
              applicationCategory: "BusinessApplication",
              operatingSystem: "Web",
              url: "https://app.sitaly.fr/",
              publisher: { "@id": "https://sitaly.fr/#business" },
              offers: offresStructurees(),
            },
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
        <section className="px-4 pt-10 pb-14 sm:px-6 sm:pt-24 sm:pb-32">
          <div className="mx-auto max-w-4xl text-center">
            <div className="text-sm font-medium text-brand-ink">Tarifs</div>
            <h1 className="titre-produit mt-3 text-[2.5rem] sm:text-6xl lg:text-7xl">
              Voyez votre site, puis publiez-le
            </h1>
            <p className={`mx-auto mt-6 max-w-2xl text-lg leading-7 ${TEXTE_GRIS}`}>
              {PHRASE_APERCU} {IA.essentiel.nom} vous offre votre nom de domaine, à{" "}
              {PRIX_APPEL.mensuel} € par mois les {PRIX_APPEL.mois} premiers mois. Artisan ?{" "}
              <Link
                to={PILIER_SITE.chemin}
                className="font-medium text-black underline underline-offset-4"
              >
                Le guide pour créer votre site
              </Link>{" "}
              détaille les étapes et le prix réel.
            </p>
            <p className="mx-auto mt-6 inline-flex items-center gap-2 rounded-full bg-black/[0.04] px-4 py-2 text-sm font-medium">
              <ShieldCheck className="h-4 w-4" aria-hidden="true" />
              {GARANTIE} sur le premier paiement
            </p>
          </div>
          <div className="mx-auto mt-14 max-w-6xl">
            <GrilleTarifs />
          </div>
        </section>

        <Apparition>
          <section className="px-4 py-12 sm:px-6 sm:py-28">
            <div className="mx-auto max-w-5xl">
              <TitreSection
                surtitre="Comparer"
                titre="Toutes les fonctions, formule par formule"
                sousTitre={`Ce que comprend chaque formule, ligne par ligne. Satisfait ou remboursé pendant ${GARANTIE_JOURS} jours sur votre premier paiement, sur simple demande.`}
              />
              <div className="mt-14">
                <TableauFormules />
              </div>
              {/* Les devis et les factures sont comparés ligne par ligne au-dessus :
                  le guide comparatif prolonge cette rubrique (16 novembre 2026). */}
              <p className={`mt-10 text-center text-base leading-6 sm:text-sm ${TEXTE_GRIS}`}>
                Devis et factures :{" "}
                <Link
                  to={PILIER_DEVIS.chemin}
                  className="font-medium text-black underline underline-offset-4"
                >
                  {PILIER_DEVIS.ancre}
                </Link>
                , et ce que la loi impose à un artisan.
              </p>
            </div>
          </section>
        </Apparition>

        <Apparition>
          <section className="px-4 py-24 sm:px-6 sm:py-32">
            <div className="mx-auto max-w-3xl">
              <TitreSection surtitre="Questions" titre="Questions fréquentes" />
              <div className="mt-12">
                <Faq />
              </div>
            </div>
          </section>
        </Apparition>

        <Apparition>
          <section className="px-4 pt-8 pb-28 sm:px-6">
            <div className="mx-auto max-w-4xl text-center">
              <h2 className="titre-produit text-[2.15rem] sm:text-5xl lg:text-6xl">
                Voyez votre site avant de payer
              </h2>
              <p className={`mx-auto mt-5 max-w-xl text-lg ${TEXTE_GRIS}`}>
                Décrivez votre activité en une phrase : votre site est prêt une minute plus tard,
                sans compte ni carte.
              </p>
            </div>
            <div className="mx-auto mt-10 max-w-3xl">
              <BoiteApp idees={false} />
            </div>
            <Confiance />
          </section>
        </Apparition>
      </SiteChrome>
    </div>
  );
}
