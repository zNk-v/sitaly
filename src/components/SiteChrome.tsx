import { Link } from "@tanstack/react-router";
import type { ReactNode } from "react";
import { SitalyLogo } from "@/components/SitalyLogo";
import { LinkedinLink } from "@/components/LinkedinLink";
import { SiteHeader } from "@/components/SiteHeader";

/**
 * En-tête et pied de page communs aux pages secondaires.
 *
 * L'en-tête était recopié à l'identique dans plusieurs routes, chacune ayant
 * dérivé de son côté. Il vit ici une seule fois. Le pied de page reste la
 * seule surface sombre du site : il sert d'ancre en fin de parcours.
 */
export function SiteChrome({ children }: { children: ReactNode }) {
  return (
    <>
      <SiteHeader />

      <div className="pt-[var(--entete-hauteur)]">{children}</div>

      <footer className="border-t border-white/10 bg-ink py-10 text-white">
        <div className="mx-auto flex max-w-7xl flex-col items-center justify-between gap-4 px-4 text-sm text-white/60 sm:flex-row sm:px-6">
          <SitalyLogo variant="blanc" className="scale-90" />
          <div className="flex flex-wrap items-center justify-center gap-x-6 gap-y-2">
            <Link to="/" className="transition hover:text-white">
              Accueil
            </Link>
            <Link to="/realisations/" className="transition hover:text-white">
              Réalisations
            </Link>
            <Link to="/agents-ia/" className="transition hover:text-white">
              Agents IA
            </Link>
            <a href="/chatgpt-ads/" className="transition hover:text-white">
              ChatGPT Ads
            </a>
            <Link to="/mentions-legales/" className="transition hover:text-white">
              Mentions légales
            </Link>
            <Link to="/cgv/" className="transition hover:text-white">
              CGV
            </Link>
            <LinkedinLink className="h-9 w-9" />
          </div>
        </div>
      </footer>
    </>
  );
}
