import { createFileRoute, Link } from "@tanstack/react-router";
import { useState, useEffect, useRef } from "react";
import {
  Phone,
  Calendar,
  Check,
  ArrowRight,
  Search,
  Clock,
  ChevronDown,
  Mail,
  Globe,
  Target,
  Zap,
  Instagram,
  Linkedin,
} from "lucide-react";
import teddy448 from "@/assets/teddy-vidal-448.jpg";
import teddy672 from "@/assets/teddy-vidal-672.jpg";
import exampleRenovation from "@/assets/example-renovation.jpg";
import examplePlombier from "@/assets/example-plombier.jpg";
import exampleElectricien from "@/assets/example-electricien.jpg";
import { SitalyLogo } from "@/components/SitalyLogo";
import { LinkedinLink } from "@/components/LinkedinLink";
import { HeaderCallButton, MobileMenu } from "@/components/MobileMenu";
import { MetierFooterLinks, MetierLinksSection } from "@/components/MetierLinks";
import { SectionHeader } from "@/components/SectionHeader";
import { StackedOffers } from "@/components/StackedOffers";
import { MainNav } from "@/components/MainNav";
import { Surligne } from "@/components/Surligne";
import { REALISATIONS } from "@/data/realisations";
import { useRevealOnScroll } from "@/hooks/use-reveal-on-scroll";
import { useSplitWords } from "@/hooks/use-split-words";
import { CALENDLY_URL, SITALY_PHONE, SITALY_PHONE_DISPLAY } from "@/lib/config";

const FAQ_ITEMS = [
  {
    q: "Comment se construit le budget ?",
    a: "Trois offres combinables, en abonnement mensuel, sans engagement de durée et sans frais d'installation. Sitaly Présence couvre votre site, son hébergement et votre référencement local. Sitaly Acquisition couvre la création et la gestion de vos campagnes Google Ads ou ChatGPT Ads, indépendamment du site : la rémunération y combine un forfait mensuel et une part du budget publicitaire. Sitaly Agents IA se chiffre sur mesure, selon les automatisations retenues. Le budget publicitaire lui-même est versé directement aux régies et reste séparé. Le montant exact dépend de votre activité et du périmètre choisi : il vous est donné à l'issue de l'appel découverte de 20 minutes, par écrit, avant tout engagement.",
  },
  {
    q: "Que comprennent vraiment les modifications incluses ?",
    a: "Les petites modifications de contenu existant sont incluses : changer un texte, une photo, un prix, des horaires ou vos coordonnées. Ce qui demande de la création — nouvelle page, nouveau visuel, rédaction d'articles — fait l'objet d'un devis transparent. Vous savez toujours à l'avance ce qui est inclus et ce qui ne l'est pas.",
  },
  {
    q: "Puis-je acheter mon site ?",
    a: "Sitaly fonctionne en abonnement : c'est ce qui nous permet de tout gérer pour vous (technique, hébergement, mises à jour) et de rester sans engagement de durée. Un rachat reste possible sur demande si vous le souhaitez.",
  },
  {
    q: "Combien de temps pour le mettre en ligne ?",
    a: "Votre site est livré en 48h après l'appel découverte et la fourniture des contenus.",
  },
  {
    q: "Puis-je arrêter mon abonnement ?",
    a: "Oui. Nos formules sont sans engagement : vous pouvez arrêter à tout moment avec un simple préavis, sans frais ni durée minimale.",
  },
  {
    q: "C'est quoi Google Ads et pourquoi en ai-je besoin ?",
    a: "Google Ads vous place en haut des résultats de recherche dès le premier jour, sans attendre le référencement naturel. On cible les personnes qui cherchent vos services dans votre zone, vous fixez le budget et vous gardez le contrôle. La gestion des campagnes fait l'objet des formules Sitaly Acquisition (le budget publicitaire reste à votre charge).",
  },
  {
    q: "L'automatisation est-elle obligatoire ?",
    a: "Non. Les automatisations — rappel SMS des appels manqués, relance automatique des devis, qualification des demandes, prise de rendez-vous en ligne — s'ajoutent en modules, selon vos besoins. On commence simple et on monte en puissance uniquement si ça vous fait gagner du temps.",
  },
];

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "Site web, Google Ads & IA pour PME, TPE et artisans | Sitaly" },
      {
        name: "description",
        content:
          "Agence web pour PME, TPE et artisans : site internet, Google Ads, ChatGPT Ads et agents IA. Sans engagement, site livré en 48h. Plus de demandes, plus de clients.",
      },
      {
        property: "og:title",
        content: "Site web, Google Ads & IA pour PME, TPE et artisans | Sitaly",
      },
      {
        property: "og:description",
        content:
          "Agence web pour PME, TPE et artisans : site internet, Google Ads, ChatGPT Ads et agents IA. Sans engagement, site livré en 48h. Plus de demandes, plus de clients.",
      },
      { property: "og:url", content: "https://sitaly.fr/" },
    ],
    links: [{ rel: "canonical", href: "https://sitaly.fr/" }],
    scripts: [
      {
        type: "application/ld+json",
        children: JSON.stringify({
          "@context": "https://schema.org",
          "@type": "FAQPage",
          mainEntity: FAQ_ITEMS.map((it) => ({
            "@type": "Question",
            name: it.q,
            acceptedAnswer: { "@type": "Answer", text: it.a },
          })),
        }),
      },
    ],
  }),
  component: SitalyHome,
});

function SitalyHome() {
  /* Révélations au scroll (DESIGN.md §6). Le contenu reste visible sans JS :
     c'est le hook qui installe l'état masqué, après hydratation seulement. */
  const rootRef = useRef<HTMLDivElement>(null);
  useRevealOnScroll(rootRef);
  useSplitWords(rootRef);

  return (
    <div ref={rootRef} className="min-h-screen bg-background text-foreground">
      <Nav />
      <Hero />
      <CeQuOnFait />
      <ProfessionsMarquee />
      <Problem />
      <HowItWorks />
      <StackedOffers />
      <Extras />
      <Realisations />
      <MetierLinksSection />
      <Process />
      <Temoignages />
      <Founder />
      <Faq />
      <Contact />
      <Footer />
    </div>
  );
}

/* ---------------- NAV ---------------- */
function Nav() {
  return (
    /* Bandeau en encre : il prolonge le hero sans couture, et reste lisible
       au-dessus des sections papier une fois le scroll engagé. DESIGN.md §3. */
    <header className="sticky top-0 z-50 border-b border-border bg-paper/85 backdrop-blur-md">
      {/* Progression de lecture. Pilotée par la timeline de scroll, donc
          aucun listener : la barre vit sur le fil de composition. */}
      <div
        className="scroll-progress absolute inset-x-0 bottom-0 h-px origin-left bg-gradient-to-r from-brand to-accent"
        aria-hidden="true"
      />
      <div className="relative mx-auto flex h-16 max-w-7xl items-center justify-between px-4 sm:px-6">
        <a href="#top" className="flex items-center" aria-label="Sitaly — accueil">
          <SitalyLogo />
        </a>
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
          <MobileMenu onHome />
        </div>
      </div>
    </header>
  );
}

/* ---------------- HERO ---------------- */
function Hero() {
  return (
    <section id="top" className="hero-bg relative overflow-hidden">
      <div className="relative mx-auto max-w-6xl px-4 py-24 text-center sm:px-6 sm:py-32 lg:py-40">
        {/* Le nom de la marque vit dans la phrase et en porte le graphisme.
            Jakarta pour la structure, Instrument Serif pour le verbe : le
            mélange des deux familles fait la tension du titre, la couleur ne
            fait que la souligner. */}
        <h1 className="font-display font-extrabold leading-[1.06]">
          <span className="block text-[clamp(1.05rem,2vw,1.6rem)] tracking-[0.08em] text-muted-foreground">
            Agence web pour artisans, indépendants et PME,
          </span>

          <span className="zoom-scroll mt-4 block text-[clamp(2.4rem,7.6vw,6.4rem)] leading-[0.94] tracking-[0.2em]">
            SITALY
          </span>

          <span className="mt-2 block text-[clamp(2rem,5.4vw,4.6rem)] leading-[1.02]">
            <span className="brand-gradient-text accent-word tracking-normal">fait sonner</span>{" "}
            <span className="tracking-[0.02em]">votre téléphone</span>
          </span>
        </h1>

        <div
          aria-hidden="true"
          className="mt-8 flex items-center justify-center gap-3 text-muted-foreground"
        >
          <svg
            viewBox="0 0 88 46"
            className="h-8 w-16 shrink-0 -scale-x-100 text-brand-ink/45"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
          >
            <path d="M84 42C68 16 44 4 6 6" />
            <path d="M6 6l17 8M6 6l11 13" />
          </svg>
          <span className="accent-word -rotate-2 text-xl">et zéro prise de tête</span>
        </div>

        <div className="mt-10 flex justify-center">
          <a
            href={CALENDLY_URL}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center justify-center gap-2 rounded-xl bg-accent px-7 py-4 text-base font-semibold text-accent-foreground shadow-glow transition hover:brightness-110"
          >
            <Calendar className="h-5 w-5" />
            Réserver un appel
          </a>
        </div>
      </div>
    </section>
  );
}

/* ---------------- CE QU'ON FAIT ---------------- */
/**
 * Trois promesses en très grand, qui se tracent l'une après l'autre.
 *
 * Chaque ligne se dévoile de gauche à droite par un `clip-path` animé, comme
 * une phrase qu'on écrit, et non par un simple fondu. Le décalage entre les
 * lignes vient de `--i`, posé sur chaque élément.
 *
 * La référence pose ce moment sur du noir. Ici il vit sur le papier : le fond
 * sombre a été écarté pour l'ensemble du site.
 */
function CeQuOnFait() {
  const promesses = [
    { texte: "Plus de clients.", accent: false },
    { texte: "Plus d'appels.", accent: true },
    { texte: "Moins de temps perdu.", accent: false },
  ];

  return (
    <section className="bg-paper-sunk py-24 sm:py-32">
      <div className="mx-auto max-w-6xl px-4 text-center sm:px-6">
        <p data-reveal className="rail-label text-brand-ink">
          Ce qu'on fait chez Sitaly
        </p>

        <p data-reveal className="measure mx-auto mt-6 text-lg text-muted-foreground sm:text-xl">
          Avec Sitaly, votre présence en ligne cesse d'être une case à cocher et devient le canal
          qui remplit votre agenda.
        </p>

        <ul className="stagger mt-16 space-y-4 sm:space-y-6">
          {promesses.map((p, i) => (
            <li
              key={p.texte}
              data-reveal
              style={{ "--i": i, "--stagger-step": "260ms" } as React.CSSProperties}
              className="wipe flex items-center justify-center gap-4 sm:gap-6"
            >
              {/* Chevron repris du logo, en marqueur de ligne. */}
              {/* Taillé sur la même échelle que le texte : en `em`, le chevron
                  se serait calé sur la taille du `li` et non sur celle du mot. */}
              <svg
                viewBox="0 0 24 24"
                aria-hidden="true"
                className={`h-[clamp(1.5rem,4.6vw,3.4rem)] w-[clamp(1.5rem,4.6vw,3.4rem)] shrink-0 ${
                  p.accent ? "text-brand-ink" : "text-foreground/25"
                }`}
                fill="none"
                stroke="currentColor"
                strokeWidth="4"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <path d="M8 4l8 8-8 8" />
              </svg>
              <span
                className={`font-display text-[clamp(1.9rem,6vw,4.4rem)] font-extrabold leading-none tracking-[-0.02em] ${
                  p.accent ? "brand-gradient-text" : ""
                }`}
              >
                {p.texte}
              </span>
            </li>
          ))}
        </ul>

        <div data-reveal className="mt-16">
          <a
            href="#offre"
            className="group inline-flex items-baseline gap-3 font-display text-[clamp(1.6rem,4vw,3rem)] font-extrabold tracking-tight text-brand-ink"
          >
            découvrir
            <span className="accent-word text-[0.62em] font-normal text-muted-foreground">
              nos offres
            </span>
            <ArrowRight className="h-[0.7em] w-[0.7em] self-center transition-transform group-hover:translate-x-2" />
          </a>
        </div>
      </div>
    </section>
  );
}

/* ---------------- PROFESSIONS MARQUEE ---------------- */
function ProfessionsMarquee() {
  const metiers = [
    "Artisans",
    "Ostéopathes",
    "Kinésithérapeutes",
    "Coachs sportifs",
    "Agents immobiliers",
    "Garages automobiles",
    "Restaurateurs",
    "Commerçants",
    "Avocats",
    "Experts-comptables",
    "Cabinets de recrutement",
    "Centres de formation",
    "Consultants",
    "PME de services",
    "Entrepreneurs",
  ];

  /* Chaque métier devient une pastille : le défilement lit comme une liste
     d'étiquettes, pas comme une phrase interminable coupée par des points. */
  const Track = ({ hidden = false }: { hidden?: boolean }) => (
    <ul
      className="flex shrink-0 items-center gap-3 pr-3 sm:gap-4 sm:pr-4"
      aria-hidden={hidden || undefined}
    >
      {metiers.map((m) => (
        <li
          key={m}
          className="whitespace-nowrap rounded-full border border-border bg-card px-5 py-2.5 text-[15px] font-semibold shadow-soft sm:text-base"
        >
          {m}
        </li>
      ))}
    </ul>
  );

  return (
    <section className="border-y border-border bg-paper-sunk py-16 sm:py-20">
      {/* L'intitulé respire au-dessus du bandeau au lieu de le toucher :
          c'est le manque d'air, pas le défilement, qui faisait fouillis. */}
      <div className="mx-auto max-w-3xl px-4 text-center sm:px-6">
        <div className="rail-label text-brand-ink">Pour qui</div>
        <h2 className="mt-3 font-display text-2xl font-extrabold tracking-tight sm:text-3xl">
          Plus de clients pour votre activité, <Surligne>quel que soit votre métier</Surligne>
        </h2>
      </div>
      <div className="marquee marquee-mask group relative mt-12 flex overflow-hidden sm:mt-14">
        <div className="animate-marquee flex shrink-0">
          <Track />
          <Track hidden />
        </div>
      </div>
    </section>
  );
}

/* ---------------- LE CONSTAT ---------------- */
/**
 * Aplat violet, énoncé unique en très grand, trois faits alignés sous un filet.
 *
 * La section était une grille de trois cartes, comme quatre autres avant la
 * refonte. Elle ouvre désormais la page sur une couleur pleine : c'est le
 * premier moment où le site cesse d'être blanc, et il tombe là où le propos
 * est le plus dur.
 */
function Problem() {
  const faits = [
    {
      chiffre: "8 sur 10",
      texte: "vérifient un site web avant de contacter une entreprise.",
    },
    {
      chiffre: "Vos concurrents",
      texte: "occupent la place que vous laissez vide sur Google.",
    },
    {
      chiffre: "Zéro heure",
      texte: "c'est le temps que vous devriez passer à gérer tout ça.",
    },
  ];
  return (
    <section className="on-wash py-20 sm:py-28">
      <div className="mx-auto max-w-7xl px-4 sm:px-6">
        <SectionHeader
          index="01"
          eyebrow="Le constat"
          title={
            <>
              Sans site à jour, vous n'êtes pas <span className="accent-word">dans la liste</span>
            </>
          }
        />

        <div className="mt-14 grid gap-x-10 gap-y-10 border-t border-border pt-10 sm:grid-cols-3">
          {faits.map((f, i) => (
            <div
              key={f.chiffre}
              data-reveal
              style={{ "--i": i } as React.CSSProperties}
              className="sm:border-l sm:border-border sm:pl-8 sm:first:border-l-0 sm:first:pl-0"
            >
              <div className="brand-gradient-text font-display text-[clamp(1.8rem,3vw,2.6rem)] font-extrabold leading-none tracking-tight">
                {f.chiffre}
              </div>
              <p className="mt-3 text-lg leading-relaxed text-foreground/75">{f.texte}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ---------------- MÉTHODE ---------------- */
/**
 * Frise horizontale reliée, plutôt qu'une troisième grille de cartes.
 *
 * Le fil qui court entre les trois temps dit la séquence : attirer, puis
 * convertir, puis automatiser. Une grille de cartes juxtapose, elle
 * n'enchaîne pas.
 */
function HowItWorks() {
  const steps = [
    {
      icon: Search,
      title: "Attirer",
      benefit: "Être trouvé par vos futurs clients",
      points: ["Site professionnel", "Référencement local", "Google Business", "Google Ads"],
    },
    {
      icon: Target,
      title: "Convertir",
      benefit: "Transformer les visiteurs en demandes",
      points: ["Pages optimisées", "Formulaires courts", "Appels à l'action clairs"],
    },
    {
      icon: Zap,
      title: "Automatiser",
      benefit: "Gagner du temps sur le suivi",
      points: ["Réponse automatique", "Qualification", "Relance des devis", "Prise de rendez-vous"],
    },
  ];
  return (
    <section className="py-20 sm:py-28">
      <div className="mx-auto max-w-7xl px-4 sm:px-6">
        <SectionHeader
          index="02"
          eyebrow="Notre méthode"
          title={
            <>
              Attirer, convertir, <span className="accent-word">automatiser</span>
            </>
          }
          subtitle="Un système en trois temps pour transformer votre présence en ligne en clients."
        />

        <div className="relative mt-16">
          {/* Le fil de la séquence. Horizontal à partir de md, vertical
              en dessous, où les trois temps s'empilent. */}
          <span
            aria-hidden="true"
            className="absolute left-6 top-6 hidden h-[calc(100%-3rem)] w-px bg-gradient-to-b from-accent via-accent/40 to-transparent sm:block md:left-0 md:top-6 md:h-px md:w-full md:bg-gradient-to-r"
          />

          <ol className="stagger relative grid gap-12 md:grid-cols-3 md:gap-10">
            {steps.map((s, i) => (
              <li
                key={s.title}
                data-reveal
                style={{ "--i": i } as React.CSSProperties}
                className="relative pl-20 sm:pl-0"
              >
                <span className="absolute left-0 top-0 grid h-12 w-12 place-items-center rounded-full border border-border bg-background text-accent shadow-soft sm:relative sm:mb-6">
                  <s.icon className="h-5 w-5" />
                </span>
                <div className="flex items-baseline gap-3">
                  <span className="rail-num font-display text-sm font-bold text-brand-ink">
                    {String(i + 1).padStart(2, "0")}
                  </span>
                  <h3 className="font-display text-2xl font-extrabold tracking-tight">{s.title}</h3>
                </div>
                <p className="mt-1.5 font-medium text-muted-foreground">{s.benefit}</p>
                <ul className="mt-5 space-y-2">
                  {s.points.map((p) => (
                    <li key={p} className="flex items-start gap-2.5 text-[15px]">
                      <Check className="mt-0.5 h-4 w-4 shrink-0 text-signal-ink" />
                      <span>{p}</span>
                    </li>
                  ))}
                </ul>
              </li>
            ))}
          </ol>
        </div>
      </div>
    </section>
  );
}

/* ---------------- COMPLÉMENTS ---------------- */
/**
 * Liste de définitions en grande typographie, sans carte.
 *
 * Quatre cartes à icône de plus n'apportaient rien : ces briques sont des
 * options, pas des arguments. Une liste sobre les annonce sans leur donner
 * le poids visuel d'une offre.
 */
const EXTRAS = [
  {
    name: "Blog SEO",
    desc: "Des articles optimisés, rédigés et mis en page chaque mois. En complément de votre site, ou seul si vous en avez déjà un.",
  },
  {
    name: "Logo & identité visuelle",
    desc: "Un logo, une palette et des règles d'usage, quand la marque n'existe pas encore ou a vieilli.",
  },
  {
    name: "Photos professionnelles",
    desc: "Vos vraies réalisations photographiées. Rien ne remplace une photo de votre travail sur votre propre site.",
  },
  {
    name: "Rédaction de contenus",
    desc: "Pages de service, fiches métier, textes de présentation. Écrits pour vos clients et pour Google.",
  },
] as const;

function Extras() {
  return (
    <section className="bg-paper-sunk py-20 sm:py-28">
      <div className="mx-auto max-w-7xl px-4 sm:px-6">
        <SectionHeader
          index="04"
          eyebrow="Compléments"
          title={
            <>
              Ce qui s'ajoute <span className="accent-word">quand c'est utile</span>
            </>
          }
          subtitle="Rien d'imposé. Ces briques se greffent sur votre accompagnement, à la demande."
        />

        <dl className="stagger mt-14 border-t border-border">
          {EXTRAS.map((o, i) => (
            <div
              key={o.name}
              data-reveal
              style={{ "--i": i } as React.CSSProperties}
              className="grid gap-x-10 gap-y-2 border-b border-border py-6 sm:grid-cols-[18rem_1fr] sm:py-7"
            >
              <dt className="font-display text-lg font-bold tracking-tight sm:text-xl">{o.name}</dt>
              <dd className="text-[15px] leading-relaxed text-muted-foreground sm:text-base">
                {o.desc}
              </dd>
            </div>
          ))}
        </dl>
      </div>
    </section>
  );
}

/* ---------------- RÉALISATIONS ---------------- */
/**
 * Rangées alternées pleine largeur plutôt qu'une grille de vignettes.
 *
 * Les trois réalisations tenaient dans des cartes de 380 px, au milieu de
 * cinq autres sections en grille de cartes. Le portfolio est l'argument le
 * plus fort de la page : il lui faut l'échelle qui va avec, et une forme que
 * la page n'utilise nulle part ailleurs.
 */
function Realisations() {
  return (
    <section id="exemples" className="py-20 sm:py-28">
      <div className="mx-auto max-w-7xl px-4 sm:px-6">
        <SectionHeader
          index="05"
          eyebrow="Réalisations"
          title={
            <>
              Des sites <Surligne>réellement en ligne</Surligne>
            </>
          }
          subtitle="Trois métiers, trois logiques différentes. Chaque projet a sa page : ce qui a été livré, pourquoi le site est construit comme ça, et ce qu'on voit en l'ouvrant."
        />
      </div>

      <div className="mt-16 space-y-20 sm:space-y-28">
        {REALISATIONS.map((r, i) => {
          const inverse = i % 2 === 1;
          return (
            <article key={r.slug} className="mx-auto max-w-7xl px-4 sm:px-6">
              <div className="grid items-center gap-10 lg:grid-cols-2 lg:gap-16">
                {/* L'image déborde vers le bord de l'écran, en alternance,
                    pour que la page cesse d'être une colonne centrée. */}
                <div className={inverse ? "lg:order-2" : ""}>
                  <Link
                    to="/realisations/$slug/"
                    params={{ slug: r.slug }}
                    className="zoom-frame group relative block overflow-hidden rounded-2xl border border-border bg-card shadow-elevated"
                  >
                    <img
                      src={r.capture.large}
                      srcSet={`${r.capture.small} 720w, ${r.capture.large} 1200w`}
                      sizes="(min-width: 1024px) 48vw, 92vw"
                      alt={`Page d'accueil du site de ${r.client}`}
                      loading="lazy"
                      decoding="async"
                      className="block h-auto w-full"
                    />
                    <span className="absolute bottom-4 left-4 rounded-full bg-ink/85 px-3.5 py-1.5 text-xs font-semibold text-white backdrop-blur-sm">
                      {r.domaine}
                    </span>
                  </Link>
                </div>

                <div className={inverse ? "lg:order-1" : ""}>
                  <div className="rail-num font-display text-5xl font-extrabold text-brand/35 sm:text-6xl">
                    {String(i + 1).padStart(2, "0")}
                  </div>
                  <div className="rail-label mt-4 text-brand-ink">{r.metier}</div>
                  <h3 className="display-section mt-3 text-[clamp(1.9rem,3.4vw,3rem)]">
                    {r.client}
                  </h3>
                  <p className="mt-2 text-muted-foreground">{r.zone}</p>
                  <p className="measure mt-5 text-lg text-muted-foreground">{r.resume}</p>

                  <ul className="mt-7 flex flex-wrap gap-2">
                    {r.livre.slice(0, 3).map((l) => (
                      <li
                        key={l}
                        className="rounded-full border border-border bg-card px-3 py-1.5 text-sm"
                      >
                        {l}
                      </li>
                    ))}
                  </ul>

                  <Link
                    to="/realisations/$slug/"
                    params={{ slug: r.slug }}
                    className="group mt-8 inline-flex items-center gap-2 text-lg font-semibold text-brand-ink"
                  >
                    Voir l'étude de cas
                    <ArrowRight className="h-5 w-5 transition-transform group-hover:translate-x-1.5" />
                  </Link>
                </div>
              </div>
            </article>
          );
        })}
      </div>

      <div className="mx-auto mt-16 max-w-7xl px-4 sm:px-6">
        <Link
          to="/realisations/"
          className="inline-flex items-center gap-2 rounded-xl bg-accent px-6 py-3.5 font-semibold text-accent-foreground transition hover:brightness-110"
        >
          Toutes les réalisations
          <ArrowRight className="h-5 w-5" />
        </Link>
      </div>
    </section>
  );
}

/* ---------------- PROCESS ---------------- */
/**
 * Liste verticale à numéros surdimensionnés, sur aplat violet.
 *
 * C'était cinq cartes en grille, la cinquième forme de grille de la page.
 * En liste, chaque étape occupe toute la largeur et le numéro devient un
 * élément graphique à part entière plutôt qu'une étiquette dans un coin.
 */
function Process() {
  const steps = [
    { t: "Appel découverte", d: "On comprend votre activité et vos besoins. Vingt minutes." },
    { t: "Création du site", d: "Votre site est conçu sur mesure, sans gabarit revendu." },
    { t: "Validation", d: "Vous validez le rendu, on ajuste si besoin." },
    {
      t: "Mise en ligne",
      d: "Hébergement, nom de domaine, référencement local : on s'occupe de tout.",
    },
    { t: "Suivi mensuel", d: "Maintenance, mises à jour et modifications incluses." },
  ];
  return (
    <section id="process" className="on-wash py-20 sm:py-28">
      <div className="mx-auto max-w-7xl px-4 sm:px-6">
        <SectionHeader
          index="06"
          eyebrow="Process"
          title={
            <>
              Cinq étapes, <span className="accent-word">et c'est en ligne</span>
            </>
          }
          subtitle="De l'appel découverte à la mise en ligne, vous savez à chaque instant où en est votre site."
        />

        <ol className="stagger mt-14">
          {steps.map((s, i) => (
            <li
              key={s.t}
              data-reveal
              style={{ "--i": i } as React.CSSProperties}
              className="group grid items-baseline gap-x-8 gap-y-2 border-t border-border py-7 sm:grid-cols-[auto_16rem_1fr] sm:py-9"
            >
              <span className="brand-gradient-text rail-num font-display text-[clamp(2.4rem,5vw,4rem)] font-extrabold leading-none opacity-45 transition-opacity group-hover:opacity-100">
                {String(i + 1).padStart(2, "0")}
              </span>
              <h3 className="font-display text-xl font-bold tracking-tight sm:text-2xl">{s.t}</h3>
              <p className="text-lg leading-relaxed text-muted-foreground">{s.d}</p>
            </li>
          ))}
        </ol>
      </div>
    </section>
  );
}

/* ---------------- FAQ ---------------- */
const FAQ_MODIF_INDEX = FAQ_ITEMS.findIndex((it) => it.q.includes("modifications incluses"));

function Faq() {
  const items = FAQ_ITEMS;
  const [open, setOpen] = useState<number | null>(0);

  useEffect(() => {
    const openFromHash = () => {
      if (window.location.hash !== "#faq-modifications") return;
      setOpen(FAQ_MODIF_INDEX);
      const el = document.getElementById("faq-modifications");
      if (el) el.scrollIntoView({ behavior: "smooth", block: "center" });
    };
    openFromHash();
    window.addEventListener("hashchange", openFromHash);
    return () => window.removeEventListener("hashchange", openFromHash);
  }, []);

  return (
    <section id="faq" className="bg-paper-sunk py-20 sm:py-28">
      <div className="mx-auto max-w-3xl px-4 sm:px-6">
        <SectionHeader
          index="07"
          eyebrow="FAQ"
          title={
            <>
              Les questions <span className="accent-word">posées avant de démarrer</span>
            </>
          }
        />
        <div className="mt-10 space-y-3">
          {items.map((it, i) => (
            <div
              key={it.q}
              id={i === FAQ_MODIF_INDEX ? "faq-modifications" : undefined}
              className="overflow-hidden scroll-mt-24 rounded-xl border border-border bg-card shadow-soft"
            >
              <button
                onClick={() => setOpen(open === i ? null : i)}
                className="flex w-full items-center justify-between gap-4 px-5 py-4 text-left font-semibold"
              >
                <span>{it.q}</span>
                <ChevronDown
                  className={`h-5 w-5 shrink-0 text-muted-foreground transition-transform ${
                    open === i ? "rotate-180" : ""
                  }`}
                />
              </button>
              {open === i && (
                <div className="px-5 pb-5 text-[15px] leading-relaxed text-muted-foreground">
                  {it.a}
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ---------------- TÉMOIGNAGES ---------------- */
/**
 * Bloc de preuve sociale, équivalent de celui qui porte la page de Linov.
 *
 * TEMOIGNAGES est volontairement vide : aucun propos ne doit être attribué à
 * un client réel sans qu'il l'ait écrit. Tant que le tableau est vide, la
 * section ne s'affiche pas en production. En développement, un gabarit non
 * signé montre la mise en page pour qu'elle soit prête à recevoir les textes.
 *
 * Pour l'activer : coller les citations réelles ci-dessous, telles qu'elles
 * ont été écrites, avec le prénom, le nom de l'entreprise et le métier.
 */
type Temoignage = {
  citation: string;
  auteur: string;
  entreprise: string;
  metier: string;
};

const TEMOIGNAGES: Temoignage[] = [];

const TEMOIGNAGES_GABARIT: Temoignage[] = [
  {
    citation:
      "Emplacement du témoignage. Deux à quatre phrases, dans les mots du client, sans réécriture cosmétique. Ce qui convainc ici, c'est le détail concret : un délai tenu, un appel reçu, un problème réglé.",
    auteur: "Prénom à recueillir",
    entreprise: "Entreprise",
    metier: "Métier",
  },
  {
    citation:
      "Deuxième emplacement. Un témoignage court et précis vaut mieux qu'un paragraphe de superlatifs. Si le client cite un chiffre qu'il a lui-même constaté, on le garde tel quel.",
    auteur: "Prénom à recueillir",
    entreprise: "Entreprise",
    metier: "Métier",
  },
  {
    citation:
      "Troisième emplacement. Trois témoignages suffisent à installer la preuve : au-delà, on lit le premier et on saute les autres.",
    auteur: "Prénom à recueillir",
    entreprise: "Entreprise",
    metier: "Métier",
  },
];

function Temoignages() {
  const reels = TEMOIGNAGES.length > 0;
  const items = reels ? TEMOIGNAGES : import.meta.env.DEV ? TEMOIGNAGES_GABARIT : [];
  if (items.length === 0) return null;

  return (
    <section className="py-20 sm:py-28">
      <div className="mx-auto max-w-7xl px-4 sm:px-6">
        <SectionHeader
          /* Pas de numéro tant que la section reste masquée en production :
             il manquerait dans la série vue par le visiteur. À rétablir avec
             les vrais témoignages, la FAQ passant alors à 08. */
          eyebrow="Témoignages"
          title={
            <>
              Ce qu'ils en <span className="accent-word">disent eux-mêmes</span>
            </>
          }
        />

        {!reels && (
          <p className="mt-8 rounded-xl border border-dashed border-destructive/40 bg-destructive/5 px-4 py-3 text-sm font-semibold text-destructive">
            Gabarit visible en développement uniquement. Cette section reste masquée en production
            tant que TEMOIGNAGES est vide. Aucun propos ne doit être attribué à un client sans qu'il
            l'ait écrit.
          </p>
        )}

        <div className="stagger mt-14 grid gap-5 lg:grid-cols-3">
          {items.map((t, i) => (
            <figure
              key={t.auteur + i}
              data-reveal
              style={{ "--i": i } as React.CSSProperties}
              className="flex flex-col rounded-2xl border border-border bg-card p-7 shadow-soft"
            >
              <span aria-hidden="true" className="accent-word text-5xl leading-none text-brand-ink">
                &ldquo;
              </span>
              <blockquote className="mt-3 flex-1 text-[17px] leading-relaxed text-foreground/85">
                {t.citation}
              </blockquote>
              <figcaption className="mt-6 border-t border-border pt-5">
                <div className="font-display font-bold">{t.auteur}</div>
                <div className="text-sm text-muted-foreground">
                  {t.metier} · {t.entreprise}
                </div>
              </figcaption>
            </figure>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ---------------- FONDATEUR ---------------- */
/**
 * Sitaly est une entreprise individuelle sans local. La page ne montre donc ni
 * effectif, ni équipe, ni adresse : elle montre la personne qui fait le travail.
 * C'est la promesse qu'aucune agence à effectif ne peut tenir. Voir DESIGN.md §9.
 *
 * Photo réelle de Teddy Vidal (shooting @louiss_photography), recadrée en 4:5
 * avec le visage au tiers supérieur. Deux largeurs servies en srcset : le
 * cadre fait 260px au maximum, le 672 couvre les écrans à densité double.
 */
function Founder() {
  return (
    <section className="bg-paper-sunk py-20 sm:py-28">
      <div className="mx-auto max-w-7xl px-4 sm:px-6">
        <div className="grid items-center gap-12 lg:grid-cols-[auto_1fr] lg:gap-16">
          <div className="rise mx-auto w-full max-w-[260px] lg:mx-0">
            <div className="zoom-frame relative rounded-2xl border border-border">
              <img
                src={teddy448}
                srcSet={`${teddy448} 448w, ${teddy672} 672w`}
                sizes="260px"
                width={448}
                height={560}
                loading="lazy"
                decoding="async"
                alt="Teddy Vidal, fondateur de Sitaly"
                className="block h-auto w-full"
              />
            </div>
          </div>

          <div>
            <div className="rail-label text-brand-ink">Qui est derrière</div>
            <h2 className="display-section mt-3">
              Un seul interlocuteur,{" "}
              <span className="accent-word text-brand-ink">celui qui construit votre site</span>
            </h2>
            <div className="measure mt-6 space-y-4 text-lg text-muted-foreground">
              <p>
                Sitaly, c'est moi. Je conçois les sites, je pilote les campagnes et je branche les
                agents IA. Vous n'aurez pas un commercial à l'appel découverte et un stagiaire sur
                votre projet.
              </p>
              <p>
                Je travaille à distance, partout en France. Pas de déplacement à facturer, pas de
                rendez-vous à caler trois semaines à l'avance : on s'appelle vingt minutes et on
                sait tout de suite si ça vaut le coup.
              </p>
            </div>

            <div className="mt-8 flex flex-wrap items-center gap-x-6 gap-y-3">
              <div>
                <div className="font-display text-lg font-bold">Teddy Vidal</div>
                <div className="text-sm text-muted-foreground">Fondateur de Sitaly</div>
              </div>
              <a
                href={`tel:${SITALY_PHONE}`}
                className="inline-flex items-center gap-2 rounded-xl border border-border px-5 py-3 text-sm font-semibold transition hover:bg-secondary"
              >
                <Phone className="h-4 w-4" />
                {SITALY_PHONE_DISPLAY}
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

/* ---------------- CONTACT ---------------- */
function Contact() {
  const [sent, setSent] = useState(false);
  return (
    <section id="contact" className="relative overflow-hidden py-20 sm:py-28">
      <div className="absolute inset-0 -z-10 hero-bg" />
      <div className="mx-auto grid max-w-7xl gap-12 px-4 sm:px-6 lg:grid-cols-2 lg:items-center">
        <div>
          <div className="rail-label text-brand-ink">Contact</div>
          <h2 className="display-section mt-3">
            Discutons de <span className="accent-word text-brand-ink">votre projet</span>
          </h2>
          <p className="mt-4 text-lg text-muted-foreground">
            Laissez-nous vos coordonnées, on vous rappelle sous 24h pour un échange simple et sans
            engagement.
          </p>
          <ul className="mt-8 space-y-4 text-[15px]">
            <li className="flex items-center gap-3">
              <div className="grid h-10 w-10 place-items-center rounded-lg bg-accent/10 text-accent">
                <Phone className="h-5 w-5" />
              </div>
              Un appel découverte de 20 min
            </li>
            <li className="flex items-center gap-3">
              <div className="grid h-10 w-10 place-items-center rounded-lg bg-accent/10 text-accent">
                <Check className="h-5 w-5" />
              </div>
              Sans engagement, ni démarchage
            </li>
            <li className="flex items-center gap-3">
              <div className="grid h-10 w-10 place-items-center rounded-lg bg-accent/10 text-accent">
                <Clock className="h-5 w-5" />
              </div>
              Réponse sous 24h
            </li>
          </ul>

          <div className="mt-8 rounded-2xl border border-border bg-card/70 p-5 shadow-soft">
            <div className="text-sm text-muted-foreground">Vous préférez appeler ?</div>
            <a
              href={`tel:${SITALY_PHONE}`}
              className="mt-1 inline-flex items-center gap-2.5 py-1.5 font-display text-2xl font-extrabold tracking-tight text-foreground transition hover:text-accent"
            >
              <Phone className="h-5 w-5 text-accent" />
              {SITALY_PHONE_DISPLAY}
            </a>
          </div>
        </div>

        <form
          onSubmit={(e) => {
            e.preventDefault();
            const fd = new FormData(e.currentTarget);
            const name = String(fd.get("name") || "");
            const firstname = String(fd.get("firstname") || "");
            const company = String(fd.get("company") || "");
            const phone = String(fd.get("phone") || "");
            const message = String(fd.get("message") || "");
            const fullName = `${firstname} ${name}`.trim();
            const body = `Bonjour, je suis ${fullName}${company ? ` (${company})` : ""}.\nTéléphone : ${phone}\n\n${message}`;
            const sitalyPhone = SITALY_PHONE;
            const ua = navigator.userAgent;
            const isIOS = /iPad|iPhone|iPod/.test(ua);
            const separator = isIOS ? "&" : "?";
            window.location.href = `sms:${sitalyPhone}${separator}body=${encodeURIComponent(body)}`;
            setSent(true);
          }}
          className="rounded-2xl border border-border bg-card p-6 shadow-elevated sm:p-8"
        >
          {sent ? (
            <div className="py-10 text-center">
              <div className="mx-auto grid h-14 w-14 place-items-center rounded-full bg-success/15 text-success">
                <Check className="h-7 w-7" />
              </div>
              <h3 className="mt-4 font-display text-xl font-bold">Merci !</h3>
              <p className="mt-2 text-muted-foreground">
                Votre application de messagerie s'ouvre avec votre message pré-rempli. Il ne vous
                reste plus qu'à l'envoyer.
              </p>
            </div>
          ) : (
            <>
              <div className="grid gap-4 sm:grid-cols-2">
                <Field label="Nom" name="name" required />
                <Field label="Prénom" name="firstname" required />
                <Field label="Téléphone" name="phone" type="tel" required />
                <Field label="Entreprise" name="company" />
              </div>
              <div className="mt-4">
                <label htmlFor="contact-message" className="text-sm font-medium">
                  Message
                </label>
                <textarea
                  id="contact-message"
                  name="message"
                  rows={4}
                  required
                  className="mt-1.5 w-full rounded-lg border border-input bg-background px-3.5 py-2.5 text-[15px] outline-none transition focus:border-accent focus:ring-2 focus:ring-accent/20"
                  placeholder="Parlez-nous brièvement de votre activité…"
                />
              </div>
              <button
                type="submit"
                className="mt-5 inline-flex w-full items-center justify-center gap-2 rounded-xl bg-primary px-6 py-3.5 font-semibold text-primary-foreground shadow-soft transition hover:opacity-90"
              >
                <Phone className="h-5 w-5" />
                Envoyer un message
              </button>
              <p className="mt-3 text-center text-xs text-muted-foreground">
                Votre application de messagerie s'ouvrira avec le message pré-rempli.
              </p>
            </>
          )}
        </form>
      </div>
    </section>
  );
}

function Field({
  label,
  name,
  type = "text",
  required,
}: {
  label: string;
  name: string;
  type?: string;
  required?: boolean;
}) {
  const id = `field-${name}`;
  return (
    <div>
      <label htmlFor={id} className="text-sm font-medium">
        {label} {required && <span className="text-destructive">*</span>}
      </label>
      <input
        id={id}
        name={name}
        type={type}
        required={required}
        maxLength={150}
        className="mt-1.5 w-full rounded-lg border border-input bg-background px-3.5 py-2.5 text-[15px] outline-none transition focus:border-accent focus:ring-2 focus:ring-accent/20"
      />
    </div>
  );
}

/* ---------------- FOOTER ---------------- */
function Footer() {
  return (
    <footer className="border-t border-border bg-primary py-12 text-primary-foreground">
      <div className="mx-auto max-w-7xl px-4 sm:px-6">
        <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-4">
          <div>
            <div className="flex items-center gap-2">
              <SitalyLogo />
            </div>
            <p className="mt-3 text-sm text-primary-foreground/70">
              Plus de clients pour les PME, TPE et artisans : site internet, Google Ads, ChatGPT Ads
              et automatisation.
            </p>
            <div className="mt-4">
              <LinkedinLink variant="clair" />
            </div>
          </div>
          <div>
            <div className="text-sm font-semibold">Sites par métier</div>
            <MetierFooterLinks className="mt-3 space-y-1 text-sm text-primary-foreground/70" />
          </div>
          <div>
            <div className="text-sm font-semibold">Navigation</div>
            <ul className="mt-3 space-y-1 text-sm text-primary-foreground/70">
              <li>
                <a href="#offre" className="block py-2.5 hover:text-primary-foreground">
                  Offres
                </a>
              </li>
              <li>
                <Link to="/agents-ia/" className="block py-2.5 hover:text-primary-foreground">
                  Agents IA
                </Link>
              </li>
              <li>
                <a href="/chatgpt-ads/" className="block py-2.5 hover:text-primary-foreground">
                  ChatGPT Ads
                </a>
              </li>
              <li>
                <a href="#exemples" className="block py-2.5 hover:text-primary-foreground">
                  Exemples
                </a>
              </li>
              <li>
                <a href="#process" className="block py-2.5 hover:text-primary-foreground">
                  Process
                </a>
              </li>
              <li>
                <a href="#faq" className="block py-2.5 hover:text-primary-foreground">
                  FAQ
                </a>
              </li>
              <li>
                <Link to="/blog/" className="block py-2.5 hover:text-primary-foreground">
                  Blog
                </Link>
              </li>
            </ul>
          </div>
          <div>
            <div className="text-sm font-semibold">Contact</div>
            <ul className="mt-3 space-y-2 text-sm text-primary-foreground/70">
              <li>
                <a
                  href={`tel:${SITALY_PHONE}`}
                  className="flex items-center gap-2 py-2.5 font-semibold text-primary-foreground hover:text-accent"
                >
                  <Phone className="h-4 w-4" /> {SITALY_PHONE_DISPLAY}
                </a>
              </li>
              <li>
                <a
                  href="mailto:contact@sitaly.fr"
                  className="flex items-center gap-2 py-2.5 hover:text-primary-foreground"
                >
                  <Mail className="h-4 w-4" /> contact@sitaly.fr
                </a>
              </li>
              <li className="flex items-center gap-2 py-2.5">
                <Globe className="h-4 w-4" /> sitaly.fr
              </li>
              <li>
                <a
                  href="https://www.linkedin.com/in/vidalozzi"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-2 py-2.5 hover:text-primary-foreground"
                >
                  <Linkedin className="h-4 w-4" /> Teddy Vidal
                </a>
              </li>
              <li>
                <a
                  href="https://instagram.com/sitaly.fr"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-2 py-2.5 hover:text-primary-foreground"
                >
                  <Instagram className="h-4 w-4" /> @sitaly.fr
                </a>
              </li>
            </ul>
          </div>
        </div>
        <div className="mt-10 flex flex-col items-center justify-between gap-3 border-t border-white/10 pt-6 text-xs text-primary-foreground/60 sm:flex-row">
          <div>© {new Date().getFullYear()} Sitaly. Tous droits réservés.</div>
          <div className="flex flex-wrap justify-center gap-x-5 gap-y-1">
            <Link
              to="/mentions-legales/"
              className="inline-block py-2.5 hover:text-primary-foreground"
            >
              Mentions légales
            </Link>
            <Link
              to="/politique-confidentialite/"
              className="inline-block py-2.5 hover:text-primary-foreground"
            >
              Confidentialité
            </Link>
            <Link to="/cgv/" className="inline-block py-2.5 hover:text-primary-foreground">
              CGV
            </Link>
            <Link to="/cookies/" className="inline-block py-2.5 hover:text-primary-foreground">
              Cookies
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
}

/* ---------------- SHARED ---------------- */
