import Axios from 'axios';

Axios.interceptors.response.use(
  (response) => response?.data ?? {},
  (error) => {
    if (error.response?.status === 401) {
      window.sessionStorage.removeItem('token');
      return window.location.reload();
    }
    return Promise.reject(error);
  }
);

Axios.interceptors.request.use(
  async (config) => {
    const token = window.sessionStorage.getItem('token');
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => Promise.reject(error)
);
