/*!
 * Maintient les métadonnées du HTML pré-rendu après l'hydratation React.
 *
 * Le bundle React ré-applique les titres, descriptions et données
 * structurées définis à la compilation, écrasant ceux du fichier servi.
 * Ce script mémorise les valeurs du fichier avant hydratation, puis les
 * rétablit dès qu'elles dérivent. Le contenu servi et le contenu rendu
 * sont ainsi identiques pour tous les visiteurs comme pour les robots.
 */
(function () {
  "use strict";

  var SEL = [
    ["title", null],
    ["meta[name='description']", "content"],
    ["meta[property='og:title']", "content"],
    ["meta[property='og:description']", "content"],
    ["meta[property='og:image:alt']", "content"],
  ];

  /* Ancienne description d'entité encore présente dans le bundle. */
  var LD_OLD =
    "Sitaly crée des sites internet professionnels pour artisans et TPE en Essonne et en Île-de-France.";
  var LD_NEW =
    "Sitaly est une agence d'acquisition qui accompagne PME, TPE et artisans, " +
    "en Essonne, en Île-de-France et partout en France à distance.";

  /* Instantané pris à l'analyse du document, avant toute hydratation. */
  var snap = [];
  SEL.forEach(function (s) {
    var el = document.querySelector(s[0]);
    if (!el) return;
    snap.push({ sel: s[0], attr: s[1], val: s[1] ? el.getAttribute(s[1]) : el.textContent });
  });

  var busy = false;

  function restore() {
    if (busy) return;
    busy = true;
    try {
      snap.forEach(function (s) {
        var el = document.querySelector(s.sel);
        if (!el) return;
        if (s.attr) {
          if (el.getAttribute(s.attr) !== s.val) el.setAttribute(s.attr, s.val);
        } else if (el.textContent !== s.val) {
          el.textContent = s.val;
        }
      });
      var lds = document.querySelectorAll('script[type="application/ld+json"]');
      for (var i = 0; i < lds.length; i++) {
        var txt = lds[i].textContent;
        if (txt && txt.indexOf(LD_OLD) !== -1) {
          lds[i].textContent = txt.split(LD_OLD).join(LD_NEW);
        }
      }
    } finally {
      busy = false;
    }
  }

  if (!window.MutationObserver) return;
  new MutationObserver(restore).observe(document.head, {
    childList: true,
    subtree: true,
    attributes: true,
    characterData: true,
  });
  document.addEventListener("DOMContentLoaded", restore);
  window.addEventListener("load", restore);
})();
