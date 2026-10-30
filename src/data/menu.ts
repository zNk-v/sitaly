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
  PenTool,
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
import { CREATEUR_IA, offre, prixCourt, type Offre, type OffreId } from "@/data/offres";
import { euros } from "@/lib/config";
import { PREMIUM_PUBLIE } from "@/data/premium";
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

/**
 * Depuis le 30 octobre 2026, sitaly.fr présente Sitaly App, comme durable.com :
 * le menu mène aux fonctions, aux exemples et aux tarifs de l'application
 * (MainNav, MobileMenu). Un seul onglet déroulant reste : « Services », pour ce
 * que l'application ne fait pas et que l'équipe vend en direct (Google Ads, sur
 * mesure). Les autres pages de l'agence restent en ligne, hors menu.
 */
export const LIENS_PRODUIT: { label: string; to: string; hash?: string }[] = [
  { label: "Fonctionnalités", to: "/", hash: "fonctionnalites" },
  { label: "Exemples", to: "/", hash: "exemples" },
  { label: "Tarifs", to: "/tarifs/" },
];

export const ONGLETS: OngletMenu[] = [
  {
    label: "Services",
    famille: "acquisition",
    colonnes: [
      {
        titre: "Être vu",
        entrees: [page("google-ads", HardHat)],
      },
      {
        titre: "Sur mesure",
        entrees: [
          entreeOffre("boutique", ShoppingCart, `dès ${prixCourt(offre("boutique"))}`),
          ...(PREMIUM_PUBLIE ? [entreeOffre("site-premium", PenTool)] : []),
          page("application-web-mobile", Smartphone),
          page("crm-sur-mesure", ContactRound),
          page("logiciel-metier", AppWindow),
        ],
      },
    ],
    carte: {
      surtitre: "Un projet à part ?",
      titre: "Campagnes Google Ads, boutique ou outil sur mesure : on en parle au téléphone",
      lien: "Décrire mon projet",
      to: "/mon-projet/",
    },
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
