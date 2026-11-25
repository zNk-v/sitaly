import { useEffect, useLayoutEffect, useRef, useState } from "react";
import { CalendarCheck, Inbox, ReceiptText, Star } from "lucide-react";
import { NOTE_GOOGLE } from "@/data/avis-google";
import { PRIX_APPEL } from "@/data/offres";

/**
 * Trois effets pour l'accueil (25/11/2026), tirés des sites d'inspiration que
 * Teddy a envoyés (ReactBits, Skiper UI, Vengeance UI) :
 * - un métier qui change dans le titre (MotTournant) ;
 * - des notifications de l'app qui s'ouvrent en direct (IleDynamique) ;
 * - trois chiffres qui comptent jusqu'à leur valeur (ChiffresQuiComptent).
 *
 * Validés et mis en ligne le 25/11/2026 (EFFETS_EN_LIGNE). En local, un
 * panneau les allume et les éteint un par un pour comparer (PanneauEffets).
 */

export type Effets = {
  mot: boolean;
  ile: boolean;
  chiffres: boolean;
  bento: boolean;
  agents: boolean;
  prix: boolean;
  familles: boolean;
  retouches: boolean;
  tarifs: boolean;
};

/** Ce qui s'affiche en ligne : les trois validés par Teddy le 25/11/2026. */
export const EFFETS_EN_LIGNE: Effets = {
  mot: true,
  ile: true,
  chiffres: true,
  // Sections, validées par Teddy le 25/11/2026.
  bento: true,
  agents: true,
  prix: true,
  familles: true,
  retouches: true,
  // Tarifs compacts, validés par Teddy le 25/11/2026.
  tarifs: true,
};

/** En local, tout est allumé tant qu'on n'a rien décoché. */
const TOUT_ALLUME: Effets = {
  familles: true,
  retouches: true,
  tarifs: true,
  mot: true,
  ile: true,
  chiffres: true,
  bento: true,
  agents: true,
  prix: true,
};

const CLE = "sitaly-effets-accueil";

/** Pour qui a demandé moins d'animations, tout reste immobile. */
function mouvementReduit() {
  return (
    typeof window !== "undefined" && window.matchMedia("(prefers-reduced-motion: reduce)").matches
  );
}

export function useEffets(): [Effets, (e: Effets) => void] {
  const [effets, setEffets] = useState<Effets>(EFFETS_EN_LIGNE);
  useEffect(() => {
    if (!import.meta.env.DEV) return;
    const garde = window.localStorage.getItem(CLE);
    setEffets(garde ? { ...TOUT_ALLUME, ...JSON.parse(garde) } : TOUT_ALLUME);
  }, []);
  const changer = (e: Effets) => {
    setEffets(e);
    window.localStorage.setItem(CLE, JSON.stringify(e));
  };
  return [effets, changer];
}

export function PanneauEffets({
  effets,
  changer,
}: {
  effets: Effets;
  changer: (e: Effets) => void;
}) {
  if (!import.meta.env.DEV) return null;
  const lignes: [keyof Effets, string][] = [
    ["mot", "1. Métier qui change dans le titre"],
    ["ile", "2. Notifications en direct"],
    ["chiffres", "3. Chiffres qui comptent"],
    ["bento", "4. Fonctionnalités en bento"],
    ["agents", "5. Agents IA en direct"],
    ["prix", "6. Prix qui glisse (tarifs)"],
    ["familles", "7. Activités en mosaïque photo"],
    ["retouches", "8. Démo Retouches spectaculaire"],
    ["tarifs", "9. Tarifs compacts, Essentiel en sombre"],
  ];
  return (
    <div className="fixed top-28 right-4 z-[80] w-64 rounded-2xl bg-white p-3 text-[13px] text-black shadow-[0_12px_40px_-12px_rgba(0,0,0,0.35)] ring-1 ring-black/10">
      <p className="mb-2 font-semibold">Effets à essayer (local)</p>
      {lignes.map(([cle, nom]) => (
        <label
          key={cle}
          className="flex cursor-pointer items-center gap-2 rounded-lg px-2 py-1.5 hover:bg-black/[0.04]"
        >
          <input
            type="checkbox"
            checked={effets[cle]}
            onChange={(ev) => changer({ ...effets, [cle]: ev.target.checked })}
            className="h-4 w-4 accent-[#7429c3]"
          />
          {nom}
        </label>
      ))}
    </div>
  );
}

/* ---------------------------------------------------------------------------
   1. Le métier qui change dans le titre
   --------------------------------------------------------------------------- */

/* Des métiers qui commencent par une consonne : « Votre site de … » ne
   s'élide pas (« de ostéopathe », « de électricien » sont faux). */
const METIERS = ["plombier", "fleuriste", "coiffeuse", "couvreur", "boulanger", "paysagiste"];

/**
 * « Votre site de plombier », puis fleuriste, puis coiffeuse… Le mot sort
 * vers le haut et le suivant monte de dessous, en violet. Les lecteurs d'écran
 * et Google lisent une phrase fixe (TitreTournant).
 */
function MotTournant({ suffixe = "" }: { suffixe?: string }) {
  const [k, setK] = useState(0);
  const avant = (k + METIERS.length - 1) % METIERS.length;
  const mots = useRef<(HTMLSpanElement | null)[]>([]);
  const [largeurs, setLargeurs] = useState<number[]>([]);
  useEffect(() => {
    if (mouvementReduit()) return;
    const t = setInterval(() => setK((x) => (x + 1) % METIERS.length), 2200);
    return () => clearInterval(t);
  }, []);
  // La zone prend la largeur du mot affiché : pas de trou devant un métier
  // court. Mesurée une fois la police chargée, et à chaque changement de taille.
  useLayoutEffect(() => {
    const mesurer = () => setLargeurs(mots.current.map((m) => m?.offsetWidth ?? 0));
    mesurer();
    document.fonts?.ready.then(mesurer);
    window.addEventListener("resize", mesurer);
    return () => window.removeEventListener("resize", mesurer);
  }, []);
  return (
    <span
      className="mot-tournant-zone relative inline-block h-[1.05em] overflow-hidden align-bottom"
      style={{ width: largeurs[k] ? `${largeurs[k]}px` : undefined }}
      aria-hidden="true"
    >
      {/* Sans mesure (premier rendu), le mot courant tient la place. */}
      {!largeurs[k] && <span className="invisible">{METIERS[k] + suffixe}</span>}
      {METIERS.map((m, i) => (
        <span
          key={m}
          ref={(el) => {
            mots.current[i] = el;
          }}
          className={`mot-tournant absolute top-0 left-0 whitespace-nowrap text-violet ${i === k ? "mot-tournant--la" : i === avant ? "mot-tournant--part" : ""}`}
        >
          {m}
          <span className="text-[#09090b]">{suffixe}</span>
        </span>
      ))}
    </span>
  );
}

export function TitreTournant() {
  return (
    <>
      <span className="sr-only">Votre site internet, créé par l'IA en une minute</span>
      <span aria-hidden="true" className="block">
        Votre site de <MotTournant suffixe="," />
      </span>
      <span aria-hidden="true" className="block">
        créé par l'IA en une minute
      </span>
    </>
  );
}

/* ---------------------------------------------------------------------------
   2. Les notifications en direct (« Dynamic Island »)
   --------------------------------------------------------------------------- */

/** Des exemples de ce que l'app annonce à l'artisan : ce ne sont pas de vrais clients. */
const NOTIFS = [
  { icone: Inbox, titre: "Nouvelle demande", texte: "Marc, un devis pour sa salle de bain" },
  { icone: ReceiptText, titre: "Devis accepté", texte: "Mme Lopez, 2 850 €, acompte payé" },
  { icone: Star, titre: "Nouvel avis Google", texte: "Claire, 5 étoiles" },
  { icone: CalendarCheck, titre: "Rendez-vous réservé", texte: "Demain à 10 h, diagnostic" },
];

/**
 * Une pastille noire, à la façon de l'îlot de l'iPhone : elle s'ouvre sur une
 * notification de l'app, se referme, puis s'ouvre sur la suivante. Sa largeur
 * suit son contenu (mesuré), pour que l'ouverture glisse au lieu de sauter.
 */
export function IleDynamique() {
  const [k, setK] = useState(0);
  const [ouverte, setOuverte] = useState(true);
  const [largeur, setLargeur] = useState<number | null>(null);
  const contenu = useRef<HTMLDivElement>(null);
  const reduit = useRef(false);

  useEffect(() => {
    reduit.current = mouvementReduit();
    if (reduit.current) return;
    let t: ReturnType<typeof setTimeout>;
    const cycle = (ouvre: boolean) => {
      if (ouvre) {
        setOuverte(true);
        t = setTimeout(() => cycle(false), 3200);
      } else {
        setOuverte(false);
        t = setTimeout(() => {
          setK((x) => (x + 1) % NOTIFS.length);
          cycle(true);
        }, 900);
      }
    };
    t = setTimeout(() => cycle(false), 3200);
    return () => clearTimeout(t);
  }, []);

  useLayoutEffect(() => {
    if (contenu.current) setLargeur(contenu.current.scrollWidth);
  }, [k, ouverte]);

  const n = NOTIFS[k];
  const Icone = n.icone;
  return (
    <div className="mb-7 flex justify-center" aria-hidden="true">
      <div
        className="ile-dynamique flex h-11 items-center overflow-hidden rounded-full bg-[#09090b] text-white"
        style={{ width: ouverte ? (largeur ?? undefined) : 132 }}
      >
        <div
          ref={contenu}
          className="flex items-center gap-2.5 py-1.5 pr-4 pl-1.5 whitespace-nowrap"
        >
          <span className="grid h-8 w-8 shrink-0 place-items-center rounded-full bg-violet">
            <Icone className="h-4 w-4" />
          </span>
          <span
            className={`flex items-baseline gap-2 text-[13px] transition-opacity duration-300 ${ouverte ? "opacity-100" : "opacity-0"}`}
          >
            <span className="font-semibold">{n.titre}</span>
            <span className="hidden text-white/60 sm:inline">{n.texte}</span>
          </span>
        </div>
      </div>
    </div>
  );
}

/* ---------------------------------------------------------------------------
   3. Les chiffres qui comptent
   --------------------------------------------------------------------------- */

function Compteur({
  vers,
  decimales = 0,
  avant = "",
  apres = "",
}: {
  vers: number;
  decimales?: number;
  avant?: string;
  apres?: string;
}) {
  const ref = useRef<HTMLSpanElement>(null);
  const [valeur, setValeur] = useState(vers);
  useEffect(() => {
    const el = ref.current;
    if (!el || mouvementReduit()) return;
    setValeur(0);
    let rafId = 0;
    const obs = new IntersectionObserver(
      ([e]) => {
        if (!e.isIntersecting) return;
        obs.disconnect();
        const debut = performance.now();
        const pas = (t: number) => {
          const p = Math.min((t - debut) / 1200, 1);
          const doux = 1 - Math.pow(1 - p, 3);
          setValeur(vers * doux);
          if (p < 1) rafId = requestAnimationFrame(pas);
        };
        rafId = requestAnimationFrame(pas);
      },
      { threshold: 0.6 },
    );
    obs.observe(el);
    return () => {
      obs.disconnect();
      cancelAnimationFrame(rafId);
    };
  }, [vers]);
  const texte = valeur.toFixed(decimales).replace(".", ",");
  return (
    <span ref={ref} className="tabular-nums">
      {avant}
      {texte}
      {apres}
    </span>
  );
}

/**
 * Trois chiffres vérifiables, sous le hero : le délai, la note Google (lue
 * dans src/data/avis-google.ts) et le prix d'appel (src/data/offres.ts).
 */
export function ChiffresQuiComptent() {
  const note = Number(NOTE_GOOGLE.note.replace(",", "."));
  const chiffres = [
    { valeur: <Compteur vers={1} apres=" min" />, legende: "pour voir votre site" },
    { valeur: <Compteur vers={note} decimales={1} apres="/5" />, legende: "sur Google" },
    {
      valeur: <Compteur vers={PRIX_APPEL.mensuel} apres=" €" />,
      legende: `par mois, les ${PRIX_APPEL.mois} premiers mois`,
    },
  ];
  return (
    <section aria-label="Sitaly en chiffres" className="px-4 pb-6 sm:px-6">
      <dl className="mx-auto grid max-w-3xl grid-cols-3 gap-4 text-center">
        {chiffres.map((c) => (
          <div key={c.legende} className="flex flex-col-reverse">
            <dt className="mt-1.5 text-[13px] leading-snug text-black/55 sm:text-sm">
              {c.legende}
            </dt>
            <dd className="titre-produit text-3xl sm:text-5xl">{c.valeur}</dd>
          </div>
        ))}
      </dl>
    </section>
  );
}
