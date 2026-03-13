import axios from 'axios';

const api = axios.create({
  baseURL: import.meta.env.VITE_API_BASE_URL,
  withCredentials: true,
});

// api.interceptors.request.use((config) => {
//   const csrfToken = sessionStorage.getItem('csrfToken'); 
  
//   if (csrfToken) {
//     config.headers['X-XSRF-TOKEN'] = csrfToken;
//   }
  
//   return config;
// }, (error) => {
//   return Promise.reject(error);
// });

export default api;