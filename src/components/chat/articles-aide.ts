import { FAQ_PRODUIT } from "@/data/faq-produit";
import { GUIDES } from "@/data/guides";
import { APP_URL, SITALY_EMAIL, SITALY_PHONE_DISPLAY } from "@/lib/config";

/**
 * L'onglet Aide du chat (17 novembre 2026) : des collections d'articles, comme
 * le centre d'aide d'Intercom chez Indy. Rien n'est écrit ici en double : les
 * réponses viennent de la FAQ produit (src/data/faq-produit.ts) et des guides
 * pas à pas (src/data/guides.ts). Quand une réponse change là-bas, elle change
 * dans le chat.
 *
 * Une question de la FAQ qui n'est rangée nulle part tombe dans « Autres
 * questions » : une question ajoutée demain ne disparaît pas du chat.
 */

export type Article = {
  id: string;
  titre: string;
  /** Markdown simple : **gras** et paragraphes séparés par une ligne vide. */
  texte: string;
  lien?: { href: string; libelle: string };
};

export type Collection = {
  id: string;
  titre: string;
  description: string;
  articles: Article[];
};

// L'espace avant « ? » et « : » devient insécable : le signe ne part jamais seul à la ligne.
const insecable = (s: string) => s.replace(/ ([?:!;])/g, "\u00a0$1");
const faq = FAQ_PRODUIT.map((f, i) => ({
  id: `faq-${i}`,
  titre: insecable(f.q),
  texte: insecable(f.a),
}));
const prises = new Set<string>();

/** Les questions de la FAQ dont le titre commence par l'un de ces débuts. */
function questions(...debuts: string[]): Article[] {
  return debuts.flatMap((d) => {
    const a = faq.find((f) => f.titre.startsWith(d));
    if (!a) return [];
    prises.add(a.id);
    return [a];
  });
}

const prix = questions(
  "Combien coûte",
  "Que ne permet pas",
  "À quoi servent les crédits",
  "Quelle sera l'adresse",
  "Puis-je arrêter",
);

const site = questions(
  "Faut-il savoir",
  "Combien de temps",
  "Comment modifier",
  "Et les photos",
  "L'IA peut-elle",
  "Mon site sera-t-il",
);

const accompagne = questions("Je préfère qu'on s'occupe");

const guides: Article[] = GUIDES.map((g) => ({
  id: `guide-${g.id}`,
  titre: g.titre,
  texte: [g.resume, ...g.etapes.map((e, i) => `**${i + 1}. ${e.titre}**\n\n${e.texte}`)].join(
    "\n\n",
  ),
  lien: { href: `/guides/${g.id}/`, libelle: "Voir le guide en vidéo" },
}));

const autres = faq.filter((f) => !prises.has(f.id));

export const COLLECTIONS: Collection[] = [
  {
    id: "prix",
    titre: "Formules et prix",
    description: "Ce que comprend la formule gratuite, ce qu'ajoutent Essentiel et Pro.",
    articles: prix,
  },
  {
    id: "site",
    titre: "Votre site avec l'IA",
    description: "Créer, modifier et publier votre site, sans savoir coder.",
    articles: site,
  },
  {
    id: "guides",
    titre: "Guides pas à pas",
    description: "Publier, facturer, prendre des rendez-vous : chaque écran expliqué.",
    articles: guides,
  },
  {
    id: "contact",
    titre: "Être accompagné",
    description: "L'équipe Sitaly crée votre site pour vous, ou répond à vos questions.",
    articles: [
      ...accompagne,
      {
        id: "contact",
        titre: "Joindre l'équipe Sitaly",
        texte: `Par téléphone au **${SITALY_PHONE_DISPLAY}**.\n\nPar e-mail à **${SITALY_EMAIL}**.\n\nOu posez votre question dans l'onglet Messages : l'IA répond tout de suite, et Ted, qui dirige Sitaly, prend le relais quand il faut.`,
      },
    ],
  },
  ...(autres.length
    ? [
        {
          id: "autres",
          titre: "Autres questions",
          description: "Le reste de ce qu'on nous demande.",
          articles: autres,
        },
      ]
    : []),
];

/** Les trois articles mis en avant sur l'accueil du chat. */
export const A_LA_UNE: Article[] = [prix[0], site[0], site[1]].filter(Boolean);

export const LIEN_CREER = `${APP_URL}/creer`;

const plat = (s: string) =>
  s.normalize("NFD").replace(/[̀-ͯ]/g, "").replace(/\*\*/g, "").toLowerCase();

/** Les articles qui contiennent tous les mots cherchés, titres d'abord. */
export function chercher(requete: string): Article[] {
  const mots = plat(requete)
    .split(/\s+/)
    .filter((m) => m.length > 1);
  if (!mots.length) return [];
  const tous = COLLECTIONS.flatMap((c) => c.articles);
  const vus = new Set<string>();
  return tous
    .filter((a) => {
      if (vus.has(a.id)) return false;
      vus.add(a.id);
      const t = plat(`${a.titre} ${a.texte}`);
      return mots.every((m) => t.includes(m));
    })
    .sort((a, b) => {
      const dansTitre = (x: Article) => mots.filter((m) => plat(x.titre).includes(m)).length;
      return dansTitre(b) - dansTitre(a);
    });
}

/** Les premiers mots d'un article, sans gras, pour les aperçus. */
export const extrait = (a: Article) => a.texte.replace(/\*\*/g, "").split("\n")[0];
