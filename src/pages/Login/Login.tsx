import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { AUTH_STYLES } from '../../constants/authStyles';

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
  const navigate = useNavigate();

  const { 
    container, leftSection, logo, formWrapper, inputGroup, 
    label, input, button, toggleText, rightSection, column 
  } = AUTH_STYLES;

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
        
        {/* 💡 통일성: 모든 자식 요소 간격을 gap-4(16px)로 통일 */}
        <div className={`${formWrapper} flex flex-col gap-4`}>
          
          {/* Email Address */}
          <div className={inputGroup}>
            <label className={label}>EMAIL ADDRESS</label>
            <div className="relative">
              <input type="email" className={`${input} w-full`} placeholder="example@pint.com" />
              {/* 시안 기반 중복 확인 버튼 */}
              <button className={`absolute right-0 bottom-2 text-[10px] border border-white/40 px-3 py-1 rounded-full transition-all duration-300 ${isLogin ? 'opacity-0 pointer-events-none' : 'opacity-100 hover:bg-white hover:text-black'}`}>
                Check Availability
              </button>
            </div>
          </div>

          {/* Password */}
          <div className={inputGroup}>
            <label className={label}>PASSWORD</label>
            <input type="password" className={input} placeholder="••••••••" />
          </div>

          {/* 💡 회원가입 확장 섹션: gap-4를 동일하게 적용하여 Password와 연결성을 강화 */}
          <div className={`flex flex-col gap-4 transition-all duration-500 ease-in-out overflow-hidden ${isLogin ? 'max-h-0 opacity-0' : 'max-h-[200px] opacity-100'}`}>
            <div className={inputGroup}>
              <label className={label}>VERIFY PASSWORD</label>
              <input type="password" className={input} placeholder="••••••••" />
            </div>
            <div className={inputGroup}>
              <label className={label}>USERNAME</label>
              <input type="text" className={input} placeholder="Your unique name" />
            </div>
          </div>

          {/* 버튼 섹션 */}
          <div className="flex flex-col gap-4 mt-6">
            <button className={button} onClick={() => navigate('/')}>
              {isLogin ? "SIGN IN" : "SIGN UP"}
            </button>

            <p className={toggleText} onClick={() => setIsLogin(!isLogin)}>
              {isLogin ? "Don't have an account? Sign Up" : "Already have an account? Log In"}
            </p>
          </div>
        </div>
      </div>

      {/* 오른쪽 사진 스크롤 섹션 */}
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