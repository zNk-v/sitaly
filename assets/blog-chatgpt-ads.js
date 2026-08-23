/*!
 * Ajoute l'article « Publicité ChatGPT Ads » à la liste /blog/.
 *
 * La liste est rendue par React depuis les données du bundle : un article
 * ajouté à la main dans le HTML pré-rendu est effacé à l'hydratation. Ce
 * script crée donc une rubrique « Publicité IA » et la réinsère à chaque
 * reconstruction du DOM.
 */
(function () {
  "use strict";

  var HREF = "/blog/publicite-chatgpt-ads-guide/";
  var TITRE = "Publicité ChatGPT Ads : faut-il y investir votre budget ?";
  var CHAPO =
    "La publicité arrive dans ChatGPT. Ce qu'on sait de son fonctionnement, ce que ça change " +
    "par rapport à Google Ads, et cinq critères pour décider si ce canal mérite votre budget.";
  var MARK = "data-sitaly-cga";

  var ICON_CAL =
    '<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none"' +
    ' stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"' +
    ' class="h-3.5 w-3.5" aria-hidden="true"><path d="M8 2v4"></path><path d="M16 2v4"></path>' +
    '<rect width="18" height="18" x="3" y="4" rx="2"></rect><path d="M3 10h18"></path></svg>';
  var ICON_CLOCK =
    '<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none"' +
    ' stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"' +
    ' class="h-3.5 w-3.5" aria-hidden="true"><circle cx="12" cy="12" r="10"></circle>' +
    '<path d="M12 6v6l4 2"></path></svg>';
  var ICON_ARROW =
    '<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none"' +
    ' stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"' +
    ' class="h-4 w-4" aria-hidden="true"><path d="M5 12h14"></path><path d="m12 5 7 7-7 7"></path></svg>';

  /* Force une vraie navigation : la page est statique, hors du routeur React. */
  function bind(a) {
    a.addEventListener("click", function (e) {
      if (e.defaultPrevented || e.button !== 0) return;
      if (e.metaKey || e.ctrlKey || e.shiftKey || e.altKey) return;
      e.preventDefault();
      e.stopPropagation();
      window.location.assign(HREF);
    });
  }

  function build() {
    var sec = document.createElement("section");
    sec.id = "publicite-ia";
    sec.className = "scroll-mt-24";
    sec.setAttribute(MARK, "");
    sec.innerHTML =
      '<div class="border-b border-border pb-5">' +
        '<h2 class="font-display text-2xl font-extrabold tracking-tight sm:text-3xl">Publicité IA</h2>' +
        '<p class="mt-2 max-w-2xl text-[15px] text-muted-foreground">' +
        'Les nouveaux canaux publicitaires liés aux assistants conversationnels, et comment décider ' +
        's\'ils méritent votre budget.</p>' +
      '</div>' +
      '<div class="mt-8 grid gap-6 sm:gap-8">' +
        '<article class="group rounded-2xl border border-border bg-card p-6 shadow-soft transition hover:shadow-elevated sm:p-8">' +
          '<div class="flex flex-wrap items-center gap-3 text-xs text-muted-foreground">' +
            '<span class="rounded-full bg-accent/10 px-3 py-1 font-semibold text-accent">Publicité IA</span>' +
            '<span class="inline-flex items-center gap-1.5">' + ICON_CAL + '23 août 2026</span>' +
            '<span class="inline-flex items-center gap-1.5">' + ICON_CLOCK + '9 min</span>' +
          '</div>' +
          '<h3 class="mt-4 font-display text-2xl font-bold leading-tight tracking-tight sm:text-3xl">' +
            '<a href="' + HREF + '" class="transition group-hover:text-accent">' + TITRE + '</a>' +
          '</h3>' +
          '<p class="mt-3 text-[15px] text-muted-foreground sm:text-base">' + CHAPO + '</p>' +
          '<a href="' + HREF + '" class="mt-5 inline-flex items-center gap-1.5 text-sm font-semibold text-accent hover:underline">' +
            "Lire l'article" + ICON_ARROW +
          '</a>' +
        '</article>' +
      '</div>';
    Array.prototype.forEach.call(sec.querySelectorAll('a[href="' + HREF + '"]'), bind);
    return sec;
  }

  function inject() {
    if (document.querySelector("[" + MARK + "]")) return;

    // On se place juste avant la rubrique Google Ads, sinon en tête de liste.
    var target = document.getElementById("google-ads");
    if (!target) {
      var h2s = document.querySelectorAll("h2");
      for (var i = 0; i < h2s.length; i++) {
        if (h2s[i].textContent.trim() === "Google Ads") {
          target = h2s[i].closest("section");
          break;
        }
      }
    }
    if (!target || !target.parentNode) return;
    target.parentNode.insertBefore(build(), target);
  }

  function start() {
    inject();
    if (!window.MutationObserver) return;
    new MutationObserver(inject).observe(document.body, { childList: true, subtree: true });
  }

  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", start);
  } else {
    start();
  }
})();
