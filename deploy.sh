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

echo "==> 1/4 Build"
cd "$SRC"
npm run build

echo "==> 2/4 Copie du build vers le repo de mise en ligne"
# --delete nettoie les vieux chunks JS et les pages supprimées.
# --exclude protège ce qui N'EST PAS dans le build : CNAME, .nojekyll, .git, landing pub/
rsync -a --delete \
  --exclude .git --exclude CNAME --exclude .nojekyll --exclude /pub \
  "$SRC/dist/client/" "$PUB/"

echo "==> 3/4 Commit"
cd "$PUB"
git add -A
if git diff --cached --quiet; then
  echo "Rien à déployer (aucun changement)."
else
  git commit -q -m "$MSG"
fi

echo "==> 4/4 Push (met sitaly.fr en ligne, ~1 min)"
git push origin main

echo "OK — en ligne dans ~1 min sur https://sitaly.fr"
