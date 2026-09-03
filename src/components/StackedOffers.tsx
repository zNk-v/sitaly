import { Link } from "@tanstack/react-router";
import { ArrowRight } from "lucide-react";
import { SectionHeader } from "@/components/SectionHeader";
import { MaquetteAgent, MaquetteConversation, MaquetteRecherche } from "@/components/OfferMockups";

import captureSite from "@/assets/real-lafleur-1200.jpg";
import captureSitePetite from "@/assets/real-lafleur-720.jpg";

/**
 * Les quatre leviers, en cartes qui s'empilent au défilement.
 *
 * Deux règles font tenir l'effet, et il casse si l'une saute :
 *
 * 1. La bande de titre en haut de chaque panneau mesure exactement la même
 *    hauteur que l'écart entre deux décalages de collage (BANDE). En
 *    s'empilant, chaque panneau laisse donc voir la bande du précédent, et
 *    seulement elle. C'est ce qui rend l'empilement lisible : sans bande, on
 *    ne comprend pas qu'on défile dans une pile.
 * 2. Aucun ancêtre ne doit porter `overflow: hidden`, sinon `position: sticky`
 *    est neutralisé sans le moindre avertissement.
 *
 * linov.fr obtient le même mécanisme via le sticky JavaScript d'Elementor.
 * Ici c'est du CSS natif : ni écouteur de défilement, ni recalcul de mise en page.
 */

/** Hauteur de la bande de titre, en rem. Voir la règle 1 ci-dessus. */
const BANDE = 4.5;
/** Décalage du premier panneau, sous le bandeau collant de 4rem. */
const DEPART = 5;

type Levier = {
  cle: string;
  categorie: string;
  titre: React.ReactNode;
  texte: string;
  points: readonly string[];
  cta: { label: string; to?: string; href?: string };
  maquette: React.ReactNode;
};

const LEVIERS: Levier[] = [
  {
    cle: "site",
    categorie: "Site internet",
    titre: (
      <>
        Un site qui travaille <span className="accent-word">pendant que vous travaillez</span>
      </>
    ),
    texte:
      "Un site sur mesure livré en 48h, puis entretenu : hébergement, maintenance, modifications, fiche Google Business et référencement local. Vous ne touchez jamais à la technique.",
    points: ["Livré en 48h", "Référencement local", "Modifications incluses"],
    cta: { label: "Voir les réalisations", to: "/realisations/" },
    /* Ici la maquette est une vraie capture d'un site livré : sur cette offre,
       la meilleure illustration est la preuve elle-même. */
    maquette: (
      <div className="flex h-full w-full items-center justify-center p-6 sm:p-8">
        <div className="w-full max-w-[460px]">
          <div className="zoom-frame overflow-hidden rounded-2xl border border-border shadow-elevated">
            <img
              src={captureSitePetite}
              srcSet={`${captureSitePetite} 720w, ${captureSite} 1200w`}
              sizes="(min-width: 1024px) 40vw, 90vw"
              alt="Page d'accueil du site de Lafleur Toiture, livré par Sitaly"
              loading="lazy"
              decoding="async"
              className="block h-auto w-full"
            />
          </div>
          <p className="mt-3 text-center text-xs text-muted-foreground">
            Lafleur Toiture, couvreur en Essonne. Site réellement en ligne.
          </p>
        </div>
      </div>
    ),
  },
  {
    cle: "ads",
    categorie: "Google Ads",
    titre: (
      <>
        Être en haut de Google <span className="accent-word">dès aujourd'hui</span>
      </>
    ),
    texte:
      "Le référencement naturel demande des mois. La publicité vous place devant les gens qui cherchent vos services, dans votre zone, pendant que votre visibilité naturelle se construit.",
    points: ["Ciblage de votre zone", "Suivi des appels et formulaires", "Reporting mensuel"],
    cta: { label: "Voir l'offre Google Ads", to: "/acquisition/" },
    maquette: <MaquetteRecherche />,
  },
  {
    cle: "chatgpt",
    categorie: "ChatGPT Ads",
    titre: (
      <>
        Exister quand un client <span className="accent-word">décrit son besoin à une IA</span>
      </>
    ),
    texte:
      "De plus en plus de décisions d'achat commencent par une conversation plutôt que par une requête. On cartographie les intentions, on écrit les messages, on mesure avant de dépenser.",
    points: [
      "Cartographie des intentions",
      "Tracking avant la première dépense",
      "Optimisation continue",
    ],
    cta: { label: "Découvrir ChatGPT Ads", href: "/chatgpt-ads/" },
    maquette: <MaquetteConversation />,
  },
  {
    cle: "agents",
    categorie: "Agents IA",
    titre: (
      <>
        Ne plus jamais <span className="accent-word">rater un appel</span>
      </>
    ),
    texte:
      "Des agents installés clé en main qui répondent aux demandes entrantes, qualifient, proposent des rendez-vous et relancent les devis restés sans réponse. Vous ne configurez rien.",
    points: ["Standardiste qui ne rate rien", "Prise de rendez-vous", "Relance des devis"],
    cta: { label: "Découvrir les agents", to: "/agents-ia/" },
    maquette: <MaquetteAgent />,
  },
];

export function StackedOffers() {
  return (
    <section id="offre" className="pt-20 pb-8 sm:pt-28 sm:pb-10">
      <div className="mx-auto max-w-7xl px-4 sm:px-6">
        <SectionHeader
          index="03"
          eyebrow="Nos offres"
          title={
            <>
              Des outils pensés pour <span className="accent-word">vos enjeux</span>
            </>
          }
          subtitle="Quatre leviers, combinables. Vous en prenez un, deux ou les quatre. Chaque périmètre est chiffré après l'appel découverte, sur votre activité réelle."
        />

        {/* La marge basse donne au dernier panneau le temps de rester collé
            pendant qu'on finit de le lire. */}
        {/* La réserve basse laisse la dernière carte collée le temps qu'on la
          lise. Elle valait 22vh : 266 px de vide séparaient alors la dernière
          carte de la section suivante, mesurés sur le rendu. */}
        <div className="mt-14 pb-[9vh]">
          {LEVIERS.map((l, i) => (
            <article
              key={l.cle}
              style={{ top: `${DEPART + i * BANDE}rem` }}
              className="sticky mb-8 overflow-hidden rounded-3xl border border-border bg-card shadow-elevated"
            >
              {/* Bande de superposition : c'est elle qui reste visible quand le
                  panneau suivant recouvre celui-ci. Hauteur = BANDE. */}
              <div
                style={{ height: `${BANDE}rem` }}
                className="flex items-center justify-between gap-4 border-b border-border bg-paper-sunk px-6 sm:px-8"
              >
                <div className="flex min-w-0 items-baseline gap-3 sm:gap-4">
                  <span className="rail-num font-display text-sm font-bold text-brand-ink">
                    {String(i + 1).padStart(2, "0")}
                  </span>
                  <h3 className="truncate font-display text-xl font-extrabold tracking-tight sm:text-2xl">
                    {l.categorie}
                  </h3>
                </div>
                <span className="hidden shrink-0 text-xs text-muted-foreground sm:block">
                  {i + 1} / {LEVIERS.length}
                </span>
              </div>

              <div className="grid lg:grid-cols-[1.05fr_1fr]">
                <div className="p-6 sm:p-10 lg:p-12">
                  <p
                    data-split
                    className="font-display text-[clamp(1.55rem,2.4vw,2.3rem)] font-extrabold leading-[1.1] tracking-[-0.035em]"
                  >
                    {l.titre}
                  </p>

                  <p className="measure mt-5 text-muted-foreground">{l.texte}</p>

                  <ul className="mt-7 flex flex-wrap gap-2">
                    {l.points.map((p) => (
                      <li
                        key={p}
                        className="rounded-full border border-border px-3 py-1.5 text-sm text-foreground/80"
                      >
                        {p}
                      </li>
                    ))}
                  </ul>

                  {l.cta.to ? (
                    <Link to={l.cta.to} className="bouton mt-9 px-7 py-3.5">
                      {l.cta.label}
                      <ArrowRight className="bouton-fleche h-5 w-5" />
                    </Link>
                  ) : (
                    /* Page statique hors routeur React : lien classique. */
                    <a href={l.cta.href} className="bouton mt-9 px-7 py-3.5">
                      {l.cta.label}
                      <ArrowRight className="bouton-fleche h-5 w-5" />
                    </a>
                  )}
                </div>

                <div className="border-t border-border bg-paper-sunk/60 lg:border-l lg:border-t-0">
                  {l.maquette}
                </div>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
