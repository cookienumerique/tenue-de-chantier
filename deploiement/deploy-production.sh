#!/bin/zsh

git pull origin main;
rm -rf node_modules;
rm -rf .next
npm install;
npm run build;
#pm2 start npm --name "tenue-de-chantiers" -- run start -- --port 3001
pm2 restart tenue-de-chantiers;
