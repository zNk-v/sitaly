import type { OffreId } from "@/data/offres";
import { useEffect, useRef, useState } from "react";
import { Link } from "@tanstack/react-router";
import { ArrowRight, ArrowUpRight, Bot, Globe, Megaphone, Menu, Phone, X } from "lucide-react";
import { COULEURS_FAMILLE, type EntreeMenu, type FamilleId } from "@/data/expertises";
import { AGENCE, LIENS_PRODUIT, ONGLETS } from "@/data/menu";
import { APP_URL, SITALY_PHONE, SITALY_PHONE_DISPLAY } from "@/lib/config";

const ICONES: Record<FamilleId, React.ComponentType<{ className?: string }>> = {
  site: Globe,
  acquisition: Megaphone,
  automatisation: Bot,
};

/**
 * Le menu mobile.
 *
 * Il a d'abord listé sept ancres vers des sections de l'accueil, qui pointaient
 * dans le vide dès qu'on n'était pas sur l'accueil. Il a ensuite repris la
 * structure du menu de bureau, mais sous la forme d'un panneau accroché sous
 * le bandeau, sans fond derrière : la page continuait de défiler visuellement
 * derrière lui et rien ne disait où finissait le menu.
 *
 * C'est maintenant une feuille posée sur un fond assombri. Trois choses en
 * découlent, et chacune corrige un défaut mesuré :
 *
 * - Le fond capte le toucher, donc on referme en touchant à côté. C'était
 *   impossible auparavant : il fallait viser la croix.
 * - La feuille a une hauteur bornée et défile pour elle-même, le corps de la
 *   page étant figé. Le menu ouvert ne faisait pas défiler la page derrière,
 *   mais il pouvait déborder sans qu'on puisse l'atteindre.
 * - Chaque famille porte sa couleur, comme partout ailleurs.
 *
 * Les onglets sont ceux du menu de bureau (src/data/menu.ts) : Site web,
 * Visibilité et Agents IA, avec le pictogramme de chaque entrée et le prix des
 * offres de la grille.
 *
 * Aucune bibliothèque : deux `details` repliés, une transition CSS, et la
 * touche Échap.
 */
/** Le bouton principal d'une page : libellé et offre déjà choisie (voir SiteHeader). */
export interface AppelPrincipal {
  label: string;
  offre?: OffreId;
}

export function MobileMenu({
  variant = "bar",
  onHome = false,
  current,
  appel,
}: {
  appel?: AppelPrincipal;
  /** Conservé pour les appelants : la feuille est la même dans les deux cas. */
  variant?: "bar" | "floating";
  onHome?: boolean;
  current?: "agents-ia" | "blog";
}) {
  const [ouvert, setOuvert] = useState(false);
  const fermer = () => setOuvert(false);
  const declencheur = useRef<HTMLButtonElement>(null);

  /* Le corps ne défile plus derrière la feuille, et la touche Échap referme.
     Le focus revient au bouton : sans cela il repart au début du document. */
  useEffect(() => {
    if (!ouvert) return;
    const precedent = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    /* La pastille de l'en-tête est translucide et floute ce qu'il y a derrière.
       Le voile passant sous elle, son flou le ramenait dedans et la pastille
       virait au gris barré. Elle devient opaque le temps du menu : le z-index
       n'y pouvait rien, c'est le `backdrop-filter` qui échantillonnait. */
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

  const lien =
    "flex items-center justify-between rounded-xl px-3 py-3 text-[15px] font-semibold text-foreground transition-colors active:bg-secondary";

  return (
    <>
      <button
        ref={declencheur}
        type="button"
        onClick={() => setOuvert((v) => !v)}
        className={`relative z-[70] inline-flex h-11 w-11 shrink-0 items-center justify-center border border-border bg-card text-foreground shadow-soft transition active:scale-95 lg:hidden ${
          variant === "floating" ? "rounded-full" : "rounded-xl"
        }`}
        aria-label={ouvert ? "Fermer le menu" : "Ouvrir le menu"}
        aria-expanded={ouvert}
        aria-controls="menu-mobile"
      >
        {ouvert ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
      </button>

      {ouvert && (
        <>
          {/* Le fond. Il assombrit la page et referme au toucher. Il passe
              SOUS la pastille de l'en-tête, qui vaut z-50 : au-dessus, il la
              barrait d'un rectangle gris dont les angles ne suivaient pas les
              siens, et le logo devenait illisible pendant que le bouton, plus
              haut encore, restait net. */}
          <button
            type="button"
            aria-label="Fermer le menu"
            onClick={fermer}
            className="voile-menu fixed inset-0 z-40 cursor-default lg:hidden"
          />

          <div
            id="menu-mobile"
            className="feuille-menu fixed inset-x-3 top-[var(--entete-hauteur)] z-[60] max-h-[calc(100dvh-var(--entete-hauteur)-0.75rem)] overflow-y-auto overscroll-contain rounded-3xl border border-border bg-card shadow-elevated sm:inset-x-4 lg:hidden"
          >
            <nav className="p-3" aria-label="Navigation principale">
              {/* Sitaly App d'abord : ses fonctions, ses exemples, ses tarifs. */}
              {LIENS_PRODUIT.map((l) => (
                <Link key={l.label} to={l.to} hash={l.hash} onClick={fermer} className={lien}>
                  {l.label}
                  <ArrowUpRight className="h-4 w-4 text-muted-foreground" />
                </Link>
              ))}

              {ONGLETS.map((o) => {
                const Icone = ICONES[o.famille];
                const encre = COULEURS_FAMILLE[o.famille].encre;
                return (
                  <details
                    key={o.label}
                    className="groupe-famille group"
                    style={
                      {
                        "--encre-famille": encre,
                        "--teinte-famille": COULEURS_FAMILLE[o.famille].couleur,
                      } as React.CSSProperties
                    }
                  >
                    <summary className="flex cursor-pointer list-none items-center gap-3 rounded-xl px-3 py-3 marker:content-none">
                      {/* La pastille de couleur porte l'icône : c'est le même
                          repère que dans le menu de bureau et le pied de page,
                          à la taille d'un doigt. */}
                      <span className="pastille-famille grid h-9 w-9 shrink-0 place-items-center rounded-xl">
                        <Icone className="h-4.5 w-4.5" />
                      </span>
                      <span className="min-w-0 flex-1 font-display text-base font-bold tracking-tight">
                        {o.label}
                      </span>
                      <svg
                        viewBox="0 0 12 12"
                        aria-hidden="true"
                        className="h-3.5 w-3.5 shrink-0 text-muted-foreground transition-transform duration-200 group-open:rotate-180"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="1.8"
                        strokeLinecap="round"
                      >
                        <path d="M2.5 4.5L6 8l3.5-3.5" />
                      </svg>
                    </summary>

                    <div className="mb-1 ml-[3.25rem] mr-3 border-l border-border pl-3">
                      {o.colonnes.map((c) => (
                        <div key={c.titre} className="pb-1">
                          {/* Un seul intertitre ne classe rien : il ne s'affiche
                              que s'il y a plusieurs colonnes. */}
                          {o.colonnes.length > 1 && (
                            <p className="rail-label px-2 pt-2 pb-1" style={{ color: encre }}>
                              {c.titre}
                            </p>
                          )}
                          <ul className="space-y-0.5">
                            {c.entrees.map((e) => (
                              <li key={e.label}>
                                <EntreeMobile e={e} onClick={fermer} />
                              </li>
                            ))}
                          </ul>
                        </div>
                      ))}
                      {o.pied && (
                        <Link
                          to={o.pied.to}
                          hash={o.pied.hash}
                          onClick={fermer}
                          className="block rounded-lg px-2 py-2.5 text-[15px] font-semibold"
                          style={{ color: encre }}
                        >
                          {o.pied.label}
                        </Link>
                      )}
                    </div>
                  </details>
                );
              })}

              <div className="my-2 h-px bg-border" />

              {/* L'agence : à plat sur mobile, trois liens ne méritent pas un
                  volet de plus. */}
              {AGENCE.map((e) =>
                current === "blog" && e.to === "/blog/" ? (
                  <span key={e.label} aria-current="page" className={`${lien} text-brand-ink`}>
                    {e.label}
                  </span>
                ) : (
                  <Link key={e.label} to={e.to} onClick={fermer} className={lien}>
                    {e.label}
                    <ArrowUpRight className="h-4 w-4 text-muted-foreground" />
                  </Link>
                ),
              )}

              {!onHome && (
                <Link to="/" onClick={fermer} className={lien}>
                  Accueil
                  <ArrowUpRight className="h-4 w-4 text-muted-foreground" />
                </Link>
              )}
            </nav>

            {/* Le pied de la feuille. Les deux actions y sont toujours à la
                même place, quel que soit ce qui est déplié au-dessus. */}
            <div className="sticky bottom-0 border-t border-border bg-card/95 p-3 backdrop-blur">
              {/* Une page de service vend son offre (questionnaire, téléphone) ;
                  partout ailleurs, l'action est de créer son site dans l'application. */}
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
                    className="mt-2 flex h-11 items-center justify-center gap-2 rounded-xl border border-border text-[15px] font-semibold text-foreground"
                  >
                    <Phone className="h-4 w-4 text-brand-ink" />
                    {SITALY_PHONE_DISPLAY}
                  </a>
                </>
              ) : (
                <>
                  <a href={`${APP_URL}/`} onClick={fermer} className="bouton h-12 w-full text-base">
                    Créer mon site
                    <ArrowRight className="bouton-fleche h-4 w-4" />
                  </a>
                  <a
                    href={`${APP_URL}/connexion`}
                    onClick={fermer}
                    className="mt-2 flex h-11 items-center justify-center rounded-xl border border-border text-[15px] font-semibold text-foreground"
                  >
                    Se connecter
                  </a>
                </>
              )}
            </div>
          </div>
        </>
      )}
    </>
  );
}

/** Une entrée d'onglet : le libellé, et le prix quand c'est une offre de la grille. */
function EntreeMobile({ e, onClick }: { e: EntreeMenu; onClick: () => void }) {
  const classe =
    "entree-famille flex items-center gap-3 rounded-lg px-2 py-2 text-[15px] text-muted-foreground";
  const contenu = (
    <>
      {e.icone && (
        <span className="pastille-famille grid h-8 w-8 shrink-0 place-items-center rounded-lg">
          <e.icone className="h-4 w-4" />
        </span>
      )}
      <span className="min-w-0 flex-1">{e.label}</span>
      {e.prix && (
        <span className="shrink-0 text-[13px] font-semibold whitespace-nowrap tabular-nums text-[color:var(--encre-famille)]">
          {e.prix}
        </span>
      )}
    </>
  );
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
