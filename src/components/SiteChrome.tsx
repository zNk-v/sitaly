import { Link } from "@tanstack/react-router";
import { Calendar } from "lucide-react";
import type { ReactNode } from "react";
import { SitalyLogo } from "@/components/SitalyLogo";
import { LinkedinLink } from "@/components/LinkedinLink";
import { HeaderCallButton, MobileMenu } from "@/components/MobileMenu";
import { MainNav } from "@/components/MainNav";
import { CALENDLY_URL } from "@/lib/config";

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
      <header className="sticky top-0 z-50 border-b border-border bg-paper/85 backdrop-blur-md">
        <div
          className="scroll-progress absolute inset-x-0 bottom-0 h-px origin-left bg-gradient-to-r from-brand to-accent"
          aria-hidden="true"
        />
        <div className="relative mx-auto flex h-16 max-w-7xl items-center justify-between px-4 sm:px-6">
          <Link to="/" aria-label="Retour à l'accueil Sitaly" className="flex items-center">
            <SitalyLogo />
          </Link>

          <MainNav />

          <div className="flex items-center gap-2">
            <HeaderCallButton />
            <a
              href={CALENDLY_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="hidden h-11 items-center gap-2 rounded-lg bg-accent px-4 text-sm font-semibold text-accent-foreground transition hover:brightness-110 sm:inline-flex"
            >
              <Calendar className="h-4 w-4" />
              Réserver un appel
            </a>
            <MobileMenu />
          </div>
        </div>
      </header>

      {children}

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
