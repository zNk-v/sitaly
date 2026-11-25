import type { OffreId } from "@/data/offres";
import { useEffect, useRef, useState } from "react";
import { Link } from "@tanstack/react-router";
import { ArrowRight, ArrowUpRight, Phone, Plus } from "lucide-react";
import type { EntreeMenu } from "@/data/expertises";
import {
  LIEN_TARIFS,
  MENUS_APRES_TARIFS,
  MENUS_AVANT_TARIFS,
  type MenuDeroulant,
} from "@/data/menu";
import { APP_URL, SITALY_PHONE, SITALY_PHONE_DISPLAY } from "@/lib/config";

/**
 * Le menu mobile, plein écran depuis le 25/11/2026.
 *
 * L'ancienne feuille blanche posée sous la pastille faisait daté à Teddy. Le
 * menu couvre maintenant l'écran en sombre, sous la pastille qui passe elle
 * aussi au sombre (styles.css, « body.menu-ouvert »). Les rubriques montent
 * l'une après l'autre en grande typographie ; chacune se déplie sur place.
 * Le bouton n'est plus un carré bordé : deux traits qui se croisent en croix.
 *
 * Ce qui reste de la version précédente, et pour les mêmes raisons :
 * - le corps de la page ne défile pas derrière, le menu défile pour lui-même ;
 * - Échap referme et rend le focus au bouton ;
 * - les menus sont ceux du bureau (src/data/menu.ts), dans le même ordre ;
 * - les deux actions restent collées en bas, quoi qu'on déplie au-dessus.
 */
/** Le bouton principal d'une page : libellé et offre déjà choisie (voir SiteHeader). */
export interface AppelPrincipal {
  label: string;
  offre?: OffreId;
}

export function MobileMenu({
  onHome = false,
  appel,
}: {
  appel?: AppelPrincipal;
  /** Conservé pour les appelants : le menu est le même dans les deux cas. */
  variant?: "bar" | "floating";
  onHome?: boolean;
  current?: "agents-ia" | "blog";
}) {
  const [ouvert, setOuvert] = useState(false);
  const [haut, setHaut] = useState(0);
  const fermer = () => setOuvert(false);
  const declencheur = useRef<HTMLButtonElement>(null);

  /* Le corps ne défile plus derrière le menu, et la touche Échap referme.
     Le focus revient au bouton : sans cela il repart au début du document. */
  /* Le menu est rendu dans l'en-tête : en `-z-10`, il passe sous la pastille
     et le bandeau du prix, qui restent visibles au-dessus de lui. */
  useEffect(() => {
    if (!ouvert) return;
    // Le menu commence sous l'en-tête, dont la hauteur dépend des bandeaux.
    setHaut(document.querySelector("header")?.getBoundingClientRect().bottom ?? 0);
    const precedent = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    document.body.classList.add("menu-ouvert");
    const auClavier = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        setOuvert(false);
        declencheur.current?.focus();
      }
    };
    document.addEventListener("keydown", auClavier);
    return () => {
      document.body.style.overflow = precedent;
      document.body.classList.remove("menu-ouvert");
      document.removeEventListener("keydown", auClavier);
    };
  }, [ouvert]);

  /* Referme si l'écran repasse en bureau, où le menu déroulant prend le relais. */
  useEffect(() => {
    const mq = window.matchMedia("(min-width: 1024px)");
    const close = () => mq.matches && setOuvert(false);
    mq.addEventListener("change", close);
    return () => mq.removeEventListener("change", close);
  }, []);

  const ligne =
    "flex w-full cursor-pointer list-none items-center justify-between py-4 font-display text-[28px] font-semibold tracking-tight text-white marker:content-none [&::-webkit-details-marker]:hidden";
  const rubriques: ({ menu: MenuDeroulant } | { lien: { to: string; label: string } })[] = [
    ...MENUS_AVANT_TARIFS.map((menu) => ({ menu })),
    { lien: LIEN_TARIFS },
    ...MENUS_APRES_TARIFS.map((menu) => ({ menu })),
    ...(onHome ? [] : [{ lien: { to: "/", label: "Accueil" } }]),
  ];

  return (
    <>
      <button
        ref={declencheur}
        type="button"
        onClick={() => setOuvert((v) => !v)}
        className={`relative z-[70] grid h-11 w-11 shrink-0 place-items-center rounded-full transition-colors active:scale-95 lg:hidden ${
          ouvert ? "bg-white/10 text-white" : "bg-black/[0.05] text-foreground"
        }`}
        aria-label={ouvert ? "Fermer le menu" : "Ouvrir le menu"}
        aria-expanded={ouvert}
        aria-controls="menu-mobile"
      >
        <span className="burger" data-ouvert={ouvert} aria-hidden="true">
          <span />
          <span />
        </span>
      </button>

      {ouvert && (
        <div
          id="menu-mobile"
          className="menu-plein pointer-events-auto fixed inset-0 -z-10 flex flex-col overflow-y-auto overscroll-contain bg-[#0d0f14] text-white lg:hidden"
          style={{ paddingTop: haut + 8 }}
        >
          <nav className="flex-1 px-6 pb-6" aria-label="Navigation principale">
            <ul>
              {rubriques.map((r, i) => (
                <li
                  key={"menu" in r ? r.menu.label : r.lien.label}
                  className="menu-ligne border-b border-white/10"
                  style={{ animationDelay: `${80 + i * 45}ms` }}
                >
                  {"menu" in r ? (
                    <details className="group">
                      <summary className={ligne}>
                        {r.menu.label}
                        <span className="grid h-9 w-9 place-items-center rounded-full bg-white/[0.08] transition-transform duration-300 group-open:rotate-45">
                          <Plus className="h-4 w-4" aria-hidden="true" />
                        </span>
                      </summary>
                      <ul className="space-y-0.5 pb-4">
                        {r.menu.colonnes
                          .flatMap((c) => c.entrees)
                          .map((e) => (
                            <li key={e.label}>
                              <EntreeMobile e={e} onClick={fermer} />
                            </li>
                          ))}
                        {r.menu.entete?.tout && (
                          <li>
                            <Link
                              to={r.menu.entete.tout.to}
                              onClick={fermer}
                              className="flex items-center gap-1.5 px-2 py-2.5 text-[15px] font-semibold text-white"
                            >
                              {r.menu.entete.tout.label}
                              <ArrowRight className="h-4 w-4" aria-hidden="true" />
                            </Link>
                          </li>
                        )}
                      </ul>
                    </details>
                  ) : (
                    <Link to={r.lien.to} onClick={fermer} className={ligne}>
                      {r.lien.label}
                      <span className="grid h-9 w-9 place-items-center rounded-full bg-white/[0.08]">
                        <ArrowUpRight className="h-4 w-4" aria-hidden="true" />
                      </span>
                    </Link>
                  )}
                </li>
              ))}
            </ul>
          </nav>

          {/* Les deux actions, toujours à la même place. Une page de service
              vend son offre (questionnaire, téléphone) ; partout ailleurs,
              l'action est de créer son site dans l'application. */}
          <div
            className="menu-ligne sticky bottom-0 border-t border-white/10 bg-[#0d0f14]/90 p-5 backdrop-blur"
            style={{ animationDelay: "320ms" }}
          >
            {appel ? (
              <>
                <Link
                  to="/mon-projet/"
                  search={appel.offre ? { offre: appel.offre } : {}}
                  onClick={fermer}
                  className="bouton h-12 w-full text-base"
                >
                  {appel.label}
                  <ArrowRight className="bouton-fleche h-4 w-4" />
                </Link>
                <a
                  href={`tel:${SITALY_PHONE}`}
                  onClick={fermer}
                  className="mt-2 flex h-12 items-center justify-center gap-2 rounded-full border border-white/15 text-[15px] font-semibold text-white"
                >
                  <Phone className="h-4 w-4" />
                  {SITALY_PHONE_DISPLAY}
                </a>
              </>
            ) : (
              <>
                <a
                  href={`${APP_URL}/creer`}
                  onClick={fermer}
                  className="bouton h-12 w-full text-base"
                >
                  Créer mon site
                  <ArrowRight className="bouton-fleche h-4 w-4" />
                </a>
                <a
                  href={`${APP_URL}/connexion`}
                  onClick={fermer}
                  className="mt-2 flex h-12 items-center justify-center rounded-full border border-white/15 text-[15px] font-semibold text-white"
                >
                  Se connecter
                </a>
              </>
            )}
          </div>
        </div>
      )}
    </>
  );
}

/** Une entrée d'onglet : le libellé, et le prix quand c'est une offre de la grille. */
function EntreeMobile({ e, onClick }: { e: EntreeMenu; onClick: () => void }) {
  const classe =
    "flex items-center gap-3 rounded-xl px-2 py-2 text-base text-white/75 transition-colors active:bg-white/10";
  const contenu = (
    <>
      {e.icone && (
        <span className="grid h-9 w-9 shrink-0 place-items-center rounded-xl bg-white/[0.07] text-white/85">
          <e.icone className="h-4 w-4" />
        </span>
      )}
      <span className="min-w-0 flex-1">{e.label}</span>
      {e.bientot && (
        <span className="shrink-0 rounded-full bg-white/10 px-2 py-0.5 text-[11px] font-medium text-white/60">
          Bientôt
        </span>
      )}
      {e.prix && (
        <span className="shrink-0 text-[13px] font-semibold whitespace-nowrap text-white/60 tabular-nums">
          {e.prix}
        </span>
      )}
    </>
  );
  if (e.bientot) return <div className={`${classe} opacity-60`}>{contenu}</div>;
  return e.to ? (
    <Link to={e.to} hash={e.hash} onClick={onClick} className={classe}>
      {contenu}
    </Link>
  ) : (
    <a href={e.href} onClick={onClick} className={classe}>
      {contenu}
    </a>
  );
}

/** Bouton d'appel compact, affiché dans les en-têtes qui n'ont pas le lien. */
export function HeaderCallButton({ rounded = "lg" }: { rounded?: "lg" | "full" }) {
  return (
    <a
      href={`tel:${SITALY_PHONE}`}
      className={`inline-flex h-11 shrink-0 items-center gap-2 border border-border bg-card px-3 text-sm font-semibold text-foreground shadow-soft transition hover:border-accent hover:text-accent sm:px-4 ${
        rounded === "full" ? "rounded-full" : "rounded-lg"
      }`}
      aria-label={`Appeler Sitaly au ${SITALY_PHONE_DISPLAY}`}
    >
      <Phone className="h-4 w-4" />
      <span className="hidden lg:inline">{SITALY_PHONE_DISPLAY}</span>
      <span className="lg:hidden">Appeler</span>
    </a>
  );
}
