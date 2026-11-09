import { createFileRoute, Link } from "@tanstack/react-router";
import { directiveRobots } from "@/lib/indexation";
import { ArrowRight, ClipboardCheck, FileText, Globe, Lightbulb, Scale } from "lucide-react";
import { SiteChrome } from "@/components/SiteChrome";
import {
  BOUTON_NOIR,
  CARTE,
  Confiance,
  TEXTE_GRIS,
  lienCreation,
} from "@/components/produit/Produit";

/**
 * La page des outils gratuits. Réécrite le 9 novembre 2026 pour ceux qui
 * lancent leur activité, et revenue dans l'index le même jour
 * (src/lib/indexation.ts). Le calculateur Google Ads, outil de l'ancienne
 * agence, reste en ligne sans figurer ici.
 */

const URL = "https://sitaly.fr/outils/";
const TITLE =
  "Outils gratuits pour lancer son entreprise : nom, domaine, devis, mentions légales | Sitaly";
const DESCRIPTION =
  "Cinq outils gratuits et sans inscription pour les créateurs d'entreprise : trouver un nom, vérifier un nom de domaine, faire un devis en PDF, écrire ses mentions légales et auditer sa fiche Google.";

const OUTILS = [
  {
    to: "/outils/generateur-nom-entreprise/" as const,
    icon: Lightbulb,
    titre: "Générateur de nom d'entreprise",
    desc: "Décrivez votre activité : l'IA propose douze noms et vérifie le .fr de chacun.",
  },
  {
    to: "/outils/verifier-nom-de-domaine/" as const,
    icon: Globe,
    titre: "Vérificateur de nom de domaine",
    desc: "Votre nom est-il libre en .fr et en .com ? Les registres officiels répondent en une seconde.",
  },
  {
    to: "/outils/generateur-devis-gratuit/" as const,
    icon: FileText,
    titre: "Générateur de devis",
    desc: "Vos lignes, vos prix : un devis mis en page avec ses mentions obligatoires, à enregistrer en PDF.",
  },
  {
    to: "/outils/generateur-mentions-legales/" as const,
    icon: Scale,
    titre: "Générateur de mentions légales",
    desc: "Un formulaire, et le texte à copier sur votre site, pour une entreprise individuelle ou une société.",
  },
  {
    to: "/outils/audit-fiche-google/" as const,
    icon: ClipboardCheck,
    titre: "Audit de fiche Google",
    desc: "Vingt questions sur votre fiche Google Business Profile, un score sur 100 et les corrections à faire d'abord.",
  },
];

export const Route = createFileRoute("/outils/")({
  head: () => ({
    meta: [
      { title: TITLE },
      { name: "robots", content: directiveRobots(new globalThis.URL(URL).pathname) },
      { name: "description", content: DESCRIPTION },
      { property: "og:title", content: TITLE },
      { property: "og:description", content: DESCRIPTION },
      { property: "og:url", content: URL },
    ],
    links: [{ rel: "canonical", href: URL }],
    scripts: [
      {
        type: "application/ld+json",
        children: JSON.stringify({
          "@context": "https://schema.org",
          "@type": "CollectionPage",
          name: "Outils gratuits Sitaly",
          description: DESCRIPTION,
          url: URL,
          hasPart: OUTILS.map((o) => ({
            "@type": "WebApplication",
            name: o.titre,
            url: `https://sitaly.fr${o.to}`,
            applicationCategory: "BusinessApplication",
            offers: { "@type": "Offer", price: "0", priceCurrency: "EUR" },
          })),
        }),
      },
    ],
  }),
  component: OutilsIndex,
});

function OutilsIndex() {
  return (
    <div className="min-h-screen bg-white text-[#09090b]">
      <SiteChrome>
        <section className="px-4 pt-14 pb-10 sm:px-6 sm:pt-20">
          <div className="mx-auto max-w-4xl text-center">
            <div className="text-sm font-medium text-brand-ink">Outils gratuits</div>
            <h1 className="titre-produit mt-3 text-[2.4rem] sm:text-6xl lg:text-7xl">
              Cinq outils pour lancer votre entreprise
            </h1>
            <p className={`mx-auto mt-6 max-w-2xl text-lg leading-7 ${TEXTE_GRIS}`}>
              Un nom, une adresse web, un premier devis, des mentions légales. Chaque outil s'ouvre
              sans compte et ne demande pas vos coordonnées.
            </p>
          </div>
        </section>

        <section className="px-4 pb-20 sm:px-6">
          <div className="mx-auto grid max-w-6xl gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {OUTILS.map((o) => {
              const Icon = o.icon;
              return (
                <Link
                  key={o.to}
                  to={o.to}
                  className={`${CARTE} group flex flex-col p-7 transition hover:bg-black/[0.05]`}
                >
                  <div className="grid h-11 w-11 place-items-center rounded-2xl bg-white text-black/80">
                    <Icon className="h-5 w-5" />
                  </div>
                  <h2 className="mt-5 text-2xl font-semibold tracking-tight">{o.titre}</h2>
                  <p className={`mt-2 flex-1 ${TEXTE_GRIS}`}>{o.desc}</p>
                  <span className="mt-6 inline-flex items-center gap-2 text-sm font-semibold">
                    Ouvrir l'outil
                    <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
                  </span>
                </Link>
              );
            })}
          </div>
        </section>

        <section className="px-4 pt-8 pb-28 sm:px-6">
          <div className={`${CARTE} mx-auto max-w-4xl px-6 py-14 text-center`}>
            <h2 className="titre-produit text-[2rem] sm:text-5xl">Et votre site internet ?</h2>
            <p className={`mx-auto mt-4 max-w-xl text-lg ${TEXTE_GRIS}`}>
              Décrivez votre activité en une phrase. Sitaly écrit votre site et vous le montre en
              une minute, avant même de créer un compte.
            </p>
            <a href={lienCreation()} className={`${BOUTON_NOIR} mt-8 px-6 py-3.5 text-base`}>
              Créer mon site <ArrowRight className="h-4 w-4" />
            </a>
            <Confiance />
          </div>
        </section>
      </SiteChrome>
    </div>
  );
}
