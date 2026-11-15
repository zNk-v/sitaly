import type { BlogSection } from "@/data/blog-posts";

/** Le corps de l'article « logiciel-facturation-auto-entrepreneur-gratuit ». Ses
    métadonnées vivent dans src/data/blog-posts.ts ; ce fichier n'est chargé que
    sur sa page. Offres relevées le 15 novembre 2026 sur la page tarifs de chaque
    éditeur ; calendrier tiré des documents de la DGFiP. Chaque relevé garde sa
    source : revérifier les offres avant toute mise à jour de l'article. */
export const contenu: BlogSection[] = [
  {
    type: "p",
    text: "Vous démarrez en micro-entreprise, vous facturez quelques clients par mois et vous ne voulez pas payer un abonnement de plus. Bonne nouvelle : plusieurs logiciels de facturation proposent une vraie formule gratuite. Mauvaise nouvelle : elles ne se valent pas, et la facturation électronique obligatoire en 2027 change la question.",
  },
  {
    type: "p",
    text: "Cet article compare les formules gratuites relevées le 15 novembre 2026 sur la page tarifs de chaque éditeur, puis explique ce qu'un auto-entrepreneur doit vérifier avant de choisir. Les offres changent souvent : ouvrez la page tarifs avant de vous inscrire.",
  },
  { type: "h2", text: "Quel logiciel de facturation gratuit pour un auto-entrepreneur ?" },
  {
    type: "p",
    text: "Pour un micro-entrepreneur, les formules gratuites d'Abby, Indy, Tiime et Shine offrent des devis et des factures en illimité, et chacun de ces éditeurs se présente comme plateforme agréée pour la facturation électronique. VosFactures limite sa formule gratuite à 3 documents par mois. Le bon choix dépend de ce que la formule gratuite retire : l'envoi par e-mail, les relances ou la signature des devis.",
  },
  {
    type: "table",
    caption:
      "Formules gratuites relevées le 15 novembre 2026 sur la page tarifs de chaque éditeur. La colonne « facturation électronique » reprend ce que l'éditeur affirme : vérifiez son nom sur la liste officielle des plateformes agréées.",
    headers: ["Logiciel", "Formule gratuite", "Ce qu'elle ne fait pas", "Facturation électronique, selon l'éditeur"],
    rows: [
      [
        "[Abby](https://abby.fr/tarifs/)",
        "Basique : devis et factures illimités",
        "Envoi des documents par e-mail, factures d'acompte, signature électronique, déclaration Urssaf",
        "Se présente comme plateforme agréée",
      ],
      [
        "[Indy](https://www.indy.fr/tarifs/)",
        "Essentiel : devis et factures en illimité",
        "Relances automatiques, factures récurrentes, signature des devis",
        "Se dit plateforme agréée immatriculée par la DGFiP",
      ],
      [
        "[Tiime](https://www.tiime.fr/tarifs)",
        "Free : factures et devis illimités, sans carte bancaire",
        "Relances, signature des devis, plusieurs utilisateurs",
        "Se dit plateforme agréée, facturation électronique gratuite",
      ],
      [
        "[Shine](https://www.shine.fr/tarifs/)",
        "Free : devis et factures illimités",
        "Détail non publié sur la page tarifs",
        "Se dit plateforme agréée, incluse dans toutes les offres",
      ],
      [
        "[Henrri](https://www.henrri.com/tarifs)",
        "Pro à 0 € : factures et devis illimités",
        "Modèles sans TVA pour auto-entrepreneur, retrait de la mention Henrri, factures récurrentes",
        "Passe par une plateforme agréée partenaire",
      ],
      [
        "[Facture.net](https://www.facture.net/price)",
        "Entièrement gratuit, sans offre payante",
        "Limites non chiffrées sur le site",
        "Passe par une plateforme agréée partenaire",
      ],
      [
        "[VosFactures](https://www.vosfactures.fr/tarifs)",
        "Micro : 3 documents par mois",
        "Factures récurrentes, signature et paiement en ligne",
        "Se dit plateforme agréée",
      ],
      [
        "[Sitaly](/tarifs/)",
        "Découverte : devis illimités, 3 factures par mois, avec un site internet",
        "Relances automatiques (Essentiel et Pro)",
        "Pas encore : connexion prévue avant septembre 2027",
      ],
    ],
  },
  {
    type: "p",
    text: "Deux outils connus ne figurent pas dans le tableau, faute de formule gratuite : [Freebe](https://www.freebe.me/tarifs) propose un essai de 30 jours, puis 150 € TTC par an, et [Axonaut](https://axonaut.com/content/prix) un essai de 15 jours. Zervant, lui, annonce sur sa page tarifs que Shine Facture lui succède progressivement.",
  },
  {
    type: "p",
    text: "Un point à regarder de près chez Henrri : sa page tarifs place les « modèles sans TVA pour auto-entrepreneur » hors de la formule gratuite. Si vous êtes en franchise de TVA, c'est justement le modèle dont vous avez besoin.",
  },
  { type: "h2", text: "Que doit faire un logiciel de facturation pour un micro-entrepreneur ?" },
  {
    type: "p",
    text: "Un bon logiciel pose seul les mentions obligatoires, numérote vos factures sans trou et vous empêche de modifier une facture déjà envoyée. Le reste dépend de votre activité. Vérifiez ces six points avant de saisir votre premier client.",
  },
  {
    type: "ul",
    items: [
      "La mention de franchise de TVA : depuis le 1er septembre 2026, elle renvoie aux articles L. 223 et suivants du code des impositions sur les biens et services, selon [Service Public Entreprendre](https://entreprendre.service-public.gouv.fr/vosdroits/F36008). L'ancienne mention « art. 293 B du CGI » reste tolérée jusqu'au 31 décembre 2027.",
      "Une numérotation continue et une facture figée après envoi : une erreur se corrige par un avoir, pas en réécrivant la facture.",
      "Les autres mentions obligatoires : SIRET, date de la prestation, conditions et pénalités de retard. La liste complète est sur la fiche [Mentions obligatoires sur une facture](https://entreprendre.service-public.gouv.fr/vosdroits/F31808).",
      "L'envoi au client depuis l'outil, par e-mail ou par lien : sinon, vous téléchargez et joignez chaque PDF à la main.",
      "Le passage du devis à la facture en un clic, si vous faites des devis.",
      "L'export de vos données : vos factures doivent vous suivre si vous changez d'outil.",
    ],
  },
  {
    type: "p",
    text: "Pour vos devis, la liste des mentions est détaillée dans notre article [Mentions obligatoires d'un devis](/blog/mentions-obligatoires-devis-artisan/).",
  },
  { type: "h2", text: "Facturation électronique : un logiciel gratuit suffira-t-il en 2027 ?" },
  {
    type: "p",
    text: "Oui, à condition qu'il soit relié à une plateforme agréée. Le [dépliant de la DGFiP pour les microentreprises](https://www.impots.gouv.fr/sites/default/files/media/1_metier/2_professionnel/EV/2_gestion/290_facturation_electronique/facturation-electronique---depliant-microentreprises.pdf) et sa [fiche 3](https://www.impots.gouv.fr/sites/default/files/media/1_metier/2_professionnel/EV/2_gestion/290_facturation_electronique/fiche-3_tpe_a-partir-de-quand-mon-entreprise-doit-etre-prete.pdf) le disent : les micro-entrepreneurs sont concernés par la réforme, qu'ils facturent la TVA ou non. Depuis le 1er septembre 2026, vous devez pouvoir recevoir des factures électroniques. Au plus tard le 1er septembre 2027, vous devrez émettre vos factures aux clients professionnels sous forme électronique, par une plateforme agréée.",
  },
  {
    type: "table",
    caption: "Calendrier pour les micro-entreprises, d'après la fiche 3 et le dépliant « Les microentreprises » de la DGFiP.",
    headers: ["Obligation", "Date", "Ce que cela veut dire pour vous"],
    rows: [
      ["Recevoir des factures électroniques", "Depuis le 1er septembre 2026", "Choisir une plateforme agréée pour recevoir les factures de vos fournisseurs"],
      ["Émettre des factures électroniques", "Au plus tard le 1er septembre 2027", "Vos factures aux clients professionnels en France passent par la plateforme"],
      ["E-reporting", "Au plus tard le 1er septembre 2027", "Les montants de vos ventes aux particuliers et à l'étranger sont transmis par la plateforme"],
    ],
  },
  {
    type: "p",
    text: "Une facture PDF envoyée par e-mail ne compte plus comme facture électronique pour vos clients professionnels. Pour vos clients particuliers, la facture PDF reste valable, mais les montants partent en e-reporting. Le détail des formats, des nouvelles mentions et des amendes est dans notre guide [Facturation électronique 2027](/blog/facturation-electronique-artisan-2027/).",
  },
  {
    type: "p",
    text: "Avant de choisir un outil gratuit, vérifiez deux choses. D'abord, que l'éditeur figure sur la [liste officielle des plateformes agréées](https://www.impots.gouv.fr/je-consulte-la-liste-des-plateformes-agreees), ou qu'il nomme la plateforme agréée à laquelle il est relié. Ensuite, que la réception et l'émission électroniques restent dans la formule gratuite, et pas seulement dans une formule payante.",
  },
  { type: "h2", text: "Où sont les limites d'un logiciel de facturation gratuit ?" },
  {
    type: "p",
    text: "Une formule gratuite se paie autrement : par une fonction retirée, par le nom de l'éditeur sur vos factures ou par une limite de volume. Lisez la colonne « ce qu'elle ne fait pas » du tableau : c'est elle qui décide si l'outil vous convient.",
  },
  {
    type: "ul",
    items: [
      "Les relances automatiques : souvent payantes. Si vos clients paient en retard, c'est la fonction qui rapporte le plus.",
      "La signature des devis en ligne : utile si vous faites des devis à des particuliers.",
      "L'envoi par e-mail depuis l'outil : sans lui, chaque facture demande un téléchargement et un mail à la main.",
      "La mention de l'éditeur sur vos documents : sans gravité, mais à savoir.",
      "Le volume : 3 documents par mois chez VosFactures, 3 factures par mois chez Sitaly en formule gratuite.",
      "Le support : souvent limité à une aide en ligne dans les formules gratuites.",
    ],
  },
  {
    type: "p",
    text: "Beaucoup de ces outils sont gratuits parce qu'ils vendent autre chose : un compte bancaire professionnel pour Shine, une comptabilité ou des déclarations pour Abby, Indy ou Tiime. Ce n'est pas un défaut, à condition de le savoir quand on vous propose de passer à l'offre suivante.",
  },
  { type: "h2", text: "Et Sitaly ?" },
  {
    type: "p",
    text: "Sitaly n'est pas d'abord un logiciel de facturation : c'est un créateur de site internet par l'IA, avec les devis et les factures inclus. La formule Découverte est gratuite, sans carte bancaire : devis illimités, 3 factures par mois et votre site en ligne sur votre-nom.sitaly.fr. La formule Essentiel, à 39 € par mois sans engagement, passe aux factures illimitées avec les relances automatiques, votre nom de domaine et la prise de rendez-vous.",
  },
  {
    type: "p",
    text: "Vos clients acceptent le devis en ligne et paient la facture par carte ou par virement, sans commission Sitaly : seuls les frais Stripe s'appliquent. En revanche, Sitaly n'émet pas encore de factures électroniques par une plateforme agréée. La connexion est prévue avant l'échéance du 1er septembre 2027, et les utilisateurs seront prévenus avant. Si vous facturez surtout des professionnels, gardez ce point en tête. Le détail est sur la page [Devis et factures](/produits/devis-et-factures/).",
  },
  {
    type: "p",
    text: "Pour un devis ponctuel, sans créer de compte, notre [générateur de devis gratuit](/outils/generateur-devis-gratuit/) met votre devis en page avec les mentions obligatoires, prêt en PDF.",
  },
  {
    type: "faq",
    items: [
      {
        q: "Un auto-entrepreneur doit-il utiliser un logiciel de facturation ?",
        a: "Aujourd'hui, la loi impose des factures conformes, pas un logiciel. Avec la facturation électronique, vos factures aux professionnels devront passer par une plateforme agréée au plus tard le 1er septembre 2027 : un logiciel relié à une plateforme devient alors le moyen le plus simple.",
      },
      {
        q: "Peut-on faire ses factures sur Word ou Excel ?",
        a: "Pour vos clients particuliers, oui, si chaque facture porte les mentions obligatoires et une numérotation continue. Pour vos clients professionnels, plus à partir de votre échéance de 2027 : une facture PDF envoyée par e-mail ne sera plus une facture électronique au sens de la réforme.",
      },
      {
        q: "La facturation électronique concerne-t-elle les auto-entrepreneurs en franchise de TVA ?",
        a: "Oui. La DGFiP l'indique : vous êtes concerné que vous facturiez ou non de la TVA. Vous recevez depuis le 1er septembre 2026 et vous émettez au plus tard le 1er septembre 2027.",
      },
      {
        q: "Quel est le logiciel de facturation gratuit le plus complet ?",
        a: "Cela dépend de la fonction qui compte pour vous. Abby, Indy, Tiime et Shine offrent des factures illimitées gratuites et se présentent comme plateformes agréées. Abby retire l'envoi par e-mail de sa formule gratuite, Indy et Tiime les relances automatiques. Comparez la colonne « ce qu'elle ne fait pas » du tableau.",
      },
      {
        q: "Mon logiciel gratuit peut-il devenir payant ?",
        a: "Oui, un éditeur peut changer ses offres. Gardez un export régulier de vos factures et vérifiez que l'outil permet de récupérer vos données si vous partez.",
      },
    ],
  },
];
