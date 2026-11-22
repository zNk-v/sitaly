import { CREATEUR_IA as IA, GARANTIE, offre, PHRASE_APERCU, PRIX_APPEL } from "@/data/offres";
import { BASE_URL, euros } from "@/lib/config";
import { createFileRoute, Link } from "@tanstack/react-router";
import { ArrowRight, Check, Phone } from "lucide-react";
import { SiteHeader } from "@/components/SiteHeader";
import { SiteFooter } from "@/components/SiteFooter";
import { SectionHeader } from "@/components/SectionHeader";
import { lienCreation } from "@/components/produit/Produit";
import { directiveRobots } from "@/lib/indexation";
import { SITALY_PHONE, SITALY_PHONE_DISPLAY, SITALY_VILLE } from "@/lib/config";

/**
 * La page locale de Sitaly, décidée le 28 septembre 2026, retournée vers
 * l'application le 20 novembre 2026 (décision de Ted, SITA-76, textes de
 * SITA-84).
 *
 * Elle ne vend plus l'agence : le visiteur du 91 crée son site lui-même dans
 * l'application, gratuitement. Le téléphone reste, mais comme preuve d'ancrage
 * à Brétigny-sur-Orge, pas comme entonnoir de vente : à 39 € par mois, Sitaly
 * ne vend pas client par client (décision du 9 novembre 2026).
 *
 * Une seule page pour le département, et aucune page par ville : des pages
 * qui ne changeraient que le nom de la commune seraient traitées comme des
 * pages satellites.
 *
 * Indexée et au plan du site depuis le même commit que ces textes : /essonne
 * est sortie de PAGES_AGENCE_HORS_INDEX (src/lib/indexation.ts) et listée dans
 * les pages du prérendu (vite.config.ts), puisque aucune page ne la lie.
 *
 * Identité (DESIGN.md §9) : ni adresse de rue, ni invitation à se rencontrer.
 */
const TITRE = "Création de site internet en Essonne (91) avec l'IA | Sitaly";
const DESCRIPTION =
  "Créez le site de votre entreprise en Essonne en une minute : vous décrivez votre activité, l'IA l'écrit, vous publiez. Aperçu gratuit, sans compte ni carte.";
const URL = `${BASE_URL}/essonne/`;

/** Les trois gestes de la création, section 01. */
const ETAPES = [
  {
    titre: "Décrivez votre activité",
    texte:
      "Une phrase suffit : « plombier à Arpajon, dépannage et salle de bain ». L'IA écrit les pages, choisit la mise en page et crée une première photo. La création ne consomme aucun crédit.",
  },
  {
    titre: "Relisez et corrigez en écrivant",
    texte:
      "« Ajoute mes horaires », « une section tarifs », « ton plus chaleureux ». Pour changer un mot, double-cliquez dessus. Une retouche de section coûte 1 crédit, une demande sur tout le site 2, une photo créée par l'IA 5.",
  },
  {
    titre: "Publiez",
    texte:
      "Un clic, et le site est en ligne sur votre-nom.sitaly.fr, avec le cadenas HTTPS, sur téléphone comme sur ordinateur. Relisez avant de publier : une IA peut se tromper, et c'est votre nom sur la page.",
  },
];

/** Ce que le site contient, section 02. */
const CONTENU = [
  {
    titre: "Votre numéro, en haut et cliquable",
    texte:
      "Sur un téléphone, un client qui a une fuite ou une porte bloquée appelle, il ne remplit pas un formulaire. Le numéro se clique depuis l'en-tête.",
  },
  {
    titre: "Vos communes écrites en clair",
    texte:
      "Arpajon, Massy, Étampes : écrivez à l'IA les communes où vous vous déplacez, elle les liste en texte sur la page. Une image de carte ne se référence pas.",
  },
  {
    titre: "Vos prestations, une par une",
    texte:
      "Une section par prestation, avec ce que vous faites et ce que vous ne faites pas. C'est ce découpage qui décide des recherches sur lesquelles vous sortez.",
  },
  {
    titre: "Vos devis et vos factures",
    texte:
      "Un devis que votre client accepte en ligne, une facture qu'il paie par carte ou par virement, sans commission Sitaly. Les devis sont illimités dans toutes les formules.",
  },
  {
    titre: "Vos avis Google",
    texte: `À partir de la formule ${IA.essentiel.nom} : votre fiche est reliée au site, chaque nouvel avis arrive avec sa réponse prête, et vos clients reçoivent la demande d'avis.`,
  },
];

/**
 * Les communes que le visiteur peut nommer sur son site, section 03. Les cinq
 * ajoutées le 20 novembre 2026 (Savigny-sur-Orge, Viry-Châtillon, Athis-Mons,
 * Longjumeau, Dourdan) sont les plus peuplées du département qui manquaient.
 * Une seule liste, et toujours aucune page par ville.
 */
const COMMUNES = [
  "Brétigny-sur-Orge",
  "Saint-Michel-sur-Orge",
  "Sainte-Geneviève-des-Bois",
  "Arpajon",
  "Savigny-sur-Orge",
  "Viry-Châtillon",
  "Athis-Mons",
  "Longjumeau",
  "Évry-Courcouronnes",
  "Corbeil-Essonnes",
  "Massy",
  "Palaiseau",
  "Dourdan",
  "Étampes",
];

/**
 * L'aperçu et les deux formules, section 04. Aucun montant en dur : tout vient
 * de CREATEUR_IA et PRIX_APPEL (src/data/offres.ts), la source de /tarifs/.
 */
const FORMULES_ESSONNE = [
  {
    titre: "L'aperçu, gratuit",
    texte: `${PHRASE_APERCU} Vous créez votre compte gratuitement et vous retouchez le site dans l'éditeur.`,
  },
  {
    titre: `${IA.essentiel.nom} à ${euros(PRIX_APPEL.mensuel)} par mois les ${PRIX_APPEL.mois} premiers mois, puis ${euros(IA.essentiel.mensuel)}`,
    texte: `Votre site en ligne, avec votre nom de domaine en .fr ou en .com, enregistré à votre nom et offert. La mention Sitaly devient discrète, et vous la retirez d'un clic. Factures illimitées, impayés relancés à J+1, J+8 et J+15. Prise de rendez-vous en ligne et avis Google. ${IA.essentiel.credits.toLocaleString("fr-FR")} crédits par mois.`,
  },
  {
    titre: `${IA.pro.nom} à ${euros(IA.pro.mensuel)} par mois`,
    texte: `Notre IA la plus avancée pour écrire les textes, ${IA.pro.credits.toLocaleString("fr-FR")} crédits par mois, et un rendez-vous avec l'équipe pour régler votre site avec vous.`,
  },
];

/* Le prix mensuel de l'offre d'agence, lu à la source comme les autres prix.
   Le repli sur `depart` suit l'idiome de /offres/$id/ pour les offres sans
   mensuel ; Présence en a un. */
const PRESENCE = offre("presence");
const PRESENCE_MENSUEL = euros(PRESENCE.mensuel ?? PRESENCE.depart);

const FAQ = [
  {
    q: "Combien coûte un site internet pour une entreprise de l'Essonne ?",
    a: `L'aperçu est gratuit : vous voyez votre site entier sans compte ni carte. Pour le mettre en ligne, ${IA.essentiel.nom} coûte ${euros(PRIX_APPEL.mensuel)} par mois les ${PRIX_APPEL.mois} premiers mois, puis ${euros(IA.essentiel.mensuel)}, avec votre nom de domaine, et ${IA.pro.nom} ${euros(IA.pro.mensuel)} par mois. Sans engagement au mois, ${GARANTIE.toLowerCase()}. Le prix ne dépend pas de votre commune.`,
  },
  {
    q: "Faut-il être en Essonne pour créer son site avec Sitaly ?",
    a: `Non, l'application marche de partout en France. Ce qui change dans le département, c'est qu'un numéro de l'Essonne décroche : Sitaly est immatriculée à ${SITALY_VILLE}, et Teddy Vidal répond au ${SITALY_PHONE_DISPLAY}.`,
  },
  {
    q: "Mon site sortira-t-il sur Google pour ma commune ?",
    a: "Personne ne peut garantir une place sur Google, et méfiez-vous de qui vous la promet. Votre site part avec les bases : des pages rapides et lisibles sur téléphone, un titre et une description, vos communes écrites en texte, votre fiche d'entreprise lisible par Google et un plan du site.",
  },
  {
    q: "Puis-je écrire moi-même les communes où je me déplace ?",
    a: "Oui. Écrivez-les à l'IA, comme une phrase : « je me déplace à Brétigny, Arpajon et Saint-Michel-sur-Orge ». Elle les reprend sur la page d'accueil et dans vos pages de prestations. Vous en ajoutez une à tout moment.",
  },
  {
    q: "Puis-je envoyer des devis et des factures depuis le site ?",
    a: `Oui. Avec ${IA.essentiel.nom} et ${IA.pro.nom}, les devis et les factures sont illimités, votre client accepte les devis en ligne et les impayés sont relancés à J+1, J+8 et J+15. Votre client paie par carte ou par virement, sans commission Sitaly.`,
  },
  {
    q: "Je préfère qu'on s'occupe de tout : c'est possible ?",
    a: `Oui. L'équipe Sitaly crée le site et le tient à jour, avec la fiche Google et les avis : c'est l'offre Site géré par Sitaly, à ${PRESENCE_MENSUEL} par mois. Appelez le ${SITALY_PHONE_DISPLAY}, ou laissez votre numéro en bas de sa page.`,
  },
];

const HORAIRES = "du lundi au vendredi de 8 h à 19 h, le samedi de 9 h à 13 h";

/** Espace insécable avant « : ; ? ! » dans les grands titres. */
function insecable(texte: string): string {
  return texte.replace(/ ([:;?!])/g, " $1");
}

export const Route = createFileRoute("/essonne")({
  head: () => ({
    meta: [
      { title: TITRE },
      { name: "description", content: DESCRIPTION },
      { name: "robots", content: directiveRobots("/essonne") },
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
            Créez le site de votre entreprise <span className="accent-word">en Essonne</span>
          </h1>
          <p className="measure mt-6 text-lg leading-relaxed text-foreground/75 sm:text-xl">
            Sitaly est installée à {SITALY_VILLE}. Son application écrit le site de votre entreprise
            à partir d'une phrase : votre métier, votre commune, ce que vous faites. Vous relisez,
            vous corrigez en écrivant votre demande, puis vous publiez sur votre-nom.sitaly.fr avec{" "}
            {IA.essentiel.nom} ou {IA.pro.nom}. L'aperçu est gratuit, sans compte ni carte. Si vous
            voulez parler à quelqu'un du département avant de commencer, Teddy Vidal répond au{" "}
            <a
              href={`tel:${SITALY_PHONE}`}
              className="font-semibold text-brand-ink hover:underline"
            >
              {SITALY_PHONE_DISPLAY}
            </a>
            .
          </p>

          <div className="mt-9 flex flex-wrap items-center gap-3">
            <a href={lienCreation()} className="bouton px-7 py-3.5">
              Voir mon site gratuitement
              <ArrowRight className="bouton-fleche h-4 w-4" />
            </a>
            <a href={`tel:${SITALY_PHONE}`} className="bouton-secondaire px-6 py-3.5">
              <Phone className="h-4 w-4" />
              {SITALY_PHONE_DISPLAY}
            </a>
          </div>

          <ul className="mt-10 flex flex-wrap gap-x-8 gap-y-3 border-t border-border pt-6 text-sm font-medium">
            {[
              "Aperçu gratuit, sans compte ni carte",
              "Écrit en une minute environ",
              `Teddy à ${SITALY_VILLE}, au ${SITALY_PHONE_DISPLAY}`,
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
        {/* 01. Les trois gestes de la création. */}
        <section className="py-20 sm:py-28">
          <div className="mx-auto max-w-7xl px-4 sm:px-6">
            <SectionHeader
              index="01"
              eyebrow="Comment ça marche"
              title={
                <>
                  Votre site, <span className="accent-word">en trois gestes</span>
                </>
              }
            />
            <div className="mt-14 grid gap-x-10 gap-y-10 border-t border-border pt-10 sm:grid-cols-2">
              {ETAPES.map((e) => (
                <div key={e.titre}>
                  <h3 className="font-display text-xl font-bold tracking-tight">{e.titre}</h3>
                  <p className="mt-3 leading-relaxed text-muted-foreground">{e.texte}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* 02. Ce que le site contient, du point de vue du client du 91. */}
        <section className="bg-paper-sunk py-20 sm:py-28">
          <div className="mx-auto max-w-7xl px-4 sm:px-6">
            <SectionHeader
              index="02"
              eyebrow="Le site"
              title={
                <>
                  Ce qu'un client <span className="accent-word">du 91</span> cherche sur votre site
                </>
              }
            />
            <div className="mt-14 grid gap-x-10 gap-y-10 border-t border-border pt-10 sm:grid-cols-2">
              {CONTENU.map((c) => (
                <div key={c.titre}>
                  <h3 className="font-display text-xl font-bold tracking-tight">{c.titre}</h3>
                  <p className="mt-3 leading-relaxed text-muted-foreground">{c.texte}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* 03. Les communes, en toutes lettres. Une liste, pas une page par ville. */}
        <section className="py-20 sm:py-28">
          <div className="mx-auto max-w-7xl px-4 sm:px-6">
            <SectionHeader
              index="03"
              eyebrow="Zone"
              title={
                <>
                  Les communes que <span className="accent-word">votre site peut nommer</span>
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
              Et toutes les autres communes du département. Écrivez à l'IA celles où vous vous
              déplacez : elle les reprend sur votre site, dans la page d'accueil et dans vos pages
              de prestations. C'est ce que fait un site qui sort sur « votre métier + votre commune
              », et vous les écrivez en une phrase.
            </p>
          </div>
        </section>

        {/* 04. Les formules. Aucun montant en dur : tout vient de src/data/offres.ts. */}
        <section className="bg-paper-sunk py-20 sm:py-28">
          <div className="mx-auto max-w-7xl px-4 sm:px-6">
            <SectionHeader
              index="04"
              eyebrow="Tarifs"
              title={
                <>
                  Gratuit <span className="accent-word">pour voir</span>, payant pour publier
                </>
              }
            />
            <div className="mt-14 grid gap-x-10 gap-y-10 border-t border-border pt-10 sm:grid-cols-2">
              {FORMULES_ESSONNE.map((f) => (
                <div key={f.titre}>
                  <h3 className="font-display text-xl font-bold tracking-tight">{f.titre}</h3>
                  <p className="mt-3 leading-relaxed text-muted-foreground">{f.texte}</p>
                </div>
              ))}
            </div>
            <p className="measure mt-10 leading-relaxed text-muted-foreground">
              Sans engagement au mois, ou 15 % de moins à l'année. {GARANTIE} sur le premier
              paiement.
            </p>
            <Link
              to="/tarifs/"
              className="group mt-4 inline-flex items-center gap-1.5 font-semibold text-brand-ink"
            >
              Voir les trois formules
              <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-0.5" />
            </Link>
          </div>
        </section>

        {/* 05. L'interlocuteur. Le téléphone est une preuve d'ancrage, pas un
            entonnoir de vente (décision du 9 novembre 2026). */}
        <section className="py-20 sm:py-28">
          <div className="mx-auto max-w-7xl px-4 sm:px-6">
            <SectionHeader
              index="05"
              eyebrow="Interlocuteur"
              title={
                <>
                  Sitaly est <span className="accent-word">à {SITALY_VILLE}</span>
                </>
              }
            />
            <div className="measure mt-14 space-y-4 border-t border-border pt-10 leading-relaxed text-muted-foreground">
              <p>
                L'application fait le site, et Teddy Vidal répond au téléphone. Sitaly est une
                entreprise de l'Essonne, immatriculée à {SITALY_VILLE} : quand vous appelez, vous
                avez la personne qui écrit le programme, pas un service client à l'autre bout du
                monde.
              </p>
              <p>
                Joignable {HORAIRES}, au{" "}
                <a
                  href={`tel:${SITALY_PHONE}`}
                  className="font-semibold text-brand-ink hover:underline"
                >
                  {SITALY_PHONE_DISPLAY}
                </a>
                . Vous pouvez créer votre site sans jamais appeler, c'est le plus souvent ce qui
                arrive. Pour en savoir plus sur le parcours et l'entreprise :{" "}
                <Link to="/a-propos/" className="font-semibold text-brand-ink hover:underline">
                  à propos de Sitaly
                </Link>
                .
              </p>
            </div>
          </div>
        </section>

        {/* 06. L'offre d'agence, en un paragraphe et deux liens dans le texte :
            discrète, après les formules, sans bouton ni encadré. */}
        <section className="bg-paper-sunk py-20 sm:py-28">
          <div className="mx-auto max-w-7xl px-4 sm:px-6">
            <SectionHeader
              index="06"
              eyebrow="Autre voie"
              title={
                <>
                  Ou laissez-nous <span className="accent-word">le faire</span>
                </>
              }
            />
            <p className="measure mt-14 border-t border-border pt-10 leading-relaxed text-muted-foreground">
              Certains n'ont ni le temps ni l'envie d'écrire leur site, même à une IA. Pour eux,
              l'équipe Sitaly le fait et le tient à jour : cinq pages rédigées, la fiche Google
              gérée et les avis suivis chaque mois, avec un numéro à appeler. C'est l'offre{" "}
              <Link
                to="/offres/$id/"
                params={{ id: PRESENCE.id }}
                className="font-semibold text-brand-ink hover:underline"
              >
                Site géré par Sitaly, {PRESENCE_MENSUEL}/mois
              </Link>
              , et elle porte un bloc pour laisser son numéro. Vous y verrez{" "}
              <Link
                to="/realisations/$slug/"
                params={{ slug: "lafleur-toiture" }}
                className="font-semibold text-brand-ink hover:underline"
              >
                le site de Lafleur Toiture
              </Link>
              , un couvreur de l'Essonne.
            </p>
          </div>
        </section>

        {/* 07. Les questions. Les chaînes de FAQ servent le texte et le JSON-LD. */}
        <section className="py-20 sm:py-28">
          <div className="mx-auto max-w-7xl px-4 sm:px-6">
            <SectionHeader
              index="07"
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
              {insecable("Votre site, ")}
              <span className="accent-word">en une minute</span>
            </h2>
            <p className="mt-5 text-lg text-muted-foreground">
              Décrivez votre activité, relisez ce que l'IA a écrit, publiez. L'aperçu est gratuit
              et ne demande ni compte ni carte. Une question d'abord ? Appelez Teddy.
            </p>
            <div className="mt-9 flex flex-wrap justify-center gap-3">
              <a href={lienCreation()} className="bouton px-7 py-3.5">
                Voir mon site gratuitement
                <ArrowRight className="bouton-fleche h-4 w-4" />
              </a>
              <a href={`tel:${SITALY_PHONE}`} className="bouton-secondaire px-6 py-3.5">
                <Phone className="h-4 w-4" />
                {SITALY_PHONE_DISPLAY}
              </a>
            </div>
          </div>
        </section>
      </main>

      <SiteFooter />

      {/* Barre d'appel mobile : la création à gauche, l'appel à droite. */}
      <div className="fixed inset-x-0 bottom-0 z-50 border-t border-border bg-background/95 px-4 pt-3 pb-[max(0.75rem,env(safe-area-inset-bottom))] shadow-[0_-8px_24px_-16px_oklch(0.2_0.05_300/0.5)] sm:hidden">
        <div className="mx-auto flex max-w-md gap-3">
          <a href={lienCreation()} className="bouton flex-1 px-4 py-3 text-sm">
            Créer mon site
          </a>
          <a href={`tel:${SITALY_PHONE}`} className="bouton-secondaire flex-1 px-4 py-3 text-sm">
            <Phone className="h-4 w-4" aria-hidden="true" />
            Appeler
          </a>
        </div>
      </div>
    </div>
  );
}
