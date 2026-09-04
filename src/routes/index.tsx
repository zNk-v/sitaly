import { createFileRoute, Link } from "@tanstack/react-router";
import { useState, useEffect, useRef } from "react";
import { Phone, Calendar, Check, ArrowRight, Clock, ChevronDown } from "lucide-react";
import { SectionHeader } from "@/components/SectionHeader";
import { StackedOffers } from "@/components/StackedOffers";
import { RealisationsCarousel } from "@/components/RealisationsCarousel";
import { HeroChamp } from "@/components/HeroChamp";
import { SiteHeader } from "@/components/SiteHeader";
import { SiteFooter } from "@/components/SiteFooter";
import { FondateurCard } from "@/components/FondateurCard";
import { ZoomIntro } from "@/components/ZoomIntro";
import { MetiersDefilement } from "@/components/MetiersDefilement";
import { FAMILLES, entreesFamille } from "@/data/expertises";
import { useRevealOnScroll } from "@/hooks/use-reveal-on-scroll";
import { useSplitWords } from "@/hooks/use-split-words";
import { CALENDLY_URL, SITALY_PHONE, SITALY_PHONE_DISPLAY } from "@/lib/config";

/* Cinq questions, pas sept. Celles qui portaient sur Google Ads et sur
   l'automatisation ont désormais leur page, où elles sont posées par des
   visiteurs qui cherchent précisément ça. */
const FAQ_ITEMS = [
  {
    q: "Comment se construit le budget ?",
    a: "En abonnement mensuel, sans engagement de durée et sans frais d'installation. Le montant dépend du périmètre retenu et vous est donné par écrit à l'issue de l'appel découverte, avant tout engagement. Le budget publicitaire, lui, est versé directement aux régies et reste séparé.",
  },
  {
    q: "Combien de temps pour le mettre en ligne ?",
    a: "48 heures après l'appel découverte et la fourniture des contenus. Les projets plus lourds, boutique en ligne ou logiciel, suivent leur propre calendrier, annoncé avant de commencer.",
  },
  {
    q: "Que comprennent vraiment les modifications incluses ?",
    a: "Les petites modifications de contenu existant : un texte, une photo, un prix, des horaires, vos coordonnées. Ce qui demande de la création, nouvelle page ou nouveau visuel, fait l'objet d'un devis annoncé à l'avance.",
  },
  {
    q: "Puis-je arrêter mon abonnement ?",
    a: "Oui, à tout moment avec un simple préavis, sans frais ni durée minimale. Le nom de domaine est déposé à votre nom et part avec vous.",
  },
  {
    q: "Puis-je acheter mon site ?",
    a: "L'abonnement est ce qui permet de tout prendre en charge, technique, hébergement et mises à jour, sans engagement. Un rachat reste possible sur demande.",
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
      <SiteHeader accueil />
      <Ouverture />
      <Expertises />
      <BandeMetiers />
      <StackedOffers />
      <Realisations />
      <Process />
      <Founder />
      <Temoignages />
      <Faq />
      <Contact />
      <SiteFooter />
    </div>
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
            {/* Réserve vide, et c'est son seul rôle : elle cale la fente du mot
                à --mot-haut de la tête de section, exactement là où le masque
                du voile dessine le nom. */}
            <div className="h-[var(--mot-haut,34vh)] shrink-0" />

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
              {/* Le titre occupe la largeur de la page. `data-split` le découpe
                  en mots, que le script révèle l'un après l'autre : le balisage
                  inline survit au découpage, les mots colorés gardent donc leur
                  couleur et entrent dans la cascade comme les autres.
                  Trois touches seulement, une par famille de la triade, et sur
                  les trois mots qui portent le sens de la phrase. */}
              <h1
                data-split
                className="stagger w-full text-balance font-display text-[clamp(1.35rem,3.5vw,3.3rem)] font-extrabold leading-[1.04] tracking-[-0.03em]"
                style={{ "--stagger-step": "70ms" } as React.CSSProperties}
              >
                <span className="text-blue-ink">installe</span> et{" "}
                <span className="text-violet-ink">pilote</span> votre{" "}
                <span className="text-red-ink">présence</span> en ligne
              </h1>

              {/* La phrase qui porte le positionnement : ce qui est fait, et par
                qui. « Une seule personne » remplace le mot agence, qui
                promettait une équipe que Sitaly n'a pas. */}
              <p className="measure mt-6 text-lg text-muted-foreground">
                Le site internet, la publicité en ligne et les automatisations. Une seule personne
                au bout du fil, celle qui construit.
              </p>

              <a
                href={CALENDLY_URL}
                target="_blank"
                rel="noopener noreferrer"
                className="bouton mt-7 px-8 py-4 text-base"
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
              className="zoom-cue absolute inset-x-0 bottom-6 flex flex-col items-center gap-2 text-muted-foreground"
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
      to: "/creation-site-internet/",
      coche: "text-blue-on-ink",
      survol: "group-hover:text-blue-on-ink",
    },
    {
      texte: "campagnes Google & ChatGPT Ads",
      to: "/acquisition/",
      coche: "text-violet-on-ink",
      survol: "group-hover:text-violet-on-ink",
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

/* ---------------- EXPERTISES ---------------- */
/**
 * Les trois familles, et le chemin vers leurs pages.
 *
 * Cette section remplace « Notre méthode », qui énumérait attirer, convertir
 * et automatiser sans que rien ne soit cliquable : le visiteur intéressé par
 * un point précis n'avait nulle part où aller. Les trois familles disent la
 * même séquence et mènent chacune à des pages qui la détaillent.
 */
function Expertises() {
  return (
    <section id="expertises" className="pt-20 pb-14 sm:pt-28 sm:pb-16">
      <div className="mx-auto max-w-7xl px-4 sm:px-6">
        <SectionHeader
          index="01"
          eyebrow="Expertises"
          title={
            <>
              Trois familles, <span className="accent-word">une seule adresse</span>
            </>
          }
          subtitle="Le site, ce qui l'amène des visiteurs, et ce qui traite les demandes une fois qu'elles arrivent."
        />

        <div className="stagger mt-14 grid gap-x-10 gap-y-12 border-t border-border pt-12 md:grid-cols-3">
          {FAMILLES.map((f, i) => (
            <div
              key={f.id}
              data-reveal
              style={{ "--i": i } as React.CSSProperties}
              className="md:border-l md:border-border md:pl-8 md:first:border-l-0 md:first:pl-0"
            >
              <f.icone className="h-6 w-6 text-brand-ink" />
              <h3 className="mt-4 font-display text-2xl font-extrabold tracking-tight">
                {f.titre}
              </h3>
              <p className="mt-2 leading-relaxed text-muted-foreground">{f.resume}</p>
              <ul className="mt-6 space-y-1">
                {entreesFamille(f.id).map((e) => (
                  <li key={e.label}>
                    {e.to ? (
                      <Link
                        to={e.to}
                        className="group flex items-center gap-2 py-1.5 text-[15px] font-medium transition-colors hover:text-brand-ink"
                      >
                        <ArrowRight className="h-3.5 w-3.5 shrink-0 text-brand-ink transition-transform group-hover:translate-x-0.5" />
                        {e.label}
                      </Link>
                    ) : (
                      <a
                        href={e.href}
                        className="group flex items-center gap-2 py-1.5 text-[15px] font-medium transition-colors hover:text-brand-ink"
                      >
                        <ArrowRight className="h-3.5 w-3.5 shrink-0 text-brand-ink transition-transform group-hover:translate-x-0.5" />
                        {e.label}
                      </a>
                    )}
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

/* ---------------- BANDE DES MÉTIERS ---------------- */
/**
 * La charnière entre les expertises et les offres.
 *
 * Elle avait été retirée faute d'endroit : posée entre deux blocs verticaux,
 * une bande horizontale les sépare mieux qu'une marge, et elle occupe une
 * transition qui était vide. Elle dit à qui Sitaly s'adresse sans y consacrer
 * une section entière, ce qui était le défaut de la version précédente.
 *
 * Les filets du haut et du bas la font lire comme une règle typographique et
 * non comme une section de plus.
 */
function BandeMetiers() {
  return (
    <section aria-label="Métiers accompagnés" className="border-y border-border bg-paper-sunk">
      <p className="sr-only">
        Sitaly accompagne notamment les métiers suivants dans leur présence en ligne.
      </p>
      <MetiersDefilement className="py-6 sm:py-7" />
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
          index="03"
          eyebrow="Réalisations"
          title={<>Des sites réellement en ligne</>}
          subtitle="Trois métiers, trois logiques. Chaque projet a sa page, et chaque site est en ligne."
        />

        <RealisationsCarousel className="mt-16" />

        <div className="mt-14 flex justify-center">
          <Link to="/realisations/" className="bouton px-7 py-3.5">
            Toutes les réalisations
            <ArrowRight className="bouton-fleche h-5 w-5" />
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
          index="04"
          eyebrow="Process"
          title={
            <>
              Cinq étapes, <span className="accent-word">et c'est en ligne</span>
            </>
          }
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
          index="05"
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
              <button type="submit" className="bouton mt-5 w-full px-6 py-3.5">
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
        {label} {required && <span className="text-red-ink">*</span>}
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

/* ---------------- SHARED ---------------- */
