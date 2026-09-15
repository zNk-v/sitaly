import { createFileRoute, Link } from "@tanstack/react-router";
import { useMemo, useState } from "react";
import { ArrowUpRight, Calendar, Check, RotateCcw } from "lucide-react";
import { SiteChrome } from "@/components/SiteChrome";
import { CALENDLY_URL } from "@/lib/config";

const URL = "https://sitaly.fr/outils/audit-fiche-google/";
const TITLE = "Audit gratuit de fiche Google Business Profile : score sur 100 | Sitaly";
const DESCRIPTION =
  "Auditez votre fiche Google Business Profile en 3 minutes : 20 questions, un score sur 100 et les corrections classées par impact. Gratuit, sans inscription.";

/**
 * Les critères et leur poids. Le total fait 100.
 *
 * Les poids suivent ce que Google documente sur le classement local (pertinence,
 * distance, notoriété) et ce qui se constate sur les fiches d'artisans : la
 * catégorie principale et les avis pèsent plus que la description.
 */
type Critere = { id: string; groupe: string; question: string; poids: number; conseil: string };

const CRITERES: Critere[] = [
  {
    id: "verifiee",
    groupe: "Les bases",
    question: "Ma fiche est validée (propriété confirmée) dans Google Business Profile",
    poids: 10,
    conseil:
      "Revendiquez et validez la fiche. Tant qu'elle n'est pas validée, n'importe qui peut suggérer des modifications, et vos réponses aux avis sont impossibles.",
  },
  {
    id: "categorie",
    groupe: "Les bases",
    question:
      "La catégorie principale décrit mon métier exact (« Couvreur », pas « Entreprise de construction »)",
    poids: 10,
    conseil:
      "Choisissez la catégorie la plus précise possible. C'est le premier signal de pertinence que Google utilise pour vous associer à une recherche.",
  },
  {
    id: "secondaires",
    groupe: "Les bases",
    question: "J'ai ajouté des catégories secondaires pour mes autres activités",
    poids: 4,
    conseil:
      "Ajoutez les catégories de vos prestations réelles (par exemple « Service de ravalement de façade »). Chacune élargit les recherches sur lesquelles vous pouvez apparaître.",
  },
  {
    id: "nap",
    groupe: "Les bases",
    question: "Nom, adresse et téléphone sont identiques sur la fiche, le site et les annuaires",
    poids: 6,
    conseil:
      "Harmonisez vos coordonnées partout : même nom d'entreprise, même format d'adresse, même numéro. Les incohérences brouillent le signal de confiance.",
  },
  {
    id: "nom",
    groupe: "Les bases",
    question: "Le nom de la fiche est le nom réel de l'entreprise, sans mots-clés ajoutés",
    poids: 3,
    conseil:
      "Retirez les mots-clés ajoutés au nom (« Dupont Couverture Toiture Pas Cher Lyon »). Google peut suspendre une fiche pour ça, et un concurrent peut le signaler.",
  },
  {
    id: "zone",
    groupe: "Les bases",
    question: "La zone desservie liste les communes où j'interviens",
    poids: 4,
    conseil:
      "Renseignez vos communes ou départements d'intervention. Ils aident Google et rassurent le client qui cherche un artisan qui se déplace chez lui.",
  },
  {
    id: "horaires",
    groupe: "Les bases",
    question: "Mes horaires sont renseignés, y compris les jours fériés",
    poids: 4,
    conseil:
      "Complétez les horaires et les horaires exceptionnels. Une fiche affichée « fermé » au moment de la recherche perd l'appel.",
  },
  {
    id: "site",
    groupe: "Les bases",
    question: "Le lien vers mon site pointe vers une page qui fonctionne sur mobile",
    poids: 4,
    conseil:
      "Liez la fiche à votre site, idéalement à une page qui parle de votre zone. Sans site, le client qui veut vérifier votre sérieux part chez un concurrent.",
  },
  {
    id: "nbavis",
    groupe: "Les avis",
    question: "J'ai plus de 20 avis Google",
    poids: 8,
    conseil:
      "Mettez en place une demande d'avis systématique après chaque chantier, par SMS avec le lien court de la fiche. Le volume d'avis pèse sur le classement et sur le taux de clic.",
  },
  {
    id: "recents",
    groupe: "Les avis",
    question: "J'ai reçu au moins un avis ce mois-ci",
    poids: 6,
    conseil:
      "Des avis réguliers valent mieux qu'un pic il y a deux ans. Faites de la demande d'avis une étape de fin de chantier, comme la facture.",
  },
  {
    id: "note",
    groupe: "Les avis",
    question: "Ma note moyenne est de 4,5 ou plus",
    poids: 5,
    conseil:
      "Répondez aux avis négatifs avec calme et précision, et sollicitez les clients satisfaits : ce sont eux qui oublient de laisser un avis.",
  },
  {
    id: "reponses",
    groupe: "Les avis",
    question: "Je réponds à tous les avis, positifs comme négatifs",
    poids: 5,
    conseil:
      "Répondez à chaque avis sous quelques jours. Le prospect lit vos réponses, et une réponse posée à un avis négatif rassure plus qu'une note parfaite.",
  },
  {
    id: "photos",
    groupe: "Le contenu",
    question: "J'ai publié plus de 20 photos de chantiers réels",
    poids: 8,
    conseil:
      "Publiez vos photos de chantiers, de l'équipe et du véhicule. Les photos réelles distinguent un artisan installé d'une plateforme d'appels anonyme.",
  },
  {
    id: "photosrecentes",
    groupe: "Le contenu",
    question: "J'ai ajouté des photos ces trois derniers mois",
    poids: 3,
    conseil:
      "Ajoutez les photos de chaque chantier terminé. Une fiche vivante inspire plus confiance qu'une fiche figée depuis l'ouverture.",
  },
  {
    id: "logo",
    groupe: "Le contenu",
    question: "Le logo et la photo de couverture sont en place",
    poids: 2,
    conseil:
      "Ajoutez un logo lisible et une photo de couverture qui montre un chantier ou votre équipe.",
  },
  {
    id: "description",
    groupe: "Le contenu",
    question: "La description présente mes prestations et ma zone en quelques phrases",
    poids: 4,
    conseil:
      "Rédigez une description concrète : ce que vous faites, où, depuis quand, avec quelles garanties. Évitez la liste de mots-clés.",
  },
  {
    id: "services",
    groupe: "Le contenu",
    question: "La rubrique Services liste mes prestations une par une",
    poids: 5,
    conseil:
      "Détaillez chaque prestation dans la rubrique Services. Google s'en sert pour comprendre sur quelles recherches vous montrer.",
  },
  {
    id: "posts",
    groupe: "Le contenu",
    question: "J'ai publié un post (actualité, chantier, offre) ce mois-ci",
    poids: 4,
    conseil:
      "Publiez un post par mois : un chantier terminé, une période de disponibilité, un conseil saisonnier. C'est rapide et ça montre une entreprise active.",
  },
  {
    id: "questions",
    groupe: "Le contenu",
    question: "Je surveille et réponds aux questions posées sur ma fiche",
    poids: 3,
    conseil:
      "Répondez aux questions posées sur la fiche avant qu'un inconnu ne le fasse à votre place, parfois mal.",
  },
  {
    id: "appels",
    groupe: "Le contenu",
    question: "Je consulte les statistiques de la fiche (appels, itinéraires, clics)",
    poids: 2,
    conseil:
      "Regardez chaque mois les appels et clics issus de la fiche. C'est la mesure la plus directe de ce qu'elle vous rapporte.",
  },
];

const TOTAL = CRITERES.reduce((s, c) => s + c.poids, 0);
const GROUPES = Array.from(new Set(CRITERES.map((c) => c.groupe)));

function verdict(score: number) {
  if (score >= 85)
    return {
      titre: "Fiche solide",
      texte:
        "Votre fiche coche l'essentiel. Le gain se joue maintenant sur la régularité des avis et des photos, et sur un site qui transforme les visites en appels.",
    };
  if (score >= 60)
    return {
      titre: "Bonne base, des points faciles à gagner",
      texte:
        "Les fondations sont là. Les corrections ci-dessous, prises dans l'ordre, peuvent vous faire monter dans le bloc des trois résultats locaux.",
    };
  if (score >= 35)
    return {
      titre: "Fiche sous-exploitée",
      texte:
        "Des concurrents mieux tenus passent probablement devant vous sur votre propre commune. Commencez par les corrections qui pèsent le plus.",
    };
  return {
    titre: "Fiche à reprendre",
    texte:
      "En l'état, la fiche vous rapporte peu d'appels. La bonne nouvelle : c'est le levier le moins cher du référencement local, et les premières corrections se font en une heure.",
  };
}

export const Route = createFileRoute("/outils/audit-fiche-google")({
  head: () => ({
    meta: [
      { title: TITLE },
      { name: "description", content: DESCRIPTION },
      { property: "og:title", content: TITLE },
      { property: "og:description", content: DESCRIPTION },
      { property: "og:url", content: URL },
    ],
    links: [{ rel: "canonical", href: URL }],
    scripts: [
      {
        type: "application/ld+json",
        children: JSON.stringify({
          "@context": "https://schema.org",
          "@type": "WebApplication",
          name: "Audit de fiche Google Business Profile",
          description: DESCRIPTION,
          url: URL,
          applicationCategory: "BusinessApplication",
          operatingSystem: "Tous navigateurs",
          offers: { "@type": "Offer", price: "0", priceCurrency: "EUR" },
          provider: { "@type": "Organization", name: "Sitaly", url: "https://sitaly.fr" },
        }),
      },
      {
        type: "application/ld+json",
        children: JSON.stringify({
          "@context": "https://schema.org",
          "@type": "BreadcrumbList",
          itemListElement: [
            { "@type": "ListItem", position: 1, name: "Accueil", item: "https://sitaly.fr/" },
            { "@type": "ListItem", position: 2, name: "Outils", item: "https://sitaly.fr/outils/" },
            { "@type": "ListItem", position: 3, name: "Audit de fiche Google", item: URL },
          ],
        }),
      },
    ],
  }),
  component: AuditFicheGoogle,
});

function AuditFicheGoogle() {
  const [coches, setCoches] = useState<Record<string, boolean>>({});
  const [termine, setTermine] = useState(false);

  const score = useMemo(
    () =>
      Math.round((CRITERES.reduce((s, c) => s + (coches[c.id] ? c.poids : 0), 0) / TOTAL) * 100),
    [coches],
  );
  const manquants = CRITERES.filter((c) => !coches[c.id]).sort((a, b) => b.poids - a.poids);
  const v = verdict(score);

  return (
    <div className="min-h-screen bg-background text-foreground">
      <SiteChrome>
        <section className="hero-bg relative overflow-hidden">
          <div className="mx-auto max-w-7xl px-4 py-16 sm:px-6 sm:py-24">
            <div className="rail-label text-brand-ink">
              <Link to="/outils/" className="hover:underline">
                Outils gratuits
              </Link>
            </div>
            <h1 className="display-hero mt-4 max-w-4xl">
              Audit de votre <span className="accent-word text-brand-ink">fiche Google</span>
            </h1>
            <p className="measure mt-6 text-lg text-muted-foreground">
              Ouvrez votre fiche Google Business Profile dans un autre onglet et cochez ce qui est
              vrai aujourd'hui. Vous obtenez un score sur 100 et les corrections classées par
              impact. Rien n'est envoyé ni enregistré.
            </p>
          </div>
        </section>

        <section className="py-14 sm:py-20">
          <div className="mx-auto grid max-w-6xl gap-10 px-4 sm:px-6 lg:grid-cols-[1fr_320px]">
            <div className="space-y-10">
              {GROUPES.map((g) => (
                <fieldset key={g}>
                  <legend className="font-display text-2xl font-bold tracking-tight">{g}</legend>
                  <div className="mt-4 divide-y divide-border rounded-2xl border border-border bg-card">
                    {CRITERES.filter((c) => c.groupe === g).map((c) => (
                      <label
                        key={c.id}
                        className="flex cursor-pointer items-start gap-3.5 px-5 py-4 transition hover:bg-accent/5"
                      >
                        <input
                          type="checkbox"
                          checked={Boolean(coches[c.id])}
                          onChange={(e) => setCoches((p) => ({ ...p, [c.id]: e.target.checked }))}
                          className="mt-1 h-4 w-4 flex-shrink-0 accent-[var(--blue)]"
                        />
                        <span className="text-foreground/90">{c.question}</span>
                      </label>
                    ))}
                  </div>
                </fieldset>
              ))}
              <button
                type="button"
                onClick={() => setTermine(true)}
                className="bouton px-7 py-3.5 text-sm"
              >
                Voir mes corrections prioritaires
              </button>
            </div>

            <aside className="lg:sticky lg:top-[calc(var(--entete-hauteur)+1.5rem)] lg:self-start">
              <div
                className="rounded-2xl border border-border bg-card p-6 shadow-soft"
                aria-live="polite"
              >
                <div className="rail-label text-muted-foreground">Votre score</div>
                <div className="mt-2 font-display text-6xl font-extrabold tabular-nums tracking-tight">
                  {score}
                  <span className="text-2xl text-muted-foreground">/100</span>
                </div>
                <div
                  className="mt-4 h-2 overflow-hidden rounded-full bg-secondary"
                  role="presentation"
                >
                  <div
                    className="h-full rounded-full bg-accent transition-[width] duration-300"
                    style={{ width: `${score}%` }}
                  />
                </div>
                <p className="mt-4 font-semibold">{v.titre}</p>
                <p className="mt-1 text-sm text-muted-foreground">{v.texte}</p>
              </div>
            </aside>
          </div>
        </section>

        {termine && (
          <section className="border-t border-border bg-paper-sunk py-14 sm:py-20">
            <div className="mx-auto max-w-3xl px-4 sm:px-6">
              <h2 className="display-section">
                {manquants.length === 0 ? (
                  <>
                    Rien à corriger, <span className="accent-word">bravo</span>
                  </>
                ) : (
                  <>
                    Vos corrections, <span className="accent-word">par ordre d'impact</span>
                  </>
                )}
              </h2>
              <ol className="mt-8 space-y-5">
                {manquants.map((c, i) => (
                  <li key={c.id} className="flex gap-4">
                    <span className="rail-num mt-0.5 w-6 flex-shrink-0 text-sm font-bold text-brand-ink">
                      {String(i + 1).padStart(2, "0")}
                    </span>
                    <div>
                      <p className="font-semibold">{c.question}</p>
                      <p className="mt-1 text-foreground/80">{c.conseil}</p>
                    </div>
                  </li>
                ))}
              </ol>
              <div className="mt-10 flex flex-wrap gap-3">
                <a
                  href={CALENDLY_URL}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="bouton px-6 py-3 text-sm"
                >
                  <Calendar className="h-4 w-4" />
                  Faire corriger ma fiche
                  <ArrowUpRight className="h-4 w-4" />
                </a>
                <button
                  type="button"
                  onClick={() => {
                    setCoches({});
                    setTermine(false);
                  }}
                  className="bouton-secondaire px-6 py-3 text-sm"
                >
                  <RotateCcw className="h-4 w-4" />
                  Recommencer
                </button>
              </div>
              <p className="mt-8 text-sm text-muted-foreground">
                Pour aller plus loin, lisez le{" "}
                <Link
                  to="/blog/$slug/"
                  params={{ slug: "fiche-google-business-profile-artisan" }}
                  className="font-semibold text-accent hover:underline"
                >
                  guide d'optimisation de la fiche Google
                </Link>{" "}
                et la{" "}
                <Link
                  to="/blog/$slug/"
                  params={{ slug: "recolter-avis-google-artisan" }}
                  className="font-semibold text-accent hover:underline"
                >
                  méthode pour récolter des avis
                </Link>
                .
              </p>
            </div>
          </section>
        )}

        <section className="py-14">
          <div className="mx-auto max-w-3xl px-4 sm:px-6">
            <h2 className="font-display text-2xl font-bold tracking-tight">
              Comment le score est calculé
            </h2>
            <p className="mt-4 text-foreground/85">
              Chaque critère a un poids. Google indique classer les résultats locaux selon la
              pertinence, la distance et la notoriété. La catégorie principale, la validation de la
              fiche et le volume d'avis pèsent donc plus que le logo ou les questions-réponses. Le
              score donne une priorité de travail, pas une position garantie : la distance entre le
              client et votre adresse reste hors de votre contrôle.
            </p>
            <ul className="mt-6 space-y-2 text-sm text-muted-foreground">
              <li className="flex gap-2">
                <Check className="mt-0.5 h-4 w-4 flex-shrink-0 text-accent" />
                Gratuit, sans inscription, sans collecte de données.
              </li>
              <li className="flex gap-2">
                <Check className="mt-0.5 h-4 w-4 flex-shrink-0 text-accent" />
                Valable pour tous les métiers qui reçoivent des clients ou se déplacent chez eux.
              </li>
            </ul>
          </div>
        </section>
      </SiteChrome>
    </div>
  );
}
