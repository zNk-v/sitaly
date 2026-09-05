import { Link } from "@tanstack/react-router";
import { ArrowRight } from "lucide-react";
import { COULEURS_FAMILLE, FAMILLES, entreesFamille, type EntreeMenu } from "@/data/expertises";
import { REALISATIONS } from "@/data/realisations";

/**
 * Navigation principale, avec ses menus déroulants.
 *
 * Le menu Expertises tient en trois colonnes, une par famille, et chaque
 * entrée mène à une page qui ne traite que ce sujet. C'est la structure que
 * réclame le référencement autant que la lecture : un visiteur qui cherche
 * « site e-commerce » n'a pas à deviner qu'il se cache derrière « Offres ».
 *
 * Les colonnes viennent de `src/data/expertises.ts` : le menu n'a aucune liste
 * à lui, il ne décide que de la mise en page.
 *
 * Volontairement sans Radix : le menu s'ouvre au survol et au focus par CSS
 * (`group-hover`, `group-focus-within`), donc il reste accessible au clavier
 * et ne coûte aucun JavaScript. Sous `lg` il n'existe pas, c'est MobileMenu
 * qui prend le relais.
 */
function EntreeLien({ e }: { e: EntreeMenu }) {
  const contenu = (
    <>
      <span className="font-semibold group-hover/item:text-brand-ink">{e.label}</span>
      <span className="mt-0.5 block text-[13px] leading-snug text-muted-foreground">{e.desc}</span>
    </>
  );
  const classe =
    "group/item block rounded-lg px-3 py-2 transition-colors hover:bg-secondary focus-visible:bg-secondary";
  /* Les landings servies depuis public/ vivent hors du routeur : lien classique. */
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

      {/* Le panneau reste un enfant du groupe pour que le survol ne se rompe
          pas entre le bouton et lui : `group-hover` suit le DOM, pas la
          géométrie. `invisible` plutôt que `hidden` : la transition d'opacité
          a besoin d'un élément rendu.

          Le panneau large est en position fixe et centré sur la fenêtre, pas
          ancré au bouton. Ancré à gauche du déclencheur, ses 54rem sortaient
          de 94 px par la droite dans une fenêtre de 1024 : la colonne
          Automatisation était coupée, et six pages avec elle. Centré sur le
          bouton, il serait sorti par la gauche. Centré sur la fenêtre, il ne
          peut sortir d'aucun côté, et il passe toujours sous le bouton, donc
          le survol tient.

          La hauteur est plafonnée pour la même raison : 628 px de panneau ne
          tiennent pas sous un bandeau dans une fenêtre de 620, et le panneau
          se met alors à défiler.

          Le `backdrop-filter` de la pastille fait d'elle le bloc conteneur des
          éléments fixes qu'elle porte : `top` et `left` se résolvent donc sur
          elle et non sur la fenêtre. C'est sans conséquence en horizontal, la
          pastille étant centrée, mais le plafond de hauteur doit retrancher la
          gouttière du haut en plus de la pastille.

          Le rembourrage du haut fait le pont : sans lui, six pixels séparaient
          le bas du bouton du haut du panneau, et le survol se rompait pendant
          la traversée. Le panneau commence donc au-dessus du bouton et son
          rembourrage remet la carte à sa place. */}
      <div
        className={`invisible z-50 translate-y-1 opacity-0 transition-all duration-200 group-hover:visible group-hover:translate-y-0 group-hover:opacity-100 group-focus-within:visible group-focus-within:translate-y-0 group-focus-within:opacity-100 ${
          large
            ? "fixed left-1/2 top-[calc(var(--entete-hauteur)-1.25rem)] pt-5 max-h-[calc(100dvh-var(--entete-hauteur)-1.5rem)] w-[min(54rem,calc(100vw-2rem))] -translate-x-1/2 overflow-y-auto"
            : "absolute left-1/2 top-full -mt-2 w-[22rem] -translate-x-1/2 pt-5"
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
        <div className="grid grid-cols-3 gap-3">
          {FAMILLES.map((f) => (
            <div
              key={f.id}
              style={{ "--encre-famille": COULEURS_FAMILLE[f.id].encre } as React.CSSProperties}
            >
              <div className="flex items-center gap-2 px-3 pb-1">
                <f.icone className="icone-famille h-4 w-4" />
                <span className="rail-label" style={{ color: COULEURS_FAMILLE[f.id].encre }}>
                  {f.titre}
                </span>
              </div>
              <p className="px-3 pb-2 text-[13px] leading-snug text-muted-foreground">{f.resume}</p>
              <div className="space-y-0.5 border-t border-border pt-2">
                {entreesFamille(f.id).map((e) => (
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
    </nav>
  );
}
