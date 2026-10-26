import { createFileRoute, Link } from "@tanstack/react-router";
import { useRef } from "react";
import { ArrowRight, Check, Info, Phone, Plus, X } from "lucide-react";
import { SiteHeader } from "@/components/SiteHeader";
import { PictoRubrique } from "@/components/PictoRubrique";
import { SiteFooter } from "@/components/SiteFooter";
import { TexteAvecLiens } from "@/components/TexteAvecLiens";
import { useRevealOnScroll } from "@/hooks/use-reveal-on-scroll";
import { useSplitWords } from "@/hooks/use-split-words";
import { SITALY_PHONE, euros } from "@/lib/config";
import { texteBrut } from "@/lib/liens-texte";
import { BASE_URL } from "@/lib/sitemap";
import { FAQ_TARIFS as FAQ } from "@/data/faq-tarifs";
import {
  A_LA_CARTE,
  GRILLES,
  GROUPES,
  MENTION_TVA,
  OFFRES,
  RACHAT_SITE,
  offre,
  offresDu,
  type GroupeId,
  type Offre,
  type OffreId,
} from "@/data/offres";

/**
 * Page Tarifs (18 octobre 2026, refondue le 23 octobre) : la grille des
 * offres, prix affichés, et les conditions qui vont avec. Les montants viennent
 * tous de src/data/offres.ts.
 *
 * Trois grilles de trois offres, sur le modèle de devmiweb.com : les sites
 * (#site), les boutiques (#boutique) et les agents IA (#agents-ia), plus la
 * maintenance d'un site existant (#evoluer). Chaque carte porte l'identifiant
 * de son offre : le menu de l'en-tête y mène directement.
 *
 * Mise en page : sur téléphone, les cartes s'empilent et une barre d'appel
 * reste en bas de l'écran. Sur ordinateur, trois cartes par ligne, l'offre
 * recommandée sur l'encre. Le prix mensuel est grand, la mise en service juste
 * en dessous, toujours visible.
 *
 * Hors grille : la visibilité, sans prix, dans un encart rouge « sur devis »
 * (la grille Visibilité est à revoir avec le client).
 */

const mensuel = (id: OffreId) => euros(offre(id).mensuel ?? 0);

const TITRE = "Tarifs Sitaly : site vitrine, boutique en ligne et agents IA";
const DESCRIPTION = `Présence ${mensuel("presence")}/mois, Présence Pro ${mensuel("presence-pro")}/mois, Présence Expert ${mensuel("presence-expert")}/mois, boutique dès ${mensuel("boutique")}/mois, agent IA dès ${mensuel("agent-ia")}/mois. Sans engagement, mise en service affichée.`;
const URL = `${BASE_URL}/tarifs/`;

export const Route = createFileRoute("/tarifs")({
  head: () => ({
    meta: [
      { title: TITRE },
      { name: "description", content: DESCRIPTION },
      { name: "robots", content: "index, follow, max-snippet:-1, max-image-preview:large" },
      { property: "og:title", content: TITRE },
      { property: "og:description", content: DESCRIPTION },
      { property: "og:url", content: URL },
    ],
    links: [{ rel: "canonical", href: URL }],
    scripts: [
      {
        type: "application/ld+json",
        children: JSON.stringify({
          "@context": "https://schema.org",
          "@graph": [
            {
              "@type": "OfferCatalog",
              "@id": `${URL}#offres`,
              name: "Offres de Sitaly",
              url: URL,
              provider: { "@id": `${BASE_URL}/#business` },
              itemListElement: OFFRES.map((o) => ({
                "@type": "Offer",
                name: o.nom,
                description: o.pour,
                priceCurrency: "EUR",
                priceSpecification: [
                  ...(o.mensuel === undefined
                    ? []
                    : [
                        {
                          "@type": "UnitPriceSpecification",
                          ...(o.aPartirDe ? { minPrice: o.mensuel } : { price: o.mensuel }),
                          priceCurrency: "EUR",
                          billingDuration: "P1M",
                          unitText: "mois",
                        },
                      ]),
                  {
                    "@type": "PriceSpecification",
                    ...(o.aPartirDe ? { minPrice: o.depart } : { price: o.depart }),
                    priceCurrency: "EUR",
                    name: o.departLibelle.replace(/^d[e']\s?/, ""),
                  },
                ],
              })),
            },
            {
              "@type": "FAQPage",
              "@id": `${URL}#faq`,
              mainEntity: FAQ.map((f) => ({
                "@type": "Question",
                name: f.q,
                acceptedAnswer: { "@type": "Answer", text: texteBrut(f.a) },
              })),
            },
          ],
        }),
      },
    ],
  }),
  component: Tarifs,
});

function Tarifs() {
  const rootRef = useRef<HTMLDivElement>(null);
  useRevealOnScroll(rootRef);
  useSplitWords(rootRef);

  return (
    <div ref={rootRef} className="min-h-screen bg-background pb-24 text-foreground lg:pb-0">
      <SiteHeader />

      <main>
        {/* ---------- En-tête ---------- */}
        <section className="on-wash pt-[calc(var(--entete-hauteur)+3rem)] pb-12 sm:pt-[calc(var(--entete-hauteur)+4.5rem)] sm:pb-16">
          <div className="mx-auto max-w-7xl px-4 sm:px-6">
            <nav aria-label="Fil d'Ariane" className="rail-label text-muted-foreground">
              <Link to="/" className="transition hover:text-brand-ink">
                Accueil
              </Link>
              <span className="px-2">/</span>
              <span>Tarifs</span>
            </nav>
            <h1 data-split className="display-hero mt-6 max-w-4xl">
              Des tarifs clairs, <span className="accent-word">sans engagement</span>
            </h1>
            <p className="measure mt-6 text-lg leading-relaxed text-foreground/75 sm:text-xl">
              Un abonnement mensuel qui comprend le site, son hébergement, sa maintenance et votre
              fiche Google. Une mise en service payée une fois, affichée sur chaque offre. Vous
              arrêtez quand vous voulez.
            </p>
            <ul className="mt-8 flex flex-wrap gap-x-6 gap-y-2 text-sm text-foreground/75">
              {["Résiliable à tout moment, sans frais", "Réponse sous 24 h", MENTION_TVA].map(
                (t) => (
                  <li key={t} className="flex items-center gap-2">
                    <Check className="h-4 w-4 text-signal-ink" />
                    {t}
                  </li>
                ),
              )}
            </ul>
            {/* Les trois grilles, à un clic, comme le « Comparer les formules »
                de devmiweb.com. */}
            <nav aria-label="Les grilles" className="mt-8 flex flex-wrap gap-2.5">
              {(["site", "boutique", "agents-ia"] as GroupeId[]).map((g) => (
                <a
                  key={g}
                  href={`#${GROUPES[g].ancre}`}
                  className="rounded-full border border-border bg-card px-4 py-2 text-sm font-semibold transition hover:border-foreground/20"
                >
                  {GROUPES[g].titre}
                </a>
              ))}
            </nav>
          </div>
        </section>

        {/* ---------- Les grilles ---------- */}
        <section id="offres" className="bg-paper py-14 sm:py-20">
          <div className="mx-auto max-w-7xl px-4 sm:px-6">
            {/* Chaque famille garde sa couleur, comme sur ses pages : bleu pour
                le site, violet pour les agents IA, rouge pour la visibilité. */}
            <div className="ambiance-site">
              <Grille
                groupe="site"
                titre={
                  <>
                    Un site, et votre fiche Google,{" "}
                    <span className="accent-word">tenus pour vous</span>
                  </>
                }
              />

              <Grille
                groupe="boutique"
                titre={
                  <>
                    Une boutique qui <span className="accent-word">vous appartient</span>
                  </>
                }
              />

              {/* Faire évoluer un site existant : la maintenance, et la refonte
                qui se chiffre comme une création. */}
              <div id={GROUPES.maintenance.ancre} className="mt-20 scroll-mt-28">
                <p data-reveal className="rail-label text-brand-ink">
                  {GROUPES.maintenance.titre}
                </p>
                <div className="mt-6 grid gap-5 lg:grid-cols-2 lg:items-start lg:gap-6">
                  <CarteOffre o={offre("maintenance")} secondaire />
                  <div data-reveal className="lg:pl-6 lg:pt-4">
                    <h2 className="font-display text-[clamp(1.6rem,3vw,2.3rem)] font-extrabold leading-[1.08] tracking-[-0.035em]">
                      Votre site a vieilli ? <span className="accent-word">On le refait</span>
                    </h2>
                    <p className="measure mt-4 text-lg leading-relaxed text-muted-foreground">
                      Une refonte se chiffre comme une création : vous choisissez Présence, Présence
                      Pro ou Présence Expert, et chaque ancienne adresse est redirigée pour ne rien
                      perdre sur Google.
                    </p>
                    <Link
                      to="/refonte-site-internet/"
                      className="mt-6 inline-flex items-center gap-2 font-semibold text-brand-ink"
                    >
                      La refonte de site
                      <ArrowRight className="h-4 w-4" />
                    </Link>
                  </div>
                </div>
              </div>
            </div>

            <div className="ambiance-automatisation mt-20">
              <Grille
                groupe="agents-ia"
                titre={
                  <>
                    Vos demandes traitées, <span className="accent-word">même sans vous</span>
                  </>
                }
              />
            </div>

            {/* La visibilité, sur devis : hors grille, dans l'ambiance de la page
                Demandes de chantier. */}
            <div id="visibilite" className="ambiance-acquisition mt-20 scroll-mt-28">
              <div
                data-reveal
                className="on-ink relative isolate flex flex-col gap-6 overflow-hidden rounded-[2rem] bg-ink p-6 shadow-elevated sm:p-10 lg:flex-row lg:items-center lg:justify-between"
              >
                <div aria-hidden="true" className="foyer-ambiance absolute inset-0 -z-10" />
                <div>
                  <p className="rail-label text-white/60">Visibilité, sur devis</p>
                  <h2 className="mt-3 font-display text-[clamp(1.6rem,3vw,2.3rem)] font-extrabold leading-[1.08] tracking-[-0.035em]">
                    Des demandes de chantier,{" "}
                    <span className="accent-word">pas une pub à gérer</span>
                  </h2>
                  <p className="mt-4 max-w-2xl text-lg leading-relaxed text-white/75">
                    Le prix d'une demande dépend du métier. Il vous est annoncé par écrit avant la
                    première, qui est offerte. Pour exister quand un client décrit son besoin à une
                    IA :{" "}
                    <a
                      href="/chatgpt-ads/"
                      className="font-semibold text-white underline decoration-white/40 underline-offset-4 hover:decoration-white"
                    >
                      ChatGPT Ads
                    </a>
                    .
                  </p>
                </div>
                <Link to="/acquisition/" className="bouton shrink-0 px-7 py-3.5">
                  Voir les demandes de chantier
                  <ArrowRight className="bouton-fleche h-4 w-4" />
                </Link>
              </div>
            </div>
          </div>
        </section>

        {/* ---------- À la carte ---------- */}
        <section id="a-la-carte" className="scroll-mt-28 bg-paper-sunk py-14 sm:py-20">
          <div className="mx-auto grid max-w-6xl gap-10 px-4 sm:px-6 lg:grid-cols-[1fr_1.4fr] lg:gap-16">
            <div data-reveal>
              <h2 data-split className="display-section">
                À la <span className="accent-word">carte</span>
              </h2>
              <p className="measure mt-5 text-lg text-muted-foreground">
                Pour ajouter ce dont vous avez besoin, sans changer d'offre. Chaque option est payée
                une fois.
              </p>
            </div>
            <ul data-reveal className="self-start border-t border-border">
              {A_LA_CARTE.map((a) => (
                <li
                  key={a.libelle}
                  className="flex items-baseline justify-between gap-6 border-b border-border py-4"
                >
                  <span className="min-w-0">{a.libelle}</span>
                  <span className="shrink-0 font-semibold whitespace-nowrap tabular-nums">
                    {euros(a.prix)}
                    {a.detail && (
                      <span className="ml-1 text-sm font-normal text-muted-foreground">
                        {a.detail}
                      </span>
                    )}
                  </span>
                </li>
              ))}
            </ul>
          </div>
        </section>

        {/* ---------- Sans engagement ---------- */}
        <section
          id="sans-engagement"
          className="on-ink relative isolate overflow-hidden bg-ink py-16 sm:py-20"
        >
          <div className="mx-auto max-w-6xl px-4 sm:px-6">
            <div className="grid gap-10 lg:grid-cols-2 lg:gap-16">
              <div data-reveal>
                <h2 data-split className="display-section">
                  Sans engagement, <span className="accent-word">vraiment</span>
                </h2>
                <p className="mt-5 text-lg leading-relaxed text-white/70">
                  Beaucoup de sites pour artisans et commerçants sont loués avec un contrat de
                  plusieurs années, difficile à quitter. Ici, aucune durée minimale : si le site ne
                  vous rapporte rien, vous arrêtez, sans frais.
                </p>
              </div>
              <ul data-reveal className="space-y-4">
                {[
                  "Toutes les offres sont résiliables à tout moment, sans frais.",
                  "La mise en service est payée à la signature. Elle n'est pas remboursable une fois le travail lancé.",
                  "Votre nom de domaine vous est transféré gratuitement à votre départ.",
                  "Votre fiche Google vous appartient, toujours.",
                  "Un site vitrine reste la propriété de Sitaly. À votre départ, il est mis hors ligne, sauf si vous le rachetez.",
                  "Une boutique Shopify vous appartient dès le départ.",
                ].map((t) => (
                  <li key={t} className="flex gap-3">
                    <span className="mt-0.5 grid h-5 w-5 shrink-0 place-items-center rounded-full bg-signal/20">
                      <Check className="h-3 w-3 text-signal" />
                    </span>
                    <span className="text-white/85">{t}</span>
                  </li>
                ))}
              </ul>
            </div>

            <div
              data-reveal
              className="mt-12 rounded-[1.75rem] border border-white/10 bg-white/[0.04] p-6 sm:p-8"
            >
              <p className="font-semibold">Racheter votre site vitrine à votre départ</p>
              <p className="mt-1 text-sm text-white/60">
                Selon l'ancienneté de votre abonnement, en une fois.
              </p>
              <dl className="mt-6 grid gap-4 sm:grid-cols-3">
                {RACHAT_SITE.map((r) => (
                  <div key={r.periode} className="rounded-2xl border border-white/10 p-4">
                    <dt className="text-sm text-white/60">{r.periode}</dt>
                    <dd className="mt-1 font-display text-3xl font-extrabold tracking-[-0.03em] tabular-nums">
                      {euros(r.prix)}
                    </dd>
                  </div>
                ))}
              </dl>
            </div>
            <p className="mt-6 text-sm text-white/55">Prix en euros. {MENTION_TVA}.</p>
          </div>
        </section>

        {/* ---------- FAQ ---------- */}
        <section id="faq" className="bg-paper py-16 sm:py-20">
          <div className="mx-auto max-w-4xl px-4 sm:px-6">
            <h2 data-reveal data-split className="display-section">
              Vos questions <span className="accent-word">sur les tarifs</span>
            </h2>
            <div className="mt-10 border-t border-border">
              {FAQ.map((f) => (
                <details key={f.q} className="group border-b border-border">
                  <summary className="flex cursor-pointer list-none items-center justify-between gap-6 py-5 text-left text-[17px] font-semibold marker:content-none">
                    <span>{f.q}</span>
                    <Plus className="h-5 w-5 shrink-0 text-muted-foreground transition-transform duration-300 group-open:rotate-45" />
                  </summary>
                  <p className="faq-reponse measure pb-6 text-[15px] leading-relaxed text-muted-foreground">
                    <TexteAvecLiens
                      texte={f.a}
                      classeLien="font-medium text-brand-ink underline decoration-brand-ink/30 underline-offset-4"
                    />
                  </p>
                </details>
              ))}
            </div>
          </div>
        </section>
      </main>

      <SiteFooter />

      {/* Barre d'appel mobile, sur le modèle de /essonne et /carte. */}
      <div className="fixed inset-x-0 bottom-0 z-50 border-t border-border bg-background/95 px-4 pt-3 pb-[max(0.75rem,env(safe-area-inset-bottom))] shadow-[0_-8px_24px_-16px_oklch(0.2_0.05_300/0.5)] lg:hidden">
        <div className="mx-auto flex max-w-md gap-3">
          <Link to="/mon-projet/" className="bouton flex-1 px-4 py-3 text-sm">
            Trouver mon offre
          </Link>
          <a href={`tel:${SITALY_PHONE}`} className="bouton-secondaire flex-1 px-4 py-3 text-sm">
            <Phone className="h-4 w-4" aria-hidden="true" />
            Appeler
          </a>
        </div>
      </div>
    </div>
  );
}

/* ---------------- Grille de trois offres ---------------- */

function Grille({ groupe, titre }: { groupe: GroupeId; titre: React.ReactNode }) {
  const g = GROUPES[groupe];
  return (
    <div id={g.ancre} className="mt-20 scroll-mt-28 first:mt-0">
      <div data-reveal className="max-w-3xl">
        <p className="rail-label text-brand-ink">{g.titre}</p>
        <h2 className="mt-3 font-display text-[clamp(1.6rem,3vw,2.3rem)] font-extrabold leading-[1.08] tracking-[-0.035em]">
          {titre}
        </h2>
      </div>
      <div className="mt-8 grid gap-5 lg:grid-cols-3 lg:items-stretch lg:gap-6">
        {offresDu(groupe).map((o) => (
          <CarteOffre key={o.id} o={o} />
        ))}
      </div>
    </div>
  );
}

/* ---------------- Carte d'offre ---------------- */

function CarteOffre({ o, secondaire = false }: { o: Offre; secondaire?: boolean }) {
  const mise = !!o.recommandee;
  const sombre = mise;
  const attenue = sombre ? "text-white/70" : "text-muted-foreground";

  return (
    <article
      id={o.id}
      data-reveal
      className={`relative flex scroll-mt-28 flex-col rounded-[2rem] border p-6 transition duration-300 sm:p-8 ${
        sombre
          ? "on-ink border-transparent bg-ink text-white shadow-elevated ring-1 ring-white/10"
          : "border-border bg-card shadow-soft hover:border-foreground/15 hover:shadow-elevated"
      }`}
    >
      {/* Le filet dégradé de la marque souligne l'offre recommandée. */}
      {mise && (
        <span
          aria-hidden="true"
          className="absolute inset-x-8 top-0 h-px bg-[image:var(--gradient-ruban)]"
        />
      )}

      <div className="flex flex-wrap items-center justify-between gap-3">
        <h3
          className={`font-display font-extrabold tracking-[-0.03em] ${
            secondaire ? "text-[1.5rem]" : "text-[1.85rem]"
          }`}
        >
          {o.nom}
        </h3>
        {mise && (
          <span className="rounded-full bg-[image:var(--gradient-ruban)] px-3 py-1 text-[12px] font-semibold text-white">
            Recommandée
          </span>
        )}
      </div>
      {/* Trois lignes réservées sur ordinateur : une description plus longue
          décalait toutes les lignes de sa carte par rapport aux voisines. */}
      <p className={`mt-2 leading-relaxed lg:min-h-[3lh] ${attenue}`}>{o.pour}</p>

      {/* Le prix : mensuel en grand, frais de départ juste dessous. Sans
          mensuel fixe, c'est la mise en place qui passe en grand. */}
      <div className="mt-7">
        <p className="flex items-baseline gap-1.5">
          {o.aPartirDe && <span className={`font-medium ${attenue}`}>dès</span>}
          <span
            className={`font-display font-extrabold leading-none tracking-[-0.045em] tabular-nums ${
              secondaire ? "text-[2.75rem]" : "text-[3.25rem]"
            }`}
          >
            {euros(o.mensuel ?? o.depart)}
          </span>
          {o.mensuel !== undefined && <span className={`font-medium ${attenue}`}>/mois</span>}
        </p>
        <p
          className={`mt-2 text-[15px] font-medium lg:min-h-[2lh] ${sombre ? "text-white/85" : "text-foreground/80"}`}
        >
          {o.mensuel === undefined
            ? `${o.departLibelle.replace(/^de /, "")}, puis un suivi mensuel chiffré dans le devis`
            : `+ ${o.aPartirDe ? "dès " : ""}${euros(o.depart)} ${o.departLibelle}`}
        </p>
      </div>

      <div className={`my-7 h-px ${sombre ? "bg-white/10" : "bg-border"}`} />

      {/* Toutes les lignes de la grille, comprises ou non : la carte voisine
          a les mêmes, dans le même ordre, et la différence se lit en ligne. */}
      <div className="space-y-6">
        {GRILLES[o.groupe].map((r) => (
          <div key={r.titre}>
            <p className="flex items-center gap-2.5 font-semibold">
              <span
                className={`grid h-8 w-8 shrink-0 place-items-center rounded-lg ${
                  sombre ? "bg-white/10 text-white" : "bg-brand-ink/10 text-brand-ink"
                }`}
              >
                <PictoRubrique icone={r.icone} className="h-4 w-4" />
              </span>
              {r.titre}
            </p>
            <ul className="mt-3 space-y-2.5 text-[15px]">
              {r.lignes.map((l) => {
                const v = l.valeurs[o.id];
                return (
                  <li key={l.libelle} className="flex gap-3">
                    <span
                      className={`mt-0.5 grid h-5 w-5 shrink-0 place-items-center rounded-full ${
                        v
                          ? sombre
                            ? "bg-signal/20 text-signal"
                            : "bg-signal/20 text-signal-ink"
                          : sombre
                            ? "bg-white/5 text-white/35"
                            : "bg-foreground/5 text-foreground/30"
                      }`}
                    >
                      {v ? <Check className="h-3 w-3" /> : <X className="h-3 w-3" />}
                    </span>
                    <span
                      className={
                        v
                          ? sombre
                            ? "text-white/90"
                            : ""
                          : sombre
                            ? "text-white/40"
                            : "text-foreground/40"
                      }
                    >
                      {!v && <span className="sr-only">Non compris : </span>}
                      {l.libelle}
                      {typeof v === "string" && <strong className="font-semibold"> : {v}</strong>}
                    </span>
                  </li>
                );
              })}
            </ul>
          </div>
        ))}
      </div>

      {o.notes && (
        <ul className={`mt-5 space-y-1.5 text-[15px] ${attenue}`}>
          {o.notes.map((n) => (
            <li key={n}>{n}</li>
          ))}
        </ul>
      )}

      {o.mention && (
        <p className="mt-5 flex gap-2.5 rounded-xl bg-paper-sunk px-4 py-3 text-[14px] leading-snug text-foreground/80">
          <Info className="mt-0.5 h-4 w-4 shrink-0 text-muted-foreground" />
          {o.mention}
        </p>
      )}

      <div className="mt-auto pt-8">
        {/* Le questionnaire part de cette offre : il ne reste que l'activité
            et le délai à donner avant le rappel. */}
        <Link
          to="/mon-projet/"
          search={{ offre: o.id }}
          className={`w-full px-6 py-3.5 ${mise || !secondaire ? "bouton" : "bouton-secondaire"}`}
        >
          Choisir cette offre
          <ArrowRight className="bouton-fleche h-4 w-4" />
        </Link>
        {/* La page qui détaille l'offre, quand elle existe : la même que dans le menu. */}
        {o.page && (
          <a
            href={o.page}
            className={`mt-4 block text-center text-sm font-semibold underline underline-offset-4 ${
              sombre
                ? "text-white/80 decoration-white/30 hover:text-white"
                : "text-brand-ink decoration-brand-ink/30"
            }`}
          >
            Voir le détail de l'offre
          </a>
        )}
      </div>
    </article>
  );
}
