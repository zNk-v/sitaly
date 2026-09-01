import { Link } from "@tanstack/react-router";
import type { ReactNode } from "react";

export function LegalLayout({
  title,
  updated,
  children,
}: {
  title: string;
  updated?: string;
  children: ReactNode;
}) {
  return (
    <div className="min-h-screen bg-background text-foreground">
      <header className="border-b border-border">
        <div className="mx-auto flex max-w-3xl items-center justify-between px-4 py-5 sm:px-6">
          <Link to="/" className="text-sm font-semibold text-primary hover:underline">
            ← Retour à l'accueil
          </Link>
          {updated && (
            <span className="text-xs text-muted-foreground">
              Dernière mise à jour : {updated}
            </span>
          )}
        </div>
      </header>
      <main className="mx-auto max-w-3xl px-4 py-12 sm:px-6 sm:py-16">
        <h1 className="text-3xl font-bold tracking-tight sm:text-4xl">{title}</h1>
        <div className="prose prose-neutral mt-8 max-w-none text-sm leading-7 text-foreground/90 [&_h2]:mt-10 [&_h2]:text-xl [&_h2]:font-semibold [&_h2]:text-foreground [&_h3]:mt-6 [&_h3]:text-base [&_h3]:font-semibold [&_p]:mt-3 [&_ul]:mt-3 [&_ul]:list-disc [&_ul]:pl-6 [&_li]:mt-1 [&_a]:text-primary [&_a]:underline">
          {children}
        </div>
      </main>
      <footer className="border-t border-border py-8 text-center text-xs text-muted-foreground">
        <div className="mx-auto max-w-3xl px-4">
          © {new Date().getFullYear()} Sitaly —{" "}
          <Link to="/mentions-legales" className="hover:underline">Mentions légales</Link> ·{" "}
          <Link to="/politique-confidentialite" className="hover:underline">Confidentialité</Link> ·{" "}
          <Link to="/cgv" className="hover:underline">CGV</Link> ·{" "}
          <Link to="/cookies" className="hover:underline">Cookies</Link>
        </div>
      </footer>
    </div>
  );
}
