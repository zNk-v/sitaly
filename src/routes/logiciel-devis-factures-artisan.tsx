import { createFileRoute, Link } from "@tanstack/react-router";
import { ArrowRight } from "lucide-react";
import { SiteChrome } from "@/components/SiteChrome";
import { ArticlesALire } from "@/components/ArticlesALire";
import { BOUTON_NOIR, CARTE, Confiance, TEXTE_GRIS } from "@/components/produit/Produit";
import {
  Bloc,
  CartePilier,
  FaqPilier,
  FilDAriane,
  H2,
  insecable,
  LienArticle,
  LienModele,
  LienProduit,
  LienTexte,
  P,
  TableauPilier,
  metaPilier,
  scriptsPilier,
} from "@/components/pilier/Pilier";
import { PILIER_DEVIS, PILIER_SITE } from "@/data/piliers";
import { CREATEUR_IA as IA, MENTION_TVA } from "@/data/offres";
import { produit } from "@/data/produits";
import { MODELES } from "@/data/modeles";
import { euros } from "@/lib/config";

/**
 * La page pilier « Logiciel de devis et factures pour artisans » (SITA-14,
 * texte validé par Ted). Elle tient l'intention comparative — comparer et
 * choisir un logiciel — et pousse vers /produits/devis-et-factures/, qui reste
 * la page technique et commerciale : décision de Ted du 15 novembre 2026, les
 * deux pages restent distinctes pour ne pas se concurrencer sur la même
 * requête.
 *
 * Les prix et les quotas viennent de src/data/offres.ts et
 * src/data/produits.ts : rien n'est recopié ici.
 */

const PRODUIT = produit("devis-et-factures");

/** Le quota de factures de chaque formule, lu sur la page produit. */
const FACTURES = PRODUIT.inclus.map((v) => v || "Non compris");

/** Les modèles cités par le guide, dans l'ordre du document source. */
const MODELES_CITES = ["boulanger", "plombier", "macon", "paysagiste", "menuisier", "couvreur"];

const ARTICLES = [
  "logiciel-devis-artisan-choisir",
  "mentions-obligatoires-devis-artisan",
  "facturation-electronique-artisan-2027",
  "relance-automatique-devis",
];

/** La suite de chaque titre : elle commence par son propre séparateur. */
const ETAPES = [
  {
    titre: "Il prépare le devis",
    texte:
      " depuis la fiche du client : lignes, quantités, TVA. L'aperçu se dessine à côté, tel que le client le verra.",
  },
  {
    titre: "Le client l'accepte en ligne",
    texte:
      ", par un lien reçu par e-mail. Il lit, écrit son nom, et c'est un bon pour accord. Le plombier est prévenu aussitôt.",
  },
  {
    titre: "Le devis devient une facture",
    texte: " en un clic, payable par carte ou par virement.",
  },
];

const FAQ = [
  {
    q: "Mes factures sont-elles conformes à la loi ?",
    a: "Oui, avec Sitaly : mentions obligatoires, numérotation sans trou, correction par avoir plutôt que par modification.",
  },
  {
    q: "Que change la facturation électronique de 2027 ?",
    a: "Elle devient obligatoire entre professionnels pour les petites entreprises à partir du 1er septembre 2027. Les factures aux particuliers restent en PDF.",
  },
  {
    q: "Combien coûte le paiement par carte ?",
    a: "Aucune commission Sitaly. Seuls les frais Stripe, prélevés sur la somme reçue, s'appliquent. Le virement reste gratuit.",
  },
  {
    q: "Mon client doit-il créer un compte pour payer ?",
    a: "Non. Il ouvre le lien reçu, lit le document, accepte le devis ou règle la facture.",
  },
  {
    q: "Puis-je essayer gratuitement ?",
    a: `Oui. La formule ${IA.decouverte.nom} permet des devis illimités et ${FACTURES[0].toLowerCase()}, sans carte bancaire.`,
  },
];

export const Route = createFileRoute("/logiciel-devis-factures-artisan")({
  head: () => ({
    ...metaPilier(PILIER_DEVIS),
    scripts: scriptsPilier({
      pilier: PILIER_DEVIS,
      faq: FAQ.map((f) => ({ q: f.q, aTexte: f.a })),
    }),
  }),
  component: PageLogicielDevis,
});

function PageLogicielDevis() {
  const nomDe = (id: string) => MODELES.find((m) => m.id === id)?.nom ?? id;
  const formule = (nom: string, mensuel: number) => `${nom} (${euros(mensuel)}/mois)`;
  const formuleAnnuelle = (nom: string, mensuel: number, annuel: number) =>
    `${nom} (${euros(mensuel)}/mois, ${euros(annuel)}/an)`;

  return (
    <div className="min-h-screen bg-white text-[#09090b]">
      <SiteChrome>
        <section className="px-4 pt-10 pb-6 sm:px-6 sm:pt-16">
          <div className="mx-auto max-w-3xl">
            <FilDAriane nom={PILIER_DEVIS.nom} />
            <div className="mt-6 text-sm font-medium text-brand-ink">Guide</div>
            <h1 className="titre-produit mt-3 text-[2.4rem] sm:text-5xl lg:text-6xl">
              {insecable("Logiciel de devis et factures pour artisans : comment bien choisir")}
            </h1>
            <P>
              Un serrurier qui dépanne une ouverture de porte à vingt-deux heures n'a pas le temps
              d'écrire un devis à la main avant d'intervenir, ni l'envie de laisser un impayé
              traîner trois mois.
            </P>
            <P>
              Un bon logiciel de devis et factures règle les deux problèmes : un devis envoyé et
              accepté en deux minutes, une facture qui se paie et se relance sans intervention. Ce
              guide détaille ce qu'un tel outil doit garantir à un artisan, et ce qu'il coûte.
            </P>
            <div className="mt-8 flex flex-col items-start gap-3">
              <Link
                to="/produits/$id/"
                params={{ id: PRODUIT.id }}
                className={`${BOUTON_NOIR} min-h-12 px-6 text-base`}
              >
                {PRODUIT.cta} <ArrowRight className="h-4 w-4" aria-hidden="true" />
              </Link>
              <span className={`text-sm ${TEXTE_GRIS}`}>
                Devis illimités dans toutes les formules, sans carte bancaire.
              </span>
            </div>
          </div>
        </section>

        <Bloc>
          <H2>Pourquoi un tableur ou un carnet à souche ne suffit plus</H2>
          <P>
            Un maçon qui chiffre une extension sur un carnet à souche prend un risque réel : une
            facture mal numérotée, une mention obligatoire oubliée, un calcul de TVA faux, et c'est
            lui qui répond en cas de contrôle.
          </P>
          <P>
            Un tableur partagé n'empêche ni l'erreur de recopie ni la perte du fichier. Un logiciel
            de devis et factures pensé pour les artisans numérote sans trou, calcule la TVA, et
            conserve chaque document.
          </P>
        </Bloc>

        <Bloc>
          <H2>Ce qu'un logiciel de devis et factures doit garantir à un artisan</H2>
          <P>Cinq points séparent un outil conforme d'un simple modèle Word :</P>
          <ul className={`mt-6 space-y-4 text-lg leading-8 ${TEXTE_GRIS}`}>
            <li>
              <strong className="font-semibold text-black">La numérotation sans trou</strong>, et
              une facture qui ne se modifie plus une fois envoyée. Une erreur se corrige par un
              avoir, jamais par une réécriture.
            </li>
            <li>
              <strong className="font-semibold text-black">Les mentions obligatoires</strong> :
              SIRET, pénalités de retard, mention de franchise en base de TVA pour une
              micro-entreprise, assurance décennale quand elle s'applique. Détail :{" "}
              <LienArticle slug="mentions-obligatoires-devis-artisan">
                les mentions obligatoires d'un devis d'artisan
              </LienArticle>
              .
            </li>
            <li>
              <strong className="font-semibold text-black">
                Le paiement par carte ou par virement
              </strong>
              , sans que l'artisan ait à gérer un terminal de paiement.
            </li>
            <li>
              <strong className="font-semibold text-black">
                La relance automatique des impayés
              </strong>
              , pour ne pas avoir à rappeler un client en retard.
            </li>
            <li>
              <strong className="font-semibold text-black">L'historique par client</strong>, pour
              retrouver en un clic ce qui a été devisé, facturé et payé.
            </li>
          </ul>
          <P>
            Le produit <LienProduit id={PRODUIT.id}>devis et factures</LienProduit> de Sitaly réunit
            ces cinq points.
          </P>
        </Bloc>

        <Bloc>
          <H2>Le devis accepté en ligne, étape par étape</H2>
          <P>
            Un plombier qui intervient pour une fuite veut un accord écrit avant de commencer, sans
            faire attendre le client. Avec Sitaly :
          </P>
          <ol className="mt-6 space-y-4">
            {ETAPES.map((e, k) => (
              <li key={e.titre} className={`${CARTE} p-6`}>
                <span className="text-sm font-semibold text-brand-ink">Étape {k + 1}</span>
                <p className="mt-2 text-lg leading-8">
                  <strong className="font-semibold">{e.titre}</strong>
                  <span className={TEXTE_GRIS}>{e.texte}</span>
                </p>
              </li>
            ))}
          </ol>
        </Bloc>

        <Bloc>
          <H2>La facture payée par carte, les impayés relancés sans y penser</H2>
          <P>
            Un paysagiste qui facture un contrat d'entretien à l'année ne veut pas suivre quinze
            échéances à la main. Relié à un compte Stripe en quelques minutes, son logiciel encaisse
            directement sur son compte, sans commission Sitaly, seuls les frais Stripe s'appliquent.
          </P>
          <P>
            Un rappel part seul au client le lendemain de l'échéance, puis à huit et quinze jours.
            Le virement reste gratuit pour qui préfère ne pas payer par carte. Quand relancer et
            quoi écrire :{" "}
            <LienArticle slug="relance-automatique-devis">la relance d'un devis</LienArticle>.
          </P>
        </Bloc>

        <Bloc>
          <H2>La facturation électronique 2027, ce qui change pour un artisan</H2>
          <P>
            Un menuisier qui travaille aussi pour des entreprises verra l'émission électronique des
            factures devenir obligatoire entre professionnels à partir du 1er septembre 2027 pour
            les petites structures.
          </P>
          <P>
            Pour ses clients particuliers, la facture au format PDF reste valable. Ce qui compte
            d'ici là : choisir un outil qui annonce s'y préparer, pas un carnet papier qu'il faudra
            abandonner dans l'urgence. Détail :{" "}
            <LienArticle slug="facturation-electronique-artisan-2027">
              la facturation électronique 2027 pour les artisans
            </LienArticle>
            .
          </P>
        </Bloc>

        <Bloc>
          <H2>Combien coûte un logiciel de devis et factures avec Sitaly</H2>
          <P>
            Un couvreur qui multiplie les devis après chaque tempête ne veut pas compter ses envois
            :
          </P>
          <TableauPilier
            entetes={["Formule", "Devis", "Factures", "Relances automatiques"]}
            lignes={[
              [formule(IA.decouverte.nom, IA.decouverte.mensuel), "Illimités", FACTURES[0], "Non"],
              [
                formuleAnnuelle(IA.essentiel.nom, IA.essentiel.mensuel, IA.essentiel.annuel),
                "Illimités",
                FACTURES[1],
                "Oui",
              ],
              [
                formuleAnnuelle(IA.pro.nom, IA.pro.mensuel, IA.pro.annuel),
                "Illimités",
                FACTURES[2],
                "Oui",
              ],
            ]}
          />
          <P>
            {MENTION_TVA}. Détail complet :{" "}
            <LienTexte to="/tarifs/">les tarifs de Sitaly</LienTexte>.
          </P>
        </Bloc>

        <Bloc>
          <H2>Le devis et la facture ne suffisent pas sans un site qui amène la demande</H2>
          <P>
            Un boulanger qui reçoit une demande de pièce montée par téléphone peut déjà la
            transformer en devis chiffré dans Sitaly, mais cette demande est arrivée parce qu'un
            client a trouvé son activité quelque part.
          </P>
          <P>
            Le logiciel de devis et factures fait partie du site de l'artisan, pas un outil séparé :
            zone d'intervention, galerie de réalisations et formulaire de contact amènent la
            demande, le devis et la facture la concluent. Pour créer ce site :{" "}
            <LienTexte to={PILIER_SITE.chemin}>créer un site internet d'artisan</LienTexte> et le{" "}
            <LienModele id="boulanger">modèle boulanger</LienModele>.
          </P>
          <ul className="mt-8 grid gap-3 sm:grid-cols-2">
            {MODELES_CITES.map((id) => (
              <li key={id} className="flex">
                <Link
                  to="/modeles/$id/"
                  params={{ id }}
                  className={`${CARTE} group flex w-full items-center justify-between gap-3 p-4 transition hover:bg-black/[0.05]`}
                >
                  <span className="font-medium first-letter:uppercase">
                    Site internet pour {nomDe(id)}
                  </span>
                  <ArrowRight
                    className="h-4 w-4 shrink-0 transition group-hover:translate-x-0.5"
                    aria-hidden="true"
                  />
                </Link>
              </li>
            ))}
          </ul>
        </Bloc>

        <Bloc>
          <H2>Questions fréquentes</H2>
          <FaqPilier items={FAQ} />
        </Bloc>

        <Bloc>
          <H2>Pour aller plus loin</H2>
          <div className="mt-8">
            <ArticlesALire
              slugs={ARTICLES}
              titre=""
              classeCarte={`${CARTE} p-6 transition hover:bg-black/[0.05]`}
              classeLien="text-black"
            />
          </div>
          <div className="mt-3">
            <CartePilier pilier={PILIER_SITE} />
          </div>
        </Bloc>

        <section className="px-4 pt-10 pb-28 sm:px-6">
          <div className={`${CARTE} mx-auto max-w-3xl px-6 py-14 text-center`}>
            <h2 className="titre-produit text-[2rem] sm:text-5xl">
              Votre premier devis, en deux minutes
            </h2>
            <p className={`mx-auto mt-5 max-w-xl text-lg ${TEXTE_GRIS}`}>
              Les devis et les factures sont dans la même application que votre site. Devis
              illimités dès la formule {IA.decouverte.nom}.
            </p>
            <Link
              to="/produits/$id/"
              params={{ id: PRODUIT.id }}
              className={`${BOUTON_NOIR} mt-8 px-6 py-3.5 text-base`}
            >
              {PRODUIT.cta} <ArrowRight className="h-4 w-4" aria-hidden="true" />
            </Link>
            <Confiance />
            <p className={`mt-6 ${TEXTE_GRIS}`}>
              <LienTexte to="/tarifs/">Voir les tarifs</LienTexte>
            </p>
          </div>
        </section>
      </SiteChrome>
    </div>
  );
}
