import { createFileRoute } from "@tanstack/react-router";
import { LegalLayout } from "@/components/LegalLayout";
import { PREMIUM_PUBLIE } from "@/data/premium";
import { euros } from "@/lib/config";
import {
  A_LA_CARTE,
  BOUTIQUE_SANS_ABONNEMENT,
  CREATEUR_IA as IA,
  MENTION_TVA,
  OFFRES,
  RACHAT_SITE,
  lignesIncluses,
  montantsAcomptes,
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
          "Conditions générales de vente et d'utilisation de Sitaly : l'application Sitaly App (créateur de site par l'IA, formules, crédits IA, abonnement mensuel ou annuel) et les prestations de l'agence.",
      },
      { name: "robots", content: "index,follow" },
      { property: "og:title", content: "Conditions Générales de Vente et d'Utilisation — Sitaly" },
      {
        property: "og:description",
        content:
          "Les conditions régissant l'application Sitaly App et les prestations de sites internet.",
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
  if (o.groupe === "premium") {
    const acomptes = montantsAcomptes(o)
      .map((a) => `${Math.round(a.part * 100)} % ${a.moment}`)
      .join(", ");
    return `${des}${euros(o.depart)}, payés en trois acomptes : ${acomptes}, sans abonnement`;
  }
  const depart = `${des}${euros(o.depart)} ${o.departLibelle} payés une fois à la commande`;
  return o.mensuel === undefined
    ? `${depart}, puis un suivi mensuel chiffré dans le devis`
    : `${des}${euros(o.mensuel)} par mois, plus ${depart}`;
}

const PREMIUM = offre("site-premium");

const VITRINES = ["presence", "presence-pro", "presence-expert"] as const;
const nomsVitrines = VITRINES.map((id) => offre(id).nom);
const listeVitrines = `${nomsVitrines.slice(0, -1).join(", ")} et ${nomsVitrines.at(-1)}`;

function CGV() {
  return (
    <LegalLayout title="Conditions Générales de Vente et d'Utilisation" updated="30 octobre 2026">
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
          <strong>Sitaly App</strong> : une application en ligne (logiciel en mode SaaS), accessible
          sur app.sitaly.fr, qui crée un site internet à partir de la description de son activité
          par l'Utilisateur, à l'aide d'une intelligence artificielle, l'héberge et le publie, puis
          le modifie à la demande de l'Utilisateur ;
        </li>
        <li>
          <strong>Sites internet de l'agence</strong> : création, hébergement et maintenance de
          sites vitrines, création de boutiques en ligne sur Shopify, maintenance de sites existants
          et gestion de la fiche Google, à destination des artisans, indépendants, commerçants et
          TPE ;
        </li>
        <li>
          <strong>Agents IA et services sur devis</strong> : agents d'intelligence artificielle,
          outils sur mesure et campagnes publicitaires (Google Ads, ChatGPT Ads), chiffrés sur
          devis.
        </li>
      </ul>

      <h2>2. Commande et création de compte</h2>
      <p>
        L'utilisation de Sitaly App suppose la création d'un compte, par e-mail ou avec un compte
        Google ; la création du compte vaut acceptation des présentes. L'Utilisateur garantit
        l'exactitude des informations fournies et la confidentialité de ses identifiants. Les
        formules payantes de Sitaly App sont souscrites en ligne, au prix publié sur la page{" "}
        <a href="/tarifs/">Tarifs</a> le jour de la souscription.
      </p>
      <p>
        Les offres de l'agence sont souscrites au prix indiqué à l'article 4 à la date de la
        commande, confirmée par écrit (bon de commande, devis ou e-mail) ; cette confirmation vaut
        acceptation des présentes. Les services sur devis font l'objet d'un devis personnalisé,
        valable 30 jours, dont la signature vaut acceptation des présentes.
      </p>

      <h2>3. Sitaly App</h2>

      <h3>3.1 Formules et prix</h3>
      <p>À la date des présentes, Sitaly App propose trois formules :</p>
      <ul>
        <li>
          <strong>{IA.decouverte.nom}</strong> : gratuite, sans carte bancaire. Elle comprend la
          création du site, sa publication sur une adresse en nom.sitaly.fr et{" "}
          {IA.decouverte.credits} crédits IA offerts une seule fois à l'ouverture du compte.
        </li>
        <li>
          <strong>{IA.essentiel.nom}</strong> : {euros(IA.essentiel.mensuel)} par mois, ou{" "}
          {euros(IA.essentiel.annuel)} par an, avec {IA.essentiel.credits} crédits IA par mois.
        </li>
        <li>
          <strong>{IA.pro.nom}</strong> : {euros(IA.pro.mensuel)} par mois, ou{" "}
          {euros(IA.pro.annuel)} par an, avec {IA.pro.credits.toLocaleString("fr-FR")} crédits IA par mois.
        </li>
      </ul>
      <p>
        Le détail de chaque formule figure sur la page <a href="/tarifs/">Tarifs</a>. Les fonctions
        signalées « Bientôt » sont en préparation : elles ne font pas partie de la formule souscrite
        tant qu'elles ne sont pas ouvertes, et leur absence ne donne lieu à aucune réduction ni à
        aucun remboursement. {MENTION_TVA}.
      </p>

      <h3>3.2 Paiement, renouvellement et résiliation</h3>
      <p>
        Les formules payantes se règlent par carte bancaire via <strong>Stripe</strong>, d'avance,
        pour la période choisie :
      </p>
      <ul>
        <li>
          <strong>au mois</strong> : l'abonnement se renouvelle chaque mois, sans engagement de
          durée. La résiliation prend effet à la fin du mois en cours, sans remboursement du mois
          entamé ;
        </li>
        <li>
          <strong>à l'année</strong> : le prix annuel, environ 15 % moins cher que douze
          mensualités, est payé en une fois pour douze mois. L'abonnement se renouvelle pour douze
          mois à chaque échéance, sauf résiliation avant celle-ci. La résiliation prend effet à la
          fin de l'année payée ; la part de l'année non utilisée n'est pas remboursée, sous réserve
          du droit de rétractation (article 12).
        </li>
      </ul>
      <p>
        L'Utilisateur résilie depuis son espace (rubrique Abonnement) ou par e-mail à{" "}
        <a href="mailto:contact@sitaly.fr">contact@sitaly.fr</a>. Il reçoit un rappel par e-mail
        avant le renouvellement d'un abonnement annuel. En cas de défaut de paiement, le compte
        revient à la formule {IA.decouverte.nom}. Le Prestataire peut faire évoluer ses prix : le
        nouveau prix s'applique à la prochaine échéance, après information préalable de
        l'Utilisateur, qui peut résilier avant.
      </p>

      <h3>3.3 Crédits IA</h3>
      <p>
        Les crédits IA servent aux demandes faites à l'intelligence artificielle : réécrire ou
        ajouter une section, changer le ton, modifier le site en une phrase, créer une photo. Le
        nombre de crédits consommé dépend de la demande et s'affiche dans l'application ; à la date
        des présentes, une retouche coûte 1 ou 2 crédits et une photo créée par l'IA en coûte 5.
      </p>
      <p>
        Les crédits des formules payantes se renouvellent au début de chaque mois civil, y compris
        pour un abonnement annuel. Les crédits non utilisés ne se reportent pas sur le mois suivant.
        Les crédits n'ont aucune valeur monétaire : ils ne sont ni remboursables, ni cessibles, ni
        convertibles. Quand ils sont épuisés, l'Utilisateur garde son site et peut le modifier à la
        main ; les demandes à l'IA reprennent au renouvellement suivant ou après un passage à une
        formule supérieure. Une demande qui échoue pour une raison technique ne consomme pas de
        crédit.
      </p>

      <h3>3.4 Contenus créés par l'IA</h3>
      <p>
        Les textes et les photos produits par l'IA sont générés automatiquement à partir des
        indications de l'Utilisateur. Ils peuvent contenir des erreurs ou des informations inexactes
        (prix, horaires, diplômes, zones d'intervention, mentions obligatoires). L'Utilisateur les
        relit avant de publier son site et reste seul responsable de ce qu'il publie, notamment des
        mentions légales de son activité.
      </p>
      <p>
        Les photos créées par l'IA sont des illustrations : elles ne montrent ni l'Utilisateur, ni
        ses locaux, ni ses réalisations, et l'Utilisateur s'abstient de les présenter comme telles
        auprès de ses clients. L'Utilisateur peut utiliser les textes et photos générés pour son
        site et pour son activité, y compris à des fins commerciales. Le Prestataire ne garantit pas
        leur caractère unique, ni l'absence de ressemblance avec des contenus existants.
      </p>

      <h3>3.5 Site publié et fin d'abonnement</h3>
      <p>
        Le site est publié sur une adresse en nom.sitaly.fr. Le Prestataire reste titulaire du nom
        de domaine sitaly.fr : l'adresse est attribuée à l'Utilisateur pour son usage et peut lui
        être retirée en cas d'usage contraire à l'article 8. Les textes, photos et informations de
        l'Utilisateur restent sa propriété.
      </p>
      <p>
        À la fin d'un abonnement payant, le compte revient à la formule {IA.decouverte.nom} : le
        site reste en ligne dans les limites de cette formule, et les fonctions réservées aux
        formules payantes cessent. À la suppression du compte, le site est mis hors ligne et ses
        données sont supprimées dans les conditions de la{" "}
        <a href="/politique-confidentialite/">politique de confidentialité</a>.
      </p>

      <h2>4. Offres de l'agence</h2>
      <p>
        Les offres de l'agence sont présentées au téléphone ou sur devis. À la date des présentes :
      </p>
      <ul>
        {OFFRES.filter((o) => PREMIUM_PUBLIE || o.groupe !== "premium").map((o) => (
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

      <h2>5. Paiement des abonnements de l'agence</h2>
      <p>
        Les abonnements de l'agence sont réglés par carte bancaire via notre prestataire de paiement{" "}
        <strong>Stripe</strong>. L'abonnement mensuel est prélevé d'avance, sans engagement de
        durée, et se renouvelle automatiquement chaque mois jusqu'à résiliation. L'Utilisateur peut
        résilier à tout moment depuis son espace ou par e-mail à{" "}
        <a href="mailto:contact@sitaly.fr">contact@sitaly.fr</a> ; la résiliation prend effet à la
        fin de la période en cours, sans remboursement du mois entamé. En cas de défaut de paiement,
        l'accès aux fonctionnalités payantes peut être suspendu.
      </p>

      <h2>6. Prestations de site internet de l'agence</h2>

      <h3>6.1 Mise en service</h3>
      <p>
        Les frais de mise en service (ou d'audit pour la maintenance d'un site existant) sont payés
        à la commande. Ils rémunèrent le travail de départ : échange sur l'activité, rédaction,
        conception, mise en ligne et mise en ordre de la fiche Google. Une fois le travail lancé,
        ils ne sont pas remboursables, y compris en cas de résiliation ultérieure de l'abonnement.
        Un site vitrine est livré dans un délai de 48 heures à 7 jours ouvrés à compter de la
        réception des éléments nécessaires ; le délai d'une boutique en ligne dépend de son
        catalogue et est annoncé à la commande.
      </p>

      <h3>6.2 Contenu de l'abonnement</h3>
      <p>
        L'abonnement comprend les prestations décrites pour chaque offre à l'article 4. Les
        modifications incluses s'entendent de retouches du contenu existant (texte, photo, prix,
        horaires, coordonnées), dans la limite prévue par l'offre : une modification par mois pour
        les offres {offre("presence").nom} et {offre("presence-pro").nom}, quatre modifications par
        mois pour l'offre {offre("presence-expert").nom}, et une heure par mois pour l'offre{" "}
        {offre("boutique").nom}. Au-delà, ou pour toute création nouvelle (page, visuel, fonction),
        le Prestataire applique les options à la carte ou établit un devis préalable. Pour la
        maintenance d'un site existant, la remise en état d'un site défectueux ou obsolète fait
        l'objet d'un devis séparé ; le Prestataire ne répond pas des défauts antérieurs à sa
        reprise.
      </p>

      <h3>6.3 Durée et résiliation</h3>
      <p>
        Les abonnements sont conclus pour une durée indéterminée, sans engagement de durée minimale.
        Le Client peut résilier à tout moment et sans frais, par e-mail à{" "}
        <a href="mailto:contact@sitaly.fr">contact@sitaly.fr</a> ; la résiliation prend effet à la
        fin de la période mensuelle en cours, déjà payée, conformément à l'article 5. Le Prestataire
        peut mettre fin à un abonnement avec un préavis d'un mois, ou sans préavis en cas de
        manquement grave du Client, notamment de défaut de paiement.
      </p>

      <h3>6.4 Propriété des sites vitrines et rachat</h3>
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

      <h3>6.5 Nom de domaine et fiche Google</h3>
      <p>
        Le nom de domaine réservé pour le Client lui est transféré gratuitement à la fin de
        l'abonnement, quelle que soit l'offre. La fiche Google Business Profile du Client lui
        appartient en toutes circonstances : le Prestataire n'y intervient qu'en qualité de
        gestionnaire, et retire son accès à la fin de l'abonnement.
      </p>

      <h3>6.6 Boutique en ligne Shopify</h3>
      <p>
        La boutique en ligne est créée sur la plateforme Shopify, dans un compte ouvert au nom du
        Client, qui en est propriétaire dès sa création. L'abonnement Shopify (de l'ordre de 36 €
        par mois à la date des présentes) et les frais de paiement prélevés sur les ventes sont
        facturés directement au Client par Shopify, selon les conditions de Shopify, et ne sont pas
        compris dans les prix du Prestataire. Le Client reste seul responsable de son activité de
        vente : conditions de vente, droit de rétractation de ses acheteurs, expéditions et
        obligations fiscales.
      </p>

      {/* Clause proposée le 24 octobre 2026 avec la page /site-premium/ : à
          relire par Teddy, et par un juriste, avant publication. Elle suit le
          verrou de la page : absente des CGV tant que PREMIUM_PUBLIE vaut false. */}
      {PREMIUM_PUBLIE && (
        <>
          <h3>6.7 Site sur mesure (Sitaly Premium)</h3>
          <p>
            Le site sur mesure est payé une fois, sans abonnement, en trois acomptes :{" "}
            {montantsAcomptes(PREMIUM)
              .map((a) => `${Math.round(a.part * 100)} % ${a.moment}`)
              .join(", ")}
            . Le montant exact figure au devis accepté par le Client. Chaque acompte reste acquis au
            Prestataire pour les étapes réalisées, si le projet s'arrête avant la mise en ligne. Le
            site, son code, ses textes et ses fichiers deviennent la propriété du Client au paiement
            du dernier acompte. L'hébergement et les corrections sont compris pendant trois mois
            après la mise en ligne ; ensuite, le Client confie l'entretien au Prestataire selon
            l'offre de maintenance en vigueur, ou reprend le site avec le prestataire de son choix.
          </p>
        </>
      )}

      <h2>7. Accès à la plateforme et disponibilité</h2>
      <p>
        Le Prestataire est tenu à une obligation de moyens quant à la disponibilité de la
        plateforme. Il s'efforce d'assurer un accès continu mais ne garantit pas une disponibilité
        sans interruption, notamment en cas de maintenance, de force majeure ou de défaillance d'un
        service tiers. Le Prestataire peut faire évoluer les fonctionnalités de la plateforme.
      </p>

      <h2>8. Obligations de l'Utilisateur</h2>
      <p>L'Utilisateur s'engage à faire un usage licite des services. En particulier :</p>
      <ul>
        <li>
          il ne publie aucun contenu illicite, trompeur, diffamatoire ou portant atteinte aux droits
          d'un tiers (marque, droit d'auteur, image), et n'utilise pas son site pour usurper une
          identité, collecter des identifiants ou des moyens de paiement, ni pour vendre des
          produits interdits ;
        </li>
        <li>il fournit uniquement des textes, logos et photos qu'il a le droit d'utiliser ;</li>
        <li>
          il est seul responsable des données que les visiteurs de son site lui transmettent,
          notamment par le formulaire de contact, et garantit disposer d'une base légale pour les
          traiter ;
        </li>
        <li>
          il reste responsable des contenus générés par l'IA qu'il choisit de publier ou d'utiliser.
        </li>
      </ul>
      <p>
        En cas de manquement, le Prestataire peut mettre le site hors ligne et suspendre le compte,
        après en avoir informé l'Utilisateur, ou sans délai si le contenu présente un danger pour
        les visiteurs.
      </p>

      <h2>9. Protection des données et rôles des parties</h2>
      <p>
        Concernant les données de ses propres clients et des visiteurs de son site, l'Utilisateur
        agit en qualité de <strong>responsable de traitement</strong> et le Prestataire en qualité
        de <strong>sous-traitant</strong>, agissant sur les seules instructions de l'Utilisateur. Le
        Prestataire s'engage à mettre en œuvre des mesures de sécurité appropriées et à ne pas
        utiliser ces données à d'autres fins. Les traitements sont détaillés dans la{" "}
        <a href="/politique-confidentialite/">politique de confidentialité</a>.
      </p>

      <h2>10. Services tiers</h2>
      <p>
        Les services s'appuient sur des services tiers (notamment Google, Stripe, Supabase,
        Cloudflare et les fournisseurs d'IA). Le Prestataire ne saurait être tenu responsable des
        interruptions, modifications ou décisions de ces tiers, en particulier des évolutions ou
        refus d'accès aux API de Google, qui échappent à son contrôle.
      </p>

      <h2>11. Propriété intellectuelle</h2>
      <p>
        La plateforme, son code et ses éléments techniques restent la propriété exclusive du
        Prestataire ; l'Utilisateur bénéficie d'un droit d'usage personnel et non exclusif pendant
        la durée de son abonnement. Les données et contenus saisis par l'Utilisateur restent sa
        propriété ; il peut en demander l'export ou la suppression. Pour les sites internet, les
        dispositions spécifiques des articles 3.4, 3.5 et 6.4 à 6.6 s'appliquent.
      </p>

      <h2>12. Droit de rétractation</h2>
      <p>
        Conformément à l'article L.221-3 du Code de la consommation, le droit de rétractation de{" "}
        <strong>14 jours</strong> s'applique aux contrats conclus à distance avec les professionnels
        employant moins de cinq salariés et pour des prestations hors du champ de leur activité
        principale. Il ne s'applique pas aux professionnels agissant dans le cadre de leur activité
        principale.
      </p>
      <p>
        Pour Sitaly App, l'Utilisateur qui bénéficie de ce droit peut se rétracter dans les 14 jours
        qui suivent la souscription d'une formule payante, par e-mail à{" "}
        <a href="mailto:contact@sitaly.fr">contact@sitaly.fr</a>. En souscrivant, il demande que le
        service commence aussitôt : s'il se rétracte, il est remboursé dans les 14 jours, déduction
        faite de la part du prix correspondant à la période déjà écoulée (article L.221-25 du Code
        de la consommation).
      </p>

      <h2>13. Responsabilité</h2>
      <p>
        Le Prestataire est tenu à une obligation de moyens. Sa responsabilité ne saurait être
        engagée en cas de force majeure, de mauvaise utilisation des services par le Client, ou
        d'intervention d'un tiers. Elle est en tout état de cause limitée au montant des sommes
        effectivement versées par le Client au titre des douze derniers mois pour la prestation
        concernée.
      </p>

      <h2>14. Résiliation et suppression du compte</h2>
      <p>
        Chaque partie peut mettre fin à la relation dans les conditions prévues ci-dessus.
        L'Utilisateur peut supprimer son compte à tout moment. Le Prestataire peut suspendre ou
        résilier un compte en cas de manquement aux présentes ou d'usage illicite. À la clôture, les
        données sont supprimées dans les conditions prévues par la politique de confidentialité.
      </p>

      <h2>15. Médiation et règlement des litiges</h2>
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

      <h2>16. Loi applicable</h2>
      <p>
        Les présentes sont soumises au droit français. Tout litige relèvera de la compétence des
        tribunaux du ressort du siège social du Prestataire, sous réserve des dispositions
        impératives applicables aux consommateurs.
      </p>
    </LegalLayout>
  );
}
