import { createFileRoute } from "@tanstack/react-router";
import { ArrowRight, ArrowUpRight } from "lucide-react";
import { SiteChrome } from "@/components/SiteChrome";
import {
  BOUTON_NOIR,
  CARTE,
  Confiance,
  TEXTE_GRIS,
  lienCreation,
} from "@/components/produit/Produit";
import {
  OFFRES_ACTIVES,
  OFFRES_TRIEES,
  PARTENAIRES_EN_LIGNE,
  PARTENAIRES_PUBLIES,
  type OffrePartenaire,
} from "@/data/partenaires";
import { BASE_URL } from "@/lib/sitemap";

/**
 * Les offres partenaires (9 novembre 2026) : les outils que Sitaly recommande
 * pour créer sa structure, ouvrir son compte professionnel et tenir sa
 * comptabilité. Une offre qui a son lien est cliquable ; les autres restent
 * visibles, grisées, avec « Bientôt » (src/data/partenaires.ts). Tant
 * qu'aucune n'est ouverte, la page reste hors index.
 *
 * Les liens sont des liens partenaires rémunérés : ils portent rel="sponsored"
 * et la page le dit au visiteur.
 */

const URL = `${BASE_URL}/partenaires/`;
const TITRE = "Offres partenaires pour lancer votre activité | Sitaly";
const DESCRIPTION =
  "Création d'entreprise, compte professionnel, comptabilité : les outils que Sitaly recommande aux indépendants qui se lancent, avec leurs offres.";

export const Route = createFileRoute("/partenaires")({
  head: () => ({
    meta: [
      { title: TITRE },
      { name: "description", content: DESCRIPTION },
      { property: "og:title", content: TITRE },
      { property: "og:description", content: DESCRIPTION },
      { property: "og:url", content: URL },
      ...(PARTENAIRES_PUBLIES ? [] : [{ name: "robots", content: "noindex, follow" }]),
    ],
    links: [{ rel: "canonical", href: URL }],
  }),
  component: Partenaires,
});

/** Le contenu d'une carte : la catégorie, puis le logo de la marque à la place de son nom écrit. */
function Carte({ p, ouverte }: { p: OffrePartenaire; ouverte: boolean }) {
  return (
    <>
      <div className="text-sm font-medium text-brand-ink">{p.categorie}</div>
      {/* Le logo tient lieu de nom : son texte alternatif le dit aux lecteurs d'écran et à Google. */}
      <img
        src={p.logo}
        alt={p.nom}
        loading="lazy"
        className={`mt-4 h-9 w-auto max-w-[11rem] self-start object-contain object-left ${ouverte ? "" : "grayscale"}`}
      />
      <p className={`mt-4 ${TEXTE_GRIS}`}>{p.description}</p>
      {ouverte && p.avantage && (
        <p className="mt-4 w-fit rounded-full bg-[#0d0f14] px-3 py-1 text-sm font-semibold text-white">
          {p.avantage}
        </p>
      )}
      {ouverte ? (
        <span className="mt-auto inline-flex items-center gap-1.5 pt-6 text-sm font-semibold">
          Découvrir {p.nom}
          <ArrowUpRight className="h-4 w-4 transition group-hover:-translate-y-0.5 group-hover:translate-x-0.5" />
        </span>
      ) : (
        <span className="mt-auto pt-6">
          <span className="rounded-full bg-black/[0.06] px-2.5 py-1 text-xs font-medium">
            Bientôt
          </span>
        </span>
      )}
    </>
  );
}

function Partenaires() {
  return (
    <div className="min-h-screen bg-white text-[#09090b]">
      <SiteChrome>
        <section className="px-4 pt-16 pb-12 sm:px-6 sm:pt-24">
          <div className="mx-auto max-w-4xl text-center">
            <div className="text-sm font-medium text-brand-ink">Partenaires</div>
            <h1 className="titre-produit mt-3 text-[2.5rem] sm:text-6xl">
              Les outils pour lancer votre activité
            </h1>
            <p className={`mx-auto mt-6 max-w-2xl text-lg leading-7 ${TEXTE_GRIS}`}>
              Votre site ne fait pas tout. Voici ce que nous recommandons pour créer votre
              structure, ouvrir votre compte professionnel et tenir votre comptabilité.
            </p>
          </div>
        </section>

        <section className="px-4 pb-16 sm:px-6">
          <div className="mx-auto max-w-6xl">
            {PARTENAIRES_EN_LIGNE ? (
              <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
                {OFFRES_TRIEES.map((p) =>
                  p.lien.trim() ? (
                    <a
                      key={p.id}
                      href={p.lien}
                      target="_blank"
                      rel="sponsored noopener"
                      className={`${CARTE} group flex flex-col p-6 transition hover:bg-black/[0.05]`}
                    >
                      <Carte p={p} ouverte />
                    </a>
                  ) : (
                    // Sans lien : la carte reste lisible, grisée, et ne mène nulle part.
                    <div key={p.id} className={`${CARTE} flex flex-col p-6 opacity-60`}>
                      <Carte p={p} ouverte={false} />
                    </div>
                  ),
                )}
              </div>
            ) : (
              // Rubrique fermée (PARTENAIRES_EN_LIGNE) : aucune marque, aucun logo.
              <div className={`${CARTE} mx-auto max-w-2xl px-6 py-12 text-center`}>
                <div className="text-lg font-semibold">Les premières offres arrivent</div>
                <p className={`mt-2 ${TEXTE_GRIS}`}>
                  Nous choisissons les partenaires un par un. Revenez dans quelques jours.
                </p>
              </div>
            )}
            {PARTENAIRES_EN_LIGNE && OFFRES_ACTIVES.length > 0 && (
              <p className={`mx-auto mt-8 max-w-2xl text-center text-sm ${TEXTE_GRIS}`}>
                Liens partenaires : Sitaly peut recevoir une commission quand vous ouvrez un compte
                en les suivant. Le prix ne change pas pour vous.
              </p>
            )}
          </div>
        </section>

        <section className="px-4 pt-4 pb-28 sm:px-6">
          <div className={`${CARTE} mx-auto max-w-4xl px-6 py-14 text-center`}>
            <h2 className="titre-produit text-[2rem] sm:text-5xl">
              Et votre site, dans une minute
            </h2>
            <p className={`mx-auto mt-4 max-w-xl text-lg ${TEXTE_GRIS}`}>
              Décrivez votre activité en une phrase : l'IA crée votre site. C'est gratuit.
            </p>
            <a href={lienCreation()} className={`${BOUTON_NOIR} mt-8 px-6 py-3.5 text-base`}>
              Créer mon site
              <ArrowRight className="h-4 w-4" />
            </a>
            <Confiance />
          </div>
        </section>
      </SiteChrome>
    </div>
  );
}
