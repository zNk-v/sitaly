import {
  Bot,
  CalendarCheck,
  FileText,
  Hammer,
  HeartPulse,
  Info,
  LayoutTemplate,
  Lightbulb,
  Newspaper,
  PenTool,
  PlayCircle,
  ReceiptText,
  Scale,
  Scissors,
  SearchCheck,
  Sparkles,
  Star,
  UtensilsCrossed,
  Wand2,
} from "lucide-react";
import type { EntreeMenu } from "@/data/expertises";

/**
 * Les menus de l'en-tête (31 octobre 2026), sur le modèle de durable.com :
 * Produits, Ressources et Outils en menus déroulants, puis Tarifs.
 *
 * Avant : Fonctionnalités, Exemples, Tarifs, l'onglet Services (Google Ads et
 * sur mesure) et Ressources. Services est sorti de l'en-tête : ces offres se
 * vendent au téléphone, et leurs pages restent liées depuis le pied de page
 * (« Aussi chez Sitaly »). Les outils pensés pour l'agence (budget Google Ads,
 * audit de fiche Google) restent en ligne, hors menu.
 *
 * Rangement du 20 novembre 2026, toujours d'après durable.com, à la demande
 * de Ted (« trop d'options ») : Produits, Solutions, Tarifs, Ressources,
 * Outils. Produits ne liste plus qu'une entrée par produit, sur deux colonnes
 * et sans intertitres : les fonctions du créateur (retouches, photos, thèmes)
 * et le nom de domaine se lisent sur l'accueil et sur /tarifs/. Solutions
 * dit à qui s'adresse Sitaly, quatre rubriques et un lien vers les 24 modèles.
 * Outils perd le générateur de logo, qui menait à la page Identité de marque
 * déjà dans Produits.
 *
 * Une entrée `bientot` n'a pas encore de page : elle s'affiche avec la mention
 * « Bientôt », sans lien.
 *
 * Le menu de bureau et le menu mobile lisent tous deux ce fichier.
 */

export interface ColonneMenu {
  titre: string;
  entrees: EntreeMenu[];
}

export interface MenuDeroulant {
  label: string;
  colonnes: ColonneMenu[];
  /** Les entrées sur deux colonnes, sans intertitre (comme Produits chez durable.com). */
  grille?: boolean;
  /** Un intitulé au-dessus des entrées et, à droite, un lien « tout voir ». */
  entete?: { titre: string; tout?: { label: string; to: string } };
}

const PRODUITS: MenuDeroulant = {
  label: "Produits",
  grille: true,
  colonnes: [
    {
      titre: "Produits",
      entrees: [
        {
          label: "Créateur de site IA",
          desc: "Votre site complet à partir d'une phrase.",
          to: "/",
          hash: "fonctionnalites",
          icone: Sparkles,
        },
        {
          label: "Identité de marque",
          desc: "Votre logo, vos couleurs, votre police.",
          to: "/produits/identite-de-marque/",
          icone: PenTool,
        },
        {
          label: "Blog écrit par l'IA",
          desc: "Des articles qui vous amènent des visites.",
          to: "/produits/blog-ia/",
          icone: Newspaper,
        },
        {
          label: "Référencement SEO et GEO",
          desc: "Trouvé sur Google et par les IA.",
          to: "/produits/referencement-seo-geo/",
          icone: SearchCheck,
        },
        {
          label: "Prise de rendez-vous",
          desc: "Vos clients réservent depuis votre site.",
          to: "/produits/prise-de-rendez-vous/",
          icone: CalendarCheck,
        },
        {
          label: "Devis et factures",
          desc: "Devis acceptés en ligne, factures payées par carte.",
          to: "/produits/devis-et-factures/",
          icone: ReceiptText,
        },
        {
          label: "Avis Google",
          desc: "Plus d'avis, et une réponse à chacun.",
          to: "/produits/avis-google/",
          icone: Star,
        },
        {
          label: "Agents IA",
          desc: "Ils répondent à vos clients pendant que vous travaillez.",
          to: "/produits/agents-ia/",
          icone: Bot,
        },
      ],
    },
  ],
};

const SOLUTIONS: MenuDeroulant = {
  label: "Solutions",
  grille: true,
  entete: { titre: "Pour qui", tout: { label: "Voir les 24 métiers", to: "/modeles/" } },
  colonnes: [
    {
      titre: "Pour qui",
      entrees: [
        {
          label: "Artisans du bâtiment",
          desc: "Plombier, couvreur, électricien, maçon…",
          to: "/creer-site-internet-artisan/",
          icone: Hammer,
        },
        {
          label: "Restaurants et bars",
          desc: "Votre carte, vos horaires, vos réservations.",
          to: "/modeles/restaurant/",
          icone: UtensilsCrossed,
        },
        {
          label: "Coiffure et beauté",
          desc: "Vos prestations et vos rendez-vous en ligne.",
          to: "/modeles/coiffeuse/",
          icone: Scissors,
        },
        {
          label: "Santé et bien-être",
          desc: "Vos séances, votre cabinet, vos créneaux.",
          to: "/modeles/osteopathe/",
          icone: HeartPulse,
        },
      ],
    },
  ],
};

const RESSOURCES: MenuDeroulant = {
  label: "Ressources",
  grille: true,
  colonnes: [
    {
      titre: "Ressources",
      entrees: [
        {
          label: "Modèles de sites",
          desc: "Un modèle par métier, prêt à personnaliser.",
          to: "/modeles/",
          icone: LayoutTemplate,
        },
        {
          label: "Guides en vidéo",
          desc: "Chaque étape de Sitaly, montrée pas à pas.",
          to: "/guides/",
          icone: PlayCircle,
        },
        {
          label: "Blog",
          desc: "Conseils pour lancer et faire connaître votre activité.",
          to: "/blog/",
          icone: Newspaper,
        },
        {
          label: "À propos",
          desc: "Qui est derrière Sitaly.",
          to: "/a-propos/",
          icone: Info,
        },
      ],
    },
  ],
};

const OUTILS: MenuDeroulant = {
  label: "Outils",
  grille: true,
  colonnes: [
    {
      titre: "Outils gratuits",
      entrees: [
        {
          label: "Générateur de nom d'entreprise",
          desc: "Douze idées de noms pour votre activité.",
          to: "/outils/generateur-nom-entreprise/",
          icone: Lightbulb,
        },
        {
          label: "Vérifier un nom de domaine",
          desc: "Votre adresse en .fr ou .com est-elle libre ?",
          to: "/outils/verifier-nom-de-domaine/",
          icone: Wand2,
        },
        {
          label: "Générateur de devis",
          desc: "Votre devis en PDF, mentions comprises.",
          to: "/outils/generateur-devis-gratuit/",
          icone: FileText,
        },
        {
          label: "Générateur de mentions légales",
          desc: "Le texte à copier sur votre site.",
          to: "/outils/generateur-mentions-legales/",
          icone: Scale,
        },
      ],
    },
  ],
};

/** Avant Tarifs, comme chez durable.com. */
export const MENUS_AVANT_TARIFS: MenuDeroulant[] = [PRODUITS, SOLUTIONS];
/** Après Tarifs. */
export const MENUS_APRES_TARIFS: MenuDeroulant[] = [RESSOURCES, OUTILS];
export const MENUS: MenuDeroulant[] = [...MENUS_AVANT_TARIFS, ...MENUS_APRES_TARIFS];

export const LIEN_TARIFS = { label: "Tarifs", to: "/tarifs/" };
