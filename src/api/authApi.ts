import api from './apiClient';

// 회원가입
export const signUp = async (data: { email: string; password: string; username: string }) => {
  const response = await api.post('/auth/signup', data);
  return response.data;
};

// 로그인
export const signIn = async (data: { email: string; password: string }) => {
  const response = await api.post('/auth/login', data);
  return response.data;
};

// 이메일 중복 확인
export const checkEmail = async (email: string) => {
  const response = await api.post(`/auth/unique`, null, {
    params: {
      email: email
    }
  });
  return response.data;
};