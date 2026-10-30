import {
  CalendarCheck,
  Globe,
  ImagePlus,
  Info,
  Languages,
  LayoutTemplate,
  Lightbulb,
  MessageSquareText,
  Newspaper,
  Palette,
  PenTool,
  SearchCheck,
  Sparkles,
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
}

const PRODUITS: MenuDeroulant = {
  label: "Produits",
  colonnes: [
    {
      titre: "Créer votre site",
      entrees: [
        {
          label: "Créateur de site IA",
          desc: "Votre site complet à partir d'une phrase.",
          to: "/",
          hash: "fonctionnalites",
          icone: Sparkles,
        },
        {
          label: "Retouches par l'IA",
          desc: "Modifiez votre site en lui parlant.",
          to: "/",
          hash: "retouches",
          icone: MessageSquareText,
        },
        {
          label: "Photos créées par l'IA",
          desc: "Décrivez la photo, l'IA la crée.",
          to: "/",
          hash: "fonctionnalites",
          icone: ImagePlus,
        },
        {
          label: "Thèmes",
          desc: "Quatre allures, un clic pour changer.",
          to: "/",
          hash: "fonctionnalites",
          icone: Palette,
        },
      ],
    },
    {
      titre: "Être trouvé",
      entrees: [
        {
          label: "Référencement Google",
          desc: "Titres, descriptions et fiche entreprise prêts.",
          to: "/",
          hash: "fonctionnalites",
          icone: SearchCheck,
        },
        {
          label: "Votre nom de domaine",
          desc: "Votre propre adresse, ou la vôtre reliée.",
          bientot: true,
          icone: Globe,
        },
        {
          label: "Prise de rendez-vous",
          desc: "Vos clients réservent depuis votre site.",
          bientot: true,
          icone: CalendarCheck,
        },
        {
          label: "Site en deux langues",
          desc: "Une deuxième langue pour vos visiteurs.",
          bientot: true,
          icone: Languages,
        },
      ],
    },
  ],
};

const RESSOURCES: MenuDeroulant = {
  label: "Ressources",
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
  colonnes: [
    {
      titre: "Outils gratuits",
      entrees: [
        {
          label: "Générateur de nom d'entreprise",
          desc: "Des idées de noms pour votre activité.",
          bientot: true,
          icone: Lightbulb,
        },
        {
          label: "Vérifier un nom de domaine",
          desc: "Votre adresse en .fr ou .com est-elle libre ?",
          to: "/outils/verifier-nom-de-domaine/",
          icone: Wand2,
        },
        {
          label: "Générateur de logo",
          desc: "Un logo simple pour démarrer.",
          bientot: true,
          icone: PenTool,
        },
      ],
    },
  ],
};

export const MENUS: MenuDeroulant[] = [PRODUITS, RESSOURCES, OUTILS];

export const LIEN_TARIFS = { label: "Tarifs", to: "/tarifs/" };
