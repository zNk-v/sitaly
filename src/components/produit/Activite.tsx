import { useEffect, useState, type ReactNode } from "react";
import { Link } from "@tanstack/react-router";
import { ArrowRight, Check, Play, Send, Sparkles, Star } from "lucide-react";
import { useVisible } from "@/components/produit/Vitrine";
import type { ProduitId } from "@/data/produits";

/**
 * Deux blocs de l'accueil ajoutés le 4 novembre 2026, avec la sortie du film
 * de lancement et des publicités Meta : le film lui-même, et la gestion de
 * l'activité (devis dictés, rendez-vous, agents IA, marque), que la publicité
 * promet et que l'accueil ne montrait pas. Données d'exemple, entreprises
 * inventées, comme le reste de la vitrine.
 */

export function FilmLancement() {
  return (
    <figure className="mx-auto max-w-5xl">
      <div className="overflow-hidden rounded-3xl bg-[#f5f5f7] shadow-[0_30px_80px_-30px_rgba(25,20,60,0.35)] ring-1 ring-black/[0.06]">
        <video
          className="block aspect-video w-full"
          src="/video/sitaly-film.mp4"
          poster="/video/sitaly-film.webp"
          controls
          playsInline
          preload="none"
          aria-label="Film de présentation de Sitaly, 55 secondes"
        />
      </div>
      <figcaption className="mt-4 flex items-center justify-center gap-2 text-sm text-black/55">
        <Play className="h-3.5 w-3.5" aria-hidden="true" /> Sitaly en 55 secondes, avec le son
      </figcaption>
    </figure>
  );
}

function Carte({
  id,
  titre,
  texte,
  large = false,
  children,
}: {
  id: ProduitId;
  titre: string;
  texte: string;
  large?: boolean;
  children: ReactNode;
}) {
  const { ref, classe } = useVisible<HTMLAnchorElement>(0.3);
  return (
    <Link
      ref={ref}
      to="/produits/$id/"
      params={{ id }}
      className={`${classe} ${large ? "md:col-span-2" : ""} group flex flex-col overflow-hidden rounded-3xl bg-black/[0.03] p-7 transition hover:bg-black/[0.05] sm:p-8`}
    >
      <div className="flex-1">{children}</div>
      <h3 className="mt-7 text-xl font-semibold tracking-tight">{titre}</h3>
      <p className="mt-1.5 leading-7 text-black/60">{texte}</p>
      <span className="mt-4 inline-flex items-center gap-1.5 text-sm font-semibold">
        En savoir plus{" "}
        <ArrowRight className="h-4 w-4 transition group-hover:translate-x-0.5" aria-hidden="true" />
      </span>
    </Link>
  );
}

const PASTILLE = "inline-flex items-center gap-1 rounded-full px-2.5 py-1 text-xs font-semibold";

export function GrilleActivite({ agentsDirect = false }: { agentsDirect?: boolean }) {
  return (
    <div className="rail-mobile grid gap-5 md:grid-cols-2">
      <Carte
        id="devis-et-factures"
        titre="Devis dicté, facture payée"
        texte="Dites votre devis à voix haute sur le chantier. Le client l'accepte en ligne, paie l'acompte par carte et reçoit une facture conforme."
      >
        <div className="space-y-2.5">
          <div className="flex items-center justify-between rounded-2xl bg-white p-4">
            <div>
              <div className="text-xs text-black/50">D-2026-0014 · Mme Lopez</div>
              <div className="text-2xl font-bold tracking-tight tabular-nums">2 850,00 €</div>
            </div>
            <span className={`${PASTILLE} bg-[#dcfce7] text-[#15803d]`}>Accepté</span>
          </div>
          <div className="flex items-center justify-between rounded-2xl bg-white p-4">
            <div className="text-sm">
              <div className="text-xs text-black/50">Acompte 30 % · carte bancaire</div>
              <div className="font-semibold">855,00 € encaissés</div>
            </div>
            <span className="grid h-8 w-8 place-items-center rounded-full bg-[#16a34a] text-white">
              <Check className="h-4 w-4" aria-hidden="true" />
            </span>
          </div>
        </div>
      </Carte>
      <Carte
        id="prise-de-rendez-vous"
        titre="Vos clients réservent seuls"
        texte="Vos prestations et vos horaires sur votre site. Chaque rendez-vous arrive par e-mail et dans votre liste de clients."
      >
        <div className="rounded-2xl bg-white p-4">
          <div className="text-sm font-semibold">Diagnostic à domicile · 1 h</div>
          <div className="text-xs text-black/50">Jeudi 5 novembre</div>
          <div className="mt-3 grid grid-cols-3 gap-1.5 text-center text-sm font-medium">
            {["9:00", "10:00", "11:30", "14:00", "15:30", "17:00"].map((h) => (
              <span
                key={h}
                className={`rounded-xl py-2 ${h === "10:00" ? "bg-black/85 text-white" : "bg-black/[0.04]"}`}
              >
                {h}
              </span>
            ))}
          </div>
          <div className="mt-3 rounded-xl bg-[#16a34a] py-2 text-center text-sm font-semibold text-white">
            Rendez-vous confirmé
          </div>
        </div>
      </Carte>
      <Carte
        id="agents-ia"
        titre="Des agents IA qui répondent"
        texte="Demandes du site, avis Google, articles de blog : la réponse est prête dans votre ton, vous la validez."
      >
        {agentsDirect ? (
          <AgentsEnDirect />
        ) : (
          <div className="space-y-2.5">
            <div className="rounded-2xl bg-white p-4 text-sm">
              <div className="flex items-center gap-2 text-xs text-black/50">
                Sophie B. · il y a 4 min{" "}
                <span className={`${PASTILLE} bg-[#fee2e2] text-[#b91c1c]`}>Urgent</span>
              </div>
              <p className="mt-1 text-black/75">
                Une fuite sous l'évier, vous pouvez passer aujourd'hui ?
              </p>
            </div>
            <div className="rounded-2xl bg-[#f5f3ff] p-4 text-sm">
              <div className="flex items-center gap-1.5 text-xs font-semibold text-[#6d28d9]">
                <Sparkles className="h-3.5 w-3.5" aria-hidden="true" /> Réponse prête
              </div>
              <p className="mt-1 text-black/80">
                Bonjour Sophie, je peux venir aujourd'hui entre 14 h et 16 h.
              </p>
            </div>
          </div>
        )}
      </Carte>
      <Carte
        id="identite-de-marque"
        titre="Votre marque, prête à servir"
        texte="Deux logos dessinés par l'IA, vos couleurs, votre police et l'aperçu de votre carte de visite."
      >
        <PlancheMarque />
      </Carte>
      <Carte
        id="avis-google"
        large
        titre="Plus d'avis Google, et une réponse à chacun"
        texte="Connectez votre fiche : chaque nouvel avis arrive le matin avec sa réponse prête, vous la publiez d'un clic. Le lendemain d'une facture payée, votre client reçoit la demande d'avis à votre nom."
      >
        <div className="grid gap-2.5 md:grid-cols-[1fr_1fr_auto]">
          <div className="rounded-2xl bg-white p-4 text-sm">
            <div className="flex items-center gap-2 text-xs text-black/50">
              <span className="inline-flex text-[#f5a623]" aria-label="5 étoiles sur 5">
                {Array.from({ length: 5 }, (_, i) => (
                  <Star key={i} className="h-3.5 w-3.5 fill-current" aria-hidden="true" />
                ))}
              </span>
              Claire M. · ce matin
            </div>
            <p className="mt-1 text-black/75">
              Intervention rapide et propre, le devis a été respecté. Je recommande.
            </p>
          </div>
          <div className="rounded-2xl bg-[#f0fdf4] p-4 text-sm">
            <div className="flex items-center gap-1.5 text-xs font-semibold text-[#15803d]">
              <Sparkles className="h-3.5 w-3.5" aria-hidden="true" /> Réponse prête
            </div>
            <p className="mt-1 text-black/80">
              Merci Claire, ravi que le chantier se soit bien passé. À bientôt !
            </p>
            <span className="mt-3 inline-flex items-center gap-1.5 rounded-full bg-black/85 px-3 py-1.5 text-xs font-semibold text-white">
              <Send className="h-3.5 w-3.5" aria-hidden="true" /> Publier sur Google
            </span>
          </div>
          <div className="flex items-center gap-4 rounded-2xl bg-white p-4 md:flex-col md:justify-center md:text-center">
            <div className="text-3xl font-bold tracking-tight tabular-nums">
              4,9<span className="text-base font-semibold text-black/45">/5</span>
            </div>
            <div className="text-xs text-black/50">
              37 avis
              <br />
              +6 ce mois-ci
            </div>
          </div>
        </div>
      </Carte>
    </div>
  );
}

/* ---------------------------------------------------------------------------
   « Votre marque, prête à servir » en planche de marque (25/11/2026) : les
   deux logos proposés, la carte de visite qui se redresse au survol, la
   palette et la police. Durand Plomberie est inventé, comme le reste.
   --------------------------------------------------------------------------- */

const MARINE = "#0a2540";
const BRIQUE = "#f4471c";
const PALETTE = [MARINE, BRIQUE, "#f6efe6", "#5b6b7c"];

/**
 * Le logo inventé de Durand Plomberie : une goutte brique traversée de deux
 * vagues, qui dessinent aussi un tuyau. `clair` pour les fonds marine.
 */
function GoutteDurand({ className = "", clair = false }: { className?: string; clair?: boolean }) {
  const fond = clair ? "#0a2540" : "#ffffff";
  return (
    <svg viewBox="0 0 40 40" className={className} aria-hidden="true">
      <path
        d="M20 3.5C20 3.5 7.5 17.2 7.5 25.6a12.5 12.5 0 0 0 25 0C32.5 17.2 20 3.5 20 3.5Z"
        fill={BRIQUE}
      />
      <path
        d="M12 25.2c2.7-2.4 5.3-2.4 8 0s5.3 2.4 8 0"
        fill="none"
        stroke={fond}
        strokeWidth="2.6"
        strokeLinecap="round"
      />
      <path
        d="M14.5 31c1.8-1.5 3.7-1.5 5.5 0s3.7 1.5 5.5 0"
        fill="none"
        stroke={fond}
        strokeWidth="2.2"
        strokeLinecap="round"
        opacity="0.7"
      />
      <path
        d="M15.4 16.5c1-1.9 2.2-3.6 3.3-5"
        fill="none"
        stroke="#ffffff"
        strokeWidth="2"
        strokeLinecap="round"
        opacity="0.55"
      />
    </svg>
  );
}

function PlancheMarque() {
  return (
    <div className="grid grid-cols-2 gap-2.5 sm:grid-cols-5">
      {/* Les deux logos proposés : côte à côte sur téléphone, l'un sur l'autre au-delà */}
      <div className="col-span-2 grid grid-cols-2 gap-2.5 sm:grid-cols-1 sm:grid-rows-2">
        <div className="relative flex items-center justify-center gap-1.5 rounded-2xl bg-white px-2 py-4 sm:gap-2 sm:px-3">
          <GoutteDurand className="h-8 w-8 shrink-0 sm:h-9 sm:w-9" />
          <span className="flex min-w-0 flex-col leading-none">
            <span
              className="text-[13px] font-extrabold tracking-tight sm:text-[15px]"
              style={{ color: MARINE }}
            >
              DURAND
            </span>
            <span
              className="mt-1 text-[7px] font-bold tracking-[0.22em] sm:text-[8px]"
              style={{ color: BRIQUE }}
            >
              PLOMBERIE
            </span>
          </span>
          <span className="absolute top-2 right-2 grid h-4 w-4 place-items-center rounded-full bg-black text-white">
            <Check className="h-2.5 w-2.5" aria-hidden="true" />
          </span>
        </div>
        <div
          className="flex flex-col items-center justify-center gap-1 rounded-2xl px-3 py-4 text-white"
          style={{ background: MARINE }}
        >
          <span
            className="grid h-10 w-10 place-items-center rounded-full border-[1.5px]"
            style={{ borderColor: `${BRIQUE}99` }}
          >
            <GoutteDurand className="h-6 w-6" clair />
          </span>
          <span className="text-[10px] font-bold tracking-[0.28em] text-white">DURAND</span>
          <span className="-mt-0.5 text-[7px] font-semibold tracking-[0.3em] text-white/55">
            DEPUIS 1998
          </span>
        </div>
      </div>

      {/* La carte de visite, puis la palette et la police */}
      <div className="col-span-2 flex min-w-0 flex-col gap-2.5 sm:col-span-3">
        <div
          className="flex min-h-28 flex-1 -rotate-2 flex-col justify-between rounded-2xl p-4 text-white shadow-[0_18px_30px_-18px_rgba(10,37,64,0.7)] transition-transform duration-500 ease-out group-hover:rotate-0"
          style={{ background: MARINE }}
        >
          <div className="flex items-center gap-2">
            <GoutteDurand className="h-6 w-6 shrink-0" clair />
            <span className="truncate text-sm font-bold">Durand Plomberie</span>
          </div>
          <div>
            <div className="truncate text-[11px] text-white/65">
              Plombier chauffagiste · Valmont
            </div>
            <div className="mt-0.5 text-xs font-medium text-white/90 tabular-nums">
              01 99 00 12 34
            </div>
          </div>
        </div>
        <div className="flex items-center justify-between gap-2 rounded-2xl bg-white px-3 py-2.5">
          <div className="flex -space-x-1.5">
            {PALETTE.map((c) => (
              <span
                key={c}
                className="h-6 w-6 rounded-full ring-2 ring-white"
                style={{ background: c }}
              />
            ))}
          </div>
          <span className="flex items-baseline gap-1.5 truncate">
            <span className="font-display text-xl leading-none font-bold" style={{ color: MARINE }}>
              Aa
            </span>
            <span className="hidden text-[11px] text-black/45 sm:inline">Jakarta</span>
          </span>
        </div>
      </div>
    </div>
  );
}

/* ---------------------------------------------------------------------------
   Les agents IA en direct (25/11/2026, inspiré de Vengeance UI « Agent Bento »
   et ReactBits « Animated List ») : les quatre agents avec leurs ronds de
   couleur, ceux de l'app, puis une demande qui arrive et sa réponse qui
   s'écrit. Exemples inventés, comme le reste de la vitrine.
   --------------------------------------------------------------------------- */

const AGENTS_IA = [
  { nom: "Demandes", teinte: "conic-gradient(from 200deg,#7c3aed,#f472b6,#fb923c,#7c3aed)" },
  { nom: "Avis Google", teinte: "conic-gradient(from 90deg,#16a34a,#facc15,#16a34a)" },
  { nom: "Blog", teinte: "conic-gradient(from 30deg,#f97316,#fde047,#f97316)" },
  { nom: "Assistant", teinte: "conic-gradient(from 0deg,#2563eb,#22d3ee,#a78bfa,#2563eb)" },
];

const ECHANGES = [
  {
    de: "Sophie B.",
    urgent: true,
    texte: "Une fuite sous l'évier, vous pouvez passer aujourd'hui ?",
    reponse: "Bonjour Sophie, je peux venir aujourd'hui entre 14 h et 16 h.",
  },
  {
    de: "Marc P.",
    urgent: false,
    texte: "Combien pour refaire une salle de bain ?",
    reponse: "Bonjour Marc, je passe la mesurer jeudi et je vous envoie le devis le soir même.",
  },
  {
    de: "Avis Google · Claire M.",
    urgent: false,
    texte: "Intervention rapide et propre, je recommande.",
    reponse: "Merci Claire, ravi que le chantier se soit bien passé !",
  },
  {
    de: "Julie R.",
    urgent: false,
    texte: "Vous intervenez le samedi matin ?",
    reponse: "Bonjour Julie, oui, le samedi de 8 h à 12 h.",
  },
];

function AgentsEnDirect() {
  const [k, setK] = useState(0);
  const [tape, setTape] = useState(ECHANGES[0].reponse.length);
  useEffect(() => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    const reponse = ECHANGES[k].reponse;
    setTape(0);
    let n = 0;
    let frappe: ReturnType<typeof setInterval> | undefined;
    let suivant: ReturnType<typeof setTimeout> | undefined;
    // La réponse s'écrit après un temps de « lecture », puis l'échange suivant arrive.
    const debut = setTimeout(() => {
      frappe = setInterval(() => {
        n += 2;
        setTape(n);
        if (n >= reponse.length) {
          clearInterval(frappe);
          suivant = setTimeout(() => setK((x) => (x + 1) % ECHANGES.length), 2200);
        }
      }, 30);
    }, 900);
    return () => {
      clearTimeout(debut);
      clearInterval(frappe);
      clearTimeout(suivant);
    };
  }, [k]);
  const e = ECHANGES[k];
  return (
    <div>
      <div className="flex flex-wrap gap-1.5">
        {AGENTS_IA.map((a, i) => (
          <span
            key={a.nom}
            className={`inline-flex items-center gap-1.5 rounded-full bg-white px-2.5 py-1 text-xs font-medium transition ${(k === 2 ? 1 : 0) === i ? "text-black ring-1 ring-black/10" : "text-black/55"}`}
          >
            <span
              aria-hidden="true"
              className="h-3.5 w-3.5 rounded-full"
              style={{ background: a.teinte }}
            />
            {a.nom}
          </span>
        ))}
      </div>
      <div key={k} className="echange-direct mt-3 h-[178px] space-y-2.5" aria-hidden="true">
        <div className="rounded-2xl bg-white p-4 text-sm">
          <div className="flex items-center gap-2 text-xs text-black/50">
            {e.de} · à l'instant
            {e.urgent && <span className={`${PASTILLE} bg-[#fee2e2] text-[#b91c1c]`}>Urgent</span>}
          </div>
          <p className="mt-1 text-black/75">{e.texte}</p>
        </div>
        <div className="rounded-2xl bg-[#f5f3ff] p-4 text-sm">
          <div className="flex items-center gap-1.5 text-xs font-semibold text-[#6d28d9]">
            <Sparkles className="h-3.5 w-3.5" aria-hidden="true" />
            {tape < e.reponse.length ? "L'agent écrit…" : "Réponse prête"}
          </div>
          <p className="mt-1 min-h-10 text-black/80">{e.reponse.slice(0, tape)}</p>
        </div>
      </div>
      {/* Pour les lecteurs d'écran : un échange fixe, lisible d'un trait. */}
      <p className="sr-only">
        Exemple : {ECHANGES[0].de} écrit « {ECHANGES[0].texte} » ; l'agent prépare la réponse «{" "}
        {ECHANGES[0].reponse} ».
      </p>
    </div>
  );
}
