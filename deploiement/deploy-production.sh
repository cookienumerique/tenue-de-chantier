rm -rf node_modules;
rm -rf .next;
npm install --max-old-space-size=4096;
# Mettre sur stop les docker de l'application
docker ps -a --filter "name=_tenue_de_chantiers" -q | xargs docker start
npm run build;
#pm2 start npm --name "tenue-de-chantiers" -- start;
pm2 restart tenue-de-chantiers
