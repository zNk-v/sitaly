import { createFileRoute } from "@tanstack/react-router";
import { MetierLanding, buildMetierMeta } from "@/components/MetierLanding";

const URL = "https://sitaly.fr/site-internet-electricien";
const TITLE = "Site internet électricien : devis & SEO local | Sitaly dès 149€/mois";
const DESCRIPTION =
  "Site internet électricien pro livré en 48h. Devis en ligne, urgence cliquable, top Google local. Dès 149€/mois en location, sans engagement et tout inclus.";

const FAQ = [
  {
    q: "Mon site mettra-t-il en avant mes habilitations électriques ?",
    a: "Oui : qualifications (Qualifelec, RGE, IRVE...), assurances et certifications sont mises en valeur dans un bloc dédié. C'est un critère de réassurance majeur côté client.",
  },
  {
    q: "Puis-je présenter mes prestations IRVE / borne de recharge ?",
    a: "Tout à fait. On crée une page dédiée IRVE optimisée pour les recherches 'installation borne recharge + ville', avec formulaire devis spécifique et prime CEE intégrée.",
  },
  {
    q: "Que se passe-t-il pour la mise en conformité Consuel ?",
    a: "On peut intégrer une section explicative + un formulaire dédié aux demandes de mise en conformité. Idéal pour capter les recherches 'mise en conformité électrique + ville'.",
  },
  {
    q: "Le site est-il adapté aux particuliers ET aux pros ?",
    a: "Oui : deux parcours visuels distincts (Particuliers / Professionnels - Tertiaire) avec leurs propres pages services et formulaires.",
  },
];

export const Route = createFileRoute("/site-internet-electricien")({
  head: () =>
    buildMetierMeta({
      title: TITLE,
      description: DESCRIPTION,
      url: URL,
      metier: "électricien",
      faq: FAQ,
    }),
  component: ElectricienLanding,
});

function ElectricienLanding() {
  return (
    <MetierLanding
      metier="électricien"
      metierCapitalized="Électricien"
      h1="Site internet électricien qui inspire confiance dès la 1ère seconde"
      intro="Mettez en avant vos habilitations, vos chantiers et vos services (IRVE, mise en conformité, domotique) avec un site optimisé pour le SEO local."
      benefits={[
        {
          title: "Habilitations bien visibles",
          desc: "Qualifelec, RGE, IRVE, assurances : un bloc dédié rassure le client en 5 secondes. Conversion +35 % vs un site sans réassurance visible.",
        },
        {
          title: "Pages services dédiées",
          desc: "Tableau électrique, IRVE, domotique, dépannage : une page par service avec son mot-clé et son formulaire devis. Trafic SEO multiplié par 3.",
        },
        {
          title: "Devis en ligne intelligent",
          desc: "Formulaire conditionnel (particulier/pro, type de prestation, urgence) qui pré-qualifie le prospect avant l'appel. Vous gagnez 80 % de temps de qualification.",
        },
      ]}
      faq={FAQ}
      testimonial={{
        quote:
          "Simple, clair, efficace. Je n'ai rien à gérer et je peux me concentrer sur mes chantiers. Je recommande sans hésiter.",
        name: "K. B.",
        role: "Électricien — Toulouse",
      }}
      url={URL}
    />
  );
}
