import { useEffect, useRef } from "react";
import { createFileRoute, Link } from "@tanstack/react-router";
import { ArrowRight, Instagram, Linkedin, Mail, Phone } from "lucide-react";
import { SiteChrome } from "@/components/SiteChrome";
import { LINKEDIN_URL } from "@/components/LinkedinLink";
import { BoiteApp, Confiance, TEXTE_GRIS } from "@/components/produit/Produit";
import { REALISATIONS } from "@/data/realisations";
import { PRODUITS } from "@/data/produits";
import { BASE_URL } from "@/lib/sitemap";
import { SITALY_PHONE, SITALY_PHONE_DISPLAY } from "@/lib/config";

/**
 * Page auteur et entreprise.
 *
 * Elle existe pour deux lecteurs. Le prospect qui veut savoir à qui il parle,
 * et les moteurs, Google comme les assistants IA, qui relient un article, une
 * page de service et un profil LinkedIn à une même personne et à une même
 * entreprise. D'où l'identité légale écrite en toutes lettres : c'est ce qui
 * rattache le nom commercial au registre.
 *
 * Rien ici n'est inventé. Teddy a demandé de ne pas y mettre sa photo ni sa
 * ville d'immatriculation (8 novembre 2026) : il se présente à Paris, et
 * l'adresse légale reste dans les mentions légales.
 */
const TITRE = "Teddy Vidal, fondateur de Sitaly | À propos";
const DESCRIPTION =
  "Teddy Vidal a fondé Sitaly, l'application française qui crée le site internet des artisans, des indépendants et des TPE à partir d'une phrase, avec l'IA.";
const URL = `${BASE_URL}/a-propos/`;

export const Route = createFileRoute("/a-propos")({
  head: () => ({
    meta: [
      { title: TITRE },
      { name: "description", content: DESCRIPTION },
      { name: "robots", content: "index, follow, max-snippet:-1, max-image-preview:large" },
      { property: "og:type", content: "profile" },
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
          "@type": "AboutPage",
          "@id": `${URL}#page`,
          url: URL,
          name: TITRE,
          inLanguage: "fr-FR",
          about: { "@id": `${BASE_URL}/#business` },
          mainEntity: { "@id": `${BASE_URL}/#teddy-vidal` },
          isPartOf: { "@id": `${BASE_URL}/#website` },
        }),
      },
    ],
  }),
  component: APropos,
});

const BADGE_FABRIQUE_DU_NET =
  "https://www.lafabriquedunet.fr/badge/software/sitaly/badge.js?color=dark";

/**
 * Badge La Fabrique du Net. Leur script s'insère juste avant sa propre balise.
 * La balise reste dans le HTML prérendu, comme le demande leur consigne
 * d'intégration ; une navigation interne ne l'exécute pas, d'où l'effet.
 */
function BadgeFabriqueDuNet() {
  const zone = useRef<HTMLDivElement>(null);
  useEffect(() => {
    const el = zone.current;
    if (!el || el.querySelector("[data-lfdn-badge]")) return;
    el.replaceChildren();
    const script = document.createElement("script");
    script.src = BADGE_FABRIQUE_DU_NET;
    el.append(script);
  }, []);
  return (
    <div
      ref={zone}
      style={{ minHeight: 42 }}
      suppressHydrationWarning
      dangerouslySetInnerHTML={{
        __html: `<script src="${BADGE_FABRIQUE_DU_NET}" defer></script>`,
      }}
    />
  );
}

const CARTE = "rounded-3xl bg-black/[0.03] transition hover:bg-black/[0.05]";

function APropos() {
  const contacts = [
    { Icone: Phone, libelle: SITALY_PHONE_DISPLAY, url: `tel:${SITALY_PHONE}`, sombre: true },
    { Icone: Mail, libelle: "contact@sitaly.fr", url: "mailto:contact@sitaly.fr" },
    { Icone: Linkedin, libelle: "LinkedIn", url: LINKEDIN_URL, externe: true },
    {
      Icone: Instagram,
      libelle: "Instagram",
      url: "https://instagram.com/sitaly.fr",
      externe: true,
    },
  ];

  return (
    <div className="min-h-screen bg-white text-[#09090b]">
      <SiteChrome>
        <section className="px-4 pt-16 pb-12 sm:px-6 sm:pt-24">
          <div className="mx-auto max-w-4xl text-center">
            <div className="text-sm font-medium text-brand-ink">À propos</div>
            <h1 className="titre-produit mt-3 text-[2.5rem] sm:text-6xl lg:text-7xl">
              Le site des petites entreprises, écrit par l'IA
            </h1>
            <p className={`mx-auto mt-6 max-w-2xl text-lg leading-7 ${TEXTE_GRIS}`}>
              Sitaly est une application française pour les artisans, les indépendants et les TPE.
              Vous décrivez votre activité en une phrase, l'IA écrit votre site en une minute
              environ, et vous le relisez avant de le publier.
            </p>
          </div>
        </section>

        <section className="px-4 pb-20 sm:px-6">
          <div className="mx-auto max-w-4xl rounded-3xl bg-black/[0.03] p-8 sm:p-12">
            <div className="text-sm font-medium text-brand-ink">Qui est derrière</div>
            <h2 className="titre-produit mt-3 text-3xl sm:text-5xl">
              Teddy Vidal, fondateur de Sitaly
            </h2>
            <div className={`mt-6 max-w-2xl space-y-4 text-lg leading-7 ${TEXTE_GRIS}`}>
              <p>
                J'ai créé des sites à la main pour des artisans et des petites entreprises. Sitaly
                fait ce travail en une minute environ, et vous gardez la main sur le résultat.
              </p>
              <p>
                Je suis basé à Paris. Une question sur l'application ? Appelez-moi ou écrivez-moi.
              </p>
            </div>
            <div className="mt-8 flex flex-wrap gap-3">
              {contacts.map(({ Icone, libelle, url, externe, sombre }) => (
                <a
                  key={libelle}
                  href={url}
                  {...(externe ? { target: "_blank", rel: "noopener noreferrer" } : {})}
                  className={`inline-flex min-h-11 items-center gap-2 rounded-full px-5 text-sm font-semibold transition ${
                    sombre
                      ? "bg-[#09090b] text-white hover:bg-black/80"
                      : "bg-black/[0.06] hover:bg-black/[0.1]"
                  }`}
                >
                  <Icone className="h-4 w-4" />
                  {libelle}
                </a>
              ))}
            </div>
          </div>
        </section>

        <section className="px-4 pb-20 sm:px-6">
          <div className="mx-auto max-w-4xl text-center">
            <h2 className="titre-produit text-[2.15rem] sm:text-5xl lg:text-6xl">
              Une seule application
            </h2>
            <p className={`mx-auto mt-5 max-w-xl text-lg ${TEXTE_GRIS}`}>
              Votre site, vos devis et factures, vos rendez-vous, vos avis Google et votre
              référencement, au même endroit.
            </p>
          </div>
          <div className="mx-auto mt-12 grid max-w-6xl gap-4 sm:grid-cols-2 lg:grid-cols-4">
            <Link
              to="/creer-son-site-ia/"
              className={`group flex flex-col justify-between p-6 ${CARTE}`}
            >
              <div>
                <h3 className="titre-produit text-xl">Création de site</h3>
                <p className={`mt-2 text-sm leading-6 ${TEXTE_GRIS}`}>
                  Votre site écrit par l'IA, à partir d'une phrase.
                </p>
              </div>
              <ArrowRight className="mt-5 h-4 w-4 transition group-hover:translate-x-0.5" />
            </Link>
            {PRODUITS.map((p) => (
              <Link
                key={p.id}
                to="/produits/$id/"
                params={{ id: p.id }}
                className={`group flex flex-col justify-between p-6 ${CARTE}`}
              >
                <div>
                  <h3 className="titre-produit text-xl">{p.nom}</h3>
                  <p className={`mt-2 text-sm leading-6 ${TEXTE_GRIS}`}>{p.menuDesc}</p>
                </div>
                <ArrowRight className="mt-5 h-4 w-4 transition group-hover:translate-x-0.5" />
              </Link>
            ))}
          </div>
          <p className={`mx-auto mt-8 max-w-2xl text-center ${TEXTE_GRIS}`}>
            Vous préférez qu'on s'occupe de tout ? L'équipe Sitaly peut créer et suivre votre site à
            votre place, ou installer des{" "}
            <Link
              to="/agents-ia/"
              className="font-semibold text-[#09090b] underline underline-offset-2"
            >
              agents IA sur mesure
            </Link>
            .
          </p>
        </section>

        <section className="px-4 pb-20 sm:px-6">
          <div className="mx-auto max-w-4xl text-center">
            <h2 className="titre-produit text-[2.15rem] sm:text-5xl">Des sites déjà en ligne</h2>
            <p className={`mx-auto mt-5 max-w-xl text-lg ${TEXTE_GRIS}`}>
              Des sites que j'ai conçus à la main, avant l'application.
            </p>
          </div>
          <div className="mx-auto mt-12 grid max-w-6xl gap-4 lg:grid-cols-3">
            {REALISATIONS.map((r) => (
              <Link
                key={r.slug}
                to="/realisations/$slug/"
                params={{ slug: r.slug }}
                className={`group flex items-center justify-between gap-6 p-6 ${CARTE}`}
              >
                <span>
                  <span className="titre-produit block text-xl">{r.client}</span>
                  <span className={`mt-1 block text-sm ${TEXTE_GRIS}`}>
                    {r.metier} · {r.zone}
                  </span>
                </span>
                <ArrowRight className="h-4 w-4 shrink-0 transition group-hover:translate-x-0.5" />
              </Link>
            ))}
          </div>
        </section>

        <section className="px-4 pb-16 sm:px-6">
          <div
            className={`mx-auto max-w-2xl space-y-4 text-center text-sm leading-6 ${TEXTE_GRIS}`}
          >
            <p>
              Sitaly est le nom commercial de Teddy Vidal, entrepreneur individuel, immatriculé sous
              le numéro SIREN 833 848 831. Les mentions complètes figurent dans les{" "}
              <Link to="/mentions-legales/" className="font-semibold underline underline-offset-2">
                mentions légales
              </Link>
              .
            </p>
            <BadgeFabriqueDuNet />
          </div>
        </section>

        <section className="px-4 pt-8 pb-28 sm:px-6">
          <div className="mx-auto max-w-4xl text-center">
            <h2 className="titre-produit text-[2.15rem] sm:text-5xl lg:text-6xl">
              Créez votre site en une phrase
            </h2>
            <p className={`mx-auto mt-5 max-w-xl text-lg ${TEXTE_GRIS}`}>
              C'est gratuit, sans carte bancaire.
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
