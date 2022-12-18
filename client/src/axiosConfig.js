import axios from 'axios';

const axiosConfig = axios.create({
  baseURL: 'http://localhost:5000',
});

axiosConfig.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('token');

    if (token) {
      config.headers.Authorization = token;
    }

    return config;
  },
  (error) => Promise.reject(error)
);

export default axiosConfig;
