import { Link } from "@tanstack/react-router";
import { ArrowRight, Calendar, Phone } from "lucide-react";
import { SiteHeader } from "@/components/SiteHeader";
import { SiteFooter } from "@/components/SiteFooter";
import { CALENDLY_URL, SITALY_PHONE, SITALY_PHONE_DISPLAY } from "@/lib/config";

/**
 * La page introuvable. GitHub Pages sert /404.html pour toute adresse
 * inconnue : ce fichier est prérendu depuis la route /404
 * (src/routes/404.tsx), et le routeur affiche le même composant quand il ne
 * reconnaît pas une adresse. Même balisage des deux côtés, pour que
 * l'hydratation retombe sur ses pieds.
 *
 * Elle garde la navigation complète et propose les pages qui comptent :
 * les agents IA, ChatGPT Ads, le blog et le contact.
 */
const PISTES = [
  {
    titre: "Agents IA pour PME",
    texte: "Accueil téléphonique, rendez-vous, relances : ce que les agents prennent en charge.",
    to: "/agents-ia/",
  },
  {
    titre: "Agence ChatGPT Ads",
    texte: "La publicité dans ChatGPT, mesurée avant la première dépense.",
    // Page statique de public/ : un lien classique, pas le routeur.
    href: "/chatgpt-ads/",
  },
  {
    titre: "Le blog",
    texte: "Agents IA, ChatGPT Ads, automatisation : les articles publiés.",
    to: "/blog/",
  },
] as const;

export function PageIntrouvable() {
  return (
    <div className="min-h-screen bg-background text-foreground">
      <SiteHeader />
      <main>
        <section className="on-wash pt-[calc(var(--entete-hauteur)+3rem)] pb-16 sm:pt-[calc(var(--entete-hauteur)+5rem)] sm:pb-24">
          <div className="mx-auto max-w-7xl px-4 sm:px-6">
            <p className="rail-label text-muted-foreground">Erreur 404</p>
            <h1 className="display-hero mt-6 max-w-4xl">Page introuvable</h1>
            <p className="measure mt-6 text-lg leading-relaxed text-foreground/75 sm:text-xl">
              L'adresse demandée n'existe pas ou a changé. Les pages ci-dessous sont un bon point de
              départ, et le téléphone reste le plus court chemin.
            </p>

            <ul className="mt-12 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
              {PISTES.map((p) => {
                const contenu = (
                  <>
                    <span className="font-display text-lg font-bold leading-snug">{p.titre}</span>
                    <span className="mt-2 text-sm leading-relaxed text-muted-foreground">
                      {p.texte}
                    </span>
                    <span className="mt-auto inline-flex items-center gap-1.5 pt-4 text-sm font-semibold text-brand-ink">
                      Voir la page
                      <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-0.5" />
                    </span>
                  </>
                );
                const classe =
                  "group flex h-full flex-col rounded-2xl border border-border bg-card p-6 shadow-soft transition hover:shadow-elevated";
                return (
                  <li key={p.titre}>
                    {"href" in p ? (
                      <a href={p.href} className={classe}>
                        {contenu}
                      </a>
                    ) : (
                      <Link to={p.to} className={classe}>
                        {contenu}
                      </Link>
                    )}
                  </li>
                );
              })}
              <li>
                <Link
                  to="/"
                  hash="contact"
                  className="group flex h-full flex-col rounded-2xl border border-border bg-card p-6 shadow-soft transition hover:shadow-elevated"
                >
                  <span className="font-display text-lg font-bold leading-snug">
                    Nous contacter
                  </span>
                  <span className="mt-2 text-sm leading-relaxed text-muted-foreground">
                    Un diagnostic offert de 30 minutes, par téléphone.
                  </span>
                  <span className="mt-auto inline-flex items-center gap-1.5 pt-4 text-sm font-semibold text-brand-ink">
                    Voir le contact
                    <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-0.5" />
                  </span>
                </Link>
              </li>
            </ul>

            <div className="mt-10 flex flex-wrap items-center gap-3">
              <a
                href={CALENDLY_URL}
                target="_blank"
                rel="noopener noreferrer"
                className="bouton px-7 py-3.5"
              >
                <Calendar className="h-4 w-4" />
                Réserver un diagnostic de 30 min
              </a>
              <a href={`tel:${SITALY_PHONE}`} className="bouton-secondaire px-6 py-3.5">
                <Phone className="h-4 w-4" />
                {SITALY_PHONE_DISPLAY}
              </a>
            </div>
          </div>
        </section>
      </main>
      <SiteFooter />
    </div>
  );
}
