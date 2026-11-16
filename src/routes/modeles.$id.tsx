import { createFileRoute, Link, notFound } from "@tanstack/react-router";
import { useEffect, useState } from "react";
import { ArrowRight, Check, ChevronRight } from "lucide-react";
import { SiteChrome } from "@/components/SiteChrome";
import { ArticlesALire } from "@/components/ArticlesALire";
import {
  BOUTON_NOIR,
  CARTE,
  Confiance,
  TEXTE_GRIS,
  TitreSection,
  lienCreation,
} from "@/components/produit/Produit";
import { MiniSite, photo } from "@/components/produit/Vitrine";
import { CartePilier } from "@/components/pilier/Pilier";
import { PILIER_SITE } from "@/data/piliers";
import { deMetier, getModele, MODELES } from "@/data/modeles";
import { getProduit } from "@/data/produits";
import { METIERS_MODELES, phraseSansVille } from "@/lib/modeles-metiers";
import { BASE_URL } from "@/lib/sitemap";
import { APP_REF } from "@/data/offres";

/**
 * La page d'un modèle (31 octobre 2026, étoffée le 9 novembre) : le site que
 * l'IA prépare pour un métier. Elle vise la recherche « site internet » suivie
 * du métier, et porte ce qui est propre à ce métier : ce que son client veut
 * savoir, les sections du site, trois conseils, les outils utiles et ses
 * questions. Le bouton ouvre l'application avec le métier déjà écrit.
 */

/**
 * Le bouton qui suit le visiteur sur téléphone (16 novembre 2026). Mesure à
 * 390 px : la page fait 10 943 px, et entre le bouton du héros (y = 413) et le
 * suivant (y = 8 741) il n'y avait rien à toucher pendant dix écrans. Sur
 * ordinateur le bouton de l'en-tête reste visible, donc la barre s'arrête à
 * `md`. Elle garde le lien du héros : la phrase du métier survit au défilement.
 */
function BarreModele({ lien, bouton }: { lien: string; bouton: string }) {
  const [montre, setMontre] = useState(false);
  useEffect(() => {
    const maj = () => setMontre(window.scrollY > 600);
    maj();
    window.addEventListener("scroll", maj, { passive: true });
    return () => window.removeEventListener("scroll", maj);
  }, []);
  return (
    <div
      className={`fixed inset-x-0 z-40 px-3 transition-all duration-300 md:hidden ${montre ? "translate-y-0 opacity-100" : "pointer-events-none translate-y-6 opacity-0"}`}
      style={{ bottom: "calc(var(--bandeau-cookies, 0px) + 0.75rem)" }}
      aria-hidden={!montre}
    >
      <a
        href={lien}
        tabIndex={montre ? 0 : -1}
        className="flex min-h-12 items-center justify-center gap-2 rounded-2xl bg-black/90 px-5 text-[15px] font-medium text-white shadow-[0_20px_50px_-15px_rgba(0,0,0,0.45)] backdrop-blur"
      >
        {bouton}
        <ArrowRight className="h-4 w-4" aria-hidden="true" />
      </a>
    </div>
  );
}

const ETAPES = [
  {
    titre: "Décrivez votre activité",
    texte: "Une phrase suffit : votre métier, votre ville, ce que vous proposez.",
  },
  {
    titre: "L'IA crée votre site",
    texte:
      "Textes, mise en page, couleurs et photo d'accueil, en une minute environ. Vous voyez le résultat avant de créer un compte.",
  },
  {
    titre: "Retouchez et publiez",
    texte: "Vous écrivez ce que vous voulez changer, puis vous publiez d'un clic.",
  },
];

export const Route = createFileRoute("/modeles/$id")({
  loader: ({ params }) => {
    const modele = getModele(params.id);
    const metier = METIERS_MODELES.find((m) => m.id === params.id);
    if (!modele || !metier) throw notFound();
    return { modele, metier };
  },
  head: ({ loaderData }) => {
    if (!loaderData) return {};
    const { modele, metier } = loaderData;
    const url = `${BASE_URL}/modeles/${modele.id}/`;
    // Google coupe un titre au-delà de 60 signes et une description au-delà de 160 : la version longue d'abord, si elle tient.
    const titre =
      [
        `Site internet pour ${modele.nom}, gratuit avec l'IA | Sitaly`,
        `Site internet pour ${modele.nom}, gratuit | Sitaly`,
      ].find((t) => t.length <= 60) ?? `Site internet pour ${modele.nom} | Sitaly`;
    // La fin de la description varie d'un modèle à l'autre (audit SEO du
    // 14 novembre 2026 : 20 descriptions sur 22 finissaient par la même phrase).
    const rang = MODELES.findIndex((m) => m.id === modele.id);
    const fins = [
      "Gratuit, créé par l'IA en une minute.",
      "Écrit par l'IA, gratuit pour commencer.",
      "En ligne en une minute, sans carte bancaire.",
    ];
    const description =
      [fins[rang % fins.length], ...fins, "Gratuit, créé par l'IA."]
        .map((fin) => `${modele.intro} ${fin}`)
        .find((d) => d.length <= 160) ?? modele.intro;
    const nomAffiche = modele.nom.charAt(0).toUpperCase() + modele.nom.slice(1);
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
              { "@type": "ListItem", position: 3, name: nomAffiche, item: url },
            ],
          }),
        },
        {
          type: "application/ld+json",
          children: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "WebPage",
            "@id": `${url}#page`,
            url,
            name: titre,
            description,
            inLanguage: "fr-FR",
            isPartOf: { "@id": `${BASE_URL}/#website` },
            about: APP_REF,
            primaryImageOfPage: `${BASE_URL}${photo(metier.id)}`,
          }),
        },
        {
          type: "application/ld+json",
          children: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "FAQPage",
            mainEntity: modele.faq.map((f) => ({
              "@type": "Question",
              name: f.q,
              acceptedAnswer: { "@type": "Answer", text: f.a },
            })),
          }),
        },
      ],
    };
  },
  component: PageModele,
});

function PageModele() {
  const { modele, metier } = Route.useLoaderData();
  const nomDe = (id: string) => MODELES.find((x) => x.id === id)?.nom ?? id;
  const familleDe = (id: string) => MODELES.find((x) => x.id === id)?.famille;
  // Les modèles voisins d'abord : la page d'un maçon propose ceux du bâtiment.
  const candidats = METIERS_MODELES.filter((m) => m.id !== metier.id);
  const autres = [
    ...candidats.filter((m) => familleDe(m.id) === modele.famille),
    ...candidats.filter((m) => familleDe(m.id) !== modele.famille),
  ].slice(0, 6);
  const outils = modele.outils.flatMap((id) => {
    const produit = getProduit(id);
    return produit ? [produit] : [];
  });
  // Sans phrase d'exemple (artisan, auto-entrepreneur), le visiteur écrit la sienne dans l'application.
  const lien = metier.phrase ? lienCreation(phraseSansVille(metier.phrase)) : lienCreation();
  const bouton = metier.phrase ? "Utiliser ce modèle" : "Créer mon site";

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
                <a href={lien} className={`${BOUTON_NOIR} mt-8 px-6 py-3.5 text-base`}>
                  {bouton}
                  <ArrowRight className="h-4 w-4" />
                </a>
                <p className={`mt-3 text-base sm:text-sm ${TEXTE_GRIS}`}>
                  Gratuit, sans carte bancaire. L'IA adapte le modèle à votre activité.
                </p>
              </div>

              <div className="relative">
                {/* Image du premier écran : chargée en priorité, en 768 px sur
                    téléphone (audit du 14 novembre 2026 : 1 536 px affichés à
                    380 px faisaient monter le LCP mobile à 3,1 s). */}
                <img
                  src={photo(metier.id)}
                  srcSet={`${photo(metier.id, 768)} 768w, ${photo(metier.id, 1024)} 1024w, ${photo(metier.id)} 1536w`}
                  sizes="(min-width: 1024px) 560px, calc(100vw - 32px)"
                  alt={`Photo d'illustration pour un site ${deMetier(modele.nom)}`}
                  width={1536}
                  height={864}
                  fetchPriority="high"
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

        <section className="px-4 pt-16 pb-4 sm:px-6 sm:pt-24">
          <div className="mx-auto max-w-3xl text-center">
            <div className="text-sm font-medium text-brand-ink">Avant le premier contact</div>
            <h2 className="titre-produit mt-3 text-[2rem] sm:text-4xl">
              Ce que vos clients veulent savoir
            </h2>
            <p className={`mt-6 text-lg leading-8 ${TEXTE_GRIS}`}>{modele.attentes}</p>
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

        <section className="px-4 pb-20 sm:px-6 sm:pb-24">
          <div className="mx-auto max-w-6xl">
            <TitreSection
              surtitre="Comment ça marche"
              titre={`Votre site ${deMetier(modele.nom)}, en trois étapes`}
            />
            <ol className="mt-12 grid gap-4 md:grid-cols-3">
              {ETAPES.map((e, k) => (
                <li key={e.titre} className={`${CARTE} p-6`}>
                  <div className="text-sm font-semibold text-brand-ink">Étape {k + 1}</div>
                  <div className="mt-3 text-lg font-semibold">{e.titre}</div>
                  <p className={`mt-1 ${TEXTE_GRIS}`}>{e.texte}</p>
                </li>
              ))}
            </ol>
          </div>
        </section>

        <section className="px-4 py-20 sm:px-6 sm:py-24" style={{ background: metier.couleur }}>
          <div className="mx-auto max-w-6xl text-white">
            <div className="mx-auto max-w-3xl text-center">
              <div className="text-sm font-medium" style={{ color: metier.accent }}>
                Conseils
              </div>
              <h2 className="titre-produit mt-3 text-[2.15rem] text-white sm:text-5xl">
                Un bon site {deMetier(modele.nom)}
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

        {outils.length > 0 && (
          <section className="px-4 pt-20 sm:px-6 sm:pt-24">
            <div className="mx-auto max-w-6xl">
              <TitreSection
                surtitre="Avec votre site"
                titre="Les outils qui vont avec"
                sousTitre="Ils sont dans la même application que votre site."
              />
              <div className="mt-12 grid gap-4 md:grid-cols-3">
                {outils.map((p) => (
                  <Link
                    key={p.id}
                    to="/produits/$id/"
                    params={{ id: p.id }}
                    className={`${CARTE} group flex flex-col p-6 transition hover:bg-black/[0.05]`}
                  >
                    <div className="text-lg font-semibold">{p.nom}</div>
                    <p className={`mt-1 ${TEXTE_GRIS}`}>{p.menuDesc}</p>
                    <span className="mt-auto inline-flex items-center gap-1.5 pt-5 text-sm font-semibold">
                      En savoir plus
                      <ArrowRight className="h-4 w-4 transition group-hover:translate-x-0.5" />
                    </span>
                  </Link>
                ))}
              </div>
            </div>
          </section>
        )}

        <section className="px-4 py-20 sm:px-6 sm:py-24">
          <div className="mx-auto max-w-3xl">
            <TitreSection
              surtitre="Questions"
              titre={`Vos questions sur un site ${deMetier(modele.nom)}`}
            />
            {/* Le libellé porte le rembourrage, pas la carte : sans cela la
                zone à toucher ne fait que 24 px de haut sur téléphone, sous le
                minimum de 44 px (mesure à 390 px, 16 novembre 2026). */}
            <div className="mt-10 space-y-3">
              {modele.faq.map((f) => (
                <details key={f.q} className={`${CARTE} group`}>
                  <summary className="flex min-h-14 cursor-pointer list-none items-center justify-between gap-4 p-5 font-semibold marker:content-none">
                    {f.q}
                    <span className="text-xl leading-none transition group-open:rotate-45">+</span>
                  </summary>
                  <p className={`px-5 pb-5 ${TEXTE_GRIS}`}>{f.a}</p>
                </details>
              ))}
            </div>
            <p className={`mt-8 text-center ${TEXTE_GRIS}`}>
              Le détail des formules est sur la page{" "}
              <Link to="/tarifs/" className="font-semibold text-black underline underline-offset-4">
                Tarifs
              </Link>
              .
            </p>
          </div>
        </section>

        {/* Les guides du blog pour ce métier (audit SEO du 14 novembre 2026) :
            les modèles renvoient vers le blog, le blog vers les modèles. */}
        <section className="px-4 pb-16 sm:px-6">
          <div className="mx-auto max-w-6xl">
            <h2 className="titre-produit text-3xl sm:text-4xl">Guides pour votre métier</h2>
            <div className="mt-8">
              <ArticlesALire
                slugs={guidesDuMetier(modele.id)}
                titre=""
                classeCarte="rounded-3xl bg-black/[0.03] p-6 transition hover:bg-black/[0.05]"
                classeLien="text-black"
              />
            </div>
            {/* Le guide pilier (16 novembre 2026) : chaque modèle y mène. */}
            <div className="mt-3">
              <CartePilier pilier={PILIER_SITE} />
            </div>
          </div>
        </section>

        <section className="px-4 pb-20 sm:px-6 sm:pb-24">
          <div className="mx-auto max-w-6xl">
            <div className="flex items-end justify-between gap-4">
              <h2 className="titre-produit text-3xl sm:text-4xl">Autres modèles</h2>
              <Link
                to="/modeles/"
                className="inline-flex min-h-11 items-center text-sm font-semibold hover:underline sm:min-h-0"
              >
                Tous les modèles
              </Link>
            </div>
            <div className="mt-8 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
              {autres.map((m) => (
                <Link
                  key={m.id}
                  to="/modeles/$id/"
                  params={{ id: m.id }}
                  className="group overflow-hidden rounded-3xl bg-black/[0.03] transition hover:bg-black/[0.05]"
                >
                  <img
                    src={photo(m.id, 768)}
                    alt={`Photo d'illustration pour un site ${deMetier(nomDe(m.id))}`}
                    loading="lazy"
                    width={768}
                    height={432}
                    className="aspect-[16/10] w-full object-cover"
                  />
                  <div className="flex items-center justify-between p-5">
                    <span className="font-semibold first-letter:uppercase">
                      Site internet pour {nomDe(m.id)}
                    </span>
                    <ArrowRight className="h-4 w-4 shrink-0 transition group-hover:translate-x-0.5" />
                  </div>
                </Link>
              ))}
            </div>
          </div>
        </section>

        <section className="px-4 pt-4 pb-28 sm:px-6">
          <div className={`${CARTE} mx-auto max-w-4xl px-6 py-14 text-center`}>
            <h2 className="titre-produit text-[2rem] sm:text-5xl">
              Votre site {deMetier(modele.nom)}, dans une minute
            </h2>
            <p className={`mx-auto mt-4 max-w-xl text-lg ${TEXTE_GRIS}`}>
              L'IA part de ce modèle et l'écrit pour votre activité, votre ville et vos services.
            </p>
            <a href={lien} className={`${BOUTON_NOIR} mt-8 px-6 py-3.5 text-base`}>
              {bouton}
              <ArrowRight className="h-4 w-4" />
            </a>
            <Confiance />
          </div>
        </section>
      </SiteChrome>
      <BarreModele lien={lien} bouton={bouton} />
    </div>
  );
}

/**
 * Trois guides par modèle : un article propre au métier quand il existe, puis
 * les guides de base pour créer son site et être trouvé.
 */
const GUIDES_PAR_METIER: Record<string, string> = {
  plombier: "site-internet-plombier-electricien",
  electricien: "site-internet-plombier-electricien",
  osteopathe: "trouver-patients-osteopathe",
  coach: "trouver-clients-coach-sportif",
  consultant: "trouver-clients-consultant-independant",
  avocat: "trouver-clients-avocat",
  formateur: "trouver-clients-consultant-independant",
  artisan: "logiciel-devis-artisan-choisir",
  "auto-entrepreneur": "mentions-legales-site-internet",
  couvreur: "logiciel-devis-artisan-choisir",
  macon: "logiciel-devis-artisan-choisir",
  menuisier: "logiciel-devis-artisan-choisir",
  peintre: "logiciel-devis-artisan-choisir",
  paysagiste: "recolter-avis-google-artisan",
  coiffeuse: "prise-rendez-vous-en-ligne-guide",
  estheticienne: "prise-rendez-vous-en-ligne-guide",
  restaurant: "fiche-google-business-profile-artisan",
  boulanger: "fiche-google-business-profile-artisan",
  fleuriste: "fiche-google-business-profile-artisan",
  traiteur: "recolter-avis-google-artisan",
  photographe: "pages-indispensables-site-vitrine",
  vtc: "apparaitre-sur-google",
  nettoyage: "recolter-avis-google-artisan",
};

function guidesDuMetier(id: string): string[] {
  const base = [
    "creation-site-internet-artisan-guide",
    "apparaitre-sur-google",
    "prix-site-internet",
  ];
  const propre = GUIDES_PAR_METIER[id];
  return (propre ? [propre, ...base.filter((s) => s !== propre)] : base).slice(0, 3);
}
