import { Link } from "@tanstack/react-router";
import { directiveRobots } from "@/lib/indexation";
import { ArrowRight, Check, ExternalLink, ShieldCheck, Sparkles, Star } from "lucide-react";
import { LinkedinLink } from "@/components/LinkedinLink";
import { SiteHeader } from "@/components/SiteHeader";
import { MetierFooterLinks, MetierLinksSection } from "@/components/MetierLinks";
import type { MetierLink } from "@/lib/metiers";
import { euros } from "@/lib/config";
import { FORMULES, lienCreation } from "@/components/produit/Produit";
import {
  GARANTIE,
  GARANTIE_JOURS,
  MENTION_TVA,
  offresStructurees,
  PHRASE_APERCU,
} from "@/data/offres";
import { SiteFooter } from "@/components/SiteFooter";
import { getModele } from "@/data/modeles";

export interface MetierLandingProps {
  metier: string; // "plombier"
  metierCapitalized: string; // "Plombier"
  /** Route de la page, pour exclure le métier courant du maillage interne. */
  route: MetierLink["to"];
  h1: string;
  intro: string;
  benefits: { title: string; desc: string }[];
  /** Détail de la prestation, propre à chaque métier (contenu unique = pas de duplicate content). */
  included: { title: string; desc: string }[];
  /** Bloc de fond sur le référencement local du métier. */
  localSeo: { title: string; paragraphs: string[] };
  example?: {
    label: string;
    description: string;
    iframeUrl: string;
    exempleHref: string;
  };
  faq: { q: string; a: string }[];
  /**
   * Citation réelle d'un client, telle qu'il l'a écrite. Absente tant qu'aucun
   * client du métier n'en a fourni : la section ne s'affiche pas. Même règle que
   * les témoignages de l'accueil (index.tsx) et les résultats des réalisations.
   */
  testimonial?: { quote: string; name: string; role: string };
  url: string; // canonical full URL
}

export function MetierLanding(props: MetierLandingProps) {
  const {
    metier,
    metierCapitalized,
    route,
    h1,
    intro,
    benefits,
    included,
    localSeo,
    example,
    faq,
    testimonial,
  } = props;
  // Le modèle du métier (/modeles/<id>/), quand il existe : la page lie le
  // modèle, et le modèle lie la page (22 novembre 2026).
  const idModele = route.replace(/^\/site-internet-|\/$/g, "");
  const modele = getModele(idModele);

  return (
    <div className="ambiance-site min-h-screen bg-background text-foreground">
      <LandingNav />

      {/* Hero */}
      <section className="relative overflow-hidden border-b border-border bg-gradient-to-b from-secondary/50 to-background">
        <div className="mx-auto max-w-6xl px-4 pt-[calc(var(--entete-hauteur)+2rem)] pb-16 sm:px-6 sm:pb-24 sm:pt-[calc(var(--entete-hauteur)+4rem)]">
          <div className="inline-flex items-center gap-2 rounded-full border border-accent/30 bg-accent/10 px-3 py-1 text-xs font-semibold uppercase tracking-wider text-accent">
            <Sparkles className="h-3.5 w-3.5" />
            Site internet {metier} créé par l'IA
          </div>
          <h1 className="mt-5 font-display text-4xl font-extrabold leading-tight tracking-tight sm:text-5xl lg:text-6xl">
            {h1}
          </h1>
          <p className="mt-5 max-w-2xl text-lg text-muted-foreground sm:text-xl">{intro}</p>
          {/* Les trois boutons de la page (héros, cartes de tarifs, appel final)
              emportent le métier dans l'application, décision de Ted du 20
              novembre 2026 : le visiteur arrive sur /creer avec son activité
              déjà écrite, au lieu d'un champ vide. */}
          <div className="mt-8 flex flex-wrap items-center gap-3">
            <a href={lienCreation(metierCapitalized)} className="bouton px-7 py-3.5 text-sm">
              Créer mon site
              <ArrowRight className="bouton-fleche h-4 w-4" />
            </a>
            {/* « Voir les tarifs » descend vers la section Tarifs de cette page,
                qui affiche les trois formules de l'application depuis le 19
                novembre 2026. Avant, il renvoyait vers `/#offre`, un ancrage
                que l'accueil n'a plus : le visiteur perdait son métier en route
                et retombait en haut de la page d'accueil. */}
            <a href="#tarifs" className="bouton-secondaire px-6 py-3.5 text-sm">
              Voir les tarifs
            </a>
          </div>
          <div className="mt-8 flex flex-wrap items-center gap-x-6 gap-y-2 text-sm text-muted-foreground">
            <span className="inline-flex items-center gap-2">
              <Sparkles className="h-4 w-4 text-accent" />
              Aperçu gratuit, sans compte ni carte
            </span>
            <span className="inline-flex items-center gap-2">
              <ShieldCheck className="h-4 w-4 text-accent" />
              Pas d'engagement caché
            </span>
            <span className="inline-flex items-center gap-2">
              <Check className="h-4 w-4 text-accent" />
              SEO local inclus
            </span>
          </div>
          {modele && (
            <a
              href={`/modeles/${modele.id}/`}
              className="mt-6 inline-flex items-center gap-1.5 text-sm font-semibold text-accent hover:underline"
            >
              Voir le modèle de site {deMetier(metier)}
              <ArrowRight className="h-4 w-4" />
            </a>
          )}
        </div>
      </section>

      {/* Benefits */}
      <section className="py-16 sm:py-20">
        <div className="mx-auto max-w-6xl px-4 sm:px-6">
          <h2 className="font-display text-3xl font-bold tracking-tight sm:text-4xl">
            Pourquoi un site {metier} change tout
          </h2>
          <p className="mt-3 max-w-2xl text-muted-foreground">
            Ce que vos clients cherchent avant de vous appeler, et ce que le site leur montre.
          </p>
          <div className="mt-10 grid gap-5 md:grid-cols-3">
            {benefits.map((b) => (
              <article
                key={b.title}
                className="rounded-2xl border border-border bg-card p-6 shadow-soft"
              >
                <div className="grid h-10 w-10 place-items-center rounded-lg bg-accent/10 text-accent">
                  <Check className="h-5 w-5" />
                </div>
                <h3 className="mt-4 font-display text-lg font-bold">{b.title}</h3>
                <p className="mt-2 text-base leading-relaxed text-muted-foreground sm:text-sm">
                  {b.desc}
                </p>
              </article>
            ))}
          </div>
        </div>
      </section>

      {/* Ce qui est inclus */}
      <section className="border-t border-border bg-secondary/30 py-16 sm:py-20">
        <div className="mx-auto max-w-6xl px-4 sm:px-6">
          <h2 className="font-display text-3xl font-bold tracking-tight sm:text-4xl">
            Ce que comprend votre site {metier}
          </h2>
          <p className="mt-3 max-w-2xl text-muted-foreground">
            L'hébergement, le cadenas HTTPS et les mises à jour sont compris. Vous n'installez rien :
            vous décrivez votre activité, l'IA écrit le site, vous le retouchez quand vous voulez.
          </p>
          <div className="mt-10 grid gap-x-10 gap-y-7 md:grid-cols-2">
            {included.map((it) => (
              <div key={it.title} className="flex gap-3.5">
                <Check className="mt-1 h-5 w-5 flex-shrink-0 text-accent" />
                <div>
                  <h3 className="font-display text-base font-bold">{it.title}</h3>
                  <p className="mt-1.5 text-sm leading-relaxed text-muted-foreground">{it.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Example */}
      {example && (
        <section className="border-y border-border bg-background py-16 sm:py-20">
          <div className="mx-auto max-w-6xl px-4 sm:px-6">
            <div className="grid items-center gap-10 lg:grid-cols-[1.1fr_1fr]">
              <div className="overflow-hidden rounded-2xl border border-border bg-background shadow-elevated">
                <iframe
                  src={example.iframeUrl}
                  title={`Exemple site ${metier} — ${example.label}`}
                  className="h-[420px] w-full border-0 sm:h-[520px]"
                  loading="lazy"
                />
              </div>
              <div>
                <span className="text-xs font-semibold uppercase tracking-widest text-accent">
                  Exemple réel
                </span>
                <h2 className="mt-2 font-display text-3xl font-bold sm:text-4xl">
                  {example.label}
                </h2>
                <p className="mt-3 text-muted-foreground">{example.description}</p>
                <a href={example.exempleHref} className="bouton mt-5 px-5 py-2.5 text-sm">
                  Voir l'exemple en grand
                  <ExternalLink className="h-4 w-4" />
                </a>
              </div>
            </div>
          </div>
        </section>
      )}

      {/* SEO local */}
      <section className="border-t border-border bg-secondary/30 py-16 sm:py-20">
        <div className="mx-auto max-w-3xl px-4 sm:px-6">
          <span className="text-xs font-semibold uppercase tracking-widest text-accent">
            Référencement local
          </span>
          <h2 className="mt-2 font-display text-3xl font-bold tracking-tight sm:text-4xl">
            {localSeo.title}
          </h2>
          <div className="mt-6 space-y-5">
            {localSeo.paragraphs.map((p, i) => (
              <p key={i} className="leading-relaxed text-foreground/85">
                {p}
              </p>
            ))}
          </div>
          <p className="mt-6 text-sm text-muted-foreground">
            Pour comprendre la méthode en détail, lisez notre guide{" "}
            <Link
              to="/blog/$slug/"
              params={{ slug: "referencement-local-google-artisan" }}
              className="font-semibold text-accent hover:underline"
            >
              référencement local artisan
            </Link>{" "}
            et notre article sur les{" "}
            <Link
              to="/blog/$slug/"
              params={{ slug: "seo-local-villes-pages-artisan" }}
              className="font-semibold text-accent hover:underline"
            >
              pages par ville
            </Link>
            .
          </p>
        </div>
      </section>

      {/* Tarifs : les deux formules de l'application, lues dans FORMULES
          (src/components/produit/Produit.tsx), la même source que `/tarifs/`.
          Décision de Ted du 19 novembre 2026 : les pages métier vendent
          l'application, elles affichent donc ses prix, et plus ceux de
          l'agence (Présence et Présence Pro, qui restent dans offres.ts). */}
      <section id="tarifs" className="scroll-mt-28 py-16 sm:py-20">
        <div className="mx-auto max-w-6xl px-4 sm:px-6">
          <h2 className="display-section">
            Combien coûte un site internet <span className="accent-word">{metier}</span>
          </h2>
          <p className="measure mt-4 text-sm font-semibold text-foreground/80">
            {PHRASE_APERCU} Au mois, sans engagement, et satisfait ou remboursé pendant{" "}
            {GARANTIE_JOURS} jours.
          </p>
          <div className="mt-8 grid max-w-4xl gap-5 md:grid-cols-2">
            {FORMULES.map((f) => (
              <article
                key={f.nom}
                className={`flex flex-col rounded-2xl p-7 ${
                  f.badge
                    ? "border-2 border-primary bg-primary/5 shadow-elevated"
                    : "border border-border bg-card shadow-soft"
                }`}
              >
                <div className="flex items-center justify-between">
                  <div
                    className={`text-xs font-semibold uppercase tracking-wider ${
                      f.badge ? "text-primary" : "text-muted-foreground"
                    }`}
                  >
                    {f.nom}
                  </div>
                  {f.badge && (
                    <span className="rounded-full bg-primary px-2.5 py-1 text-[10px] font-bold uppercase tracking-wider text-primary-foreground">
                      {f.badge}
                    </span>
                  )}
                </div>
                <div className="mt-3 font-display text-3xl font-extrabold tracking-tight tabular-nums">
                  {euros(f.appel ? f.appel.mensuel : f.mensuel)}
                  <span className="text-base font-medium text-muted-foreground">/mois</span>
                </div>
                {f.appel && (
                  <p className="mt-0.5 text-sm text-muted-foreground">
                    les {f.appel.mois} premiers mois, puis {euros(f.appel.ensuite)} par mois
                  </p>
                )}
                <p className="mt-1 text-sm font-medium text-foreground/80">{f.pour}</p>
                {f.intro && (
                  <p className="mt-5 text-sm font-semibold text-foreground/80">{f.intro}</p>
                )}
                <ul className={`space-y-2.5 text-sm ${f.intro ? "mt-2.5" : "mt-5"}`}>
                  {/* Les fonctions en préparation (`bientot`) restent hors de
                      ces cartes : sans la pastille « Bientôt » de /tarifs/,
                      elles se liraient comme des fonctions ouvertes. */}
                  {f.fonctions
                    .filter((fn) => !fn.bientot)
                    .map((fn) => (
                      <li key={fn.titre} className="flex items-start gap-2.5">
                        <Check
                          className={`mt-0.5 h-4 w-4 flex-shrink-0 ${
                            f.badge ? "text-primary" : "text-accent"
                          }`}
                        />
                        <span>{fn.titre}</span>
                      </li>
                    ))}
                </ul>
                <div className="mt-auto pt-7">
                  <a
                    href={lienCreation(metierCapitalized)}
                    className={`${f.badge ? "bouton" : "bouton-secondaire"} w-full px-5 py-3 text-sm`}
                  >
                    {f.bouton}
                  </a>
                  <p className="mt-2.5 flex items-center justify-center gap-1.5 text-xs text-muted-foreground">
                    <ShieldCheck className="h-3.5 w-3.5" aria-hidden="true" />
                    {GARANTIE}
                  </p>
                </div>
              </article>
            ))}
          </div>
          <p className="mt-6 text-center text-sm text-muted-foreground">
            Payé à l'année, c'est 15 % de moins. Le détail des deux formules :{" "}
            <Link to="/tarifs/" className="font-semibold text-accent hover:underline">
              voir tous les tarifs
            </Link>
            . {MENTION_TVA}.
          </p>
        </div>
      </section>

      {/* Testimonial */}
      {testimonial && (
        <section className="border-y border-border bg-secondary/30 py-14">
          <div className="mx-auto max-w-3xl px-4 text-center sm:px-6">
            <div className="inline-flex gap-0.5 text-accent">
              {[...Array(5)].map((_, i) => (
                <Star key={i} className="h-5 w-5 fill-current" />
              ))}
            </div>
            <blockquote className="mt-5 font-display text-2xl font-medium leading-snug text-foreground sm:text-3xl">
              « {testimonial.quote} »
            </blockquote>
            <figcaption className="mt-5 text-sm text-muted-foreground">
              <span className="font-semibold text-foreground">{testimonial.name}</span> —{" "}
              {testimonial.role}
            </figcaption>
          </div>
        </section>
      )}

      {/* Outil gratuit : porte d'entrée SEO et aimant à liens. Le calculateur
          de budget Google Ads est sorti de cette liste le 19 novembre 2026
          (décision de Ted) : il est hors index depuis le 9 novembre et il
          s'adressait à l'ancienne offre d'agence. */}
      <section className="py-14">
        <div className="mx-auto max-w-3xl px-4 sm:px-6">
          <h2 className="font-display text-2xl font-bold tracking-tight">
            Un outil gratuit pour votre activité {deMetier(metier)}
          </h2>
          <ul className="mt-5 space-y-3 text-foreground/85">
            <li>
              <Link
                to="/outils/audit-fiche-google/"
                className="font-semibold text-accent hover:underline"
              >
                Auditez votre fiche Google en 3 minutes
              </Link>{" "}
              : un score sur 100 et la liste des points à corriger.
            </li>
          </ul>
        </div>
      </section>

      {/* FAQ */}
      <section className="py-16 sm:py-20">
        <div className="mx-auto max-w-3xl px-4 sm:px-6">
          <h2 className="font-display text-3xl font-bold tracking-tight sm:text-4xl">
            Questions fréquentes : {metierCapitalized}
          </h2>
          <div className="mt-8 divide-y divide-border rounded-2xl border border-border bg-card">
            {faq.map((it, i) => (
              <details key={i} className="group px-5 py-4 open:bg-accent/5 sm:px-6">
                <summary className="cursor-pointer list-none font-semibold text-foreground marker:hidden">
                  <span className="mr-2 text-accent">Q.</span>
                  {it.q}
                </summary>
                <p className="mt-2 text-foreground/85">{it.a}</p>
              </details>
            ))}
          </div>
        </div>
      </section>

      {/* Maillage vers les autres métiers */}
      <MetierLinksSection
        exclude={route}
        tone="muted"
        title="Vous exercez un autre métier ?"
        subtitle="Les mêmes fondations, adaptées aux urgences et aux mots-clés de chaque activité."
      />

      {/* Final CTA */}
      <section className="bg-primary py-16 text-primary-foreground sm:py-20">
        <div className="mx-auto max-w-4xl px-4 text-center sm:px-6">
          <h2 className="font-display text-3xl font-extrabold sm:text-4xl">
            Prêt à recevoir plus d'appels qualifiés ?
          </h2>
          <p className="mt-3 text-primary-foreground/90">
            Répondez à trois questions sur votre activité : l'IA crée votre site {metier}, et vous
            le voyez en entier avant de payer.
          </p>
          <a
            href={lienCreation(metierCapitalized)}
            className="mt-7 inline-flex items-center gap-2 rounded-xl bg-background px-7 py-3.5 text-sm font-semibold text-foreground shadow-elevated transition hover:opacity-95"
          >
            Créer mon site
            <ArrowRight className="h-4 w-4" />
          </a>
        </div>
      </section>

      <SiteFooter />
    </div>
  );
}

function LandingNav() {
  return <SiteHeader nav="simple" />;
}

/** « de plombier », mais « d'électricien » : l'élision devant voyelle ou h muet. */
function deMetier(metier: string): string {
  return /^[aeiouyàâäéèêëîïôöûüh]/i.test(metier) ? `d'${metier}` : `de ${metier}`;
}

export function buildMetierMeta(opts: {
  title: string;
  description: string;
  url: string;
  metier: string;
  faq: { q: string; a: string }[];
}) {
  const { title, description, url, metier, faq } = opts;
  return {
    meta: [
      { title },
      { name: "description", content: description },
      // Pages métier sorties de l'index le 26 septembre 2026 : elles restent
      // en ligne pour la prospection directe (src/lib/indexation.ts).
      { name: "robots", content: directiveRobots(new URL(url).pathname) },
      { property: "og:title", content: title },
      { property: "og:description", content: description },
      { property: "og:type", content: "website" },
      { property: "og:url", content: url },
      { property: "og:site_name", content: "Sitaly" },
      { property: "og:locale", content: "fr_FR" },
      { name: "twitter:card", content: "summary_large_image" },
      { name: "twitter:title", content: title },
      { name: "twitter:description", content: description },
    ],
    links: [{ rel: "canonical", href: url }],
    scripts: [
      {
        type: "application/ld+json",
        children: JSON.stringify({
          "@context": "https://schema.org",
          "@type": "Service",
          serviceType: `Création de site internet pour ${metier}`,
          provider: {
            "@type": "Organization",
            name: "Sitaly",
            url: "https://sitaly.fr",
          },
          areaServed: { "@type": "Country", name: "France" },
          // Les deux formules de l'application et leur prix, comme la section
          // Tarifs de la page et comme `/` et `/tarifs/` : une page qui
          // affiche 19, 39 et 79 € ne peut pas en déclarer 149 à Google.
          offers: offresStructurees(),
          url,
        }),
      },
      {
        type: "application/ld+json",
        children: JSON.stringify({
          "@context": "https://schema.org",
          "@type": "FAQPage",
          mainEntity: faq.map((it) => ({
            "@type": "Question",
            name: it.q,
            acceptedAnswer: { "@type": "Answer", text: it.a },
          })),
        }),
      },
      {
        type: "application/ld+json",
        children: JSON.stringify({
          "@context": "https://schema.org",
          "@type": "BreadcrumbList",
          itemListElement: [
            { "@type": "ListItem", position: 1, name: "Accueil", item: "https://sitaly.fr" },
            { "@type": "ListItem", position: 2, name: title, item: url },
          ],
        }),
      },
    ],
  };
}
