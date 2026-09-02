import realPataud720 from "@/assets/real-pataud-720.jpg";
import realPataud1200 from "@/assets/real-pataud-1200.jpg";
import realPataudMobile from "@/assets/real-pataud-mobile.jpg";
import realLafleur720 from "@/assets/real-lafleur-720.jpg";
import realLafleur1200 from "@/assets/real-lafleur-1200.jpg";
import realLafleurMobile from "@/assets/real-lafleur-mobile.jpg";
import realFelicioni720 from "@/assets/real-felicioni-720.jpg";
import realFelicioni1200 from "@/assets/real-felicioni-1200.jpg";
import realFelicioniMobile from "@/assets/real-felicioni-mobile.jpg";

/**
 * Les réalisations Sitaly.
 *
 * Règle de contenu : tout ce qui figure ici est vérifiable en ouvrant le site du
 * client. Les captures sont de vraies captures des sites en ligne, prises à la
 * date indiquée. Aucun chiffre de résultat n'est avancé tant que le client ne
 * l'a pas communiqué — d'où le champ `resultats`, laissé vide et simplement
 * non rendu quand il n'y a rien à dire.
 */
export type Realisation = {
  slug: string;
  client: string;
  metier: string;
  zone: string;
  url: string;
  domaine: string;
  /** Phrase d'accroche du site du client, reprise telle quelle. */
  accroche: string;
  resume: string;
  /** Ce que Sitaly a livré. Constatable sur le site. */
  livre: readonly string[];
  /** Partis pris de conception, justifiés par le métier. */
  choix: readonly { titre: string; texte: string }[];
  /** Éléments visibles sur le site du client au moment de la capture. */
  constats: readonly string[];
  /** Chiffres communiqués par le client. Vide tant qu'il n'a rien transmis. */
  resultats: readonly { valeur: string; libelle: string }[];
  capture: { small: string; large: string; mobile: string };
  captureLe: string;
  accent: string;
};

export const REALISATIONS: Realisation[] = [
  {
    slug: "lafleur-toiture",
    client: "Lafleur Toiture",
    metier: "Couverture, ravalement et peinture",
    zone: "Essonne (91)",
    url: "https://lafleur-toiture.fr/",
    domaine: "lafleur-toiture.fr",
    accroche: "Votre toiture refaite par un couvreur de confiance en Essonne",
    resume:
      "Un couvreur dont les clients appellent en urgence, pour une fuite ou une tuile envolée. Le site est construit autour d'une seule question : combien de secondes entre l'arrivée sur la page et l'appel.",
    livre: [
      "Site vitrine sur mesure",
      "Référencement local sur les communes d'intervention",
      "Fiche Google Business optimisée",
      "Hébergement, maintenance et modifications",
    ],
    choix: [
      {
        titre: "Le téléphone avant tout le reste",
        texte:
          "Numéro cliquable dans l'en-tête, dans le hero, dans la section contact et dans le pied de page. Sur un dépannage de toiture, un formulaire ne remplace pas un appel.",
      },
      {
        titre: "La preuve sociale au premier écran",
        texte:
          "La note Google réelle est affichée à côté du bouton d'appel. C'est l'argument le plus fort de la page, il n'a rien à faire en bas.",
      },
      {
        titre: "Les communes en toutes lettres",
        texte:
          "La zone d'intervention est listée en texte, commune par commune. Une image de carte ne se référence pas.",
      },
    ],
    constats: [
      "Note de 5,0 sur 18 avis Google affichée dans le hero",
      "Devis gratuit annoncé sous 24h",
      "Garantie décennale et statut d'artisan local mis en avant",
    ],
    resultats: [],
    capture: { small: realLafleur720, large: realLafleur1200, mobile: realLafleurMobile },
    captureLe: "2 septembre 2026",
    accent: "oklch(0.45 0.13 255)",
  },
  {
    slug: "entreprise-felicioni",
    client: "Entreprise Felicioni",
    metier: "Rénovation complète et second œuvre",
    zone: "Tournefeuille, Haute-Garonne (31)",
    url: "https://entreprise-felicioni.com/",
    domaine: "entreprise-felicioni.com",
    accroche: "Rénovation complète et second œuvre à Tournefeuille",
    resume:
      "En rénovation, le client ne compare pas des prix, il compare des chantiers. Le site est bâti autour de la démonstration visuelle plutôt que de la description.",
    livre: [
      "Site vitrine sur mesure",
      "Comparateur avant / après sur les chantiers",
      "Galerie de réalisations par type de prestation",
      "Hébergement, maintenance et modifications",
    ],
    choix: [
      {
        titre: "Un comparateur avant / après",
        texte:
          "Le curseur glissant sur les photos de chantier fait le travail qu'aucun paragraphe ne fait. C'est l'élément d'interaction propre au métier.",
      },
      {
        titre: "Un seul interlocuteur, dit explicitement",
        texte:
          "L'argument est repris dans le hero et dans les listes de garanties, parce que c'est la crainte numéro un sur une rénovation complète.",
      },
      {
        titre: "Les avis dans une section dédiée",
        texte:
          "Sur un chantier à plusieurs milliers d'euros, le visiteur cherche les avis avant les prestations. Ils ont leur propre entrée de menu.",
      },
    ],
    constats: [
      "Note de 5,0 sur 18 avis Google affichée dans le hero",
      "Menu dédié aux réalisations et aux avis",
      "Devis gratuit et détaillé annoncé",
    ],
    resultats: [],
    capture: { small: realFelicioni720, large: realFelicioni1200, mobile: realFelicioniMobile },
    captureLe: "2 septembre 2026",
    accent: "oklch(0.55 0.2 27)",
  },
  {
    slug: "aymeric-pataud",
    client: "Aymeric Pataud",
    metier: "Chef à domicile et formateur",
    zone: "Île-de-France",
    url: "https://www.aymericpataud.fr/",
    domaine: "aymericpataud.fr",
    accroche: "Le goût est un langage. Je le traduis.",
    resume:
      "Un chef qui ne vend pas une prestation mais une signature. Ici le site devait porter une voix, pas un catalogue : la conception part de l'écriture plutôt que de la grille.",
    livre: [
      "Site vitrine premium sur mesure",
      "Architecture éditoriale en plusieurs rubriques",
      "Blog intégré",
      "Hébergement, maintenance et modifications",
    ],
    choix: [
      {
        titre: "La typographie comme identité",
        texte:
          "Titres généreux, mesure de lecture courte, beaucoup de blanc. Sur une prestation haut de gamme, la mise en page fait une partie de la promesse.",
      },
      {
        titre: "Une navigation par univers",
        texte:
          "Expertise, huiles essentielles, créations, pour qui, références. Le visiteur entre par ce qui le concerne, pas par une liste de services.",
      },
      {
        titre: "Un blog qui sert le référencement",
        texte:
          "Le contenu éditorial installe l'expertise et travaille les requêtes longues, là où une simple page de présentation plafonne.",
      },
    ],
    constats: [
      "Six rubriques éditoriales distinctes",
      "Blog en ligne",
      "Appel à l'action unique et répété : parler du projet",
    ],
    resultats: [],
    capture: { small: realPataud720, large: realPataud1200, mobile: realPataudMobile },
    captureLe: "2 septembre 2026",
    accent: "oklch(0.5 0.06 150)",
  },
];

export function getRealisation(slug: string): Realisation | undefined {
  return REALISATIONS.find((r) => r.slug === slug);
}
