import Axios from 'axios';

Axios.interceptors.response.use(
  (response) => {
    // Gérer la réponse normalement
    return response;
  },
  (error) => {
    // Gérer l'erreur
    if (error.response?.status === 401) {
      //console.log(error);
      localStorage.removeItem('token');
      window.location.reload();
      return Promise.reject(error);
    }
    if (!error.response) {
      // Vous pouvez ici décider de renvoyer une réponse par défaut ou de continuer à propager l'erreur
      return Promise.resolve({ data: {} });
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
