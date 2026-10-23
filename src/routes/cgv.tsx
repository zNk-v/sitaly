import { createFileRoute } from "@tanstack/react-router";
import { LegalLayout } from "@/components/LegalLayout";
import { euros } from "@/lib/config";
import {
  A_LA_CARTE,
  BOUTIQUE_SANS_ABONNEMENT,
  MENTION_TVA,
  OFFRES,
  RACHAT_SITE,
  lignesIncluses,
  offre,
  type Offre,
} from "@/data/offres";

export const Route = createFileRoute("/cgv")({
  head: () => ({
    meta: [
      { title: "CGV — Conditions générales de vente | Sitaly" },
      {
        name: "description",
        content:
          "Conditions générales de vente et d'utilisation des services Sitaly : sites vitrines, boutiques Shopify, maintenance, fiche Google, services sur devis et plateforme Sitaly.",
      },
      { name: "robots", content: "index,follow" },
      { property: "og:title", content: "Conditions Générales de Vente et d'Utilisation — Sitaly" },
      {
        property: "og:description",
        content:
          "Les conditions régissant les prestations de sites internet et l'accès à la plateforme Sitaly.",
      },
      { property: "og:url", content: "https://sitaly.fr/cgv/" },
    ],
    links: [{ rel: "canonical", href: "https://sitaly.fr/cgv/" }],
  }),
  component: CGV,
});

/** Première lettre en minuscule, pour insérer un libellé dans une phrase. Les
    sigles (CRM) et les noms de marque (Shopify) gardent leur majuscule. */
const NOMS_PROPRES = /^(Shopify|Google|ChatGPT|WhatsApp)\b/;
const minuscule = (t: string) =>
  /^[A-Z]{2}/.test(t) || NOMS_PROPRES.test(t) ? t : t.charAt(0).toLowerCase() + t.slice(1);

/** Le prix d'une offre en une phrase : mensuel, puis frais de départ. */
function prixOffre(o: Offre): string {
  const des = o.aPartirDe ? "à partir de " : "";
  const depart = `${des}${euros(o.depart)} ${o.departLibelle} payés une fois à la commande`;
  return o.mensuel === undefined
    ? `${depart}, puis un suivi mensuel chiffré dans le devis`
    : `${des}${euros(o.mensuel)} par mois, plus ${depart}`;
}

const VITRINES = ["presence", "presence-pro", "presence-expert"] as const;
const nomsVitrines = VITRINES.map((id) => offre(id).nom);
const listeVitrines = `${nomsVitrines.slice(0, -1).join(", ")} et ${nomsVitrines.at(-1)}`;

function CGV() {
  return (
    <LegalLayout title="Conditions Générales de Vente et d'Utilisation" updated="19 octobre 2026">
      <p>
        Les présentes conditions (ci-après « CGV/CGU ») régissent les relations contractuelles entre{" "}
        <strong>Sitaly</strong>, Auto-Entrepreneur, dont le siège social est situé 25 allée des
        jardins, 91220 Brétigny-Sur-Orge, immatriculée au RCS d'Évry sous le numéro SIRET
        83384883100032 (ci-après le « Prestataire »), et toute personne physique ou morale (ci-après
        le « Client » ou l'« Utilisateur ») souhaitant bénéficier de ses services.
      </p>

      <h2>1. Objet</h2>
      <p>Le Prestataire propose trois familles de services :</p>
      <ul>
        <li>
          <strong>Sites internet</strong> : création, hébergement et maintenance de sites vitrines,
          création de boutiques en ligne sur Shopify, maintenance de sites existants et gestion de
          la fiche Google, à destination des artisans, indépendants, commerçants et TPE ;
        </li>
        <li>
          <strong>Agents IA et services sur devis</strong> : agents d'intelligence artificielle, aux
          prix publiés sur la page Tarifs, outils sur mesure et campagnes publicitaires (Google Ads,
          ChatGPT Ads), chiffrés sur devis ;
        </li>
        <li>
          <strong>Plateforme Sitaly</strong> : une application en ligne (logiciel en mode SaaS)
          permettant à l'Utilisateur de gérer ses clients et prospects, d'être assisté par une
          intelligence artificielle pour la rédaction de messages, et de gérer sa visibilité et ses
          avis Google.
        </li>
      </ul>

      <h2>2. Commande et création de compte</h2>
      <p>
        Les offres de sites internet sont souscrites sur la base des tarifs publiés sur la page{" "}
        <a href="/tarifs/">Tarifs</a> à la date de la commande, confirmée par écrit (bon de
        commande, devis ou e-mail) ; cette confirmation vaut acceptation des présentes. Les services
        sur devis font l'objet d'un devis personnalisé, valable 30 jours, dont la signature vaut
        acceptation des présentes. L'accès à la plateforme Sitaly suppose la création d'un compte :
        l'Utilisateur garantit l'exactitude des informations fournies et la confidentialité de ses
        identifiants.
      </p>

      <h2>3. Offres et tarifs</h2>
      <p>
        Les offres et leurs prix sont publiés sur la page <a href="/tarifs/">Tarifs</a>. À la date
        des présentes :
      </p>
      <ul>
        {OFFRES.map((o) => (
          <li key={o.id}>
            <strong>{o.nom}</strong> : {prixOffre(o)}. Inclus :{" "}
            {lignesIncluses(o).map(minuscule).join(" ; ")}.
          </li>
        ))}
      </ul>
      <p>
        Options à la carte, payées une fois :{" "}
        {A_LA_CARTE.map((x) => `${minuscule(x.libelle)} (${euros(x.prix)})`).join(", ")}. La
        boutique en ligne peut aussi être livrée sans abonnement Sitaly, pour un prix unique de{" "}
        {euros(BOUTIQUE_SANS_ABONNEMENT)}.
      </p>
      <p>
        Les offres dont le prix est indiqué « à partir de », les campagnes Google Ads et ChatGPT Ads
        sont chiffrées sur devis : le devis précise la mise en place, l'abonnement mensuel, le cas
        échéant la part variable assise sur le budget publicitaire (qui reste payé directement aux
        régies), ainsi que les prestations incluses et exclues.
      </p>
      <p>
        Les prix sont indiqués en euros. {MENTION_TVA}. Le Prestataire peut faire évoluer ses tarifs
        ; tout changement applicable à un abonnement en cours est notifié à l'avance et n'entre en
        vigueur qu'à l'échéance suivante. Les prix publiés au jour de la commande restent acquis
        pour la mise en service.
      </p>

      <h2>4. Paiement et durée de l'abonnement</h2>
      <p>
        Les abonnements payants sont réglés par carte bancaire via notre prestataire de paiement{" "}
        <strong>Stripe</strong>. L'abonnement mensuel est prélevé d'avance, sans engagement de
        durée, et se renouvelle automatiquement chaque mois jusqu'à résiliation. L'Utilisateur peut
        résilier à tout moment depuis son espace ou par e-mail à{" "}
        <a href="mailto:contact@sitaly.fr">contact@sitaly.fr</a> ; la résiliation prend effet à la
        fin de la période en cours, sans remboursement du mois entamé. En cas de défaut de paiement,
        l'accès aux fonctionnalités payantes peut être suspendu.
      </p>

      <h2>5. Prestations de site internet</h2>

      <h3>5.1 Mise en service</h3>
      <p>
        Les frais de mise en service (ou d'audit pour la maintenance d'un site existant) sont payés
        à la commande. Ils rémunèrent le travail de départ : échange sur l'activité, rédaction,
        conception, mise en ligne et mise en ordre de la fiche Google. Une fois le travail lancé,
        ils ne sont pas remboursables, y compris en cas de résiliation ultérieure de l'abonnement.
        Un site vitrine est livré dans un délai de 48 heures à 7 jours ouvrés à compter de la
        réception des éléments nécessaires ; le délai d'une boutique en ligne dépend de son
        catalogue et est annoncé à la commande.
      </p>

      <h3>5.2 Contenu de l'abonnement</h3>
      <p>
        L'abonnement comprend les prestations décrites pour chaque offre à l'article 3. Les
        modifications incluses s'entendent de retouches du contenu existant (texte, photo, prix,
        horaires, coordonnées), dans la limite prévue par l'offre : une modification par mois pour
        les offres {offre("presence").nom} et {offre("presence-pro").nom}, sans limite mensuelle
        pour l'offre {offre("presence-expert").nom}, une heure par mois pour l'offre{" "}
        {offre("boutique").nom}, trois heures par mois pour l'offre {offre("boutique-pro").nom}, et
        selon le devis pour l'offre {offre("boutique-sur-mesure").nom}. Au-delà, ou pour toute
        création nouvelle (page, visuel, fonction), le Prestataire applique les options à la carte
        ou établit un devis préalable. Pour la maintenance d'un site existant, la remise en état
        d'un site défectueux ou obsolète fait l'objet d'un devis séparé ; le Prestataire ne répond
        pas des défauts antérieurs à sa reprise.
      </p>

      <h3>5.3 Durée et résiliation</h3>
      <p>
        Les abonnements sont conclus pour une durée indéterminée, sans engagement de durée minimale.
        Le Client peut résilier à tout moment et sans frais, par e-mail à{" "}
        <a href="mailto:contact@sitaly.fr">contact@sitaly.fr</a> ; la résiliation prend effet à la
        fin de la période mensuelle en cours, déjà payée, conformément à l'article 4. Le Prestataire
        peut mettre fin à un abonnement avec un préavis d'un mois, ou sans préavis en cas de
        manquement grave du Client, notamment de défaut de paiement.
      </p>

      <h3>5.4 Propriété des sites vitrines et rachat</h3>
      <p>
        Pour les offres {listeVitrines}, le site (sa conception, son code et les textes rédigés par
        le Prestataire) reste la propriété du Prestataire ; le Client en a l'usage pendant la durée
        de son abonnement. Les éléments fournis par le Client (logo, photos, textes) restent sa
        propriété. À la fin de l'abonnement, le site est mis hors ligne, sauf si le Client choisit
        de le racheter. Le prix de rachat dépend de l'ancienneté de l'abonnement :{" "}
        {RACHAT_SITE.map((r) => `${minuscule(r.periode)}, ${euros(r.prix)}`).join(" ; ")}. Le
        rachat, payé en une fois, emporte cession au Client des droits sur le site et remise de ses
        fichiers.
      </p>

      <h3>5.5 Nom de domaine et fiche Google</h3>
      <p>
        Le nom de domaine réservé pour le Client lui est transféré gratuitement à la fin de
        l'abonnement, quelle que soit l'offre. La fiche Google Business Profile du Client lui
        appartient en toutes circonstances : le Prestataire n'y intervient qu'en qualité de
        gestionnaire, et retire son accès à la fin de l'abonnement.
      </p>

      <h3>5.6 Boutique en ligne Shopify</h3>
      <p>
        La boutique en ligne est créée sur la plateforme Shopify, dans un compte ouvert au nom du
        Client, qui en est propriétaire dès sa création. L'abonnement Shopify (de l'ordre de 36 €
        par mois à la date des présentes) et les frais de paiement prélevés sur les ventes sont
        facturés directement au Client par Shopify, selon les conditions de Shopify, et ne sont pas
        compris dans les prix du Prestataire. Le Client reste seul responsable de son activité de
        vente : conditions de vente, droit de rétractation de ses acheteurs, expéditions et
        obligations fiscales.
      </p>

      <h2>6. Accès à la plateforme et disponibilité</h2>
      <p>
        Le Prestataire est tenu à une obligation de moyens quant à la disponibilité de la
        plateforme. Il s'efforce d'assurer un accès continu mais ne garantit pas une disponibilité
        sans interruption, notamment en cas de maintenance, de force majeure ou de défaillance d'un
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
          il s'assure de disposer du droit d'adresser des messages (SMS, e-mails, demandes d'avis)
          aux personnes concernées et respecte les règles applicables à la prospection ;
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
        agit en qualité de <strong>responsable de traitement</strong> et le Prestataire en qualité
        de <strong>sous-traitant</strong>, agissant sur les seules instructions de l'Utilisateur. Le
        Prestataire s'engage à mettre en œuvre des mesures de sécurité appropriées et à ne pas
        utiliser ces données à d'autres fins. Les traitements sont détaillés dans la{" "}
        <a href="/politique-confidentialite/">politique de confidentialité</a>.
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
        Prestataire ; l'Utilisateur bénéficie d'un droit d'usage personnel et non exclusif pendant
        la durée de son abonnement. Les données et contenus saisis par l'Utilisateur restent sa
        propriété ; il peut en demander l'export ou la suppression. Pour les sites internet, les
        dispositions spécifiques de l'article 5.4 à 5.6 s'appliquent.
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
        Le Prestataire est tenu à une obligation de moyens. Sa responsabilité ne saurait être
        engagée en cas de force majeure, de mauvaise utilisation des services par le Client, ou
        d'intervention d'un tiers. Elle est en tout état de cause limitée au montant des sommes
        effectivement versées par le Client au titre des douze derniers mois pour la prestation
        concernée.
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
        En cas de litige, le Client consommateur peut recourir gratuitement au service de médiation
        de la consommation (article L.612-1 du Code de la consommation). Liste des médiateurs agréés
        :{" "}
        <a
          href="https://www.economie.gouv.fr/mediation-conso"
          target="_blank"
          rel="noopener noreferrer"
        >
          economie.gouv.fr/mediation-conso
        </a>
        . Plateforme européenne de règlement en ligne des litiges :{" "}
        <a href="https://ec.europa.eu/consumers/odr" target="_blank" rel="noopener noreferrer">
          ec.europa.eu/consumers/odr
        </a>
        .
      </p>

      <h2>15. Loi applicable</h2>
      <p>
        Les présentes sont soumises au droit français. Tout litige relèvera de la compétence des
        tribunaux du ressort du siège social du Prestataire, sous réserve des dispositions
        impératives applicables aux consommateurs.
      </p>
    </LegalLayout>
  );
}
