import api from './apiClient';
// import { fetchCsrfToken } from './apiClient';

// 회원가입
export const signUp = async (data: { email: string; password: string; username: string }) => {
  await fetchCsrfToken();
  const response = await api.post('/auth/signup', data);
  return response.data;
};

// 로그인
export const signIn = async (data: { email: string; password: string }) => {
  await fetchCsrfToken();
  const response = await api.post('/auth/login', data);
  return response.data;
};

// 이메일 중복 확인
export const checkEmail = async (email: string) => {
  const response = await api.post(`/auth/unique`, null, {
    params: {
      email: email,
    },
  });
  return response.data;
};

// 로그인 화면 이미지 목록 가져오기 (추가됨)
export const getLoginImages = async () => {
  const response = await api.get("/auth/posts");
  return response.data;
};

// 로그아웃
export const signOut = async () => {
  try {
    const response = await api.post("/auth/signout");
    if (response.data.code === 200 || response.data.message === "Success") {
      return response.data;
    }
  } catch (error) {
    console.error("통신 실패: ", error);
  }
};

// CSRF 토큰 가져오기
export const fetchCsrfToken = async () => {
  try {
    const response = await api.get("/auth/csrf-token");
    if (response.data.code === 200 || response.data.message === "Success") {
      return response.data;
    }
  } catch (error) {
    console.error("통신 실패: ", error);
  }
};
