import axios from "axios";

// 1. document.cookie 문자열에서 특정 쿠키 값만 파싱해오는 유틸리티 함수
const getCookieValue = (name: string): string | null => {
  const value = `; ${document.cookie}`;
  const parts = value.split(`; ${name}=`);

  if (parts.length === 2) {
    // pop() 대신 인덱스 [1]을, shift() 대신 인덱스 [0]을 사용하여 안전하게 추출합니다.
    return parts[1].split(";")[0];
  }

  return null;
};

const api = axios.create({
  baseURL: import.meta.env.VITE_API_BASE_URL,
  withCredentials: true,

  // (참고) Axios의 기본 기능 활성화: 이름이 일치하면 자동으로 헤더에 넣어줍니다.
  xsrfCookieName: "XSRF-TOKEN",
  xsrfHeaderName: "X-XSRF-TOKEN",
});

api.interceptors.request.use(
  (config) => {
    const csrfToken = getCookieValue("XSRF-TOKEN");

    if (csrfToken) {
      config.headers["X-XSRF-TOKEN"] = csrfToken;
    }

    return config;
  },
  (error) => {
    return Promise.reject(error);
  },
);

api.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response && error.response.status === 401) {
      const requestUrl = error.config.url || "";

      // 로컬 스토리지에서 가짜 로그인 여부 확인
      const isMockUser = localStorage.getItem("isMock") === "true";

      // 로그인 관련 요청인지 확인
      const isAuthAction =
        requestUrl.includes("/auth/login") ||
        requestUrl.includes("/auth/signup") ||
        requestUrl.includes("/auth/unique");

      // [수정] 로그인 과정이 아니고 + 가짜 로그인 유저도 아닐 때만 알림을 띄움
      if (!isAuthAction && !isMockUser) {
        alert("세션이 만료되었습니다. 다시 로그인해주세요.");
        localStorage.removeItem("userId");
        localStorage.removeItem("isMock");
        window.location.href = "/login";
      }
    }
    return Promise.reject(error);
  },
);

export default api;
