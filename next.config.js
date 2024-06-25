// Importation du plugin next-pwa
const withPWA = require('next-pwa');
const runtimeCaching = require('next-pwa/cache');

// /** @type {import("next").NextConfig} */
const nextConfig = {};

module.exports = withPWA({
  ...nextConfig, // Utilisation de la spread syntax pour fusionner les configurations
  dest: '/public', // dossier de destination pour les fichiers générés par le service worker
  runtimeCaching, // stratégies de mise en cache fournies par next-pwa
  disable:
    process.env.NEXT_PUBLIC_APP_ENV !== 'development', // désactiver en mode développement
  buildExcludes: [/middleware-manifest.json$/],
});
