import React, { useState, useRef, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { User, LogOut } from 'lucide-react';

// 💡 분리한 스타일 파일들을 가져옵니다.
import { HEADER_STYLES } from '../../constants/headerStyles';
import { Header_NAV_STYLES } from '../../constants/HeaderNavStyles'; 
import { useUserStore } from '../../store/useUserStore';
import { cn } from '../../lib/utils';

const HeaderNav: React.FC<{ myId: number }> = ({ myId }) => {
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);
  const navigate = useNavigate();

  // 1. 외부 스타일 객체(Header_NAV_STYLES)에서 완전 구조 분해 할당
  const { 
    container, avatarBtn, avatarImg, dropdownCard, 
    menuList, menuItem, menuDivider, logoutText, 
    iconDefault, avatarPlaceholder 
  } = Header_NAV_STYLES;

  // 2. 공통 아바타 스타일 및 스토어 데이터 추출
  const { avatar: sharedAvatarStyle } = HEADER_STYLES;
  const { profileImage } = useUserStore((state) => state.myProfile);

  // 3. 드롭다운 외부 클릭 시 닫기 로직
  useEffect(() => {
    const handleClickOutside = ({ target }: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(target as Node)) {
        setIsOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  // 4. 이벤트 핸들러
  const handleProfileClick = () => {
    navigate(`/profile/${myId}`);
    setIsOpen(false);
  };

  const handleLogout = () => {
    // 세션 방식이라면 추후 로그아웃 API 호출로 변경 권장
    localStorage.removeItem('accessToken'); 
    navigate('/login');
  };

  return (
    <div className={container} ref={dropdownRef}>
      {/* 아바타 버튼 영역 */}
      <div 
        className={cn(sharedAvatarStyle, avatarBtn)}
        onClick={() => setIsOpen(!isOpen)}
      >
        {profileImage ? (
          <img src={profileImage} className={avatarImg} alt="profile" />
        ) : (
          <User size={18} className={avatarPlaceholder} />
        )}
      </div>

      {/* 드롭다운 메뉴 영역 */}
      {isOpen && (
        <div className={dropdownCard}>
          <ul className={menuList}>
            <li className={menuItem} onClick={handleProfileClick}>
              <User size={18} className={iconDefault} /> 
              Your Profile
            </li>
            
            <div className={menuDivider} />
            
            <li className={cn(menuItem, logoutText)} onClick={handleLogout}>
              <LogOut size={18} className={iconDefault} /> 
              Logout
            </li>
          </ul>
        </div>
      )}
    </div>
  );
};

export default HeaderNav;