import Axios from 'axios';

Axios.interceptors.response.use(
  (response) => response?.data,
  (error) => Promise.reject(error)
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
