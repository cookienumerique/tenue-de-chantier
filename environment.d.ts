declare global {
  namespace NodeJS {
    interface ProcessEnv {
      NEXT_PUBLIC_APP_NAME: string;
      NEXT_PUBLIC_APP_API_HOST: string;
      NEXT_PUBLIC_APP_HOST: string;
      NEXT_PUBLIC_APP_API_HOST_PRODUCTION: string;
      NEXT_PUBLIC_APP_ENV: 'dev' | 'prod';
    }
  }
}
