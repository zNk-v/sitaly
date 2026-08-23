/*!
 * Ajoute l'entrée « ChatGPT Ads » au menu burger mobile.
 *
 * Les pages du site sont rendues par React : le menu est recréé à chaque
 * ouverture et tout lien ajouté à la main dans le HTML pré-rendu est effacé
 * à l'hydratation. Ce script observe donc le DOM et réinsère l'entrée à
 * chaque apparition du menu. Il est sans effet sur les pages sans menu.
 */
(function () {
  "use strict";

  var HREF = "/chatgpt-ads/";
  var LABEL = "ChatGPT Ads";
  var MARK = "data-sitaly-chatgpt-ads";

  var ICON =
    '<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24"' +
    ' fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round"' +
    ' stroke-linejoin="round" class="h-4 w-4" aria-hidden="true">' +
    '<path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"></path></svg>';

  function inject(menu) {
    if (!menu || menu.querySelector("[" + MARK + "]")) return;

    var nav = menu.querySelector("nav") || menu;
    var links = nav.querySelectorAll("a");
    if (!links.length) return;

    // On se cale sur le style d'une entrée existante mise en avant.
    var sibling = null;
    for (var i = 0; i < links.length; i++) {
      if ((links[i].getAttribute("href") || "").indexOf("/agents-ia") === 0) {
        sibling = links[i];
        break;
      }
    }

    var a = document.createElement("a");
    a.setAttribute("href", HREF);
    a.setAttribute(MARK, "");
    a.className = sibling
      ? sibling.className
      : "flex items-center gap-2 border-b border-border/60 py-3.5 text-base font-semibold text-accent";
    a.innerHTML = ICON + LABEL;

    // La page est un fichier statique, hors du routeur React : celui-ci
    // intercepte le clic et rend son écran 404. On force donc une vraie
    // navigation, en laissant passer les clics « ouvrir dans un onglet ».
    a.addEventListener("click", function (e) {
      if (e.defaultPrevented || e.button !== 0) return;
      if (e.metaKey || e.ctrlKey || e.shiftKey || e.altKey) return;
      e.preventDefault();
      e.stopPropagation();
      window.location.assign(HREF);
    });

    if (sibling && sibling.parentNode) {
      sibling.parentNode.insertBefore(a, sibling.nextSibling);
    } else {
      nav.insertBefore(a, nav.firstChild);
    }
  }

  function scan() {
    inject(document.getElementById("menu-mobile"));
  }

  function start() {
    scan();
    if (!window.MutationObserver) return;
    new MutationObserver(scan).observe(document.body, {
      childList: true,
      subtree: true,
    });
  }

  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", start);
  } else {
    start();
  }
})();
