import { createFileRoute, Link } from "@tanstack/react-router";
import { useRef, useState } from "react";
import { ArrowRight, Check, Info, Phone, Plus } from "lucide-react";
import { SiteHeader } from "@/components/SiteHeader";
import { SiteFooter } from "@/components/SiteFooter";
import { TexteAvecLiens } from "@/components/TexteAvecLiens";
import { useRevealOnScroll } from "@/hooks/use-reveal-on-scroll";
import { useSplitWords } from "@/hooks/use-split-words";
import { SITALY_PHONE, SITALY_PHONE_DISPLAY, euros } from "@/lib/config";
import { envoyerDemande } from "@/lib/formulaire";
import { texteBrut } from "@/lib/liens-texte";
import { BASE_URL } from "@/lib/sitemap";
import {
  A_LA_CARTE,
  MENTION_TVA,
  OFFRES,
  RACHAT_SITE,
  offre,
  type Offre,
  type OffreId,
} from "@/data/offres";

/**
 * Page Tarifs (18 octobre 2026) : la grille des offres de site, prix
 * affichés, et les conditions qui vont avec. Les montants viennent tous de
 * src/data/offres.ts.
 *
 * Mise en page : sur téléphone, les cartes s'empilent et une barre d'appel
 * reste en bas de l'écran. Sur ordinateur, Présence et Présence Pro côte à
 * côte (Pro mise en avant sur l'encre), puis Boutique et Maintenance sur une
 * ligne secondaire. Le prix mensuel est grand, la mise en service juste en
 * dessous, toujours visible.
 *
 * Hors grille : agents IA, Google Ads et ChatGPT Ads, sans prix, par un lien
 * discret « sur devis ».
 */

const LIEN_DISCRET =
  "underline decoration-border underline-offset-4 transition hover:text-foreground hover:decoration-foreground/40";

const FAQ: { q: string; a: string }[] = [
  {
    q: "Est-ce vraiment sans engagement ?",
    a: "Oui. Toutes les offres se résilient à tout moment, sans frais. Il n'y a pas de durée minimale de contrat. Seule la mise en service, payée à la signature, n'est pas remboursable une fois le travail lancé.",
  },
  {
    q: "À qui appartient mon site ?",
    a: "Pour les sites vitrines (Présence et Présence Pro), le site reste la propriété de Sitaly : c'est ce qui permet d'inclure la création, l'hébergement et la maintenance dans une mensualité sans engagement. Votre fiche Google, elle, vous appartient toujours, et votre nom de domaine vous est transféré si vous partez. Une boutique Shopify vous appartient dès le départ.",
  },
  {
    q: "Que se passe-t-il si j'arrête ?",
    a: `Votre site vitrine est mis hors ligne, sauf si vous choisissez de le racheter : ${RACHAT_SITE.map((r) => `${euros(r.prix)} ${r.periode.toLowerCase().replace("pendant la ", "la ")}`).join(", ")}. Dans tous les cas, votre nom de domaine vous est transféré gratuitement et votre fiche Google reste la vôtre.`,
  },
  {
    q: "Je garde mon nom de domaine ?",
    a: "Oui. Le nom de domaine vous est transféré gratuitement à votre départ, quelle que soit l'offre.",
  },
  {
    q: "Pourquoi des frais de mise en service ?",
    a: "Ils couvrent le travail du départ : l'appel pour comprendre votre activité, la rédaction des pages, la conception du site, sa mise en ligne et la remise en ordre de votre fiche Google. Les payer à la signature permet de garder un abonnement sans engagement : vous ne financez pas ce travail sur des années de contrat. Ils ne sont pas remboursables une fois le travail lancé.",
  },
  {
    q: "Quelle différence entre Présence et Présence Pro ?",
    a: `Présence met en ligne un site vitrine jusqu'à 5 pages et gère votre fiche Google. Présence Pro ajoute ce qui sert à être trouvé plus loin et plus souvent : 5 pages locales pour les communes voisines, des posts et des photos publiés chaque mois sur votre fiche, une demande d'avis envoyée automatiquement après chaque prestation, et un rapport mensuel. Passer de l'une à l'autre coûte ${euros(A_LA_CARTE.find((a) => a.libelle.startsWith("Passage"))?.prix ?? 0)}.`,
  },
  {
    q: "Combien coûte Shopify en plus ?",
    a: "L'abonnement Shopify est à votre nom, environ 36 € par mois, payé directement à Shopify. S'y ajoutent les frais de paiement prélevés sur chaque vente. Ces montants sont fixés par Shopify, pas par Sitaly, qui ne les encaisse pas.",
  },
];

const TITRE = "Tarifs Sitaly : site vitrine, boutique en ligne et maintenance";
const DESCRIPTION = `Présence ${euros(offre("presence").mensuel)}/mois, Présence Pro ${euros(offre("presence-pro").mensuel)}/mois, boutique Shopify, maintenance ${euros(offre("maintenance").mensuel)}/mois. Sans engagement, mise en service affichée.`;
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
                  {
                    "@type": "UnitPriceSpecification",
                    price: o.mensuel,
                    priceCurrency: "EUR",
                    billingDuration: "P1M",
                    unitText: "mois",
                  },
                  {
                    "@type": "PriceSpecification",
                    price: o.depart,
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
  const [choix, setChoix] = useState<OffreId | "">("");

  const [presence, pro, boutique, maintenance] = OFFRES;

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
          </div>
        </section>

        {/* ---------- Grille ---------- */}
        <section id="offres" className="bg-paper py-14 sm:py-20">
          <div className="mx-auto max-w-6xl px-4 sm:px-6">
            <h2 className="sr-only">Les offres</h2>
            <div className="grid gap-5 lg:grid-cols-2 lg:items-stretch lg:gap-6">
              <CarteOffre o={presence} onChoisir={setChoix} />
              <CarteOffre o={pro} onChoisir={setChoix} />
            </div>

            <div data-reveal className="mt-16 max-w-2xl">
              <p className="rail-label text-brand-ink">Autres besoins</p>
              <h2 className="mt-3 font-display text-[clamp(1.6rem,3vw,2.3rem)] font-extrabold leading-[1.08] tracking-[-0.035em]">
                Vendre en ligne, ou garder <span className="accent-word">votre site actuel</span>
              </h2>
            </div>
            <div className="mt-8 grid gap-5 lg:grid-cols-2 lg:gap-6">
              <CarteOffre o={boutique} onChoisir={setChoix} secondaire />
              <CarteOffre o={maintenance} onChoisir={setChoix} secondaire />
            </div>

            <p className="mt-10 text-[15px] text-muted-foreground">
              Besoins spécifiques, sur devis :{" "}
              <Link to="/agents-ia/" className={LIEN_DISCRET}>
                agents IA
              </Link>
              ,{" "}
              <Link to="/acquisition/" className={LIEN_DISCRET}>
                Google Ads
              </Link>
              ,{" "}
              <a href="/chatgpt-ads/" className={LIEN_DISCRET}>
                ChatGPT Ads
              </a>
              .
            </p>
          </div>
        </section>

        {/* ---------- À la carte ---------- */}
        <section className="bg-paper-sunk py-14 sm:py-20">
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

        <Rappel choix={choix} setChoix={setChoix} />
      </main>

      <SiteFooter />

      {/* Barre d'appel mobile, sur le modèle de /essonne et /carte. */}
      <div className="fixed inset-x-0 bottom-0 z-50 border-t border-border bg-background/95 px-4 pt-3 pb-[max(0.75rem,env(safe-area-inset-bottom))] shadow-[0_-8px_24px_-16px_oklch(0.2_0.05_300/0.5)] lg:hidden">
        <div className="mx-auto flex max-w-md gap-3">
          <a href={`tel:${SITALY_PHONE}`} className="bouton flex-1 px-4 py-3 text-sm">
            <Phone className="h-4 w-4" aria-hidden="true" />
            Appeler
          </a>
          <a href="#rappel" className="bouton-secondaire flex-1 px-4 py-3 text-sm">
            Être rappelé
          </a>
        </div>
      </div>
    </div>
  );
}

/* ---------------- Carte d'offre ---------------- */

function CarteOffre({
  o,
  onChoisir,
  secondaire = false,
}: {
  o: Offre;
  onChoisir: (id: OffreId) => void;
  secondaire?: boolean;
}) {
  const mise = !!o.recommandee;
  const sombre = mise;
  const attenue = sombre ? "text-white/70" : "text-muted-foreground";

  return (
    <article
      id={o.id}
      data-reveal
      className={`relative flex flex-col rounded-[2rem] border p-6 transition duration-300 sm:p-8 ${
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
      <p className={`mt-2 leading-relaxed ${attenue}`}>{o.pour}</p>

      {/* Le prix : mensuel en grand, frais de départ juste dessous. */}
      <div className="mt-7">
        <p className="flex items-baseline gap-1.5">
          <span
            className={`font-display font-extrabold leading-none tracking-[-0.045em] tabular-nums ${
              secondaire ? "text-[2.75rem]" : "text-[3.5rem]"
            }`}
          >
            {euros(o.mensuel)}
          </span>
          <span className={`font-medium ${attenue}`}>/mois</span>
        </p>
        <p
          className={`mt-2 text-[15px] font-medium ${sombre ? "text-white/85" : "text-foreground/80"}`}
        >
          + {euros(o.depart)} {o.departLibelle}
        </p>
      </div>

      <div className={`my-7 h-px ${sombre ? "bg-white/10" : "bg-border"}`} />

      {o.reprend && <p className="mb-3 font-semibold">{o.reprend}</p>}
      <ul className="space-y-3">
        {o.inclus.map((i) => (
          <li key={i} className="flex gap-3">
            <span
              className={`mt-0.5 grid h-5 w-5 shrink-0 place-items-center rounded-full ${
                sombre ? "bg-signal/20" : "bg-signal/20 text-signal-ink"
              }`}
            >
              <Check className={`h-3 w-3 ${sombre ? "text-signal" : ""}`} />
            </span>
            <span className={sombre ? "text-white/90" : ""}>{i}</span>
          </li>
        ))}
      </ul>

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
        <a
          href="#rappel"
          onClick={() => onChoisir(o.id)}
          className={`w-full px-6 py-3.5 ${mise || !secondaire ? "bouton" : "bouton-secondaire"}`}
        >
          {o.cta === "rappel" ? "Être rappelé" : "Demander un devis"}
          <ArrowRight className="bouton-fleche h-4 w-4" />
        </a>
      </div>
    </article>
  );
}

/* ---------------- Être rappelé ---------------- */

type Etat = "saisie" | "envoi" | "envoye" | "erreur";

function Rappel({
  choix,
  setChoix,
}: {
  choix: OffreId | "";
  setChoix: (id: OffreId | "") => void;
}) {
  const [etat, setEtat] = useState<Etat>("saisie");

  async function envoyer(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const fd = new FormData(e.currentTarget);
    const get = (k: string) => String(fd.get(k) || "").trim();
    const nomOffre = choix ? offre(choix).nom : "Je ne sais pas encore";
    setEtat("envoi");
    const r = await envoyerDemande(
      {
        name: get("name"),
        company: get("company"),
        phone: get("phone"),
        email: "",
        subject: `Rappel tarifs : ${nomOffre}`,
        message: `Offre : ${nomOffre}\n\n${get("message")}`,
        website: get("website"),
      },
      "rappel-tarifs",
    );
    setEtat(r === "envoye" ? "envoye" : "erreur");
  }

  const champ =
    "mt-1.5 w-full rounded-lg border border-input bg-background px-3.5 py-2.5 text-[15px] outline-none transition focus:border-accent focus:ring-2 focus:ring-accent/20";

  return (
    <section id="rappel" className="bg-paper-sunk py-16 sm:py-20">
      <div className="mx-auto grid max-w-6xl gap-10 px-4 sm:px-6 lg:grid-cols-2 lg:items-center lg:gap-16">
        <div data-reveal>
          <h2 data-split className="display-section">
            Être rappelé, <span className="accent-word">sous 24 h</span>
          </h2>
          <p className="measure mt-5 text-lg text-muted-foreground">
            Laissez votre numéro : Teddy vous rappelle pour comprendre votre activité et vous dire
            quelle offre convient, avant toute signature.
          </p>
          <a
            href={`tel:${SITALY_PHONE}`}
            className="mt-7 inline-flex items-center gap-2 font-semibold text-brand-ink"
          >
            <Phone className="h-4 w-4" />
            Ou appelez le {SITALY_PHONE_DISPLAY}
          </a>
        </div>

        <form
          onSubmit={envoyer}
          className="relative rounded-[1.75rem] border border-border bg-card p-6 shadow-elevated sm:p-8"
        >
          {etat === "envoye" ? (
            <div className="py-10 text-center" role="status">
              <div className="mx-auto grid h-14 w-14 place-items-center rounded-full bg-success/15 text-success">
                <Check className="h-7 w-7" />
              </div>
              <h3 className="mt-4 font-display text-xl font-bold">Demande reçue</h3>
              <p className="mt-2 text-muted-foreground">
                Je vous rappelle sous 24 h au numéro indiqué.
              </p>
            </div>
          ) : etat === "erreur" ? (
            <div className="py-10 text-center" role="alert">
              <h3 className="font-display text-xl font-bold">L'envoi n'a pas abouti</h3>
              <p className="mt-2 text-muted-foreground">
                Votre demande n'est pas partie. Appelez le {SITALY_PHONE_DISPLAY}, je vous réponds
                directement.
              </p>
              <a href={`tel:${SITALY_PHONE}`} className="bouton mt-6 px-6 py-3">
                <Phone className="h-4 w-4" />
                Appeler
              </a>
            </div>
          ) : (
            <>
              <div className="grid gap-4 sm:grid-cols-2">
                <div>
                  <label htmlFor="rappel-name" className="text-sm font-medium">
                    Nom <span className="text-red-ink">*</span>
                  </label>
                  <input id="rappel-name" name="name" required maxLength={150} className={champ} />
                </div>
                <div>
                  <label htmlFor="rappel-phone" className="text-sm font-medium">
                    Téléphone <span className="text-red-ink">*</span>
                  </label>
                  <input
                    id="rappel-phone"
                    name="phone"
                    type="tel"
                    required
                    maxLength={30}
                    className={champ}
                  />
                </div>
                <div className="sm:col-span-2">
                  <label htmlFor="rappel-company" className="text-sm font-medium">
                    Activité et commune
                  </label>
                  <input
                    id="rappel-company"
                    name="company"
                    maxLength={150}
                    placeholder="Fleuriste à Brétigny-sur-Orge"
                    className={champ}
                  />
                </div>
                <div className="sm:col-span-2">
                  <label htmlFor="rappel-offre" className="text-sm font-medium">
                    Offre qui vous intéresse
                  </label>
                  <select
                    id="rappel-offre"
                    name="offre"
                    value={choix}
                    onChange={(e) => setChoix(e.target.value as OffreId | "")}
                    className={champ}
                  >
                    <option value="">Je ne sais pas encore</option>
                    {OFFRES.map((o) => (
                      <option key={o.id} value={o.id}>
                        {o.nom}
                      </option>
                    ))}
                  </select>
                </div>
                <div className="sm:col-span-2">
                  <label htmlFor="rappel-message" className="text-sm font-medium">
                    Message
                  </label>
                  <textarea id="rappel-message" name="message" rows={3} className={champ} />
                </div>
              </div>
              {/* Pot de miel : invisible pour un humain, rempli par les robots. */}
              <div aria-hidden="true" className="absolute -left-[9999px] h-0 w-0 overflow-hidden">
                <label htmlFor="rappel-website">Ne pas remplir</label>
                <input
                  id="rappel-website"
                  name="website"
                  type="text"
                  tabIndex={-1}
                  autoComplete="off"
                />
              </div>
              <button
                type="submit"
                disabled={etat === "envoi"}
                className="bouton mt-5 w-full px-6 py-3.5 disabled:opacity-70"
              >
                <Phone className="h-5 w-5" />
                {etat === "envoi" ? "Envoi…" : "Être rappelé"}
              </button>
              <p className="mt-3 text-center text-xs text-muted-foreground">
                Vos coordonnées servent uniquement à vous rappeler.{" "}
                <Link to="/politique-confidentialite/" className="underline underline-offset-2">
                  Confidentialité
                </Link>
              </p>
            </>
          )}
        </form>
      </div>
    </section>
  );
}
