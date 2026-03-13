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

// 로그아웃
export const signOut = async () => {
  try {
        const response = await api.post('/auth/signout');
  
        if (response.data.code === 200 || response.data.message === "Success") {
          return response.data;
        }
      } catch (error) {
        console.error("통신 실패: ", error);
      }
}