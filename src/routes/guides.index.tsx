import { createFileRoute, Link } from "@tanstack/react-router";
import { ArrowRight, ChevronRight, PlayCircle } from "lucide-react";
import { SiteChrome } from "@/components/SiteChrome";
import { BOUTON_NOIR, TEXTE_GRIS, lienCreation } from "@/components/produit/Produit";
import { GUIDES, imageGuide } from "@/data/guides";
import { BASE_URL } from "@/lib/sitemap";

/**
 * Les guides pas à pas de Sitaly App (3 novembre 2026) : chaque geste de
 * l'application, expliqué et montré en vidéo. Les mêmes que dans le centre
 * d'aide de l'app. Données : src/data/guides.ts.
 */

const URL_PAGE = `${BASE_URL}/guides/`;
const TITRE = "Guides Sitaly : chaque étape en vidéo";
const DESCRIPTION =
  "Publier votre site, créer votre logo, envoyer une facture, être trouvé sur Google : les guides pas à pas de Sitaly, chaque étape montrée en vidéo.";

export const Route = createFileRoute("/guides/")({
  head: () => ({
    meta: [
      { title: `${TITRE} | Sitaly` },
      { name: "description", content: DESCRIPTION },
      { property: "og:title", content: TITRE },
      { property: "og:description", content: DESCRIPTION },
      { property: "og:url", content: URL_PAGE },
    ],
    links: [{ rel: "canonical", href: URL_PAGE }],
    scripts: [
      {
        type: "application/ld+json",
        children: JSON.stringify({
          "@context": "https://schema.org",
          "@type": "ItemList",
          name: TITRE,
          itemListElement: GUIDES.map((g, i) => ({
            "@type": "ListItem",
            position: i + 1,
            name: g.titre,
            url: `${BASE_URL}/guides/${g.id}/`,
          })),
        }),
      },
    ],
  }),
  component: PageGuides,
});

function PageGuides() {
  return (
    <div className="min-h-screen bg-white text-[#09090b]">
      <SiteChrome>
        <section className="px-4 pt-10 pb-12 sm:px-6 sm:pt-16">
          <div className="mx-auto max-w-4xl text-center">
            <nav
              aria-label="Fil d'Ariane"
              className={`flex items-center justify-center gap-1.5 text-sm ${TEXTE_GRIS}`}
            >
              <Link to="/" className="hover:text-black">
                Sitaly App
              </Link>
              <ChevronRight className="h-3.5 w-3.5" />
              <span className="text-black">Guides</span>
            </nav>
            <h1 className="titre-produit mt-6 text-[2.5rem] sm:text-6xl lg:text-7xl">
              Chaque étape, montrée en vidéo
            </h1>
            <p className={`mx-auto mt-6 max-w-2xl text-lg leading-7 ${TEXTE_GRIS}`}>
              Douze guides courts pour tout faire dans Sitaly : votre site, votre logo, vos
              factures, vos rendez-vous. Le texte de chaque étape, et l'écran qui la montre.
            </p>
          </div>
        </section>

        <section className="px-4 pb-20 sm:px-6">
          <ul className="mx-auto grid max-w-6xl gap-5 sm:grid-cols-2 lg:grid-cols-3">
            {GUIDES.map((g) => (
              <li key={g.id}>
                <Link
                  to="/guides/$id/"
                  params={{ id: g.id }}
                  className="group block overflow-hidden rounded-3xl bg-black/[0.03] transition hover:bg-black/[0.05]"
                >
                  <span className="relative block aspect-[16/10] overflow-hidden">
                    <img
                      src={imageGuide(g.id, Math.min(1, g.etapes.length - 1))}
                      alt=""
                      loading="lazy"
                      width={1120}
                      height={700}
                      className="h-full w-full object-cover object-top transition duration-300 group-hover:scale-[1.03]"
                    />
                    <span className="absolute bottom-3 left-3 inline-flex items-center gap-1.5 rounded-full bg-black/85 px-2.5 py-1 text-xs font-medium text-white">
                      <PlayCircle className="h-3.5 w-3.5" /> {g.etapes.length} étapes · {g.duree}
                    </span>
                  </span>
                  <span className="block p-5">
                    <span className="block text-lg font-semibold group-hover:underline">
                      {g.titre}
                    </span>
                    <span className={`mt-1 block ${TEXTE_GRIS}`}>{g.resume}</span>
                  </span>
                </Link>
              </li>
            ))}
          </ul>
        </section>

        <section className="px-4 pb-28 sm:px-6">
          <div className="mx-auto max-w-3xl text-center">
            <h2 className="titre-produit text-[2.15rem] sm:text-5xl">
              Essayez pendant que vous lisez
            </h2>
            <p className={`mx-auto mt-5 max-w-xl text-lg ${TEXTE_GRIS}`}>
              Votre site est prêt une minute après votre première phrase. Gratuit, sans carte
              bancaire.
            </p>
            <a href={lienCreation()} className={`${BOUTON_NOIR} mt-8 min-h-12 px-6 text-base`}>
              Créer mon site gratuitement <ArrowRight className="h-4 w-4" />
            </a>
          </div>
        </section>
      </SiteChrome>
    </div>
  );
}
