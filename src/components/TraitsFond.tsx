/**
 * Les traits flous bleus et violets du hero de l'accueil, repris derrière les
 * titres de section partout sur le site (25/11/2026, demande de Teddy : « la
 * zone en arrière-plan du hero, je dois la retrouver un peu partout au
 * scroll »).
 *
 * Plus discrets que dans le hero, pour que le texte reste net. Ils glissent
 * à mesure que la section traverse l'écran (styles.css, « traits-defile »),
 * et restent immobiles pour qui a demandé moins d'animations ou sur les
 * navigateurs sans animation liée au défilement.
 *
 * Le parent doit être `relative isolate`. Les traits restent dans sa largeur :
 * aucun défilement horizontal sur téléphone. Le flou déborde à l'œil, pas dans
 * la mise en page.
 */
export function TraitsFond({ sens = "gauche" }: { sens?: "gauche" | "droite" }) {
  const droite = sens === "droite";
  return (
    <div
      aria-hidden="true"
      className={`traits-defile pointer-events-none absolute inset-x-0 -top-10 -bottom-10 -z-10 ${droite ? "traits-defile--droite" : ""}`}
    >
      <span
        className={`absolute top-[10%] h-24 w-[62%] rounded-full bg-[#a78bfa]/40 blur-2xl sm:h-32 ${droite ? "right-0 rotate-[8deg]" : "left-0 rotate-[-8deg]"}`}
      />
      <span
        className={`absolute top-[42%] h-20 w-[50%] rounded-full bg-[#93c5fd]/45 blur-2xl sm:h-28 ${droite ? "left-[4%] rotate-[-6deg]" : "right-[4%] rotate-[6deg]"}`}
      />
      <span
        className={`absolute bottom-[6%] h-16 w-[40%] rounded-full bg-[#c4b5fd]/40 blur-2xl sm:h-24 ${droite ? "right-[14%] rotate-[4deg]" : "left-[14%] rotate-[-4deg]"}`}
      />
    </div>
  );
}
