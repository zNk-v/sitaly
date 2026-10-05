import { createFileRoute, Link } from "@tanstack/react-router";
import { ArrowRight, Calendar, Check, Phone } from "lucide-react";
import { SiteHeader } from "@/components/SiteHeader";
import { SiteFooter } from "@/components/SiteFooter";
import { SectionHeader } from "@/components/SectionHeader";
import { getRealisation, srcSetCapture } from "@/data/realisations";
import { BASE_URL } from "@/lib/sitemap";
import {
  CALENDLY_URL,
  SITALY_DEPARTEMENT,
  SITALY_PHONE,
  SITALY_PHONE_DISPLAY,
  SITALY_VILLE,
} from "@/lib/config";

/**
 * La page locale de Sitaly, décidée le 28 septembre 2026.
 *
 * Une seule page pour le département, et aucune page par ville : des pages
 * qui ne changeraient que le nom de la commune seraient traitées comme des
 * pages satellites. Elle ne fait pas partie des familles d'expertise : c'est
 * la porte d'entrée des recherches « agence web Essonne » et « agence web 91 »,
 * qui mène ensuite vers les agents IA, la publicité et le site.
 *
 * Identité (DESIGN.md §9) : ni adresse de rue, ni invitation à se rencontrer.
 * Tout commence par un appel de 30 minutes.
 */
const TITRE = "Agence web, SEO et agents IA en Essonne (91) | Sitaly";
const DESCRIPTION =
  "Agence basée à Brétigny-sur-Orge : agents IA, demandes de chantier pour artisans, référencement local et sites internet en Essonne et Île-de-France.";
const URL = `${BASE_URL}/essonne/`;

const SERVICES = [
  {
    titre: "Des agents IA qui répondent à vos clients",
    texte:
      "Accueil téléphonique, prise de rendez-vous, SMS après un appel manqué, relance des devis. L'agent se présente comme une IA et passe la main à votre équipe dès que la situation le demande.",
    lien: { label: "Agents IA pour PME", to: "/agents-ia/" },
  },
  {
    /* Offre du 5 octobre 2026 : Sitaly paie ses campagnes et livre les
       demandes à une seule entreprise par zone (src/routes/acquisition.tsx). */
    titre: "Des demandes de chantier pour les artisans",
    texte:
      "Nous payons la publicité, nous recevons les demandes des particuliers de votre secteur et nous les transmettons à une seule entreprise par métier et par zone. Les premières sont offertes.",
    lien: { label: "Demandes de chantier", to: "/acquisition/" },
  },
  {
    titre: "Le référencement local",
    texte:
      "Fiche Google Business Profile, avis, cohérence des coordonnées et pages utiles : ce qui vous fait sortir quand quelqu'un cherche votre métier près de chez lui.",
    lien: { label: "Référencement local", to: "/referencement-local/" },
  },
  {
    titre: "Un site internet qui reçoit les demandes",
    texte:
      "Un site sur mesure, hébergé et entretenu chaque mois, qui dit en quelques secondes ce que vous faites, où, et comment vous joindre.",
    lien: { label: "Création de site internet", to: "/creation-site-internet/" },
  },
];

const COMMUNES = [
  "Brétigny-sur-Orge",
  "Saint-Michel-sur-Orge",
  "Sainte-Geneviève-des-Bois",
  "Arpajon",
  "Évry-Courcouronnes",
  "Corbeil-Essonnes",
  "Massy",
  "Palaiseau",
  "Étampes",
];

const FAQ = [
  {
    q: "Intervenez-vous dans toute l'Essonne ?",
    a: "Oui. Sitaly est basée à Brétigny-sur-Orge et travaille avec des entreprises de tout le département, de Massy à Étampes. Le travail se fait au téléphone et à distance : la commune ne change rien au service.",
  },
  {
    q: "Faut-il se déplacer ?",
    a: "Non. Tout commence par un appel de 30 minutes, le diagnostic offert. La suite se fait à distance : proposition écrite, mise en place, puis suivi mensuel.",
  },
  {
    q: "Travaillez-vous hors de l'Essonne ?",
    a: "Oui : dans toute l'Île-de-France, et à distance dans toute la France.",
  },
  {
    q: "Par quoi commencer ?",
    a: "Par le diagnostic offert de 30 minutes. On regarde où vos demandes arrivent, où elles se perdent, et ce qui vaut la peine d'être fait en premier : un agent IA, des campagnes ou le site.",
  },
];

const HORAIRES = "du lundi au vendredi de 8 h à 19 h, le samedi de 9 h à 13 h";

/** Espace insécable avant « : ; ? ! » dans les grands titres. */
function insecable(texte: string): string {
  return texte.replace(/ ([:;?!])/g, " $1");
}

export const Route = createFileRoute("/essonne")({
  head: () => ({
    meta: [
      { title: TITRE },
      { name: "description", content: DESCRIPTION },
      { name: "robots", content: "index, follow, max-snippet:-1, max-image-preview:large" },
      { property: "og:type", content: "website" },
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
              "@type": "WebPage",
              "@id": `${URL}#webpage`,
              url: URL,
              name: TITRE,
              description: DESCRIPTION,
              inLanguage: "fr-FR",
              isPartOf: { "@id": `${BASE_URL}/#website` },
              // L'entité Sitaly vit dans le graphe racine (__root.tsx) : la
              // page s'y rattache, elle n'en crée pas une seconde.
              about: { "@id": `${BASE_URL}/#business` },
            },
            {
              "@type": "BreadcrumbList",
              "@id": `${URL}#breadcrumb`,
              itemListElement: [
                { "@type": "ListItem", position: 1, name: "Accueil", item: `${BASE_URL}/` },
                { "@type": "ListItem", position: 2, name: "Essonne", item: URL },
              ],
            },
            {
              "@type": "FAQPage",
              "@id": `${URL}#faq`,
              mainEntity: FAQ.map((f) => ({
                "@type": "Question",
                name: f.q,
                acceptedAnswer: { "@type": "Answer", text: f.a },
              })),
            },
          ],
        }),
      },
    ],
  }),
  component: Essonne,
});

function Essonne() {
  const lafleur = getRealisation("lafleur-toiture");

  return (
    /* La réserve basse laisse la place à la barre d'appel mobile. */
    <div className="min-h-screen bg-background pb-20 text-foreground sm:pb-0">
      <SiteHeader />

      <section className="on-wash pt-[calc(var(--entete-hauteur)+3rem)] pb-16 sm:pt-[calc(var(--entete-hauteur)+5rem)] sm:pb-24">
        <div className="mx-auto max-w-7xl px-4 sm:px-6">
          <nav aria-label="Fil d'Ariane" className="rail-label text-muted-foreground">
            <Link to="/" className="transition hover:text-brand-ink">
              Accueil
            </Link>
            <span className="px-2 text-muted-foreground">/</span>
            <span>Essonne</span>
          </nav>

          <h1 className="display-hero mt-6 max-w-5xl">
            Agence web et agents IA en Essonne,{" "}
            <span className="accent-word">à {SITALY_VILLE}</span>
          </h1>
          <p className="measure mt-6 text-lg leading-relaxed text-foreground/75 sm:text-xl">
            Sitaly est une micro-agence de l'{SITALY_DEPARTEMENT}. Elle installe des agents IA,
            livre des demandes de chantier aux artisans, travaille le référencement local et crée
            des sites pour les entreprises du département. Un seul interlocuteur, Teddy Vidal, du
            premier appel au suivi mensuel.
          </p>

          <div className="mt-9 flex flex-wrap items-center gap-3">
            <a href={`tel:${SITALY_PHONE}`} className="bouton px-7 py-3.5">
              <Phone className="h-4 w-4" />
              {SITALY_PHONE_DISPLAY}
            </a>
            <a
              href={CALENDLY_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="bouton-secondaire px-6 py-3.5"
            >
              <Calendar className="h-4 w-4" />
              Réserver un diagnostic de 30 min
            </a>
          </div>

          <ul className="mt-10 flex flex-wrap gap-x-8 gap-y-3 border-t border-border pt-6 text-sm font-medium">
            {[
              "Basé à Brétigny-sur-Orge",
              "Diagnostic offert de 30 min",
              "Toute l'Île-de-France",
            ].map((r) => (
              <li key={r} className="flex items-center gap-2">
                <Check className="h-4 w-4 shrink-0 text-signal-ink" />
                {r}
              </li>
            ))}
          </ul>
        </div>
      </section>

      <main>
        {/* 01. Les services, un paragraphe et un lien chacun. */}
        <section className="py-20 sm:py-28">
          <div className="mx-auto max-w-7xl px-4 sm:px-6">
            <SectionHeader
              index="01"
              eyebrow="Services"
              title={
                <>
                  Ce que nous faisons pour les entreprises{" "}
                  <span className="accent-word">de l'Essonne</span>
                </>
              }
            />
            <div className="mt-14 grid gap-x-10 gap-y-10 border-t border-border pt-10 sm:grid-cols-2">
              {SERVICES.map((s) => (
                <div key={s.titre}>
                  <h3 className="font-display text-xl font-bold tracking-tight">{s.titre}</h3>
                  <p className="mt-3 leading-relaxed text-muted-foreground">{s.texte}</p>
                  <Link
                    to={s.lien.to}
                    className="group mt-4 inline-flex items-center gap-1.5 text-sm font-semibold text-brand-ink"
                  >
                    {s.lien.label}
                    <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-0.5" />
                  </Link>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* 02. Les communes, en toutes lettres. Une liste, pas une page par ville. */}
        <section className="bg-paper-sunk py-20 sm:py-28">
          <div className="mx-auto max-w-7xl px-4 sm:px-6">
            <SectionHeader
              index="02"
              eyebrow="Zone"
              title={
                <>
                  Les communes où <span className="accent-word">nous intervenons</span>
                </>
              }
            />
            <ul className="mt-14 flex flex-wrap gap-2 border-t border-border pt-10">
              {COMMUNES.map((c) => (
                <li
                  key={c}
                  className="rounded-full border border-border bg-card px-4 py-2 text-[15px] font-medium"
                >
                  {c}
                </li>
              ))}
            </ul>
            <p className="measure mt-8 leading-relaxed text-muted-foreground">
              Et toutes les autres communes du département. Au-delà, Sitaly travaille dans toute
              l'Île-de-France, et à distance dans toute la France : le diagnostic, la mise en place
              et le suivi se font au téléphone et en ligne.
            </p>
          </div>
        </section>

        {/* 03. Une réalisation dans le département, avec les seuls faits vérifiables. */}
        {lafleur && (
          <section className="py-20 sm:py-28">
            <div className="mx-auto max-w-7xl px-4 sm:px-6">
              <SectionHeader
                index="03"
                eyebrow="Réalisation"
                title={
                  <>
                    Une réalisation <span className="accent-word">en Essonne</span>
                  </>
                }
              />
              <div className="mt-14 grid gap-10 border-t border-border pt-10 lg:grid-cols-[1fr_1.1fr] lg:items-center">
                <figure>
                  <img
                    src={lafleur.capture.small}
                    srcSet={srcSetCapture(lafleur)}
                    sizes="(min-width: 1024px) 40vw, calc(100vw - 2rem)"
                    width={720}
                    height={500}
                    alt="Page d'accueil du site de Lafleur Toiture"
                    loading="lazy"
                    decoding="async"
                    className="block h-auto w-full rounded-2xl border border-border shadow-elevated"
                  />
                  <figcaption className="mt-3 text-xs text-muted-foreground">
                    Capture du site en ligne, prise le {lafleur.captureLe}.
                  </figcaption>
                </figure>
                <div>
                  <h3 className="font-display text-2xl font-bold tracking-tight">
                    Lafleur Toiture, couvreur en Essonne
                  </h3>
                  <p className="mt-3 leading-relaxed text-muted-foreground">
                    Un couvreur dont les clients appellent souvent en urgence. Le site est construit
                    pour que l'appel parte vite.
                  </p>
                  <ul className="mt-6 space-y-3">
                    {[
                      "Numéro cliquable dans l'en-tête, en haut de page, dans la section contact et en pied de page",
                      "Note Google réelle affichée à côté du bouton d'appel",
                      "Communes d'intervention listées en clair",
                      "Fiche Google optimisée",
                      "Site hébergé et entretenu chaque mois",
                    ].map((f) => (
                      <li key={f} className="flex items-start gap-3 text-[15px]">
                        <Check className="mt-0.5 h-4 w-4 shrink-0 text-signal-ink" />
                        <span>{f}</span>
                      </li>
                    ))}
                  </ul>
                  <Link
                    to="/realisations/$slug/"
                    params={{ slug: lafleur.slug }}
                    className="group mt-7 inline-flex items-center gap-1.5 font-semibold text-brand-ink"
                  >
                    Voir l'étude de cas
                    <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-0.5" />
                  </Link>
                </div>
              </div>
            </div>
          </section>
        )}

        {/* 04. L'interlocuteur. Pas de local, pas de rendez-vous en agence :
            tout commence par un appel (DESIGN.md §9). */}
        <section className="bg-paper-sunk py-20 sm:py-28">
          <div className="mx-auto max-w-7xl px-4 sm:px-6">
            <SectionHeader
              index="04"
              eyebrow="Interlocuteur"
              title={
                <>
                  Un seul interlocuteur, <span className="accent-word">à {SITALY_VILLE}</span>
                </>
              }
            />
            <div className="measure mt-14 space-y-4 border-t border-border pt-10 leading-relaxed text-muted-foreground">
              <p>
                Teddy Vidal conçoit, installe et pilote chaque projet. La personne qui décroche au
                premier appel est celle qui règle votre agent, construit vos campagnes et vous
                envoie le compte rendu du mois.
              </p>
              <p>
                Joignable {HORAIRES}, au{" "}
                <a
                  href={`tel:${SITALY_PHONE}`}
                  className="font-semibold text-brand-ink hover:underline"
                >
                  {SITALY_PHONE_DISPLAY}
                </a>
                . Pour en savoir plus sur le parcours et l'entreprise :{" "}
                <Link to="/a-propos/" className="font-semibold text-brand-ink hover:underline">
                  à propos de Sitaly
                </Link>
                .
              </p>
            </div>
          </div>
        </section>

        {/* 05. Les questions, ouvertes sans script. */}
        <section className="py-20 sm:py-28">
          <div className="mx-auto max-w-7xl px-4 sm:px-6">
            <SectionHeader
              index="05"
              eyebrow="Questions"
              title={
                <>
                  Questions <span className="accent-word">fréquentes</span>
                </>
              }
            />
            <div className="mt-14 border-t border-border">
              {FAQ.map((f) => (
                <details key={f.q} className="group border-b border-border">
                  <summary className="flex cursor-pointer list-none items-center justify-between gap-6 py-6 text-left font-display text-lg font-bold tracking-tight marker:content-none sm:text-xl">
                    {f.q}
                    <span
                      aria-hidden="true"
                      className="grid h-8 w-8 shrink-0 place-items-center rounded-full border border-border transition-transform group-open:rotate-45"
                    >
                      <svg
                        viewBox="0 0 12 12"
                        className="h-3 w-3"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="1.8"
                        strokeLinecap="round"
                      >
                        <path d="M6 1.5v9M1.5 6h9" />
                      </svg>
                    </span>
                  </summary>
                  <p className="measure pb-7 leading-relaxed text-muted-foreground">{f.a}</p>
                </details>
              ))}
            </div>
          </div>
        </section>

        <section className="relative overflow-hidden py-20 sm:py-28">
          <div className="absolute inset-0 -z-10 hero-bg" aria-hidden="true" />
          <div className="mx-auto max-w-3xl px-4 text-center sm:px-6">
            <h2 className="display-section">
              {insecable("On en parle ")}
              <span className="accent-word">trente minutes</span>
              {insecable(" ?")}
            </h2>
            <p className="mt-5 text-lg text-muted-foreground">
              Un appel, pas un déplacement. Vous décrivez votre activité, on dit ce qui est faisable
              et par quoi commencer. Le chiffrage arrive par écrit, sans engagement.
            </p>
            <div className="mt-9 flex flex-wrap justify-center gap-3">
              <a href={`tel:${SITALY_PHONE}`} className="bouton px-7 py-3.5">
                <Phone className="h-4 w-4" />
                {SITALY_PHONE_DISPLAY}
              </a>
              <a
                href={CALENDLY_URL}
                target="_blank"
                rel="noopener noreferrer"
                className="bouton-secondaire px-6 py-3.5"
              >
                <Calendar className="h-4 w-4" />
                Réserver un diagnostic de 30 min
              </a>
            </div>
          </div>
        </section>
      </main>

      <SiteFooter />

      {/* Barre d'appel mobile, reprise de /carte : sur un téléphone, le numéro
          reste à portée de pouce pendant toute la lecture. */}
      <div className="fixed inset-x-0 bottom-0 z-50 border-t border-border bg-background/95 px-4 pt-3 pb-[max(0.75rem,env(safe-area-inset-bottom))] shadow-[0_-8px_24px_-16px_oklch(0.2_0.05_300/0.5)] sm:hidden">
        <div className="mx-auto flex max-w-md gap-3">
          <a href={`tel:${SITALY_PHONE}`} className="bouton flex-1 px-4 py-3 text-sm">
            <Phone className="h-4 w-4" aria-hidden="true" />
            Appeler
          </a>
          <a
            href={CALENDLY_URL}
            target="_blank"
            rel="noopener noreferrer"
            className="bouton-secondaire flex-1 px-4 py-3 text-sm"
          >
            <Calendar className="h-4 w-4" aria-hidden="true" />
            Réserver
          </a>
        </div>
      </div>
    </div>
  );
}
