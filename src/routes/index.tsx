import { createFileRoute, Link } from "@tanstack/react-router";
import { useState, useRef } from "react";
import { Phone, Calendar, Check, ArrowRight, Clock, ChevronDown } from "lucide-react";
import { SectionHeader } from "@/components/SectionHeader";
import { StackedOffers } from "@/components/StackedOffers";
import { RealisationsCarousel } from "@/components/RealisationsCarousel";
import { ChampChevrons, HeroChamp } from "@/components/HeroChamp";
import { SiteHeader } from "@/components/SiteHeader";
import { SiteFooter } from "@/components/SiteFooter";
import { FondateurCard } from "@/components/FondateurCard";
import { ZoomIntro } from "@/components/ZoomIntro";
import { useProgressionAuDefilement } from "@/hooks/use-progression-defilement";
import { SECTEURS, cheminSecteur, euros } from "@/data/secteurs";
import { BlogCard } from "@/components/BlogCard";
import { TexteAvecLiens } from "@/components/TexteAvecLiens";
import { COULEURS_FAMILLE, FAMILLES, entreesFamille } from "@/data/expertises";
import { postsALaUne } from "@/data/blog-posts";
import { useRevealOnScroll } from "@/hooks/use-reveal-on-scroll";
import { useSplitWords } from "@/hooks/use-split-words";
import {
  CALENDLY_URL,
  FORM_ENDPOINT,
  PRIX_AGENTS_IA,
  SITALY_PHONE,
  SITALY_PHONE_DISPLAY,
} from "@/lib/config";
import { envoyerDemande } from "@/lib/formulaire";
import { texteBrut } from "@/lib/liens-texte";

/* Les questions de l'accueil portent sur les agents IA depuis le 28 septembre
   2026 : les cinq précédentes vendaient un abonnement site, et l'accueil se
   classait sur des recherches web locales. Les questions sur les sites ont
   leur page (/creation-site-internet/). Le JSON-LD reprend ce texte mot pour
   mot, liens retirés. */
const FAQ_ITEMS = [
  {
    q: "Qu'est-ce qu'un agent IA peut faire pour ma PME ?",
    a: "Décrocher le téléphone, qualifier une demande selon vos règles, proposer un créneau dans votre agenda, envoyer un SMS après un appel manqué, relancer un devis, répondre aux messages Instagram et gérer vos avis Google. Il met à jour vos outils et passe la main à un humain dès que la situation le demande.",
  },
  {
    q: "L'agent dit-il qu'il est une IA ?",
    a: "Oui, dès la première phrase. C'est une obligation de l'article 50 du règlement européen sur l'IA, applicable depuis le 2 août 2026.",
  },
  {
    q: "Comment se construit le budget ?",
    a: `Une mise en place, puis un pilotage mensuel, chiffrés par écrit après un diagnostic offert de 30 minutes.${
      PRIX_AGENTS_IA.afficher
        ? ` La mise en place démarre à ${euros(PRIX_AGENTS_IA.miseEnPlaceMin)}, le pilotage à ${euros(PRIX_AGENTS_IA.mensuelMin)} par mois.`
        : ""
    }`,
  },
  {
    q: "Que se passe-t-il quand l'agent ne sait pas répondre ?",
    a: "Il passe la main : la demande est transmise à la bonne personne de votre équipe, selon les règles fixées ensemble pendant la mise en place.",
  },
  {
    q: "Qui s'occupe de mon projet ?",
    a: "Teddy Vidal, fondateur de Sitaly, conçoit, installe et pilote lui-même chaque agent. Vous avez un seul interlocuteur, du diagnostic au suivi mensuel.",
  },
  {
    q: "Vous faites aussi les sites et la publicité ?",
    a: "Oui. Sitaly pilote les campagnes [ChatGPT Ads](/chatgpt-ads/) et [Google Ads](/acquisition/), et [crée les sites](/creation-site-internet/), pour que les demandes arrivent, soient bien reçues, puis traitées par vos agents.",
  },
];

/* Recentrage du 26 septembre 2026 (audit SEO/GEO) : l'accueil se positionne
   sur les agents IA pour les PME. Le site et la publicité restent présentés,
   en complément. */
const TITRE_ACCUEIL = "Agence IA pour PME : agents IA et automatisation | Sitaly";
const DESCRIPTION_ACCUEIL =
  "Sitaly installe et pilote des agents IA pour PME : accueil téléphonique, qualification, rendez-vous, relance des devis. Diagnostic offert de 30 min.";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: TITRE_ACCUEIL },
      { name: "description", content: DESCRIPTION_ACCUEIL },
      { name: "robots", content: "index, follow, max-snippet:-1, max-image-preview:large" },
      { property: "og:title", content: TITRE_ACCUEIL },
      { property: "og:description", content: DESCRIPTION_ACCUEIL },
      { property: "og:url", content: "https://sitaly.fr/" },
    ],
    links: [{ rel: "canonical", href: "https://sitaly.fr/" }],
    scripts: [
      {
        type: "application/ld+json",
        children: JSON.stringify({
          "@context": "https://schema.org",
          "@graph": [
            {
              "@type": "WebPage",
              "@id": "https://sitaly.fr/#webpage",
              url: "https://sitaly.fr/",
              name: TITRE_ACCUEIL,
              description: DESCRIPTION_ACCUEIL,
              isPartOf: { "@id": "https://sitaly.fr/#website" },
              about: { "@id": "https://sitaly.fr/#business" },
              primaryImageOfPage: {
                "@type": "ImageObject",
                url: "https://sitaly.fr/og-image.png",
                width: 1200,
                height: 630,
              },
              inLanguage: "fr-FR",
            },
            {
              "@type": "FAQPage",
              "@id": "https://sitaly.fr/#faq",
              mainEntity: FAQ_ITEMS.map((it) => ({
                "@type": "Question",
                name: it.q,
                acceptedAnswer: { "@type": "Answer", text: texteBrut(it.a) },
              })),
            },
          ],
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
      <BandeSecteurs />
      <StackedOffers />
      <UnSeulSysteme />
      <Realisations />
      <Process />
      <Founder />
      <Temoignages />
      <Faq />
      <Journal />
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
      fond={(suffixe) => <ChampChevrons suffixe={suffixe} />}
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
                {/* Le nom est découpé dans le voile par ZoomIntro, il n'est donc
                    pas écrit dans le titre visible. Il y figure pour les moteurs
                    et les lecteurs d'écran : « Sitaly installe et pilote… ». */}
                <span className="sr-only">Sitaly </span>
                <span className="text-blue-ink">installe</span> et{" "}
                <span className="text-violet-ink">pilote</span> les{" "}
                <span className="text-red-ink">agents IA</span> de votre PME
              </h1>

              {/* La phrase qui porte le positionnement : ce qui est fait, et par
                qui. « Une seule personne » remplace le mot agence, qui
                promettait une équipe que Sitaly n'a pas. */}
              <p className="measure mt-6 text-lg text-muted-foreground">
                Accueil téléphonique, qualification des demandes, prise de rendez-vous, relance des
                devis. Le site et la publicité en complément. Une seule personne au bout du fil,
                celle qui construit.
              </p>

              <a
                href={CALENDLY_URL}
                target="_blank"
                rel="noopener noreferrer"
                className="bouton mt-7 px-8 py-4 text-base"
              >
                <Calendar className="h-5 w-5" />
                Réserver un diagnostic de 30 min
              </a>

              {/* Trois repères sous le bouton. Le premier écran ne portait qu'un
                titre et un bouton : de quoi paraître vide, et rien pour lever
                les objections de départ. */}
              <ul className="mt-6 flex flex-wrap items-center justify-center gap-x-7 gap-y-2 text-sm text-muted-foreground">
                {["Diagnostic offert de 30 min", "Réponse sous 24h", "Sans engagement de durée"].map(
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
  /* L'ordre de l'offre depuis le 28 septembre 2026 : les agents IA, la
     publicité qui amène les demandes, puis le site qui les reçoit. */
  const prestations = [
    {
      texte: "agents IA & automatisations",
      to: "/agents-ia/",
      coche: "text-violet-on-ink",
      survol: "group-hover:text-violet-on-ink",
    },
    {
      texte: "campagnes ChatGPT & Google Ads",
      to: "/acquisition/",
      coche: "text-red-on-ink",
      survol: "group-hover:text-red-on-ink",
    },
    {
      texte: "création de site internet",
      to: "/creation-site-internet/",
      coche: "text-blue-on-ink",
      survol: "group-hover:text-blue-on-ink",
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
          Avec Sitaly, chaque demande entrante est traitée, qualifiée et relancée, et votre présence
          en ligne en amène de nouvelles.
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
          subtitle="Ce qui traite les demandes quand elles arrivent, ce qui les amène, et le site qui les reçoit."
        />

        <div className="stagger mt-14 grid gap-x-10 gap-y-12 border-t border-border pt-12 md:grid-cols-3">
          {FAMILLES.map((f, i) => (
            <div
              key={f.id}
              data-reveal
              style={
                { "--i": i, "--encre-famille": COULEURS_FAMILLE[f.id].encre } as React.CSSProperties
              }
              className="md:border-l md:border-border md:pl-8 md:first:border-l-0 md:first:pl-0"
            >
              <f.icone className="icone-famille h-6 w-6" />
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
                        className="lien-famille group flex items-center gap-2 py-1.5 text-[15px] font-medium transition-colors"
                      >
                        <ArrowRight className="fleche-famille h-3.5 w-3.5 shrink-0 transition-transform group-hover:translate-x-0.5" />
                        {e.label}
                      </Link>
                    ) : (
                      <a
                        href={e.href}
                        className="lien-famille group flex items-center gap-2 py-1.5 text-[15px] font-medium transition-colors"
                      >
                        <ArrowRight className="fleche-famille h-3.5 w-3.5 shrink-0 transition-transform group-hover:translate-x-0.5" />
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

/* ---------------- BANDE DES SECTEURS ---------------- */
/**
 * La charnière entre les expertises et les offres.
 *
 * Elle faisait défiler cinquante-quatre métiers. Depuis le recentrage du
 * 26 septembre 2026 sur les agents IA pour les PME, elle nomme les trois
 * secteurs que Sitaly prospecte, chacun vers sa page. Même forme de règle
 * typographique entre deux filets : une rangée, pas une section de plus.
 */
function BandeSecteurs() {
  return (
    <section aria-label="Agents IA par secteur" className="border-y border-border bg-paper-sunk">
      <div className="mx-auto flex max-w-7xl flex-col gap-4 px-4 py-6 sm:px-6 sm:py-7 lg:flex-row lg:items-center lg:gap-10">
        <span className="rail-label shrink-0 text-muted-foreground">Agents IA par secteur</span>
        <ul className="flex flex-col gap-2 sm:flex-row sm:flex-wrap sm:gap-x-8 sm:gap-y-2">
          {SECTEURS.map((s) => (
            <li key={s.slug}>
              <Link
                to={cheminSecteur(s)}
                className="group inline-flex items-center gap-2 font-display text-lg font-bold tracking-tight transition-colors hover:text-violet-ink"
              >
                {s.label}
                <ArrowRight className="h-4 w-4 shrink-0 transition-transform group-hover:translate-x-0.5" />
              </Link>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}

/* ---------------- UN SEUL SYSTÈME ---------------- */
/**
 * Les trois familles, dites comme un seul parcours : faire venir les
 * demandes, les recevoir, les traiter. La section Expertises liste les pages ;
 * celle-ci dit pourquoi elles vont ensemble, en trois colonnes et une phrase
 * chacune. Pas un mur de texte.
 */
type LienSysteme = { label: string; to?: string; href?: string };

function UnSeulSysteme() {
  const etapes: {
    verbe: string;
    famille: "acquisition" | "site" | "automatisation";
    texte: string;
    liens: LienSysteme[];
  }[] = [
    {
      verbe: "Faire venir",
      famille: "acquisition",
      texte: "Des campagnes dans ChatGPT et sur Google, mesurées avant la première dépense.",
      liens: [
        { label: "ChatGPT Ads", href: "/chatgpt-ads/" },
        { label: "Google Ads", to: "/acquisition/" },
      ],
    },
    {
      verbe: "Recevoir",
      famille: "site",
      texte: "Un site qui dit clairement ce que vous faites et où vous joindre.",
      liens: [{ label: "Site internet", to: "/creation-site-internet/" }],
    },
    {
      verbe: "Traiter",
      famille: "automatisation",
      texte: "Des agents IA qui répondent, qualifient, prennent les rendez-vous et relancent.",
      liens: [{ label: "Agents IA", to: "/agents-ia/" }],
    },
  ];

  return (
    <section id="systeme" className="bg-paper-sunk py-20 sm:py-28">
      <div className="mx-auto max-w-7xl px-4 sm:px-6">
        <SectionHeader
          index="03"
          eyebrow="Un seul système"
          title={
            <>
              Les demandes arrivent, <span className="accent-word">et quelqu'un y répond</span>
            </>
          }
          subtitle="Chaque offre se prend seule. Ensemble, elles couvrent le parcours entier d'une demande, du premier clic à la prise de rendez-vous."
        />

        <ol className="stagger mt-14 grid gap-x-10 gap-y-12 border-t border-border pt-12 md:grid-cols-3">
          {etapes.map((e, i) => (
            <li
              key={e.verbe}
              data-reveal
              style={
                {
                  "--i": i,
                  "--encre-famille": COULEURS_FAMILLE[e.famille].encre,
                } as React.CSSProperties
              }
              className="md:border-l md:border-border md:pl-8 md:first:border-l-0 md:first:pl-0"
            >
              <span className="rail-num font-display text-sm font-bold text-brand-ink">
                {String(i + 1).padStart(2, "0")}
              </span>
              <h3 className="mt-2 font-display text-2xl font-extrabold tracking-tight">
                <span className="accent-word">{e.verbe}</span> les demandes
              </h3>
              <p className="mt-3 leading-relaxed text-muted-foreground">{e.texte}</p>
              <ul className="mt-5 flex flex-wrap gap-x-5 gap-y-1">
                {e.liens.map((l) => (
                  <li key={l.label}>
                    {l.to ? (
                      <Link
                        to={l.to}
                        className="lien-famille group inline-flex items-center gap-2 py-1.5 text-[15px] font-medium transition-colors"
                      >
                        <ArrowRight className="fleche-famille h-3.5 w-3.5 shrink-0 transition-transform group-hover:translate-x-0.5" />
                        {l.label}
                      </Link>
                    ) : (
                      <a
                        href={l.href}
                        className="lien-famille group inline-flex items-center gap-2 py-1.5 text-[15px] font-medium transition-colors"
                      >
                        <ArrowRight className="fleche-famille h-3.5 w-3.5 shrink-0 transition-transform group-hover:translate-x-0.5" />
                        {l.label}
                      </a>
                    )}
                  </li>
                ))}
              </ul>
            </li>
          ))}
        </ol>
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
          index="04"
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
 * La frise des cinq étapes, avec son faisceau piloté par le défilement.
 *
 * C'était une liste de cinq lignes séparées par des filets, où le numéro
 * servait d'étiquette. Elle disait la séquence sans la faire sentir : cinq
 * lignes posées l'une sous l'autre se lisent comme un tableau, pas comme une
 * progression.
 *
 * Le faisceau la fait sentir. Une seule variable, `--progression`, écrite au
 * défilement, et tout le reste en découle par `calc` : la hauteur du trait
 * lumineux, l'allumage de chaque pastille, la montée de chaque bloc. Aucune
 * bibliothèque, aucun observateur par étape.
 *
 * L'astuce qui évite un `IntersectionObserver` par pastille : l'opacité se
 * borne d'elle-même entre 0 et 1. `calc((progression × n − i) × 2.5)` vaut donc
 * 0 avant que l'étape ne soit atteinte, monte pendant qu'elle l'est, et sature
 * à 1 ensuite, sans une ligne de script.
 */
function Process() {
  /* Le déroulé d'un projet d'agents IA, sans durée annoncée : elle dépend
     du périmètre, et le diagnostic la fixe. */
  const etapes = [
    {
      t: "Diagnostic offert de 30 minutes",
      d: "Au téléphone : où vos demandes se perdent, quels outils sont en place, ce qu'un agent peut reprendre.",
    },
    {
      t: "Proposition écrite",
      d: "Le périmètre, les outils à connecter, le prix de la mise en place et celui du pilotage. Rien n'est facturé avant votre accord.",
    },
    {
      t: "Mise en place",
      d: "L'agent est configuré selon vos règles et branché sur votre téléphonie, votre agenda et vos outils.",
    },
    {
      t: "Réglages sur de vraies demandes",
      d: "Les premières conversations sont relues une à une, et les règles corrigées sur vos cas réels.",
    },
    {
      t: "Pilotage mensuel",
      d: "Lecture des échanges, corrections, évolutions, et un compte rendu chaque mois. Le même interlocuteur du début à la fin.",
    },
  ];
  const frise = useRef<HTMLOListElement>(null);
  useProgressionAuDefilement(frise);

  return (
    <section id="process" className="on-wash py-20 sm:py-28">
      <div className="mx-auto max-w-7xl px-4 sm:px-6">
        <SectionHeader
          index="05"
          eyebrow="Process"
          title={
            <>
              Cinq étapes, <span className="accent-word">du premier appel au pilotage</span>
            </>
          }
        />

        <ol
          ref={frise}
          className="frise mt-16"
          style={{ "--n": etapes.length } as React.CSSProperties}
        >
          {/* Le rail et son faisceau. Deux traits superposés : l'un pose la
              trajectoire, l'autre la parcourt. */}
          <span aria-hidden="true" className="frise-rail" />
          <span aria-hidden="true" className="frise-faisceau" />

          {etapes.map((e, i) => (
            <li key={e.t} className="frise-etape" style={{ "--i": i } as React.CSSProperties}>
              <span aria-hidden="true" className="frise-pastille">
                <span className="frise-pastille-fond" />
                <span className="frise-pastille-halo" />
                <span className="frise-numero">{String(i + 1).padStart(2, "0")}</span>
              </span>

              <div className="frise-bloc">
                <h3 className="font-display text-xl font-bold tracking-tight sm:text-2xl">{e.t}</h3>
                <p className="mt-2 leading-relaxed text-muted-foreground">{e.d}</p>
              </div>
            </li>
          ))}
        </ol>

        <p className="measure mt-12 text-muted-foreground">
          Avant d'en parler, notre guide sur l'
          <Link
            to="/blog/$slug/"
            params={{ slug: "agent-ia-entreprise-guide" }}
            className="font-medium text-brand-ink underline decoration-brand-ink/30 underline-offset-4 transition hover:decoration-brand-ink"
          >
            agent IA en entreprise
          </Link>{" "}
          dit ce qu'il fait, ce qu'il coûte, et quand une automatisation simple suffit.
        </p>
      </div>
    </section>
  );
}

/* ---------------- FAQ ---------------- */
/**
 * Les questions s'ouvrent sans script : `details` garde chaque réponse dans le
 * HTML prérendu, lisible par les moteurs, et identique au JSON-LD.
 */
function Faq() {
  return (
    <section id="faq" className="py-20 sm:py-28">
      <div className="mx-auto max-w-3xl px-4 sm:px-6">
        <SectionHeader
          index="06"
          eyebrow="FAQ"
          title={
            <>
              Les questions <span className="accent-word">posées avant de démarrer</span>
            </>
          }
        />
        <div className="mt-10 space-y-3">
          {FAQ_ITEMS.map((it, i) => (
            <details
              key={it.q}
              open={i === 0}
              className="group overflow-hidden rounded-xl border border-border bg-card shadow-soft"
            >
              <summary className="flex cursor-pointer list-none items-center justify-between gap-4 px-5 py-4 text-left font-semibold marker:content-none">
                <span>{it.q}</span>
                <ChevronDown className="h-5 w-5 shrink-0 text-muted-foreground transition-transform group-open:rotate-180" />
              </summary>
              <p className="px-5 pb-5 text-[15px] leading-relaxed text-muted-foreground">
                <TexteAvecLiens
                  texte={it.a}
                  classeLien="font-medium text-brand-ink underline decoration-brand-ink/30 underline-offset-4 transition hover:decoration-brand-ink"
                />
              </p>
            </details>
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
              <span className="accent-word text-brand-ink">celui qui construit vos outils</span>
            </>
          }
        />
        <FondateurCard className="mt-16" />
      </div>
    </section>
  );
}

/* ---------------- JOURNAL ---------------- */
/**
 * Trois articles avant le contact.
 *
 * La place n'est pas neutre : posé juste avant le formulaire, le journal donne
 * une sortie à ceux qui ne sont pas prêts à appeler. Sans lui, la page n'offre
 * que deux issues, réserver un appel ou partir.
 *
 * La sélection est éditoriale et vit dans `src/data/blog-posts.ts` : trois
 * articles choisis, un par famille d'expertise, plutôt que les trois derniers
 * publiés, qui ne sont pas forcément ceux qui intéressent le plus de monde.
 */
function Journal() {
  const articles = postsALaUne(3);

  return (
    <section id="journal" className="bg-paper-sunk py-20 sm:py-28">
      <div className="mx-auto max-w-7xl px-4 sm:px-6">
        <SectionHeader
          index="07"
          eyebrow="Le journal"
          title={
            <>
              Nos articles de <span className="accent-word">blog</span>
            </>
          }
          subtitle="Ce qui bouge en acquisition, en référencement et en automatisation, expliqué sans jargon et sans promesse."
        />

        <div className="stagger mt-14 grid gap-5 lg:grid-cols-3">
          {articles.map((post, i) => (
            <div key={post.slug} data-reveal style={{ "--i": i } as React.CSSProperties}>
              <BlogCard post={post} className="h-full" />
            </div>
          ))}
        </div>

        <div className="mt-12 flex justify-center">
          <Link to="/blog/" className="bouton-secondaire px-7 py-3.5">
            Tous les articles
            <ArrowRight className="h-5 w-5" />
          </Link>
        </div>
      </div>
    </section>
  );
}

/* ---------------- CONTACT ---------------- */
/**
 * Le formulaire envoie la demande au relais `sitaly-forms` (src/lib/formulaire.ts).
 *
 * Il ouvrait jusqu'ici l'application SMS du visiteur avec le message
 * pré-rempli : sur un ordinateur, rien ne partait, et rien n'était mesuré.
 * Tant que le relais n'est pas configuré (FORM_ENDPOINT vide), ce
 * comportement reste le repli ; en cas d'échec d'envoi, le visiteur garde le
 * téléphone et le SMS sous la main plutôt qu'une demande perdue.
 */
type EtatContact = "saisie" | "envoi" | "envoye" | "sms" | "erreur";

function Contact() {
  const [etat, setEtat] = useState<EtatContact>("saisie");
  const [lienSms, setLienSms] = useState("");

  async function envoyer(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const fd = new FormData(e.currentTarget);
    const get = (cle: string) => String(fd.get(cle) || "").trim();
    const nomComplet = `${get("firstname")} ${get("name")}`.trim();
    const entreprise = get("company");
    const telephone = get("phone");
    const message = get("message");
    const corps = `Bonjour, je suis ${nomComplet}${entreprise ? ` (${entreprise})` : ""}.\nTéléphone : ${telephone}\n\n${message}`;
    const separateur = /iPad|iPhone|iPod/.test(navigator.userAgent) ? "&" : "?";
    const sms = `sms:${SITALY_PHONE}${separateur}body=${encodeURIComponent(corps)}`;
    setLienSms(sms);
    setEtat("envoi");

    const resultat = await envoyerDemande(
      {
        name: nomComplet,
        company: entreprise,
        phone: telephone,
        email: get("email"),
        subject: "Demande de contact",
        message,
        website: get("website"),
      },
      "contact-accueil",
    );
    if (resultat === "envoye") {
      setEtat("envoye");
    } else if (resultat === "indisponible") {
      window.location.href = sms;
      setEtat("sms");
    } else {
      setEtat("erreur");
    }
  }

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
              Un diagnostic offert de 30 min
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
          onSubmit={envoyer}
          className="relative rounded-2xl border border-border bg-card p-6 shadow-elevated sm:p-8"
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
          ) : etat === "sms" ? (
            <div className="py-10 text-center" role="status">
              <div className="mx-auto grid h-14 w-14 place-items-center rounded-full bg-success/15 text-success">
                <Check className="h-7 w-7" />
              </div>
              <h3 className="mt-4 font-display text-xl font-bold">Merci !</h3>
              <p className="mt-2 text-muted-foreground">
                Votre application de messagerie s'ouvre avec votre message pré-rempli. Il ne vous
                reste plus qu'à l'envoyer.
              </p>
            </div>
          ) : etat === "erreur" ? (
            <div className="py-10 text-center" role="alert">
              <h3 className="font-display text-xl font-bold">L'envoi n'a pas abouti</h3>
              <p className="mt-2 text-muted-foreground">
                Votre demande n'est pas partie. Appelez le {SITALY_PHONE_DISPLAY}, ou envoyez-la par
                SMS : le message est déjà rédigé.
              </p>
              <div className="mt-6 flex flex-wrap justify-center gap-3">
                <a href={`tel:${SITALY_PHONE}`} className="bouton px-6 py-3">
                  <Phone className="h-4 w-4" />
                  Appeler
                </a>
                <a href={lienSms} className="bouton-secondaire px-6 py-3">
                  Envoyer par SMS
                </a>
              </div>
            </div>
          ) : (
            <>
              <div className="grid gap-4 sm:grid-cols-2">
                <Field label="Nom" name="name" required />
                <Field label="Prénom" name="firstname" required />
                <Field label="Téléphone" name="phone" type="tel" required />
                <Field label="E-mail" name="email" type="email" />
                <Field label="Entreprise" name="company" className="sm:col-span-2" />
              </div>
              {/* Pot de miel : invisible pour un humain, rempli par les robots. */}
              <div aria-hidden="true" className="absolute -left-[9999px] h-0 w-0 overflow-hidden">
                <label htmlFor="field-website">Ne pas remplir</label>
                <input id="field-website" name="website" type="text" tabIndex={-1} autoComplete="off" />
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
                disabled={etat === "envoi"}
                className="bouton mt-5 w-full px-6 py-3.5 disabled:opacity-70"
              >
                <Phone className="h-5 w-5" />
                {etat === "envoi" ? "Envoi…" : "Envoyer un message"}
              </button>
              <p className="mt-3 text-center text-xs text-muted-foreground">
                {FORM_ENDPOINT ? (
                  <>
                    Vos coordonnées servent uniquement à vous recontacter.{" "}
                    <Link to="/politique-confidentialite/" className="underline underline-offset-2">
                      Confidentialité
                    </Link>
                  </>
                ) : (
                  "Votre application de messagerie s'ouvrira avec le message pré-rempli."
                )}
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
  className,
}: {
  label: string;
  name: string;
  type?: string;
  required?: boolean;
  className?: string;
}) {
  const id = `field-${name}`;
  return (
    <div className={className}>
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
