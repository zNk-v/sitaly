import { Link } from "@tanstack/react-router";
import { ANNEE_DU_BUILD } from "@/lib/date-du-build";
import type { ReactNode } from "react";
import { LinkedinLink } from "@/components/LinkedinLink";

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
          <Link
            to="/"
            className="inline-flex min-h-11 items-center text-sm font-semibold text-primary hover:underline sm:min-h-0"
          >
            ← Retour à l'accueil
          </Link>
          {updated && (
            <span className="text-xs text-muted-foreground">Dernière mise à jour : {updated}</span>
          )}
        </div>
      </header>
      <main className="mx-auto max-w-3xl px-4 py-12 sm:px-6 sm:py-16">
        <h1 className="text-3xl font-bold tracking-tight sm:text-4xl">{title}</h1>
        {/* Corps en 16 px sur téléphone : les pages légales se lisaient en 14 px,
            donc en zoomant, donc en glissant la page (SITA-28). Les bordures de
            cellules n'arrivent qu'à partir de `md`, où le tableau redevient un
            tableau ; en dessous, chaque ligne est une carte.

            `li>a:only-child` : la liste des navigateurs de /cookies/ est une
            puce par lien, chacun seul sur sa ligne. Un lien seul se touche, donc
            il prend 44 px sur téléphone ; un lien au fil d'une phrase garde la
            hauteur de son interligne. */}
        <div className="prose prose-neutral mt-8 max-w-none text-base leading-7 text-foreground/90 [&_h2]:mt-10 [&_h2]:text-xl [&_h2]:font-semibold [&_h2]:text-foreground [&_h3]:mt-6 [&_h3]:text-base [&_h3]:font-semibold [&_p]:mt-3 [&_ul]:mt-3 [&_ul]:list-disc [&_ul]:pl-6 [&_li]:mt-1 [&_a]:text-primary [&_a]:underline [&_li>a:only-child]:inline-flex [&_li>a:only-child]:min-h-11 [&_li>a:only-child]:items-center sm:[&_li>a:only-child]:min-h-0 [&_table]:mt-4 [&_table]:w-full [&_table]:border-collapse [&_table]:text-left md:[&_td]:border md:[&_td]:border-border md:[&_td]:px-3 md:[&_td]:py-2 md:[&_td]:align-top md:[&_th]:border md:[&_th]:border-border md:[&_th]:bg-secondary/50 md:[&_th]:px-3 md:[&_th]:py-2 md:[&_th]:font-semibold">
          {children}
        </div>
      </main>
      {/* Les quatre liens étaient écrits au fil de la phrase, séparés par des
          points médians : 15 px de haut, la hauteur de leur texte. Sur téléphone
          ils deviennent une rangée de pastilles de 44 px qui se replie ; à partir
          de `sm` ils reprennent leur alignement d'une seule ligne (SITA-28). */}
      <footer className="border-t border-border py-8 text-center text-sm text-muted-foreground sm:text-xs">
        <div className="mx-auto max-w-3xl px-4">
          <div className="mb-5 flex justify-center">
            <LinkedinLink />
          </div>
          <p>© {ANNEE_DU_BUILD} Sitaly</p>
          <ul className="mt-1 flex flex-wrap items-center justify-center gap-x-4">
            {[
              ["/mentions-legales/", "Mentions légales"],
              ["/politique-confidentialite/", "Confidentialité"],
              ["/cgv/", "CGV"],
              ["/cookies/", "Cookies"],
            ].map(([vers, libelle]) => (
              <li key={vers}>
                <Link
                  to={vers}
                  className="inline-flex min-h-11 items-center hover:underline sm:min-h-0"
                >
                  {libelle}
                </Link>
              </li>
            ))}
          </ul>
        </div>
      </footer>
    </div>
  );
}
