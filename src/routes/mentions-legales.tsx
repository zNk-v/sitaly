import { createFileRoute } from "@tanstack/react-router";
import { LegalLayout } from "@/components/LegalLayout";

export const Route = createFileRoute("/mentions-legales")({
  head: () => ({
    meta: [
      { title: "Mentions légales — Sitaly" },
      { name: "description", content: "Mentions légales du site Sitaly conformément à la loi française." },
      { name: "robots", content: "index,follow" },
      { property: "og:title", content: "Mentions légales — Sitaly" },
      { property: "og:description", content: "Informations légales sur l'éditeur, l'hébergeur et la propriété intellectuelle du site Sitaly." },
      { property: "og:url", content: "https://sitaly.fr/mentions-legales" },
    ],
    links: [{ rel: "canonical", href: "https://sitaly.fr/mentions-legales" }],
  }),
  component: MentionsLegales,
});

function MentionsLegales() {
  return (
    <LegalLayout title="Mentions légales" updated="17 juin 2026">
      <p>
        Conformément aux dispositions des articles 6-III et 19 de la Loi n°2004-575 du 21 juin 2004
        pour la Confiance dans l'économie numérique, dite L.C.E.N., il est porté à la connaissance
        des utilisateurs du site les présentes mentions légales.
      </p>

      <h2>1. Éditeur du site</h2>
      <p>
        <strong>Sitaly</strong>
        <br />Forme juridique : Auto-entrepreneur
        <br />Siège social : Brétigny-Sur-Orge
        <br />SIRET : 83384883100032
        <br />RCS : Evry
        <br />N° TVA intracommunautaire : Non applicable
        <br />Directeur de la publication : Teddy VIDAL
        <br />E-mail : contact@sitaly.fr
        <br />Téléphone : 0658683372
      </p>

      <h2>2. Hébergement</h2>
      <p>
        Le site est hébergé par :
        <br /><strong>Lovable / Cloudflare, Inc.</strong>
        <br />101 Townsend Street, San Francisco, CA 94107, États-Unis
        <br />Site : <a href="https://www.cloudflare.com" target="_blank" rel="noopener noreferrer">cloudflare.com</a>
      </p>

      <h2>3. Propriété intellectuelle</h2>
      <p>
        L'ensemble des éléments composant le site Sitaly (textes, graphismes, logos, images, vidéos,
        icônes, sons, logiciels, mise en page, charte graphique) sont la propriété exclusive de Sitaly
        ou de ses partenaires et sont protégés par les lois françaises et internationales relatives à
        la propriété intellectuelle.
      </p>
      <p>
        Toute reproduction, représentation, modification, publication, adaptation, totale ou partielle,
        de tout ou partie des éléments du site, quel que soit le moyen ou le procédé utilisé, est
        interdite sans autorisation écrite préalable de Sitaly, sous peine de constituer une
        contrefaçon (articles L.335-2 et suivants du Code de la propriété intellectuelle).
      </p>

      <h2>4. Limitation de responsabilité</h2>
      <p>
        Sitaly s'efforce d'assurer au mieux de ses possibilités l'exactitude et la mise à jour des
        informations diffusées sur ce site, dont elle se réserve le droit de corriger, à tout moment et
        sans préavis, le contenu. Toutefois, Sitaly ne peut garantir l'exactitude, la précision ou
        l'exhaustivité des informations mises à la disposition sur ce site.
      </p>

      <h2>5. Liens hypertextes</h2>
      <p>
        Le site peut contenir des liens vers d'autres sites internet. Sitaly n'exerce aucun contrôle
        sur ces sites et décline toute responsabilité quant à leur contenu.
      </p>

      <h2>6. Droit applicable et juridiction compétente</h2>
      <p>
        Les présentes mentions légales sont régies par le droit français. En cas de litige, et après
        une tentative de recherche d'une solution amiable, les tribunaux français seront seuls
        compétents pour connaître de ce litige.
      </p>

      <h2>7. Contact</h2>
      <p>
        Pour toute question relative au site ou à ces mentions légales, vous pouvez nous contacter à
        l'adresse : <a href="mailto:contact@sitaly.fr">contact@sitaly.fr</a>.
      </p>
    </LegalLayout>
  );
}
