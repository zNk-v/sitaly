import { Link } from "@tanstack/react-router";
import { ArrowRight } from "lucide-react";
import { SectionHeader } from "@/components/SectionHeader";
import {
  MaquetteAgent,
  MaquetteConversation,
  MaquetteRecherche,
  MaquetteSite,
} from "@/components/OfferMockups";

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

/* La bande et le décalage vivent en CSS, dans `--bande` et `--depart` : ils
   changent au format, et la règle 1 impose qu'ils changent ensemble. Le rang
   de la carte est passé en variable, la position s'en déduit. Voir la frise
   `.offre-carte` dans la feuille de style. */

export type Levier = {
  cle: string;
  categorie: string;
  titre: React.ReactNode;
  texte: React.ReactNode;
  points: readonly string[];
  cta: { label: string; to?: string; href?: string };
  maquette: React.ReactNode;
};

/* L'ordre suit l'offre depuis le 28 septembre 2026 : les agents IA en tête,
   la publicité ensuite, le site en porte d'entrée. */
export const LEVIERS: Levier[] = [
  {
    cle: "agents",
    categorie: "Agents IA",
    titre: (
      <>
        Chaque demande reçue, <span className="accent-word">traitée</span>
      </>
    ),
    texte:
      "Des agents installés et pilotés par Sitaly, qui décrochent, qualifient, proposent des rendez-vous et relancent les devis restés sans réponse. Ils se présentent comme une IA et passent la main à votre équipe quand il le faut.",
    points: ["Accueil téléphonique", "Prise de rendez-vous", "Relance des devis"],
    cta: { label: "Découvrir les agents", to: "/agents-ia/" },
    maquette: <MaquetteAgent />,
  },
  {
    cle: "chatgpt",
    categorie: "ChatGPT Ads",
    titre: (
      <>
        Exister quand un client <span className="accent-word">décrit son besoin à une IA</span>
      </>
    ),
    texte: (
      <>
        La{" "}
        <a
          href="/chatgpt-ads/"
          className="font-medium text-brand-ink underline decoration-brand-ink/30 underline-offset-4 transition hover:decoration-brand-ink"
        >
          publicité dans ChatGPT
        </a>{" "}
        est ouverte en France depuis le 24 août 2026. On cartographie les intentions, on écrit les
        messages, on mesure avant de dépenser.
      </>
    ),
    points: [
      "Cartographie des intentions",
      "Suivi des conversions avant la première dépense",
      "Optimisation continue",
    ],
    cta: { label: "Découvrir ChatGPT Ads", href: "/chatgpt-ads/" },
    maquette: <MaquetteConversation />,
  },
  {
    /* Depuis le 5 octobre 2026, l'offre n'est plus la gestion Google Ads au
       forfait : Sitaly paie ses propres campagnes et livre les demandes à
       une seule entreprise par zone (voir src/routes/acquisition.tsx). */
    cle: "ads",
    categorie: "Demandes de chantier",
    titre: (
      <>
        Des demandes de chantier, <span className="accent-word">pas une pub à gérer</span>
      </>
    ),
    texte:
      "Pour les artisans du bâtiment et de l'extérieur : nous payons la publicité, nous recevons les demandes des particuliers de votre secteur, et nous les transmettons à une seule entreprise, la vôtre. Les premières sont offertes.",
    points: [
      "Demandes exclusives, jamais revendues",
      "Une seule entreprise par zone",
      "Sans engagement",
    ],
    cta: { label: "Voir les demandes de chantier", to: "/acquisition/" },
    maquette: <MaquetteRecherche />,
  },
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
    maquette: <MaquetteSite />,
  },
];

export function StackedOffers() {
  return (
    <section id="offre" className="pt-20 pb-8 sm:pt-28 sm:pb-10">
      <div className="mx-auto max-w-7xl px-4 sm:px-6">
        <SectionHeader
          index="02"
          eyebrow="Nos offres"
          title={
            <>
              Des outils pensés pour <span className="accent-word">vos enjeux</span>
            </>
          }
          subtitle="Quatre leviers, combinables. Vous en prenez un, deux ou les quatre. Chaque périmètre est chiffré après le diagnostic offert de 30 minutes, sur votre activité réelle."
        />

        {/* La réserve basse laisse la dernière carte collée le temps qu'on la
          lise. Elle valait 22vh : 266 px de vide séparaient alors la dernière
          carte de la section suivante, mesurés sur le rendu.

          Elle a été un rembourrage, et c'était le défaut : une carte collante
          reste bornée par la zone de contenu de son conteneur, où le
          rembourrage ne compte pas. La pile se libérait donc 11 px avant que la
          quatrième carte n'atteigne sa position — mesuré : elle passait de 206
          à 86 px sans jamais s'arrêter à 188, en entraînant les deuxième et
          troisième cartes avec elle. En bloc de contenu, la réserve appartient
          à la zone et la quatrième carte se colle comme les autres. */}
        <div className="mt-14">
          {LEVIERS.map((l, i) => (
            <article
              key={l.cle}
              style={{ "--rang": i } as React.CSSProperties}
              className="offre-carte sticky mb-8 overflow-hidden rounded-3xl border border-border bg-card shadow-elevated"
            >
              {/* Bande de superposition : c'est elle qui reste visible quand le
                  panneau suivant recouvre celui-ci. Hauteur = BANDE. */}
              <div className="offre-bande flex items-center justify-between gap-4 border-b border-border bg-paper-sunk px-5 sm:px-8">
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

              <div className="offre-corps grid lg:grid-cols-[1.05fr_1fr]">
                <div className="offre-texte p-4 sm:p-10 lg:p-12">
                  <p
                    data-split
                    className="font-display text-[clamp(1.3rem,2.4vw,2.3rem)] font-extrabold leading-[1.1] tracking-[-0.035em]"
                  >
                    {l.titre}
                  </p>

                  <p className="measure mt-3 text-[14px] leading-relaxed text-muted-foreground sm:mt-5 sm:text-base">
                    {l.texte}
                  </p>

                  <ul className="mt-4 flex flex-wrap gap-1.5 sm:mt-7 sm:gap-2">
                    {l.points.map((p) => (
                      <li
                        key={p}
                        className="rounded-full border border-border px-2.5 py-1 text-[13px] text-foreground/80 sm:px-3 sm:py-1.5 sm:text-sm"
                      >
                        {p}
                      </li>
                    ))}
                  </ul>

                  {l.cta.to ? (
                    <Link to={l.cta.to} className="bouton mt-5 px-6 py-3 sm:mt-9 sm:px-7 sm:py-3.5">
                      {l.cta.label}
                      <ArrowRight className="bouton-fleche h-5 w-5" />
                    </Link>
                  ) : (
                    /* Page statique hors routeur React : lien classique. */
                    <a
                      href={l.cta.href}
                      className="bouton mt-5 px-6 py-3 sm:mt-9 sm:px-7 sm:py-3.5"
                    >
                      {l.cta.label}
                      <ArrowRight className="bouton-fleche h-5 w-5" />
                    </a>
                  )}
                </div>

                <div className="offre-maquette border-t border-border bg-paper-sunk/60 lg:border-l lg:border-t-0">
                  {l.maquette}
                </div>
              </div>
            </article>
          ))}
          {/* Cette hauteur est du temps de lecture, pas du vide : elle défile
              derrière la dernière carte pendant qu'elle est collée, et il n'en
              reste qu'une centaine de pixels sous la pile au moment où elle se
              libère. */}
          <div aria-hidden="true" className="h-[32vh] sm:h-[20vh]" />
        </div>
      </div>
    </section>
  );
}
