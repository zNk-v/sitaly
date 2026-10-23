import { createFileRoute, Link } from "@tanstack/react-router";
import { ArrowRight } from "lucide-react";
import { directiveRobots } from "@/lib/indexation";
import { SiteChrome } from "@/components/SiteChrome";
import { VerificateurDomaine } from "@/components/VerificateurDomaine";

const URL = "https://sitaly.fr/outils/verifier-nom-de-domaine/";
const TITLE = "Vérifier si un nom de domaine est libre en .fr et .com (gratuit) | Sitaly";
const DESCRIPTION =
  "Tapez le nom de votre entreprise : l'outil interroge les registres officiels du .fr et du .com et vous dit s'il est libre. Gratuit, sans inscription, sans trace.";

const CONSEILS = [
  {
    titre: "Court et facile à dicter",
    texte:
      "Vous le donnerez au téléphone et l'écrirez sur votre camion. Si vous devez l'épeler, il est trop long.",
  },
  {
    titre: "Le .fr pour une clientèle française",
    texte:
      "Vos clients le reconnaissent et Google le rattache à la France. Prenez le .com en plus s'il est libre, pour que personne ne le prenne à votre place.",
  },
  {
    titre: "Pas d'accent, peu de tirets",
    texte:
      "Les accents posent problème dans les adresses e-mail. Un tiret entre deux mots passe, trois tirets se perdent à l'oral.",
  },
  {
    titre: "Votre nom pris ? Ajoutez la ville",
    texte:
      "dupont-plomberie-evry.fr dit qui vous êtes et où vous travaillez. C'est aussi ce que vos clients tapent dans Google.",
  },
];

export const Route = createFileRoute("/outils/verifier-nom-de-domaine")({
  head: () => ({
    meta: [
      { title: TITLE },
      // Outil pensé pour les artisans, comme les autres outils : hors index
      // (src/lib/indexation.ts), envoyé par lien et repris dans le questionnaire.
      { name: "robots", content: directiveRobots(new globalThis.URL(URL).pathname) },
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
          name: "Vérificateur de nom de domaine",
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
            { "@type": "ListItem", position: 3, name: "Vérifier un nom de domaine", item: URL },
          ],
        }),
      },
    ],
  }),
  component: VerifierNomDeDomaine,
});

function VerifierNomDeDomaine() {
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
              Votre nom de domaine est-il <span className="accent-word text-brand-ink">libre</span>{" "}
              ?
            </h1>
            <p className="measure mt-6 text-lg text-muted-foreground">
              Tapez le nom de votre entreprise. L'outil interroge les registres officiels du .fr et
              du .com et vous répond en une seconde.
            </p>

            <div className="mt-10 max-w-2xl rounded-[1.75rem] border border-border bg-card p-6 shadow-elevated sm:p-8">
              <VerificateurDomaine id="outil-domaine" />
              <p className="mt-5 text-sm text-muted-foreground">
                Votre navigateur interroge directement l'Afnic pour le .fr et Verisign pour le .com.
                Sitaly ne voit pas le nom testé, et aucun bureau d'enregistrement ne peut le
                réserver avant vous.
              </p>
            </div>
          </div>
        </section>

        <section className="py-14 sm:py-20">
          <div className="mx-auto max-w-6xl px-4 sm:px-6">
            <h2 className="font-display text-3xl font-bold tracking-tight">
              Bien choisir son nom de domaine
            </h2>
            <div className="mt-8 grid gap-5 sm:grid-cols-2">
              {CONSEILS.map((c) => (
                <div
                  key={c.titre}
                  className="rounded-2xl border border-border bg-card p-6 shadow-soft"
                >
                  <h3 className="font-display text-lg font-bold">{c.titre}</h3>
                  <p className="mt-2 text-muted-foreground">{c.texte}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        <section className="border-t border-border bg-paper-sunk py-14">
          <div className="mx-auto max-w-3xl px-4 sm:px-6">
            <h2 className="font-display text-2xl font-bold tracking-tight">
              Un nom libre, et ensuite ?
            </h2>
            <div className="mt-4 space-y-4 text-foreground/85">
              <p>
                Un nom libre aujourd'hui peut être réservé demain par quelqu'un d'autre. Le résultat
                vaut au moment de la recherche, pas au moment de votre commande.
              </p>
              <p>
                Avec un site Sitaly, le nom de domaine est compris dans l'abonnement : nous le
                réservons pour vous dès la mise en service, et il vous est transféré gratuitement si
                vous arrêtez l'abonnement.
              </p>
            </div>
            <Link
              to="/mon-projet/"
              search={{ besoin: "site" }}
              className="bouton mt-8 px-6 py-3 text-sm"
            >
              Trouver mon offre
              <ArrowRight className="h-4 w-4" />
            </Link>
          </div>
        </section>
      </SiteChrome>
    </div>
  );
}
