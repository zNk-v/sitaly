import { Clock, Star, UserRound } from "lucide-react";
import { NOTE_GOOGLE } from "@/data/avis-google";
import { Compteur, Pastille } from "@/components/accueil/communs";

/**
 * « La recherche s'est transformée » chez la référence : une phrase de
 * contexte, puis trois chiffres qui comptent à l'entrée. Depuis le recentrage
 * du 18 octobre 2026, la section suit les rangées des formats (Detail), qui
 * remontent à sa place sur le premier écran.
 *
 * Trois chiffres que n'importe qui peut vérifier, aucun chiffre de marché.
 */
export function Constat() {
  const note = Number(NOTE_GOOGLE.note.replace(",", "."));
  const chiffres = [
    {
      pastille: "Mise en ligne",
      icone: Clock,
      valeur: 48,
      decimales: 0,
      suffixe: "h",
      texte: (
        <>
          Entre l'appel découverte et le site en ligne, une fois vos photos et vos informations
          réunies.{" "}
          <strong className="font-semibold text-foreground">
            Les textes sont écrits pour vous.
          </strong>
        </>
      ),
    },
    {
      pastille: "De la maquette au suivi",
      icone: UserRound,
      valeur: 1,
      decimales: 0,
      suffixe: "interlocuteur",
      texte: (
        <>
          Teddy conçoit votre site, le met en ligne et le tient à jour chaque mois.{" "}
          <strong className="font-semibold text-foreground">
            Ni commercial à l'appel découverte, ni sous-traitant
          </strong>{" "}
          sur le projet.
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
    <section className="bg-paper-sunk pt-14 pb-16 sm:pt-16 sm:pb-20">
      <div className="mx-auto max-w-7xl px-4 sm:px-6">
        <div data-reveal className="mx-auto max-w-2xl text-center">
          <h2 data-split className="display-section">
            Vos clients vous cherchent <span className="accent-word">avant de vous appeler</span>
          </h2>
          <p className="mt-5 text-lg text-muted-foreground">
            Ils tapent votre métier et leur ville, regardent vos photos, lisent vos avis, ou
            demandent conseil à ChatGPT. Ce qu'ils trouvent décide s'ils vous contactent, vous ou le
            suivant.
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
