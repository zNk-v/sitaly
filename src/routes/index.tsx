import { createFileRoute, Link } from "@tanstack/react-router";
import { useState, useRef } from "react";
import { ArrowRight, Calendar, Check, Linkedin, Phone, Plus } from "lucide-react";
import { SectionHeader } from "@/components/SectionHeader";
import { RealisationsCarousel } from "@/components/RealisationsCarousel";
import { SiteHeader } from "@/components/SiteHeader";
import { SiteFooter } from "@/components/SiteFooter";
import { LINKEDIN_URL } from "@/components/LinkedinLink";
import { Ouverture } from "@/components/accueil/Ouverture";
import { Constat } from "@/components/accueil/Constat";
import { Manifeste } from "@/components/accueil/Manifeste";
import { AllerPlusLoin, Detail, Formats } from "@/components/accueil/Services";
import { Avis } from "@/components/accueil/Avis";
import { Process } from "@/components/accueil/Process";
import { BlogCard } from "@/components/BlogCard";
import { TexteAvecLiens } from "@/components/TexteAvecLiens";
import { postsALaUne } from "@/data/blog-posts";
import { useRevealOnScroll } from "@/hooks/use-reveal-on-scroll";
import { useSplitWords } from "@/hooks/use-split-words";
import {
  CALENDLY_URL,
  FORM_ENDPOINT,
  SITALY_CODE_POSTAL,
  SITALY_PHONE,
  SITALY_PHONE_DISPLAY,
  SITALY_VILLE,
} from "@/lib/config";
import { envoyerDemande } from "@/lib/formulaire";
import { texteBrut } from "@/lib/liens-texte";

import teddyMur700 from "@/assets/teddy-mur-700.webp";
import teddyMur1200 from "@/assets/teddy-mur-1200.webp";

/* Recentrage du 18 octobre 2026 : les questions de l'accueil reviennent aux
   sites, le service qui fait tourner Sitaly. Celles sur les agents IA vivent
   sur /agents-ia/. Les prix vivent sur /tarifs/ (src/data/offres.ts). Le JSON-LD reprend ce
   texte mot pour mot, liens retirés. */
const FAQ_ITEMS = [
  {
    q: "Quels types de sites créez-vous ?",
    a: "Des [sites vitrines](/site-vitrine/), des [boutiques en ligne](/site-e-commerce/), des [landing pages](/landing-page/) et des [sites événementiels](/site-evenementiel/), ainsi que la [refonte](/refonte-site-internet/) de sites existants. Chaque site est conçu sur mesure, pour l'action que vous attendez de vos visiteurs : appeler, réserver, acheter ou s'inscrire.",
  },
  {
    q: "Combien de temps faut-il pour créer un site ?",
    a: "Un site vitrine est en ligne 48 heures après l'appel découverte, une fois vos photos et vos informations réunies. Une boutique en ligne ou un site événementiel avec inscriptions demande plus de temps, annoncé avant de commencer.",
  },
  {
    q: "Faut-il fournir les textes et les photos ?",
    a: "Les textes sont écrits par Sitaly. Pour les photos, vos vraies réalisations prises au téléphone valent mieux qu'une banque d'images ; si vous n'en avez pas, on démarre avec des visuels temporaires.",
  },
  {
    q: "Combien coûte un site ?",
    a: "Les prix sont publiés sur la page [tarifs](/tarifs/) : un abonnement mensuel, plus une mise en service payée une fois à la signature. L'abonnement comprend l'hébergement, le nom de domaine, la maintenance et la gestion de votre fiche Google. Toutes les offres sont sans engagement.",
  },
  {
    q: "Le site m'appartient-il ?",
    a: "Un site vitrine reste la propriété de Sitaly : c'est ce qui permet d'inclure sa création, son hébergement et sa maintenance dans une mensualité sans engagement. Si vous partez, votre nom de domaine vous est transféré gratuitement, votre fiche Google reste la vôtre, et vous pouvez racheter le site au prix indiqué sur la page [tarifs](/tarifs/). Une boutique Shopify vous appartient dès le départ.",
  },
  {
    q: "Pouvez-vous reprendre un site fait par quelqu'un d'autre ?",
    a: "Oui. Sitaly reprend la maintenance de sites existants, sous WordPress ou autre : audit de départ, sauvegardes, mises à jour et corrections mineures, pour une mensualité sans engagement ([voir le tarif](/tarifs/#maintenance)). Si le site date trop, une [refonte](/refonte-site-internet/) coûte souvent moins cher que de le maintenir en l'état.",
  },
  {
    q: "Vous faites aussi les agents IA ?",
    a: "Oui, une fois le site en ligne. Sitaly installe des [agents IA](/agents-ia/) qui répondent au téléphone, prennent les rendez-vous et relancent les devis restés sans réponse. Ils sont chiffrés sur devis.",
  },
];

/* Recentrage du 18 octobre 2026, à la demande du client : l'accueil se
   positionne sur la création de sites, ses six formats nommés. Le titre ne
   reprend pas mot pour mot celui de /creation-site-internet/, pour que les
   deux pages ne se disputent pas la même requête. */
const TITRE_ACCUEIL = "Sitaly : création de site vitrine, e-commerce et landing page";
const DESCRIPTION_ACCUEIL =
  "Site vitrine, e-commerce, landing page, refonte ou site événementiel : Sitaly conçoit, héberge et entretient votre site, fiche Google comprise. Essonne et France.";

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

  /* Refonte du 5 octobre 2026 (DESIGN.md §11) : la page suit le parcours et
     les animations de futurdigital.fr. La palette, les polices et la bascule
     en serif italique restent celles de Sitaly. Les sections propres à
     l'accueil vivent dans src/components/accueil/.

     Recentrage du 18 octobre 2026 : les six formats de site passent juste
     sous le premier écran, trois d'entre eux sont détaillés en rangées
     illustrées, les autres services descendent dans « Aller plus loin ».
     Second passage le même jour : les rangées illustrées montent juste sous
     le premier écran, et les six formats passent en défilé horizontal
     épinglé après les chiffres. Les prix vivent sur /tarifs/.
     Leviers et Secteurs quittent l'accueil ; leurs composants restent dans
     le code. Espacements resserrés (py-16/20 au lieu de py-20/28) : deux
     sections voisines additionnaient plus de 220 px de vide. */
  return (
    <div ref={rootRef} className="min-h-screen bg-background text-foreground">
      <SiteHeader accueil premierEcran="sombre" />
      <main>
        <Ouverture />
        <Detail />
        <Constat />
        <Formats />
        <Manifeste />
        <Process />
        <Realisations />
        <Avis />
        <AllerPlusLoin />
        <Fondateur />
        <Faq />
        <Journal />
        <Contact />
      </main>
      <SiteFooter />
    </div>
  );
}

const PHOTO_MUR = `${teddyMur700} 700w, ${teddyMur1200} 1200w`;

/* ---------------- RÉALISATIONS ---------------- */
function Realisations() {
  return (
    <section id="exemples" className="bg-paper pt-16 pb-12 sm:pt-20 sm:pb-14">
      <div className="mx-auto max-w-7xl px-4 sm:px-6">
        <SectionHeader
          eyebrow="Réalisations"
          title={
            <>
              Des sites <span className="accent-word">réellement en ligne</span>
            </>
          }
          subtitle="Trois métiers, trois logiques. Chaque projet a sa page, et chaque site s'ouvre."
        />

        <RealisationsCarousel className="mt-12" />

        <div className="mt-10 flex justify-center">
          <Link to="/realisations/" className="bouton px-7 py-3.5">
            Toutes les réalisations
            <ArrowRight className="bouton-fleche h-5 w-5" />
          </Link>
        </div>
      </div>
    </section>
  );
}

/* ---------------- FONDATEUR ---------------- */
/**
 * La personne derrière Sitaly, à l'endroit où une agence montre son équipe
 * (DESIGN.md §9). Deux photos du même shooting, le texte à la première
 * personne, et les canaux pour le joindre.
 */
function Fondateur() {
  return (
    <section className="bg-paper-sunk py-16 sm:py-20">
      <div className="mx-auto grid max-w-7xl items-center gap-12 px-4 sm:px-6 lg:grid-cols-12 lg:gap-16">
        <div data-reveal className="relative lg:col-span-5">
          <img
            src={teddyMur1200}
            srcSet={PHOTO_MUR}
            sizes="(min-width: 1024px) 480px, 100vw"
            width={1200}
            height={976}
            loading="lazy"
            alt="Teddy Vidal, fondateur de Sitaly"
            className="aspect-[4/5] w-full rounded-[2rem] object-cover object-[50%_25%]"
          />
          <div className="absolute -right-3 -bottom-6 flex items-center gap-3 rounded-2xl border border-border bg-card px-4 py-3 shadow-elevated sm:-right-6">
            <span className="h-2 w-2 rounded-full bg-signal" />
            <span className="text-sm font-semibold">
              Basé à {SITALY_VILLE} ({SITALY_CODE_POSTAL})
            </span>
          </div>
        </div>

        <div className="lg:col-span-7">
          <div className="rail-label text-brand-ink">Qui est derrière</div>
          <h2 data-split className="display-section mt-3">
            Teddy Vidal, <span className="accent-word">celui qui construit vos outils</span>
          </h2>
          <div className="measure mt-7 space-y-4 text-lg leading-relaxed text-muted-foreground">
            <p>
              Sitaly, c'est moi. Je conçois les sites, je tiens les fiches Google à jour et, quand
              c'est utile, j'installe les agents IA et je pilote les campagnes. Vous n'aurez pas un
              commercial à l'appel découverte et un stagiaire sur votre projet.
            </p>
            <p>
              Je travaille avec des artisans, des commerçants et des PME d'Île-de-France et, à
              distance, de toute la France. Pas de rendez-vous à caler trois semaines à l'avance :
              on s'appelle, et on sait tout de suite si ça vaut le coup.
            </p>
          </div>

          <div className="mt-9 flex flex-wrap items-center gap-3">
            <a
              href={CALENDLY_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="bouton px-7 py-3.5"
            >
              <Calendar className="h-5 w-5" />
              Réserver 30 min avec Teddy
            </a>
            <Link to="/a-propos/" className="bouton-secondaire px-7 py-3.5">
              Mon parcours
              <ArrowRight className="h-4 w-4" />
            </Link>
            <a
              href={LINKEDIN_URL}
              target="_blank"
              rel="noopener noreferrer"
              aria-label="Teddy Vidal sur LinkedIn"
              className="grid h-12 w-12 place-items-center rounded-full bg-foreground text-background transition hover:bg-brand-ink"
            >
              <Linkedin className="h-5 w-5" />
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}

/* ---------------- FAQ ---------------- */
/**
 * La FAQ de la référence : le titre à gauche, une invitation à écrire à
 * droite, puis les questions séparées par des filets, un « + » qui pivote.
 * Les réponses restent dans des `details`, donc dans le HTML prérendu,
 * identiques au JSON-LD.
 */
function Faq() {
  return (
    <section id="faq" className="bg-paper py-16 sm:py-20">
      <div className="mx-auto max-w-5xl px-4 sm:px-6">
        <div
          data-reveal
          className="flex flex-col gap-6 md:flex-row md:items-end md:justify-between"
        >
          <h2 data-split className="display-section max-w-xl">
            Vos questions, <span className="accent-word">des réponses claires</span>
          </h2>
          <div className="md:max-w-xs md:text-right">
            <p className="text-muted-foreground">
              Une question qui n'est pas ici ? Écrivez-nous, on vous répond sous 24 h.
            </p>
            <a href="#contact" className="bouton mt-4 px-6 py-3 text-sm">
              Nous contacter
            </a>
          </div>
        </div>

        <div className="mt-12 border-t border-border">
          {FAQ_ITEMS.map((it) => (
            <details key={it.q} className="group border-b border-border">
              <summary className="flex cursor-pointer list-none items-center justify-between gap-6 py-6 text-left text-[17px] font-semibold marker:content-none">
                <span>{it.q}</span>
                <Plus className="h-5 w-5 shrink-0 text-muted-foreground transition-transform duration-300 group-open:rotate-45" />
              </summary>
              <p className="faq-reponse measure pb-6 text-[15px] leading-relaxed text-muted-foreground md:max-w-2xl">
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
    <section id="journal" className="bg-paper-sunk py-16 sm:py-20">
      <div className="mx-auto max-w-7xl px-4 sm:px-6">
        <SectionHeader
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
    /* L'appel final de la référence (« Moins de prestataires à gérer. Plus de
       clients qui vous trouvent. »), sur l'encre, avec le formulaire posé à
       droite. Les chevrons du logo, en filigrane, tiennent la place des
       épingles de carte de Futur Digital. */
    <section id="contact" className="on-ink relative isolate overflow-hidden bg-ink py-16 sm:py-20">
      <svg
        aria-hidden="true"
        viewBox="0 0 400 300"
        className="absolute -top-16 -right-24 -z-10 h-[28rem] w-auto text-white/[0.04]"
        fill="none"
        stroke="currentColor"
        strokeWidth="44"
        strokeLinecap="round"
        strokeLinejoin="round"
      >
        <path d="M40 30l120 120L40 270M190 30l120 120-120 120" />
      </svg>
      <div className="mx-auto max-w-7xl px-4 sm:px-6">
        <div className="grid gap-12 lg:grid-cols-2 lg:items-center lg:gap-16">
          <div data-reveal>
            <h2 data-split className="display-section">
              Parlons de votre site. <span className="accent-word">Réponse sous 24 h.</span>
            </h2>
            <p className="mt-5 text-lg text-white/70">
              Vitrine, boutique, landing page, refonte ou événement : décrivez votre activité en
              deux lignes, et on vous rappelle pour voir quel format vous convient.
            </p>
            <div className="mt-8 flex flex-col gap-3 sm:flex-row sm:items-center">
              <a
                href={CALENDLY_URL}
                target="_blank"
                rel="noopener noreferrer"
                className="bouton px-7 py-3.5"
              >
                <Calendar className="h-5 w-5" />
                Réserver un appel de 30 min
              </a>
              <a
                href={`tel:${SITALY_PHONE}`}
                className="inline-flex items-center justify-center gap-2 rounded-full border border-white/20 px-6 py-3.5 font-semibold whitespace-nowrap text-white transition hover:border-white/50"
              >
                <Phone className="h-4 w-4" />
                {SITALY_PHONE_DISPLAY}
              </a>
            </div>
            <ul className="mt-8 flex flex-wrap gap-x-6 gap-y-2 text-sm text-white/65">
              {["Sans engagement", "Appel offert", "Réponse sous 24 h"].map((t) => (
                <li key={t} className="flex items-center gap-2">
                  <Check className="h-4 w-4 text-signal" />
                  {t}
                </li>
              ))}
            </ul>
          </div>

          <div className="sur-papier">
            <form
              onSubmit={envoyer}
              className="relative rounded-[1.75rem] border border-border bg-card p-6 shadow-elevated sm:p-8"
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
                    Votre application de messagerie s'ouvre avec votre message pré-rempli. Il ne
                    vous reste plus qu'à l'envoyer.
                  </p>
                </div>
              ) : etat === "erreur" ? (
                <div className="py-10 text-center" role="alert">
                  <h3 className="font-display text-xl font-bold">L'envoi n'a pas abouti</h3>
                  <p className="mt-2 text-muted-foreground">
                    Votre demande n'est pas partie. Appelez le {SITALY_PHONE_DISPLAY}, ou envoyez-la
                    par SMS : le message est déjà rédigé.
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
                  <div
                    aria-hidden="true"
                    className="absolute -left-[9999px] h-0 w-0 overflow-hidden"
                  >
                    <label htmlFor="field-website">Ne pas remplir</label>
                    <input
                      id="field-website"
                      name="website"
                      type="text"
                      tabIndex={-1}
                      autoComplete="off"
                    />
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
                        <Link
                          to="/politique-confidentialite/"
                          className="underline underline-offset-2"
                        >
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
        </div>
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
