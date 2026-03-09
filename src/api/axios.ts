import axios from 'axios';

const api = axios.create({
  baseURL: 'http://3.36.117.181:8080', // 예: 'http://localhost:8080'
});

// 인터셉터를 사용하면 로그인 후 받은 토큰을 모든 요청에 자동으로 실어 보낼 수 있습니다.
api.interceptors.request.use((config) => {
  const token = localStorage.getItem('accessToken');
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

export default api;