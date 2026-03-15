import React, { useState, useRef, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { User, LogOut } from 'lucide-react';
import { HEADER_STYLES } from '../../styles/headerStyles';
import { cn } from '../../lib/utils';
import { Header_NAV_STYLES } from '../../styles/headerNavStyles';
import { signOut } from '../../api/authApi';
import { headerApi } from '../../api/headerApi';
import { useUserStore } from '../../store/useUserStore';

const HeaderNav: React.FC<{ myId?: number }> = ({ myId }) => {
  const [isOpen, setIsOpen] = useState(false);
  
  const { profileImageUrl, setProfileImageUrl } = useUserStore();

  const dropdownRef = useRef<HTMLDivElement>(null);
  const navigate = useNavigate();

  // 1. 외부 스타일 객체(Header_NAV_STYLES)에서 완전 구조 분해 할당
  const {
    container, avatarBtn, avatarImg, dropdownCard,
    menuList, menuItem, menuDivider, logoutText,
    iconDefault
  } = Header_NAV_STYLES;

  // 2. 공통 아바타 스타일 및 스토어 데이터 추출
  const { avatar: sharedAvatarStyle } = HEADER_STYLES;

  useEffect(() => {
    const fetchProfileImage = async () => {
      try {
        const response = await headerApi();
        if (response.code === 200 || response.message === "Success") {
          setProfileImageUrl(response.data.profileImgUrl);
        }
      } catch (error) {
        console.error("프로필 로드 실패: ", error);
      }
    }
    fetchProfileImage();
  }, [setProfileImageUrl]);

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
    if (!myId || !Number.isInteger(myId) || myId <= 0) {
      alert("로그인 정보가 없습니다. 로그인 후 이용해주세요.");
      navigate("/login");
      return;
    }
    navigate(`/profile/${myId}`);
    setIsOpen(false);
  };

  const handleLogout = async () => {
    try {
      await signOut();

      localStorage.removeItem("userId");
      localStorage.clear();
      sessionStorage.clear();

      alert("로그아웃 성공");
      window.location.replace('/login');
    } catch (error) {
      console.error("통신 실패: ", error);
    }
  };

  return (
    <div className={container} ref={dropdownRef}>
      {/* 아바타 버튼 영역 */}
      <div
        className={cn(sharedAvatarStyle, avatarBtn)}
        onClick={() => setIsOpen(!isOpen)}
      >
        {profileImageUrl && profileImageUrl.trim() !== "" ? (
          <img src={profileImageUrl} className={avatarImg} alt="프로필 이미지"/>
        ) :
          <img src="/images/ic_default_profile.svg" className={avatarImg} alt="프로필 이미지" />
        }
      </div>

      {/* 드롭다운 메뉴 영역 */}
      {isOpen && (
        <div className={dropdownCard}>
          <ul className={menuList}>
            <li className={menuItem} onClick={handleProfileClick}>
              <User size={18} className={iconDefault} />
              My Profile
            </li>

            <div className={menuDivider} />

            <li className={cn(menuItem, logoutText)} onClick={handleLogout}>
              <LogOut size={18} className={iconDefault} />
              Log out
            </li>
          </ul>
        </div>
      )}
    </div>
  );
};

export default HeaderNav;
