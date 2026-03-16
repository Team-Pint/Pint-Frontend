import React, { useEffect, useRef, useState } from 'react';
import { Search, Upload } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { HEADER_STYLES } from '../../styles/headerStyles';
import PostUploadModal from '../PostUploadModal/PostUploadModal';
import HeaderNav from './HeaderNav';
import type { SearchUser } from '../../types/SearchResponse';
import { searchApi } from '../../api/searchApi';

interface HeaderProps {
  myId?: number;
}

const Header: React.FC<HeaderProps> = ({ myId }) => {
  const navigate = useNavigate();
  const [isModalOpen, setIsModalOpen] = useState(false);

  const [keyword, setKeyword] = useState('');
  const [userList, setUserList] = useState<SearchUser[]>([]);
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [isFocused, setIsFocused] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const dropdownRef = useRef<HTMLDivElement>(null);

  const {
    headerRoot,
    leftSection,
    logo,
    searchWrapper,
    searchInput,
    rightSection,
    uploadBtn,
    dropdownContainer,
    dropdownItem,
    dropdownImage,
    dropdownText,
    dropdownMessage
  } = HEADER_STYLES;

  // 실시간 검색 (Debounce)
  useEffect(() => {
    if (!keyword.trim()) {
      setUserList([]);
      setIsDropdownOpen(false);
      return;
    }

    setIsLoading(true);

    const timer = setTimeout(async () => {
      const results = await searchApi(keyword);
      setUserList(results);
      setIsDropdownOpen(true);
      setIsLoading(false);
    }, 400);

    return () => clearTimeout(timer);
  }, [keyword]);

  // 외부 클릭 시 검색창 닫기
  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(e.target as Node)) {
        setIsDropdownOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const handleLogoClick = () => navigate('/home');
  const openModal = () => setIsModalOpen(true);
  const closeModal = () => setIsModalOpen(false);

  // 검색된 사용자 클릭 시 프로필로 이동
  const handleUserClick = (userId: number) => {
    navigate(`/profile/${userId}`);
    setIsDropdownOpen(false);
    setKeyword('');
  };

  return (
    <>
      <header className={headerRoot}>
        <div className={leftSection}>
          <h1 className={logo} onClick={handleLogoClick}>Pint.</h1>

          <div className={`${searchWrapper} border-b-0`} ref={dropdownRef}>
            <input
              type="text"
              placeholder="Search"
              className={searchInput}
              value={keyword}
              onChange={(e) => setKeyword(e.target.value)}
              onFocus={() => {
                setIsFocused(true);
                if (keyword) setIsDropdownOpen(true);
              }}
              onBlur={() => setIsFocused(false)}
            />
            <Search size={16} />

            <div 
              className={`absolute bottom-0 left-0 h-[1.5px] bg-black transition-all duration-300 ease-in-out
                ${isFocused ? 'w-full' : 'w-0'}`} 
            />
            
            <div className="absolute bottom-0 left-0 h-[1.5px] w-full bg-black/10 -z-10" />

            {isDropdownOpen && (
              <div className={dropdownContainer}>
                {isLoading ? (
                  <div className={dropdownMessage}>검색 중...</div>
                ) : userList.length > 0 ? (
                  userList.map((user) => (
                    <div
                      key={user.userId}
                      className={dropdownItem}
                      onClick={() => handleUserClick(user.userId)}
                    >
                      {user.profileImage ? (
                        <img src={user.profileImage} alt={user.username} className={dropdownImage} />
                      ) : (
                        <img src="/images/ic_default_profile.svg" alt={user.username} className={dropdownImage} />
                      )}

                      <span className={dropdownText}>{user.username}</span>
                    </div>
                  ))
                ) : (
                  // 결과가 없을 때 보여주는 UI
                  <div className={dropdownMessage}>검색 결과가 없습니다.</div>
                )}
              </div>
            )}
          </div>
        </div>

        <div className={rightSection}>
          <button className={uploadBtn} onClick={openModal}>
            <Upload size={12} strokeWidth={3} /> Upload
          </button>

          <HeaderNav myId={myId} />
        </div>
      </header>

      {isModalOpen && (
        <PostUploadModal
          isOpen={isModalOpen}
          onClose={closeModal}
        />
      )}
    </>
  );
};

export default Header;
