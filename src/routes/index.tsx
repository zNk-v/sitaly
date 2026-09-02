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
  Shield,
  Star,
  ChevronDown,
  Sparkles,
  Mail,
  Globe,
  Target,
  Zap,
  Megaphone,
  Bell,
  Filter,
  MessageSquare,
  FileText,
  Instagram,
  Linkedin,
  Bot,
  Hammer,
  Menu,
  X,
} from "lucide-react";
import visuelAuto800 from "@/assets/visuel-automatisation-800.jpg";
import visuelAuto1400 from "@/assets/visuel-automatisation-1400.jpg";
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
      <GoogleAds />
      <Automation />
      <Pricing />
      <Extras />
      <Examples />
      <MetierLinksSection />
      <Process />
      <Clients />
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
    <header className="sticky top-0 z-50 border-b border-white/10 bg-ink/90 backdrop-blur-md">
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
            className="text-sm font-medium text-white/70 transition hover:text-white"
          >
            Offres
          </a>
          <Link
            to="/agents-ia/"
            className="inline-flex items-center gap-1.5 text-sm font-semibold text-brand transition hover:text-white"
          >
            <Sparkles className="h-3.5 w-3.5" />
            Agents IA
          </Link>
          {/* Page statique hors routeur : lien classique, pas de <Link>. */}
          <a
            href="/chatgpt-ads/"
            className="inline-flex items-center gap-1.5 text-sm font-semibold text-brand transition hover:text-white"
          >
            <MessageSquare className="h-3.5 w-3.5" />
            ChatGPT Ads
          </a>
          <a
            href="#exemples"
            className="text-sm font-medium text-white/70 transition hover:text-white"
          >
            Exemples
          </a>
          <a
            href="#process"
            className="text-sm font-medium text-white/70 transition hover:text-white"
          >
            Process
          </a>
          <Link
            to="/blog/"
            className="text-sm font-medium text-white/70 transition hover:text-white"
          >
            Blog
          </Link>
          <a href="#faq" className="text-sm font-medium text-white/70 transition hover:text-white">
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
      {/* Boucle générée, posée en accent sur le dégradé et non à sa place.
          preload="none" et aucune dimension intrinsèque à charger : le LCP
          reste le titre, la vidéo arrive après. Masquée sous md et sous
          prefers-reduced-motion, où le dégradé seul fait le travail. */}
      <video
        className="hero-video pointer-events-none absolute inset-0 hidden h-full w-full object-cover opacity-45 md:block"
        src="/hero-loop.mp4"
        poster="/hero-loop-poster.jpg"
        autoPlay
        muted
        loop
        playsInline
        preload="none"
        aria-hidden="true"
        tabIndex={-1}
      />
      <div className="relative mx-auto max-w-7xl px-4 pb-20 pt-16 sm:px-6 sm:pt-24 lg:pb-28">
        <div className="grid items-center gap-12 lg:grid-cols-[1.05fr_1fr]">
          <div>
            <div className="inline-flex items-center gap-2 rounded-full border border-white/15 bg-white/5 px-3 py-1 text-xs font-medium text-white/70">
              <Sparkles className="h-3.5 w-3.5 text-brand" />
              Agence web · Artisans, indépendants & PME de services
            </div>
            {/* Le fragment final bascule en serif italique plutôt qu'en couleur :
                la tension vient du dessin de la lettre. Voir DESIGN.md §4. */}
            <h1 data-split className="display-hero mt-6 text-white">
              Plus de clients. Plus d'appels.{" "}
              <span className="accent-word text-brand">Moins de temps perdu.</span>
            </h1>
            <p className="measure mt-6 text-lg text-white/70 sm:text-xl">
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
                className="inline-flex items-center justify-center gap-2 rounded-xl border border-white/20 px-6 py-3.5 text-base font-semibold text-white transition hover:bg-white/10"
              >
                Voir nos réalisations
                <ArrowRight className="h-5 w-5" />
              </a>
            </div>

            {/* Ce que le prix affiché portait — clarté et absence d'engagement —
                reste dit ici, sans montant. Voir DESIGN.md §8. */}
            <ul className="mt-9 grid grid-cols-2 gap-x-6 gap-y-3 text-sm sm:grid-cols-3 sm:text-[15px]">
              {["Sans engagement", "Sans frais d'installation", "Réponse sous 24h"].map((t) => (
                <li key={t} className="flex items-center gap-2 text-white/80">
                  <Check className="h-4 w-4 shrink-0 text-signal" />
                  {t}
                </li>
              ))}
            </ul>
          </div>

          {/* Visual mock */}
          <div className="drift relative">
            <HeroMock />
          </div>
        </div>
      </div>
    </section>
  );
}

function HeroMock() {
  return (
    <div className="relative mx-auto w-full max-w-xl">
      <div className="absolute -inset-4 rounded-3xl bg-gradient-to-br from-accent/20 to-primary/20 blur-2xl" />
      <div className="relative overflow-hidden rounded-2xl border border-border bg-card shadow-elevated">
        <div className="flex items-center gap-1.5 border-b border-border bg-secondary px-4 py-3">
          <span className="h-2.5 w-2.5 rounded-full bg-destructive/60" />
          <span className="h-2.5 w-2.5 rounded-full bg-success/60" />
          <span className="h-2.5 w-2.5 rounded-full bg-accent/60" />
          <span className="ml-3 truncate rounded bg-background px-2 py-0.5 text-xs text-muted-foreground">
            votre-entreprise.fr
          </span>
        </div>
        <div className="space-y-4 p-6">
          <div className="flex items-center justify-between">
            <div className="h-6 w-24 rounded bg-primary/90" />
            <div className="flex gap-2">
              <div className="h-3 w-10 rounded bg-muted" />
              <div className="h-3 w-10 rounded bg-muted" />
              <div className="h-3 w-10 rounded bg-muted" />
            </div>
          </div>
          <div className="space-y-2">
            <div className="h-7 w-3/4 rounded bg-foreground/85" />
            <div className="h-7 w-2/3 rounded bg-foreground/85" />
            <div className="h-3 w-full rounded bg-muted" />
            <div className="h-3 w-5/6 rounded bg-muted" />
          </div>
          <div className="flex gap-2 pt-1">
            <div className="h-9 w-32 rounded-lg bg-accent" />
            <div className="h-9 w-28 rounded-lg border border-border" />
          </div>
          <div className="grid grid-cols-3 gap-3 pt-3">
            {[1, 2, 3].map((i) => (
              <div key={i} className="rounded-lg border border-border p-3">
                <div className="mb-2 h-6 w-6 rounded bg-accent/20" />
                <div className="h-2 w-full rounded bg-muted" />
                <div className="mt-1 h-2 w-2/3 rounded bg-muted" />
              </div>
            ))}
          </div>
        </div>
      </div>
      {/* floating card */}
      <div className="animate-float absolute -bottom-6 -left-6 hidden rounded-xl border border-border bg-card p-3 shadow-elevated sm:flex sm:items-center sm:gap-3">
        <div className="grid h-10 w-10 place-items-center rounded-lg bg-success/15 text-success">
          <Phone className="h-5 w-5" />
        </div>
        <div>
          <div className="text-xs text-muted-foreground">Nouveau appel</div>
          <div className="text-sm font-semibold">+ 3 devis cette semaine</div>
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
          <span className="whitespace-nowrap px-6 text-base font-semibold text-white/75 sm:px-8 sm:text-lg">
            {m}
          </span>
          <span className="h-1.5 w-1.5 shrink-0 rounded-full bg-brand/60" aria-hidden="true" />
        </li>
      ))}
    </ul>
  );

  return (
    <section className="border-t border-white/10 bg-ink py-12 text-white sm:py-16">
      <div className="mx-auto max-w-3xl px-4 text-center sm:px-6">
        <h2 className="font-display text-xl font-bold tracking-tight sm:text-2xl">
          Plus de clients pour votre activité,{" "}
          <span className="accent-word text-brand">quel que soit votre métier</span>
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
    <section className="bg-ink py-20 text-white sm:py-28">
      <div className="mx-auto max-w-7xl px-4 sm:px-6">
        <SectionHeader
          index="02"
          eyebrow="Notre méthode"
          tone="ink"
          title={
            <>
              Attirer, convertir, <span className="accent-word text-brand">automatiser</span>
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
              className="lift lift-ink rounded-2xl border border-white/12 bg-white/[0.04] p-7"
            >
              <div className="flex items-center justify-between">
                <div className="grid h-12 w-12 place-items-center rounded-xl bg-brand/15 text-brand">
                  <s.icon className="h-6 w-6" />
                </div>
                <span className="rail-num font-display text-3xl font-extrabold text-white/20">
                  {s.n}
                </span>
              </div>
              <h3 className="mt-5 text-xl font-bold">{s.title}</h3>
              <p className="mt-1 text-[15px] font-medium text-white/60">{s.benefit}</p>
              <ul className="mt-5 space-y-2.5">
                {s.points.map((p) => (
                  <li key={p} className="flex items-start gap-2.5 text-[15px] text-white/85">
                    <Check className="mt-0.5 h-5 w-5 shrink-0 text-signal" />
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

/* ---------------- GOOGLE ADS ---------------- */
function GoogleAds() {
  const points = [
    {
      icon: Megaphone,
      title: "Visibilité immédiate",
      desc: "Pourquoi attendre des mois le référencement naturel ? Apparaissez en haut de Google dès le premier jour.",
    },
    {
      icon: Target,
      title: "Des prospects qualifiés",
      desc: "On cible les personnes qui cherchent vos services, dans votre zone, au bon moment.",
    },
    {
      icon: Shield,
      title: "Un budget maîtrisé",
      desc: "Vous fixez le budget. Pas de mauvaise surprise, vous gardez le contrôle.",
    },
    {
      icon: TrendingUp,
      title: "Des résultats mesurables",
      desc: "Vous savez exactement combien d'appels et de demandes vos campagnes génèrent.",
    },
  ];
  return (
    <section className="py-20 sm:py-24">
      <div className="mx-auto max-w-7xl px-4 sm:px-6">
        <div className="grid items-center gap-12 lg:grid-cols-[1fr_1.1fr]">
          <div>
            <div className="flex items-center gap-3 text-brand-ink">
              <span className="rail-num text-sm font-bold">03</span>
              <span className="rail-line h-px w-10 shrink-0" aria-hidden="true" />
              <span className="rail-label text-muted-foreground">Google Ads</span>
            </div>
            <h2 className="display-section mt-4">
              Soyez visible <span className="accent-word text-brand-ink">immédiatement</span>
            </h2>
            <p className="measure mt-5 text-muted-foreground sm:text-lg">
              Le référencement naturel prend du temps. Google Ads vous place en tête des recherches
              dès aujourd'hui, et vous apporte des demandes pendant que votre visibilité naturelle
              se construit.
            </p>
            <a
              href={CALENDLY_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="mt-8 inline-flex items-center justify-center gap-2 rounded-xl bg-accent px-6 py-3.5 text-base font-semibold text-accent-foreground transition hover:brightness-110"
            >
              <Calendar className="h-5 w-5" />
              En discuter
            </a>
          </div>
          <div className="grid gap-4 sm:grid-cols-2">
            {points.map((p) => (
              <div
                key={p.title}
                className="rounded-2xl border border-border bg-card p-6 shadow-soft"
              >
                <div className="grid h-11 w-11 place-items-center rounded-xl bg-accent/12 text-accent">
                  <p.icon className="h-5 w-5" />
                </div>
                <h3 className="mt-4 font-bold">{p.title}</h3>
                <p className="mt-1.5 text-sm text-muted-foreground">{p.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

/* ---------------- AUTOMATION ---------------- */
function Automation() {
  const examples = [
    { icon: MessageSquare, t: "Répondre automatiquement aux demandes entrantes" },
    { icon: Filter, t: "Qualifier les prospects avant qu'ils vous contactent" },
    { icon: Bell, t: "Relancer les devis automatiquement" },
    { icon: Calendar, t: "Envoyer des rappels de rendez-vous" },
    { icon: Clock, t: "Gagner du temps sur les tâches répétitives" },
  ];
  return (
    /* Section en encre : le visuel généré est sombre, il ne tiendrait pas sur
       papier. Elle casse aussi la succession de grilles de cartes. */
    <section className="bg-ink py-20 text-white sm:py-28">
      <div className="mx-auto max-w-7xl px-4 sm:px-6">
        <SectionHeader
          index="04"
          eyebrow="Automatisation"
          tone="ink"
          title={
            <>
              Ce qui se répète, <span className="accent-word text-brand">on l'automatise</span>
            </>
          }
          subtitle="Les tâches répétitives se font toutes seules, vous restez sur votre métier."
        />

        <div className="mt-14 grid items-center gap-10 lg:grid-cols-[1fr_1.1fr] lg:gap-14">
          {/* Visuel abstrait, généré. Il n'illustre ni un chantier, ni un client,
              ni un local : c'est une forme, pas un témoignage. DESIGN.md §7. */}
          <div className="rise zoom-frame rounded-2xl border border-white/12">
            <img
              src={visuelAuto800}
              srcSet={`${visuelAuto800} 800w, ${visuelAuto1400} 1400w`}
              sizes="(min-width: 1024px) 40vw, 100vw"
              width={800}
              height={447}
              loading="lazy"
              decoding="async"
              alt=""
              aria-hidden="true"
              className="block h-auto w-full"
            />
          </div>

          <div className="stagger grid gap-3">
            {examples.map((e, i) => (
              <div
                key={e.t}
                data-reveal
                style={{ "--i": i } as React.CSSProperties}
                className="lift lift-ink flex items-center gap-3 rounded-xl border border-white/12 bg-white/[0.04] px-5 py-4"
              >
                <div className="grid h-10 w-10 shrink-0 place-items-center rounded-lg bg-brand/15 text-brand">
                  <e.icon className="h-5 w-5" />
                </div>
                <span className="font-medium">{e.t}</span>
              </div>
            ))}
          </div>
        </div>

        <p className="measure mt-10 text-sm text-white/55">
          Ces automatisations sont proposées en option, selon les besoins réels de votre entreprise.
          Rien d'imposé.
        </p>
      </div>
    </section>
  );
}

/* ---------------- PRICING ---------------- */
/**
 * Offres de la page d'accueil.
 *
 * Une offre peut proposer plusieurs canaux (`channels`) : la carte affiche alors
 * deux boutons et bascule prix, contenu et bouton d'action selon le canal choisi.
 * C'est le cas de Sitaly Acquisition (Google Ads / ChatGPT Ads).
 */
type PricingCta = { label: string; to?: string; href?: string };

interface PricingView {
  objective: string;
  inherits: string | null;
  features: readonly string[];
  note: string | null;
  cta: PricingCta;
}

interface PricingTier extends PricingView {
  name: string;
  badge: string;
  icon: React.ComponentType<{ className?: string }>;
  promise: string;
  featured: boolean;
  channels?: readonly (PricingView & { key: string; label: string })[];
}

const PRICING_TIERS: PricingTier[] = [
  {
    name: "Sitaly Présence",
    badge: "Le tout-en-un",
    icon: Globe,
    objective: "Votre présence en ligne gérée de A à Z, sans que vous touchiez à la technique.",
    inherits: null,
    features: [
      "Site internet professionnel",
      "Hébergement & maintenance",
      "Modifications*",
      "Fiche Google Business",
      "Référencement local",
    ],
    note: null,
    promise: "Une présence pro qui reste à jour, sans gérer la technique.",
    cta: { label: "Réserver un appel" },
    featured: true,
  },
  {
    name: "Sitaly Acquisition",
    badge: "Publicité en ligne",
    icon: Megaphone,
    promise: "Attirez de nouveaux clients, à votre rythme.",
    featured: false,
    // Valeurs par défaut = premier canal (Google Ads).
    objective: "Des demandes qualifiées par la publicité. Avec ou sans site.",
    inherits: "Indépendant de votre site",
    features: [
      "Création & gestion de vos campagnes",
      "Ciblage de votre zone d'intervention",
      "Suivi des conversions (appels, formulaires)",
      "Optimisation et reporting mensuel",
    ],
    note: "Budget publicitaire versé à Google, non inclus.",
    cta: { label: "Voir l'offre Google Ads", to: "/acquisition/" },
    channels: [
      {
        key: "google-ads",
        label: "Google Ads",
        objective: "Des demandes qualifiées par la publicité. Avec ou sans site.",
        inherits: "Indépendant de votre site",
        features: [
          "Création & gestion de vos campagnes",
          "Ciblage de votre zone d'intervention",
          "Suivi des conversions (appels, formulaires)",
          "Optimisation et reporting mensuel",
        ],
        note: "Budget publicitaire versé à Google, non inclus.",
        cta: { label: "Voir l'offre Google Ads", to: "/acquisition/" },
      },
      {
        key: "chatgpt-ads",
        label: "ChatGPT Ads",
        objective: "Apparaissez dans ChatGPT quand un futur client décrit son besoin.",
        inherits: "Canal récent, piloté par la mesure",
        features: [
          "Cartographie des intentions à couvrir",
          "Rédaction des messages & page de destination",
          "Tracking des conversions avant toute dépense",
          "Optimisation continue et reporting mensuel",
        ],
        note: "Budget publicitaire séparé, versé à la régie. Sitaly n'est ni partenaire ni certifiée OpenAI.",
        cta: { label: "Découvrir ChatGPT Ads", href: "/chatgpt-ads/" },
      },
    ],
  },
  {
    name: "Sitaly Agents IA",
    badge: "Automatisation",
    icon: Bot,
    objective:
      "Des agents IA qui répondent, qualifient et prennent vos rendez-vous. Installés clé en main.",
    inherits: "Se greffe sur n'importe quelle offre",
    features: [
      "Agent standardiste — ne rate plus un appel",
      "Prise de rendez-vous automatique",
      "Relance des devis en attente",
      "Réponse aux messages & réseaux",
    ],
    note: null,
    promise: "Vous ne configurez rien, on branche tout.",
    cta: { label: "Découvrir les agents", to: "/agents-ia/" },
    featured: false,
  },
];

function Pricing() {
  return (
    <section id="offre" className="py-20 sm:py-28">
      <div className="mx-auto max-w-7xl px-4 sm:px-6">
        <SectionHeader
          index="05"
          eyebrow="Nos offres"
          title={
            <>
              Trois leviers, <span className="accent-word">combinables</span>
            </>
          }
          subtitle="La présence en ligne, l'acquisition payante, les agents IA. Vous en prenez un, deux ou les trois. Chaque périmètre est chiffré après l'appel découverte, sur votre activité réelle."
        />

        <p className="mt-10 inline-flex rounded-full border border-border bg-paper-sunk px-5 py-3 text-sm font-semibold text-foreground/80">
          Sans engagement · Tout est géré, vous ne touchez à rien.
        </p>
        <div className="mt-10 flex max-w-6xl snap-x snap-mandatory items-stretch gap-5 overflow-x-auto pb-2 pt-6 [-ms-overflow-style:none] [scrollbar-width:none] sm:gap-6 lg:grid lg:grid-cols-3 lg:overflow-visible lg:pb-0 lg:pt-0 [&::-webkit-scrollbar]:hidden">
          {PRICING_TIERS.map((t) => (
            <div
              key={t.name}
              className="w-[85%] shrink-0 snap-center sm:w-[60%] lg:w-auto lg:shrink"
            >
              <PricingCard tier={t} featured={t.featured} />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

function PricingCard({ tier, featured }: { tier: PricingTier; featured: boolean }) {
  // Canal actif pour les offres à plusieurs canaux (Google Ads / ChatGPT Ads).
  const [channel, setChannel] = useState(0);
  const view: PricingView = tier.channels ? tier.channels[channel] : tier;
  const ctaClass = `mt-6 inline-flex w-full items-center justify-center gap-2 rounded-xl px-6 py-3.5 text-base font-semibold transition ${
    featured
      ? "bg-accent text-accent-foreground shadow-elevated hover:opacity-90"
      : "border border-border bg-secondary text-secondary-foreground hover:bg-muted"
  }`;

  return (
    <div
      className={`relative flex h-full flex-col rounded-3xl bg-card p-7 sm:p-8 ${
        featured ? "border-2 border-accent shadow-glow" : "border border-border shadow-soft"
      }`}
    >
      {featured && (
        <div className="absolute -top-4 left-1/2 -translate-x-1/2 rounded-full bg-accent px-4 py-1 text-xs font-bold uppercase tracking-wider text-accent-foreground shadow-elevated">
          Recommandé
        </div>
      )}

      {/* Sélecteur de canal, posé sur le bord haut comme le badge « Recommandé ». */}
      {tier.channels && (
        <div
          role="tablist"
          aria-label="Choisir le canal publicitaire"
          className="absolute -top-4 left-1/2 flex -translate-x-1/2 gap-1 rounded-full bg-accent p-1 shadow-elevated"
        >
          {tier.channels.map((c, i) => (
            <button
              key={c.key}
              type="button"
              role="tab"
              aria-selected={i === channel}
              onClick={() => setChannel(i)}
              className={`whitespace-nowrap rounded-full px-3.5 py-1 text-xs font-bold uppercase tracking-wider transition ${
                i === channel
                  ? "bg-card text-accent shadow-soft"
                  : "text-accent-foreground/80 hover:text-accent-foreground"
              }`}
            >
              {c.label}
            </button>
          ))}
        </div>
      )}

      <div className="flex items-center justify-between">
        <div
          className={`grid h-11 w-11 place-items-center rounded-xl ${
            featured ? "bg-accent/15 text-accent" : "bg-secondary text-foreground/70"
          }`}
        >
          <tier.icon className="h-5 w-5" />
        </div>
        <span
          className={`rounded-full px-3 py-1 text-xs font-semibold ${
            featured ? "bg-accent/10 text-accent" : "bg-secondary text-muted-foreground"
          }`}
        >
          {tier.badge}
        </span>
      </div>

      <h3 className="mt-5 text-xl font-bold">{tier.name}</h3>

      <p className="mt-2 text-sm text-muted-foreground">{view.objective}</p>

      <div className="mt-7 space-y-3">
        {view.inherits && (
          <div className="flex items-center gap-2 text-sm font-semibold text-accent">
            <Check className="h-5 w-5 shrink-0" />
            {view.inherits}
          </div>
        )}
        <ul className="space-y-3">
          {view.features.map((f) => (
            <li key={f} className="flex items-start gap-3 text-[15px]">
              <Check
                className={`mt-0.5 h-5 w-5 shrink-0 ${featured ? "text-accent" : "text-success"}`}
              />
              <span>
                {f.endsWith("*") ? (
                  <>
                    {f.slice(0, -1)}
                    <a
                      href="#faq-modifications"
                      aria-label="Voir le détail des modifications incluses"
                      className="font-semibold text-accent hover:underline"
                    >
                      *
                    </a>
                  </>
                ) : (
                  f
                )}
              </span>
            </li>
          ))}
        </ul>
        {view.note && (
          <p className="flex items-start gap-1.5 pt-1 text-xs text-muted-foreground">
            <span aria-hidden="true">*</span>
            {view.note}
          </p>
        )}
      </div>

      <p className="mt-6 border-t border-border pt-5 text-sm font-medium text-foreground/80">
        {tier.promise}
      </p>

      {view.cta.to ? (
        <Link to={view.cta.to} className={ctaClass}>
          {view.cta.label}
          <ArrowRight className="h-5 w-5" />
        </Link>
      ) : view.cta.href ? (
        /* Page statique hors routeur React : lien classique, pas de <Link>. */
        <a href={view.cta.href} className={ctaClass}>
          {view.cta.label}
          <ArrowRight className="h-5 w-5" />
        </a>
      ) : (
        <a href={CALENDLY_URL} target="_blank" rel="noopener noreferrer" className={ctaClass}>
          <Calendar className="h-5 w-5" />
          {view.cta.label}
        </a>
      )}
    </div>
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

/* ---------------- EXAMPLES ---------------- */
function Examples() {
  type Item = {
    embedUrl: string;
    tag: string;
    title: string;
    desc: string;
  };

  const items: Item[] = [
    {
      embedUrl: "https://www.aymericpataud.fr/",
      tag: "Chef à domicile",
      title: "Aymeric Pataud — Chef expert du goût",
      desc: "Site vitrine premium réalisé pour un chef à domicile. Cliquez sur l'aperçu pour ouvrir le site.",
    },
    {
      embedUrl: "https://lafleur-toiture.fr/",
      tag: "Couvreur",
      title: "Lafleur Toiture — Essonne",
      desc: "Site vitrine réalisé pour un couvreur de l'Essonne. Cliquez sur l'aperçu pour ouvrir le site.",
    },
    {
      embedUrl: "https://entreprise-felicioni.com/",
      tag: "Rénovation",
      title: "Entreprise Felicioni — Haute-Garonne",
      desc: "Site vitrine avec comparateur avant/après pour une entreprise de rénovation. Cliquez sur l'aperçu pour ouvrir le site.",
    },
  ];

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
          subtitle="Cliquez sur un aperçu pour ouvrir le site du client. Ce sont de vraies mises en ligne, pas des maquettes."
        />

        <div className="mt-16 grid gap-8 sm:mt-20 md:grid-cols-2">
          {items.map((it) => (
            <a
              key={it.title}
              href={it.embedUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="group flex flex-col overflow-hidden rounded-2xl border border-border bg-card shadow-elevated transition duration-300 hover:-translate-y-2 hover:shadow-xl focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent"
            >
              {/* Media preview — non-interactive, the whole card opens the real site */}
              <div className="border-b border-border bg-secondary">
                <EmbedPreview url={it.embedUrl} title={it.title} />
              </div>

              {/* Caption */}
              <div className="flex flex-1 flex-col p-6">
                <span className="inline-block w-fit rounded-full bg-accent/10 px-2.5 py-1 text-[10px] font-semibold uppercase tracking-widest text-accent sm:text-xs">
                  {it.tag}
                </span>
                <h3 className="mt-2 text-lg font-bold text-foreground sm:text-xl">{it.title}</h3>
                <p className="mt-1 text-sm leading-relaxed text-muted-foreground">{it.desc}</p>
                <span className="mt-4 inline-flex items-center gap-1.5 text-sm font-semibold text-accent transition-all group-hover:gap-2.5">
                  Ouvrir le site
                  <ArrowRight className="h-4 w-4" />
                </span>
              </div>
            </a>
          ))}
        </div>
      </div>
    </section>
  );
}

/* Non-interactive, scaled-down live preview of an external site (16:9, top-cropped) */
function EmbedPreview({ url, title }: { url: string; title: string }) {
  const wrapRef = useRef<HTMLDivElement>(null);
  const [scale, setScale] = useState(0.5);
  const DESIGN_W = 1440;

  useEffect(() => {
    const el = wrapRef.current;
    if (!el) return;
    const update = () => setScale(el.clientWidth / DESIGN_W);
    update();
    const ro = new ResizeObserver(update);
    ro.observe(el);
    return () => ro.disconnect();
  }, []);

  return (
    <div ref={wrapRef} className="relative aspect-[16/9] w-full overflow-hidden bg-white">
      <iframe
        src={url}
        title={`Aperçu du site ${title}`}
        loading="lazy"
        tabIndex={-1}
        aria-hidden="true"
        scrolling="no"
        sandbox="allow-scripts allow-same-origin allow-popups allow-forms"
        referrerPolicy="no-referrer-when-downgrade"
        className="pointer-events-none absolute left-0 top-0 border-0 bg-white"
        style={{
          width: DESIGN_W,
          height: 1024,
          transform: `scale(${scale})`,
          transformOrigin: "top left",
        }}
      />
      {/* Transparent overlay: captures all pointer events, the parent <a> handles the click */}
      <span aria-hidden className="absolute inset-0 z-10" />
    </div>
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
    <section id="process" className="bg-ink py-20 text-white sm:py-28">
      <div className="mx-auto max-w-7xl px-4 sm:px-6">
        <SectionHeader
          index="08"
          eyebrow="Process"
          tone="ink"
          title={
            <>
              Cinq étapes, <span className="accent-word text-brand">et c'est en ligne</span>
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
              className="lift lift-ink relative rounded-2xl border border-white/12 bg-white/[0.04] p-6"
            >
              <div className="rail-num font-display text-3xl font-extrabold text-brand">{s.n}</div>
              <div className="mt-3 font-bold">{s.t}</div>
              <div className="mt-1.5 text-sm text-white/65">{s.d}</div>
            </li>
          ))}
        </ol>
      </div>
    </section>
  );
}

/* ---------------- CLIENTS ---------------- */
function Clients() {
  const clients = [
    {
      name: "Aymeric Pataud",
      role: "Chef à domicile",
      place: "Île-de-France",
      detail: "Site vitrine premium, en ligne sur aymericpataud.fr.",
      url: "https://www.aymericpataud.fr/",
      icon: Sparkles,
    },
    {
      name: "Brian Lafleur",
      role: "Couvreur",
      place: "Essonne (91)",
      detail: "Site vitrine + référencement local, en ligne sur lafleur-toiture.fr.",
      url: "https://lafleur-toiture.fr/",
      icon: Shield,
    },
    {
      name: "Entreprise Felicioni",
      role: "Rénovation",
      place: "Tournefeuille (31)",
      detail: "Site vitrine avec comparateur avant/après, en ligne sur entreprise-felicioni.com.",
      url: "https://entreprise-felicioni.com/",
      icon: Hammer,
    },
  ];

  return (
    <section className="py-20 sm:py-24">
      <div className="mx-auto max-w-7xl px-4 sm:px-6">
        <SectionHeader
          index="09"
          eyebrow="Clients"
          title={
            <>
              Ils ont confié leur présence en ligne <span className="accent-word">à Sitaly</span>
            </>
          }
          subtitle="Des sites en ligne, vérifiables. Cliquez pour les visiter."
        />
        <div className="mt-12 grid gap-6 md:grid-cols-2 lg:grid-cols-4">
          {clients.map((c) => (
            <a
              key={c.name}
              href={c.url}
              target="_blank"
              rel="noopener noreferrer"
              className="group flex flex-col rounded-2xl border border-border bg-card p-7 shadow-soft transition hover:-translate-y-1 hover:shadow-elevated"
            >
              <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-accent/10 text-accent">
                <c.icon className="h-5 w-5" />
              </div>
              <div className="mt-5 text-lg font-bold">{c.name}</div>
              <div className="text-sm text-muted-foreground">
                {c.role} — {c.place}
              </div>
              <p className="mt-3 flex-1 text-[15px] leading-relaxed text-foreground/90">
                {c.detail}
              </p>
              <span className="mt-5 inline-flex items-center gap-1.5 text-sm font-semibold text-accent transition-all group-hover:gap-2.5">
                Voir le site
                <ArrowRight className="h-4 w-4" />
              </span>
            </a>
          ))}

          <a
            href={CALENDLY_URL}
            target="_blank"
            rel="noopener noreferrer"
            className="group flex flex-col justify-center rounded-2xl border border-dashed border-accent/40 bg-accent/[0.04] p-7 text-center transition hover:border-accent hover:bg-accent/[0.07]"
          >
            <div className="mx-auto flex h-11 w-11 items-center justify-center rounded-xl bg-accent/10 text-accent">
              <Calendar className="h-5 w-5" />
            </div>
            <div className="mt-5 text-lg font-bold">Votre entreprise ici</div>
            <p className="mt-2 text-[15px] leading-relaxed text-muted-foreground">
              Site livré en 48h, sans engagement. On en parle 20 minutes ?
            </p>
            <span className="mt-5 inline-flex items-center justify-center gap-1.5 text-sm font-semibold text-accent transition-all group-hover:gap-2.5">
              Réserver un appel
              <ArrowRight className="h-4 w-4" />
            </span>
          </a>
        </div>
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
              <span aria-hidden="true" className="accent-word text-5xl leading-none text-brand">
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
    <section className="bg-ink py-20 text-white sm:py-28">
      <div className="mx-auto max-w-7xl px-4 sm:px-6">
        <div className="grid items-center gap-12 lg:grid-cols-[auto_1fr] lg:gap-16">
          <div className="rise mx-auto w-full max-w-[260px] lg:mx-0">
            <div className="zoom-frame relative rounded-2xl border border-white/12">
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
            <div className="rail-label text-brand">Qui est derrière</div>
            <h2 className="display-section mt-3">
              Un seul interlocuteur,{" "}
              <span className="accent-word text-brand">celui qui construit votre site</span>
            </h2>
            <div className="measure mt-6 space-y-4 text-lg text-white/70">
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
                <div className="text-sm text-white/55">Fondateur de Sitaly</div>
              </div>
              <a
                href={`tel:${SITALY_PHONE}`}
                className="inline-flex items-center gap-2 rounded-xl border border-white/20 px-5 py-3 text-sm font-semibold transition hover:bg-white/10"
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
    <section id="contact" className="on-ink relative overflow-hidden py-20 sm:py-28">
      <div className="absolute inset-0 -z-10 hero-bg" />
      <div className="mx-auto grid max-w-7xl gap-12 px-4 sm:px-6 lg:grid-cols-2 lg:items-center">
        <div>
          <div className="rail-label text-brand">Contact</div>
          <h2 className="display-section mt-3">
            Discutons de <span className="accent-word text-brand">votre projet</span>
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
