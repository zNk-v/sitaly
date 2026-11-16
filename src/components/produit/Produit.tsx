import { avecCampagne } from "@/lib/mesure";
import { departVersAppTiktok } from "@/lib/pixel-tiktok";
import { useEffect, useId, useRef, useState, type FormEvent } from "react";
import { ArrowRight, Check, Clock, Lock, Sparkles, Star, X } from "lucide-react";
import { APP_URL, euros, SITALY_PHONE, SITALY_PHONE_DISPLAY } from "@/lib/config";
import { CREATEUR_IA as IA, MENTION_TVA } from "@/data/offres";
import { FICHE_GOOGLE_URL, NOTE_GOOGLE } from "@/data/avis-google";
import { FAQ_PRODUIT } from "@/data/faq-produit";

/**
 * Les blocs de la vitrine de Sitaly App (30 octobre 2026), partagés par
 * l'accueil et /tarifs/. Allure de durable.com (DESIGN.md §13) : fond blanc,
 * titres centrés `titre-produit`, cartes gris très clair, boutons presque
 * noirs, couleur réservée aux surtitres.
 *
 * Tout ce qui est promis ici existe dans l'application. Ce qui n'existe pas
 * encore porte « Bientôt ».
 */

export const CARTE = "rounded-3xl bg-black/[0.03]";
export const BOUTON_NOIR =
  "inline-flex items-center justify-center gap-2 rounded-2xl bg-black/85 px-5 py-3 text-sm font-medium text-white transition hover:bg-black focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-black/30 focus-visible:ring-offset-2 disabled:opacity-60";
export const BOUTON_CLAIR =
  "inline-flex items-center justify-center gap-2 rounded-2xl border border-black/10 bg-white px-5 py-3 text-sm font-medium text-black/85 transition hover:bg-black/[0.03]";
export const TEXTE_GRIS = "text-black/60";

/** L'adresse de l'application, avec la phrase du visiteur : elle remplit la création après l'inscription. */
/**
 * Sans phrase, le lien va droit à la première question de l'app (/creer) :
 * l'accueil de l'app répète celui de sitaly.fr, le visiteur le verrait deux fois.
 */
export const lienCreation = (activite?: string) =>
  activite
    ? `${APP_URL}/?activite=${encodeURIComponent(activite.slice(0, 600))}`
    : `${APP_URL}/creer`;

export function TitreSection({
  surtitre,
  titre,
  sousTitre,
}: {
  surtitre: string;
  titre: string;
  sousTitre?: string;
}) {
  return (
    <div className="mx-auto max-w-3xl text-center">
      <div className="text-sm font-medium text-brand-ink">{surtitre}</div>
      <h2 className="titre-produit mt-3 text-[2.15rem] sm:text-5xl lg:text-6xl">{titre}</h2>
      {sousTitre && (
        <p className={`mx-auto mt-5 max-w-2xl text-lg leading-7 ${TEXTE_GRIS}`}>{sousTitre}</p>
      )}
    </div>
  );
}

/**
 * La note Google avec son nombre d'avis, menant à la fiche.
 *
 * Le 30 octobre 2026, Teddy avait retiré le compte pour ne pas afficher « 3 ».
 * L'audit SEO du 13 novembre 2026 (1.2) le remet : un « 5/5 » sans compte ni
 * date se lit comme une note inventée, et trois avis nommés valent mieux
 * qu'un chiffre que personne ne peut situer. À rediscuter avec Teddy.
 */
export function NoteGoogle({ clair = false }: { clair?: boolean }) {
  return (
    <a
      href={FICHE_GOOGLE_URL}
      target="_blank"
      rel="noopener noreferrer"
      className={`inline-flex items-center gap-1.5 hover:underline ${clair ? "text-white/80" : ""}`}
    >
      <span className="inline-flex text-[#16a34a]" aria-hidden="true">
        {Array.from({ length: 5 }, (_, i) => (
          <Star key={i} className="h-3.5 w-3.5 fill-current" />
        ))}
      </span>
      Noté {NOTE_GOOGLE.note}/5 sur Google · {NOTE_GOOGLE.nombre} avis, le dernier en{" "}
      {NOTE_GOOGLE.dernier}
    </a>
  );
}

export function Confiance() {
  return (
    <p
      className={`mt-5 flex flex-wrap items-center justify-center gap-x-3 gap-y-1 text-base sm:text-sm ${TEXTE_GRIS}`}
    >
      <span>Gratuit, sans carte bancaire</span>
      <span aria-hidden="true" className="hidden sm:inline">
        •
      </span>
      <NoteGoogle />
      <span aria-hidden="true" className="hidden sm:inline">
        •
      </span>
      <span>Entreprise française</span>
    </p>
  );
}

const IDEES = [
  "Ostéopathe à Lyon",
  "Plombier chauffagiste à Arpajon",
  "Fleuriste à Nantes",
  "Coach sportive à Bordeaux",
];

/** Les phrases que le bouton « Inspire-moi » écrit dans l'encart, lettre après lettre. */
const INSPIRATIONS = [
  "Je suis ostéopathe à Lyon, je soigne aussi les sportifs et les nourrissons",
  "Boulangerie artisanale à Nantes, pain au levain et viennoiseries maison",
  "Plombier chauffagiste en Essonne, dépannage en urgence 7 jours sur 7",
  "Coach sportive à Bordeaux, séances en plein air et à domicile",
  "Fleuriste à Lille, bouquets de mariage et livraison le jour même",
  "Photographe de mariage en Provence, reportages naturels et sans pose",
];

/**
 * La boîte du premier écran : une phrase, puis l'application. La phrase part
 * dans l'adresse (?activite=) ; l'application la garde pendant l'inscription
 * et en remplit la page de création. Le bouton Sitaly à gauche écrit une
 * phrase d'exemple pour qui ne sait pas par où commencer.
 */
export function BoiteApp({ idees = true }: { idees?: boolean }) {
  const id = useId();
  const [activite, setActivite] = useState("");
  const minuteur = useRef<ReturnType<typeof setInterval> | null>(null);
  const tour = useRef(0);

  useEffect(
    () => () => {
      if (minuteur.current) clearInterval(minuteur.current);
    },
    [],
  );

  function inspirer() {
    if (minuteur.current) clearInterval(minuteur.current);
    const phrase = INSPIRATIONS[tour.current++ % INSPIRATIONS.length];
    let n = 0;
    setActivite("");
    minuteur.current = setInterval(() => {
      n += 2;
      setActivite(phrase.slice(0, n));
      if (n >= phrase.length && minuteur.current) clearInterval(minuteur.current);
    }, 28);
  }

  function envoyer(e: FormEvent) {
    e.preventDefault();
    departVersAppTiktok("formulaire-produit");
    window.location.href = avecCampagne(lienCreation(activite.trim()));
  }

  return (
    <div data-boite-ia>
      {/* Le liseré au dégradé du logo, et sa lueur qui respire derrière (16/11/2026). */}
      <div className="relative isolate rounded-3xl bg-[linear-gradient(to_top_right,#0b53b0,#3049ba,#483dc1,#5d2dc4,#7014c2,#8c009e,#9d0073,#a60047,#a51111)] p-[1.5px] shadow-[0_24px_60px_-24px_rgba(0,0,0,0.25)]">
        <div
          aria-hidden="true"
          className="lueur-sitaly pointer-events-none absolute -inset-1.5 -z-10 rounded-[30px] bg-[linear-gradient(to_top_right,#0b53b0,#3049ba,#483dc1,#5d2dc4,#7014c2,#8c009e,#9d0073,#a60047,#a51111)] blur-lg"
        />
        <form onSubmit={envoyer} className="rounded-[22.5px] bg-white p-2.5">
          <label htmlFor={`${id}-activite`} className="sr-only">
            Votre activité
          </label>
          <div className="flex flex-col gap-2.5 sm:flex-row sm:items-center">
            <div className="flex min-w-0 flex-1 items-center gap-2 pl-1">
              <button
                type="button"
                onClick={inspirer}
                title="Inspire-moi : écrire un exemple"
                aria-label="Écrire une phrase d'exemple"
                className="grid h-11 w-11 shrink-0 place-items-center rounded-full bg-gradient-to-br from-[#2563eb] to-[#7c3aed] sm:h-10 sm:w-10 text-white shadow-sm transition hover:scale-105 active:scale-95"
              >
                <Sparkles className="h-[18px] w-[18px]" aria-hidden="true" />
              </button>
              <input
                id={`${id}-activite`}
                value={activite}
                onChange={(e) => setActivite(e.target.value)}
                maxLength={600}
                placeholder="Quelle est votre activité ?"
                className="min-h-12 w-full bg-transparent text-[17px] outline-none placeholder:text-black/40"
              />
            </div>
            <button type="submit" className={`${BOUTON_NOIR} min-h-12 px-6 text-[15px]`}>
              Créer mon site
              <ArrowRight className="h-4 w-4" aria-hidden="true" />
            </button>
          </div>
        </form>
      </div>
      {idees && (
        <div className="mt-4 flex flex-wrap justify-center gap-2">
          {IDEES.map((idee, k) => (
            <button
              key={idee}
              type="button"
              onClick={() => setActivite(idee)}
              className={`rounded-full bg-black/[0.04] px-3.5 py-1.5 text-sm text-black/65 transition hover:bg-black/[0.08] ${k >= 2 ? "hidden sm:inline-block" : ""}`}
            >
              {idee}
            </button>
          ))}
        </div>
      )}
    </div>
  );
}

/* ---------------------------------------------------------------------------
   Le mur d'exemples
   --------------------------------------------------------------------------- */

/** Marques inventées, domaines en `.exemple` (RFC 2606) : la légende du mur le dit. */
const EXEMPLES = [
  {
    nom: "Toitures Dumont",
    domaine: "toitures-dumont.exemple",
    titre: "Votre toiture refaite, sans mauvaise surprise",
    services: ["Réfection", "Zinguerie", "Fuites"],
    fond: "#1f2a37",
    texte: "#ffffff",
    accent: "#e0a458",
  },
  {
    nom: "Atelier Lune",
    domaine: "atelier-lune.exemple",
    titre: "Coupe, couleur et soin, sur rendez-vous",
    services: ["Coupe", "Couleur", "Soin"],
    fond: "#f3e9e2",
    texte: "#3b2a22",
    accent: "#b5651d",
  },
  {
    nom: "Vert Cerisier",
    domaine: "vert-cerisier.exemple",
    titre: "Des jardins entretenus toute l'année",
    services: ["Tonte", "Taille", "Création"],
    fond: "#2f4a3a",
    texte: "#ffffff",
    accent: "#c9e4a6",
  },
  {
    nom: "Le Fournil d'Or",
    domaine: "fournil-dor.exemple",
    titre: "Pain au levain cuit chaque matin",
    services: ["Pains", "Viennoiseries", "Commandes"],
    fond: "#f6efe3",
    texte: "#3d2614",
    accent: "#8a4b1e",
  },
  {
    nom: "Clé Minute",
    domaine: "cle-minute.exemple",
    titre: "Porte claquée ? On arrive en 30 minutes",
    services: ["Ouverture", "Serrures", "Blindage"],
    fond: "#ffffff",
    texte: "#111111",
    accent: "#d62828",
  },
];

export function MurDExemples() {
  const decalages = ["lg:mt-16", "lg:mt-4", "lg:mt-0", "lg:mt-8", "lg:mt-20"];
  const visibilite = ["", "", "hidden md:block", "hidden lg:block", "hidden lg:block"];
  return (
    <figure className="mx-auto max-w-7xl">
      <div className="grid grid-cols-2 gap-4 md:grid-cols-3 lg:grid-cols-5">
        {EXEMPLES.map((s, i) => (
          <div key={s.domaine} className={`${decalages[i]} ${visibilite[i]}`}>
            <MiniSite site={s} />
          </div>
        ))}
      </div>
      <figcaption className={`mt-8 text-center text-sm ${TEXTE_GRIS}`}>
        Exemples de sites : les entreprises sont inventées.
      </figcaption>
    </figure>
  );
}

function MiniSite({ site }: { site: (typeof EXEMPLES)[number] }) {
  return (
    <div
      className="overflow-hidden rounded-2xl border border-black/[0.08] bg-white shadow-[0_12px_40px_-12px_rgba(0,0,0,0.18)]"
      data-nosnippet
    >
      <div className="flex items-center gap-1.5 border-b border-black/[0.06] px-3 py-2">
        <span className="h-1.5 w-1.5 rounded-full bg-black/15" />
        <span className="h-1.5 w-1.5 rounded-full bg-black/15" />
        <span className="h-1.5 w-1.5 rounded-full bg-black/15" />
        <span className="ml-2 truncate text-[10px] text-black/45">{site.domaine}</span>
      </div>
      <div style={{ background: site.fond, color: site.texte }} className="px-4 pt-4 pb-6">
        <div className="flex items-center justify-between gap-2 text-[10px] font-semibold">
          <span className="truncate">{site.nom}</span>
          <span
            className="shrink-0 rounded-full px-2 py-0.5 text-[9px]"
            style={{ background: site.accent, color: site.fond === "#ffffff" ? "#fff" : site.fond }}
          >
            Devis
          </span>
        </div>
        <div className="mt-6 text-[15px] leading-tight font-semibold">{site.titre}</div>
        <div
          className="mt-3 h-1.5 w-4/5 rounded-full opacity-30"
          style={{ background: site.texte }}
        />
        <div
          className="mt-1.5 h-1.5 w-3/5 rounded-full opacity-30"
          style={{ background: site.texte }}
        />
      </div>
      <div className="grid grid-cols-3 gap-1.5 p-3">
        {site.services.map((s) => (
          <div
            key={s}
            className="truncate rounded-md bg-black/[0.04] px-1.5 py-2 text-center text-[9px] font-medium text-black/70"
          >
            {s}
          </div>
        ))}
      </div>
    </div>
  );
}

/** L'adresse d'un site publié, cadenas compris. */
export function BarreAdresse({ adresse }: { adresse: string }) {
  return (
    <div className="flex items-center gap-2 rounded-xl bg-white px-3 py-2 text-sm shadow-sm">
      <Lock className="h-3.5 w-3.5 text-[#16a34a]" aria-hidden="true" />
      <span className="font-medium">{adresse}</span>
      <span className="ml-auto inline-flex items-center gap-1.5 text-xs text-black/55">
        <span className="h-2 w-2 rounded-full bg-[#16a34a]" />
        En ligne
      </span>
    </div>
  );
}

/* ---------------------------------------------------------------------------
   Les formules
   --------------------------------------------------------------------------- */

interface Fonction {
  titre: string;
  texte: string;
  bientot?: boolean;
}

interface Formule {
  nom: string;
  mensuel: number;
  annuel: number;
  pour: string;
  bouton: string;
  intro?: string;
  fonctions: Fonction[];
  /**
   * Ce que la formule ne fait pas, sous les fonctions (audit du tunnel du
   * 15 novembre 2026, friction 5 : la carte Découverte listait ce qu'on a et
   * jamais ce qu'on n'a pas). Chaque limite doit être vérifiable dans
   * sitaly-saas ; la vitrine n'annonce pas une limite qu'on ne peut pas prouver.
   */
  limites?: { titre: string; texte: string }[];
  badge?: string;
}

/**
 * Le nom de domaine offert, dit une seule fois dans le code : la carte
 * Essentiel, le bloc de passage de l'accueil et le comparatif reprennent cette
 * phrase au lieu d'en écrire chacun une version.
 */
export const DOMAINE_OFFERT = {
  titre: "Votre nom de domaine, offert",
  texte:
    "Un .fr ou un .com enregistré à votre nom, branché sur votre site et renouvelé tant que votre abonnement court.",
} as const;

const FORMULES: Formule[] = [
  {
    ...IA.decouverte,
    pour: "Créez votre site et mettez-le en ligne, sans carte bancaire.",
    bouton: "Commencer gratuitement",
    fonctions: [
      {
        titre: "Votre site créé par l'IA",
        texte: "Textes, mise en page et photo, écrits pour votre activité en une minute.",
      },
      {
        titre: "En ligne sur nom.sitaly.fr",
        texte: "Publié en un clic, avec le cadenas HTTPS, sur téléphone et ordinateur.",
      },
      {
        titre: `${IA.decouverte.credits} crédits IA offerts`,
        texte: "Pour retoucher votre site en une phrase ou créer des photos.",
      },
      {
        titre: "Devis et factures",
        texte: "Devis illimités, 3 factures par mois, payables par carte ou virement.",
      },
    ],
    limites: [
      {
        titre: "« Site créé avec Sitaly » au pied de votre site",
        texte: `La mention reste affichée, avec un lien pour créer un site. Avec ${IA.essentiel.nom}, elle devient discrète et vous la retirez d'un clic.`,
      },
      {
        titre: `Carnet de clients plafonné à ${IA.decouverte.contactsMax} contacts`,
        texte: `Au-delà, il faut supprimer une fiche. ${IA.essentiel.nom} lève le plafond.`,
      },
      {
        titre: "Pas de nom de domaine à vous",
        texte: `Votre site vit sur une adresse en .sitaly.fr. ${IA.essentiel.nom} vous offre le vôtre.`,
      },
    ],
  },
  {
    ...IA.essentiel,
    pour: "Tout pour un site à votre image, que vous retouchez quand vous voulez.",
    bouton: "Commencer",
    badge: "Recommandé",
    intro: `Tout ${IA.decouverte.nom}, plus :`,
    fonctions: [
      {
        titre: `${IA.essentiel.credits.toLocaleString("fr-FR")} crédits IA par mois`,
        texte: "Réécrire une section, ajouter des tarifs, changer le ton, créer des photos.",
      },
      {
        titre: "Factures illimitées et relances",
        texte: "Vos impayés relancés automatiquement à J+1, J+8 et J+15.",
      },
      { titre: "Assistance par e-mail", texte: "Une vraie personne vous répond, en français." },
      { ...DOMAINE_OFFERT },
      {
        titre: "Mention Sitaly discrète et retirable",
        texte:
          "Votre site affiche « Site réalisé avec Sitaly » en petit, et vous la retirez d'un clic si vous préférez.",
      },
      {
        titre: "Prise de rendez-vous en ligne",
        texte: "Vos clients réservent un créneau depuis votre site.",
      },
      {
        titre: "Vos avis Google",
        texte:
          "Chaque nouvel avis arrive avec sa réponse prête, publiée d'un clic. Vos clients reçoivent la demande d'avis.",
      },
    ],
  },
  {
    ...IA.pro,
    pour: "L'IA la plus avancée et un expert pour démarrer vite.",
    bouton: "Commencer",
    intro: `Tout ${IA.essentiel.nom}, plus :`,
    fonctions: [
      {
        titre: "Notre IA la plus avancée",
        texte: "Les textes de votre site écrits par le meilleur modèle d'IA du moment.",
      },
      {
        titre: `${IA.pro.credits.toLocaleString("fr-FR")} crédits IA par mois`,
        texte: "Cinq fois plus de retouches et de photos.",
      },
      {
        titre: "Mise en place avec un expert",
        texte: "Un rendez-vous avec l'équipe Sitaly pour régler votre site avec vous.",
      },
      {
        titre: "Votre site en deux langues",
        texte: "Une deuxième langue, avec un sélecteur pour vos visiteurs.",
        bientot: true,
      },
    ],
  },
];

/** Les trois formules, au mois ou à l'année (−15 %). */
export function GrilleTarifs() {
  const [annuel, setAnnuel] = useState(false);
  return (
    <div>
      <div className="flex justify-center">
        <div
          role="radiogroup"
          aria-label="Période de paiement"
          className="inline-flex rounded-full bg-black/[0.05] p-1 text-sm font-medium"
        >
          {[
            [false, "Mensuel"],
            [true, "Annuel"],
          ].map(([valeur, libelle]) => (
            <button
              key={String(libelle)}
              type="button"
              role="radio"
              aria-checked={annuel === valeur}
              onClick={() => setAnnuel(valeur as boolean)}
              className={`inline-flex min-h-10 items-center gap-2 rounded-full px-5 transition ${annuel === valeur ? "bg-white shadow-sm" : "text-black/55 hover:text-black/80"}`}
            >
              {libelle as string}
              {valeur && (
                <span className="rounded-full bg-brand-ink px-2 py-0.5 text-[11px] font-semibold text-white">
                  −15 %
                </span>
              )}
            </button>
          ))}
        </div>
      </div>
      <div className="mt-10 grid gap-5 lg:grid-cols-3">
        {FORMULES.map((f) => (
          <CartePrix key={f.nom} formule={f} annuel={annuel} />
        ))}
      </div>
      <p className={`mx-auto mt-6 max-w-2xl text-center text-sm ${TEXTE_GRIS}`}>
        {MENTION_TVA}. Sans engagement au mois ; l'annuel se paie pour un an. « Bientôt » :
        fonctions en préparation, ajoutées à votre formule dès leur ouverture. Une retouche coûte 1
        ou 2 crédits, une photo créée par l'IA 5.
      </p>
    </div>
  );
}

function CartePrix({ formule, annuel }: { formule: Formule; annuel: boolean }) {
  const { nom, mensuel, pour, intro, fonctions, limites, bouton, badge } = formule;
  const prix = annuel && mensuel > 0 ? formule.annuel : mensuel;
  return (
    <div
      className={`flex flex-col rounded-3xl bg-white p-8 ${badge ? "border-2 border-black/80" : "border border-black/[0.08]"}`}
    >
      <div className="flex items-center justify-between gap-3">
        <h3 className="text-lg font-semibold">{nom}</h3>
        {badge && (
          <span className="rounded-full bg-black/85 px-3 py-1 text-xs font-medium text-white">
            {badge}
          </span>
        )}
      </div>
      <div className="mt-6 flex items-baseline gap-1">
        <span className="text-5xl font-semibold tracking-tight">{euros(prix)}</span>
        {mensuel > 0 && <span className={TEXTE_GRIS}>{annuel ? "/an" : "/mois"}</span>}
      </div>
      <p className={`mt-1 h-5 text-sm ${TEXTE_GRIS}`}>
        {annuel && mensuel > 0
          ? `soit ${euros(Math.round((formule.annuel / 12) * 100) / 100)} par mois, au lieu de ${euros(mensuel)}`
          : ""}
      </p>
      <p className={`mt-3 min-h-14 ${TEXTE_GRIS}`}>{pour}</p>
      <a href={lienCreation()} className={`${badge ? BOUTON_NOIR : BOUTON_CLAIR} mt-6`}>
        {bouton}
      </a>
      {intro && (
        <p className="mt-8 border-t border-black/[0.06] pt-8 text-sm font-medium">{intro}</p>
      )}
      <ul className={`space-y-5 ${intro ? "mt-5" : "mt-8 border-t border-black/[0.06] pt-8"}`}>
        {fonctions.map((f) => (
          <li key={f.titre} className="flex gap-3">
            {f.bientot ? (
              <Clock className="mt-0.5 h-4 w-4 shrink-0 text-black/35" aria-hidden="true" />
            ) : (
              <Check className="mt-0.5 h-4 w-4 shrink-0 text-black/75" aria-hidden="true" />
            )}
            <div>
              <div
                className={`flex flex-wrap items-center gap-2 text-[15px] font-semibold ${f.bientot ? "text-black/50" : ""}`}
              >
                {f.titre}
                {f.bientot && (
                  <span className="rounded-full bg-black/[0.05] px-2 py-0.5 text-[11px] font-medium text-black/55">
                    Bientôt
                  </span>
                )}
              </div>
              <p className={`mt-1 text-sm leading-6 ${f.bientot ? "text-black/45" : TEXTE_GRIS}`}>
                {f.texte}
              </p>
            </div>
          </li>
        ))}
      </ul>
      {limites && (
        <div className="mt-8 border-t border-black/[0.06] pt-8">
          <p className="text-sm font-medium">Ce que {nom} ne fait pas :</p>
          <ul className="mt-5 space-y-5">
            {limites.map((l) => (
              <li key={l.titre} className="flex gap-3">
                <X className="mt-0.5 h-4 w-4 shrink-0 text-black/35" aria-hidden="true" />
                <div>
                  <div className="text-[15px] font-semibold text-black/55">{l.titre}</div>
                  <p className="mt-1 text-sm leading-6 text-black/45">{l.texte}</p>
                </div>
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
}

/* ---------------------------------------------------------------------------
   Le passage de Découverte à Essentiel (16 novembre 2026)
   --------------------------------------------------------------------------- */

/**
 * Ce qu'Essentiel ouvre, dans l'ordre de ce que l'artisan vient de vivre : il a
 * publié son site sur une adresse en .sitaly.fr, avec la mention Sitaly au
 * pied. Chaque ligne se vérifie dans sitaly-saas.
 */
const OUVERT_PAR_ESSENTIEL: { titre: string; texte: string }[] = [
  { ...DOMAINE_OFFERT },
  {
    titre: "La mention Sitaly, discrète puis retirée",
    texte:
      "« Site réalisé avec Sitaly » remplace « Site créé avec Sitaly », en petit, et un clic la retire.",
  },
  {
    titre: "Carnet de clients sans plafond",
    texte: "Autant de fiches que de clients, avec leurs devis et leurs factures.",
  },
  {
    titre: "Factures illimitées, impayés relancés",
    texte: "Vos retards de paiement relancés par e-mail à J+1, J+8 et J+15.",
  },
  {
    titre: "Rendez-vous et avis Google",
    texte:
      "Vos clients réservent un créneau depuis votre site ; vos avis Google arrivent avec leur réponse prête.",
  },
];

/**
 * Le passage de la formule gratuite à Essentiel, sur l'accueil (16 novembre
 * 2026). L'audit du tunnel du 15 novembre l'a relevé : la vitrine chiffrait
 * bien les trois formules, mais ne disait jamais d'un bloc ce que Découverte
 * arrête ni ce qu'Essentiel ouvre. Les limites viennent de la carte Découverte
 * (`FORMULES`), le domaine de `DOMAINE_OFFERT` : aucune phrase n'est réécrite ici.
 */
export function PassageEssentiel() {
  const { fonctions, limites = [] } = FORMULES[0];
  return (
    <div className="grid gap-5 lg:grid-cols-2">
      <div className={`${CARTE} flex flex-col p-8 sm:p-10`}>
        <div className="flex items-baseline gap-2">
          <h3 className="text-lg font-semibold">{IA.decouverte.nom}</h3>
          <span className={`text-sm ${TEXTE_GRIS}`}>gratuit, sans carte bancaire</span>
        </div>
        <p className="mt-4 text-[17px] leading-7">
          Votre site est écrit, retouché et mis en ligne sans payer un euro, sur une adresse en
          <span className="whitespace-nowrap"> .sitaly.fr</span>. Vous restez dessus aussi longtemps
          que vous voulez.
        </p>
        <ul className="mt-8 space-y-4">
          {fonctions.map((f) => (
            <li key={f.titre} className="flex gap-3">
              <Check className="mt-0.5 h-4 w-4 shrink-0 text-black/75" aria-hidden="true" />
              <span className="text-[15px] leading-6">{f.titre}</span>
            </li>
          ))}
        </ul>
        <p className="mt-8 border-t border-black/[0.06] pt-8 text-sm font-medium">
          Là où {IA.decouverte.nom} s'arrête :
        </p>
        <ul className="mt-4 space-y-4">
          {limites.map((l) => (
            <li key={l.titre} className="flex gap-3">
              <X className="mt-0.5 h-4 w-4 shrink-0 text-black/35" aria-hidden="true" />
              <span className="text-[15px] leading-6 text-black/55">{l.titre}</span>
            </li>
          ))}
        </ul>
      </div>

      <div className="flex flex-col rounded-3xl bg-[#0d0f14] p-8 text-white sm:p-10">
        <div className="flex items-baseline gap-2">
          <h3 className="text-lg font-semibold">{IA.essentiel.nom}</h3>
          <span className="text-sm text-white/60">
            {euros(IA.essentiel.mensuel)}/mois, sans engagement
          </span>
        </div>
        <p className="mt-4 text-[17px] leading-7 text-white/80">
          Vous passez quand votre site vous plaît, pas avant. Ce qui change le jour même :
        </p>
        <ul className="mt-8 space-y-5">
          {OUVERT_PAR_ESSENTIEL.map((f) => (
            <li key={f.titre} className="flex gap-3">
              <Check className="mt-0.5 h-4 w-4 shrink-0 text-[#c4b5fd]" aria-hidden="true" />
              <div>
                <div className="text-[15px] font-semibold">{f.titre}</div>
                <p className="mt-1 text-sm leading-6 text-white/60">{f.texte}</p>
              </div>
            </li>
          ))}
        </ul>
        <a
          href={lienCreation()}
          className="mt-10 inline-flex items-center justify-center gap-2 rounded-2xl bg-white px-5 py-3 text-sm font-medium text-black transition hover:bg-white/90"
        >
          Commencer gratuitement
          <ArrowRight className="h-4 w-4" aria-hidden="true" />
        </a>
        <p className="mt-3 text-sm text-white/55">
          {MENTION_TVA}. Le détail formule par formule est sur la page Tarifs.
        </p>
      </div>
    </div>
  );
}

/* ---------------------------------------------------------------------------
   Le tableau comparatif des formules (30 octobre 2026), comme « Compare plans »
   chez durable.com : sous les cartes de prix, ligne par ligne. Il reprend les
   mêmes chiffres (CREATEUR_IA) ; une valeur « bientot » s'affiche grisée.
   --------------------------------------------------------------------------- */

type Valeur = boolean | string | { bientot: string };

interface LigneComparee {
  libelle: string;
  aide?: string;
  valeurs: [Valeur, Valeur, Valeur];
}

const GROUPES_COMPARES: { titre: string; lignes: LigneComparee[] }[] = [
  {
    titre: "Votre site",
    lignes: [
      { libelle: "Site complet écrit par l'IA", valeurs: [true, true, true] },
      {
        libelle: "Modèle d'IA pour la rédaction",
        valeurs: ["Avancé", "Avancé", "Le plus avancé"],
      },
      { libelle: "Quatre thèmes, changement en un clic", valeurs: [true, true, true] },
      { libelle: "Retouches à la main dans l'éditeur", valeurs: [true, true, true] },
      { libelle: "Formulaire de contact", valeurs: [true, true, true] },
    ],
  },
  {
    titre: "Intelligence artificielle",
    lignes: [
      {
        libelle: "Crédits IA",
        aide: "Une retouche coûte 1 ou 2 crédits, une photo 5.",
        valeurs: [
          `${IA.decouverte.credits} offerts`,
          `${IA.essentiel.credits.toLocaleString("fr-FR")} par mois`,
          `${IA.pro.credits.toLocaleString("fr-FR")} par mois`,
        ],
      },
      { libelle: "Retouches en une phrase", valeurs: [true, true, true] },
      { libelle: "Photos créées par l'IA", valeurs: [true, true, true] },
      {
        libelle: "Articles de blog écrits par l'IA",
        aide: "1 crédit les idées, 6 crédits l'article.",
        valeurs: [true, true, true],
      },
      { libelle: "Logo et identité de marque", valeurs: [true, true, true] },
      {
        libelle: "Agent IA : réponses aux demandes du site",
        aide: "1 crédit par réponse rédigée, envoyée après votre accord.",
        valeurs: [true, true, true],
      },
      {
        libelle: "Agent IA : avis Google",
        aide: "Fiche connectée : avis relevés chaque matin, réponse prête, publiée sur Google après votre clic. 1 crédit par réponse.",
        valeurs: [false, true, true],
      },
    ],
  },
  {
    titre: "En ligne",
    lignes: [
      { libelle: "Adresse nom.sitaly.fr et cadenas HTTPS", valeurs: [true, true, true] },
      {
        libelle: "Prêt pour Google : titres, descriptions, plan du site",
        valeurs: [true, true, true],
      },
      {
        libelle: DOMAINE_OFFERT.titre,
        aide: "Enregistré à votre nom, renouvelé tant que l'abonnement court.",
        valeurs: [false, true, true],
      },
      {
        libelle: "Mention Sitaly retirable",
        aide: "Découverte affiche « Site créé avec Sitaly ». Essentiel et Pro gardent une mention discrète, que vous retirez d'un clic.",
        valeurs: [false, true, true],
      },
      { libelle: "Score de visibilité SEO et GEO, fichier llms.txt", valeurs: [true, true, true] },
      { libelle: "Site en deux langues", valeurs: [false, false, { bientot: "Bientôt" }] },
    ],
  },
  {
    titre: "Gérer votre activité",
    lignes: [
      {
        libelle: "Carnet de clients",
        aide: `Les fiches de vos clients, avec leurs devis et leurs factures. ${IA.decouverte.nom} s'arrête à ${IA.decouverte.contactsMax} fiches.`,
        valeurs: [`${IA.decouverte.contactsMax} contacts`, "Illimité", "Illimité"],
      },
      { libelle: "Devis acceptés en ligne", valeurs: [true, true, true] },
      {
        libelle: "Devis dicté à la voix",
        aide: "2 crédits le devis, relu par vous avant l'envoi.",
        valeurs: [true, true, true],
      },
      { libelle: "Factures conformes", valeurs: ["3 par mois", "Illimitées", "Illimitées"] },
      {
        libelle: "Paiement des factures par carte",
        aide: "Sans commission Sitaly : seuls les frais Stripe s'appliquent.",
        valeurs: [true, true, true],
      },
      { libelle: "Relances automatiques des impayés", valeurs: [false, true, true] },
      { libelle: "Prise de rendez-vous en ligne", valeurs: [false, true, true] },
      {
        libelle: "Demandes d'avis à vos clients",
        aide: "Par e-mail, SMS ou QR code, ou envoyées seules après une facture payée ou un rendez-vous.",
        valeurs: [false, true, true],
      },
      { libelle: "Vos avis Google sur votre site", valeurs: [false, true, true] },
    ],
  },
  {
    titre: "Accompagnement",
    lignes: [
      { libelle: "Assistance par e-mail, en français", valeurs: [false, true, true] },
      { libelle: "Mise en place avec un expert", valeurs: [false, false, true] },
    ],
  },
];

const NOMS_COMPARES = [IA.decouverte.nom, IA.essentiel.nom, IA.pro.nom] as const;
const PRIX_COMPARES = [
  "Gratuit",
  `${euros(IA.essentiel.mensuel)}/mois`,
  `${euros(IA.pro.mensuel)}/mois`,
] as const;

function CelluleValeur({ v }: { v: Valeur }) {
  if (v === true) return <Check className="mx-auto h-5 w-5 text-black/80" aria-label="Compris" />;
  if (v === false)
    return (
      <span className="text-black/25" aria-label="Non compris">
        —
      </span>
    );
  if (typeof v === "string") return <span className="text-[15px] font-medium">{v}</span>;
  return (
    <span className="inline-flex items-center gap-1 rounded-full bg-black/[0.05] px-2.5 py-0.5 text-xs font-medium text-black/55">
      <Clock className="h-3 w-3" aria-hidden="true" />
      {v.bientot}
    </span>
  );
}

/** Les trois formules ligne par ligne : un tableau sur ordinateur, une formule à la fois sur téléphone. */
export function TableauFormules() {
  const [choix, setChoix] = useState(1);
  return (
    <div>
      {/* Ordinateur */}
      <div className="hidden md:block">
        <table className="w-full table-fixed text-left">
          <caption className="sr-only">Comparatif des formules Sitaly</caption>
          <thead>
            <tr className="align-bottom">
              <th scope="col" className="w-[40%] pb-6" />
              {NOMS_COMPARES.map((nom, k) => (
                <th key={nom} scope="col" className="px-3 pb-6 text-center font-normal">
                  <div
                    className={`rounded-3xl p-5 ${k === 1 ? "bg-[#0d0f14] text-white" : "bg-black/[0.03]"}`}
                  >
                    <div className="text-lg font-semibold">{nom}</div>
                    <div className={`mt-1 text-sm ${k === 1 ? "text-white/60" : TEXTE_GRIS}`}>
                      {PRIX_COMPARES[k]}
                    </div>
                    <a
                      href={lienCreation()}
                      className={`mt-4 inline-flex w-full items-center justify-center rounded-2xl px-4 py-2.5 text-sm font-semibold transition ${
                        k === 1
                          ? "bg-white text-black hover:bg-white/90"
                          : "bg-black/85 text-white hover:bg-black"
                      }`}
                    >
                      {k === 0 ? "Commencer" : "Choisir"}
                    </a>
                  </div>
                </th>
              ))}
            </tr>
          </thead>
          {GROUPES_COMPARES.map((g) => (
            <tbody key={g.titre}>
              <tr>
                <th
                  colSpan={4}
                  scope="colgroup"
                  className="pt-8 pb-3 text-sm font-semibold text-brand-ink"
                >
                  {g.titre}
                </th>
              </tr>
              {g.lignes.map((l) => (
                <tr key={l.libelle} className="border-t border-black/[0.06]">
                  <th scope="row" className="py-4 pr-6 align-top font-normal">
                    <div className="text-[15px] font-medium">{l.libelle}</div>
                    {l.aide && <div className={`mt-0.5 text-sm ${TEXTE_GRIS}`}>{l.aide}</div>}
                  </th>
                  {l.valeurs.map((v, k) => (
                    <td
                      key={k}
                      className={`px-3 py-4 text-center align-top ${k === 1 ? "bg-black/[0.02]" : ""}`}
                    >
                      <CelluleValeur v={v} />
                    </td>
                  ))}
                </tr>
              ))}
            </tbody>
          ))}
        </table>
      </div>

      {/* Téléphone : une formule à la fois */}
      <div className="md:hidden">
        <div
          role="tablist"
          aria-label="Formule à comparer"
          className="sticky top-[calc(var(--entete-hauteur)+0.5rem)] z-10 grid grid-cols-3 rounded-full bg-black/[0.05] p-1 text-sm font-medium backdrop-blur"
        >
          {NOMS_COMPARES.map((nom, k) => (
            <button
              key={nom}
              type="button"
              role="tab"
              aria-selected={choix === k}
              onClick={() => setChoix(k)}
              className={`min-h-10 rounded-full transition ${choix === k ? "bg-white shadow-sm" : "text-black/55"}`}
            >
              {nom}
            </button>
          ))}
        </div>
        <p className={`mt-4 text-center text-sm ${TEXTE_GRIS}`}>{PRIX_COMPARES[choix]}</p>
        {GROUPES_COMPARES.map((g) => (
          <div key={g.titre} className="mt-6">
            <div className="text-sm font-semibold text-brand-ink">{g.titre}</div>
            <ul className="mt-2">
              {g.lignes.map((l) => (
                <li
                  key={l.libelle}
                  className="flex items-start justify-between gap-4 border-t border-black/[0.06] py-3.5"
                >
                  <div>
                    <div className="text-[15px] font-medium">{l.libelle}</div>
                    {l.aide && <div className={`mt-0.5 text-sm ${TEXTE_GRIS}`}>{l.aide}</div>}
                  </div>
                  <div className="shrink-0 text-right">
                    <CelluleValeur v={l.valeurs[choix]} />
                  </div>
                </li>
              ))}
            </ul>
          </div>
        ))}
        <a href={lienCreation()} className={`${BOUTON_NOIR} mt-6 w-full`}>
          {choix === 0 ? "Commencer gratuitement" : `Choisir ${NOMS_COMPARES[choix]}`}
        </a>
      </div>
    </div>
  );
}

/* ---------------------------------------------------------------------------
   Les questions fréquentes
   --------------------------------------------------------------------------- */

// Les questions fréquentes vivent dans src/data/faq-produit.ts depuis le
// 16 novembre 2026 : le chat du site les lit par un script Node, qui ne peut
// pas importer ce fichier. Réexportées ici, où l'accueil et /tarifs/ les prennent.
export { FAQ_PRODUIT };

export function Faq() {
  return (
    <div className="space-y-3">
      {FAQ_PRODUIT.map((f) => (
        <details key={f.q} className="group rounded-2xl bg-black/[0.03]">
          <summary className="flex cursor-pointer list-none items-center justify-between gap-6 px-6 py-5 text-left font-medium marker:content-none">
            {f.q}
            <span
              aria-hidden="true"
              className="grid h-7 w-7 shrink-0 place-items-center rounded-full bg-white transition-transform group-open:rotate-45"
            >
              <svg
                viewBox="0 0 12 12"
                className="h-3 w-3"
                fill="none"
                stroke="currentColor"
                strokeWidth="1.8"
                strokeLinecap="round"
              >
                <path d="M6 1.5v9M1.5 6h9" />
              </svg>
            </span>
          </summary>
          <p className={`px-6 pb-6 leading-7 ${TEXTE_GRIS}`}>{f.a}</p>
        </details>
      ))}
      <p className={`pt-5 text-center text-sm ${TEXTE_GRIS}`}>
        Une autre question ?{" "}
        <a href={`tel:${SITALY_PHONE}`} className="font-medium text-black/85 underline">
          {SITALY_PHONE_DISPLAY}
        </a>
      </p>
    </div>
  );
}
