#!/usr/bin/env bash
# Déploiement Sitaly — un seul geste.
#   Source (build)  : ~/sitaly            (app TanStack)
#   Mise en ligne   : ~/dev/sitaly -> repo zNk-v/sitaly -> GitHub Pages -> sitaly.fr
# Lovable/sitaly-app ne sont plus utilisés : on ne pousse QUE le repo de déploiement.
set -euo pipefail

export PATH="/Users/vidalozzi/.nvm/versions/node/v24.15.0/bin:$PATH"

SRC="$HOME/sitaly"
PUB="$HOME/dev/sitaly"
MSG="${1:-Déploiement Sitaly}"

echo "==> 1/5 Build"
cd "$SRC"
npm run build

echo "==> 2/5 Copie du build vers le repo de mise en ligne"
# --delete nettoie les vieux chunks JS et les pages supprimées.
# --exclude protège ce qui N'EST PAS dans le build : CNAME, .nojekyll, .git, landing pub/
rsync -a --delete \
  --exclude .git --exclude CNAME --exclude .nojekyll --exclude /pub \
  "$SRC/dist/client/" "$PUB/"

echo "==> 3/5 Commit"
cd "$PUB"
git add -A
if git diff --cached --quiet; then
  echo "Rien à déployer (aucun changement)."
else
  git commit -q -m "$MSG"
fi

echo "==> 4/5 Push (met sitaly.fr en ligne, ~1 min)"
git push origin main

echo "==> 5/5 IndexNow, en arrière-plan dans 2 min"
# Signale les pages du sitemap à Bing (et aux moteurs du protocole IndexNow),
# dont s'alimentent Copilot et la recherche de ChatGPT. Lancé en différé, le
# temps que GitHub Pages publie le fichier de clé ; un échec n'a aucun effet
# sur la mise en ligne. La clé n'est pas un secret : elle est publiée à
# https://sitaly.fr/76491aa47a5df04b8a46d7e43083c6d0.txt, c'est ce qui prouve la propriété du site.
INDEXNOW_KEY="76491aa47a5df04b8a46d7e43083c6d0"
URLS=$(grep -o '<loc>[^<]*</loc>' "$SRC/public/sitemap.xml" 2>/dev/null \
  | sed -e 's#<loc>##' -e 's#</loc>##' \
  | awk '{printf "%s\"%s\"", (NR>1?",":""), $0}' || true)
if [ -n "$URLS" ]; then
  nohup bash -c "sleep 120; curl -s -o /dev/null -w 'IndexNow : HTTP %{http_code}\n' \
    -X POST 'https://api.indexnow.org/indexnow' \
    -H 'Content-Type: application/json; charset=utf-8' \
    -d '{\"host\":\"sitaly.fr\",\"key\":\"$INDEXNOW_KEY\",\"keyLocation\":\"https://sitaly.fr/$INDEXNOW_KEY.txt\",\"urlList\":[$URLS]}'" \
    > "$SRC/.indexnow.log" 2>&1 &
fi

echo "OK — en ligne dans ~1 min sur https://sitaly.fr"
