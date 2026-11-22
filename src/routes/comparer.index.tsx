import { createFileRoute, Link } from "@tanstack/react-router";
import { ArrowRight } from "lucide-react";
import type { ReactNode } from "react";
import { SiteChrome } from "@/components/SiteChrome";
import { BoiteApp, Confiance, TEXTE_GRIS } from "@/components/produit/Produit";
import { COMPARATIFS, RELEVE, RELEVE_ISO } from "@/data/comparatifs";
import { APP_REF, CREATEUR_IA as IA, PRIX_APPEL } from "@/data/offres";
import { BASE_URL } from "@/lib/config";

/**
 * La liste des comparatifs (30 octobre 2026) : Sitaly face à Wix, WordPress,
 * Squarespace et une agence, puis les alternatives à Wix (14 novembre 2026).
 * Audit SEO du 13 novembre 2026 : une introduction qui explique comment
 * choisir et renvoie vers chaque comparatif, et une CollectionPage avec son
 * ItemList, reliée au WebSite de src/routes/__root.tsx.
 */

const URL = `${BASE_URL}/comparer/`;
const TITRE = "Comparer Sitaly à Wix, WordPress, Squarespace ou une agence";
const DESCRIPTION =
  "Sitaly face à Wix et ses alternatives, WordPress, Squarespace et une agence web : prix sur trois ans, création du site, devis et rendez-vous.";

export const Route = createFileRoute("/comparer/")({
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
              "@type": "CollectionPage",
              "@id": `${URL}#page`,
              url: URL,
              name: TITRE,
              description: DESCRIPTION,
              inLanguage: "fr-FR",
              isPartOf: { "@id": `${BASE_URL}/#website` },
              about: APP_REF,
              publisher: { "@id": `${BASE_URL}/#business` },
              dateModified: RELEVE_ISO,
              mainEntity: { "@id": `${URL}#liste` },
            },
            {
              "@type": "ItemList",
              "@id": `${URL}#liste`,
              name: "Les comparatifs Sitaly",
              numberOfItems: COMPARATIFS.length,
              itemListElement: COMPARATIFS.map((c, k) => ({
                "@type": "ListItem",
                position: k + 1,
                name: c.carte,
                url: `${URL}${c.id}/`,
              })),
            },
          ],
        }),
      },
    ],
  }),
  component: Comparer,
});

/** Un lien vers un comparatif, dans le texte. */
function Vers({ id, children }: { id: string; children: ReactNode }) {
  return (
    <Link
      to="/comparer/$id/"
      params={{ id }}
      className="font-semibold text-[#09090b] underline underline-offset-2"
    >
      {children}
    </Link>
  );
}

function Comparer() {
  return (
    <div className="min-h-screen bg-white text-[#09090b]">
      <SiteChrome>
        <section className="px-4 pt-16 pb-12 sm:px-6 sm:pt-24">
          <div className="mx-auto max-w-4xl text-center">
            <div className="text-sm font-medium text-brand-ink">Comparer</div>
            <h1 className="titre-produit mt-3 text-[2.5rem] sm:text-6xl lg:text-7xl">
              Sitaly ou un autre outil ?
            </h1>
            <p className={`mx-auto mt-6 max-w-2xl text-lg leading-7 ${TEXTE_GRIS}`}>
              Chaque outil a ses forces. Ces comparatifs disent ce qui change pour vous, ce que
              coûte chaque choix sur trois ans, et quand l'autre choix est le meilleur.
            </p>
          </div>
        </section>

        <section className="px-4 pb-16 sm:px-6">
          <div className={`mx-auto max-w-3xl space-y-5 text-lg leading-8 ${TEXTE_GRIS}`}>
            <h2 className="titre-produit text-3xl text-[#09090b] sm:text-4xl">
              Comment choisir l'outil de votre site
            </h2>
            <p>
              Avant de comparer des prix, posez-vous trois questions. Qui va construire le site :
              vous, un outil, ou un prestataire ? Que doit-il faire en plus de vous présenter :
              vendre des produits, prendre des rendez-vous, envoyer des devis ? Et combien de temps
              voulez-vous y passer chaque mois ? Les réponses éliminent vite la moitié des options.
            </p>
            <p>
              Si vous aimez construire et régler chaque détail, un éditeur comme Wix vous donne la
              main sur tout, avec plus de 900 modèles et une boutique dès son forfait Essentiel. Le
              comparatif <Vers id="wix">Sitaly ou Wix</Vers> détaille ce qui change au quotidien. Si
              Wix ne vous convient pas, la page{" "}
              <Vers id="alternatives-wix">Alternatives à Wix</Vers> compare huit créateurs de site
              disponibles en France, du moins cher au plus complet, avec un prix sur trois ans pour
              chacun.
            </p>
            <p>
              Si vous voulez une liberté totale, des extensions pour tout et un site que vous pouvez
              déplacer chez n'importe quel hébergeur, WordPress reste la référence. Il demande en
              retour du temps ou un prestataire pour l'installer, le mettre à jour et le sécuriser :
              lisez <Vers id="wordpress">Sitaly ou WordPress</Vers>. Si le rendu graphique passe
              avant tout, Squarespace propose des modèles très soignés ; le comparatif{" "}
              <Vers id="squarespace">Sitaly ou Squarespace</Vers> dit ce que vous gagnez et ce que
              vous perdez.
            </p>
            <p>
              Si vous préférez tout déléguer, ou si votre projet sort du cadre d'un site vitrine,
              une agence web reste le bon choix. Elle coûte plus cher et prend plusieurs semaines,
              mais elle conçoit et rédige à votre place : voyez{" "}
              <Vers id="agence">Sitaly ou une agence web</Vers>, avec les prix médians observés en
              France.
            </p>
            <p>
              Sitaly vise un cas précis : l'artisan, l'indépendant ou la TPE de services qui veut un
              site écrit pour son métier sans le construire, et qui veut aussi faire ses devis et
              factures, prendre ses rendez-vous et répondre à ses avis Google au même endroit. Vous
              voyez votre site entier gratuitement, sans compte ni carte, puis l'offre Essentiel
              coûte {PRIX_APPEL.mensuel} € par mois les {PRIX_APPEL.mois} premiers mois, puis{" "}
              {IA.essentiel.mensuel} €, ou {IA.essentiel.annuel} € par an, nom de domaine compris. Sitaly ne fait pas de boutique en ligne et coûte plus cher que plusieurs
              outils en entrée de gamme : chaque comparatif le dit.
            </p>
            <p className="text-base">
              Les prix des autres outils ont été relevés le {RELEVE} sur leurs pages officielles,
              avec un lien vers chaque source. Ils changent souvent : vérifiez le prix du jour avant
              de payer.
            </p>
          </div>
        </section>

        <section className="px-4 pb-24 sm:px-6">
          <div className="mx-auto grid max-w-4xl gap-4 sm:grid-cols-2">
            {COMPARATIFS.map((c) => (
              <Link
                key={c.id}
                to="/comparer/$id/"
                params={{ id: c.id }}
                className="group flex flex-col justify-between rounded-3xl bg-black/[0.03] p-7 transition hover:bg-black/[0.05]"
              >
                <div>
                  <div className={`text-sm ${TEXTE_GRIS}`}>Comparatif</div>
                  <div className="titre-produit mt-2 text-3xl">{c.carte}</div>
                  <p className={`mt-3 ${TEXTE_GRIS}`}>{c.accroche}</p>
                </div>
                <span className="mt-6 inline-flex items-center gap-2 text-sm font-semibold">
                  Lire le comparatif
                  <ArrowRight className="h-4 w-4 transition group-hover:translate-x-0.5" />
                </span>
              </Link>
            ))}
          </div>
        </section>

        <section className="px-4 pt-8 pb-28 sm:px-6">
          <div className="mx-auto max-w-4xl text-center">
            <h2 className="titre-produit text-[2.15rem] sm:text-5xl lg:text-6xl">
              Le plus simple : essayer
            </h2>
            <p className={`mx-auto mt-5 max-w-xl text-lg ${TEXTE_GRIS}`}>
              Décrivez votre activité en une phrase. L'aperçu est gratuit.
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
