import Axios from 'axios';

Axios.interceptors.response.use(
  (response) => {
    // Gérer la réponse normalement
    return response;
  },
  (error) => {
    // Gérer l'erreur
    if (!error.response) {
      if (error.response?.status === 401) {
        window.localStorage.removeItem('token');
        return window.location.reload();
      }
      // Réseau ou autres erreurs hors réponse HTTP
      console.error('Network error: ', error.message);
      // Vous pouvez ici décider de renvoyer une réponse par défaut ou de continuer à propager l'erreur
      return Promise.resolve({ data: 'default data' });
    }
    return Promise.reject(error);
  }
);

Axios.interceptors.request.use(
  async (config) => {
    const token = window.localStorage.getItem('token');
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => Promise.reject(error)
);
