import { Link } from "@tanstack/react-router";
import { ArrowRight } from "lucide-react";
import { METIERS, otherMetiers, type MetierLink } from "@/lib/metiers";

/**
 * Section « Sites par métier » — grille de cartes.
 * Utilisée sur l'accueil et en bas des pages métier (avec `exclude`).
 */
export function MetierLinksSection({
  exclude,
  title = "Un site pensé pour votre métier",
  subtitle = "Chaque métier a ses urgences, ses objections et ses mots-clés. Voici les pages dédiées.",
  tone = "default",
}: {
  exclude?: MetierLink["to"];
  title?: string;
  subtitle?: string;
  tone?: "default" | "muted";
}) {
  const items = exclude ? otherMetiers(exclude) : METIERS;

  return (
    <section
      className={
        tone === "muted"
          ? "border-y border-border bg-secondary/30 py-16 sm:py-20"
          : "py-20 sm:py-24"
      }
    >
      <div className="mx-auto max-w-6xl px-4 sm:px-6">
        <div className="mx-auto max-w-2xl text-center">
          <div className="text-xs font-semibold uppercase tracking-wider text-accent">Par métier</div>
          <h2 className="mt-2 font-display text-3xl font-extrabold tracking-tight sm:text-4xl">
            {title}
          </h2>
          <p className="mt-4 text-muted-foreground sm:text-lg">{subtitle}</p>
        </div>

        <div
          className={`mt-10 grid gap-5 sm:grid-cols-2 ${
            items.length >= 4 ? "lg:grid-cols-4" : "lg:grid-cols-3"
          }`}
        >
          {items.map((m) => {
            const Icon = m.icon;
            return (
              <Link
                key={m.to}
                to={m.to}
                className="group rounded-2xl border border-border bg-card p-6 shadow-soft transition hover:shadow-elevated"
              >
                <div className="grid h-10 w-10 place-items-center rounded-lg bg-accent/10 text-accent">
                  <Icon className="h-5 w-5" />
                </div>
                <h3 className="mt-4 font-display text-lg font-bold leading-snug transition group-hover:text-accent">
                  {m.label}
                </h3>
                <p className="mt-2 text-sm leading-relaxed text-muted-foreground">{m.teaser}</p>
                <span className="mt-4 inline-flex items-center gap-1 text-xs font-semibold text-accent">
                  Voir la page
                  <ArrowRight className="h-3.5 w-3.5 transition group-hover:translate-x-0.5" />
                </span>
              </Link>
            );
          })}
        </div>

        <p className="mt-8 text-center text-sm text-muted-foreground">
          Votre métier n'est pas listé ?{" "}
          <Link to="/" hash="contact" className="font-semibold text-accent hover:underline">
            Dites-nous lequel
          </Link>
          , on construit la même chose pour vous.
        </p>
      </div>
    </section>
  );
}

/**
 * Bandeau compact — une ligne de liens texte.
 * Utilisé en bas des articles de blog.
 */
export function MetierLinksStrip() {
  return (
    <section className="border-t border-border bg-background py-10">
      <div className="mx-auto max-w-5xl px-4 sm:px-6">
        <h2 className="font-display text-lg font-bold">Nos sites par métier</h2>
        <ul className="mt-4 flex flex-wrap gap-x-6 gap-y-2 text-sm">
          {METIERS.map((m) => (
            <li key={m.to}>
              <Link
                to={m.to}
                className="inline-flex items-center gap-1.5 font-medium text-accent hover:underline"
              >
                {m.label}
                <ArrowRight className="h-3.5 w-3.5" />
              </Link>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}

/** Liste de liens pour les pieds de page. */
export function MetierFooterLinks({
  className = "",
  linkClassName = "block py-2.5 hover:text-primary-foreground",
}: {
  className?: string;
  linkClassName?: string;
}) {
  return (
    <ul className={className}>
      {METIERS.map((m) => (
        <li key={m.to}>
          <Link to={m.to} className={linkClassName}>
            {m.label}
          </Link>
        </li>
      ))}
    </ul>
  );
}
