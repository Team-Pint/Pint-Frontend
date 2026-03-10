import React from 'react';
import { Search, Upload } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { HEADER_STYLES as s } from '../../constants/headerStyles';

interface HeaderProps {
  myId?: number; // 로그인한 내 ID (나중에 백엔드 연동 시 사용)
}

const Header: React.FC<HeaderProps> = ({ myId = 1 }) => {
  const navigate = useNavigate();

  return (
    <header className={s.headerRoot}>
      <div className={s.leftSection}>
        {/* 로고 클릭 시 홈으로 이동 */}
        <h1 className={s.logo} onClick={() => navigate('/')}>Pint.</h1>
        
        <div className={s.searchWrapper}>
          <Search size={14} className="text-gray-400" />
          <input type="text" placeholder="Search" className={s.searchInput} />
        </div>
      </div>

      <div className={s.rightSection}>
        {/* 업로드 클릭 시 업로드 페이지로 이동 */}
        <button className={s.uploadBtn} onClick={() => navigate('/upload')}>
          <Upload size={12} strokeWidth={3} /> Upload
        </button>
        
        {/* 아바타 클릭 시 내 프로필로 이동 */}
        <img 
          src="https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=500" 
          className={s.avatar} 
          alt="profile"
          onClick={() => navigate(`/profile/${myId}`)}
        />
      </div>
    </header>
  );
};

export default Header;