import { createFileRoute } from "@tanstack/react-router";
import { MetierLanding, buildMetierMeta } from "@/components/MetierLanding";

const URL = "https://sitaly.fr/site-internet-couvreur";
const TITLE = "Site internet couvreur-façadier : devis local | Sitaly dès 149€/mois";
const DESCRIPTION =
  "Site internet couvreur ou façadier optimisé urgences (fuite, tempête) et SEO local. Livré en 48h, dès 149€/mois en location, sans engagement.";

const FAQ = [
  {
    q: "Le site sera-t-il bien optimisé pour 'couvreur + ma ville' ?",
    a: "Oui : pages locales dédiées, fiche Google Business Profile optimisée, schema LocalBusiness. Top 3 Google local visé en 3 à 6 mois selon la concurrence.",
  },
  {
    q: "Comment gérer les urgences (fuite, tempête) ?",
    a: "Téléphone cliquable visible partout + bouton 'Urgence toiture' optionnel. On peut aussi prévoir une page dédiée 'Dépannage toiture 24/7' qui ressort sur les recherches d'urgence.",
  },
  {
    q: "Puis-je présenter mes prestations façade et isolation ?",
    a: "Tout à fait : une page par service (couverture, zinguerie, ravalement, ITE, démoussage...). Idéal pour multiplier les portes d'entrée SEO et toucher plus de recherches.",
  },
  {
    q: "Que faire avec mes aides MaPrimeRénov' / CEE ?",
    a: "On intègre un bloc dédié aux aides (MaPrimeRénov', CEE, éco-PTZ) avec un formulaire de simulation rapide. Très efficace pour capter les recherches 'aides ravalement + ville'.",
  },
];

export const Route = createFileRoute("/site-internet-couvreur")({
  head: () =>
    buildMetierMeta({
      title: TITLE,
      description: DESCRIPTION,
      url: URL,
      metier: "couvreur",
      faq: FAQ,
    }),
  component: CouvreurLanding,
});

function CouvreurLanding() {
  return (
    <MetierLanding
      metier="couvreur"
      metierCapitalized="Couvreur / Façadier"
      h1="Site internet couvreur-façadier pour capter les chantiers locaux"
      intro="Un site rapide, optimisé pour les urgences toiture et les recherches ravalement, qui vous fait remonter en 1ère page Google sur votre zone."
      benefits={[
        {
          title: "Urgence toiture en 1 clic",
          desc: "Numéro visible, bouton dépannage, photos rassurantes de réalisations. Les particuliers en panique appellent le 1er résultat — autant que ce soit vous.",
        },
        {
          title: "Pages services + aides",
          desc: "Couverture, ravalement, isolation, démoussage, MaPrimeRénov', CEE : une page = un mot-clé. Le trafic SEO local peut tripler vs un site mono-page.",
        },
        {
          title: "Galerie chantiers crédibilisante",
          desc: "Photos avant/après, drone, échafaudages : on met en scène votre savoir-faire pour rassurer avant l'appel et justifier vos tarifs.",
        },
      ]}
      example={{
        label: "Lafleur Toiture — Essonne",
        description:
          "Site vitrine local réalisé par Sitaly pour un couvreur de l'Essonne. Pages services, galerie chantiers, formulaire devis local. Visitez l'aperçu.",
        iframeUrl: "https://lafleur-toiture.fr/#top",
        exempleHref: "https://lafleur-toiture.fr/#top",
      }}
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
