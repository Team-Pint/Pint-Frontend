// src/api/axios.ts 최종 수정본
import axios from 'axios';

const api = axios.create({
  baseURL: import.meta.env.VITE_API_BASE_URL || 'http://3.36.117.181:8080',
  withCredentials: true,
  headers: {
    'Content-Type': 'application/json',
  },
});

export default api;