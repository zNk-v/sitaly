import { createFileRoute, Link } from "@tanstack/react-router";
import { useEffect, useRef, useState } from "react";
import {
  ArrowLeft,
  ArrowRight,
  Bot,
  Calendar,
  Check,
  Gem,
  Megaphone,
  MessageCircle,
  Monitor,
  PhoneCall,
  Puzzle,
  RefreshCw,
  Rocket,
  ShieldCheck,
  ShoppingBag,
  ShoppingCart,
  Sparkles,
  Store,
} from "lucide-react";
import { SiteHeader } from "@/components/SiteHeader";
import { SiteFooter } from "@/components/SiteFooter";
import { VerificateurDomaine } from "@/components/VerificateurDomaine";
import { resumeDomaine } from "@/lib/domaine";
import { CALENDLY_URL, euros } from "@/lib/config";
import { envoyerDemande } from "@/lib/formulaire";
import { suivreEvenement } from "@/lib/mesure";
import { BASE_URL } from "@/lib/sitemap";
import {
  GROUPES,
  MENTION_TVA,
  OFFRES,
  lignesIncluses,
  offre,
  prixLong,
  type Offre,
  type OffreId,
} from "@/data/offres";

/**
 * Le questionnaire « Trouver mon offre » (23 octobre 2026), sur le modèle du
 * parcours « Démarrer » de devmiweb.com, raccourci à cinq écrans au plus.
 *
 * C'est le bouton principal du site. Juste avant le résultat, le visiteur
 * laisse prénom, e-mail et téléphone (« Votre offre est prête ») : le relais
 * de formulaires envoie la fiche à Teddy et l'offre au prospect, par un
 * circuit à part des leads Google Ads (voir handleQuestionnaire dans
 * ~/sitaly-forms). Le résultat montre l'offre et un seul bouton, Calendly,
 * prérempli. Le numéro de Sitaly n'y figure pas.
 *
 * Le parcours dépend du besoin choisi au premier écran :
 * - un site : site existant ?, puis où sont vos clients ? (Présence, Pro ou
 *   Expert ; « à entretenir » mène directement à la Maintenance) ;
 * - vendre en ligne : la taille du catalogue choisit la boutique ;
 * - un agent IA : où se perdent les demandes choisit l'offre ;
 * - être plus visible, ou « conseillez-moi » : pas d'offre proposée, la grille
 *   Visibilité étant à revoir, le visiteur est rappelé.
 * Tous finissent par l'activité et le délai, les coordonnées, puis le résultat.
 *
 * Les montants viennent de src/data/offres.ts. `?offre=presence-pro` (depuis
 * les cartes de /tarifs/) part de l'offre déjà choisie ; `?besoin=site` saute
 * le premier écran.
 *
 * Hors index : la page n'a pas de contenu à elle, elle oriente.
 */

type Besoin = "site" | "boutique" | "agents" | "visibilite" | "conseil";
type Etape =
  | "besoin"
  | "existant"
  | "clients"
  | "catalogue"
  | "demandes"
  | "activite"
  | "coordonnees"
  | "resultat";
type Icone = React.ComponentType<{ className?: string }>;

interface Choix<T extends string> {
  valeur: T;
  label: string;
  detail: string;
  icone: Icone;
}

const BESOINS: Choix<Besoin>[] = [
  {
    valeur: "site",
    label: "Un site internet",
    detail: "Création, refonte ou entretien",
    icone: Monitor,
  },
  {
    valeur: "boutique",
    label: "Vendre en ligne",
    detail: "Une boutique Shopify",
    icone: ShoppingBag,
  },
  {
    valeur: "agents",
    label: "Un agent IA",
    detail: "Répondre, prendre les rendez-vous, relancer",
    icone: Bot,
  },
  {
    valeur: "visibilite",
    label: "Être plus visible",
    detail: "Google, ChatGPT, publicité",
    icone: Megaphone,
  },
];

type Existant = "non" | "refaire" | "entretenir";
const EXISTANT: Choix<Existant>[] = [
  { valeur: "non", label: "Non, je pars de zéro", detail: "Création d'un site", icone: Sparkles },
  { valeur: "refaire", label: "Oui, à refaire", detail: "Refonte de votre site", icone: RefreshCw },
  {
    valeur: "entretenir",
    label: "Oui, à entretenir",
    detail: "Il est bien, il faut le tenir à jour",
    icone: ShieldCheck,
  },
];

const CLIENTS: (Choix<string> & { offre: OffreId })[] = [
  {
    valeur: "commune",
    label: "Dans ma commune",
    detail: "On me cherche là où je suis installé",
    icone: Store,
    offre: "presence",
  },
  {
    valeur: "voisines",
    label: "Aussi dans les communes voisines",
    detail: "Je me déplace, je veux être trouvé plus loin",
    icone: Rocket,
    offre: "presence-pro",
  },
  {
    valeur: "concurrence",
    label: "Mes concurrents sont déjà bien placés",
    detail: "Sur Google comme dans ChatGPT",
    icone: Gem,
    offre: "presence-expert",
  },
];

/* Une seule boutique : au-delà de son catalogue, la boutique se chiffre sur
   devis, sans offre conseillée. */
const CATALOGUE: (Choix<string> & { offre?: OffreId })[] = [
  {
    valeur: "petit",
    label: "Jusqu'à 20 produits",
    detail: "Une boutique simple à tenir",
    icone: ShoppingCart,
    offre: "boutique",
  },
  {
    valeur: "moyen",
    label: "Plus de 20 produits",
    detail: "Par lots de 10 produits supplémentaires",
    icone: ShoppingBag,
    offre: "boutique",
  },
  {
    valeur: "grand",
    label: "Un grand catalogue ou plusieurs langues",
    detail: "Ou une boutique reliée à vos outils : sur devis",
    icone: Gem,
  },
];

const DEMANDES: (Choix<string> & { offre: OffreId })[] = [
  {
    valeur: "messages",
    label: "Des messages restent sans réponse",
    detail: "Site, WhatsApp ou e-mail",
    icone: MessageCircle,
    offre: "agent-ia",
  },
  {
    valeur: "appels",
    label: "Je rate des appels",
    detail: "Le téléphone sonne quand je suis sur un chantier",
    icone: PhoneCall,
    offre: "agent-ia-pro",
  },
  {
    valeur: "outil",
    label: "Il me manque un outil",
    detail: "Un CRM, un logiciel, une application",
    icone: Puzzle,
    offre: "outil-sur-mesure",
  },
];

const DELAIS = ["Dès que possible", "Dans le mois", "Dans les 3 mois", "Je me renseigne"];

const QUESTIONS: Record<Etape, string> = {
  besoin: "Que voulez-vous lancer ?",
  existant: "Vous avez déjà un site ?",
  clients: "Où sont vos clients ?",
  catalogue: "Combien de produits voulez-vous vendre ?",
  demandes: "Où se perdent vos demandes ?",
  activite: "Parlez-nous de votre activité",
  coordonnees: "Votre offre est prête",
  resultat: "Notre conseil",
};

/** Les écrans d'un parcours, du premier au résultat. */
function parcours(besoin: Besoin | undefined, existant: Existant | undefined): Etape[] {
  switch (besoin) {
    case "site":
      return existant === "entretenir"
        ? ["besoin", "existant", "activite", "coordonnees", "resultat"]
        : ["besoin", "existant", "clients", "activite", "coordonnees", "resultat"];
    case "boutique":
      return ["besoin", "catalogue", "activite", "coordonnees", "resultat"];
    case "agents":
      return ["besoin", "demandes", "activite", "coordonnees", "resultat"];
    case "visibilite":
    case "conseil":
      return ["besoin", "activite", "coordonnees", "resultat"];
    default:
      return ["besoin", "existant", "clients", "activite", "coordonnees", "resultat"];
  }
}

const BESOIN_DU_GROUPE: Record<Offre["groupe"], Besoin> = {
  site: "site",
  maintenance: "site",
  boutique: "boutique",
  "agents-ia": "agents",
};

const IDS = new Set<string>(OFFRES.map((o) => o.id));
const BESOINS_VALIDES = new Set<string>(["site", "boutique", "agents", "visibilite", "conseil"]);

const TITRE = "Trouver mon offre : site, boutique ou agent IA | Sitaly";
const DESCRIPTION =
  "Quatre questions pour savoir quelle offre Sitaly vous convient, et à quel prix. Vous recevez l'offre par e-mail et choisissez un créneau pour en parler.";
const URL = `${BASE_URL}/mon-projet/`;

export const Route = createFileRoute("/mon-projet")({
  validateSearch: (s: Record<string, unknown>): { offre?: OffreId; besoin?: Besoin } => ({
    offre: typeof s.offre === "string" && IDS.has(s.offre) ? (s.offre as OffreId) : undefined,
    besoin:
      typeof s.besoin === "string" && BESOINS_VALIDES.has(s.besoin)
        ? (s.besoin as Besoin)
        : undefined,
  }),
  head: () => ({
    meta: [
      { title: TITRE },
      { name: "description", content: DESCRIPTION },
      { name: "robots", content: "noindex, follow" },
      { property: "og:title", content: TITRE },
      { property: "og:description", content: DESCRIPTION },
      { property: "og:url", content: URL },
    ],
    links: [{ rel: "canonical", href: URL }],
  }),
  component: MonProjet,
});

function MonProjet() {
  const recherche = Route.useSearch();
  const depart = recherche.offre ? offre(recherche.offre) : undefined;

  const [besoin, setBesoin] = useState<Besoin | undefined>(
    depart ? BESOIN_DU_GROUPE[depart.groupe] : recherche.besoin,
  );
  const [existant, setExistant] = useState<Existant | undefined>(
    depart?.groupe === "maintenance" ? "entretenir" : undefined,
  );
  const [offreId, setOffreId] = useState<OffreId | undefined>(depart?.id);
  const [reponses, setReponses] = useState<Partial<Record<Etape, string>>>(() => {
    const b = depart ? BESOIN_DU_GROUPE[depart.groupe] : recherche.besoin;
    const label = BESOINS.find((c) => c.valeur === b)?.label;
    return label ? { besoin: label } : {};
  });
  const [activite, setActivite] = useState("");
  const [delai, setDelai] = useState("");
  const [contact, setContact] = useState<Contact>();
  /* Le nom de domaine testé à l'étape activité, quand le visiteur part de zéro. */
  const [domaine, setDomaine] = useState("");
  /* L'historique des écrans vus : « Retour » y remonte, quel que soit le
     chemin pris, y compris quand on arrive avec une offre déjà choisie. */
  const [historique, setHistorique] = useState<Etape[]>(() => {
    if (depart) return ["besoin", "activite"];
    if (recherche.besoin) return ["besoin", parcours(recherche.besoin, undefined)[1]];
    return ["besoin"];
  });

  const etape = historique[historique.length - 1];
  const etapes = parcours(besoin, existant);
  const rang = Math.max(etapes.indexOf(etape), 0);

  const titre = useRef<HTMLHeadingElement>(null);
  const premier = useRef(true);
  /* Le focus suit la question : au clavier comme au lecteur d'écran, on
     entend la nouvelle question au lieu de rester sur un bouton disparu. */
  useEffect(() => {
    if (premier.current) {
      premier.current = false;
      return;
    }
    titre.current?.focus();
    window.scrollTo({ top: 0 });
  }, [etape]);

  const aller = (suivante: Etape) => setHistorique((h) => [...h, suivante]);
  const retour = () => setHistorique((h) => (h.length > 1 ? h.slice(0, -1) : h));
  const noter = (e: Etape, texte: string) => setReponses((r) => ({ ...r, [e]: texte }));

  function choisirBesoin(c: Choix<Besoin>) {
    setBesoin(c.valeur);
    setExistant(undefined);
    setOffreId(undefined);
    setReponses({ besoin: c.label });
    aller(parcours(c.valeur, undefined)[1]);
  }

  function choisirExistant(c: Choix<Existant>) {
    setExistant(c.valeur);
    noter("existant", c.label);
    if (c.valeur === "entretenir") {
      setOffreId("maintenance");
      aller("activite");
    } else {
      setOffreId(undefined);
      aller("clients");
    }
  }

  function choisirOffre(e: Etape, c: Choix<string> & { offre?: OffreId }) {
    noter(e, c.label);
    setOffreId(c.offre);
    aller("activite");
  }

  const o = offreId ? offre(offreId) : undefined;
  const resume = [
    ...Object.entries(reponses)
      .filter(([, v]) => v)
      .map(([e, v]) => `${QUESTIONS[e as Etape]} ${v}`),
    o ? `Offre conseillée : ${o.nom} (${prixLong(o)})` : "Offre : à définir ensemble",
    ...(existant === "non" && domaine ? [`Nom de domaine testé : ${domaine}`] : []),
  ];
  const question = etape === "coordonnees" && !o ? "Où vous répondre ?" : QUESTIONS[etape];

  return (
    <div className="min-h-screen bg-background text-foreground">
      <SiteHeader />

      <main className="on-wash min-h-dvh pt-[calc(var(--entete-hauteur)+2rem)] pb-20 sm:pt-[calc(var(--entete-hauteur)+3.5rem)]">
        <div className="mx-auto max-w-2xl px-4 sm:px-6">
          {/* La progression, un segment par écran du parcours en cours. */}
          <p className="rail-label text-center text-brand-ink">Trouver mon offre</p>
          <div
            className="mt-4 flex gap-1.5"
            role="progressbar"
            aria-label="Progression du questionnaire"
            aria-valuemin={1}
            aria-valuemax={etapes.length}
            aria-valuenow={rang + 1}
          >
            {etapes.map((e, i) => (
              <span
                key={e}
                className={`h-1 flex-1 rounded-full transition-colors duration-300 ${
                  i <= rang ? "bg-brand-ink" : "bg-foreground/10"
                }`}
              />
            ))}
          </div>

          <div className="mt-4 h-8">
            {historique.length > 1 && (
              <button
                type="button"
                onClick={retour}
                className="inline-flex items-center gap-1.5 text-sm font-semibold text-muted-foreground transition hover:text-foreground"
              >
                <ArrowLeft className="h-4 w-4" />
                Retour
              </button>
            )}
          </div>

          <h1
            ref={titre}
            tabIndex={-1}
            className="mt-2 text-center font-display text-[clamp(1.75rem,4.5vw,2.6rem)] font-extrabold leading-[1.08] tracking-[-0.035em] outline-none"
          >
            {question}
          </h1>

          <div className="mt-8">
            {etape === "besoin" && (
              <>
                <ListeChoix choix={BESOINS} onChoisir={choisirBesoin} actif={besoin} />
                <button
                  type="button"
                  onClick={() =>
                    choisirBesoin({
                      valeur: "conseil",
                      label: "Je ne sais pas encore",
                      detail: "",
                      icone: Sparkles,
                    })
                  }
                  className="mx-auto mt-6 flex items-center gap-2 font-semibold text-brand-ink underline decoration-brand-ink/30 underline-offset-4"
                >
                  Je ne sais pas encore, conseillez-moi
                </button>
              </>
            )}

            {etape === "existant" && (
              <ListeChoix choix={EXISTANT} onChoisir={choisirExistant} actif={existant} />
            )}

            {etape === "clients" && (
              <ListeChoix
                choix={CLIENTS}
                onChoisir={(c) => choisirOffre("clients", c)}
                actif={CLIENTS.find((c) => c.offre === offreId)?.valeur}
              />
            )}

            {etape === "catalogue" && (
              <ListeChoix
                choix={CATALOGUE}
                onChoisir={(c) => choisirOffre("catalogue", c)}
                actif={offreId && CATALOGUE.find((c) => c.offre === offreId)?.valeur}
              />
            )}

            {etape === "demandes" && (
              <ListeChoix
                choix={DEMANDES}
                onChoisir={(c) => choisirOffre("demandes", c)}
                actif={DEMANDES.find((c) => c.offre === offreId)?.valeur}
              />
            )}

            {etape === "activite" && (
              <EcranActivite
                activite={activite}
                setActivite={setActivite}
                delai={delai}
                setDelai={setDelai}
                domaine={existant === "non" ? domaine : undefined}
                setDomaine={setDomaine}
                onSuivant={() => aller("coordonnees")}
              />
            )}

            {etape === "coordonnees" && (
              <EcranCoordonnees
                o={o}
                resume={resume}
                activite={activite}
                delai={delai}
                contact={contact}
                onEnvoye={(c) => {
                  setContact(c);
                  aller("resultat");
                }}
              />
            )}

            {etape === "resultat" && (
              <Resultat o={o} refonte={existant === "refaire"} contact={contact} />
            )}
          </div>
        </div>
      </main>

      <SiteFooter />
    </div>
  );
}

/* ---------------- Les choix d'un écran ---------------- */

function ListeChoix<C extends Choix<string>>({
  choix,
  onChoisir,
  actif,
}: {
  choix: C[];
  onChoisir: (c: C) => void;
  actif?: string;
}) {
  return (
    <ul className="grid gap-3">
      {choix.map((c) => (
        <li key={c.valeur}>
          <button
            type="button"
            onClick={() => onChoisir(c)}
            aria-pressed={actif === c.valeur}
            className={`group flex w-full items-center gap-4 rounded-2xl border bg-card p-4 text-left shadow-soft transition hover:border-brand-ink/40 hover:shadow-elevated sm:p-5 ${
              actif === c.valeur ? "border-brand-ink ring-2 ring-brand-ink/15" : "border-border"
            }`}
          >
            <span className="grid h-11 w-11 shrink-0 place-items-center rounded-xl bg-brand-ink/10 text-brand-ink">
              <c.icone className="h-5 w-5" />
            </span>
            <span className="min-w-0 flex-1">
              <span className="block text-[17px] font-semibold">{c.label}</span>
              <span className="mt-0.5 block text-[14px] text-muted-foreground">{c.detail}</span>
            </span>
            <ArrowRight className="h-4 w-4 shrink-0 text-muted-foreground transition group-hover:translate-x-0.5 group-hover:text-brand-ink" />
          </button>
        </li>
      ))}
    </ul>
  );
}

/* ---------------- Activité et délai ---------------- */

function EcranActivite({
  activite,
  setActivite,
  delai,
  setDelai,
  domaine,
  setDomaine,
  onSuivant,
}: {
  activite: string;
  setActivite: (v: string) => void;
  delai: string;
  setDelai: (v: string) => void;
  /** Défini quand le visiteur part de zéro : le vérificateur s'affiche. */
  domaine?: string;
  setDomaine: (v: string) => void;
  onSuivant: () => void;
}) {
  /* Les erreurs ne s'affichent qu'après un premier essai de « Continuer ». */
  const [essai, setEssai] = useState(false);
  const champActivite = useRef<HTMLInputElement>(null);
  const blocDelai = useRef<HTMLFieldSetElement>(null);
  const activiteManque = !activite.trim();
  const delaiManque = !delai;

  return (
    <form
      noValidate
      onSubmit={(e) => {
        e.preventDefault();
        if (activiteManque || delaiManque) {
          setEssai(true);
          if (activiteManque) champActivite.current?.focus();
          else blocDelai.current?.querySelector("button")?.focus();
          return;
        }
        onSuivant();
      }}
      className="rounded-[1.75rem] border border-border bg-card p-6 shadow-elevated sm:p-8"
    >
      <label htmlFor="projet-activite" className="font-semibold">
        Votre activité et votre commune <span className="text-red-ink">*</span>
      </label>
      <input
        ref={champActivite}
        id="projet-activite"
        value={activite}
        onChange={(e) => setActivite(e.target.value)}
        maxLength={150}
        required
        aria-invalid={essai && activiteManque}
        aria-describedby={essai && activiteManque ? "projet-activite-erreur" : undefined}
        placeholder="Fleuriste à Brétigny-sur-Orge"
        className={`mt-2 w-full rounded-lg border bg-background px-3.5 py-3 text-[16px] outline-none transition focus:border-accent focus:ring-2 focus:ring-accent/20 ${
          essai && activiteManque ? "border-red-ink" : "border-input"
        }`}
      />
      {essai && activiteManque && (
        <p id="projet-activite-erreur" className="mt-1.5 text-sm text-red-ink">
          Indiquez votre activité et votre commune.
        </p>
      )}

      {domaine !== undefined && (
        <div className="mt-7">
          <p className="font-semibold">
            Votre futur nom de domaine{" "}
            <span className="font-normal text-muted-foreground">(facultatif)</span>
          </p>
          <p className="mt-1 text-sm text-muted-foreground">
            Vérifiez qu'il est libre. Il est compris dans toutes nos offres de site.
          </p>
          <div className="mt-3">
            <VerificateurDomaine
              id="projet-domaine"
              valeurInitiale={domaine.split(" : ")[0]}
              onResultat={(r) => setDomaine(resumeDomaine(r))}
            />
          </div>
        </div>
      )}

      <fieldset
        ref={blocDelai}
        className="mt-7"
        aria-describedby={essai && delaiManque ? "projet-delai-erreur" : undefined}
      >
        <legend className="font-semibold">
          Pour quand ? <span className="text-red-ink">*</span>
        </legend>
        <div className="mt-3 flex flex-wrap gap-2">
          {DELAIS.map((d) => (
            <button
              key={d}
              type="button"
              onClick={() => setDelai(delai === d ? "" : d)}
              aria-pressed={delai === d}
              className={`rounded-full border px-4 py-2 text-sm font-semibold transition ${
                delai === d
                  ? "border-brand-ink bg-brand-ink text-white"
                  : "border-border bg-background hover:border-foreground/25"
              }`}
            >
              {d}
            </button>
          ))}
        </div>
        {essai && delaiManque && (
          <p id="projet-delai-erreur" className="mt-2 text-sm text-red-ink">
            Choisissez un délai.
          </p>
        )}
      </fieldset>

      <button type="submit" className="bouton mt-8 w-full px-6 py-3.5">
        Continuer
        <ArrowRight className="bouton-fleche h-4 w-4" />
      </button>
      <p className="mt-3 text-center text-xs text-muted-foreground">
        Rien n'est envoyé à cette étape.
      </p>
    </form>
  );
}

/* ---------------- Les coordonnées ---------------- */

interface Contact {
  prenom: string;
  nom: string;
  entreprise: string;
  email: string;
  phone: string;
  /** La fiche est partie chez Sitaly et l'offre chez le prospect. */
  envoye: boolean;
}

function EcranCoordonnees({
  o,
  resume,
  activite,
  delai,
  contact,
  onEnvoye,
}: {
  o?: Offre;
  resume: string[];
  activite: string;
  delai: string;
  contact?: Contact;
  onEnvoye: (c: Contact) => void;
}) {
  const [envoi, setEnvoi] = useState(false);

  async function envoyer(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const fd = new FormData(e.currentTarget);
    const get = (k: string) => String(fd.get(k) || "").trim();
    setEnvoi(true);
    const r = await envoyerDemande(
      {
        /* Le relais lit `questionnaire` et suit son propre circuit. `name`,
           `subject` et `message` servent au circuit général, si le relais en
           ligne ne connaît pas encore le questionnaire. */
        questionnaire: "mon-projet",
        prenom: get("prenom"),
        nom: get("nom"),
        entreprise: get("entreprise"),
        email: get("email"),
        phone: get("phone"),
        offre: o?.id ?? "",
        activite,
        delai,
        reponses: resume.join("\n"),
        name: `${get("prenom")} ${get("nom")}`,
        company: get("entreprise"),
        subject: `Questionnaire : ${o ? o.nom : "offre à définir"}`,
        message: [...resume, activite && `Activité : ${activite}`, delai && `Délai : ${delai}`]
          .filter(Boolean)
          .join("\n"),
        website: get("website"),
      },
      "questionnaire",
    );
    /* Même si l'envoi échoue, le visiteur voit son offre : Calendly, prérempli,
       garde une chance de le recontacter. */
    onEnvoye({
      prenom: get("prenom"),
      nom: get("nom"),
      entreprise: get("entreprise"),
      email: get("email"),
      phone: get("phone"),
      envoye: r === "envoye",
    });
  }

  return (
    <form
      onSubmit={envoyer}
      className="relative rounded-[1.75rem] border border-border bg-card p-6 shadow-elevated sm:p-8"
    >
      <p className="text-[15px] leading-relaxed text-muted-foreground">
        {o
          ? "Où vous l'envoyer ? Vous la recevez aussi par e-mail, avec le lien pour réserver un appel."
          : "Votre besoin demande qu'on en parle. Laissez vos coordonnées, vous recevez le lien pour réserver un appel."}
      </p>
      <div className="mt-5 grid gap-4 sm:grid-cols-2">
        <Champ
          nom="nom"
          pattern=".*\S.*"
          label="Nom"
          maxLength={60}
          autoComplete="family-name"
          valeur={contact?.nom}
        />
        <Champ
          nom="prenom"
          pattern=".*\S.*"
          label="Prénom"
          maxLength={60}
          autoComplete="given-name"
          valeur={contact?.prenom}
        />
        <Champ
          nom="entreprise"
          label="Entreprise"
          facultatif
          maxLength={120}
          autoComplete="organization"
          valeur={contact?.entreprise}
          large
        />
        <Champ
          nom="email"
          label="E-mail"
          type="email"
          maxLength={150}
          autoComplete="email"
          valeur={contact?.email}
        />
        <Champ
          nom="phone"
          label="Téléphone"
          type="tel"
          maxLength={30}
          pattern="[+0-9][0-9 .\(\)\-]{7,}"
          autoComplete="tel"
          valeur={contact?.phone}
        />
      </div>
      {/* Pot de miel : invisible pour un humain, rempli par les robots. */}
      <div aria-hidden="true" className="absolute -left-[9999px] h-0 w-0 overflow-hidden">
        <label htmlFor="projet-website">Ne pas remplir</label>
        <input id="projet-website" name="website" type="text" tabIndex={-1} autoComplete="off" />
      </div>
      <button
        type="submit"
        disabled={envoi}
        className="bouton mt-6 w-full px-6 py-3.5 disabled:opacity-70"
      >
        {envoi ? "Envoi…" : o ? "Voir mon offre" : "Envoyer"}
        <ArrowRight className="bouton-fleche h-4 w-4" />
      </button>
      <p className="mt-3 text-center text-xs text-muted-foreground">
        Vos coordonnées servent à vous envoyer cette offre et à préparer notre appel.{" "}
        <Link to="/politique-confidentialite/" className="underline underline-offset-2">
          Confidentialité
        </Link>
      </p>
    </form>
  );
}

function Champ({
  nom,
  label,
  type = "text",
  facultatif,
  large,
  valeur,
  ...attributs
}: {
  nom: string;
  label: string;
  type?: string;
  facultatif?: boolean;
  large?: boolean;
  valeur?: string;
  maxLength: number;
  autoComplete: string;
  pattern?: string;
}) {
  return (
    <div className={large ? "sm:col-span-2" : undefined}>
      <label htmlFor={`projet-${nom}`} className="text-sm font-medium">
        {label}{" "}
        {facultatif ? (
          <span className="font-normal text-muted-foreground">(facultatif)</span>
        ) : (
          <span className="text-red-ink">*</span>
        )}
      </label>
      <input
        id={`projet-${nom}`}
        name={nom}
        type={type}
        required={!facultatif}
        defaultValue={valeur}
        className="mt-1.5 w-full rounded-lg border border-input bg-background px-3.5 py-2.5 text-[16px] outline-none transition focus:border-accent focus:ring-2 focus:ring-accent/20"
        {...attributs}
      />
    </div>
  );
}

/* ---------------- Le résultat ---------------- */

function Resultat({ o, refonte, contact }: { o?: Offre; refonte: boolean; contact?: Contact }) {
  /* Calendly reprend le prénom et l'e-mail : le prospect n'a plus qu'à
     choisir son créneau. */
  const calendly = contact
    ? `${CALENDLY_URL}?${new URLSearchParams({ name: `${contact.prenom} ${contact.nom}`, email: contact.email })}`
    : CALENDLY_URL;

  return (
    <div className="space-y-6">
      {o && (
        <article className="on-ink relative overflow-hidden rounded-[2rem] bg-ink p-6 text-white shadow-elevated sm:p-8">
          <span
            aria-hidden="true"
            className="absolute inset-x-8 top-0 h-px bg-[image:var(--gradient-ruban)]"
          />
          <p className="rail-label text-white/60">L'offre qui vous correspond</p>
          <h2 className="mt-2 font-display text-[2rem] font-extrabold tracking-[-0.03em]">
            {o.nom}
          </h2>
          <p className="mt-1 leading-relaxed text-white/70">{o.pour}</p>
          <p className="mt-6 flex items-baseline gap-1.5">
            {o.aPartirDe && <span className="font-medium text-white/70">dès</span>}
            <span className="font-display text-[3rem] font-extrabold leading-none tracking-[-0.045em] tabular-nums">
              {euros(o.mensuel ?? o.depart)}
            </span>
            {o.mensuel !== undefined && <span className="font-medium text-white/70">/mois</span>}
          </p>
          <p className="mt-2 text-[15px] font-medium text-white/85">
            {o.mensuel === undefined
              ? `${o.departLibelle.replace(/^de /, "")}, puis un suivi mensuel chiffré dans le devis`
              : `+ ${o.aPartirDe ? "dès " : ""}${euros(o.depart)} ${o.departLibelle}`}
          </p>
          <ul className="mt-6 space-y-2.5 border-t border-white/10 pt-6 text-[15px]">
            {lignesIncluses(o).map((l) => (
              <li key={l} className="flex gap-3">
                <span className="mt-0.5 grid h-5 w-5 shrink-0 place-items-center rounded-full bg-signal/20 text-signal">
                  <Check className="h-3 w-3" />
                </span>
                <span className="text-white/90">{l}</span>
              </li>
            ))}
          </ul>
          {refonte && (
            <p className="mt-5 text-[15px] text-white/70">
              Pour une refonte, chaque ancienne adresse est redirigée : vous ne perdez rien sur
              Google.
            </p>
          )}
          <p className="mt-6 text-sm text-white/55">
            Sans engagement. {MENTION_TVA}.{" "}
            <Link
              to="/tarifs/"
              hash={GROUPES[o.groupe].ancre}
              className="font-semibold text-white underline decoration-white/30 underline-offset-4"
            >
              Comparer avec les autres offres
            </Link>
          </p>
        </article>
      )}

      {/* Un seul bouton : le rendez-vous. C'est le seul endroit du site, hors
          pages agents IA, où Calendly apparaît. */}
      <div className="rounded-[1.75rem] border border-border bg-card p-6 text-center shadow-elevated sm:p-8">
        {contact?.envoye && (
          <p className="mx-auto mb-6 flex max-w-md gap-2.5 rounded-xl bg-success/10 px-4 py-3 text-left text-sm text-foreground/85">
            <Check className="mt-0.5 h-4 w-4 shrink-0 text-success" />
            <span>
              {o ? "Une copie de cette offre part" : "Une copie de vos réponses part"} à{" "}
              <strong className="text-foreground">{contact.email}</strong>, pour la garder ou la
              transmettre. Rien reçu d'ici quelques minutes ? Regardez dans vos courriers
              indésirables.
            </span>
          </p>
        )}
        <h2 className="font-display text-xl font-bold">
          {o ? "Parlons-en 30 minutes" : "Parlons de votre besoin"}
        </h2>
        <p className="mx-auto mt-2 max-w-md text-[15px] leading-relaxed text-muted-foreground">
          {o
            ? "Choisissez votre créneau. Teddy vous appelle à l'heure dite, vos réponses sous les yeux, et vous confirmez l'offre avant toute signature."
            : "Choisissez votre créneau. Teddy vous appelle à l'heure dite et vous dit ce qui convient, et à quel prix, avant toute signature."}
        </p>
        <a
          href={calendly}
          target="_blank"
          rel="noopener noreferrer"
          onClick={() => suivreEvenement("questionnaire_calendly", { offre: o?.id ?? "aucune" })}
          className="bouton mt-6 w-full px-6 py-3.5 sm:w-auto"
        >
          <Calendar className="h-5 w-5" />
          Choisir mon créneau
        </a>
        <Link
          to="/realisations/"
          className="mt-5 flex items-center justify-center gap-2 text-sm font-semibold text-brand-ink"
        >
          Voir nos réalisations en attendant
          <ArrowRight className="h-4 w-4" />
        </Link>
      </div>
    </div>
  );
}
