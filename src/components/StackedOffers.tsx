import { Link } from "@tanstack/react-router";
import { ArrowRight, Bot, Globe, Megaphone, MessageSquare } from "lucide-react";
import { SectionHeader } from "@/components/SectionHeader";

import visuelSite from "@/assets/real-lafleur-1200.jpg";
import visuelAds800 from "@/assets/visuel-acquisition-800.jpg";
import visuelAds1400 from "@/assets/visuel-acquisition-1400.jpg";
import visuelChatgpt800 from "@/assets/visuel-chatgpt-800.jpg";
import visuelChatgpt1400 from "@/assets/visuel-chatgpt-1400.jpg";
import visuelAgents800 from "@/assets/visuel-agents-ia-800.jpg";
import visuelAgents1400 from "@/assets/visuel-agents-ia-1400.jpg";

/**
 * Les quatre leviers, en cartes qui s'empilent au défilement.
 *
 * Chaque panneau se colle à un décalage supérieur au précédent : en descendant,
 * ils se superposent en laissant dépasser une bande du panneau du dessous, comme
 * un jeu de cartes qu'on rassemble. C'est le mécanisme que linov.fr obtient via
 * le sticky JavaScript d'Elementor ; `position: sticky` le fait nativement, sans
 * écouteur de défilement ni recalcul de mise en page.
 *
 * Contrainte à respecter : aucun ancêtre ne doit porter `overflow: hidden`,
 * sinon le collage est neutralisé silencieusement.
 */
type Levier = {
  cle: string;
  icone: React.ComponentType<{ className?: string }>;
  etiquette: string;
  titre: React.ReactNode;
  texte: string;
  points: readonly string[];
  cta: { label: string; to?: string; href?: string };
  visuel: { src: string; srcSet?: string; alt: string; reel: boolean };
  /* Décalage de collage, croissant d'un panneau à l'autre. La bande laissée
     visible vaut la différence entre deux décalages, soit 48 px. */
  top: string;
};

const LEVIERS: Levier[] = [
  {
    cle: "site",
    icone: Globe,
    etiquette: "Présence",
    titre: (
      <>
        Un site qui travaille <span className="accent-word">pendant que vous travaillez</span>
      </>
    ),
    texte:
      "Un site sur mesure livré en 48h, puis entretenu : hébergement, maintenance, modifications, fiche Google Business et référencement local. Vous ne touchez jamais à la technique.",
    points: ["Livré en 48h", "Référencement local", "Modifications incluses"],
    cta: { label: "Voir les réalisations", to: "/realisations/" },
    visuel: {
      src: visuelSite,
      alt: "Page d'accueil du site de Lafleur Toiture, réalisé par Sitaly",
      reel: true,
    },
    top: "top-[5.5rem]",
  },
  {
    cle: "ads",
    icone: Megaphone,
    etiquette: "Acquisition",
    titre: (
      <>
        Être en haut de Google <span className="accent-word">dès aujourd'hui</span>
      </>
    ),
    texte:
      "Le référencement naturel demande des mois. Google Ads vous place devant les gens qui cherchent vos services, dans votre zone, pendant que votre visibilité naturelle se construit.",
    points: ["Ciblage de votre zone", "Suivi des appels et formulaires", "Reporting mensuel"],
    cta: { label: "Voir l'offre Google Ads", to: "/acquisition/" },
    visuel: {
      src: visuelAds800,
      srcSet: `${visuelAds800} 800w, ${visuelAds1400} 1400w`,
      alt: "",
      reel: false,
    },
    top: "top-[8.5rem]",
  },
  {
    cle: "chatgpt",
    icone: MessageSquare,
    etiquette: "Nouveau canal",
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
    visuel: {
      src: visuelChatgpt800,
      srcSet: `${visuelChatgpt800} 800w, ${visuelChatgpt1400} 1400w`,
      alt: "",
      reel: false,
    },
    top: "top-[11.5rem]",
  },
  {
    cle: "agents",
    icone: Bot,
    etiquette: "Automatisation",
    titre: (
      <>
        Ne plus jamais <span className="accent-word">rater un appel</span>
      </>
    ),
    texte:
      "Des agents installés clé en main qui répondent aux demandes entrantes, qualifient, proposent des rendez-vous et relancent les devis restés sans réponse. Vous ne configurez rien.",
    points: ["Standardiste qui ne rate rien", "Prise de rendez-vous", "Relance des devis"],
    cta: { label: "Découvrir les agents", to: "/agents-ia/" },
    visuel: {
      src: visuelAgents800,
      srcSet: `${visuelAgents800} 800w, ${visuelAgents1400} 1400w`,
      alt: "",
      reel: false,
    },
    top: "top-[14.5rem]",
  },
];

export function StackedOffers() {
  return (
    <section id="offre" className="py-20 sm:py-28">
      <div className="mx-auto max-w-7xl px-4 sm:px-6">
        <SectionHeader
          index="05"
          eyebrow="Nos offres"
          title={
            <>
              Des outils pensés pour <span className="accent-word">vos enjeux</span>
            </>
          }
          subtitle="Quatre leviers, combinables. Vous en prenez un, deux ou les quatre. Chaque périmètre est chiffré après l'appel découverte, sur votre activité réelle."
        />

        {/* La marge basse laisse au dernier panneau la place de rester collé
            le temps qu'on finisse de le lire. */}
        <div className="mt-14 pb-[18vh]">
          {LEVIERS.map((l) => (
            <article
              key={l.cle}
              className={`${l.top} sticky mb-6 overflow-hidden rounded-3xl border border-white/10 bg-ink text-white shadow-elevated`}
            >
              <div className="grid gap-0 lg:grid-cols-[1.05fr_1fr]">
                <div className="p-8 sm:p-10 lg:p-12">
                  <div className="flex items-center gap-3">
                    <span className="grid h-10 w-10 place-items-center rounded-xl bg-brand/15 text-brand">
                      <l.icone className="h-5 w-5" />
                    </span>
                    <span className="rail-label text-white/60">{l.etiquette}</span>
                  </div>

                  <h3
                    data-split
                    className="display-section mt-6 text-[clamp(1.65rem,2.6vw,2.5rem)] leading-[1.08]"
                  >
                    {l.titre}
                  </h3>

                  <p className="measure mt-5 text-white/70">{l.texte}</p>

                  <ul className="mt-7 flex flex-wrap gap-2">
                    {l.points.map((p) => (
                      <li
                        key={p}
                        className="rounded-full border border-white/15 px-3 py-1.5 text-sm text-white/80"
                      >
                        {p}
                      </li>
                    ))}
                  </ul>

                  {l.cta.to ? (
                    <Link
                      to={l.cta.to}
                      className="mt-9 inline-flex items-center gap-2 rounded-xl bg-accent px-6 py-3.5 font-semibold text-accent-foreground transition hover:brightness-110"
                    >
                      {l.cta.label}
                      <ArrowRight className="h-5 w-5" />
                    </Link>
                  ) : (
                    /* Page statique hors routeur React : lien classique. */
                    <a
                      href={l.cta.href}
                      className="mt-9 inline-flex items-center gap-2 rounded-xl bg-accent px-6 py-3.5 font-semibold text-accent-foreground transition hover:brightness-110"
                    >
                      {l.cta.label}
                      <ArrowRight className="h-5 w-5" />
                    </a>
                  )}
                </div>

                <div className="zoom-frame relative min-h-[220px] border-t border-white/10 lg:min-h-0 lg:border-l lg:border-t-0">
                  <img
                    src={l.visuel.src}
                    srcSet={l.visuel.srcSet}
                    sizes="(min-width: 1024px) 44vw, 100vw"
                    alt={l.visuel.alt}
                    aria-hidden={l.visuel.alt === "" ? "true" : undefined}
                    loading="lazy"
                    decoding="async"
                    className="absolute inset-0 h-full w-full object-cover object-left-top"
                  />
                  {l.visuel.reel && (
                    <span className="absolute bottom-4 left-4 rounded-full bg-ink/80 px-3 py-1 text-xs font-semibold text-white/80 backdrop-blur-sm">
                      Site réel, en ligne
                    </span>
                  )}
                </div>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
