#!/bin/bash

npx ng build -c production

git checkout gh-pages

cp -r dist/guhkadoo.github.io/browser/* .

git add .

if git diff --cached --quiet; then
  echo "nada para commitar."
else
  git commit -m "deploy angular app"
  git push origin gh-pages --force
  echo "deploy concluído com sucesso!"
fi

git checkout prod
