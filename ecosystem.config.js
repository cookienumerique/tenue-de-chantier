module.exports = {
  apps: [
    {
      name: 'tenue-de-chantiers',
      exec_mode: 'cluster',
      instances: 'max', // Or a number of instances
      script: 'node_modules/next/dist/bin/next',
      args: 'start',
      env_local: {
        APP_ENV: 'local', // APP_ENV=local
      },
      env_dev: {
        APP_ENV: 'development', // APP_ENV=dev
      },
      env_prod: {
        APP_ENV: 'prod', // APP_ENV=prod
        PORT: 3001,
      },
    },
  ],
};
