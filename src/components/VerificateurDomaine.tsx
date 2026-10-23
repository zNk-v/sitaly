import { useRef, useState } from "react";
import { Check, HelpCircle, Search, X } from "lucide-react";
import {
  EXTENSIONS,
  disponibilite,
  nomDeDomaine,
  nomValide,
  type Disponibilite,
  type Extension,
  type ResultatDomaine,
} from "@/lib/domaine";

const BADGES: Record<Disponibilite, { label: string; icone: typeof Check; classe: string }> = {
  libre: { label: "Libre", icone: Check, classe: "bg-success/12 text-success" },
  pris: { label: "Déjà pris", icone: X, classe: "bg-foreground/8 text-muted-foreground" },
  inconnu: {
    label: "Non vérifié",
    icone: HelpCircle,
    classe: "bg-foreground/8 text-muted-foreground",
  },
};

/**
 * Le vérificateur de nom de domaine, sur /outils/verifier-nom-de-domaine/ et à
 * l'étape « activité » du questionnaire quand le visiteur part de zéro.
 *
 * Pas de <form> : dans le questionnaire, le vérificateur vit déjà dans un
 * formulaire. Entrée lance la vérification sans soumettre ce formulaire.
 */
export function VerificateurDomaine({
  id,
  valeurInitiale = "",
  onResultat,
}: {
  id: string;
  valeurInitiale?: string;
  onResultat?: (r: ResultatDomaine) => void;
}) {
  const [saisie, setSaisie] = useState(valeurInitiale);
  const [enCours, setEnCours] = useState(false);
  const [resultat, setResultat] = useState<ResultatDomaine>();
  const [erreur, setErreur] = useState("");
  const requete = useRef<AbortController>(undefined);

  const nom = nomDeDomaine(saisie);

  async function verifier() {
    if (!nom) return;
    if (!nomValide(nom)) {
      setErreur(
        "Ce nom ne peut pas être enregistré. Utilisez des lettres, des chiffres et des tirets.",
      );
      setResultat(undefined);
      return;
    }
    requete.current?.abort();
    const controle = new AbortController();
    requete.current = controle;
    setErreur("");
    setEnCours(true);
    const valeurs = await Promise.all(
      EXTENSIONS.map((e) => disponibilite(nom, e, controle.signal)),
    );
    if (controle.signal.aborted) return;
    const r: ResultatDomaine = {
      nom,
      extensions: Object.fromEntries(EXTENSIONS.map((e, i) => [e, valeurs[i]])) as Record<
        Extension,
        Disponibilite
      >,
    };
    setResultat(r);
    setEnCours(false);
    onResultat?.(r);
  }

  const tousPris = resultat && EXTENSIONS.every((e) => resultat.extensions[e] === "pris");

  return (
    <div>
      <label htmlFor={id} className="sr-only">
        Le nom de domaine à vérifier
      </label>
      <div className="flex flex-col gap-2 sm:flex-row">
        <div className="flex min-w-0 flex-1 items-center rounded-lg border border-input bg-background focus-within:border-accent focus-within:ring-2 focus-within:ring-accent/20">
          <span className="pl-3.5 text-[16px] text-muted-foreground">www.</span>
          <input
            id={id}
            value={saisie}
            onChange={(e) => setSaisie(e.target.value)}
            onKeyDown={(e) => {
              if (e.key === "Enter") {
                e.preventDefault();
                verifier();
              }
            }}
            maxLength={80}
            autoComplete="off"
            autoCapitalize="none"
            spellCheck={false}
            placeholder="boulangerie-dupont"
            className="min-w-0 flex-1 bg-transparent py-3 pr-3.5 text-[16px] outline-none"
          />
        </div>
        <button
          type="button"
          onClick={verifier}
          disabled={!nom || enCours}
          className="bouton-secondaire shrink-0 px-5 py-3 text-[15px] disabled:opacity-60"
        >
          <Search className="h-4 w-4" />
          {enCours ? "…" : "Vérifier"}
        </button>
      </div>

      {nom && nom !== saisie.trim().toLowerCase() && !resultat && (
        <p className="mt-2 text-sm text-muted-foreground">
          Nous vérifierons <strong className="text-foreground">{nom}</strong>
        </p>
      )}
      {erreur && (
        <p className="mt-2 text-sm text-red-ink" role="alert">
          {erreur}
        </p>
      )}

      <div aria-live="polite">
        {resultat && (
          <ul className="mt-4 divide-y divide-border rounded-xl border border-border bg-background">
            {EXTENSIONS.map((e) => {
              const b = BADGES[resultat.extensions[e]];
              return (
                <li key={e} className="flex items-center justify-between gap-3 px-4 py-3">
                  <span className="min-w-0 font-semibold break-all">
                    {resultat.nom}
                    <span className="text-brand-ink">.{e}</span>
                  </span>
                  <span
                    className={`inline-flex shrink-0 items-center gap-1.5 rounded-full px-3 py-1 text-sm font-semibold ${b.classe}`}
                  >
                    <b.icone className="h-3.5 w-3.5" />
                    {b.label}
                  </span>
                </li>
              );
            })}
          </ul>
        )}
        {tousPris && (
          <p className="mt-3 text-sm text-muted-foreground">
            Les deux sont pris. Ajoutez votre ville ou votre métier, par exemple{" "}
            <strong className="text-foreground">{resultat.nom}-bretigny</strong>.
          </p>
        )}
      </div>
    </div>
  );
}
