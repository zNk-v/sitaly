import { createFileRoute } from "@tanstack/react-router";
import { LegalLayout } from "@/components/LegalLayout";

export const Route = createFileRoute("/politique-confidentialite")({
  head: () => ({
    meta: [
      { title: "Politique de confidentialité — Sitaly" },
      { name: "description", content: "Politique de confidentialité et protection des données personnelles (RGPD) du site et de l'application Sitaly." },
      { name: "robots", content: "index,follow" },
      { property: "og:title", content: "Politique de confidentialité — Sitaly" },
      { property: "og:description", content: "Comment Sitaly collecte, utilise et protège vos données personnelles, sur le site comme dans l'application, conformément au RGPD." },
      { property: "og:url", content: "https://sitaly.fr/politique-confidentialite" },
    ],
    links: [{ rel: "canonical", href: "https://sitaly.fr/politique-confidentialite" }],
  }),
  component: PolitiqueConfidentialite,
});

function PolitiqueConfidentialite() {
  return (
    <LegalLayout title="Politique de confidentialité" updated="8 juillet 2026">
      <p>
        La présente politique de confidentialité informe les utilisateurs du site et de
        l'application <strong>Sitaly</strong> sur la manière dont leurs données personnelles sont
        collectées et traitées, conformément au Règlement (UE) 2016/679 (RGPD) et à la loi française
        « Informatique et Libertés » du 6 janvier 1978 modifiée.
      </p>

      <h2>1. Responsable du traitement</h2>
      <p>
        Le responsable du traitement est <strong>Sitaly</strong>, auto-entrepreneur, dont le siège
        social est situé 25 allée des jardins, 91220 Brétigny-Sur-Orge, immatriculée sous le numéro
        SIRET 83384883100032.
        <br />Contact : <a href="mailto:contact@sitaly.fr">contact@sitaly.fr</a>
      </p>

      <h2>2. Champ d'application et rôles</h2>
      <p>
        La présente politique couvre deux environnements : le <strong>site vitrine</strong>{" "}
        (sitaly.fr) et l'<strong>application Sitaly</strong> (l'espace client destiné aux artisans et
        petites entreprises). Selon les données concernées, Sitaly agit à deux titres différents :
      </p>
      <ul>
        <li>
          <strong>En tant que responsable de traitement</strong>, pour les données des visiteurs du
          site, les demandes de contact et de devis, ainsi que les données du compte de l'utilisateur
          de l'application (identité de l'entreprise, facturation).
        </li>
        <li>
          <strong>En tant que sous-traitant</strong>, pour les données que l'utilisateur enregistre
          lui-même dans l'application au sujet de ses propres clients et prospects. L'utilisateur
          reste le responsable de traitement de ces données ; Sitaly les traite uniquement pour son
          compte et selon ses instructions (voir les{" "}
          <a href="/cgv">conditions générales</a>).
        </li>
      </ul>

      <h2>3. Données collectées</h2>
      <p><strong>Sur le site vitrine :</strong></p>
      <ul>
        <li><strong>Identification</strong> : nom, prénom, e-mail, téléphone (contact / demande de devis).</li>
        <li><strong>Données professionnelles</strong> : entreprise, secteur d'activité, ville.</li>
        <li><strong>Connexion</strong> : adresse IP, type de navigateur, pages visitées, date et heure.</li>
      </ul>
      <p><strong>Dans l'application (compte utilisateur) :</strong></p>
      <ul>
        <li>Adresse e-mail et mot de passe (stocké sous forme chiffrée / haché) ;</li>
        <li>Nom de l'entreprise, métier, formule d'abonnement, lien d'avis Google ;</li>
        <li>Données de paiement, gérées directement par notre prestataire de paiement (Sitaly n'a pas accès au numéro complet de la carte).</li>
      </ul>
      <p><strong>Dans l'application (données saisies par l'utilisateur sur ses clients, traitées en sous-traitance) :</strong></p>
      <ul>
        <li>Coordonnées des clients et prospects de l'utilisateur : nom, téléphone, e-mail, adresse ;</li>
        <li>Notes, statut commercial et historique saisis par l'utilisateur ;</li>
        <li>Contenus soumis à l'assistant IA pour générer un texte (par exemple un avis à traiter).</li>
      </ul>
      <p><strong>Connexion à Google (fonctionnalité optionnelle) :</strong> si l'utilisateur relie sa fiche d'établissement Google, Sitaly accède, sur son instruction et via l'API officielle de Google, à ses avis Google afin de les afficher et d'y répondre depuis l'application.</p>

      <h2>4. Finalités du traitement</h2>
      <ul>
        <li>Répondre aux demandes de contact et de devis ;</li>
        <li>Créer et gérer le compte utilisateur et l'accès à l'application ;</li>
        <li>Fournir les fonctionnalités de la plateforme (gestion des clients, assistance à la rédaction, gestion des avis) ;</li>
        <li>Assurer la facturation des abonnements et le respect de nos obligations légales et comptables ;</li>
        <li>Assurer la sécurité, prévenir la fraude et améliorer le service ;</li>
        <li>Vous adresser des informations commerciales (sous réserve de votre consentement).</li>
      </ul>

      <h2>5. Bases légales</h2>
      <p>
        Les traitements reposent sur : votre <strong>consentement</strong> (formulaires, cookies non
        essentiels, connexion Google), l'<strong>exécution d'un contrat</strong> (compte, abonnement,
        prestations), le respect d'une <strong>obligation légale</strong> (comptabilité, facturation)
        et notre <strong>intérêt légitime</strong> (sécurité, amélioration du service).
      </p>

      <h2>6. Sous-traitants et destinataires</h2>
      <p>
        Vos données sont destinées à Sitaly et à ses sous-traitants techniques, sélectionnés pour
        leurs garanties de sécurité et de conformité. Aucune donnée n'est vendue à des tiers.
        Principaux sous-traitants :
      </p>
      <ul>
        <li><strong>Supabase</strong> — hébergement de la base de données et gestion de l'authentification de l'application ;</li>
        <li><strong>Anthropic (Claude)</strong> — génération de texte par l'assistant IA ;</li>
        <li><strong>Google</strong> — accès à la fiche d'établissement et aux avis, lorsque l'utilisateur active la connexion ;</li>
        <li><strong>Stripe</strong> — traitement sécurisé des paiements d'abonnement ;</li>
        <li>Prestataires d'envoi d'e-mails, d'analyse d'audience et de comptabilité.</li>
      </ul>

      <h2>7. Utilisation des données issues des API Google</h2>
      <p>
        L'utilisation et le transfert par Sitaly des informations reçues via les API de Google
        respectent la{" "}
        <a href="https://developers.google.com/terms/api-services-user-data-policy" target="_blank" rel="noopener noreferrer">
          Politique relative aux données utilisateur des services API Google
        </a>, y compris ses exigences d'<strong>utilisation limitée</strong> (Limited Use). Les données
        de la fiche Google et les avis auxquels l'application accède sont utilisés uniquement pour
        fournir les fonctionnalités visibles par l'utilisateur (afficher ses avis et l'aider à y
        répondre). Ces données ne sont ni vendues, ni utilisées à des fins publicitaires, ni
        exploitées pour entraîner des modèles d'intelligence artificielle.
      </p>

      <h2>8. Durée de conservation</h2>
      <ul>
        <li>Données de prospects / demandes de contact : <strong>3 ans</strong> à compter du dernier contact.</li>
        <li>Compte utilisateur et données associées : pendant toute la durée du compte, puis supprimées ou anonymisées dans un délai raisonnable après sa clôture.</li>
        <li>Données saisies par l'utilisateur sur ses clients : conservées tant qu'il les conserve dans l'application ; supprimées à sa demande ou à la clôture de son compte.</li>
        <li>Données comptables et factures : <strong>10 ans</strong> conformément aux obligations légales.</li>
        <li>Données de connexion : <strong>13 mois</strong> maximum. Cookies : voir la <a href="/cookies">politique cookies</a>.</li>
      </ul>

      <h2>9. Vos droits</h2>
      <p>
        Conformément au RGPD, vous disposez des droits d'accès, de rectification, d'effacement, de
        limitation, d'opposition, à la portabilité, du droit de retirer votre consentement à tout
        moment et de définir le sort de vos données après votre décès. Vous pouvez exercer ces droits
        en écrivant à <a href="mailto:contact@sitaly.fr">contact@sitaly.fr</a>, en justifiant de votre
        identité. Dans l'application, vous pouvez également supprimer directement les fiches clients
        que vous avez créées et demander la suppression de votre compte.
      </p>
      <p>
        Vous disposez du droit d'introduire une réclamation auprès de la{" "}
        <strong>CNIL</strong> : <a href="https://www.cnil.fr" target="_blank" rel="noopener noreferrer">www.cnil.fr</a>.
      </p>

      <h2>10. Transfert de données hors Union européenne</h2>
      <p>
        Certains sous-traitants (par exemple Anthropic, Google ou Stripe) peuvent traiter des données
        en dehors de l'Union européenne, notamment aux États-Unis. Dans ce cas, des garanties
        appropriées (clauses contractuelles types de la Commission européenne, ou adhésion à un cadre
        de protection reconnu) encadrent ces transferts pour assurer un niveau de protection adéquat.
      </p>

      <h2>11. Sécurité</h2>
      <p>
        Sitaly met en œuvre des mesures techniques et organisationnelles appropriées : connexion
        chiffrée (HTTPS), mots de passe stockés hachés, cloisonnement des données de chaque entreprise
        (chaque utilisateur n'accède qu'à ses propres données), accès restreints et sauvegardes
        régulières.
      </p>

      <h2>12. Suppression du compte</h2>
      <p>
        Vous pouvez demander à tout moment la suppression de votre compte et des données associées en
        écrivant à <a href="mailto:contact@sitaly.fr">contact@sitaly.fr</a>. La suppression entraîne
        l'effacement des données saisies dans l'application, sous réserve des données que Sitaly doit
        conserver au titre de ses obligations légales (facturation notamment).
      </p>
    </LegalLayout>
  );
}
