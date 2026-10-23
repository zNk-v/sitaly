import { useRef } from "react";
import { createFileRoute, Link } from "@tanstack/react-router";
import { ArrowRight, Check, Minus, Phone, PhoneIncoming, Plus, X } from "lucide-react";
import { SiteHeader } from "@/components/SiteHeader";
import { SiteFooter } from "@/components/SiteFooter";
import { useRevealOnScroll } from "@/hooks/use-reveal-on-scroll";
import { SITALY_PHONE, SITALY_PHONE_DISPLAY } from "@/lib/config";

import photoArtisan600 from "@/assets/photos/secteur-artisans-600.webp";
import photoArtisan1000 from "@/assets/photos/secteur-artisans-1000.webp";
import photoChantier600 from "@/assets/photos/secteur-btp-600.webp";
import photoChantier1000 from "@/assets/photos/secteur-btp-1000.webp";

/**
 * Page « Demandes de chantier » (refonte du 5 octobre 2026).
 *
 * L'URL /acquisition/ est conservée pour le référencement acquis. L'offre a
 * changé : Sitaly ne vend plus la gestion Google Ads au forfait. Elle lance
 * et paie ses propres campagnes, sous ses propres marques locales et sur ses
 * propres pages, puis transmet les demandes de particuliers à une seule
 * entreprise partenaire par métier et par zone.
 *
 * Règles de fond, à ne pas contourner en retouchant la page :
 * 1. Sitaly s'engage sur la livraison de demandes valides. La signature d'un
 *    chantier relève de l'artisan : aucune promesse de chantier signé ni de
 *    chiffre d'affaires.
 * 2. Aucun chiffre de résultat tant qu'aucun cas réel n'est documenté (voir
 *    TEMOIGNAGES plus bas).
 * 3. Sitaly est un service de mise en relation. Rien ne doit laisser croire
 *    qu'elle se fait passer pour l'artisan auprès des particuliers.
 * 4. Aucun prix chiffré sur la page : il dépend du métier et s'annonce par
 *    écrit avant la première demande offerte.
 * 5. Pas de fausse rareté. « Une seule entreprise par zone » est vrai, et
 *    c'est la seule rareté affichée.
 *
 * Vocabulaire : « demande », « appel », « chantier ». Jamais « lead », « CPC »,
 * « conversion » ni « landing page ».
 */

const FAQ_ITEMS = [
  {
    q: "Les premières demandes sont-elles vraiment gratuites ?",
    a: "Oui. Vous recevez vos premières demandes sans rien payer, que vous signiez un chantier avec ou non. Le prix d'une demande vous est annoncé par écrit avant la première, pour que vous sachiez à quoi vous attendre si vous continuez.",
  },
  {
    q: "Que se passe-t-il si je ne signe rien ?",
    a: "Rien. Vous ne nous devez rien, et vous n'avez rien signé avec nous. Les demandes offertes servent à juger sur pièce. Si elles ne vous conviennent pas, on s'arrête là.",
  },
  {
    q: "Qu'est-ce qu'une demande valide ?",
    a: "Un appel de plus de 60 secondes, ou un formulaire rempli en entier, pour une prestation que vous couvrez, dans votre zone, avec des coordonnées joignables. Une demande qui ne remplit pas ces conditions, signalée sous 48 heures, est remplacée.",
  },
  {
    q: "Revendez-vous la même demande à plusieurs artisans ?",
    a: "Non, jamais. Une demande va à une seule entreprise : la vôtre. Et nous ne travaillons qu'avec une seule entreprise par métier et par zone.",
  },
  {
    q: "Y a-t-il un engagement ?",
    a: "Non. L'abonnement est prépayé chaque mois, sans engagement de durée. Vous l'arrêtez quand vous voulez, avec un préavis d'un mois.",
  },
  {
    q: "Que se passe-t-il si le mois compte moins de demandes que prévu ?",
    a: "Les demandes qui n'ont pas pu être livrées dans le mois sont reportées au mois suivant. Vous ne payez pas pour des demandes que vous n'avez pas reçues.",
  },
  {
    q: "Ai-je besoin d'un site internet ?",
    a: "Non. Les demandes arrivent par nos pages et nos campagnes : vous n'avez ni site à payer, ni publicité à gérer, ni compte Google à ouvrir. Si vous voulez votre propre site, l'offre Sitaly Présence reste disponible à part.",
  },
  {
    q: "Comment vérifier que les demandes viennent bien de vous ?",
    a: "Les appels passent par un numéro de suivi : ils sont enregistrés et horodatés. Pour chaque demande, vous savez quand elle est arrivée, d'où elle vient et ce que le particulier a demandé.",
  },
] as const;

const TITRE = "Demandes de chantier pour artisans en Essonne | Sitaly";
const DESCRIPTION =
  "Demandes de chantier exclusives pour artisans en Essonne et Île-de-France. Premières demandes offertes, sans engagement, une seule entreprise par zone.";

export const Route = createFileRoute("/acquisition")({
  head: () => ({
    meta: [
      { title: TITRE },
      { name: "description", content: DESCRIPTION },
      { name: "robots", content: "index,follow" },
      { property: "og:title", content: TITRE },
      { property: "og:description", content: DESCRIPTION },
      { property: "og:url", content: "https://sitaly.fr/acquisition/" },
    ],
    links: [{ rel: "canonical", href: "https://sitaly.fr/acquisition/" }],
    scripts: [
      {
        type: "application/ld+json",
        children: JSON.stringify({
          "@context": "https://schema.org",
          "@type": "Service",
          "@id": "https://sitaly.fr/acquisition/#service",
          name: "Demandes de chantier pour artisans",
          serviceType: "Mise en relation entre particuliers et artisans",
          url: "https://sitaly.fr/acquisition/",
          description:
            "Sitaly transmet aux artisans du bâtiment et de l'extérieur des demandes de chantier de particuliers (appels et formulaires), issues de ses propres campagnes et de ses propres pages. Chaque demande va à une seule entreprise, et une seule entreprise est partenaire par métier et par zone. Premières demandes offertes, puis abonnement mensuel prépayé, sans engagement de durée.",
          // Rattaché à l'entité du graphe racine (__root.tsx) par son @id.
          provider: { "@id": "https://sitaly.fr/#business" },
          audience: {
            "@type": "BusinessAudience",
            audienceType: "Artisans du bâtiment et de l'extérieur",
          },
          areaServed: [
            { "@type": "AdministrativeArea", name: "Essonne" },
            { "@type": "AdministrativeArea", name: "Île-de-France" },
          ],
          offers: [
            {
              "@type": "Offer",
              name: "Abonnement mensuel de demandes de chantier",
              description:
                "Forfait mensuel de demandes exclusives, prépayé, sans engagement de durée, résiliable avec un préavis d'un mois. Le prix d'une demande dépend du métier et est annoncé par écrit avant la première demande offerte.",
              priceSpecification: {
                "@type": "UnitPriceSpecification",
                unitCode: "MON",
              },
            },
          ],
        }),
      },
      {
        type: "application/ld+json",
        children: JSON.stringify({
          "@context": "https://schema.org",
          "@type": "FAQPage",
          mainEntity: FAQ_ITEMS.map((f) => ({
            "@type": "Question",
            name: f.q,
            acceptedAnswer: { "@type": "Answer", text: f.a },
          })),
        }),
      },
    ],
  }),
  component: DemandesDeChantier,
});

function DemandesDeChantier() {
  /* Apparitions au défilement (DESIGN.md §6) : le contenu reste visible
     sans script, c'est le hook qui installe l'état masqué. */
  const ref = useRef<HTMLDivElement>(null);
  useRevealOnScroll(ref);

  return (
    /* `page-acquisition` donne à la page sa couleur d'accent unique, le rouge
       de la famille acquisition. Le rembourrage bas laisse la place à la
       barre d'appel collée en bas d'écran sur téléphone. */
    <div
      ref={ref}
      className="page-acquisition min-h-screen bg-background pb-20 text-foreground lg:pb-0"
    >
      <SiteHeader premierEcran="sombre" />
      <main>
        <Ouverture />
        <Constat />
        <Etapes />
        <CeQueVousRecevez />
        <SansRisque />
        <Tarif />
        <Temoignages />
        <CompteGoogleAds />
        <Faq />
        <AppelFinal />
      </main>
      <SiteFooter />
      <BarreAppel />
    </div>
  );
}

/* ---------------- BRIQUES ---------------- */

function BoutonZone({ className = "" }: { className?: string }) {
  return (
    <Link
      to="/mon-projet/"
      search={{ besoin: "visibilite" }}
      className={`bouton px-7 py-3.5 text-base ${className}`}
    >
      Vérifier si ma zone est libre
      <ArrowRight className="bouton-fleche h-4 w-4" />
    </Link>
  );
}

function BoutonTelephone({ sombre = false }: { sombre?: boolean }) {
  return (
    <a
      href={`tel:${SITALY_PHONE}`}
      className={
        sombre
          ? "inline-flex items-center justify-center gap-2 rounded-full border border-white/25 px-7 py-3.5 text-base font-semibold whitespace-nowrap text-white transition hover:border-white/60"
          : "bouton-secondaire px-7 py-3.5 text-base whitespace-nowrap"
      }
    >
      <Phone className="h-4 w-4" />
      {SITALY_PHONE_DISPLAY}
    </a>
  );
}

function Reassurance({ sombre = false }: { sombre?: boolean }) {
  return (
    <p
      className={`flex flex-wrap items-center gap-x-3 gap-y-1 text-sm ${sombre ? "text-white/65" : "text-muted-foreground"}`}
    >
      <span>Premières demandes offertes</span>
      <span aria-hidden="true">·</span>
      <span>Sans engagement</span>
      <span aria-hidden="true">·</span>
      <span>Une seule entreprise par zone</span>
    </p>
  );
}

function Surtitre({ children, sombre = false }: { children: React.ReactNode; sombre?: boolean }) {
  return <p className={`rail-label ${sombre ? "text-white/55" : "text-brand-ink"}`}>{children}</p>;
}

/* ---------------- 1. OUVERTURE ---------------- */
function Ouverture() {
  return (
    <section className="on-ink relative isolate overflow-hidden bg-ink">
      <div aria-hidden="true" className="acquisition-foyer absolute inset-0 -z-10" />
      <div className="mx-auto grid max-w-7xl items-center gap-12 px-4 pt-[calc(var(--entete-hauteur)+2.5rem)] pb-20 sm:px-6 sm:pt-[calc(var(--entete-hauteur)+4rem)] sm:pb-28 lg:grid-cols-[1.1fr_0.9fr] lg:gap-16">
        <div data-reveal>
          <Surtitre sombre>
            Artisans du bâtiment et de l'extérieur · Essonne et Île-de-France
          </Surtitre>
          <h1 className="mt-5 font-display text-[clamp(2.4rem,5.4vw,4.4rem)] leading-[1.02] font-extrabold tracking-[-0.042em] text-balance">
            Des demandes de chantier, <span className="accent-word">pas un site de plus</span>
          </h1>
          <p className="mt-6 max-w-xl text-lg text-white/75 sm:text-xl">
            Nous faisons la publicité, nous recevons les appels et les demandes des particuliers de
            votre secteur, et nous les transmettons à une seule entreprise : la vôtre.
          </p>
          <div className="mt-9 flex flex-col gap-3 sm:flex-row">
            <BoutonZone />
            <BoutonTelephone sombre />
          </div>
          <div className="mt-7">
            <Reassurance sombre />
          </div>
        </div>

        <figure data-reveal className="relative">
          <img
            src={photoArtisan1000}
            srcSet={`${photoArtisan600} 600w, ${photoArtisan1000} 1000w`}
            sizes="(min-width: 1024px) 520px, 100vw"
            width={1000}
            height={1503}
            alt="Un artisan sur son chantier, outil en main"
            fetchPriority="high"
            className="aspect-[4/5] w-full rounded-[2rem] object-cover object-[50%_30%] lg:aspect-[4/5]"
          />
          {/* Schéma d'une demande transmise. Il porte sa mention « Exemple »
              (DESIGN.md §7) : aucune demande réelle n'est montrée. */}
          <figcaption className="sur-papier absolute -bottom-6 left-4 w-[min(19rem,85%)] rounded-2xl border border-border bg-card p-4 text-left shadow-elevated sm:-left-8">
            <div className="flex items-center justify-between text-[11px] text-muted-foreground">
              <span className="inline-flex items-center gap-1.5">
                <PhoneIncoming className="h-3.5 w-3.5" />
                Nouvelle demande · 9 h 42
              </span>
              <span>Exemple</span>
            </div>
            <p className="mt-2 text-sm font-semibold">Élagage d'un chêne, Brétigny-sur-Orge</p>
            <p className="mt-0.5 text-[13px] text-muted-foreground">
              Appel de 3 min 12, enregistré et horodaté
            </p>
            <p className="mt-3 inline-flex items-center gap-1.5 rounded-full bg-accent/10 px-2.5 py-1 text-[12px] font-semibold text-brand-ink">
              <Check className="h-3.5 w-3.5" />
              Transmise à votre entreprise, à vous seul
            </p>
          </figcaption>
        </figure>
      </div>
    </section>
  );
}

/* ---------------- 2. LE CONSTAT ---------------- */
function Constat() {
  const constats = [
    {
      t: "Les prospectus",
      d: "Vous les payez, vous les distribuez. Ils finissent à la poubelle avant d'avoir été lus.",
    },
    {
      t: "Le site qui ne fait pas appeler",
      d: "Il est en ligne, il est propre. Le téléphone, lui, ne sonne pas plus qu'avant.",
    },
    {
      t: "Les plateformes",
      d: "Elles vendent la même demande à plusieurs artisans à la fois. Le premier qui rappelle prend le chantier, les autres ont payé pour rien.",
    },
    {
      t: "La pub au jugé",
      d: "La facture tombe chaque mois. Ce qu'elle a rapporté, personne ne sait vous le dire.",
    },
  ];

  return (
    <section className="bg-paper py-20 sm:py-28">
      <div className="mx-auto max-w-6xl px-4 sm:px-6">
        <div data-reveal className="max-w-3xl">
          <Surtitre>Le constat</Surtitre>
          <h2 className="display-section mt-3">
            Vous payez pour être vu. <span className="accent-word">Pas pour être appelé.</span>
          </h2>
        </div>

        <ol className="stagger mt-14 grid border-t border-border md:grid-cols-2">
          {constats.map((c, i) => (
            <li
              key={c.t}
              data-reveal
              style={{ "--i": i } as React.CSSProperties}
              className="flex gap-5 border-b border-border py-8 md:odd:pr-10 md:even:border-l md:even:pl-10"
            >
              <span className="rail-num shrink-0 font-display text-sm font-bold text-brand-ink">
                {String(i + 1).padStart(2, "0")}
              </span>
              <div>
                <h3 className="font-display text-xl font-extrabold tracking-tight sm:text-2xl">
                  {c.t}
                </h3>
                <p className="mt-2 text-lg leading-relaxed text-muted-foreground">{c.d}</p>
              </div>
            </li>
          ))}
        </ol>

        <p data-reveal className="mt-12 max-w-2xl text-xl leading-relaxed font-medium">
          Ce qu'il vous faut, ce n'est pas plus de visibilité. C'est un particulier qui a un
          chantier à faire, et dont la demande n'est allée qu'à vous.
        </p>
      </div>
    </section>
  );
}

/* ---------------- 3. COMMENT ÇA MARCHE ---------------- */
function Etapes() {
  const etapes = [
    {
      t: "On vérifie que votre zone est libre",
      d: "Un appel de quelques minutes : votre métier, vos prestations, les communes où vous intervenez. Si un autre artisan de votre métier travaille déjà avec nous sur votre zone, on vous le dit tout de suite.",
    },
    {
      t: "On vous envoie vos premières demandes, offertes",
      d: "Le prix d'une demande vous est annoncé par écrit avant la première. Puis les demandes arrivent : des particuliers de votre secteur qui ont un chantier à faire.",
    },
    {
      t: "Vous rappelez, vous signez",
      d: "Le devis, le chantier et la relation avec le client restent les vôtres. Vous jugez la qualité des demandes sur pièce.",
    },
    {
      t: "On passe à un abonnement mensuel de demandes",
      d: "Si vous signez un chantier avec une demande offerte et que vous voulez continuer : un forfait mensuel de demandes, prépayé, sans engagement de durée.",
    },
  ];

  return (
    <section id="fonctionnement" className="bg-paper-sunk py-20 sm:py-28">
      <div className="mx-auto max-w-6xl px-4 sm:px-6">
        <div data-reveal className="max-w-3xl">
          <Surtitre>Comment ça marche</Surtitre>
          <h2 className="display-section mt-3">
            Quatre étapes, <span className="accent-word">et vous ne payez qu'à la dernière</span>
          </h2>
        </div>

        <ol className="stagger relative mt-14 grid gap-4 lg:grid-cols-4 lg:gap-5">
          {etapes.map((e, i) => (
            <li
              key={e.t}
              data-reveal
              style={{ "--i": i } as React.CSSProperties}
              className="etape-acquisition relative flex flex-col rounded-[1.5rem] border border-border bg-card p-7 shadow-soft"
            >
              <span className="font-display text-5xl leading-none font-extrabold tracking-[-0.05em] text-brand-ink">
                {String(i + 1).padStart(2, "0")}
              </span>
              <h3 className="mt-6 font-display text-xl leading-snug font-extrabold tracking-tight">
                {e.t}
              </h3>
              <p className="mt-3 leading-relaxed text-muted-foreground">{e.d}</p>
            </li>
          ))}
        </ol>
      </div>
    </section>
  );
}

/* ---------------- 4. CE QUE VOUS RECEVEZ ---------------- */
function CeQueVousRecevez() {
  const recu = [
    {
      t: "Des demandes exclusives",
      d: "Chaque demande va à une seule entreprise. Elle n'est jamais revendue à vos concurrents.",
    },
    {
      t: "Une preuve pour chaque appel",
      d: "Les appels passent par un numéro de suivi, enregistrés et horodatés.",
    },
    {
      t: "Les demandes invalides remplacées",
      d: "Signalée sous 48 heures, une demande qui ne remplit pas les conditions est remplacée.",
    },
    {
      t: "Une seule entreprise par zone",
      d: "Pour votre métier, sur votre secteur, vous êtes notre seul partenaire.",
    },
  ];
  const pasBesoin = [
    "Aucun site à payer",
    "Aucune publicité à gérer",
    "Aucun compte Google à ouvrir",
  ];
  const criteres = [
    "Un appel de plus de 60 secondes, ou un formulaire complet",
    "Dans votre zone d'intervention",
    "Pour une prestation que vous couvrez",
    "Avec des coordonnées joignables",
  ];

  return (
    <section className="on-ink relative overflow-hidden bg-ink py-20 sm:py-28">
      <div className="mx-auto max-w-7xl px-4 sm:px-6">
        <div className="grid gap-14 lg:grid-cols-[0.85fr_1.15fr] lg:gap-16">
          <div data-reveal className="lg:sticky lg:top-28 lg:self-start">
            <Surtitre sombre>Ce que vous recevez</Surtitre>
            <h2 className="display-section mt-3">
              Des appels de particuliers, <span className="accent-word">rien à gérer</span>
            </h2>
            <img
              src={photoChantier1000}
              srcSet={`${photoChantier600} 600w, ${photoChantier1000} 1000w`}
              sizes="(min-width: 1024px) 460px, 100vw"
              width={1000}
              height={1500}
              loading="lazy"
              alt="Un chef de chantier en casque de sécurité"
              className="mt-10 aspect-[4/3] w-full rounded-[1.75rem] object-cover object-[50%_25%] lg:aspect-[5/4]"
            />
          </div>

          <div>
            <ul className="stagger grid gap-4 sm:grid-cols-2">
              {recu.map((r, i) => (
                <li
                  key={r.t}
                  data-reveal
                  style={{ "--i": i } as React.CSSProperties}
                  className="rounded-[1.5rem] border border-white/10 bg-white/[0.04] p-6 transition hover:border-white/25"
                >
                  <span className="grid h-9 w-9 place-items-center rounded-full bg-white text-ink">
                    <Check className="h-4 w-4" />
                  </span>
                  <h3 className="mt-5 font-display text-lg font-extrabold tracking-tight text-white">
                    {r.t}
                  </h3>
                  <p className="mt-2 leading-relaxed text-white/70">{r.d}</p>
                </li>
              ))}
            </ul>

            <ul data-reveal className="mt-4 grid gap-3 sm:grid-cols-3">
              {pasBesoin.map((p) => (
                <li
                  key={p}
                  className="flex items-center gap-2.5 rounded-full border border-white/10 px-4 py-3 text-[15px] text-white/85"
                >
                  <X className="h-4 w-4 shrink-0 text-white/50" />
                  {p}
                </li>
              ))}
            </ul>

            {/* Ce qui compte comme une demande : la règle qui fonde le prix. */}
            <div
              data-reveal
              className="sur-papier mt-10 rounded-[1.75rem] border border-border bg-card p-7 text-foreground sm:p-8"
            >
              <p className="rail-label text-brand-ink">Ce qu'est une demande valide</p>
              <ul className="mt-5 grid gap-3 sm:grid-cols-2">
                {criteres.map((c) => (
                  <li key={c} className="flex items-start gap-3">
                    <Check className="mt-0.5 h-5 w-5 shrink-0 text-brand-ink" />
                    <span>{c}</span>
                  </li>
                ))}
              </ul>
              <p className="mt-5 border-t border-border pt-5 text-sm text-muted-foreground">
                Une demande qui ne remplit pas ces conditions, signalée sous 48 heures, est
                remplacée.
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

/* ---------------- 5. SANS RISQUE ---------------- */
function SansRisque() {
  const garanties = [
    {
      t: "Vous jugez sur pièce",
      d: "Vos premières demandes sont offertes. Vous voyez ce qu'elles valent avant de payer quoi que ce soit.",
    },
    {
      t: "Le prix avant la première demande",
      d: "Vous connaissez le prix d'une demande, par écrit, avant même de recevoir la première. Pas de surprise ensuite.",
    },
    {
      t: "Prépayé, sans engagement",
      d: "Un forfait payé d'avance chaque mois, que vous arrêtez quand vous voulez, avec un mois de préavis.",
    },
  ];

  return (
    <section className="bg-paper py-20 sm:py-28">
      <div className="mx-auto max-w-6xl px-4 sm:px-6">
        <div data-reveal className="max-w-3xl">
          <Surtitre>Sans risque pour vous</Surtitre>
          <h2 className="display-section mt-3">
            Vous essayez d'abord. <span className="accent-word">Vous décidez ensuite.</span>
          </h2>
        </div>
        <div className="stagger mt-14 grid gap-4 md:grid-cols-3 lg:gap-5">
          {garanties.map((g, i) => (
            <div
              key={g.t}
              data-reveal
              style={{ "--i": i } as React.CSSProperties}
              className="rounded-[1.5rem] border border-border bg-card p-7 shadow-soft transition hover:-translate-y-0.5 hover:shadow-elevated"
            >
              <span className="block h-1 w-10 rounded-full bg-accent" aria-hidden="true" />
              <h3 className="mt-6 font-display text-xl font-extrabold tracking-tight">{g.t}</h3>
              <p className="mt-3 leading-relaxed text-muted-foreground">{g.d}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ---------------- 6. TARIF ---------------- */
/* Aucun montant : le prix d'une demande dépend du métier et de la valeur
   d'un chantier, et s'annonce par écrit avant la première demande offerte. */
function Tarif() {
  const regles = [
    {
      t: "Un prix par métier",
      d: "Le prix d'une demande dépend de votre métier et de la valeur moyenne d'un chantier. Une demande d'élagage et une réfection de toiture ne valent pas la même chose.",
    },
    {
      t: "Annoncé par écrit, avant la première demande",
      d: "Vous recevez le prix avant même la première demande offerte. Vous savez ce que coûtera la suite avant de commencer.",
    },
    {
      t: "Un forfait mensuel de demandes",
      d: "Si vous continuez : un nombre de demandes par mois, prépayé, sans engagement de durée, résiliable avec un préavis d'un mois.",
    },
    {
      t: "Rien de perdu",
      d: "Les demandes qui n'ont pas pu être livrées dans le mois sont reportées au mois suivant.",
    },
  ];

  return (
    <section id="tarif" className="bg-paper-sunk py-20 sm:py-28">
      <div className="mx-auto max-w-6xl px-4 sm:px-6">
        <div className="grid gap-12 lg:grid-cols-[0.9fr_1.1fr] lg:gap-16">
          <div data-reveal>
            <Surtitre>Tarif</Surtitre>
            <h2 className="display-section mt-3">
              Vous payez des demandes, <span className="accent-word">pas de la publicité</span>
            </h2>
            <p className="mt-6 max-w-md text-lg text-muted-foreground">
              Aucun budget publicitaire à avancer : la publicité, c'est nous qui la payons. Vous
              payez les demandes que vous recevez.
            </p>
            <div className="mt-8">
              <BoutonZone />
            </div>
          </div>

          <dl className="stagger border-t border-border">
            {regles.map((r, i) => (
              <div
                key={r.t}
                data-reveal
                style={{ "--i": i } as React.CSSProperties}
                className="grid gap-2 border-b border-border py-6 sm:grid-cols-[14rem_1fr] sm:gap-8"
              >
                <dt className="font-display text-lg font-extrabold tracking-tight">{r.t}</dt>
                <dd className="leading-relaxed text-muted-foreground">{r.d}</dd>
              </div>
            ))}
          </dl>
        </div>
      </div>
    </section>
  );
}

/* ---------------- TÉMOIGNAGES ---------------- */
/**
 * Emplacement de témoignage client, volontairement vide.
 *
 * Aucun propos ne doit être attribué à un artisan sans qu'il l'ait écrit, et
 * aucun chiffre (nombre de demandes, chantiers signés, chiffre d'affaires)
 * ne doit apparaître sans cas réel documenté. Tant que le tableau est vide,
 * la section ne s'affiche pas.
 *
 * Pour l'activer, ajouter l'avis tel que l'artisan l'a écrit :
 *   {
 *     citation: "…",
 *     auteur: "Prénom Nom",
 *     entreprise: "Nom de l'entreprise",
 *     metier: "Élagueur",
 *     zone: "Brétigny-sur-Orge (91)",
 *   },
 */
type Temoignage = {
  citation: string;
  auteur: string;
  entreprise: string;
  metier: string;
  zone: string;
};

const TEMOIGNAGES: Temoignage[] = [];

function Temoignages() {
  if (TEMOIGNAGES.length === 0) return null;
  return (
    <section className="bg-paper py-20 sm:py-28">
      <div className="mx-auto max-w-6xl px-4 sm:px-6">
        <Surtitre>Ils travaillent avec nous</Surtitre>
        <div className="mt-10 grid gap-5 md:grid-cols-2">
          {TEMOIGNAGES.map((t) => (
            <figure
              key={t.auteur}
              data-reveal
              className="rounded-[1.5rem] border border-border bg-card p-8 shadow-soft"
            >
              <blockquote className="text-lg leading-relaxed">« {t.citation} »</blockquote>
              <figcaption className="mt-6 border-t border-border pt-5 text-sm">
                <span className="font-semibold">{t.auteur}</span>
                <span className="text-muted-foreground">
                  {" "}
                  · {t.metier}, {t.entreprise} · {t.zone}
                </span>
              </figcaption>
            </figure>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ---------------- 7. GESTION CLASSIQUE ---------------- */
function CompteGoogleAds() {
  return (
    <section className="bg-paper pb-4">
      <div className="mx-auto max-w-6xl px-4 sm:px-6">
        <p
          data-reveal
          className="flex flex-col gap-2 rounded-2xl border border-border px-6 py-5 text-[15px] text-muted-foreground sm:flex-row sm:items-center sm:justify-between"
        >
          <span>
            <span className="font-semibold text-foreground">
              Vous préférez piloter votre propre compte Google Ads ?
            </span>{" "}
            Nous gérons aussi des campagnes classiques sur votre compte et votre budget.
          </span>
          <Link
            to="/"
            hash="contact"
            className="inline-flex shrink-0 items-center gap-1.5 font-semibold text-brand-ink underline decoration-brand-ink/30 underline-offset-4 transition hover:decoration-brand-ink"
          >
            Nous écrire
            <ArrowRight className="h-4 w-4" />
          </Link>
        </p>
      </div>
    </section>
  );
}

/* ---------------- 8. FAQ ---------------- */
/* `details` garde chaque réponse dans le HTML prérendu, identique au JSON-LD. */
function Faq() {
  return (
    <section id="faq" className="bg-paper py-20 sm:py-28">
      <div className="mx-auto max-w-4xl px-4 sm:px-6">
        <div data-reveal>
          <Surtitre>Questions fréquentes</Surtitre>
          <h2 className="display-section mt-3">
            Les questions <span className="accent-word">qu'on nous pose avant de commencer</span>
          </h2>
        </div>
        <div className="mt-12 border-t border-border">
          {FAQ_ITEMS.map((it) => (
            <details key={it.q} className="group border-b border-border">
              <summary className="flex cursor-pointer list-none items-center justify-between gap-6 py-6 text-left text-[17px] font-semibold transition-colors marker:content-none hover:text-brand-ink">
                <span>{it.q}</span>
                <Plus className="h-5 w-5 shrink-0 text-muted-foreground transition-transform duration-300 group-open:hidden" />
                <Minus className="hidden h-5 w-5 shrink-0 text-brand-ink group-open:block" />
              </summary>
              <p className="max-w-2xl pb-6 text-[15px] leading-relaxed text-muted-foreground">
                {it.a}
              </p>
            </details>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ---------------- 9. APPEL FINAL ---------------- */
function AppelFinal() {
  return (
    <section className="on-ink relative isolate overflow-hidden bg-ink">
      <div aria-hidden="true" className="acquisition-foyer absolute inset-0 -z-10" />
      <div data-reveal className="mx-auto max-w-4xl px-4 py-24 text-center sm:px-6 sm:py-32">
        <h2 className="display-section">
          Votre zone est-elle <span className="accent-word">encore libre ?</span>
        </h2>
        <p className="mx-auto mt-6 max-w-xl text-lg text-white/70">
          Une seule entreprise par métier et par zone. Quelques minutes au téléphone suffisent pour
          savoir si la vôtre l'est encore.
        </p>
        <div className="mt-10 flex flex-col justify-center gap-3 sm:flex-row">
          <BoutonZone />
          <BoutonTelephone sombre />
        </div>
        <div className="mt-8 flex justify-center">
          <Reassurance sombre />
        </div>
      </div>
    </section>
  );
}

/* ---------------- BARRE D'APPEL (TÉLÉPHONE) ---------------- */
/* Collée en bas d'écran sous `lg` : un artisan lit la page sur son
   téléphone, entre deux chantiers, et doit pouvoir appeler d'un pouce. */
function BarreAppel() {
  return (
    <div className="fixed inset-x-0 bottom-0 z-40 border-t border-border bg-card/95 px-3 py-3 shadow-elevated backdrop-blur lg:hidden">
      <div className="mx-auto flex max-w-md gap-2">
        <a
          href={`tel:${SITALY_PHONE}`}
          className="bouton flex-1 px-4 py-3 text-[15px]"
          aria-label={`Appeler Sitaly au ${SITALY_PHONE_DISPLAY}`}
        >
          <Phone className="h-4 w-4" />
          Appeler
        </a>
        <Link
          to="/mon-projet/"
          search={{ besoin: "visibilite" }}
          className="bouton-secondaire flex-1 px-4 py-3 text-[15px]"
        >
          Ma zone est libre ?
        </Link>
      </div>
    </div>
  );
}
