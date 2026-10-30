import { createFileRoute, Link } from "@tanstack/react-router";
import { ArrowRight } from "lucide-react";
import { SiteChrome } from "@/components/SiteChrome";
import { BoiteApp, Confiance, TEXTE_GRIS } from "@/components/produit/Produit";
import { COMPARATIFS } from "@/data/comparatifs";
import { BASE_URL } from "@/lib/sitemap";

/** La liste des comparatifs (30 octobre 2026) : Sitaly face à Wix, WordPress, Squarespace et une agence. */

const URL = `${BASE_URL}/comparer/`;
const TITRE = "Comparer Sitaly à Wix, WordPress, Squarespace ou une agence | Sitaly";
const DESCRIPTION =
  "Sitaly face aux autres façons de créer un site : Wix, WordPress, Squarespace, une agence web. Création, prix, nom de domaine, modifications.";

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
  }),
  component: Comparer,
});

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
              Chaque outil a ses forces. Ces comparatifs disent ce qui change pour vous, et quand
              l'autre choix est le meilleur.
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
                  <div className="titre-produit mt-2 text-3xl">Sitaly ou {c.nom}</div>
                  <p className={`mt-3 ${TEXTE_GRIS}`}>{c.choisirSitaly[0]}</p>
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
              Décrivez votre activité en une phrase. C'est gratuit.
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
