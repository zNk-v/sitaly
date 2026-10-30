import { Link } from "@tanstack/react-router";
import type { EntreeMenu } from "@/data/expertises";
import { LIEN_TARIFS, MENUS, type MenuDeroulant } from "@/data/menu";

/**
 * Navigation principale, avec ses menus déroulants.
 *
 * Depuis le 31 octobre 2026, comme sur durable.com : Produits, Ressources et
 * Outils en menus déroulants, puis Tarifs. Avant (30 octobre) :
 * Fonctionnalités, Exemples, Tarifs, l'onglet Services et Ressources ; avant
 * encore, trois onglets de services de l'agence à la manière de devmiweb.com.
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
          {e.bientot && (
            <span className="shrink-0 rounded-full bg-secondary px-2 py-0.5 text-[11px] font-medium text-muted-foreground">
              Bientôt
            </span>
          )}
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
  if (e.bientot) {
    return (
      <div className="flex items-start gap-3 rounded-xl px-2.5 py-2 opacity-60">{contenu}</div>
    );
  }
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

/** Un menu déroulant : ses colonnes d'entrées côte à côte. */
function Menu({ m }: { m: MenuDeroulant }) {
  const plusieurs = m.colonnes.length > 1;
  return (
    <Deroulant label={m.label}>
      <div className={plusieurs ? "grid grid-cols-2 gap-4" : ""}>
        {m.colonnes.map((c) => (
          <div key={c.titre} className={plusieurs ? "w-[19rem]" : "w-[22rem]"}>
            {plusieurs && <p className="rail-label px-2.5 pb-2 text-muted-foreground">{c.titre}</p>}
            <div className="space-y-0.5">
              {c.entrees.map((e) => (
                <EntreeLien key={e.label} e={e} />
              ))}
            </div>
          </div>
        ))}
      </div>
    </Deroulant>
  );
}

export function MainNav() {
  return (
    <nav className="hidden items-center gap-5 lg:flex xl:gap-7" aria-label="Navigation principale">
      {MENUS.map((m) => (
        <Menu key={m.label} m={m} />
      ))}
      <Link to={LIEN_TARIFS.to} className="lien-entete py-5">
        {LIEN_TARIFS.label}
      </Link>
    </nav>
  );
}
