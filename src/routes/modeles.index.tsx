import { createFileRoute, Link } from "@tanstack/react-router";
import { ArrowRight, Sparkles } from "lucide-react";
import { SiteChrome } from "@/components/SiteChrome";
import { BoiteApp, Confiance, TEXTE_GRIS, lienCreation } from "@/components/produit/Produit";
import { METIERS, MiniSite, photo } from "@/components/produit/Vitrine";
import { MODELES } from "@/data/modeles";
import { BASE_URL } from "@/lib/sitemap";

/**
 * La liste des modèles de sites (31 octobre 2026), comme la page « Templates »
 * de durable.com : une carte par métier, qui mène à la page du modèle.
 */

const URL = `${BASE_URL}/modeles/`;
const TITRE = "Modèles de sites internet par métier | Sitaly";
const DESCRIPTION =
  "Fleuriste, plombier, coach, boulangerie, coiffure, paysagiste, photographe, ostéopathe, traiteur : choisissez un modèle, l'IA de Sitaly l'adapte à votre activité en une minute.";

export const Route = createFileRoute("/modeles/")({
  head: () => ({
    meta: [
      { title: TITRE },
      { name: "description", content: DESCRIPTION },
      { property: "og:title", content: TITRE },
      { property: "og:description", content: DESCRIPTION },
      { property: "og:url", content: URL },
      { property: "og:image", content: `${BASE_URL}${photo("coiffeuse")}` },
    ],
    links: [{ rel: "canonical", href: URL }],
  }),
  component: Modeles,
});

const nomDe = (id: string) => MODELES.find((m) => m.id === id)?.nom ?? id;

function Modeles() {
  return (
    <div className="min-h-screen bg-white text-[#09090b]">
      <SiteChrome>
        <section className="px-4 pt-16 pb-12 sm:px-6 sm:pt-24">
          <div className="mx-auto max-w-4xl text-center">
            <div className="text-sm font-medium text-brand-ink">Modèles</div>
            <h1 className="titre-produit mt-3 text-[2.5rem] sm:text-6xl lg:text-7xl">
              Un modèle pour chaque métier
            </h1>
            <p className={`mx-auto mt-6 max-w-2xl text-lg leading-7 ${TEXTE_GRIS}`}>
              Choisissez le vôtre : l'IA part de ce modèle, écrit vos textes et crée vos photos.
              Votre site est en ligne une minute plus tard.
            </p>
          </div>
        </section>

        <section className="px-4 pb-24 sm:px-6">
          <div className="mx-auto grid max-w-6xl gap-5 sm:grid-cols-2 lg:grid-cols-3">
            {METIERS.map((m) => (
              <Link
                key={m.id}
                to="/modeles/$id/"
                params={{ id: m.id }}
                className="group overflow-hidden rounded-3xl bg-black/[0.03] transition hover:bg-black/[0.05]"
              >
                <div className="relative aspect-[4/3] overflow-hidden">
                  <img
                    src={photo(m.id, 768)}
                    alt=""
                    loading="lazy"
                    width={768}
                    height={432}
                    className="h-full w-full object-cover transition duration-500 group-hover:scale-[1.03]"
                  />
                  <MiniSite
                    m={m}
                    className="absolute right-4 bottom-4 w-[58%] transition duration-500 group-hover:-translate-y-1"
                  />
                </div>
                <div className="flex items-center justify-between gap-3 p-5">
                  <div>
                    <div className="text-lg font-semibold first-letter:uppercase">
                      {nomDe(m.id)}
                    </div>
                    <div className={`mt-0.5 text-sm ${TEXTE_GRIS}`}>{m.titre}</div>
                  </div>
                  <span className="grid h-9 w-9 shrink-0 place-items-center rounded-full bg-white transition group-hover:translate-x-0.5">
                    <ArrowRight className="h-4 w-4" />
                  </span>
                </div>
              </Link>
            ))}
            <a
              href={lienCreation()}
              className="flex flex-col gap-6 rounded-3xl bg-[#0d0f14] p-7 text-white transition hover:bg-black sm:col-span-2 lg:col-span-3 lg:flex-row lg:items-center lg:justify-between lg:p-10"
            >
              <div className="flex items-start gap-5">
                <Sparkles className="mt-1 h-6 w-6 shrink-0 text-[#c4b5fd]" />
                <div>
                  <div className="titre-produit text-3xl text-white">Votre métier n'est pas là ?</div>
                  <p className="mt-2 max-w-xl text-white/60">
                    Décrivez votre activité en une phrase : l'IA crée un site sur mesure, quel que
                    soit votre métier.
                  </p>
                </div>
              </div>
              <span className="inline-flex shrink-0 items-center gap-2 self-start rounded-2xl bg-white px-5 py-3 text-sm font-semibold text-black lg:self-center">
                Créer mon site <ArrowRight className="h-4 w-4" />
              </span>
            </a>
          </div>
        </section>

        <section className="px-4 pt-8 pb-28 sm:px-6">
          <div className="mx-auto max-w-4xl text-center">
            <h2 className="titre-produit text-[2.15rem] sm:text-5xl lg:text-6xl">
              Ou décrivez-nous votre activité
            </h2>
            <p className={`mx-auto mt-5 max-w-xl text-lg ${TEXTE_GRIS}`}>
              Une phrase suffit. C'est gratuit.
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
