import { Clock, Star, UserRound } from "lucide-react";
import { NOTE_GOOGLE } from "@/data/avis-google";
import { Compteur, Pastille } from "@/components/accueil/communs";

/**
 * « La recherche s'est transformée » chez la référence : une phrase de
 * contexte, puis trois chiffres qui comptent à l'entrée. La section remonte
 * sur le premier écran, coins arrondis, comme une feuille posée dessus.
 *
 * Trois chiffres que n'importe qui peut vérifier, aucun chiffre de marché.
 */
export function Constat() {
  const note = Number(NOTE_GOOGLE.note.replace(",", "."));
  const chiffres = [
    {
      pastille: "Du diagnostic au pilotage",
      icone: UserRound,
      valeur: 1,
      decimales: 0,
      suffixe: "interlocuteur",
      texte: (
        <>
          Teddy fait le diagnostic, installe vos outils et les pilote chaque mois.{" "}
          <strong className="font-semibold text-foreground">
            Ni commercial à l'appel découverte, ni sous-traitant
          </strong>{" "}
          sur le projet.
        </>
      ),
    },
    {
      pastille: "Le diagnostic, offert",
      icone: Clock,
      valeur: 30,
      decimales: 0,
      suffixe: "min",
      texte: (
        <>
          Au téléphone. À la fin de l'appel, vous savez{" "}
          <strong className="font-semibold text-foreground">
            si un agent IA vaut le coup chez vous
          </strong>
          , et pour quelle tâche.
        </>
      ),
    },
    {
      pastille: "Notre note Google",
      icone: Star,
      valeur: note,
      decimales: 1,
      suffixe: "/5",
      texte: (
        <>
          <strong className="font-semibold text-foreground">
            {NOTE_GOOGLE.nombre} avis publics sur notre fiche Google
          </strong>
          , que vous pouvez lire avant d'appeler.
        </>
      ),
    },
  ];

  return (
    <section className="relative z-10 -mt-10 rounded-t-[2.5rem] bg-gradient-to-b from-paper-sunk via-paper to-paper py-20 sm:py-28">
      <div className="mx-auto max-w-7xl px-4 sm:px-6">
        <div data-reveal className="mx-auto max-w-2xl text-center">
          <h2 data-split className="display-section">
            Vos clients <span className="accent-word">n'attendent plus</span>
          </h2>
          <p className="mt-5 text-lg text-muted-foreground">
            Hier, un client qui tombait sur la messagerie rappelait plus tard. Aujourd'hui, il
            appelle l'entreprise suivante. Et avant d'appeler, il a souvent demandé conseil à
            ChatGPT.
          </p>
        </div>

        <div className="stagger mt-14 grid gap-4 md:grid-cols-3 lg:gap-5">
          {chiffres.map((c, i) => (
            <div
              key={c.pastille}
              data-reveal
              style={{ "--i": i } as React.CSSProperties}
              className="flex flex-col rounded-[1.75rem] border border-border bg-card p-7 shadow-soft sm:p-8"
            >
              <Pastille icone={c.icone} className="self-start bg-paper-sunk">
                {c.pastille}
              </Pastille>
              <p className="mt-10 flex items-start font-display text-[clamp(3.5rem,6vw,5rem)] font-extrabold leading-none tracking-[-0.05em]">
                <Compteur
                  valeur={c.valeur}
                  decimales={c.decimales}
                  className="brand-gradient-text"
                />
                <span className="mt-1 ml-1.5 text-[0.3em] font-bold tracking-tight text-muted-foreground">
                  {c.suffixe}
                </span>
              </p>
              <p className="mt-10 leading-relaxed text-muted-foreground">{c.texte}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
