import { useEffect, useState } from "react";
import { Link } from "@tanstack/react-router";
import { Calendar, Menu, Phone, X } from "lucide-react";
import { FAMILLES, entreesFamille } from "@/data/expertises";
import { METIERS } from "@/lib/metiers";
import { CALENDLY_URL, SITALY_PHONE, SITALY_PHONE_DISPLAY } from "@/lib/config";

/**
 * Menu de navigation mobile, partagé par tous les en-têtes du site.
 *
 * Il listait sept ancres vers des sections de l'accueil : sur toute autre page,
 * la moitié pointait dans le vide. Il reprend désormais la structure du menu
 * de bureau, famille par famille, avec les mêmes destinations. Un visiteur au
 * téléphone doit atteindre la page « site e-commerce » aussi directement qu'au
 * clavier, et c'est de loin le cas le plus fréquent.
 *
 * Les familles sont repliées à l'ouverture : dix-huit liens déroulés d'un coup
 * demandent de faire défiler avant de comprendre le classement. `details`
 * suffit à les replier, sans état ni bibliothèque.
 *
 * variant "bar"      : en-tête pleine largeur
 * variant "floating" : en-tête flottant arrondi
 */
export function MobileMenu({
  variant = "bar",
  onHome = false,
  current,
}: {
  variant?: "bar" | "floating";
  /** Conservé pour les appelants : l'accueil est atteint par la route. */
  onHome?: boolean;
  current?: "agents-ia" | "blog";
}) {
  const [open, setOpen] = useState(false);
  const fermer = () => setOpen(false);

  // Empêche le défilement de la page derrière le menu ouvert.
  useEffect(() => {
    if (!open) return;
    const precedent = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = precedent;
    };
  }, [open]);

  // Referme le menu si l'écran repasse en bureau.
  useEffect(() => {
    const mq = window.matchMedia("(min-width: 1024px)");
    const close = () => mq.matches && setOpen(false);
    mq.addEventListener("change", close);
    return () => mq.removeEventListener("change", close);
  }, []);

  /* Fond opaque : un panneau translucide laisse lire la page au travers, et le
     flou de l'en-tête parent empêche un second flou de s'appliquer ici. */
  const panneau =
    variant === "floating"
      ? "absolute left-0 right-0 top-full z-50 mt-2 max-h-[calc(100vh-var(--entete-hauteur)-1rem)] overflow-y-auto overscroll-contain rounded-3xl border border-border/70 bg-background shadow-elevated lg:hidden"
      : "absolute left-0 right-0 top-full z-50 max-h-[calc(100vh-var(--entete-hauteur))] overflow-y-auto overscroll-contain border-b border-border bg-background shadow-elevated lg:hidden";

  const ligne =
    "flex items-center justify-between border-b border-border/60 py-3.5 text-base font-medium text-foreground";

  return (
    <>
      <button
        type="button"
        onClick={() => setOpen((v) => !v)}
        className={`inline-flex h-11 w-11 shrink-0 items-center justify-center border border-border bg-card text-foreground shadow-soft transition hover:border-accent lg:hidden ${
          variant === "floating" ? "rounded-full" : "rounded-lg"
        }`}
        aria-label={open ? "Fermer le menu" : "Ouvrir le menu"}
        aria-expanded={open}
        aria-controls="menu-mobile"
      >
        {open ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
      </button>

      {open && (
        <div id="menu-mobile" className={panneau}>
          <nav className="flex flex-col px-5 py-2" aria-label="Navigation principale">
            {FAMILLES.map((f) => (
              <details key={f.id} className="group border-b border-border/60">
                <summary className="flex cursor-pointer list-none items-center justify-between py-3.5 marker:content-none">
                  <span className="flex items-center gap-2.5 text-base font-semibold text-foreground">
                    <f.icone className="h-4 w-4 text-brand-ink" />
                    {f.titre}
                  </span>
                  <svg
                    viewBox="0 0 12 12"
                    aria-hidden="true"
                    className="h-3.5 w-3.5 text-muted-foreground transition-transform group-open:rotate-180"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="1.8"
                    strokeLinecap="round"
                  >
                    <path d="M2.5 4.5L6 8l3.5-3.5" />
                  </svg>
                </summary>
                <ul className="pb-2 pl-6">
                  {entreesFamille(f.id).map((e) => (
                    <li key={e.label}>
                      {e.to ? (
                        <Link
                          to={e.to}
                          onClick={fermer}
                          className="block py-2.5 text-[15px] text-muted-foreground"
                        >
                          {e.label}
                        </Link>
                      ) : (
                        <a
                          href={e.href}
                          onClick={fermer}
                          className="block py-2.5 text-[15px] text-muted-foreground"
                        >
                          {e.label}
                        </a>
                      )}
                    </li>
                  ))}
                </ul>
              </details>
            ))}

            <details className="group border-b border-border/60">
              <summary className="flex cursor-pointer list-none items-center justify-between py-3.5 text-base font-medium text-foreground marker:content-none">
                Sites par métier
                <svg
                  viewBox="0 0 12 12"
                  aria-hidden="true"
                  className="h-3.5 w-3.5 text-muted-foreground transition-transform group-open:rotate-180"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="1.8"
                  strokeLinecap="round"
                >
                  <path d="M2.5 4.5L6 8l3.5-3.5" />
                </svg>
              </summary>
              <ul className="pb-2 pl-6">
                {METIERS.map((m) => (
                  <li key={m.to}>
                    <Link
                      to={m.to}
                      onClick={fermer}
                      className="block py-2.5 text-[15px] text-muted-foreground"
                    >
                      {m.label.replace("Site internet ", "Site ")}
                    </Link>
                  </li>
                ))}
              </ul>
            </details>

            <Link to="/realisations/" onClick={fermer} className={ligne}>
              Réalisations
            </Link>

            {current === "blog" ? (
              <span aria-current="page" className={`${ligne} text-brand-ink`}>
                Blog
              </span>
            ) : (
              <Link to="/blog/" onClick={fermer} className={ligne}>
                Blog
              </Link>
            )}

            {!onHome && (
              <Link to="/" onClick={fermer} className={ligne}>
                Accueil
              </Link>
            )}

            <a
              href={`tel:${SITALY_PHONE}`}
              onClick={fermer}
              className="flex items-center gap-2 py-4 text-base font-semibold text-foreground"
            >
              <Phone className="h-4 w-4 text-brand-ink" />
              {SITALY_PHONE_DISPLAY}
            </a>

            <a
              href={CALENDLY_URL}
              target="_blank"
              rel="noopener noreferrer"
              onClick={fermer}
              className="bouton mb-4 h-12 w-full text-base"
            >
              <Calendar className="h-4 w-4" />
              Parler de votre projet
            </a>
          </nav>
        </div>
      )}
    </>
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
