import { Link } from "@tanstack/react-router";
import { ArrowRight, Bot, Globe, Megaphone, MessageSquare } from "lucide-react";
import { METIERS } from "@/lib/metiers";
import { REALISATIONS } from "@/data/realisations";

/**
 * Navigation principale, avec ses menus déroulants.
 *
 * Elle était une simple rangée de sept liens plats, où « Offres », « Agents IA »
 * et « ChatGPT Ads » cohabitaient sans hiérarchie : rien ne disait que les deux
 * derniers sont des expertises parmi d'autres. Les entrées sont désormais
 * regroupées par famille, sur le modèle du menu Expertises de linov.fr.
 *
 * Volontairement sans Radix : le menu s'ouvre au survol et au focus par CSS
 * (`group-hover`, `group-focus-within`), donc il reste accessible au clavier
 * et ne coûte aucun JavaScript. Sous `md` il n'existe pas, c'est MobileMenu
 * qui prend le relais. Le seuil est à lg et non md : les menus déroulants
 * demandent plus de place que les liens plats qu'ils remplacent.
 */
type Entree = { to?: string; href?: string; label: string; desc: string };
type Famille = {
  titre: string;
  icone: React.ComponentType<{ className?: string }>;
  entrees: Entree[];
};

const EXPERTISES: Famille[] = [
  {
    titre: "Site internet",
    icone: Globe,
    entrees: [
      {
        to: "/realisations/",
        label: "Création de site",
        desc: "Site sur mesure livré en 48h, puis entretenu.",
      },
      ...METIERS.map((m) => ({
        to: m.to,
        label: m.label.replace("Site internet ", "Site "),
        desc: m.teaser,
      })),
    ],
  },
  {
    titre: "Acquisition",
    icone: Megaphone,
    entrees: [
      {
        to: "/acquisition/",
        label: "Google Ads",
        desc: "Être en haut des recherches dès aujourd'hui.",
      },
      {
        href: "/chatgpt-ads/",
        label: "ChatGPT Ads",
        desc: "Exister quand un client décrit son besoin à une IA.",
      },
    ],
  },
  {
    titre: "Automatisation",
    icone: Bot,
    entrees: [
      {
        to: "/agents-ia/",
        label: "Agents IA",
        desc: "Répondre, qualifier, prendre les rendez-vous, relancer.",
      },
      {
        href: "/agents-ia/chatgpt/",
        label: "Agent ChatGPT",
        desc: "L'assistant branché sur vos demandes entrantes.",
      },
    ],
  },
];

function EntreeLien({ e }: { e: Entree }) {
  const contenu = (
    <>
      <span className="font-semibold group-hover/item:text-brand-ink">{e.label}</span>
      <span className="mt-0.5 block text-[13px] leading-snug text-muted-foreground">{e.desc}</span>
    </>
  );
  const classe =
    "group/item block rounded-lg px-3 py-2.5 transition-colors hover:bg-secondary focus-visible:bg-secondary";
  /* Les landings statiques vivent hors du routeur : lien classique. */
  return e.to ? (
    <Link to={e.to} className={classe}>
      {contenu}
    </Link>
  ) : (
    <a href={e.href} className={classe}>
      {contenu}
    </a>
  );
}

function Deroulant({
  label,
  children,
  large = false,
}: {
  label: string;
  children: React.ReactNode;
  large?: boolean;
}) {
  return (
    <div className="group relative">
      <button
        type="button"
        className="lien-entete flex items-center gap-1.5 py-5 group-hover:text-foreground group-focus-within:text-foreground"
        aria-haspopup="true"
      >
        {label}
        <svg
          viewBox="0 0 12 12"
          className="h-3 w-3 transition-transform group-hover:rotate-180 group-focus-within:rotate-180"
          fill="none"
          stroke="currentColor"
          strokeWidth="1.8"
          strokeLinecap="round"
        >
          <path d="M2.5 4.5L6 8l3.5-3.5" />
        </svg>
      </button>

      {/* Le panneau reste dans le flux du groupe pour que le survol ne se
          rompe pas entre le bouton et lui. `invisible` plutôt que `hidden` :
          la transition d'opacité a besoin d'un élément rendu. */}
      <div
        /* Le panneau large est ancré à gauche et non centré sur son bouton :
           centré, ses 46rem débordaient hors de l'écran, le déclencheur se
           trouvant près du bord gauche du bandeau. */
        className={`invisible absolute top-full z-50 translate-y-1 opacity-0 transition-all duration-200 group-hover:visible group-hover:translate-y-0 group-hover:opacity-100 group-focus-within:visible group-focus-within:translate-y-0 group-focus-within:opacity-100 ${
          large ? "left-0 w-[min(46rem,calc(100vw-3rem))]" : "left-1/2 w-[22rem] -translate-x-1/2"
        }`}
      >
        <div className="rounded-2xl border border-border bg-card p-4 shadow-elevated">
          {children}
        </div>
      </div>
    </div>
  );
}

export function MainNav() {
  return (
    <nav className="hidden items-center gap-7 lg:flex" aria-label="Navigation principale">
      <Deroulant label="Expertises" large>
        <div className="grid grid-cols-3 gap-4">
          {EXPERTISES.map((f) => (
            <div key={f.titre}>
              <div className="flex items-center gap-2 px-3 pb-2">
                <f.icone className="h-4 w-4 text-brand-ink" />
                <span className="rail-label text-muted-foreground">{f.titre}</span>
              </div>
              <div className="space-y-0.5">
                {f.entrees.map((e) => (
                  <EntreeLien key={e.label} e={e} />
                ))}
              </div>
            </div>
          ))}
        </div>
      </Deroulant>

      <Deroulant label="Réalisations">
        <div className="space-y-0.5">
          {REALISATIONS.map((r) => (
            <Link
              key={r.slug}
              to="/realisations/$slug/"
              params={{ slug: r.slug }}
              className="group/item flex items-center gap-3 rounded-lg p-2 transition-colors hover:bg-secondary"
            >
              <img
                src={r.capture.small}
                alt=""
                aria-hidden="true"
                loading="lazy"
                className="h-11 w-16 shrink-0 rounded-md border border-border object-cover object-top"
              />
              <span className="min-w-0">
                <span className="block truncate font-semibold group-hover/item:text-brand-ink">
                  {r.client}
                </span>
                <span className="block truncate text-[13px] text-muted-foreground">{r.metier}</span>
              </span>
            </Link>
          ))}
          <Link
            to="/realisations/"
            className="mt-1 flex items-center gap-1.5 rounded-lg px-3 py-2.5 text-sm font-semibold text-brand-ink transition-colors hover:bg-secondary"
          >
            Toutes les réalisations
            <ArrowRight className="h-4 w-4" />
          </Link>
        </div>
      </Deroulant>

      <Link to="/blog/" className="lien-entete py-5">
        Blog
      </Link>

      <a
        href="/chatgpt-ads/"
        className="inline-flex items-center gap-1.5 py-5 text-sm font-semibold text-brand-ink transition-colors hover:text-foreground"
      >
        <MessageSquare className="h-3.5 w-3.5" />
        ChatGPT Ads
      </a>
    </nav>
  );
}
