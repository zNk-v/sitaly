import { createFileRoute } from "@tanstack/react-router";
import { LegalLayout } from "@/components/LegalLayout";

export const Route = createFileRoute("/cookies")({
  head: () => ({
    meta: [
      { title: "Politique cookies — Sitaly" },
      { name: "description", content: "Politique de gestion des cookies du site Sitaly conformément à la réglementation CNIL." },
      { name: "robots", content: "index,follow" },
      { property: "og:title", content: "Politique cookies — Sitaly" },
      { property: "og:description", content: "Comment Sitaly utilise et gère les cookies, conformément au RGPD et aux recommandations de la CNIL." },
      { property: "og:url", content: "https://sitaly.fr/cookies" },
    ],
    links: [{ rel: "canonical", href: "https://sitaly.fr/cookies" }],
  }),
  component: Cookies,
});

function Cookies() {
  return (
    <LegalLayout title="Politique de gestion des cookies" updated="17 juin 2026">
      <p>
        Cette page décrit l'utilisation des cookies et autres traceurs sur le site Sitaly,
        conformément à la directive ePrivacy, au RGPD et aux recommandations de la CNIL.
      </p>

      <h2>1. Qu'est-ce qu'un cookie ?</h2>
      <p>
        Un cookie est un petit fichier texte déposé sur votre terminal (ordinateur, tablette,
        smartphone) lors de la consultation d'un site internet. Il permet notamment de reconnaître
        votre navigateur, de mémoriser vos préférences et de mesurer l'audience d'un site.
      </p>

      <h2>2. Cookies utilisés sur le site</h2>
      <h3>Cookies strictement nécessaires</h3>
      <p>
        Ces cookies sont indispensables au fonctionnement du site (sécurité, équilibrage de
        charge, mémorisation de votre choix concernant les cookies). Ils ne nécessitent pas votre
        consentement.
      </p>
      <h3>Cookies de mesure d'audience</h3>
      <p>
        Le site peut utiliser des outils statistiques pour mesurer la fréquentation et améliorer
        son contenu. Ces cookies ne sont déposés qu'après votre consentement, sauf s'ils sont
        exemptés (conformément à la recommandation CNIL).
      </p>
      <h3>Cookies tiers</h3>
      <p>
        Aucun cookie publicitaire n'est utilisé sur le site. Certains contenus intégrés (cartes,
        vidéos) peuvent déposer leurs propres cookies, soumis aux politiques de leurs éditeurs
        respectifs.
      </p>

      <h2>3. Durée de conservation</h2>
      <p>
        Conformément aux recommandations de la CNIL, la durée de vie des cookies n'excède pas
        <strong> 13 mois</strong>. Votre choix concernant les cookies est conservé pendant la
        même durée.
      </p>

      <h2>4. Gestion de vos préférences</h2>
      <p>
        Vous pouvez à tout moment accepter, refuser ou retirer votre consentement aux cookies non
        essentiels. Vous pouvez également configurer votre navigateur pour bloquer ou supprimer
        les cookies :
      </p>
      <ul>
        <li><a href="https://support.google.com/chrome/answer/95647" target="_blank" rel="noopener noreferrer">Google Chrome</a></li>
        <li><a href="https://support.mozilla.org/fr/kb/cookies-informations-sites-enregistrent" target="_blank" rel="noopener noreferrer">Mozilla Firefox</a></li>
        <li><a href="https://support.apple.com/fr-fr/guide/safari/sfri11471/mac" target="_blank" rel="noopener noreferrer">Safari</a></li>
        <li><a href="https://support.microsoft.com/fr-fr/microsoft-edge" target="_blank" rel="noopener noreferrer">Microsoft Edge</a></li>
      </ul>

      <h2>5. Pour en savoir plus</h2>
      <p>
        Pour plus d'informations sur les cookies et vos droits, consultez le site de la CNIL :{" "}
        <a href="https://www.cnil.fr/fr/cookies-et-traceurs" target="_blank" rel="noopener noreferrer">
          cnil.fr/fr/cookies-et-traceurs
        </a>.
      </p>
    </LegalLayout>
  );
}
