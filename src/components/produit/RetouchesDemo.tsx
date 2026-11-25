import { useEffect, useState } from "react";
import { ArrowUp, Sparkles, Undo2 } from "lucide-react";
import { photo, useVisible } from "@/components/produit/Vitrine";

/**
 * « Votre site change quand vous lui parlez », en démo d'éditeur (25/11/2026).
 * À gauche, l'artisan tape sa demande dans la barre, l'envoie, l'IA répond.
 * À droite, son site se transforme sous nos yeux : une photo arrive, le titre
 * se réécrit, les tarifs s'ouvrent, le thème bascule, puis tout passe en
 * anglais. Chaque zone modifiée s'entoure de violet avec « Modifié ».
 * Studio Lune est inventé, comme le reste de la vitrine.
 */

type Zone = "hero" | "titre" | "tarifs" | "site";
type Etat = { photo: boolean; titre: boolean; tarifs: boolean; doux: boolean; anglais: boolean };

const ETAPES: { demande: string; reponse: string; change: Partial<Etat>; zone: Zone }[] = [
  {
    demande: "Mets une photo de mon salon en haut.",
    reponse: "C'est fait : votre salon en grand, le titre posé dessus.",
    change: { photo: true },
    zone: "hero",
  },
  {
    demande: "Un titre plus chaleureux ?",
    reponse: "Voici : « Prenez soin de vous, on s'occupe du reste ».",
    change: { titre: true },
    zone: "titre",
  },
  {
    demande: "Ajoute mes tarifs : coupe 38 €, couleur 55 €.",
    reponse: "Section Tarifs ajoutée, juste sous vos services.",
    change: { tarifs: true },
    zone: "tarifs",
  },
  {
    demande: "Passe le site en thème Doux.",
    reponse: "Thème Doux appliqué : tons crème, boutons arrondis. Vos textes n'ont pas bougé.",
    change: { doux: true },
    zone: "site",
  },
  {
    demande: "Et en anglais, pour mes clients étrangers ?",
    reponse: "Votre site existe maintenant aussi en anglais.",
    change: { anglais: true },
    zone: "site",
  },
];

const DEPART: Etat = { photo: false, titre: false, tarifs: false, doux: false, anglais: false };
const FIN: Etat = { photo: true, titre: true, tarifs: true, doux: true, anglais: false };

type Bulle = { de: "client" | "ia"; texte: string };

const attendre = (ms: number) => new Promise((r) => setTimeout(r, ms));

export function RetouchesDemo() {
  const { ref, visible } = useVisible<HTMLDivElement>(0.3);
  const [bulles, setBulles] = useState<Bulle[]>([]);
  const [saisie, setSaisie] = useState("");
  const [ecrit, setEcrit] = useState(false);
  const [etat, setEtat] = useState<Etat>(DEPART);
  const [zone, setZone] = useState<Zone | null>(null);

  useEffect(() => {
    if (!visible) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      setEtat(FIN);
      setBulles(
        ETAPES.slice(0, 4).flatMap((e) => [
          { de: "client" as const, texte: e.demande },
          { de: "ia" as const, texte: e.reponse },
        ]),
      );
      return;
    }
    // Un jeton par lancement : en développement, React lance l'effet deux fois.
    const jeton = { stop: false };
    (async () => {
      while (!jeton.stop) {
        setBulles([]);
        setEtat(DEPART);
        await attendre(800);
        for (const e of ETAPES) {
          if (jeton.stop) return;
          // La demande se tape dans la barre, puis part dans la conversation.
          for (let n = 1; n <= e.demande.length; n++) {
            if (jeton.stop) return;
            setSaisie(e.demande.slice(0, n));
            await attendre(28);
          }
          await attendre(350);
          setSaisie("");
          setBulles((b) => [...b, { de: "client", texte: e.demande }]);
          await attendre(450);
          setEcrit(true);
          await attendre(1000);
          setEcrit(false);
          setBulles((b) => [...b, { de: "ia", texte: e.reponse }]);
          setEtat((s) => ({ ...s, ...e.change }));
          setZone(e.zone);
          await attendre(1700);
          setZone(null);
          await attendre(700);
        }
        await attendre(4000);
      }
    })();
    return () => {
      jeton.stop = true;
    };
  }, [visible]);

  const en = etat.anglais;
  const doux = etat.doux;
  const titre = etat.titre
    ? en
      ? "Take care of yourself, we handle the rest"
      : "Prenez soin de vous, on s'occupe du reste"
    : en
      ? "Cut, colour and care, by appointment"
      : "Coupe, couleur et soin, sur rendez-vous";

  return (
    <div ref={ref} className="grid items-stretch gap-6 lg:grid-cols-[minmax(0,5fr)_minmax(0,7fr)]">
      {/* La conversation */}
      <div className="flex min-h-[30rem] flex-col rounded-3xl bg-white/[0.04] p-4 ring-1 ring-white/10 sm:p-5">
        <div className="flex items-center gap-2 text-sm text-white/60">
          <Sparkles className="h-4 w-4 text-white/70" aria-hidden="true" />
          Assistant de votre site
        </div>
        <div
          className="mt-4 flex flex-1 flex-col justify-end gap-2.5 overflow-hidden"
          aria-live="polite"
        >
          {bulles.slice(-6).map((b, k) => (
            <div
              key={`${bulles.length}-${k}-${b.texte}`}
              className={`flex ${b.de === "client" ? "justify-end" : "justify-start"}`}
            >
              <div
                className={`max-w-[88%] rounded-2xl px-3.5 py-2.5 text-[14px] leading-snug ${b.de === "client" ? "bg-white text-black" : "bg-white/10 text-white"}`}
                style={{ animation: "vitrine-monte 0.35s ease-out" }}
              >
                {b.texte}
                {b.de === "ia" && (
                  <span className="mt-1.5 flex items-center gap-1 text-[11px] text-white/45">
                    <Undo2 className="h-3 w-3" aria-hidden="true" /> Annuler
                  </span>
                )}
              </div>
            </div>
          ))}
          {ecrit && (
            <div className="flex w-fit gap-1 rounded-2xl bg-white/10 px-4 py-3.5">
              {[0, 1, 2].map((k) => (
                <span
                  key={k}
                  className="vitrine-point h-1.5 w-1.5 rounded-full bg-white"
                  style={{ animationDelay: `${k * 0.15}s` }}
                />
              ))}
            </div>
          )}
        </div>
        <div
          className="mt-4 flex items-center gap-2 rounded-full bg-white py-1.5 pr-1.5 pl-4 text-[14px] text-black"
          aria-hidden="true"
        >
          <span className="min-w-0 flex-1 truncate">
            {saisie || <span className="text-black/40">Demandez un changement…</span>}
          </span>
          <span className="grid h-8 w-8 shrink-0 place-items-center rounded-full bg-violet text-white">
            <ArrowUp className="h-4 w-4" />
          </span>
        </div>
      </div>

      {/* Le site qui se transforme */}
      <div
        aria-hidden="true"
        className={`retouche-zone relative overflow-hidden rounded-2xl shadow-2xl transition-colors duration-700 ${zone === "site" ? "retouche-zone--active" : ""} ${doux ? "bg-[#fbf8f3] text-[#2b323b]" : "bg-white text-black"}`}
      >
        <div
          className={`flex items-center gap-1.5 border-b px-3 py-2 ${doux ? "border-[#2b323b]/10" : "border-black/[0.06]"}`}
        >
          {[0, 1, 2].map((k) => (
            <span key={k} className="h-1.5 w-1.5 rounded-full bg-black/15" />
          ))}
          <span className="ml-2 text-[10px] text-black/45">
            studio-lune.sitaly.fr{en ? "/en" : ""}
          </span>
        </div>
        <div className="flex items-center justify-between px-5 py-3 text-xs">
          <span className="font-semibold">Studio Lune</span>
          <span className="flex gap-3 opacity-70">
            <span>Services</span>
            <span>{en ? "Prices" : "Tarifs"}</span>
            <span>Contact</span>
          </span>
        </div>

        {/* Le haut du site */}
        <div
          className={`retouche-zone relative mx-3 overflow-hidden rounded-xl ${zone === "hero" ? "retouche-zone--active" : ""}`}
        >
          <img
            src={photo("coiffeuse", 768)}
            alt=""
            width={768}
            height={432}
            className={`absolute inset-0 h-full w-full object-cover transition duration-1000 ${etat.photo ? "scale-100 opacity-100" : "scale-110 opacity-0"}`}
          />
          <div
            className={`relative px-6 py-10 transition-colors duration-700 sm:py-14 ${etat.photo ? "bg-black/45 text-white" : doux ? "bg-[#efe7dc] text-[#2b323b]" : "bg-[#2b323b] text-white"}`}
          >
            <div
              className={`retouche-zone inline-block rounded-md ${zone === "titre" ? "retouche-zone--active" : ""}`}
            >
              <div
                key={titre}
                className="text-2xl leading-tight font-semibold sm:text-3xl"
                style={{ animation: "vitrine-monte 0.45s ease-out" }}
              >
                {titre}
              </div>
            </div>
            <span
              className={`mt-5 inline-flex px-4 py-2 text-xs font-semibold text-white transition-all duration-700 ${doux ? "rounded-full bg-[#3d4d63]" : "rounded-md bg-[#c48b9f]"}`}
            >
              {en ? "Book now" : "Prendre rendez-vous"}
            </span>
          </div>
        </div>

        <div className="grid grid-cols-3 gap-2 px-3 pt-3">
          {(en ? ["Cut", "Colour", "Care"] : ["Coupe", "Couleur", "Soin"]).map((s) => (
            <div
              key={s}
              className={`py-3 text-center text-xs font-medium transition-all duration-700 ${doux ? "rounded-2xl bg-[#2b323b]/[0.05]" : "rounded-lg bg-black/[0.04]"}`}
            >
              {s}
            </div>
          ))}
        </div>

        <div
          className={`grid transition-all duration-700 ${etat.tarifs ? "grid-rows-[1fr] opacity-100" : "grid-rows-[0fr] opacity-0"}`}
        >
          <div className="overflow-hidden">
            <div
              className={`retouche-zone m-3 rounded-xl px-4 py-4 ${zone === "tarifs" ? "retouche-zone--active" : ""}`}
            >
              <div className="text-sm font-semibold">{en ? "Prices" : "Tarifs"}</div>
              <div className="mt-2 flex justify-between text-sm">
                <span>{en ? "Women's cut" : "Coupe femme"}</span>
                <span className="font-semibold">38 €</span>
              </div>
              <div className="mt-1 flex justify-between text-sm">
                <span>{en ? "Colour" : "Couleur"}</span>
                <span className="font-semibold">55 €</span>
              </div>
            </div>
          </div>
        </div>
        <div className="h-3" />
      </div>
    </div>
  );
}
