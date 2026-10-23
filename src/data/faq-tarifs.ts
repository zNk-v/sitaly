import { A_LA_CARTE, RACHAT_SITE } from "@/data/offres";
import { euros } from "@/lib/config";

/**
 * Les questions de la page /tarifs/. Les pages d'offre /offres/<id>/ en
 * reprennent une partie : la réponse reste la même partout.
 */
export const FAQ_TARIFS: { q: string; a: string }[] = [
  {
    q: "Est-ce vraiment sans engagement ?",
    a: "Oui. Toutes les offres se résilient à tout moment, sans frais. Il n'y a pas de durée minimale de contrat. Seule la mise en service, payée à la signature, n'est pas remboursable une fois le travail lancé.",
  },
  {
    q: "À qui appartient mon site ?",
    a: "Pour les sites vitrines (Présence, Présence Pro et Présence Expert), le site reste la propriété de Sitaly : c'est ce qui permet d'inclure la création, l'hébergement et la maintenance dans une mensualité sans engagement. Votre fiche Google, elle, vous appartient toujours, et votre nom de domaine vous est transféré si vous partez. Une boutique Shopify vous appartient dès le départ.",
  },
  {
    q: "Que se passe-t-il si j'arrête ?",
    a: `Votre site vitrine est mis hors ligne, sauf si vous choisissez de le racheter : ${RACHAT_SITE.map((r) => `${euros(r.prix)} ${r.periode.toLowerCase().replace("pendant la ", "la ")}`).join(", ")}. Dans tous les cas, votre nom de domaine vous est transféré gratuitement et votre fiche Google reste la vôtre.`,
  },
  {
    q: "Je garde mon nom de domaine ?",
    a: "Oui. Le nom de domaine vous est transféré gratuitement à votre départ, quelle que soit l'offre.",
  },
  {
    q: "Pourquoi des frais de mise en service ?",
    a: "Ils couvrent le travail du départ : l'appel pour comprendre votre activité, la rédaction des pages, la conception du site, sa mise en ligne et la remise en ordre de votre fiche Google. Les payer à la signature permet de garder un abonnement sans engagement : vous ne financez pas ce travail sur des années de contrat. Ils ne sont pas remboursables une fois le travail lancé.",
  },
  {
    q: "Quelle différence entre Présence, Présence Pro et Présence Expert ?",
    a: `Présence met en ligne un site vitrine jusqu'à 5 pages et gère votre fiche Google. Présence Pro ajoute ce qui sert à être trouvé plus loin et plus souvent : 5 pages locales pour les communes voisines, des posts et des photos publiés chaque mois sur votre fiche, une demande d'avis envoyée automatiquement après chaque prestation, et un rapport mensuel. Présence Expert double les pages locales, publie deux articles par mois, prépare vos textes pour être cités par les IA et suit vos positions sur Google, avec un bilan chaque trimestre. Passer de Présence à Présence Pro coûte ${euros(A_LA_CARTE.find((a) => a.libelle.startsWith("Passage"))?.prix ?? 0)}.`,
  },
  {
    q: "Combien coûte Shopify en plus ?",
    a: "L'abonnement Shopify est à votre nom, environ 36 € par mois, payé directement à Shopify. S'y ajoutent les frais de paiement prélevés sur chaque vente. Ces montants sont fixés par Shopify, pas par Sitaly, qui ne les encaisse pas.",
  },
];
