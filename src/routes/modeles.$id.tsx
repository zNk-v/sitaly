import { createFileRoute, Link, notFound } from "@tanstack/react-router";
import { ArrowRight, Check, ChevronRight } from "lucide-react";
import { SiteChrome } from "@/components/SiteChrome";
import {
  BOUTON_NOIR,
  CARTE,
  Confiance,
  TEXTE_GRIS,
  TitreSection,
  lienCreation,
} from "@/components/produit/Produit";
import { METIERS, MiniSite, photo } from "@/components/produit/Vitrine";
import { getModele, MODELES } from "@/data/modeles";
import { BASE_URL } from "@/lib/sitemap";

/**
 * La page d'un modèle (31 octobre 2026) : le site que l'IA prépare pour un
 * métier, ses sections, trois conseils, et le bouton qui ouvre l'application
 * avec la phrase du métier déjà écrite.
 */

export const Route = createFileRoute("/modeles/$id")({
  loader: ({ params }) => {
    const modele = getModele(params.id);
    const metier = METIERS.find((m) => m.id === params.id);
    if (!modele || !metier) throw notFound();
    return { modele, metier };
  },
  head: ({ loaderData }) => {
    if (!loaderData) return {};
    const { modele, metier } = loaderData;
    const url = `${BASE_URL}/modeles/${modele.id}/`;
    const titre = `Modèle de site internet pour ${modele.nom} | Sitaly`;
    const description = `${modele.intro} Créez votre site de ${modele.nom} avec l'IA, gratuitement.`;
    return {
      meta: [
        { title: titre },
        { name: "description", content: description },
        { property: "og:title", content: titre },
        { property: "og:description", content: description },
        { property: "og:url", content: url },
        { property: "og:image", content: `${BASE_URL}${photo(metier.id)}` },
      ],
      links: [{ rel: "canonical", href: url }],
      scripts: [
        {
          type: "application/ld+json",
          children: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "BreadcrumbList",
            itemListElement: [
              { "@type": "ListItem", position: 1, name: "Accueil", item: `${BASE_URL}/` },
              { "@type": "ListItem", position: 2, name: "Modèles", item: `${BASE_URL}/modeles/` },
              { "@type": "ListItem", position: 3, name: modele.nom, item: url },
            ],
          }),
        },
      ],
    };
  },
  component: PageModele,
});

function PageModele() {
  const { modele, metier } = Route.useLoaderData();
  const autres = METIERS.filter((m) => m.id !== metier.id).slice(0, 3);
  const nomDe = (id: string) => MODELES.find((x) => x.id === id)?.nom ?? id;

  return (
    <div className="min-h-screen bg-white text-[#09090b]">
      <SiteChrome>
        <section className="px-4 pt-10 pb-16 sm:px-6 sm:pt-16">
          <div className="mx-auto max-w-6xl">
            <nav
              aria-label="Fil d'Ariane"
              className={`flex items-center gap-1.5 text-sm ${TEXTE_GRIS}`}
            >
              <Link to="/modeles/" className="hover:text-black">
                Modèles
              </Link>
              <ChevronRight className="h-3.5 w-3.5" />
              <span className="text-black first-letter:uppercase">{modele.nom}</span>
            </nav>

            <div className="mt-8 grid items-center gap-10 lg:grid-cols-[1fr_1.15fr]">
              <div>
                <div className="text-sm font-medium text-brand-ink">Modèle de site</div>
                <h1 className="titre-produit mt-3 text-[2.4rem] sm:text-5xl lg:text-6xl">
                  Site internet pour {modele.nom}
                </h1>
                <p className={`mt-5 max-w-xl text-lg leading-7 ${TEXTE_GRIS}`}>{modele.intro}</p>
                <a
                  href={lienCreation(metier.phrase)}
                  className={`${BOUTON_NOIR} mt-8 px-6 py-3.5 text-base`}
                >
                  Utiliser ce modèle
                  <ArrowRight className="h-4 w-4" />
                </a>
                <p className={`mt-3 text-sm ${TEXTE_GRIS}`}>
                  Gratuit, sans carte bancaire. L'IA adapte le modèle à votre activité.
                </p>
              </div>

              <div className="relative">
                <img
                  src={photo(metier.id)}
                  alt=""
                  width={1536}
                  height={864}
                  className="aspect-[4/3] w-full rounded-[28px] object-cover"
                />
                <MiniSite
                  m={metier}
                  className="absolute -bottom-6 left-4 w-[62%] sm:left-auto sm:right-6 sm:w-[52%]"
                />
              </div>
            </div>
          </div>
        </section>

        <section className="px-4 py-20 sm:px-6 sm:py-24">
          <div className="mx-auto max-w-6xl">
            <TitreSection
              surtitre="Ce que contient votre site"
              titre="Les pages de votre site, déjà écrites"
              sousTitre="L'IA prépare ces sections pour votre métier. Vous en ajoutez, en retirez ou les réécrivez en une phrase."
            />
            <div className="mt-12 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
              {modele.sections.map((s) => (
                <div key={s.titre} className={`${CARTE} p-6`}>
                  <span
                    className="grid h-8 w-8 place-items-center rounded-full"
                    style={{ background: metier.accent, color: metier.couleur }}
                  >
                    <Check className="h-4 w-4" />
                  </span>
                  <div className="mt-4 text-lg font-semibold">{s.titre}</div>
                  <p className={`mt-1 ${TEXTE_GRIS}`}>{s.texte}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        <section className="px-4 py-20 sm:px-6 sm:py-24" style={{ background: metier.couleur }}>
          <div className="mx-auto max-w-6xl text-white">
            <div className="mx-auto max-w-3xl text-center">
              <div className="text-sm font-medium" style={{ color: metier.accent }}>
                Conseils
              </div>
              <h2 className="titre-produit mt-3 text-[2.15rem] text-white sm:text-5xl">
                Un bon site de {modele.nom}
              </h2>
            </div>
            <div className="mt-12 grid gap-4 md:grid-cols-3">
              {modele.conseils.map((c, k) => (
                <div key={c.titre} className="rounded-3xl bg-white/[0.07] p-6">
                  <div className="text-sm font-semibold" style={{ color: metier.accent }}>
                    {String(k + 1).padStart(2, "0")}
                  </div>
                  <div className="mt-3 text-lg font-semibold">{c.titre}</div>
                  <p className="mt-1 text-white/70">{c.texte}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        <section className="px-4 py-20 sm:px-6 sm:py-24">
          <div className="mx-auto max-w-6xl">
            <div className="flex items-end justify-between gap-4">
              <h2 className="titre-produit text-3xl sm:text-4xl">Autres modèles</h2>
              <Link to="/modeles/" className="text-sm font-semibold hover:underline">
                Tous les modèles
              </Link>
            </div>
            <div className="mt-8 grid gap-5 sm:grid-cols-3">
              {autres.map((m) => (
                <Link
                  key={m.id}
                  to="/modeles/$id/"
                  params={{ id: m.id }}
                  className="group overflow-hidden rounded-3xl bg-black/[0.03] transition hover:bg-black/[0.05]"
                >
                  <img
                    src={photo(m.id, 768)}
                    alt=""
                    loading="lazy"
                    width={768}
                    height={432}
                    className="aspect-[16/10] w-full object-cover"
                  />
                  <div className="flex items-center justify-between p-5">
                    <span className="font-semibold first-letter:uppercase">{nomDe(m.id)}</span>
                    <ArrowRight className="h-4 w-4 transition group-hover:translate-x-0.5" />
                  </div>
                </Link>
              ))}
            </div>
          </div>
        </section>

        <section className="px-4 pt-4 pb-28 sm:px-6">
          <div className={`${CARTE} mx-auto max-w-4xl px-6 py-14 text-center`}>
            <h2 className="titre-produit text-[2rem] sm:text-5xl">
              Votre site de {modele.nom}, dans une minute
            </h2>
            <p className={`mx-auto mt-4 max-w-xl text-lg ${TEXTE_GRIS}`}>
              L'IA part de ce modèle et l'écrit pour votre activité, votre ville et vos services.
            </p>
            <a
              href={lienCreation(metier.phrase)}
              className={`${BOUTON_NOIR} mt-8 px-6 py-3.5 text-base`}
            >
              Utiliser ce modèle
              <ArrowRight className="h-4 w-4" />
            </a>
            <Confiance />
          </div>
        </section>
      </SiteChrome>
    </div>
  );
}
