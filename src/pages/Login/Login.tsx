import React, { useEffect, useMemo, useState } from "react";
import { useNavigate } from "react-router-dom";
import { AUTH_STYLES } from "../../styles/authStyles";
import {
  signIn,
  signUp,
  checkEmail,
  getLoginImages,
  // fetchCsrfToken,
} from "../../api/authApi";
// import api from "../../api/apiClient";

// 스크롤 이미지 컬럼 컴포넌트
const ScrollingColumn = ({
  images,
  speed,
  direction,
  className,
}: {
  images: any[];
  speed: string;
  direction: "up" | "down";
  className: string;
}) => (
  <div className={`${className} h-full overflow-hidden relative`}>
    <div
      className={`flex flex-col gap-6 w-full ${direction === "up" ? "animate-scroll-up" : "animate-scroll-down"}`}
      style={{ animationDuration: speed }}
    >
      {[...images, ...images].map((img, idx) => (
        <img
          key={idx}
          src={img.imageUrl}
          style={{
            // 비율 조정을 통해 너무 길쭉해지는 것을 방지 (최소 250px ~ 최대 500px 사이 권장)
            height: img.height
              ? `${Math.min(Math.max(img.height / 8, 250), 500)}px`
              : "350px",
          }}
          // [수정] rounded-2xl을 제거하여 각진 모서리로 변경
          className={`${AUTH_STYLES.image} w-full flex-shrink-0 object-cover`}
          alt=""
        />
      ))}
    </div>
  </div>
);

const Login: React.FC = () => {
  const [isLogin, setIsLogin] = useState(true);
  const [isEmailChecked, setIsEmailChecked] = useState(false);
  const [loginImages, setLoginImages] = useState<any[]>([]);
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    email: "",
    pw: "",
    verifyPw: "",
    username: "",
  });

  const {
    container,
    leftSection,
    logo,
    formWrapper,
    inputGroup,
    label,
    input,
    button,
    toggleText,
    rightSection,
    column,
  } = AUTH_STYLES;

  const autofillStyle = {
    WebkitTextFillColor: "white",
    WebkitBoxShadow: "0 0 0px 1000px black inset",
    transition: "background-color 5000s ease-in-out 0s",
  };

  useEffect(() => {
    const fetchImages = async () => {
      try {
        const res = await getLoginImages();
        if (res.code === 200) {
          setLoginImages(res.data.postList);
        }
      } catch (err) {
        console.error("이미지 로드 실패:", err);
      }
    };
    fetchImages();
  }, []);

  useEffect(() => {
    const isUserLoggedIn = localStorage.getItem("userId");
    if (isUserLoggedIn) navigate("/home", { replace: true });
  }, [navigate]);

  const isFormValid = useMemo(() => {
    const { email, pw, verifyPw, username } = formData;
    if (isLogin) return !!(email && pw);
    return !!(email && pw && verifyPw && username && isEmailChecked);
  }, [formData, isLogin, isEmailChecked]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    if (name === "email") setIsEmailChecked(false);
  };

  const handleCheckEmail = async () => {
    if (!formData.email) return alert("이메일을 입력해주세요.");
    try {
      const res = await checkEmail(formData.email);
      const isAvaliable = res.code === 200 && res.data.isAvailable;
      alert(
        isAvaliable
          ? "사용 가능한 이메일입니다."
          : "이미 사용 중인 이메일입니다.",
      );
      setIsEmailChecked(isAvaliable);
    } catch (err: any) {
      alert(err.response?.data?.message || "오류가 발생했습니다.");
      setIsEmailChecked(false);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      if (isLogin) {
        const res = await signIn({
          email: formData.email,
          password: formData.pw,
        });
        if (res.code === 200 || res.message === "Success") {
          const userId = res.data.userid ?? res.data.userId;
          if (userId !== undefined && userId !== null)
            localStorage.setItem("userId", String(userId));
          alert("로그인 성공!");

          // 로그인 성공 시, CSRF 토큰 가져오기
          // const csrfToken = await fetchCsrfToken();
          // if (csrfToken) {
          //   localStorage.setItem("csrfToken", String(csrfToken));
          // }

          // api.defaults.headers.common["X-XSRF-TOKEN"] = String(csrfToken);

          navigate("/home", { replace: true });
        }
      } else {
        if (formData.pw !== formData.verifyPw)
          return alert("비밀번호가 일치하지 않습니다.");
        const res = await signUp({
          email: formData.email,
          password: formData.pw,
          username: formData.username,
        });
        if (res.code === 200 || res.message === "Success") {
          alert("회원가입 완료! 로그인을 진행해주세요.");
          setFormData({ email: "", pw: "", verifyPw: "", username: "" });
          setIsEmailChecked(false);
          setIsLogin(true);
        }
      }
    } catch (err: any) {
      alert(err.response?.data?.message || "오류가 발생했습니다.");
    }
  };

  return (
    <div className={container}>
      <div className={leftSection}>
        <h1 className={logo}>Pint.</h1>
        <form
          onSubmit={handleSubmit}
          className={`${formWrapper} flex flex-col gap-4`}
        >
          <div className={inputGroup}>
            <label className={label}>EMAIL ADDRESS</label>
            <div className="relative">
              <input
                name="email"
                type="email"
                className={`${input} w-full`}
                placeholder="example@pint.com"
                value={formData.email}
                onChange={handleChange}
                required
                style={autofillStyle}
              />
              <button
                type="button"
                onClick={handleCheckEmail}
                className={`absolute right-0 bottom-2 text-[10px] px-4 py-1 rounded-full border transition-all duration-300
                  ${isLogin ? "opacity-0 pointer-events-none" : "opacity-100"} 
                  ${isEmailChecked ? "bg-green-500 text-white border-green-500 pointer-events-none" : "bg-white text-black border-white hover:bg-black hover:text-white"}`}
              >
                {isEmailChecked ? "Verified" : "Check Availability"}
              </button>
            </div>
          </div>
          <div className={inputGroup}>
            <label className={label}>PASSWORD</label>
            <input
              name="pw"
              type="password"
              className={input}
              placeholder="••••••••"
              value={formData.pw}
              onChange={handleChange}
              required
              style={autofillStyle}
            />
          </div>
          <div
            className={`flex flex-col gap-4 transition-all duration-500 ease-in-out overflow-hidden ${isLogin ? "max-h-0 opacity-0" : "max-h-[250px] opacity-100"}`}
          >
            <div className={inputGroup}>
              <label className={label}>VERIFY PASSWORD</label>
              <input
                name="verifyPw"
                type="password"
                className={input}
                placeholder="••••••••"
                value={formData.verifyPw}
                onChange={handleChange}
                style={autofillStyle}
              />
            </div>
            <div className={inputGroup}>
              <label className={label}>USERNAME</label>
              <input
                name="username"
                type="text"
                className={input}
                placeholder="Your unique name"
                value={formData.username}
                onChange={handleChange}
                style={autofillStyle}
              />
            </div>
          </div>
          <div className="flex flex-col gap-4 mt-6">
            <button
              type="submit"
              className={`${button} ${!isFormValid ? "cursor-not-allowed grayscale" : ""}`}
              disabled={!isFormValid}
            >
              {isLogin ? "SIGN IN" : "SIGN UP"}
            </button>
            <p
              className={toggleText}
              onClick={() => {
                setIsLogin(!isLogin);
                setIsEmailChecked(false);
                setFormData({ email: "", pw: "", verifyPw: "", username: "" });
              }}
            >
              {isLogin
                ? "Don't have an account? Sign Up"
                : "Already have an account? Log In"}
            </p>
          </div>
        </form>
      </div>

      {/* 이미지 스크롤 영역: 속도를 훨씬 느리게(80s~120s) 조정 */}
      <div className={`${rightSection} gap-6 px-6 overflow-hidden`}>
        {loginImages.length > 0 && (
          <>
            <ScrollingColumn
              images={loginImages}
              speed="100s"
              direction="up"
              className={column}
            />
            <ScrollingColumn
              images={[...loginImages].reverse()}
              speed="120s"
              direction="down"
              className={column}
            />
            <ScrollingColumn
              images={loginImages}
              speed="80s"
              direction="up"
              className={column}
            />
          </>
        )}
      </div>

      <style>{`
        @keyframes scroll-up { from { transform: translateY(0); } to { transform: translateY(-50%); } }
        @keyframes scroll-down { from { transform: translateY(-50%); } to { transform: translateY(0); } }
        .animate-scroll-up { animation: scroll-up linear infinite; }
        .animate-scroll-down { animation: scroll-down linear infinite; }
        input::placeholder { -webkit-text-fill-color: rgba(255, 255, 255, 0.5) !important; color: rgba(255, 255, 255, 0.3) !important; opacity: 1; }
      `}</style>
    </div>
  );
};

export default Login;
