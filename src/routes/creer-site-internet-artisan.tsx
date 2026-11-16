import { createFileRoute, Link } from "@tanstack/react-router";
import { ArrowRight } from "lucide-react";
import { SiteChrome } from "@/components/SiteChrome";
import { ArticlesALire } from "@/components/ArticlesALire";
import {
  BOUTON_NOIR,
  BoiteApp,
  CARTE,
  Confiance,
  TEXTE_GRIS,
  lienCreation,
} from "@/components/produit/Produit";
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
import { MODELES } from "@/data/modeles";
import { euros } from "@/lib/config";

/**
 * La page pilier « Créer un site internet d'artisan » (SITA-14, texte validé
 * par Ted). Elle vise la requête « créer un site internet d'artisan » et sert
 * de porte d'entrée aux modèles par métier, aux pages produits et aux guides
 * du blog.
 *
 * Les prix viennent de CREATEUR_IA (src/data/offres.ts) : aucun montant n'est
 * écrit ici. La fiche SEO et l'adresse vivent dans src/data/piliers.ts.
 */

/** Les modèles cités par le guide, dans l'ordre du document source. */
const MODELES_CITES = [
  "plombier",
  "electricien",
  "couvreur",
  "menuisier",
  "peintre",
  "paysagiste",
  "coiffeuse",
  "boulanger",
  "artisan",
];

const ARTICLES = [
  "creation-site-internet-artisan-guide",
  "combien-coute-site-internet-artisan",
  "referencement-local-google-artisan",
  "comparatif-solutions-site-internet-artisan",
];

const ETAPES = [
  {
    titre: "Il décrit son activité.",
    texte: "Une phrase : métier, ville, services, coordonnées. Deux minutes.",
  },
  {
    titre: "Il relit.",
    texte:
      "L'IA a écrit les textes, choisi la structure et posé une photo d'illustration. Il corrige un mot, change une couleur, remplace la photo par celle de son camion si l'envie lui vient.",
  },
  {
    titre: "Il publie.",
    texte: `Le site part en ligne avec son hébergement, son certificat HTTPS et, dès la formule ${IA.essentiel.nom}, son propre nom de domaine.`,
  },
];

const FAQ = [
  {
    q: "Faut-il savoir coder pour créer son site ?",
    a: "Non. Toute la création se fait en langage courant : l'artisan écrit ce qu'il veut dire ou changer, l'IA s'occupe de la mise en page et du code.",
  },
  {
    q: "Le site est-il vraiment gratuit au départ ?",
    a: `Oui. La formule ${IA.decouverte.nom} crée et publie le site sur une adresse en .sitaly.fr, sans carte bancaire. Le nom de domaine personnel et les crédits supplémentaires arrivent avec les formules payantes.`,
  },
  {
    q: "Combien de temps avant d'avoir un site en ligne ?",
    a: "Quelques minutes pour la création, puis le temps que l'artisan prend pour relire les textes avant de publier.",
  },
  {
    q: "Puis-je changer le site moi-même après la création ?",
    a: "Oui, en écrivant la modification en une phrase à l'IA, ou en corrigeant directement un mot sur la page.",
  },
  {
    q: "Le site m'aide-t-il à apparaître sur Google ?",
    a: "Il pose les bases techniques du référencement local. Aucun outil ne garantit une place dans les résultats : les avis récents et une fiche Google Business Profile à jour comptent autant que le site.",
  },
  {
    q: "Y a-t-il un engagement de durée ?",
    a: "Non, sur les formules mensuelles. L'artisan arrête quand il le souhaite.",
  },
];

export const Route = createFileRoute("/creer-site-internet-artisan")({
  head: () => ({
    ...metaPilier(PILIER_SITE),
    scripts: scriptsPilier({
      pilier: PILIER_SITE,
      faq: FAQ.map((f) => ({ q: f.q, aTexte: f.a })),
      avecApplication: true,
    }),
  }),
  component: PageCreerSite,
});

function PageCreerSite() {
  const nomDe = (id: string) => MODELES.find((m) => m.id === id)?.nom ?? id;

  return (
    <div className="min-h-screen bg-white text-[#09090b]">
      <SiteChrome>
        <section className="px-4 pt-10 pb-6 sm:px-6 sm:pt-16">
          <div className="mx-auto max-w-3xl">
            <FilDAriane nom={PILIER_SITE.nom} />
            <div className="mt-6 text-sm font-medium text-brand-ink">Guide</div>
            <h1 className="titre-produit mt-3 text-[2.4rem] sm:text-5xl lg:text-6xl">
              {insecable("Créer un site internet d'artisan : le guide complet")}
            </h1>
            <P>
              Un plombier qui dépanne depuis dix ans sans site perd des appels tous les jours, au
              profit du premier résultat que Google affiche. Créer un site internet d'artisan
              n'exige plus un développeur ni un budget de plusieurs milliers d'euros. Ce guide
              détaille les étapes, ce que le site doit contenir pour transformer une visite en
              appel, et ce que ça coûte réellement en 2026.
            </P>
            <div className="mt-8 flex flex-col items-start gap-3">
              <a href={lienCreation()} className={`${BOUTON_NOIR} min-h-12 px-6 text-base`}>
                Créer mon site <ArrowRight className="h-4 w-4" aria-hidden="true" />
              </a>
              <span className={`text-sm ${TEXTE_GRIS}`}>Gratuit, sans carte bancaire.</span>
            </div>
          </div>
        </section>

        <Bloc>
          <H2>Les trois façons de créer un site internet quand on est artisan</H2>
          <P>
            Un électricien qui compare ses options trouve trois chemins. L'agence web classique
            écrit le site à sa place, facture la création plusieurs milliers d'euros, puis un
            forfait mensuel pour l'hébergement et les modifications. Le délai se compte en semaines.
            L'éditeur de site généraliste (Wix, Squarespace) coûte moins cher, mais l'artisan écrit
            lui-même chaque texte, choisit lui-même sa structure, et doit comprendre le
            référencement local pour que la page serve à quelque chose. La troisième voie, un
            créateur de site par IA pensé pour les métiers manuels comme Sitaly, décrit le métier et
            la ville en une phrase et reçoit un site déjà écrit, déjà structuré pour le
            référencement local, à relire plutôt qu'à rédiger.
          </P>
        </Bloc>

        <Bloc>
          <H2>Comment Sitaly crée le site, en trois étapes</H2>
          <P>
            Un couvreur qui doit répondre à un appel de tempête n'a pas trois semaines à donner à un
            site. Avec Sitaly :
          </P>
          <ol className="mt-6 space-y-4">
            {ETAPES.map((e, k) => (
              <li key={e.titre} className={`${CARTE} p-6`}>
                <span className="text-sm font-semibold text-brand-ink">Étape {k + 1}</span>
                <p className="mt-2 text-lg leading-8">
                  <strong className="font-semibold">{e.titre}</strong>{" "}
                  <span className={TEXTE_GRIS}>{e.texte}</span>
                </p>
              </li>
            ))}
          </ol>
          <P>
            L'IA n'invente ni tarif, ni assurance, ni avis que l'artisan n'a pas donnés. Ce qu'elle
            écrit vient de ce qu'il lui a confié.
          </P>
        </Bloc>

        <Bloc>
          <H2>Ce qu'un site d'artisan doit contenir pour transformer une visite en appel</H2>
          <P>
            Un menuisier qui vend du sur mesure n'a pas besoin des mêmes pages qu'un chauffagiste
            qui dépanne dans l'urgence, mais cinq éléments reviennent sur tous les métiers du
            bâtiment et des services :
          </P>
          <ul className={`mt-6 space-y-4 text-lg leading-8 ${TEXTE_GRIS}`}>
            <li>
              <strong className="font-semibold text-black">
                Le numéro et la zone d'intervention
              </strong>
              , visibles dès le premier écran. Un client presse cherche d'abord à savoir si
              l'artisan vient jusqu'à chez lui.
            </li>
            <li>
              <strong className="font-semibold text-black">Les réalisations</strong>, en photos.
              Pour un menuisier, trois photos d'un meuble fini valent mieux qu'un paragraphe sur le
              savoir-faire.
            </li>
            <li>
              <strong className="font-semibold text-black">
                Un formulaire de demande de devis
              </strong>{" "}
              court, qui arrive directement dans la boîte mail de l'artisan. Sitaly y ajoute un vrai
              devis chiffré, que le client accepte en ligne (
              <LienProduit id="devis-et-factures">devis et factures</LienProduit>).
            </li>
            <li>
              <strong className="font-semibold text-black">Les avis clients</strong>, relevés depuis
              la fiche Google de l'artisan plutôt qu'écrits à la main (
              <LienProduit id="avis-google">avis Google</LienProduit>).
            </li>
            <li>
              <strong className="font-semibold text-black">Les garanties</strong> : assurance
              décennale, qualifications, numéro SIRET, quand l'artisan les détient. L'IA ne les
              affiche jamais sans qu'il les ait données.
            </li>
          </ul>
        </Bloc>

        <Bloc>
          <H2>Le référencement local, la base pour être trouvé</H2>
          <P>
            Un peintre en bâtiment qui ne nomme jamais ses communes d'intervention n'apparaît pas
            quand un habitant de la ville voisine cherche « peintre » suivi du nom de sa ville.
            Sitaly pose les bases dès la création : un titre et une description par page, les
            communes couvertes nommées dans les textes, des données structurées lisibles par Google,
            un plan du site (
            <LienProduit id="referencement-seo-geo">référencement SEO et GEO</LienProduit>
            ). Aucune de ces bases ne garantit une place en tête des résultats : elles donnent au
            site une chance d'y figurer, le reste se construit avec le temps, les avis récents et
            une fiche Google Business Profile tenue à jour. Lire :{" "}
            <LienArticle slug="referencement-local-google-artisan">
              le référencement local pour un artisan
            </LienArticle>
            .
          </P>
        </Bloc>

        <Bloc>
          <H2>Combien coûte un site internet d'artisan avec Sitaly</H2>
          <P>
            Un paysagiste qui a déjà reçu un devis d'agence à trois chiffres découvre une autre
            grille avec Sitaly :
          </P>
          <TableauPilier
            entetes={["Formule", "Prix", "Ce qui est inclus"]}
            lignes={[
              [
                IA.decouverte.nom,
                `${euros(IA.decouverte.mensuel)}/mois`,
                `Création et aperçu sur une adresse en .sitaly.fr, ${IA.decouverte.credits} crédits de retouche`,
              ],
              [
                IA.essentiel.nom,
                `${euros(IA.essentiel.mensuel)}/mois (${euros(IA.essentiel.annuel)}/an)`,
                `Nom de domaine à son nom (.fr ou .com), ${IA.essentiel.credits.toLocaleString("fr-FR")} crédits par mois`,
              ],
              [
                IA.pro.nom,
                `${euros(IA.pro.mensuel)}/mois (${euros(IA.pro.annuel)}/an)`,
                `${IA.pro.credits.toLocaleString("fr-FR")} crédits par mois, crédit domaine plus large`,
              ],
            ]}
          />
          <P>
            {MENTION_TVA}. Aucun engagement de durée sur les formules mensuelles. Détail complet et
            comparatif : <LienTexte to="/tarifs/">les tarifs de Sitaly</LienTexte>.
          </P>
        </Bloc>

        <Bloc>
          <H2>Un modèle pour chaque métier</H2>
          <P>
            Sitaly a préparé un point de départ par métier, visible avant toute inscription : zone
            d'intervention pour un couvreur, grille de tarifs pour une coiffeuse, galerie de
            chantiers pour un menuisier. Un boulanger retrouve une page pensée pour ses horaires et
            ses commandes de fêtes (<LienModele id="boulanger">modèle boulanger</LienModele>) ; un
            plombier, une page qui met en avant son numéro et ses délais de dépannage (
            <LienModele id="plombier">modèle plombier</LienModele>
            ). Un métier qui ne figure pas dans la liste, comme serrurier, part du modèle
            généraliste <LienModele id="artisan">artisan</LienModele> : l'IA construit le site à
            partir de la description donnée, pas seulement d'une liste figée.
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
          <p className="mt-6">
            <LienTexte to="/modeles/">Voir tous les modèles</LienTexte>
          </p>
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
            <CartePilier pilier={PILIER_DEVIS} />
          </div>
        </Bloc>

        <section className="px-4 pt-10 pb-28 sm:px-6">
          <div className="mx-auto max-w-4xl text-center">
            <h2 className="titre-produit text-[2.15rem] sm:text-5xl lg:text-6xl">
              Votre site d'artisan, dans une minute
            </h2>
            <p className={`mx-auto mt-5 max-w-xl text-lg ${TEXTE_GRIS}`}>
              Décrivez votre métier, votre ville et vos services en une phrase : l'IA écrit le site,
              vous le relisez, vous le publiez.
            </p>
          </div>
          <div className="mx-auto mt-10 max-w-3xl">
            <BoiteApp idees={false} />
          </div>
          <Confiance />
          <p className={`mt-6 text-center ${TEXTE_GRIS}`}>
            <LienTexte to="/tarifs/">Voir les tarifs</LienTexte>
          </p>
        </section>
      </SiteChrome>
    </div>
  );
}
