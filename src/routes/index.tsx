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
import { RealisationsCarousel } from "@/components/RealisationsCarousel";
import { HeroChamp } from "@/components/HeroChamp";
import { MetiersDefilement } from "@/components/MetiersDefilement";
import { FondateurCard } from "@/components/FondateurCard";
import { ZoomIntro } from "@/components/ZoomIntro";
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
      { title: "Site internet, publicité et automatisation pour TPE et PME | Sitaly" },
      {
        name: "description",
        content:
          "Sitaly installe et pilote votre présence en ligne : site internet, Google Ads, ChatGPT Ads et agents IA. Pour indépendants, TPE et PME. Un seul interlocuteur, sans engagement.",
      },
      {
        property: "og:title",
        content: "Site internet, publicité et automatisation pour TPE et PME | Sitaly",
      },
      {
        property: "og:description",
        content:
          "Sitaly installe et pilote votre présence en ligne : site internet, Google Ads, ChatGPT Ads et agents IA. Pour indépendants, TPE et PME. Un seul interlocuteur, sans engagement.",
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
      <Ouverture />
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
            Parler de votre projet
          </a>
          <MobileMenu onHome />
        </div>
      </div>
    </header>
  );
}

/* ---------------- HERO ---------------- */
/**
 * Ouverture de la page : le nom perce l'écran et révèle les trois promesses.
 *
 * Le mot SITALY n'est plus écrit dans le titre, il est découpé dans le voile
 * par ZoomIntro. Le texte de tête l'encadre donc sans le répéter.
 */
function Ouverture() {
  return (
    <ZoomIntro
      nom="Sitaly"
      avant={
        /* Calage déterministe du mot. La colonne occupe toute la hauteur, et
           les deux moitiés portent `flex-1` : la fente centrale tombe donc
           exactement sur l'axe vertical de la fenêtre, là où le masque dessine
           le nom. Des réserves à valeurs fixes se désaccordaient dès qu'une
           ligne de texte changeait de longueur.
           Sans hauteur imposée (mode repli), la colonne s'empile simplement. */
        <>
          <HeroChamp />
          <div className="relative flex h-full flex-col items-center px-4 text-center sm:px-6">
            {/* Hauteur fixe : la fente du mot doit tomber à --mot-haut de la
              tête de section, la même valeur que celle qui positionne le mot
              dans le voile. Une colonne centrée ne le garantissait pas. */}
            <div className="flex h-[var(--mot-haut,34vh)] items-end pb-10">
              <p className="font-display text-[clamp(1.05rem,2vw,1.6rem)] font-extrabold tracking-[0.08em] text-muted-foreground">
                Pour les indépendants, les TPE et les PME
              </p>
            </div>

            {/* La fente du nom. La doublure ne s'affiche que si l'effet ne tourne
              pas, sans quoi SITALY disparaîtrait de la page. */}
            <div className="flex h-[var(--mot-fente,14vw)] shrink-0 items-center justify-center">
              <p className="zoom-word-fallback font-display text-[max(2.6rem,8.4vw)] font-extrabold leading-none tracking-[-0.02em]">
                Sitaly
              </p>
            </div>

            {/* Marge basse plus généreuse que la haute : la hampe du « y » descend
              sous la fente, la ligne suivante doit lui laisser le passage. */}
            <div className="flex flex-col items-center pt-8">
              {/* text-wrap: balance évite le mot orphelin sur la seconde ligne
                quand la phrase ne tient pas d'un seul tenant. */}
              <p className="max-w-5xl text-balance font-display text-[clamp(1.4rem,3.1vw,2.6rem)] font-extrabold leading-[1.08]">
                <span className="accent-word">installe et pilote</span>{" "}
                <span className="tracking-[0.02em]">votre présence en ligne</span>
              </p>

              {/* La phrase qui porte le positionnement : ce qui est fait, et par
                qui. « Une seule personne » remplace le mot agence, qui
                promettait une équipe que Sitaly n'a pas. */}
              <p className="measure mt-4 text-lg text-muted-foreground">
                Le site internet, la publicité en ligne et les automatisations. Une seule personne
                au bout du fil, celle qui construit.
              </p>

              <div className="mt-5 flex items-center gap-3 text-muted-foreground">
                <svg
                  viewBox="0 0 88 46"
                  aria-hidden="true"
                  className="h-8 w-16 shrink-0 -scale-x-100 text-brand-ink/45"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                >
                  <path d="M84 42C68 16 44 4 6 6" />
                  <path d="M6 6l17 8M6 6l11 13" />
                </svg>
                <span className="accent-word -rotate-2 text-xl">et vous gardez la main</span>
              </div>

              <a
                href={CALENDLY_URL}
                target="_blank"
                rel="noopener noreferrer"
                className="mt-7 inline-flex items-center justify-center gap-2 rounded-xl bg-accent px-7 py-4 text-base font-semibold text-accent-foreground shadow-glow transition hover:brightness-110"
              >
                <Calendar className="h-5 w-5" />
                Parler de votre projet
              </a>

              {/* Trois repères sous le bouton. Le premier écran ne portait qu'un
                titre et un bouton : de quoi paraître vide, et rien pour lever
                les objections de départ. */}
              <ul className="mt-6 flex flex-wrap items-center justify-center gap-x-7 gap-y-2 text-sm text-muted-foreground">
                {["Mise en ligne en 48h", "Réponse sous 24h", "Sans engagement de durée"].map(
                  (t) => (
                    <li key={t} className="flex items-center gap-2">
                      <Check className="h-4 w-4 shrink-0 text-signal-ink" />
                      {t}
                    </li>
                  ),
                )}
              </ul>
            </div>

            {/* Repère de défilement, sorti du flux : dans la colonne, il ajoutait
              une hauteur que le bas de l'écran collé n'avait pas et poussait le
              reste hors cadre. */}
            <div
              aria-hidden="true"
              className="zoom-cue absolute inset-x-0 bottom-6 flex flex-col items-center gap-2 text-muted-foreground/70"
            >
              <span className="rail-label">Faites défiler</span>
              <ChevronDown className="h-5 w-5 animate-bounce" />
            </div>
          </div>
        </>
      }
    >
      <CeQuOnFait />
    </ZoomIntro>
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
  /* Ce que le mot laisse voir, ce sont les prestations réelles, pas des
     formules : le visiteur regarde à l'intérieur de Sitaly et y trouve
     l'offre. Chaque ligne mène à sa page, ce qui sert aussi le maillage. */
  /* Les deux régies tiennent sur une ligne : ce sont deux canaux d'une même
     prestation, les séparer laissait croire à deux offres distinctes.
     Les classes de survol sont écrites en entier, Tailwind ne compile pas un
     nom de classe assemblé à l'exécution. */
  const prestations = [
    {
      texte: "création de site internet",
      to: "/realisations/",
      coche: "text-blue-on-ink",
      survol: "group-hover:text-blue-on-ink",
    },
    {
      texte: "campagnes Google & ChatGPT Ads",
      to: "/acquisition/",
      coche: "text-pink-on-ink",
      survol: "group-hover:text-pink-on-ink",
    },
    {
      texte: "agents IA & automatisations",
      to: "/agents-ia/",
      coche: "text-red-on-ink",
      survol: "group-hover:text-red-on-ink",
    },
  ];

  return (
    /* Panneau noir. Le mot du hero étant un trou dans le voile, c'est ce fond
       qui le colore : il apparaît noir sans qu'on ait à le peindre. */
    <section className="flex min-h-full w-full items-center bg-ink py-24 text-white sm:py-32">
      <div className="zoom-behind-content mx-auto max-w-6xl px-4 text-center sm:px-6">
        <p data-reveal className="rail-label text-white/70">
          Ce que fait Sitaly
        </p>

        <p data-reveal className="measure mx-auto mt-6 text-lg text-white/80 sm:text-xl">
          Avec Sitaly, votre présence en ligne devient un vrai levier, sur votre visibilité, sur les
          demandes que vous recevez comme sur votre organisation quotidienne.
        </p>

        <ul className="stagger mt-16 space-y-1 sm:space-y-0">
          {prestations.map((p, i) => {
            const contenu = (
              <>
                {/* Le chevron suit la même échelle que le mot. En `em` il le
                    ferait aussi, la taille vivant désormais sur le `li`, mais
                    la clamp explicite garde la lecture du code directe. */}
                <svg
                  viewBox="0 0 24 24"
                  aria-hidden="true"
                  className={`h-[clamp(1.2rem,3.4vw,2.6rem)] w-[clamp(1.2rem,3.4vw,2.6rem)] shrink-0 transition-transform group-hover:translate-x-1 ${p.coche}`}
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="4"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <path d="M8 4l8 8-8 8" />
                </svg>
                <span
                  className={`font-display font-extrabold leading-none tracking-[-0.02em] text-white transition-colors ${p.survol}`}
                >
                  {p.texte}
                </span>
              </>
            );
            const classe =
              "wipe group flex items-center justify-center gap-4 pt-[0.06em] pb-[0.3em] text-[clamp(1.5rem,4.6vw,3.6rem)] transition-opacity hover:opacity-100 sm:gap-6";
            return (
              <li
                key={p.texte}
                data-reveal
                style={{ "--i": i, "--stagger-step": "220ms" } as React.CSSProperties}
                className={classe}
              >
                <Link to={p.to} className="flex items-center gap-4 sm:gap-6">
                  {contenu}
                </Link>
              </li>
            );
          })}
        </ul>

        <div data-reveal className="mt-16">
          <a
            href="#offre"
            className="group inline-flex items-baseline gap-3 font-display text-[clamp(1.6rem,4vw,3rem)] font-extrabold tracking-tight text-white"
          >
            découvrir
            <span className="accent-word text-[0.62em] font-normal text-white/75">nos offres</span>
            <ArrowRight className="h-[0.7em] w-[0.7em] self-center transition-transform group-hover:translate-x-2" />
          </a>
        </div>
      </div>
    </section>
  );
}

/* ---------------- PROFESSIONS MARQUEE ---------------- */
function ProfessionsMarquee() {
  return (
    <section className="border-t border-border bg-paper-sunk pt-10 sm:pt-12">
      <div className="mx-auto max-w-3xl px-4 text-center sm:px-6">
        <div className="rail-label text-brand-ink">Pour qui</div>
        <h2 className="mt-3 font-display text-2xl font-extrabold tracking-tight sm:text-3xl">
          Le même travail de fond, <Surligne>quel que soit votre métier</Surligne>
        </h2>
      </div>
      <MetiersDefilement className="mt-8 sm:mt-10" />
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

        <RealisationsCarousel className="mt-16" />

        <div className="mt-14 flex justify-center">
          <Link
            to="/realisations/"
            className="inline-flex items-center gap-2 rounded-xl bg-accent px-6 py-3.5 font-semibold text-accent-foreground transition hover:brightness-110"
          >
            Toutes les réalisations
            <ArrowRight className="h-5 w-5" />
          </Link>
        </div>
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
        <SectionHeader
          eyebrow="L'interlocuteur"
          title={
            <>
              Un seul interlocuteur,{" "}
              <span className="accent-word text-brand-ink">celui qui construit votre site</span>
            </>
          }
        />
        <FondateurCard className="mt-16" />
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
              La présence en ligne des indépendants, TPE et PME : site internet, Google Ads, ChatGPT
              Ads et automatisation.
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
