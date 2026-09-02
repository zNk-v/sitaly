import { createFileRoute, Link } from "@tanstack/react-router";
import {
  ArrowRight,
  Calendar,
  ChartColumn,
  Check,
  ChevronDown,
  Eye,
  FileText,
  Gauge,
  MessageSquare,
  Menu,
  Phone,
  Search,
  ShieldCheck,
  Target,
  TrendingUp,
  Users,
  Wallet,
  X,
} from "lucide-react";
import { useState } from "react";

import { LinkedInBadge } from "@/components/LinkedInBadge";
import { PhoneButton } from "@/components/SiteHeader";
import { SitalyLogo } from "@/components/SitalyLogo";
import { CALENDLY_URL, PHONE_DISPLAY, PHONE_TEL } from "@/lib/config";

const URL = "https://sitaly.fr/acquisition/";
const TITLE = "Agence Google Ads pour PME et artisans — Gestion à 299€/mois | Sitaly";
const DESCRIPTION =
  "Sitaly crée, pilote et optimise vos campagnes Google Ads pour générer des demandes qualifiées. Gestion à 299 €/mois + 15 % du budget publicitaire, budget Google séparé.";

/** Honoraires fixes et part variable : repris tels quels dans le texte et le JSON-LD. */
const FEE = 299;
const VARIABLE = 15;

/**
 * Montant en euros à la française : espace fine insécable pour les milliers,
 * insécable avant le symbole. Un prix ne doit jamais se couper en fin de ligne.
 */
function eur(n: number) {
  return `${n.toLocaleString("fr-FR").replace(/[\s\u202F\u00A0]/g, "\u202F")}\u00A0€`;
}

const CONSTATS = [
  {
    icon: Eye,
    text: "Votre site existe, il est correct, mais il ne génère presque aucune demande.",
  },
  {
    icon: Users,
    text: "Votre activité repose sur le bouche-à-oreille, et elle s'arrête quand il s'arrête.",
  },
  {
    icon: TrendingUp,
    text: "Vos concurrents apparaissent avant vous quand un client tape votre métier sur Google.",
  },
  {
    icon: ChartColumn,
    text: "Vous avez déjà essayé Google Ads sans jamais savoir si vos campagnes étaient rentables.",
  },
  {
    icon: Gauge,
    text: "Vous n'avez ni le temps ni l'envie de surveiller des enchères entre deux chantiers.",
  },
];

const PRESTATIONS = [
  {
    icon: Target,
    title: "Stratégie",
    desc: "Analyse de votre activité, de vos services, de votre zone d'intervention et de vos objectifs avant de dépenser le moindre euro.",
  },
  {
    icon: Search,
    title: "Recherche de mots-clés",
    desc: "Identification des recherches qui ont un vrai potentiel commercial, et exclusion de celles qui font cliquer sans jamais appeler.",
  },
  {
    icon: FileText,
    title: "Création des campagnes",
    desc: "Création et configuration complètes de vos campagnes Google Ads, structurées par service et par zone.",
  },
  {
    icon: MessageSquare,
    title: "Rédaction des annonces",
    desc: "Écriture des annonces, test de plusieurs formulations et conservation de celles qui déclenchent le contact.",
  },
  {
    icon: Check,
    title: "Suivi des conversions",
    desc: "Mise en place du suivi des appels, formulaires et demandes de devis. Sans cette étape, aucun chiffre n'est exploitable.",
  },
  {
    icon: TrendingUp,
    title: "Optimisation continue",
    desc: "Analyse des performances et ajustement régulier des campagnes, des mots-clés et des enchères.",
  },
  {
    icon: Wallet,
    title: "Pilotage du budget",
    desc: "Réallocation du budget vers les campagnes et les recherches qui rapportent, coupure de celles qui coûtent sans produire.",
  },
  {
    icon: ChartColumn,
    title: "Reporting",
    desc: "Un point mensuel lisible : ce qui a été dépensé, ce que ça a généré, et ce que coûte réellement une demande entrante.",
  },
];

const ETAPES = [
  {
    n: "01",
    title: "Analyse",
    desc: "Nous étudions votre activité, votre marché local et vos objectifs. Nous définissons ensemble un budget publicitaire cohérent avec la valeur d'un client pour vous.",
  },
  {
    n: "02",
    title: "Mise en place",
    desc: "Nous créons et configurons vos campagnes, vos mots-clés et vos annonces. Le suivi des conversions est branché et vérifié avant la première dépense.",
  },
  {
    n: "03",
    title: "Lancement",
    desc: "Les campagnes se diffusent. Les premières impressions, les premiers clics et les premières demandes arrivent, et chacun est mesuré.",
  },
  {
    n: "04",
    title: "Optimisation",
    desc: "Chaque mois, les données décident : mots-clés renforcés ou coupés, annonces réécrites, budget déplacé. Vous recevez le reporting et les décisions prises.",
  },
];

const INCLUS = [
  "Stratégie et cadrage de votre acquisition",
  "Création et configuration des campagnes",
  "Recherche et sélection des mots-clés",
  "Rédaction et optimisation des annonces",
  "Mise en place du suivi des conversions",
  "Optimisation continue des campagnes",
  "Pilotage et arbitrage du budget",
  "Reporting mensuel détaillé",
  "Un interlocuteur unique, joignable",
];

const RAISONS = [
  {
    icon: Wallet,
    title: "Transparence sur le budget",
    desc: "Le budget publicitaire est versé directement à Google depuis votre compte. Il ne transite jamais par nous, et vous voyez chaque euro dépensé.",
  },
  {
    icon: ChartColumn,
    title: "Des chiffres, pas des impressions",
    desc: "Le suivi des conversions est installé avant la première dépense. Sans mesure fiable, une campagne ne produit que des statistiques flatteuses.",
  },
  {
    icon: TrendingUp,
    title: "Optimisation continue",
    desc: "Les campagnes ne sont pas lancées puis oubliées. Elles sont revues, corrigées et arbitrées tous les mois.",
  },
  {
    icon: Phone,
    title: "Un interlocuteur humain",
    desc: "Vous parlez à la personne qui pilote vos campagnes, pas à un centre de support. Vos questions trouvent une réponse concrète.",
  },
  {
    icon: Target,
    title: "Une stratégie faite pour vous",
    desc: "Un plombier de l'Essonne et un cabinet de conseil n'ont ni les mêmes recherches, ni les mêmes clients. Rien n'est dupliqué d'un compte à l'autre.",
  },
  {
    icon: ShieldCheck,
    title: "Aucune promesse irréaliste",
    desc: "Nous ne promettons ni première position, ni nombre de clients, ni chiffre d'affaires multiplié. Nous promettons un travail sérieux et mesuré.",
  },
];

const FAQ = [
  {
    q: "Les 299 € comprennent-ils le budget Google Ads ?",
    a: "Non. Les 299 € couvrent l'accompagnement et la gestion de vos campagnes : stratégie, création, suivi des conversions, optimisation et reporting. Le budget publicitaire est payé séparément, directement à Google, depuis un compte qui reste le vôtre.",
  },
  {
    q: "Pourquoi 15 % en plus du forfait ?",
    a: "Les 15 % correspondent à la part variable de la gestion. Piloter 500 € de publicité et en piloter 5 000 € ne demande pas le même travail : plus de campagnes à surveiller, plus de mots-clés à arbitrer, plus de données à analyser. Ce pourcentage se calcule sur le montant réellement dépensé en publicité sur le mois, pas sur un budget prévisionnel.",
  },
  {
    q: "Combien dois-je investir en publicité ?",
    a: "Il n'existe pas de montant universel, et méfiez-vous de quiconque vous en annonce un sans vous connaître. Le bon budget dépend de votre activité, de votre zone géographique, du niveau de concurrence sur vos mots-clés et de ce que vous rapporte un client. Nous le définissons ensemble lors de l'appel découverte, en partant de ce qu'un nouveau client vaut pour vous.",
  },
  {
    q: "Est-ce que vous garantissez des clients ?",
    a: "Non, et personne ne peut sérieusement le faire. Nous nous engageons sur la méthode : des campagnes correctement construites, un suivi des conversions fiable avant la première dépense, des arbitrages réguliers et un reporting qui vous montre le coût réel d'une demande. L'objectif est d'améliorer cette rentabilité mois après mois grâce aux données.",
  },
  {
    q: "Puis-je arrêter l'accompagnement ?",
    a: "Oui. L'abonnement est sans engagement de durée : il est prélevé d'avance chaque mois et vous pouvez le résilier à tout moment, par simple email à contact@sitaly.fr. La résiliation prend effet à la fin du mois en cours. Vos campagnes et votre compte Google Ads vous appartiennent : vous les gardez.",
  },
  {
    q: "Dois-je déjà avoir un site internet ?",
    a: "Un site aide, parce que la publicité doit envoyer les visiteurs quelque part de convaincant. Mais l'offre est indépendante : si vous avez déjà un site, nous travaillons avec. Si vous n'en avez pas, l'offre Sitaly Présence (149 €/mois) inclut un site professionnel livré en 48h, et les deux se combinent.",
  },
  {
    q: "Qui est propriétaire du compte Google Ads ?",
    a: "Vous. Le compte est créé à votre nom, le budget est prélevé sur vos moyens de paiement et vous gardez un accès complet aux campagnes et à leur historique. Si nous arrêtons de travailler ensemble, rien ne se perd.",
  },
];

export const Route = createFileRoute("/acquisition")({
  head: () => ({
    meta: [
      { title: TITLE },
      { name: "description", content: DESCRIPTION },
      { name: "robots", content: "index,follow" },
      { property: "og:title", content: "Agence Google Ads pour PME et artisans | Sitaly" },
      {
        property: "og:description",
        content:
          "Création, gestion et optimisation de vos campagnes Google Ads. 299 €/mois + 15 % du budget publicitaire. Votre budget Google reste séparé et vous appartient.",
      },
      { property: "og:url", content: URL },
    ],
    links: [{ rel: "canonical", href: URL }],
    scripts: [
      {
        type: "application/ld+json",
        children: JSON.stringify({
          "@context": "https://schema.org",
          "@type": "Service",
          name: "Sitaly Acquisition — gestion de campagnes Google Ads",
          serviceType: "Gestion de campagnes Google Ads",
          description:
            "Création, gestion et optimisation de campagnes Google Ads pour PME, TPE et artisans : stratégie, mots-clés, annonces, suivi des conversions, optimisation et reporting. Honoraires de 299 €/mois majorés de 15 % du budget publicitaire dépensé. Le budget publicitaire est payé directement à Google et n'est pas inclus.",
          provider: { "@type": "Organization", name: "Sitaly", url: "https://sitaly.fr" },
          areaServed: "FR",
          offers: [
            {
              "@type": "Offer",
              name: "Gestion Google Ads",
              price: "299",
              priceCurrency: "EUR",
              description:
                "299 €/mois d'honoraires de gestion, plus 15 % du budget publicitaire réellement dépensé. Budget publicitaire Google non inclus.",
              priceSpecification: {
                "@type": "UnitPriceSpecification",
                price: "299",
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
          mainEntity: FAQ.map((it) => ({
            "@type": "Question",
            name: it.q,
            acceptedAnswer: { "@type": "Answer", text: it.a },
          })),
        }),
      },
    ],
  }),
  component: AcquisitionPage,
});

function AcquisitionPage() {
  return (
    <div className="min-h-screen bg-background text-foreground">
      <AcquisitionNav />

      {/* Hero */}
      <section className="hero-bg">
        <div className="mx-auto max-w-3xl px-4 py-16 text-center sm:px-6 sm:py-24">
          <div className="inline-flex items-center gap-2 rounded-full border border-border bg-card px-3 py-1 text-xs font-medium text-muted-foreground shadow-soft">
            <Target className="h-3.5 w-3.5 text-accent" />
            Agence Google Ads
          </div>
          <h1 className="mt-5 font-display text-4xl font-extrabold leading-[1.05] tracking-tight sm:text-5xl">
            Transformez Google en source régulière de{" "}
            <span className="gradient-text">nouveaux clients.</span>
          </h1>
          <p className="mt-5 text-lg text-muted-foreground">
            Sitaly crée, pilote et optimise vos campagnes Google Ads pour attirer des prospects
            réellement intéressés par vos services.
          </p>
          <div className="mt-8 flex flex-col justify-center gap-3 sm:flex-row">
            <a
              href={CALENDLY_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center justify-center gap-2 rounded-xl bg-primary px-6 py-3.5 text-base font-semibold text-primary-foreground shadow-elevated transition hover:opacity-90"
            >
              <Calendar className="h-5 w-5" />
              Demander un accompagnement
            </a>
            <a
              href="#fonctionnement"
              className="inline-flex items-center justify-center gap-2 rounded-xl border border-border bg-card px-6 py-3.5 text-base font-semibold shadow-soft transition hover:bg-secondary"
            >
              Voir comment ça fonctionne
            </a>
          </div>
          <p className="mt-6 text-sm text-muted-foreground">
            299 €/mois + {VARIABLE} % du budget publicitaire. Sans engagement de durée.
          </p>
        </div>
      </section>

      {/* Le constat */}
      <section className="border-y border-border bg-secondary/40">
        <div className="mx-auto max-w-7xl px-4 py-20 sm:px-6 sm:py-24">
          <div className="mx-auto max-w-2xl text-center">
            <div className="text-xs font-semibold uppercase tracking-wider text-accent">
              Le constat
            </div>
            <h2 className="mt-2 font-display text-3xl font-extrabold tracking-tight sm:text-4xl">
              Être présent sur Google ne suffit pas. Il faut être visible au bon moment.
            </h2>
            <p className="mt-4 text-muted-foreground sm:text-lg">
              Quand quelqu'un cherche votre métier dans votre ville, il appelle rarement le sixième
              résultat.
            </p>
          </div>
          <div className="mx-auto mt-12 grid max-w-5xl gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {CONSTATS.map((c) => (
              <div
                key={c.text}
                className="flex items-start gap-3 rounded-2xl border border-border bg-card p-5 shadow-soft"
              >
                <div className="grid h-10 w-10 shrink-0 place-items-center rounded-lg bg-accent/10 text-accent">
                  <c.icon className="h-5 w-5" />
                </div>
                <p className="text-[15px] leading-relaxed text-foreground/85">{c.text}</p>
              </div>
            ))}
          </div>
          <p className="mx-auto mt-8 max-w-2xl text-center text-muted-foreground">
            Google Ads place votre entreprise devant les personnes qui cherchent déjà ce que vous
            faites, au moment où elles le cherchent. Encore faut-il que les campagnes soient
            construites, mesurées et corrigées.
          </p>
        </div>
      </section>

      {/* Prestations */}
      <section id="prestations" className="mx-auto max-w-7xl px-4 py-20 sm:px-6 sm:py-24">
        <div className="mx-auto max-w-2xl text-center">
          <div className="text-xs font-semibold uppercase tracking-wider text-accent">
            Ce que nous prenons en charge
          </div>
          <h2 className="mt-2 font-display text-3xl font-extrabold tracking-tight sm:text-4xl">
            Vos campagnes Google Ads, gérées de bout en bout
          </h2>
          <p className="mt-4 text-muted-foreground sm:text-lg">
            Vous n'avez rien à paramétrer, rien à surveiller et aucun tableau de bord à apprendre.
          </p>
        </div>
        <div className="mt-12 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
          {PRESTATIONS.map((p) => (
            <div key={p.title} className="rounded-2xl border border-border bg-card p-6 shadow-soft">
              <div className="grid h-11 w-11 place-items-center rounded-xl bg-secondary text-foreground/70">
                <p.icon className="h-5 w-5" />
              </div>
              <h3 className="mt-4 font-display text-lg font-bold tracking-tight">{p.title}</h3>
              <p className="mt-2 text-[15px] leading-relaxed text-muted-foreground">{p.desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Fonctionnement */}
      <section id="fonctionnement" className="border-y border-border bg-secondary/40">
        <div className="mx-auto max-w-7xl px-4 py-20 sm:px-6 sm:py-24">
          <div className="mx-auto max-w-2xl text-center">
            <div className="text-xs font-semibold uppercase tracking-wider text-accent">
              Comment ça marche
            </div>
            <h2 className="mt-2 font-display text-3xl font-extrabold tracking-tight sm:text-4xl">
              Un système qui s'améliore avec les données
            </h2>
            <p className="mt-4 text-muted-foreground sm:text-lg">
              Quatre étapes, du premier appel au pilotage mensuel.
            </p>
          </div>
          <div className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {ETAPES.map((e) => (
              <div key={e.n} className="rounded-2xl border border-border bg-card p-6 shadow-soft">
                <span className="font-display text-4xl font-extrabold text-accent/25">{e.n}</span>
                <h3 className="mt-2 font-display text-lg font-bold tracking-tight">{e.title}</h3>
                <p className="mt-2 text-[15px] leading-relaxed text-muted-foreground">{e.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Tarif */}
      <section id="tarif" className="mx-auto max-w-7xl px-4 py-20 sm:px-6 sm:py-24">
        <div className="mx-auto max-w-2xl text-center">
          <div className="text-xs font-semibold uppercase tracking-wider text-accent">Tarif</div>
          <h2 className="mt-2 font-display text-3xl font-extrabold tracking-tight sm:text-4xl">
            Un tarif simple et transparent
          </h2>
          <p className="mt-4 text-muted-foreground sm:text-lg">
            Un forfait de gestion, une part variable liée à ce que vous investissez, et votre budget
            publicitaire qui reste chez vous.
          </p>
        </div>

        <div className="mx-auto mt-12 max-w-4xl overflow-hidden rounded-3xl border-2 border-accent bg-card shadow-glow">
          <div className="p-7 sm:p-9">
            <div className="flex flex-wrap items-center justify-between gap-3">
              <div>
                <div className="text-xs font-semibold uppercase tracking-wider text-accent">
                  Prestation Sitaly
                </div>
                <h3 className="mt-1 font-display text-2xl font-bold tracking-tight">
                  Gestion Google Ads
                </h3>
              </div>
              <span className="rounded-full bg-accent/10 px-3 py-1 text-xs font-semibold text-accent">
                Sans engagement de durée
              </span>
            </div>
            <div className="mt-6 flex flex-wrap items-baseline gap-x-3 gap-y-1">
              <span className="font-display text-5xl font-extrabold tracking-tight sm:text-6xl">
                {FEE} €
              </span>
              <span className="text-lg text-muted-foreground">/ mois</span>
            </div>
            <p className="mt-2 text-lg font-semibold text-accent">
              + {VARIABLE} % du budget publicitaire dépensé
            </p>
            <p className="mt-2 text-sm text-muted-foreground">
              Les {VARIABLE} % sont calculés sur le montant réellement dépensé en publicité sur le
              mois, jamais sur un budget prévisionnel.
            </p>
            <div className="mt-7 border-t border-border pt-6">
              <div className="text-sm font-semibold">Inclus dans les {FEE} € :</div>
              <ul className="mt-4 grid gap-3 sm:grid-cols-2">
                {INCLUS.map((it) => (
                  <li key={it} className="flex items-start gap-3 text-[15px]">
                    <Check className="mt-0.5 h-5 w-5 shrink-0 text-accent" />
                    <span>{it}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>

          {/* Le budget publicitaire ne transite pas par Sitaly : c'est l'objection
              numéro un des artisans échaudés par une agence, elle se traite ici. */}
          <div className="border-t-2 border-dashed border-border bg-secondary/50 p-7 sm:p-9">
            <div className="flex items-start gap-3">
              <div className="grid h-11 w-11 shrink-0 place-items-center rounded-xl bg-background text-foreground/70 shadow-soft">
                <Wallet className="h-5 w-5" />
              </div>
              <div>
                <div className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">
                  Séparé de nos honoraires
                </div>
                <h3 className="mt-1 font-display text-xl font-bold tracking-tight">
                  Votre budget publicitaire
                </h3>
              </div>
            </div>
            <p className="mt-4 text-[15px] leading-relaxed text-foreground/85">
              Le budget Google Ads est défini avec vous et payé{" "}
              <strong>directement à Google</strong>, depuis un compte ouvert à votre nom. Il n'est
              pas inclus dans les {FEE} €, il ne transite pas par Sitaly, et le compte reste le
              vôtre si nous arrêtons de travailler ensemble.
            </p>
          </div>
        </div>

        {/* Exemple chiffré : « 299 € + 15 % » reste abstrait tant qu'on ne l'a pas posé
            sur un mois réel. */}
        <div className="mx-auto mt-6 max-w-4xl rounded-3xl border border-border bg-card p-7 shadow-soft sm:p-9">
          <div className="text-xs font-semibold uppercase tracking-wider text-accent">Exemple</div>
          <h3 className="mt-1 font-display text-xl font-bold tracking-tight sm:text-2xl">
            Vous investissez {eur(1000)} de publicité dans le mois
          </h3>
          <ul className="mt-6 space-y-3">
            {[
              {
                title: "Accompagnement Sitaly",
                desc: "Forfait de gestion mensuel",
                amount: eur(FEE),
                sitaly: true,
              },
              {
                title: "Gestion variable",
                desc: `${VARIABLE} % de ${eur(1000)} dépensés`,
                amount: eur(150),
                sitaly: true,
              },
              {
                title: "Budget publicitaire Google",
                desc: "Versé directement à Google, pas à Sitaly",
                amount: eur(1000),
                sitaly: false,
              },
            ].map((l) => (
              <li
                key={l.title}
                className={`flex flex-wrap items-center justify-between gap-2 rounded-xl border px-4 py-3.5 ${
                  l.sitaly ? "border-accent/30 bg-accent/5" : "border-border bg-secondary/40"
                }`}
              >
                <div>
                  <div className="font-semibold">{l.title}</div>
                  <div className="text-sm text-muted-foreground">{l.desc}</div>
                </div>
                <div className="font-display text-xl font-extrabold tracking-tight">{l.amount}</div>
              </li>
            ))}
          </ul>
          <div className="mt-5 flex flex-wrap items-center justify-between gap-2 border-t border-border pt-5">
            <div>
              <div className="font-display text-lg font-bold">Coût total du mois</div>
              <div className="text-sm text-muted-foreground">
                Dont {eur(449)} pour Sitaly et {eur(1000)} pour Google
              </div>
            </div>
            <div className="font-display text-3xl font-extrabold tracking-tight">{eur(1449)}</div>
          </div>
          <p className="mt-5 flex items-start gap-2 rounded-xl border border-border bg-secondary/40 px-4 py-3 text-sm text-muted-foreground">
            <ShieldCheck className="mt-0.5 h-4 w-4 shrink-0 text-accent" />
            Si vous dépensez moins en publicité un mois, la part variable baisse d'autant. Elle suit
            toujours la dépense réelle.
          </p>
        </div>

        <div className="mx-auto mt-8 flex max-w-4xl justify-center">
          <a
            href={CALENDLY_URL}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center justify-center gap-2 rounded-xl bg-primary px-6 py-3.5 text-base font-semibold text-primary-foreground shadow-elevated transition hover:opacity-90"
          >
            <Calendar className="h-5 w-5" />
            Demander un accompagnement
          </a>
        </div>
      </section>

      {/* Pourquoi nous */}
      <section className="border-y border-border bg-secondary/40">
        <div className="mx-auto max-w-7xl px-4 py-20 sm:px-6 sm:py-24">
          <div className="mx-auto max-w-2xl text-center">
            <div className="text-xs font-semibold uppercase tracking-wider text-accent">
              Travailler avec nous
            </div>
            <h2 className="mt-2 font-display text-3xl font-extrabold tracking-tight sm:text-4xl">
              Pourquoi confier vos campagnes à Sitaly plutôt que les gérer seul
            </h2>
            <p className="mt-4 text-muted-foreground sm:text-lg">
              Google Ads dépense votre argent avec ou sans pilotage. La différence se joue sur la
              méthode et la régularité.
            </p>
          </div>
          <div className="mt-12 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
            {RAISONS.map((r) => (
              <div
                key={r.title}
                className="rounded-2xl border border-border bg-card p-6 shadow-soft"
              >
                <div className="grid h-11 w-11 place-items-center rounded-xl bg-accent/10 text-accent">
                  <r.icon className="h-5 w-5" />
                </div>
                <h3 className="mt-4 font-display text-lg font-bold tracking-tight">{r.title}</h3>
                <p className="mt-2 text-[15px] leading-relaxed text-muted-foreground">{r.desc}</p>
              </div>
            ))}
          </div>
          <div className="mx-auto mt-10 flex max-w-3xl flex-col items-center justify-between gap-3 rounded-2xl border border-border bg-card px-5 py-4 shadow-soft sm:flex-row">
            <p className="text-sm text-muted-foreground">
              <span className="font-semibold text-foreground">
                Vos clients cherchent aussi dans ChatGPT ?
              </span>{" "}
              Nous pilotons également des campagnes ChatGPT Ads, à 890 €/mois + 10 % du budget
              publicitaire.
            </p>
            <a
              href="/chatgpt-ads/"
              className="inline-flex shrink-0 items-center gap-1.5 text-sm font-semibold text-accent hover:underline"
            >
              Voir ChatGPT Ads
              <ArrowRight className="h-4 w-4" />
            </a>
          </div>
        </div>
      </section>

      {/* FAQ */}
      <section id="faq" className="mx-auto max-w-3xl px-4 py-20 sm:px-6 sm:py-24">
        <div className="mx-auto max-w-2xl text-center">
          <div className="text-xs font-semibold uppercase tracking-wider text-accent">FAQ</div>
          <h2 className="mt-2 font-display text-3xl font-extrabold tracking-tight sm:text-4xl">
            Questions fréquentes
          </h2>
          <p className="mt-4 text-muted-foreground sm:text-lg">
            Le tarif, le budget, l'engagement : les réponses sans détour.
          </p>
        </div>
        <div className="mt-10 space-y-3">
          {FAQ.map((it, i) => (
            <FaqItem key={it.q} item={it} defaultOpen={i === 0} />
          ))}
        </div>
      </section>

      {/* CTA final */}
      <section className="hero-bg border-t border-border">
        <div className="mx-auto max-w-3xl px-4 py-20 text-center sm:px-6 sm:py-24">
          <h2 className="font-display text-3xl font-extrabold tracking-tight sm:text-4xl">
            Votre prochain client cherche peut-être déjà vos services{" "}
            <span className="gradient-text">sur Google.</span>
          </h2>
          <p className="mt-4 text-lg text-muted-foreground">
            Mettons en place une stratégie Google Ads adaptée à votre activité et à votre budget. Un
            appel de 20 minutes suffit pour savoir si le canal a du sens pour vous.
          </p>
          <div className="mt-8 flex flex-col justify-center gap-3 sm:flex-row">
            <a
              href={CALENDLY_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center justify-center gap-2 rounded-xl bg-primary px-6 py-3.5 text-base font-semibold text-primary-foreground shadow-elevated transition hover:opacity-90"
            >
              <Calendar className="h-5 w-5" />
              Demander un accompagnement
            </a>
            <a
              href={`tel:${PHONE_TEL}`}
              className="inline-flex items-center justify-center gap-2 rounded-xl border border-border bg-card px-6 py-3.5 text-base font-semibold shadow-soft transition hover:bg-secondary"
            >
              <Phone className="h-5 w-5" />
              {PHONE_DISPLAY}
            </a>
          </div>
          <p className="mt-6 text-sm text-muted-foreground">
            Vous préférez écrire ?{" "}
            <a href="/#contact" className="font-semibold text-accent hover:underline">
              Utilisez le formulaire de contact
            </a>
            .
          </p>
        </div>
      </section>

      <footer className="border-t border-border">
        <div className="mx-auto flex max-w-7xl flex-col items-center justify-between gap-4 px-4 py-8 text-sm text-muted-foreground sm:flex-row sm:px-6">
          <SitalyLogo className="scale-90" />
          <div className="flex flex-wrap items-center justify-center gap-x-6 gap-y-2">
            <Link to="/" className="hover:text-foreground">
              Accueil
            </Link>
            <Link to="/agents-ia" className="hover:text-foreground">
              Agents IA
            </Link>
            <a href="/chatgpt-ads/" className="hover:text-foreground">
              ChatGPT Ads
            </a>
            <Link to="/mentions-legales" className="hover:text-foreground">
              Mentions légales
            </Link>
            <Link to="/cgv" className="hover:text-foreground">
              CGV
            </Link>
            <LinkedInBadge className="h-9 w-9" />
          </div>
        </div>
      </footer>
    </div>
  );
}

/**
 * En-tête réduit : sur une page qui reçoit du trafic publicitaire, chaque lien
 * de navigation est une porte de sortie. Il ne reste que le retour à l'accueil,
 * l'appel et le CTA.
 */
function AcquisitionNav() {
  const [open, setOpen] = useState(false);

  return (
    <header className="sticky top-0 z-50 border-b border-border/60 bg-background/80 backdrop-blur-md">
      <div className="relative mx-auto flex h-16 max-w-7xl items-center justify-between px-4 sm:px-6">
        <Link to="/" aria-label="Retour à sitaly.fr" className="flex items-center">
          <SitalyLogo />
        </Link>
        <div className="flex items-center gap-2">
          <PhoneButton />
          <a
            href={CALENDLY_URL}
            target="_blank"
            rel="noopener noreferrer"
            className="hidden h-11 items-center gap-2 rounded-lg bg-primary px-4 text-sm font-semibold text-primary-foreground shadow-soft transition hover:opacity-90 sm:inline-flex"
          >
            <Calendar className="h-4 w-4" />
            Demander un accompagnement
          </a>
          <button
            type="button"
            onClick={() => setOpen((v) => !v)}
            className="inline-flex h-11 w-11 shrink-0 items-center justify-center rounded-lg border border-border bg-card text-foreground shadow-soft transition hover:border-accent md:hidden"
            aria-label={open ? "Fermer le menu" : "Ouvrir le menu"}
            aria-expanded={open}
            aria-controls="menu-mobile"
          >
            {open ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
          </button>
        </div>

        {open && (
          <div
            id="menu-mobile"
            className="absolute inset-x-0 top-full border-b border-border bg-background px-4 pb-5 shadow-elevated md:hidden sm:px-6"
          >
            <nav className="flex flex-col divide-y divide-border/70 text-sm font-medium text-muted-foreground">
              <a href="#prestations" onClick={() => setOpen(false)} className="py-3">
                Ce que nous prenons en charge
              </a>
              <a href="#fonctionnement" onClick={() => setOpen(false)} className="py-3">
                Comment ça marche
              </a>
              <a href="#tarif" onClick={() => setOpen(false)} className="py-3">
                Tarif
              </a>
              <a href="#faq" onClick={() => setOpen(false)} className="py-3">
                FAQ
              </a>
            </nav>
            <a
              href={CALENDLY_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="mt-4 inline-flex h-11 w-full items-center justify-center gap-2 rounded-lg bg-primary px-4 text-sm font-semibold text-primary-foreground shadow-soft transition hover:opacity-90"
            >
              <Calendar className="h-4 w-4" />
              Demander un accompagnement
            </a>
          </div>
        )}
      </div>
    </header>
  );
}

function FaqItem({ item, defaultOpen }: { item: { q: string; a: string }; defaultOpen: boolean }) {
  const [open, setOpen] = useState(defaultOpen);
  return (
    <div className="overflow-hidden rounded-xl border border-border bg-card shadow-soft">
      <button
        type="button"
        onClick={() => setOpen((v) => !v)}
        aria-expanded={open}
        className="flex w-full items-center justify-between gap-4 px-5 py-4 text-left font-semibold"
      >
        <span>{item.q}</span>
        <ChevronDown
          className={`h-5 w-5 shrink-0 text-muted-foreground transition ${open ? "rotate-180" : ""}`}
        />
      </button>
      {open && (
        <div className="px-5 pb-5 text-[15px] leading-relaxed text-muted-foreground">{item.a}</div>
      )}
    </div>
  );
}
