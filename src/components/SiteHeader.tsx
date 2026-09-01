import { Link, type LinkProps } from "@tanstack/react-router";
import { Calendar, Menu, Phone, X } from "lucide-react";
import { useState, type ComponentType } from "react";

import { SitalyLogo } from "@/components/SitalyLogo";
import { CALENDLY_URL, PHONE_DISPLAY, PHONE_TEL } from "@/lib/config";

export type HeaderLink = {
  label: string;
  /** Ancre dans la page courante (#faq). Exclusif avec `to`. */
  href?: string;
  /** Route interne (/blog). Rendue en <Link> pour la navigation client. */
  to?: LinkProps["to"];
  /** Mis en avant en couleur d'accent, avec une icône : réservé aux offres. */
  icon?: ComponentType<{ className?: string }>;
  /** Rubrique courante : affichée en pleine couleur plutôt qu'en gris. */
  current?: boolean;
};

/**
 * Bouton d'appel présent en permanence dans l'en-tête. Le numéro complet
 * n'apparaît qu'à partir de lg : en dessous, la place manque et « Appeler »
 * dit la même chose. Le lien reste un tel: dans les deux cas.
 */
export function PhoneButton({ className = "" }: { className?: string }) {
  return (
    <a
      href={`tel:${PHONE_TEL}`}
      className={`inline-flex h-11 shrink-0 items-center gap-2 border border-border bg-card px-3 text-sm font-semibold text-foreground shadow-soft transition hover:border-accent hover:text-accent sm:px-4 ${className || "rounded-lg"}`}
      aria-label={`Appeler Sitaly au ${PHONE_DISPLAY}`}
    >
      <Phone className="h-4 w-4" />
      <span className="hidden lg:inline">{PHONE_DISPLAY}</span>
      <span className="lg:hidden">Appeler</span>
    </a>
  );
}

/**
 * En-tête du site : accueil, blog, articles et pages métier.
 * Les landings publicitaires (/chatgpt-ads, /agents-ia/chatgpt) ont leur propre
 * en-tête, volontairement dépouillé pour ne pas disperser le trafic payant.
 */
export function SiteHeader({
  links,
  logoHash,
  logoLabel = "Sitaly — accueil",
}: {
  links: HeaderLink[];
  /** Sur l'accueil, le logo remonte en haut de page plutôt que de recharger la route. */
  logoHash?: string;
  logoLabel?: string;
}) {
  const [open, setOpen] = useState(false);

  const renderLink = (l: HeaderLink, mobile = false) => {
    const Icon = l.icon;
    const base = Icon
      ? "inline-flex items-center gap-1.5 text-sm font-semibold text-accent hover:opacity-80"
      : l.current
        ? "text-sm font-medium text-foreground"
        : "text-sm font-medium text-muted-foreground hover:text-foreground";
    const cls = mobile ? `${base} py-2` : base;
    const inner = (
      <>
        {Icon && <Icon className="h-3.5 w-3.5" />}
        {l.label}
      </>
    );
    // Une ancre reste un <a> : elle ne change pas de route.
    if (l.href) {
      return (
        <a key={l.label} href={l.href} className={cls} onClick={() => setOpen(false)}>
          {inner}
        </a>
      );
    }
    return (
      <Link
        key={l.label}
        to={l.to}
        className={cls}
        activeProps={{ className: "active" }}
        onClick={() => setOpen(false)}
      >
        {inner}
      </Link>
    );
  };

  return (
    <header className="sticky top-0 z-50 border-b border-border/60 bg-background/80 backdrop-blur-md">
      <div className="relative mx-auto flex h-16 max-w-7xl items-center justify-between px-4 sm:px-6">
        {logoHash ? (
          <a href={logoHash} className="flex items-center" aria-label={logoLabel}>
            <SitalyLogo />
          </a>
        ) : (
          <Link to="/" className="flex items-center" aria-label={logoLabel}>
            <SitalyLogo />
          </Link>
        )}

        <nav className="hidden items-center gap-8 md:flex">{links.map((l) => renderLink(l))}</nav>

        <div className="flex items-center gap-2">
          <PhoneButton />
          <a
            href={CALENDLY_URL}
            target="_blank"
            rel="noopener noreferrer"
            className="hidden h-11 items-center gap-2 rounded-lg bg-primary px-4 text-sm font-semibold text-primary-foreground shadow-soft transition hover:opacity-90 sm:inline-flex"
          >
            <Calendar className="h-4 w-4" />
            Réserver un appel
          </a>
          <button
            type="button"
            onClick={() => setOpen((v) => !v)}
            className="inline-flex h-11 w-11 shrink-0 items-center justify-center rounded-lg border border-border bg-card text-foreground shadow-soft transition hover:border-accent md:hidden"
            aria-label={open ? "Fermer le menu" : "Ouvrir le menu"}
            aria-expanded={open}
            aria-controls="menu-mobile"
          >
            {open ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
          </button>
        </div>

        {open && (
          <div
            id="menu-mobile"
            className="absolute inset-x-0 top-full border-b border-border bg-background px-4 pb-5 shadow-elevated md:hidden sm:px-6"
          >
            <nav className="flex flex-col divide-y divide-border/70">
              {links.map((l) => renderLink(l, true))}
            </nav>
            <a
              href={CALENDLY_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="mt-4 inline-flex h-11 w-full items-center justify-center gap-2 rounded-lg bg-primary px-4 text-sm font-semibold text-primary-foreground shadow-soft transition hover:opacity-90"
            >
              <Calendar className="h-4 w-4" />
              Réserver un appel
            </a>
          </div>
        )}
      </div>
    </header>
  );
}
