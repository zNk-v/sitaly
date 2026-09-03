import { useEffect, useState } from "react";
import { Link } from "@tanstack/react-router";
import { Calendar, Menu, MessageSquare, Phone, Sparkles, X } from "lucide-react";
import { CALENDLY_URL, SITALY_PHONE, SITALY_PHONE_DISPLAY } from "@/lib/config";

/**
 * Menu de navigation mobile, partagé par tous les en-têtes du site.
 * À placer dans la barre du header : le bouton reste dans le flux, le panneau
 * s'ouvre en absolu sous l'en-tête (qui doit donc porter la classe `relative`).
 *
 * variant "bar"      : en-tête pleine largeur (accueil, acquisition, blog, métiers)
 * variant "floating" : en-tête flottant arrondi (agents IA)
 */
export function MobileMenu({
  variant = "bar",
  onHome = false,
  current,
}: {
  variant?: "bar" | "floating";
  onHome?: boolean;
  current?: "agents-ia" | "blog";
}) {
  const [open, setOpen] = useState(false);
  const prefix = onHome ? "" : "/";

  // Empêche le scroll de la page derrière le menu ouvert.
  useEffect(() => {
    if (!open) return;
    const previous = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = previous;
    };
  }, [open]);

  // Referme le menu si l'écran repasse en desktop.
  useEffect(() => {
    const mq = window.matchMedia("(min-width: 768px)");
    const close = () => mq.matches && setOpen(false);
    mq.addEventListener("change", close);
    return () => mq.removeEventListener("change", close);
  }, []);

  const links = [
    { label: "Offres", href: `${prefix}#offre` },
    { label: "Exemples", href: `${prefix}#exemples` },
    { label: "Process", href: `${prefix}#process` },
    { label: "FAQ", href: `${prefix}#faq` },
  ];

  // Fond opaque : un panneau translucide laisse lire le contenu de la page au travers,
  // et le backdrop-filter du header parent empêche un second flou de s'appliquer ici.
  const panelClass =
    variant === "floating"
      ? "absolute left-0 right-0 top-full z-50 mt-2 overflow-hidden rounded-3xl border border-border/70 bg-background shadow-elevated lg:hidden"
      : "absolute left-0 right-0 top-full z-50 border-b border-border bg-background shadow-elevated lg:hidden";

  const itemClass = "border-b border-border/60 py-3.5 text-base font-medium text-foreground";

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
        <div id="menu-mobile" className={panelClass}>
          <nav className="flex flex-col px-5 py-2">
            {current === "agents-ia" ? (
              <span
                aria-current="page"
                className="flex items-center gap-2 border-b border-border/60 py-3.5 text-base font-semibold text-accent"
              >
                <Sparkles className="h-4 w-4" />
                Agents IA
              </span>
            ) : (
              <Link
                to="/agents-ia/"
                onClick={() => setOpen(false)}
                className="flex items-center gap-2 border-b border-border/60 py-3.5 text-base font-semibold text-accent"
              >
                <Sparkles className="h-4 w-4" />
                Agents IA
              </Link>
            )}

            {/* Page statique hors routeur React : lien classique, pas de <Link>. */}
            <a
              href="/chatgpt-ads/"
              onClick={() => setOpen(false)}
              className="flex items-center gap-2 border-b border-border/60 py-3.5 text-base font-semibold text-accent"
            >
              <MessageSquare className="h-4 w-4" />
              ChatGPT Ads
            </a>

            {!onHome && (
              <Link to="/" onClick={() => setOpen(false)} className={itemClass}>
                Accueil
              </Link>
            )}

            {links.map((l) => (
              <a key={l.href} href={l.href} onClick={() => setOpen(false)} className={itemClass}>
                {l.label}
              </a>
            ))}

            {current === "blog" ? (
              <span aria-current="page" className={`${itemClass} text-accent`}>
                Blog
              </span>
            ) : (
              <Link to="/blog/" onClick={() => setOpen(false)} className={itemClass}>
                Blog
              </Link>
            )}

            <a href={`${prefix}#contact`} onClick={() => setOpen(false)} className={itemClass}>
              Contact
            </a>

            <a
              href={`tel:${SITALY_PHONE}`}
              onClick={() => setOpen(false)}
              className="flex items-center gap-2 py-3.5 text-base font-semibold text-foreground"
            >
              <Phone className="h-4 w-4 text-accent" />
              {SITALY_PHONE_DISPLAY}
            </a>

            <a
              href={CALENDLY_URL}
              target="_blank"
              rel="noopener noreferrer"
              onClick={() => setOpen(false)}
              className="my-3 inline-flex h-12 items-center justify-center gap-2 rounded-xl bg-primary text-base font-semibold text-primary-foreground shadow-soft"
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

/** Bouton d'appel compact, affiché dans tous les en-têtes. */
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
