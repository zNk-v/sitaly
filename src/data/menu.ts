import {
  AppWindow,
  Bot,
  ContactRound,
  Gem,
  HardHat,
  Info,
  MapPin,
  Megaphone,
  MessageSquareText,
  Newspaper,
  PhoneCall,
  Plug,
  Puzzle,
  RefreshCw,
  Rocket,
  SearchCheck,
  ShieldCheck,
  ShoppingCart,
  Smartphone,
  Sparkles,
  Store,
  Workflow,
  Wrench,
} from "lucide-react";
import { entreeMenu, type EntreeMenu, type FamilleId } from "@/data/expertises";
import { offre, prixCourt, type Offre, type OffreId } from "@/data/offres";
import { REALISATIONS } from "@/data/realisations";

/**
 * Les onglets de l'en-tête (refonte du 23 octobre 2026, sur le modèle de
 * devmiweb.com) : Site web, Visibilité et Agents IA remplacent l'ancien
 * déroulant « Services ».
 *
 * Chaque onglet tient en deux colonnes d'entrées, chacune avec son
 * pictogramme, et un encart à droite. Les offres de la grille portent leur
 * prix, lu dans src/data/offres.ts. L'onglet Visibilité garde ses pages :
 * sa grille est à revoir avec le client.
 *
 * Aucun métier ni secteur dans le menu : le site doit parler à n'importe quelle
 * activité. Les pages par métier et par secteur restent en ligne, hors menu.
 * Landing page, site événementiel et création de site internet restent en
 * ligne aussi, hors menu, à la demande du client.
 *
 * Le menu de bureau et le menu mobile lisent tous deux ce fichier.
 */

export interface ColonneMenu {
  titre: string;
  entrees: EntreeMenu[];
}

/** L'encart à droite des colonnes, comme « Nos réalisations » chez devmiweb.com. */
export interface CarteMenu {
  surtitre: string;
  titre: string;
  lien: string;
  to: string;
  image?: string;
}

export interface OngletMenu {
  label: string;
  /** La famille dont l'onglet porte la couleur. */
  famille: FamilleId;
  colonnes: ColonneMenu[];
  carte: CarteMenu;
  /** Le lien sous les colonnes. */
  pied?: { label: string; to: string; hash?: string };
}

type Icone = React.ComponentType<{ className?: string }>;

/** Une offre en entrée de menu : sa page si elle en a une, sinon sa carte sur /tarifs/. */
function entreeOffre(id: OffreId, icone: Icone, prix?: string): EntreeMenu {
  const o: Offre = offre(id);
  const base = { label: o.nom, desc: o.menuDesc, prix: prix ?? prixCourt(o), icone };
  return o.page ? { ...base, to: o.page } : { ...base, to: "/tarifs/", hash: o.id };
}

const page = (cle: string, icone: Icone): EntreeMenu => ({ ...entreeMenu(cle), icone });

export const ONGLETS: OngletMenu[] = [
  {
    label: "Site web",
    famille: "site",
    colonnes: [
      {
        titre: "Créer votre site",
        entrees: [
          entreeOffre("presence", Store),
          entreeOffre("presence-pro", Rocket),
          entreeOffre("presence-expert", Gem),
          /* Au-delà de la boutique, tout se chiffre sur devis : le menu annonce « dès ». */
          entreeOffre("boutique", ShoppingCart, `dès ${prixCourt(offre("boutique"))}`),
        ],
      },
      {
        titre: "Faire évoluer votre site",
        entrees: [
          page("refonte-site-internet", RefreshCw),
          entreeOffre("maintenance", ShieldCheck),
        ],
      },
    ],
    carte: {
      surtitre: "Nos réalisations",
      titre: `${REALISATIONS.map((r) => r.client).join(", ")} : voir les sites livrés`,
      lien: "Voir les réalisations",
      to: "/realisations/",
      image: REALISATIONS[0].capture.webp.w560,
    },
    pied: { label: "Voir tous les tarifs", to: "/tarifs/", hash: "site" },
  },
  {
    label: "Visibilité",
    famille: "acquisition",
    colonnes: [
      {
        titre: "Être trouvé",
        entrees: [
          page("referencement-naturel", SearchCheck),
          page("referencement-local", MapPin),
          page("referencement-ia", Sparkles),
        ],
      },
      {
        titre: "Être vu",
        entrees: [
          page("chatgpt-ads", MessageSquareText),
          page("google-ads", HardHat),
          page("publicite-reseaux-sociaux", Megaphone),
        ],
      },
    ],
    carte: {
      surtitre: "Par où commencer ?",
      titre: "Votre fiche Google notée sur 100, gratuitement, avec les corrections à faire",
      lien: "Auditer ma fiche Google",
      to: "/outils/audit-fiche-google/",
    },
  },
  {
    label: "Agents IA",
    famille: "automatisation",
    colonnes: [
      {
        titre: "Agents IA",
        entrees: [
          entreeOffre("agent-ia", Bot),
          entreeOffre("agent-ia-pro", PhoneCall),
          entreeOffre("outil-sur-mesure", Puzzle),
        ],
      },
      {
        titre: "Automatiser",
        entrees: [
          page("automatisation-taches", Workflow),
          page("crm-sur-mesure", ContactRound),
          page("logiciel-metier", AppWindow),
          page("application-web-mobile", Smartphone),
          page("integration-api", Plug),
        ],
      },
    ],
    carte: {
      surtitre: "Avant de signer",
      titre: "Ce que coûte vraiment un agent IA : mise en place, abonnement, minutes de voix",
      lien: "Lire le détail des prix",
      to: "/blog/prix-agent-ia/",
    },
    pied: { label: "Voir les tarifs des agents IA", to: "/tarifs/", hash: "agents-ia" },
  },
];

export const AGENCE: EntreeMenu[] = [
  {
    label: "À propos",
    desc: "Qui est derrière Sitaly, et comment on travaille.",
    to: "/a-propos/",
    icone: Info,
  },
  { label: "Blog", desc: "Conseils et prix réels, sans jargon.", to: "/blog/", icone: Newspaper },
  {
    label: "Outils gratuits",
    desc: "Fiche Google, budget publicitaire, nom de domaine.",
    to: "/outils/",
    icone: Wrench,
  },
];
