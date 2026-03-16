import axios from "axios";

const api = axios.create({
  baseURL: '/api',
  withCredentials: true,
  xsrfCookieName: 'XSRF-TOKEN',
  xsrfHeaderName: 'X-XSRF-TOKEN',
});

// export const fetchCsrfToken = async () => {
//   await api.get('/csrf-token');
// };

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
