import { useEffect, useRef, useState, type FormEvent, type RefObject } from "react";
import { ArrowUp } from "lucide-react";

/**
 * Le fil de la bulle de discussion : les messages, les questions prêtes à
 * cliquer, et le champ de saisie. Rien que de l'affichage — les appels au
 * serveur sont dans BulleChat.tsx.
 *
 * La liste porte role="log" et aria-live="polite" : un lecteur d'écran annonce
 * chaque réponse sans voler le focus au champ.
 */

export type Ligne = {
  cle: string;
  auteur: "visiteur" | "ia" | "ted" | "site";
  texte: string;
  /** Sous le message : le bouton « Parler à Ted ». */
  offrirTed?: boolean;
};

export const QUESTIONS_PRETES = [
  "Combien ça coûte ?",
  "Qu'est-ce que la formule gratuite comprend ?",
  "Faut-il savoir faire un site ?",
];

const AUTEURS: Record<Ligne["auteur"], { etiquette: string | null; classe: string }> = {
  visiteur: { etiquette: null, classe: "ml-auto bg-black/85 text-white" },
  ia: { etiquette: null, classe: "bg-black/[0.04] text-black/80" },
  ted: { etiquette: "Ted, Sitaly", classe: "bg-violet-50 text-black/85 ring-1 ring-violet-200" },
  site: { etiquette: null, classe: "bg-black/[0.04] text-black/70" },
};

export const QUESTION_MAX = 500;

export function Fil({
  lignes,
  attente,
  desactive,
  surEnvoi,
  surParlerATed,
  premierChamp,
}: {
  lignes: Ligne[];
  attente: boolean;
  desactive: boolean;
  surEnvoi: (texte: string) => void;
  surParlerATed: () => void;
  premierChamp: RefObject<HTMLInputElement | null>;
}) {
  const [texte, setTexte] = useState("");
  const bas = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    bas.current?.scrollIntoView({ block: "end", behavior: "smooth" });
  }, [lignes, attente]);

  const envoyer = (valeur: string) => {
    const propre = valeur.trim().slice(0, QUESTION_MAX);
    if (!propre || attente || desactive) return;
    setTexte("");
    surEnvoi(propre);
  };

  const soumettre = (e: FormEvent) => {
    e.preventDefault();
    envoyer(texte);
  };

  const sansQuestion = lignes.every((l) => l.auteur !== "visiteur");

  return (
    <>
      <div
        role="log"
        aria-live="polite"
        aria-label="La discussion"
        className="min-h-0 flex-1 space-y-3 overflow-y-auto px-4 py-4"
      >
        {lignes.map((l) => (
          <div key={l.cle} className={l.auteur === "visiteur" ? "flex" : undefined}>
            {AUTEURS[l.auteur].etiquette && (
              <p className="mb-1 text-xs font-medium text-violet-700">
                {AUTEURS[l.auteur].etiquette}
              </p>
            )}
            <p
              className={`max-w-[85%] whitespace-pre-wrap rounded-2xl px-3.5 py-2.5 text-sm leading-relaxed ${AUTEURS[l.auteur].classe}`}
            >
              {l.texte}
            </p>
            {l.offrirTed && (
              <button
                type="button"
                onClick={surParlerATed}
                className="mt-2 inline-flex min-h-10 items-center rounded-xl bg-black/85 px-4 text-sm font-medium text-white transition hover:bg-black focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-black/30"
              >
                Parler à Ted
              </button>
            )}
          </div>
        ))}

        {attente && (
          <p className="text-sm text-black/45">
            Sitaly écrit<span className="motion-safe:animate-pulse">…</span>
          </p>
        )}

        {sansQuestion && !attente && (
          <ul className="space-y-2 pt-1">
            {QUESTIONS_PRETES.map((q) => (
              <li key={q}>
                <button
                  type="button"
                  onClick={() => envoyer(q)}
                  disabled={desactive}
                  className="w-full rounded-xl border border-black/10 px-3.5 py-2.5 text-left text-sm text-black/75 transition hover:bg-black/[0.03] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-black/20 disabled:opacity-50"
                >
                  {q}
                </button>
              </li>
            ))}
          </ul>
        )}
        <div ref={bas} />
      </div>

      <form
        onSubmit={soumettre}
        className="flex items-center gap-2 border-t border-black/[0.07] p-3"
      >
        <label className="min-w-0 flex-1">
          <span className="sr-only">Votre question</span>
          <input
            ref={premierChamp}
            value={texte}
            onChange={(e) => setTexte(e.target.value)}
            maxLength={QUESTION_MAX}
            disabled={desactive}
            placeholder="Écrivez votre question"
            autoComplete="off"
            className="w-full rounded-xl border border-black/10 bg-white px-3.5 py-2.5 text-base text-black sm:text-sm placeholder:text-black/40 focus:border-black/30 focus:outline-none disabled:bg-black/[0.03]"
          />
        </label>
        <button
          type="submit"
          aria-label="Envoyer la question"
          disabled={attente || desactive || !texte.trim()}
          className="grid h-10 w-10 shrink-0 place-items-center rounded-xl bg-black/85 text-white transition hover:bg-black focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-black/30 disabled:opacity-40"
        >
          <ArrowUp className="h-4 w-4" aria-hidden="true" />
        </button>
      </form>
    </>
  );
}
