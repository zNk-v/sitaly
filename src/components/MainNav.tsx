import { Link } from "@tanstack/react-router";
import { ArrowRight } from "lucide-react";
import { COULEURS_FAMILLE, type EntreeMenu } from "@/data/expertises";
import { AGENCE, ONGLETS, type OngletMenu } from "@/data/menu";
import { REALISATIONS } from "@/data/realisations";

/**
 * Navigation principale, avec ses menus déroulants.
 *
 * Trois onglets de services (Site web, Visibilité, Agents IA), chacun dans la
 * couleur de sa famille, puis Réalisations, Tarifs et L'agence. Chaque onglet
 * reprend la mise en page de devmiweb.com : deux colonnes d'entrées avec leur
 * pictogramme, un encart à droite, et le prix des offres de la grille, pour
 * que le visiteur voie ce que coûte un site avant d'ouvrir une page.
 *
 * Les onglets viennent de `src/data/menu.ts` : le menu n'a aucune liste à lui,
 * il ne décide que de la mise en page.
 *
 * Volontairement sans Radix : le menu s'ouvre au survol et au focus par CSS
 * (`group-hover`, `group-focus-within`), donc il reste accessible au clavier
 * et ne coûte aucun JavaScript. Sous `lg` il n'existe pas, c'est MobileMenu
 * qui prend le relais.
 */
function EntreeLien({ e }: { e: EntreeMenu }) {
  const contenu = (
    <>
      {/* Le pictogramme dans un carré teinté de la couleur de l'onglet, comme
          les « piliers » de devmiweb.com : on reconnaît l'entrée avant de la
          lire. */}
      {e.icone && (
        <span className="pastille-famille grid h-9 w-9 shrink-0 place-items-center rounded-lg transition-colors">
          <e.icone className="h-[18px] w-[18px]" />
        </span>
      )}
      <span className="min-w-0 flex-1">
        <span className="flex items-baseline justify-between gap-3">
          <span className="font-semibold group-hover/item:text-[color:var(--encre-famille,var(--brand-ink))]">
            {e.label}
          </span>
          {e.prix && (
            <span className="shrink-0 text-[13px] font-semibold whitespace-nowrap tabular-nums text-[color:var(--encre-famille,var(--brand-ink))]">
              {e.prix}
            </span>
          )}
        </span>
        <span className="mt-0.5 block text-[13px] leading-snug text-muted-foreground">
          {e.desc}
        </span>
      </span>
    </>
  );
  const classe =
    "group/item flex items-start gap-3 rounded-xl px-2.5 py-2 transition-colors hover:bg-secondary focus-visible:bg-secondary";
  /* Les landings servies depuis public/ vivent hors du routeur : lien classique. */
  return e.to ? (
    <Link to={e.to} hash={e.hash} className={classe}>
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
  style,
}: {
  label: string;
  children: React.ReactNode;
  /** Largeur du panneau centré sous l'en-tête, en rem. Absent : panneau centré sur le bouton. */
  large?: false | number;
  style?: React.CSSProperties;
}) {
  return (
    <div className={`group ${large ? "" : "relative"}`} style={style}>
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

      {/* Le panneau reste un enfant du groupe pour que le survol ne se rompe
          pas entre le bouton et lui : `group-hover` suit le DOM, pas la
          géométrie. `invisible` plutôt que `hidden` : la transition d'opacité
          a besoin d'un élément rendu.

          Le panneau large se centre sous la pastille de l'en-tête, comme chez
          devmiweb.com : ni son groupe ni la `nav` ne sont positionnés, c'est
          la pastille (`.entete-plaque`) qui l'est. Il prend sa largeur, dans
          la limite de 64rem. Centré sur la fenêtre, l'ancien panneau Services
          ne recouvrait plus que 16 px du bouton Site web à 1920 px de large,
          le menu n'étant pas centré dans la pastille, et le survol se rompait.
          Large comme la pastille, il passe sous chaque bouton à toutes les
          largeurs.

          La hauteur est plafonnée : 628 px de panneau ne tiennent pas sous un
          bandeau dans une fenêtre de 620, et le panneau se met alors à
          défiler.

          Le rembourrage du haut fait le pont : sans lui, six pixels séparaient
          le bas du bouton du haut du panneau, et le survol se rompait pendant
          la traversée. Le panneau commence donc au-dessus du bouton et son
          rembourrage remet la carte à sa place. */}
      <div
        style={large ? ({ "--largeur-panneau": `${large}rem` } as React.CSSProperties) : undefined}
        className={`invisible z-50 translate-y-1 opacity-0 transition-all duration-200 group-hover:visible group-hover:translate-y-0 group-hover:opacity-100 group-focus-within:visible group-focus-within:translate-y-0 group-focus-within:opacity-100 ${
          large
            ? "absolute left-1/2 top-full -mt-2 max-h-[calc(100dvh-var(--entete-hauteur)-1.5rem)] w-[min(var(--largeur-panneau),100%)] -translate-x-1/2 overflow-y-auto pt-5"
            : "absolute left-1/2 top-full -mt-2 w-max min-w-[22rem] -translate-x-1/2 pt-5"
        }`}
      >
        <div className="rounded-2xl border border-border bg-card p-4 shadow-elevated">
          {children}
        </div>
      </div>
    </div>
  );
}

/** Un onglet de services : deux colonnes, l'encart, puis le lien vers les tarifs. */
function Onglet({ o }: { o: OngletMenu }) {
  const { encre, couleur } = COULEURS_FAMILLE[o.famille];
  return (
    <Deroulant
      label={o.label}
      large={64}
      style={{ "--encre-famille": encre, "--teinte-famille": couleur } as React.CSSProperties}
    >
      <div className="grid grid-cols-[1fr_1fr_15rem] gap-4">
        {o.colonnes.map((c) => (
          <div key={c.titre}>
            <p className="rail-label px-2.5 pb-2" style={{ color: encre }}>
              {c.titre}
            </p>
            <div className="space-y-0.5">
              {c.entrees.map((e) => (
                <EntreeLien key={e.label} e={e} />
              ))}
            </div>
          </div>
        ))}
        <Carte o={o} />
      </div>
      {o.pied && (
        <Link
          to={o.pied.to}
          hash={o.pied.hash}
          className="mt-3 flex items-center gap-1.5 rounded-lg border-t border-border px-2.5 pt-3 text-sm font-semibold"
          style={{ color: encre }}
        >
          {o.pied.label}
          <ArrowRight className="h-4 w-4" />
        </Link>
      )}
    </Deroulant>
  );
}

/** L'encart à droite d'un onglet : une réalisation, un outil gratuit, un article. */
function Carte({ o }: { o: OngletMenu }) {
  const c = o.carte;
  /* Sans image, l'encart porte le pictogramme de la première offre. */
  const Icone = o.colonnes[0].entrees[0].icone;
  return (
    <Link
      to={c.to}
      className="group/carte flex flex-col overflow-hidden rounded-xl border border-border bg-secondary/60 transition-colors hover:border-foreground/15"
    >
      {c.image ? (
        <img
          src={c.image}
          alt=""
          aria-hidden="true"
          width={240}
          height={150}
          loading="lazy"
          className="aspect-[16/10] w-full border-b border-border object-cover object-top"
        />
      ) : (
        <span className="pastille-famille grid aspect-[16/10] w-full place-items-center">
          {Icone && <Icone className="h-10 w-10" />}
        </span>
      )}
      <span className="flex flex-1 flex-col p-3.5">
        <span className="rail-label" style={{ color: COULEURS_FAMILLE[o.famille].encre }}>
          {c.surtitre}
        </span>
        <span className="mt-1.5 text-[14px] leading-snug font-semibold">{c.titre}</span>
        <span
          className="mt-auto flex items-center gap-1.5 pt-3 text-[13px] font-semibold"
          style={{ color: COULEURS_FAMILLE[o.famille].encre }}
        >
          {c.lien}
          <ArrowRight className="h-3.5 w-3.5 transition-transform group-hover/carte:translate-x-0.5" />
        </span>
      </span>
    </Link>
  );
}

export function MainNav() {
  return (
    <nav className="hidden items-center gap-5 lg:flex xl:gap-7" aria-label="Navigation principale">
      {ONGLETS.map((o) => (
        <Onglet key={o.label} o={o} />
      ))}

      <Deroulant label="Réalisations">
        <div className="space-y-0.5">
          {REALISATIONS.map((r) => (
            <Link
              key={r.slug}
              to="/realisations/$slug/"
              params={{ slug: r.slug }}
              className="group/item flex items-center gap-3 rounded-lg p-2 transition-colors hover:bg-secondary"
            >
              {/* Vignette de 64 px : la plus petite capture WebP suffit. */}
              <img
                src={r.capture.webp.w560}
                alt=""
                aria-hidden="true"
                width={64}
                height={44}
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

      <Link to="/tarifs/" className="lien-entete py-5">
        Tarifs
      </Link>

      <Deroulant label="L'agence">
        <div className="space-y-0.5">
          {AGENCE.map((e) => (
            <EntreeLien key={e.label} e={e} />
          ))}
        </div>
      </Deroulant>
    </nav>
  );
}
