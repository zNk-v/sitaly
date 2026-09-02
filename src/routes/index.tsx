import { createFileRoute, Link } from "@tanstack/react-router";
import { useState, useEffect, useRef } from "react";
import {
  Phone,
  Calendar,
  Check,
  ArrowRight,
  Search,
  Clock,
  Frown,
  TrendingUp,
  Star,
  ChevronDown,
  Sparkles,
  Mail,
  Globe,
  Target,
  Zap,
  MessageSquare,
  FileText,
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
      <ProfessionsMarquee />
      <TrustBar />
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
        className="scroll-progress absolute inset-x-0 bottom-0 h-px origin-left bg-gradient-to-r from-brand to-brand-deep"
        aria-hidden="true"
      />
      <div className="relative mx-auto flex h-16 max-w-7xl items-center justify-between px-4 sm:px-6">
        <a href="#top" className="flex items-center" aria-label="Sitaly — accueil">
          <SitalyLogo />
        </a>
        <nav className="hidden items-center gap-8 md:flex">
          <a
            href="#offre"
            className="text-sm font-medium text-muted-foreground transition hover:text-foreground"
          >
            Offres
          </a>
          <Link
            to="/agents-ia/"
            className="inline-flex items-center gap-1.5 text-sm font-semibold text-brand transition hover:text-foreground"
          >
            <Sparkles className="h-3.5 w-3.5" />
            Agents IA
          </Link>
          {/* Page statique hors routeur : lien classique, pas de <Link>. */}
          <a
            href="/chatgpt-ads/"
            className="inline-flex items-center gap-1.5 text-sm font-semibold text-brand transition hover:text-foreground"
          >
            <MessageSquare className="h-3.5 w-3.5" />
            ChatGPT Ads
          </a>
          <a
            href="#exemples"
            className="text-sm font-medium text-muted-foreground transition hover:text-foreground"
          >
            Exemples
          </a>
          <a
            href="#process"
            className="text-sm font-medium text-muted-foreground transition hover:text-foreground"
          >
            Process
          </a>
          <Link
            to="/blog/"
            className="text-sm font-medium text-muted-foreground transition hover:text-foreground"
          >
            Blog
          </Link>
          <a
            href="#faq"
            className="text-sm font-medium text-muted-foreground transition hover:text-foreground"
          >
            FAQ
          </a>
        </nav>

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
  const sectionRef = useRef<HTMLElement>(null);

  /* Halo qui suit le curseur. Écrit deux variables CSS au rythme de l'écran,
     jamais de style calculé en JS : le rendu reste au compositeur. Pointeur
     fin uniquement, donc rien ne tourne au doigt sur mobile. */
  useEffect(() => {
    const el = sectionRef.current;
    if (!el) return;
    if (!window.matchMedia("(pointer: fine)").matches) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    let frame = 0;
    let x = 0;
    let y = 0;
    const onMove = (e: PointerEvent) => {
      const r = el.getBoundingClientRect();
      x = e.clientX - r.left;
      y = e.clientY - r.top;
      if (frame) return;
      frame = requestAnimationFrame(() => {
        frame = 0;
        el.style.setProperty("--mx", `${x}px`);
        el.style.setProperty("--my", `${y}px`);
      });
    };
    el.addEventListener("pointermove", onMove, { passive: true });
    return () => {
      el.removeEventListener("pointermove", onMove);
      if (frame) cancelAnimationFrame(frame);
    };
  }, []);

  return (
    <section ref={sectionRef} id="top" className="hero-bg hero-halo relative overflow-hidden">
      <div className="relative mx-auto max-w-7xl px-4 pb-28 pt-16 sm:px-6 sm:pt-24 lg:pb-36">
        <div className="grid items-center gap-12 lg:grid-cols-[1.05fr_1fr]">
          <div>
            <div className="inline-flex items-center gap-2 rounded-full border border-border bg-secondary px-3 py-1 text-xs font-medium text-muted-foreground">
              <Sparkles className="h-3.5 w-3.5 text-brand-ink" />
              Agence web · Artisans, indépendants & PME de services
            </div>
            {/* Le fragment final bascule en serif italique plutôt qu'en couleur :
                la tension vient du dessin de la lettre. Voir DESIGN.md §4. */}
            <h1 data-split className="display-hero mt-6">
              Plus de clients. Plus d'appels.{" "}
              <span className="accent-word text-brand-ink">Moins de temps perdu.</span>
            </h1>
            <p className="measure mt-6 text-lg text-muted-foreground sm:text-xl">
              Sitaly construit et pilote votre présence en ligne : site internet, Google Ads, agents
              IA. Vous gardez votre métier, on prend le reste.
            </p>

            <div className="mt-9 flex flex-col gap-3 sm:flex-row">
              <a
                href={CALENDLY_URL}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center justify-center gap-2 rounded-xl bg-accent px-6 py-3.5 text-base font-semibold text-accent-foreground shadow-glow transition hover:brightness-110"
              >
                <Calendar className="h-5 w-5" />
                Réserver un appel
              </a>
              <a
                href="#exemples"
                className="inline-flex items-center justify-center gap-2 rounded-xl border border-border bg-card px-6 py-3.5 text-base font-semibold shadow-soft transition hover:bg-secondary"
              >
                Voir nos réalisations
                <ArrowRight className="h-5 w-5" />
              </a>
            </div>

            {/* Ce que le prix affiché portait — clarté et absence d'engagement —
                reste dit ici, sans montant. Voir DESIGN.md §8. */}
            <ul className="mt-9 grid grid-cols-2 gap-x-6 gap-y-3 text-sm sm:grid-cols-3 sm:text-[15px]">
              {["Sans engagement", "Sans frais d'installation", "Réponse sous 24h"].map((t) => (
                <li key={t} className="flex items-center gap-2 text-foreground/80">
                  <Check className="h-4 w-4 shrink-0 text-signal-ink" />
                  {t}
                </li>
              ))}
            </ul>
          </div>

          <div className="drift relative">
            <HeroPreuve />
          </div>
        </div>
      </div>
    </section>
  );
}

/**
 * Preuve en tête de page : les trois sites réellement livrés, empilés.
 *
 * Remplace une fausse fenêtre de navigateur affichant « votre-entreprise.fr ».
 * Un faux site ne prouve rien et se voit ; trois vrais sites, nommés par leur
 * domaine et cliquables, disent la même chose en étant vérifiables.
 */
function HeroPreuve() {
  const [principal, ...secondaires] = REALISATIONS;
  return (
    <div className="relative mx-auto w-full max-w-xl">
      <a
        href={principal.url}
        target="_blank"
        rel="noopener noreferrer"
        className="zoom-frame group block rounded-2xl border border-border bg-card shadow-elevated"
      >
        <img
          src={principal.capture.small}
          srcSet={`${principal.capture.small} 720w, ${principal.capture.large} 1200w`}
          sizes="(min-width: 1024px) 44vw, 92vw"
          alt={`Page d'accueil du site de ${principal.client}`}
          width={720}
          height={500}
          decoding="async"
          className="block h-auto w-full rounded-2xl"
        />
        <span className="absolute bottom-3 left-3 rounded-full bg-ink/85 px-3 py-1 text-xs font-semibold text-white backdrop-blur-sm">
          {principal.domaine}
        </span>
      </a>

      {/* Les deux autres, décalés, pour dire qu'il y en a plusieurs sans
          encombrer. Masqués sous sm, où la place manque. */}
      <div className="pointer-events-none absolute -bottom-14 -left-2 hidden gap-4 sm:flex">
        {secondaires.map((r, i) => (
          <a
            key={r.slug}
            href={r.url}
            target="_blank"
            rel="noopener noreferrer"
            style={{ transform: `rotate(${i === 0 ? -2.5 : 1.5}deg)` }}
            className="pointer-events-auto w-[150px] overflow-hidden rounded-xl border border-border bg-card shadow-elevated transition hover:-translate-y-1"
          >
            <img
              src={r.capture.small}
              alt={`Page d'accueil du site de ${r.client}`}
              loading="lazy"
              decoding="async"
              className="block h-auto w-full"
            />
          </a>
        ))}
      </div>

      <div className="animate-float absolute -right-4 -top-4 hidden items-center gap-2.5 rounded-xl border border-border bg-card px-3.5 py-2.5 shadow-elevated sm:flex">
        <span className="grid h-9 w-9 place-items-center rounded-lg bg-signal-ink/12 text-signal-ink">
          <Check className="h-4 w-4" />
        </span>
        <div>
          <div className="text-xs text-muted-foreground">Sites livrés</div>
          <div className="text-sm font-semibold">Tous en ligne, vérifiables</div>
        </div>
      </div>
    </div>
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

  const Track = ({ hidden = false }: { hidden?: boolean }) => (
    <ul className="flex shrink-0 items-center" aria-hidden={hidden || undefined}>
      {metiers.map((m) => (
        <li key={m} className="flex items-center">
          <span className="whitespace-nowrap px-6 text-base font-semibold text-foreground/75 sm:px-8 sm:text-lg">
            {m}
          </span>
          <span className="h-1.5 w-1.5 shrink-0 rounded-full bg-brand/60" aria-hidden="true" />
        </li>
      ))}
    </ul>
  );

  return (
    <section className="border-t border-border bg-paper-sunk py-12 sm:py-16">
      <div className="mx-auto max-w-3xl px-4 text-center sm:px-6">
        <h2 className="font-display text-xl font-bold tracking-tight sm:text-2xl">
          Plus de clients pour votre activité,{" "}
          <span className="accent-word text-brand-ink">quel que soit votre métier</span>
        </h2>
      </div>
      <div className="marquee marquee-mask group relative mt-9 flex overflow-hidden">
        <div className="animate-marquee flex shrink-0">
          <Track />
          <Track hidden />
        </div>
      </div>
    </section>
  );
}

function TrustBar() {
  /* Le montant a quitté la page (DESIGN.md §8). Ce qu'il portait — un cadre
     clair et sans piège — est repris ici en engagements vérifiables. */
  const items = [
    { v: "48h", l: "Mise en ligne" },
    { v: "24h", l: "Réponse à votre demande" },
    { v: "0€", l: "Frais d'installation" },
    { v: "Sans", l: "Engagement de durée" },
  ];
  return (
    <div className="border-y border-border bg-paper-sunk">
      <div className="mx-auto grid max-w-7xl grid-cols-2 divide-x divide-y divide-border/70 md:grid-cols-4 md:divide-y-0">
        {items.map((i) => (
          <div key={i.l} className="px-5 py-7">
            <div className="rail-num font-display text-2xl font-extrabold tracking-tight text-brand-ink sm:text-3xl">
              {i.v}
            </div>
            <div className="mt-1 text-xs text-muted-foreground sm:text-sm">{i.l}</div>
          </div>
        ))}
      </div>
    </div>
  );
}

/* ---------------- PROBLEM ---------------- */
function Problem() {
  const items = [
    {
      icon: Search,
      title: "Pas de site internet",
      desc: "Vos clients vous cherchent sur Google… et trouvent vos concurrents à votre place.",
    },
    {
      icon: Frown,
      title: "Site ancien ou amateur",
      desc: "Un site daté donne une mauvaise première impression et fait fuir les prospects sérieux.",
    },
    {
      icon: Clock,
      title: "Pas le temps de vous en occuper",
      desc: "Vous êtes artisan, pas développeur. Gérer un site, c'est une perte de temps et d'énergie.",
    },
  ];
  return (
    <section className="py-20 sm:py-24">
      <div className="mx-auto max-w-7xl px-4 sm:px-6">
        <SectionHeader
          index="01"
          eyebrow="Le constat"
          title={
            <>
              Votre site actuel vous fait <span className="accent-word">perdre des clients</span>
            </>
          }
          subtitle="Aujourd'hui, 8 clients sur 10 vérifient un site web avant de vous contacter."
        />
        <div className="stagger mt-14 grid gap-6 md:grid-cols-3">
          {items.map((it, i) => (
            <div
              key={it.title}
              data-reveal
              style={{ "--i": i } as React.CSSProperties}
              className="lift rounded-2xl border border-border bg-card p-7 shadow-soft"
            >
              <div className="grid h-12 w-12 place-items-center rounded-xl bg-destructive/10 text-destructive">
                <it.icon className="h-6 w-6" />
              </div>
              <h3 className="mt-5 text-lg font-bold">{it.title}</h3>
              <p className="mt-2 text-[15px] text-muted-foreground">{it.desc}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ---------------- HOW IT WORKS ---------------- */
function HowItWorks() {
  const steps = [
    {
      n: "01",
      icon: Search,
      title: "Attirer",
      benefit: "Être trouvé par vos futurs clients",
      points: [
        "Site internet professionnel",
        "Référencement local",
        "Google Business Profile",
        "Google Ads",
      ],
    },
    {
      n: "02",
      icon: Target,
      title: "Convertir",
      benefit: "Transformer les visiteurs en demandes",
      points: ["Pages optimisées", "Formulaires performants", "Appels à l'action efficaces"],
    },
    {
      n: "03",
      icon: Zap,
      title: "Automatiser",
      benefit: "Gagner du temps sur le suivi",
      points: [
        "Réponse automatique aux demandes",
        "Qualification des prospects",
        "Relance des devis",
        "Prise de rendez-vous",
      ],
    },
  ];
  return (
    /* Première section en encre : elle installe l'alternance annoncée en
       DESIGN.md §3 et détache la méthode du reste de la page. */
    <section className="bg-paper-sunk py-20 sm:py-28">
      <div className="mx-auto max-w-7xl px-4 sm:px-6">
        <SectionHeader
          index="02"
          eyebrow="Notre méthode"
          title={
            <>
              Attirer, convertir, <span className="accent-word text-brand-ink">automatiser</span>
            </>
          }
          subtitle="Un système en trois temps pour transformer votre présence en ligne en clients."
        />
        <div className="stagger mt-14 grid gap-5 md:grid-cols-3">
          {steps.map((s, i) => (
            <div
              key={s.title}
              data-reveal
              style={{ "--i": i } as React.CSSProperties}
              className="lift rounded-2xl border border-border bg-card p-7"
            >
              <div className="flex items-center justify-between">
                <div className="grid h-12 w-12 place-items-center rounded-xl bg-accent/10 text-brand-ink-ink">
                  <s.icon className="h-6 w-6" />
                </div>
                <span className="rail-num font-display text-3xl font-extrabold text-muted-foreground/40">
                  {s.n}
                </span>
              </div>
              <h3 className="mt-5 text-xl font-bold">{s.title}</h3>
              <p className="mt-1 text-[15px] font-medium text-muted-foreground">{s.benefit}</p>
              <ul className="mt-5 space-y-2.5">
                {s.points.map((p) => (
                  <li key={p} className="flex items-start gap-2.5 text-[15px] text-foreground/85">
                    <Check className="mt-0.5 h-5 w-5 shrink-0 text-signal-ink" />
                    <span>{p}</span>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ---------------- COMPLÉMENTS ---------------- */
/**
 * Les deux anciennes sections tarifaires (forfaits blog SEO, options ponctuelles)
 * fusionnent ici en une seule liste de compléments, sans montant.
 * Voir DESIGN.md §8.
 */
const EXTRAS = [
  {
    icon: FileText,
    name: "Blog SEO",
    desc: "Des articles optimisés, rédigés et mis en page chaque mois. En complément de votre site, ou seul si vous en avez déjà un.",
  },
  {
    icon: Sparkles,
    name: "Logo & identité visuelle",
    desc: "Un logo, une palette et des règles d'usage, quand la marque n'existe pas encore ou a vieilli.",
  },
  {
    icon: Star,
    name: "Photos professionnelles",
    desc: "Vos vraies réalisations photographiées. Rien ne remplace une photo de votre travail sur votre propre site.",
  },
  {
    icon: TrendingUp,
    name: "Rédaction de contenus",
    desc: "Pages de service, fiches métier, textes de présentation. Écrits pour vos clients et pour Google.",
  },
] as const;

function Extras() {
  return (
    <section className="bg-paper-sunk py-20 sm:py-28">
      <div className="mx-auto max-w-7xl px-4 sm:px-6">
        <SectionHeader
          index="06"
          eyebrow="Compléments"
          title={
            <>
              Ce qui s'ajoute <span className="accent-word">quand c'est utile</span>
            </>
          }
          subtitle="Rien d'imposé. Ces briques se greffent sur votre accompagnement, à la demande."
        />
        <div className="stagger mt-14 grid gap-4 sm:grid-cols-2">
          {EXTRAS.map((o, i) => (
            <div
              key={o.name}
              data-reveal
              style={{ "--i": i } as React.CSSProperties}
              className="lift flex gap-4 rounded-2xl border border-border bg-card p-6 shadow-soft"
            >
              <div className="grid h-11 w-11 shrink-0 place-items-center rounded-xl bg-accent/10 text-accent">
                <o.icon className="h-5 w-5" />
              </div>
              <div className="min-w-0">
                <h3 className="font-bold">{o.name}</h3>
                <p className="mt-1.5 text-[15px] text-muted-foreground">{o.desc}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ---------------- RÉALISATIONS ---------------- */
/**
 * Les trois clients apparaissaient deux fois sur la page, en « exemples » puis
 * en « clients », et aucun des deux blocs ne menait ailleurs qu'au site du
 * client. Un seul bloc désormais, et chaque carte ouvre son étude de cas :
 * c'est là que se raconte le travail, pas dans une vignette.
 */
function Realisations() {
  return (
    <section id="exemples" className="py-20 sm:py-28">
      <div className="mx-auto max-w-7xl px-4 sm:px-6">
        <SectionHeader
          index="07"
          eyebrow="Réalisations"
          title={
            <>
              Des sites <span className="accent-word">réellement en ligne</span>
            </>
          }
          subtitle="Trois métiers, trois logiques différentes. Chaque projet a sa page : ce qui a été livré, pourquoi le site est construit comme ça, et ce qu'on voit en l'ouvrant."
        />

        <div className="stagger mt-14 grid gap-8 lg:grid-cols-3">
          {REALISATIONS.map((r, i) => (
            <Link
              key={r.slug}
              to="/realisations/$slug/"
              params={{ slug: r.slug }}
              data-reveal
              style={{ "--i": i } as React.CSSProperties}
              className="lift group flex flex-col overflow-hidden rounded-2xl border border-border bg-card shadow-soft"
            >
              <div className="zoom-frame relative aspect-[16/11] border-b border-border">
                <img
                  src={r.capture.small}
                  srcSet={`${r.capture.small} 720w, ${r.capture.large} 1200w`}
                  sizes="(min-width: 1024px) 30vw, 100vw"
                  alt={`Page d'accueil du site de ${r.client}`}
                  loading="lazy"
                  decoding="async"
                  className="absolute inset-0 h-full w-full object-cover object-top"
                />
                <span className="absolute bottom-3 left-3 rounded-full bg-ink/85 px-3 py-1 text-xs font-semibold text-foreground/85 backdrop-blur-sm">
                  {r.domaine}
                </span>
              </div>
              <div className="flex flex-1 flex-col p-6">
                <div className="rail-label text-brand-ink">{r.metier}</div>
                <h3 className="mt-2 font-display text-xl font-bold tracking-tight">{r.client}</h3>
                <p className="mt-1 text-sm text-muted-foreground">{r.zone}</p>
                <p className="mt-3 flex-1 text-[15px] text-muted-foreground">{r.resume}</p>
                <span className="mt-5 inline-flex items-center gap-2 font-semibold text-brand-ink">
                  Voir l'étude de cas
                  <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
                </span>
              </div>
            </Link>
          ))}
        </div>

        <div className="mt-12 flex flex-wrap items-center gap-4">
          <Link
            to="/realisations/"
            className="inline-flex items-center gap-2 rounded-xl bg-accent px-6 py-3.5 font-semibold text-accent-foreground transition hover:brightness-110"
          >
            Toutes les réalisations
            <ArrowRight className="h-5 w-5" />
          </Link>
          <span className="text-sm text-muted-foreground">
            Chaque site est ouvert au public. Vérifiez par vous-même.
          </span>
        </div>
      </div>
    </section>
  );
}

/* ---------------- PROCESS ---------------- */
function Process() {
  const steps = [
    { n: "01", t: "Appel découverte", d: "On comprend votre activité et vos besoins (20 min)." },
    { n: "02", t: "Création du site", d: "Votre site est conçu sur mesure, sans gabarit revendu." },
    { n: "03", t: "Validation", d: "Vous validez le rendu, on ajuste si besoin." },
    {
      n: "04",
      t: "Mise en ligne",
      d: "Hébergement, nom de domaine, SEO local : on s'occupe de tout.",
    },
    { n: "05", t: "Suivi mensuel", d: "Maintenance, mises à jour et modifications incluses." },
  ];
  return (
    <section id="process" className="bg-paper-sunk py-20 sm:py-28">
      <div className="mx-auto max-w-7xl px-4 sm:px-6">
        <SectionHeader
          index="08"
          eyebrow="Process"
          title={
            <>
              Cinq étapes, <span className="accent-word text-brand-ink">et c'est en ligne</span>
            </>
          }
          subtitle="De l'appel découverte à la mise en ligne, vous savez à chaque instant où en est votre site."
        />
        <ol className="stagger mt-14 grid gap-5 sm:grid-cols-2 lg:grid-cols-5">
          {steps.map((s, i) => (
            <li
              key={s.n}
              data-reveal
              style={{ "--i": i } as React.CSSProperties}
              className="lift relative rounded-2xl border border-border bg-card p-6"
            >
              <div className="rail-num font-display text-3xl font-extrabold text-brand-ink">
                {s.n}
              </div>
              <div className="mt-3 font-bold">{s.t}</div>
              <div className="mt-1.5 text-sm text-muted-foreground">{s.d}</div>
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
          index="10"
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
          index="10"
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
