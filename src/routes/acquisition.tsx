import { useRef } from "react";
import { createFileRoute, Link } from "@tanstack/react-router";
import {
  ArrowRight,
  BarChart3,
  Check,
  FileText,
  MessageSquare,
  Minus,
  Phone,
  Plus,
  Search,
  ShieldCheck,
  Target,
  TrendingUp,
  Wallet,
} from "lucide-react";
import { SiteHeader } from "@/components/SiteHeader";
import { SiteFooter } from "@/components/SiteFooter";
import { useRevealOnScroll } from "@/hooks/use-reveal-on-scroll";
import { SITALY_PHONE, SITALY_PHONE_DISPLAY } from "@/lib/config";
import { directiveRobots } from "@/lib/indexation";

import photoArtisan600 from "@/assets/photos/secteur-artisans-600.webp";
import photoArtisan1000 from "@/assets/photos/secteur-artisans-1000.webp";

/**
 * Page « Gestion de campagnes Google Ads » (retour au modèle d'origine, 16
 * novembre 2026). L'offre du 5 octobre (demandes payées par Sitaly, livrées à
 * une seule entreprise par zone) s'arrête : elle avançait un budget publicitaire
 * que Sitaly ne récupérait pas toujours.
 *
 * Règles de fond, à ne pas contourner en retouchant la page :
 * 1. Le client paie son budget publicitaire directement à Google, depuis un
 *    compte à son nom. Ce budget ne transite jamais par Sitaly.
 * 2. Rien n'est offert ni avancé par Sitaly : ni demande, ni budget, ni mois
 *    d'essai. Le forfait de gestion est dû dès le premier mois.
 * 3. Aucune promesse de résultat (clients, position, chiffre d'affaires).
 *    Sitaly s'engage sur la méthode : suivi des conversions avant la
 *    première dépense, optimisation régulière, rapport mensuel.
 * 4. Sans engagement de durée. Résiliable par e-mail, un mois de préavis.
 */

const FAQ_ITEMS = [
  {
    q: "Le forfait de 299 € comprend-il le budget publicitaire ?",
    a: "Non. Les 299 € couvrent la gestion de vos campagnes : stratégie, création, rédaction des annonces, suivi des conversions, optimisation et rapport mensuel. Le budget publicitaire est payé séparément, directement à Google, depuis un compte Google Ads à votre nom.",
  },
  {
    q: "Qui est propriétaire du compte Google Ads ?",
    a: "Vous. Le compte est ouvert à votre nom, le budget est prélevé sur votre moyen de paiement et vous gardez un accès complet à vos campagnes. Si vous arrêtez, vous gardez vos campagnes et leur historique.",
  },
  {
    q: "Garantissez-vous des résultats ?",
    a: "Non, et personne ne peut sérieusement le garantir. Nous nous engageons sur la méthode : le suivi des appels et des formulaires est installé et vérifié avant la première dépense, les campagnes sont revues chaque mois, et vous recevez un rapport qui montre ce qui a été dépensé et ce que ça a généré.",
  },
  {
    q: "Y a-t-il un engagement de durée ?",
    a: "Non. Le forfait est prélevé chaque mois, sans engagement de durée. Vous résiliez par e-mail, avec un préavis d'un mois.",
  },
  {
    q: "Ai-je besoin d'un site internet ?",
    a: "C'est préférable : la publicité envoie les visiteurs quelque part de convaincant. Si vous avez déjà un site, nous l'utilisons tel quel. Si vous n'en avez pas, l'offre Présence vous en livre un, géré par Sitaly.",
  },
  {
    q: "Combien dois-je investir en publicité ?",
    a: "Il n'existe pas de montant universel : le bon budget dépend de votre métier, de votre zone et de la concurrence sur vos mots-clés. Nous le définissons ensemble avant de lancer la première campagne, à partir de ce que vaut un nouveau client pour vous.",
  },
  {
    q: "Comment savoir si mes campagnes sont rentables ?",
    a: "Chaque appel et chaque formulaire envoyé depuis vos annonces est suivi. Votre rapport mensuel indique ce qui a été dépensé, combien d'appels et de formulaires sont arrivés, et ce que coûte réellement l'un d'eux.",
  },
] as const;

const TITRE = "Gestion de campagnes Google Ads pour artisans et TPE | Sitaly";
const DESCRIPTION =
  "Gestion de vos campagnes Google Ads : 299 € par mois, sans engagement. Votre budget publicitaire reste payé à Google, sur votre compte.";

export const Route = createFileRoute("/acquisition")({
  head: () => ({
    meta: [
      { title: TITRE },
      { name: "description", content: DESCRIPTION },
      { name: "robots", content: directiveRobots("/acquisition") },
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
          name: "Gestion de campagnes Google Ads",
          serviceType: "Agence Google Ads",
          url: "https://sitaly.fr/acquisition/",
          description:
            "Création, gestion et optimisation de campagnes Google Ads pour artisans et TPE : stratégie, mots-clés, annonces, suivi des conversions, optimisation et rapport mensuel. Forfait de gestion mensuel de 299 €, sans engagement de durée. Le budget publicitaire est payé séparément, directement à Google, depuis un compte au nom du client.",
          // Rattaché à l'entité du graphe racine (__root.tsx) par son @id.
          provider: { "@id": "https://sitaly.fr/#business" },
          areaServed: { "@type": "Country", name: "France" },
          offers: [
            {
              "@type": "Offer",
              name: "Gestion de campagnes Google Ads",
              description:
                "Forfait mensuel de gestion, sans engagement de durée, résiliable par e-mail avec un préavis d'un mois. Budget publicitaire Google non inclus, payé directement à Google par le client.",
              price: 299,
              priceCurrency: "EUR",
              priceSpecification: {
                "@type": "UnitPriceSpecification",
                price: 299,
                priceCurrency: "EUR",
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
  component: AcquisitionPage,
});

function AcquisitionPage() {
  /* Apparitions au défilement (DESIGN.md §6) : le contenu reste visible
     sans script, c'est le hook qui installe l'état masqué. */
  const ref = useRef<HTMLDivElement>(null);
  useRevealOnScroll(ref);

  return (
    <div
      ref={ref}
      className="ambiance-acquisition min-h-screen bg-background pb-20 text-foreground lg:pb-0"
    >
      <SiteHeader premierEcran="sombre" />
      <main>
        <Ouverture />
        <Constat />
        <Prestations />
        <Etapes />
        <Tarif />
        <Methode />
        <AvecOuSansSite />
        <Faq />
        <AppelFinal />
      </main>
      <SiteFooter />
      <BarreAppel />
    </div>
  );
}

/* ---------------- BRIQUES ---------------- */

function BoutonPrincipal({ className = "" }: { className?: string }) {
  return (
    <Link
      to="/mon-projet/"
      search={{ besoin: "visibilite" }}
      className={`bouton px-7 py-3.5 text-base ${className}`}
    >
      Demander un diagnostic
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
      <span>299 € par mois</span>
      <span aria-hidden="true">·</span>
      <span>Sans engagement</span>
      <span aria-hidden="true">·</span>
      <span>Budget payé directement à Google</span>
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
      <div aria-hidden="true" className="foyer-ambiance absolute inset-0 -z-10" />
      <div className="mx-auto grid max-w-7xl items-center gap-12 px-4 pt-[calc(var(--entete-hauteur)+2.5rem)] pb-20 sm:px-6 sm:pt-[calc(var(--entete-hauteur)+4rem)] sm:pb-28 lg:grid-cols-[1.1fr_0.9fr] lg:gap-16">
        <div data-reveal>
          <Surtitre sombre>Agence Google Ads · Artisans et TPE</Surtitre>
          <h1 className="mt-5 font-display text-[clamp(2.4rem,5.4vw,4.4rem)] leading-[1.02] font-extrabold tracking-[-0.042em] text-balance">
            Des campagnes Google Ads, <span className="accent-word">pas une boîte noire</span>
          </h1>
          <p className="mt-6 max-w-xl text-lg text-white/75 sm:text-xl">
            Nous créons, pilotons et optimisons vos campagnes Google Ads. Votre budget reste chez
            vous, payé directement à Google : nous facturons notre travail, pas votre publicité.
          </p>
          <div className="mt-9 flex flex-col gap-3 sm:flex-row">
            <BoutonPrincipal />
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
          <figcaption className="sur-papier absolute -bottom-6 left-4 w-[min(19rem,85%)] rounded-2xl border border-border bg-card p-4 text-left shadow-elevated sm:-left-8">
            <div className="flex items-center justify-between text-[11px] text-muted-foreground">
              <span className="inline-flex items-center gap-1.5">
                <BarChart3 className="h-3.5 w-3.5" />
                Rapport du mois · Exemple
              </span>
            </div>
            <p className="mt-2 text-sm font-semibold">Couverture, Brétigny-sur-Orge et alentours</p>
            <p className="mt-0.5 text-[13px] text-muted-foreground">
              Suivi des appels et des formulaires, actif depuis la première campagne
            </p>
            <p className="mt-3 inline-flex items-center gap-1.5 rounded-full bg-accent/10 px-2.5 py-1 text-[12px] font-semibold text-brand-ink">
              <Check className="h-3.5 w-3.5" />
              Budget payé à Google, séparé de nos honoraires
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
      t: "Vous êtes sur Google, mais loin",
      d: "Un couvreur cherché à Brétigny-sur-Orge trouve d'abord trois concurrents avant vous. Être présent ne suffit pas, encore faut-il être vu au bon moment.",
    },
    {
      t: "Vous avez déjà essayé, sans le savoir",
      d: "Une campagne lancée seul, sans suivi des appels ni des formulaires, ne dit rien de ce qu'elle a réellement rapporté.",
    },
    {
      t: "Le temps manque",
      d: "Entre deux chantiers, personne ne surveille des enchères ni ne corrige une annonce qui ne convertit plus.",
    },
    {
      t: "La confusion sur la facture",
      d: "Certaines offres mélangent honoraires et budget publicitaire dans un seul montant. Vous ne savez plus ce qui vous revient vraiment.",
    },
  ];

  return (
    <section className="bg-paper py-20 sm:py-28">
      <div className="mx-auto max-w-6xl px-4 sm:px-6">
        <div data-reveal className="max-w-3xl">
          <Surtitre>Le constat</Surtitre>
          <h2 className="display-section mt-3">
            Être présent sur Google. <span className="accent-word">Pas être trouvé.</span>
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
      </div>
    </section>
  );
}

/* ---------------- 3. CE QUE NOUS PRENONS EN CHARGE ---------------- */
function Prestations() {
  const prestations = [
    {
      icon: Target,
      t: "Stratégie",
      d: "Analyse de votre activité, de votre zone d'intervention et de vos objectifs, avant de dépenser le moindre euro.",
    },
    {
      icon: Search,
      t: "Recherche de mots-clés",
      d: "Les recherches qui ont un vrai potentiel commercial, et l'exclusion de celles qui font cliquer sans jamais appeler.",
    },
    {
      icon: FileText,
      t: "Création des campagnes",
      d: "Vos campagnes Google Ads créées et configurées sur votre compte, structurées par service et par zone.",
    },
    {
      icon: MessageSquare,
      t: "Rédaction des annonces",
      d: "Plusieurs formulations testées, et conservation de celles qui déclenchent l'appel ou le formulaire.",
    },
    {
      icon: Check,
      t: "Suivi des conversions",
      d: "Le suivi des appels et des formulaires, installé et vérifié avant la première dépense. Sans lui, aucun chiffre n'est fiable.",
    },
    {
      icon: TrendingUp,
      t: "Optimisation continue",
      d: "Les campagnes et les mots-clés sont revus régulièrement, pas lancés puis oubliés.",
    },
    {
      icon: Wallet,
      t: "Pilotage du budget",
      d: "Réallocation vers ce qui rapporte, coupure de ce qui coûte sans produire.",
    },
    {
      icon: BarChart3,
      t: "Rapport mensuel",
      d: "Ce qui a été dépensé, ce que ça a généré, et ce que coûte réellement un appel.",
    },
  ];

  return (
    <section className="bg-paper-sunk py-20 sm:py-28">
      <div className="mx-auto max-w-6xl px-4 sm:px-6">
        <div data-reveal className="max-w-3xl">
          <Surtitre>Ce que nous prenons en charge</Surtitre>
          <h2 className="display-section mt-3">
            Vos campagnes, <span className="accent-word">gérées de bout en bout</span>
          </h2>
        </div>
        <ul className="stagger mt-14 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {prestations.map((p, i) => (
            <li
              key={p.t}
              data-reveal
              style={{ "--i": i } as React.CSSProperties}
              className="rounded-[1.5rem] border border-border bg-card p-6 shadow-soft"
            >
              <span className="grid h-10 w-10 place-items-center rounded-xl bg-brand-ink/10 text-brand-ink">
                <p.icon className="h-5 w-5" />
              </span>
              <h3 className="mt-5 font-display text-lg font-extrabold tracking-tight">{p.t}</h3>
              <p className="mt-2 text-[15px] leading-relaxed text-muted-foreground">{p.d}</p>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}

/* ---------------- 4. COMMENT ÇA MARCHE ---------------- */
function Etapes() {
  const etapes = [
    {
      t: "Analyse et budget",
      d: "Nous étudions votre activité, votre zone et vos objectifs, puis définissons ensemble un budget publicitaire cohérent avec la valeur d'un client pour vous.",
    },
    {
      t: "Mise en place",
      d: "Création des campagnes, des mots-clés et des annonces. Le suivi des conversions est branché et vérifié avant la première dépense.",
    },
    {
      t: "Lancement",
      d: "Les campagnes se diffusent. Chaque impression, chaque clic et chaque appel est mesuré dès le premier jour.",
    },
    {
      t: "Optimisation",
      d: "Chaque mois, les données décident : mots-clés renforcés ou coupés, annonces réécrites, budget déplacé. Vous recevez le rapport et les décisions prises.",
    },
  ];

  return (
    <section id="fonctionnement" className="bg-paper py-20 sm:py-28">
      <div className="mx-auto max-w-6xl px-4 sm:px-6">
        <div data-reveal className="max-w-3xl">
          <Surtitre>Comment ça marche</Surtitre>
          <h2 className="display-section mt-3">
            Quatre étapes, <span className="accent-word">et des données à chaque mois</span>
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

/* ---------------- 5. TARIF ---------------- */
function Tarif() {
  const lignes = [
    {
      label: "Forfait de gestion Sitaly",
      detail: "299 € par mois, identique d'un mois sur l'autre",
      nature: "Fixe",
      accent: true,
    },
    {
      label: "Budget publicitaire Google",
      detail: "Payé directement à Google, depuis votre compte, jamais à Sitaly",
      nature: "Vous le fixez",
      accent: false,
    },
  ];

  return (
    <section id="tarif" className="on-ink relative overflow-hidden bg-ink py-20 sm:py-28">
      <div aria-hidden="true" className="foyer-ambiance absolute inset-0 -z-10" />
      <div className="mx-auto max-w-6xl px-4 sm:px-6">
        <div className="grid gap-12 lg:grid-cols-[0.9fr_1.1fr] lg:gap-16">
          <div data-reveal>
            <Surtitre sombre>Tarif</Surtitre>
            <h2 className="display-section mt-3">
              Deux lignes, <span className="accent-word">et vous savez laquelle bouge</span>
            </h2>
            <p className="mt-6 max-w-md text-lg text-white/70">
              Un forfait de gestion fixe, sans engagement de durée. Le budget publicitaire reste
              séparé, payé par vous, directement à Google.
            </p>
            <div className="mt-8">
              <BoutonPrincipal />
            </div>
          </div>

          <div className="sur-papier rounded-[1.75rem] border border-border bg-card p-7 text-foreground shadow-elevated sm:p-8">
            <ul className="space-y-3">
              {lignes.map((l) => (
                <li
                  key={l.label}
                  className={`flex flex-wrap items-center justify-between gap-3 rounded-xl border px-4 py-3.5 ${
                    l.accent ? "border-accent/30 bg-accent/5" : "border-border bg-paper-sunk"
                  }`}
                >
                  <div>
                    <div className="font-semibold">{l.label}</div>
                    <div className="text-sm text-muted-foreground">{l.detail}</div>
                  </div>
                  <span
                    className={`rail-label shrink-0 rounded-full px-3 py-1 ${
                      l.accent
                        ? "bg-accent/10 text-brand-ink"
                        : "bg-background text-muted-foreground"
                    }`}
                  >
                    {l.nature}
                  </span>
                </li>
              ))}
            </ul>
            <p className="mt-6 flex items-start gap-2 rounded-xl border border-border bg-paper-sunk px-4 py-3 text-sm text-muted-foreground">
              <ShieldCheck className="mt-0.5 h-4 w-4 shrink-0 text-signal-ink" />
              Sans engagement de durée. Résiliable par e-mail, avec un préavis d'un mois. Vos
              campagnes et votre compte Google Ads vous appartiennent : si vous arrêtez, rien ne se
              perd.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}

/* ---------------- 6. MÉTHODE, SANS PROMESSE DE RÉSULTAT ---------------- */
function Methode() {
  const engagements = [
    {
      t: "La mesure avant la dépense",
      d: "Le suivi des appels et des formulaires est installé et vérifié avant le premier euro de publicité. Sans lui, aucun chiffre du rapport ne veut rien dire.",
    },
    {
      t: "Une optimisation régulière",
      d: "Les campagnes ne sont pas lancées puis oubliées. Elles sont revues, corrigées et arbitrées chaque mois.",
    },
    {
      t: "Un rapport mensuel lisible",
      d: "Ce qui a été dépensé, ce que ça a généré, et ce que coûte réellement un appel. Pas d'impressions flatteuses sans contact derrière.",
    },
  ];

  return (
    <section className="bg-paper py-20 sm:py-28">
      <div className="mx-auto max-w-6xl px-4 sm:px-6">
        <div data-reveal className="max-w-3xl">
          <Surtitre>Notre engagement</Surtitre>
          <h2 className="display-section mt-3">
            Aucune promesse de résultat.{" "}
            <span className="accent-word">Une méthode vérifiable.</span>
          </h2>
          <p className="mt-5 text-lg leading-relaxed text-muted-foreground">
            Personne ne peut garantir un nombre de clients ou une position sur Google. Nous nous
            engageons sur ce que nous contrôlons réellement.
          </p>
        </div>
        <div className="stagger mt-14 grid gap-4 md:grid-cols-3 lg:gap-5">
          {engagements.map((g, i) => (
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

/* ---------------- 7. AVEC OU SANS SITE ---------------- */
function AvecOuSansSite() {
  return (
    <section className="bg-paper-sunk py-20 sm:py-28">
      <div className="mx-auto max-w-6xl px-4 sm:px-6">
        <div className="grid gap-10 lg:grid-cols-[0.85fr_1.15fr] lg:items-center lg:gap-16">
          <div data-reveal>
            <Surtitre>Avec ou sans site</Surtitre>
            <h2 className="display-section mt-3">
              Vos campagnes envoient quelque part.{" "}
              <span className="accent-word">À vous de choisir où.</span>
            </h2>
          </div>
          <div data-reveal className="grid gap-5 sm:grid-cols-2">
            <div className="rounded-[1.5rem] border border-border bg-card p-7 shadow-soft">
              <h3 className="font-display text-lg font-extrabold tracking-tight">
                Vous avez un site
              </h3>
              <p className="mt-2 leading-relaxed text-muted-foreground">
                Nous travaillons avec lui tel qu'il est. Les campagnes dirigent les visiteurs vers
                vos pages existantes.
              </p>
            </div>
            <div className="rounded-[1.5rem] border border-border bg-card p-7 shadow-soft">
              <h3 className="font-display text-lg font-extrabold tracking-tight">
                Vous n'en avez pas
              </h3>
              <p className="mt-2 leading-relaxed text-muted-foreground">
                L'offre Présence vous livre un site, géré par Sitaly, avant de lancer vos campagnes.
              </p>
              <Link
                to="/offres/$id/"
                params={{ id: "presence" }}
                className="mt-4 inline-flex items-center gap-1.5 font-semibold text-brand-ink underline decoration-brand-ink/30 underline-offset-4 transition hover:decoration-brand-ink"
              >
                Voir l'offre Présence
                <ArrowRight className="h-4 w-4" />
              </Link>
            </div>
          </div>
        </div>
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
            Le tarif, le budget, l'engagement : <span className="accent-word">sans détour</span>
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
      <div aria-hidden="true" className="foyer-ambiance absolute inset-0 -z-10" />
      <div data-reveal className="mx-auto max-w-4xl px-4 py-24 text-center sm:px-6 sm:py-32">
        <h2 className="display-section">
          Vos clients cherchent déjà vos services <span className="accent-word">sur Google.</span>
        </h2>
        <p className="mx-auto mt-6 max-w-xl text-lg text-white/70">
          Un diagnostic suffit pour savoir si Google Ads a du sens pour votre activité et votre
          budget.
        </p>
        <div className="mt-10 flex flex-col justify-center gap-3 sm:flex-row">
          <BoutonPrincipal />
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
          Diagnostic gratuit
        </Link>
      </div>
    </div>
  );
}
