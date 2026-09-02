import { useEffect, type RefObject } from "react";

/**
 * Découpe en mots les titres marqués `data-split`, pour les révéler en cascade.
 *
 * Le découpage se fait sur les noeuds texte uniquement : le balisage inline est
 * préservé, donc un `<span class="accent-word">` garde ses mots à l'intérieur et
 * conserve son serif italique. Le texte reste intact pour un lecteur d'écran :
 * chaque mot est suivi d'une espace réelle et le titre n'est jamais vidé.
 *
 * Sans JS, ou sous `prefers-reduced-motion`, le titre s'affiche normalement :
 * c'est l'ajout de `is-split` qui déclenche l'état masqué.
 */
/**
 * Un fragment peint en dégradé via `background-clip: text` ne survit pas au
 * découpage : chaque mot devient un `inline-block` avec `will-change`, donc un
 * contexte d'empilement, et le parent n'a plus aucune glyphe à découper — le
 * texte disparaît purement et simplement. Ces fragments sont laissés entiers,
 * ils gardent leur dégradé et le reste du titre garde sa cascade.
 */
function dansTexteDecoupeEnFond(node: Node, limite: HTMLElement): boolean {
  let el = node.parentElement;
  while (el && el !== limite.parentElement) {
    const clip = getComputedStyle(el).webkitBackgroundClip || getComputedStyle(el).backgroundClip;
    if (clip === "text") return true;
    el = el.parentElement;
  }
  return false;
}

export function useSplitWords(containerRef: RefObject<HTMLElement | null>) {
  useEffect(() => {
    const root = containerRef.current;
    if (!root) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    const titles = Array.from(root.querySelectorAll<HTMLElement>("[data-split]"));
    if (!titles.length) return;

    // Viewport non mesurable : onglet ouvert en arrière-plan, prérendu, fenêtre
    // repliée. On renonce au découpage plutôt que de masquer des titres qu'aucun
    // observateur ne viendra révéler. Un titre statique vaut mieux qu'un titre
    // invisible.
    const viewportHeight = window.innerHeight || document.documentElement.clientHeight;
    if (!viewportHeight) return;

    for (const title of titles) {
      if (title.dataset.splitDone === "1") continue;

      // Les noeuds texte sont collectés avant modification : insérer pendant
      // le parcours invaliderait le TreeWalker.
      const walker = document.createTreeWalker(title, NodeFilter.SHOW_TEXT);
      const textNodes: Text[] = [];
      let node = walker.nextNode();
      while (node) {
        if (node.textContent?.trim() && !dansTexteDecoupeEnFond(node, title)) {
          textNodes.push(node as Text);
        }
        node = walker.nextNode();
      }

      let wordIndex = 0;
      for (const textNode of textNodes) {
        const fragment = document.createDocumentFragment();
        // La capture garde les espaces : on ne réinvente pas l'espacement.
        for (const chunk of textNode.textContent!.split(/(\s+)/)) {
          if (chunk === "") continue;
          if (/^\s+$/.test(chunk)) {
            fragment.appendChild(document.createTextNode(chunk));
            continue;
          }
          const span = document.createElement("span");
          span.className = "word";
          span.style.setProperty("--w", String(wordIndex++));
          span.textContent = chunk;
          fragment.appendChild(span);
        }
        textNode.parentNode?.replaceChild(fragment, textNode);
      }

      title.dataset.splitDone = "1";
      title.classList.add("is-split");
    }

    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (!entry.isIntersecting) continue;
          entry.target.classList.add("is-shown");
          observer.unobserve(entry.target);
        }
      },
      { rootMargin: "0px 0px -10% 0px", threshold: 0.15 },
    );

    for (const title of titles) {
      // Un titre déjà à l'écran au chargement se montre sans attendre le scroll,
      // mais garde sa cascade : c'est elle qui donne le mouvement du hero.
      if (title.getBoundingClientRect().top < viewportHeight) {
        title.classList.add("is-shown");
      } else {
        observer.observe(title);
      }
    }

    return () => observer.disconnect();
  }, [containerRef]);
}
