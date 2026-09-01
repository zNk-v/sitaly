import { createFileRoute } from "@tanstack/react-router";
import { LegalLayout } from "@/components/LegalLayout";

export const Route = createFileRoute("/cgv")({
  head: () => ({
    meta: [
      { title: "CGV — Conditions Générales de Vente et d'Utilisation — Sitaly" },
      { name: "description", content: "Conditions générales de vente et d'utilisation des services Sitaly : création de sites internet et plateforme SaaS pour artisans." },
      { name: "robots", content: "index,follow" },
      { property: "og:title", content: "Conditions Générales de Vente et d'Utilisation — Sitaly" },
      { property: "og:description", content: "Les conditions régissant les prestations de sites internet et l'accès à la plateforme Sitaly." },
      { property: "og:url", content: "https://sitaly.fr/cgv" },
    ],
    links: [{ rel: "canonical", href: "https://sitaly.fr/cgv" }],
  }),
  component: CGV,
});

function CGV() {
  return (
    <LegalLayout title="Conditions Générales de Vente et d'Utilisation" updated="8 juillet 2026">
      <p>
        Les présentes conditions (ci-après « CGV/CGU ») régissent les relations contractuelles entre{" "}
        <strong>Sitaly</strong>, Auto-Entrepreneur, dont le siège social est situé 25 allée des
        jardins, 91220 Brétigny-Sur-Orge, immatriculée au RCS d'Évry sous le numéro SIRET
        83384883100032 (ci-après le « Prestataire »), et toute personne physique ou morale (ci-après
        le « Client » ou l'« Utilisateur ») souhaitant bénéficier de ses services.
      </p>

      <h2>1. Objet</h2>
      <p>Le Prestataire propose deux familles de services :</p>
      <ul>
        <li>
          <strong>Sites internet</strong> : création, hébergement et maintenance de sites à
          destination des artisans, TPE et professionnels indépendants ;
        </li>
        <li>
          <strong>Plateforme Sitaly</strong> : une application en ligne (logiciel en mode SaaS)
          permettant à l'Utilisateur de gérer ses clients et prospects, d'être assisté par une
          intelligence artificielle pour la rédaction de messages, et de gérer sa visibilité et ses
          avis Google.
        </li>
      </ul>

      <h2>2. Devis, commande et création de compte</h2>
      <p>
        Les prestations de site internet font l'objet d'un devis personnalisé, valable 30 jours ; sa
        signature vaut acceptation des présentes. L'accès à la plateforme Sitaly suppose la création
        d'un compte : l'Utilisateur garantit l'exactitude des informations fournies et la
        confidentialité de ses identifiants. La validation de l'inscription vaut acceptation des
        présentes CGV/CGU.
      </p>

      <h2>3. Formules et tarifs</h2>
      <p>Les services Sitaly sont proposés selon plusieurs formules, combinables, sans engagement et sans frais d'installation :</p>
      <ul>
        <li><strong>Sitaly Présence</strong> : abonnement mensuel (à partir de 149 €/mois) comprenant la création et l'hébergement d'un site internet, sa maintenance, les modifications de contenu incluses, la fiche Google Business, le référencement local et l'accès à l'application Sitaly ;</li>
        <li><strong>Sitaly Acquisition</strong> : abonnement mensuel (à partir de 299 €/mois) portant sur la création et la gestion de campagnes de publicité en ligne (Google Ads), indépendamment du site. Le budget publicitaire versé aux régies n'est pas compris dans l'abonnement ;</li>
        <li><strong>Sitaly Agents IA</strong> : mise en place et entretien d'agents d'intelligence artificielle (accueil téléphonique, prise de rendez-vous, relance de devis, réponse aux messages), facturés selon un montant d'installation et un abonnement mensuel définis sur devis en fonction du périmètre.</li>
      </ul>
      <p>
        Les prix sont indiqués en euros. La TVA est applicable selon le régime du Prestataire
        (mention « TVA non applicable, art. 293 B du CGI » le cas échéant). Le Prestataire peut faire
        évoluer ses tarifs ; tout changement applicable à un abonnement en cours est notifié à
        l'avance et n'entre en vigueur qu'à l'échéance suivante.
      </p>

      <h2>4. Paiement et durée de l'abonnement</h2>
      <p>
        Les abonnements payants sont réglés par carte bancaire via notre prestataire de paiement{" "}
        <strong>Stripe</strong>. L'abonnement mensuel est prélevé d'avance, sans engagement de durée,
        et se renouvelle automatiquement chaque mois jusqu'à résiliation. L'Utilisateur peut résilier
        à tout moment depuis son espace ou par e-mail à{" "}
        <a href="mailto:contact@sitaly.fr">contact@sitaly.fr</a> ; la résiliation prend effet à la fin
        de la période en cours, sans remboursement du mois entamé. En cas de défaut de paiement,
        l'accès aux fonctionnalités payantes peut être suspendu.
      </p>

      <h2>5. Prestations de site internet</h2>
      <p>
        Pour la création de sites, le service est proposé en location, sans frais d'installation,
        selon des formules mensuelles. Le site est livré dans un délai de 48h à 7 jours ouvrés à
        compter de la réception des éléments nécessaires. L'hébergement, les mises à jour, les
        sauvegardes et le support sont inclus. Le contrat est à durée indéterminée, résiliable par
        chacune des parties avec un préavis d'un mois.
      </p>

      <h2>6. Accès à la plateforme et disponibilité</h2>
      <p>
        Le Prestataire est tenu à une obligation de moyens quant à la disponibilité de la plateforme.
        Il s'efforce d'assurer un accès continu mais ne garantit pas une disponibilité sans
        interruption, notamment en cas de maintenance, de force majeure ou de défaillance d'un
        service tiers. Le Prestataire peut faire évoluer les fonctionnalités de la plateforme.
      </p>

      <h2>7. Obligations de l'Utilisateur</h2>
      <p>L'Utilisateur s'engage à faire un usage licite de la plateforme. En particulier :</p>
      <ul>
        <li>
          il est seul responsable des données qu'il enregistre sur ses propres clients et prospects,
          et garantit disposer d'une base légale pour les traiter ;
        </li>
        <li>
          il s'assure de disposer du droit d'adresser des messages (SMS, e-mails, demandes d'avis) aux
          personnes concernées et respecte les règles applicables à la prospection ;
        </li>
        <li>
          il respecte les règles de Google relatives aux avis, notamment l'interdiction d'acheter,
          d'inciter ou de filtrer les avis ;
        </li>
        <li>
          il reste responsable des contenus générés par l'assistant IA qu'il choisit d'envoyer, de
          publier ou d'utiliser.
        </li>
      </ul>

      <h2>8. Protection des données et rôles des parties</h2>
      <p>
        Concernant les données que l'Utilisateur enregistre sur ses propres clients, l'Utilisateur
        agit en qualité de <strong>responsable de traitement</strong> et le Prestataire en qualité de{" "}
        <strong>sous-traitant</strong>, agissant sur les seules instructions de l'Utilisateur. Le
        Prestataire s'engage à mettre en œuvre des mesures de sécurité appropriées et à ne pas
        utiliser ces données à d'autres fins. Les traitements sont détaillés dans la{" "}
        <a href="/politique-confidentialite">politique de confidentialité</a>.
      </p>

      <h2>9. Services tiers</h2>
      <p>
        La plateforme s'appuie sur des services tiers (notamment Google, Stripe, Supabase et le
        fournisseur d'IA). Le Prestataire ne saurait être tenu responsable des interruptions,
        modifications ou décisions de ces tiers, en particulier des évolutions ou refus d'accès aux
        API de Google, qui échappent à son contrôle.
      </p>

      <h2>10. Propriété intellectuelle</h2>
      <p>
        La plateforme, son code et ses éléments techniques restent la propriété exclusive du
        Prestataire ; l'Utilisateur bénéficie d'un droit d'usage personnel et non exclusif pendant la
        durée de son abonnement. Les données et contenus saisis par l'Utilisateur restent sa
        propriété ; il peut en demander l'export ou la suppression. Pour les sites internet fournis en
        location, les dispositions spécifiques de l'article 5 s'appliquent.
      </p>

      <h2>11. Droit de rétractation</h2>
      <p>
        Conformément à l'article L.221-3 du Code de la consommation, le droit de rétractation de{" "}
        <strong>14 jours</strong> s'applique aux contrats conclus à distance avec les professionnels
        employant moins de cinq salariés et pour des prestations hors du champ de leur activité
        principale. Il ne s'applique pas aux professionnels agissant dans le cadre de leur activité
        principale.
      </p>

      <h2>12. Responsabilité</h2>
      <p>
        Le Prestataire est tenu à une obligation de moyens. Sa responsabilité ne saurait être engagée
        en cas de force majeure, de mauvaise utilisation des services par le Client, ou d'intervention
        d'un tiers. Elle est en tout état de cause limitée au montant des sommes effectivement versées
        par le Client au titre des douze derniers mois pour la prestation concernée.
      </p>

      <h2>13. Résiliation et suppression du compte</h2>
      <p>
        Chaque partie peut mettre fin à la relation dans les conditions prévues ci-dessus.
        L'Utilisateur peut supprimer son compte à tout moment. Le Prestataire peut suspendre ou
        résilier un compte en cas de manquement aux présentes ou d'usage illicite. À la clôture, les
        données sont supprimées dans les conditions prévues par la politique de confidentialité.
      </p>

      <h2>14. Médiation et règlement des litiges</h2>
      <p>
        En cas de litige, le Client consommateur peut recourir gratuitement au service de médiation de
        la consommation (article L.612-1 du Code de la consommation). Liste des médiateurs agréés :{" "}
        <a href="https://www.economie.gouv.fr/mediation-conso" target="_blank" rel="noopener noreferrer">
          economie.gouv.fr/mediation-conso
        </a>. Plateforme européenne de règlement en ligne des litiges :{" "}
        <a href="https://ec.europa.eu/consumers/odr" target="_blank" rel="noopener noreferrer">
          ec.europa.eu/consumers/odr
        </a>.
      </p>

      <h2>15. Loi applicable</h2>
      <p>
        Les présentes sont soumises au droit français. Tout litige relèvera de la compétence des
        tribunaux du ressort du siège social du Prestataire, sous réserve des dispositions impératives
        applicables aux consommateurs.
      </p>
    </LegalLayout>
  );
}
