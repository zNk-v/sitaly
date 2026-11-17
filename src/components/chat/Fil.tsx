import { useEffect, useRef, useState, type FormEvent, type RefObject } from "react";
import { ArrowUp } from "lucide-react";
import { AvatarSitaly, AvatarTed, DEGRADE } from "@/components/chat/elements";

/**
 * Le fil de la conversation : les messages, les questions prêtes à cliquer,
 * et le champ de saisie. Rien que de l'affichage : les appels au serveur sont
 * dans BulleChat.tsx.
 *
 * La liste porte role="log" et aria-live="polite" : un lecteur d'écran annonce
 * chaque réponse sans voler le focus au champ.
 */

export type Ligne = {
  cle: string;
  auteur: "visiteur" | "ia" | "ted" | "site";
  texte: string;
  /** L'heure d'arrivée, pour la liste de l'onglet Messages. */
  le: number;
  /** Sous le message : le bouton « Parler à Ted ». */
  offrirTed?: boolean;
};

export const QUESTIONS_PRETES = [
  "Combien ça coûte ?",
  "Qu'est-ce que la formule gratuite comprend ?",
  "Faut-il savoir faire un site ?",
];

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
        className="min-h-0 flex-1 space-y-3 overflow-y-auto overscroll-contain bg-white px-4 py-4"
      >
        {lignes.map((l, i) => {
          if (l.auteur === "visiteur")
            return (
              <div key={l.cle} className="flex justify-end">
                <p
                  className={`max-w-[80%] whitespace-pre-wrap rounded-[20px] rounded-br-md px-3.5 py-2.5 text-sm leading-relaxed text-white ${DEGRADE}`}
                >
                  {l.texte}
                </p>
              </div>
            );
          // Un seul visage par suite de messages du même auteur, sous le dernier.
          const suivant = lignes[i + 1];
          const dernierDeSuite = !suivant || suivant.auteur !== l.auteur;
          const ted = l.auteur === "ted";
          return (
            <div key={l.cle} className="flex items-end gap-2">
              <span className="w-7 shrink-0">
                {dernierDeSuite && (ted ? <AvatarTed taille={28} /> : <AvatarSitaly taille={28} />)}
              </span>
              <div className="min-w-0 max-w-[82%]">
                {ted && <p className="mb-1 text-xs font-medium text-[#7014c2]">Ted, Sitaly</p>}
                <p
                  className={`whitespace-pre-wrap rounded-[20px] rounded-bl-md px-3.5 py-2.5 text-sm leading-relaxed text-black/85 ${
                    ted ? "bg-violet-50 ring-1 ring-violet-200" : "bg-[#f3f0f9]"
                  }`}
                >
                  {l.texte}
                </p>
                {l.offrirTed && (
                  <button
                    type="button"
                    onClick={surParlerATed}
                    className={`mt-2 inline-flex min-h-10 items-center gap-2 rounded-full py-1 pl-1 pr-4 text-sm font-semibold text-white shadow-sm transition hover:opacity-90 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#7014c2]/40 ${DEGRADE}`}
                  >
                    <AvatarTed taille={30} />
                    Parler à Ted
                  </button>
                )}
              </div>
            </div>
          );
        })}

        {attente && (
          <div className="flex items-end gap-2" aria-label="Sitaly écrit">
            <AvatarSitaly taille={28} />
            <span className="flex gap-1 rounded-[20px] rounded-bl-md bg-[#f3f0f9] px-4 py-3.5">
              {[0, 150, 300].map((d) => (
                <span
                  key={d}
                  className="h-1.5 w-1.5 rounded-full bg-[#7014c2]/50 motion-safe:animate-bounce"
                  style={{ animationDelay: `${d}ms` }}
                />
              ))}
            </span>
          </div>
        )}

        {sansQuestion && !attente && (
          <div className="flex flex-wrap justify-end gap-2 pt-1">
            {QUESTIONS_PRETES.map((q) => (
              <button
                key={q}
                type="button"
                onClick={() => envoyer(q)}
                disabled={desactive}
                className="rounded-full border border-[#7014c2]/30 bg-white px-3.5 py-2 text-left text-sm font-medium text-[#5d2dc4] transition hover:border-[#7014c2]/60 hover:bg-[#f7f5fb] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#7014c2]/30 disabled:opacity-50"
              >
                {q}
              </button>
            ))}
          </div>
        )}
        <div ref={bas} />
      </div>

      <form onSubmit={soumettre} className="border-t border-black/[0.06] bg-white p-3">
        <div className="flex items-center gap-2 rounded-2xl border border-black/10 bg-white py-1 pl-3.5 pr-1 transition focus-within:border-[#7014c2]/50 focus-within:ring-2 focus-within:ring-[#7014c2]/15">
          <label className="min-w-0 flex-1">
            <span className="sr-only">Votre question</span>
            <input
              ref={premierChamp}
              value={texte}
              onChange={(e) => setTexte(e.target.value)}
              maxLength={QUESTION_MAX}
              disabled={desactive}
              placeholder="Écrivez votre message…"
              autoComplete="off"
              enterKeyHint="send"
              className="w-full border-0 bg-transparent py-2 text-base text-black placeholder:text-black/40 focus:outline-none disabled:opacity-50 sm:text-sm"
            />
          </label>
          <button
            type="submit"
            aria-label="Envoyer la question"
            disabled={attente || desactive || !texte.trim()}
            className={`grid h-9 w-9 shrink-0 place-items-center rounded-xl text-white transition hover:opacity-90 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#7014c2]/40 disabled:opacity-30 ${DEGRADE}`}
          >
            <ArrowUp className="h-4 w-4" aria-hidden="true" />
          </button>
        </div>
      </form>
    </>
  );
}
