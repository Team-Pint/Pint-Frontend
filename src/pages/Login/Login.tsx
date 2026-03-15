import React, { useEffect, useMemo, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { AUTH_STYLES } from '../../styles/authStyles';
import { signIn, signUp, checkEmail } from '../../api/authApi';

// 스크롤 이미지 컬럼 컴포넌트
const ScrollingColumn = ({ images, speed, direction, className }: { images: any[], speed: string, direction: 'up' | 'down', className: string }) => (
  <div className={`${className} h-full overflow-hidden relative`}>
    <div
      className={`flex flex-col gap-6 w-full ${direction === 'up' ? 'animate-scroll-up' : 'animate-scroll-down'}`}
      style={{ animationDuration: speed }}
    >
      {[...images, ...images].map((img, idx) => (
        <img
          key={idx}
          src={img.url}
          className={`${AUTH_STYLES.image} ${img.h} w-full flex-shrink-0 object-cover`}
          alt=""
        />
      ))}
    </div>
  </div>
);

const Login: React.FC = () => {
  const [isLogin, setIsLogin] = useState(true);
  const [isEmailChecked, setIsEmailChecked] = useState(false);
  const navigate = useNavigate();

  // 입력값 상태 관리
  const [formData, setFormData] = useState({
    email: '',
    pw: '',
    verifyPw: '',
    username: ''
  });

  const {
    container, leftSection, logo, formWrapper, inputGroup,
    label, input, button, toggleText, rightSection, column
  } = AUTH_STYLES;

  useEffect(() => {
    const isUserLoggedIn = localStorage.getItem('userId');
    if (isUserLoggedIn) {
      navigate('/home', { replace: true });
    }
  }, [navigate]);

  // 입력값 유효성 검사
  const isFormValid = useMemo(() => {
    const { email, pw, verifyPw, username } = formData;
    if (isLogin) return !!(email && pw);
    return !!(email && pw && verifyPw && username && isEmailChecked);
  }, [formData, isLogin, isEmailChecked])

  // 입력값 변경 핸들러
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));

    if (name === 'email') {
      setIsEmailChecked(false);
    }
  };

  // 이메일 중복 확인
  const handleCheckEmail = async () => {
    if (!formData.email) return alert("이메일을 입력해주세요.");
    try {
      const res = await checkEmail(formData.email);
      const isAvaliable = res.code === 200 && res.data.isAvailable;

      alert(isAvaliable ? "사용 가능한 이메일입니다." : "이미 사용 중인 이메일입니다.");
      setIsEmailChecked(isAvaliable);
    } catch (err: any) {
      alert(err.response?.data?.message || "오류가 발생했습니다.");
      setIsEmailChecked(false);
    }
  };

  // 로그인 / 회원가입 제출 연동
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      if (isLogin) {
        // 로그인 시도
        const res = await signIn({ email: formData.email, password: formData.pw });

        if (res.code === 200 || res.message === "Success") {
          const userId = res.data.userid ?? res.data.userId;

          // 이후 요청을 위해 저장 (메모리나 보안 스토리지 권장)
          //           sessionStorage.setItem('csrfToken', csrfToken);
          if (userId !== undefined && userId !== null) {
            localStorage.setItem('userId', String(userId));
          }
          alert("로그인 성공!");
          navigate('/home', { replace: true });
        } else {
          alert("로그인 실패");
        }
      } else {
        // 회원가입 시도
        if (formData.pw !== formData.verifyPw) return alert("비밀번호가 일치하지 않습니다.");

        const res = await signUp({
          email: formData.email,
          password: formData.pw,
          username: formData.username
        });

        if (res.code === 200 || res.message === "Success") {
          alert("회원가입이 완료되었습니다! 로그인을 진행해주세요.");
          setIsLogin(true); // 로그인 모드로 전환
        } else {
          alert("회원가입 실패");
        }
      }
    } catch (err: any) {
      alert(err.response?.data?.message || "오류가 발생했습니다. 다시 시도해주세요.");
    }
  };

  const mockImages = [
    { h: "h-[300px]", url: "https://picsum.photos/seed/1/500/800" },
    { h: "h-[220px]", url: "https://picsum.photos/seed/2/500/500" },
    { h: "h-[400px]", url: "https://picsum.photos/seed/3/500/1000" },
    { h: "h-[280px]", url: "https://picsum.photos/seed/4/500/650" },
    { h: "h-[350px]", url: "https://picsum.photos/seed/5/500/750" },
  ];

  return (
    <div className={container}>
      <div className={leftSection}>
        <h1 className={logo}>Pint.</h1>

        <form onSubmit={handleSubmit} className={`${formWrapper} flex flex-col gap-4`}>
          {/* Email Address */}
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
              />
              <button
                type="button"
                onClick={handleCheckEmail}
                className={`absolute right-0 bottom-2 text-[10px] bg-white text-black px-4 py-1 rounded-full border border-black transition-all duration-300
                  ${isLogin ? 'opacity-0 pointer-events-none' : 'opacity-100'} 
                  ${isEmailChecked ? 'bg-green-500 text-white border-green-500' : 'bg-white text-black border-white hover:bg-black hover:text-white'}`}>
                {isEmailChecked ? "Verified" : "Check Availability"}
              </button>
            </div>
          </div>

          {/* Password */}
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
            />
          </div>

          {/* 회원가입 전용 필드 */}
          <div className={`flex flex-col gap-4 transition-all duration-500 ease-in-out overflow-hidden ${isLogin ? 'max-h-0 opacity-0' : 'max-h-[250px] opacity-100'}`}>
            <div className={inputGroup}>
              <label className={label}>VERIFY PASSWORD</label>
              <input
                name="verifyPw"
                type="password"
                className={input}
                placeholder="••••••••"
                value={formData.verifyPw}
                onChange={handleChange}
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
              />
            </div>
          </div>

          {/* 버튼 섹션 */}
          <div className="flex flex-col gap-4 mt-6">
            <button type="submit" className={`${button} ${!isFormValid ? 'cursor-not-allowed grayscale' : ''}`} disabled={!isFormValid}>
              {isLogin ? "SIGN IN" : "SIGN UP"}
            </button>

            <p className={toggleText} onClick={() => {
              setIsLogin(!isLogin)
              setIsEmailChecked(false);
            }}>
              {isLogin ? "Don't have an account? Sign Up" : "Already have an account? Log In"}
            </p>
          </div>
        </form>
      </div>

      {/* 오른쪽 사진 스크롤 섹션: 💡 column 변수를 활용하여 경고 해결 */}
      <div className={`${rightSection} gap-6 px-6`}>
        <ScrollingColumn images={mockImages} speed="50s" direction="up" className={column} />
        <ScrollingColumn images={[...mockImages].reverse()} speed="65s" direction="down" className={column} />
        <ScrollingColumn images={mockImages} speed="45s" direction="up" className={column} />
      </div>

      <style>{`
        @keyframes scroll-up {
          from { transform: translateY(0); }
          to { transform: translateY(-50%); }
        }
        @keyframes scroll-down {
          from { transform: translateY(-50%); }
          to { transform: translateY(0); }
        }
        .animate-scroll-up { animation: scroll-up linear infinite; }
        .animate-scroll-down { animation: scroll-down linear infinite; }
      `}</style>
    </div>
  );
};

export default Login;
