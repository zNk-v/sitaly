import { createFileRoute } from "@tanstack/react-router";
import { MetierLanding, buildMetierMeta } from "@/components/MetierLanding";

const URL = "https://sitaly.fr/site-internet-menuisier";
const TITLE = "Site internet menuisier : portfolio & devis | Sitaly dès 149€/mois";
const DESCRIPTION =
  "Site internet menuisier avec portfolio avant/après, devis en ligne et SEO local. Livré en 48h, dès 149€/mois en location, sans engagement et tout inclus.";

const FAQ = [
  {
    q: "Le site mettra-t-il bien en valeur mes réalisations ?",
    a: "Oui : galerie portfolio avec photos avant/après, par type d'ouvrage (escaliers, dressings, agencement, fenêtres bois...). Chaque réalisation peut avoir sa propre fiche pour le SEO.",
  },
  {
    q: "Puis-je proposer un configurateur de devis ?",
    a: "Possible en option (cuisine sur mesure, dressing, escalier). Pré-qualifie le prospect et fait gagner 1 à 2h de devis par projet.",
  },
  {
    q: "Comment je rentabilise un site à 149€/mois en menuiserie ?",
    a: "1 seul chantier de cuisine ou dressing rapporte généralement 3 000 à 10 000€. Un seul appel converti via votre site dans l'année rentabilise très largement l'abonnement.",
  },
  {
    q: "Travaillez-vous avec les artisans menuisiers d'agencement pro ?",
    a: "Oui, nous travaillons aussi bien avec les menuisiers particuliers que pros (agencement boutiques, bureaux). Le parcours et les pages sont adaptés à votre clientèle cible.",
  },
];

export const Route = createFileRoute("/site-internet-menuisier")({
  head: () =>
    buildMetierMeta({
      title: TITLE,
      description: DESCRIPTION,
      url: URL,
      metier: "menuisier",
      faq: FAQ,
    }),
  component: MenuisierLanding,
});

function MenuisierLanding() {
  return (
    <MetierLanding
      metier="menuisier"
      metierCapitalized="Menuisier"
      h1="Site internet menuisier qui transforme vos photos en clients"
      intro="Un portfolio qui sublime votre savoir-faire, des fiches projets optimisées SEO et un parcours devis fluide. Vos plus belles réalisations deviennent vos meilleurs commerciaux."
      benefits={[
        {
          title: "Portfolio avant/après",
          desc: "Galerie sublimée, slider avant/après, fiches projets détaillées. Vos chantiers parlent pour vous — 2x plus de demandes de devis qu'un site sans portfolio soigné.",
        },
        {
          title: "Pages par spécialité",
          desc: "Escalier, dressing, cuisine, fenêtre bois... Une page = un mot-clé, un trafic, un formulaire. Vous captez 4 à 5x plus de recherches qu'une page 'Services' générique.",
        },
        {
          title: "Devis qualifié en amont",
          desc: "Formulaire intelligent (type de projet, budget, délai) qui pré-qualifie : vous ne perdez plus de temps sur des prospects hors cible.",
        },
      ]}
      faq={FAQ}
      testimonial={{
        quote:
          "Sitaly a tout pris en charge. En 48h, j'avais un site magnifique et des demandes de devis dès le premier mois.",
        name: "S. R.",
        role: "Artisan rénovation — Bordeaux",
      }}
      url={URL}
    />
  );
}
