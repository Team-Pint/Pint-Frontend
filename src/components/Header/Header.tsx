import React, { useState } from 'react';
import { Search, Upload } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { HEADER_STYLES } from '../../constants/headerStyles';
import PostUploadModal from '../PostUploadModal/PostUploadModal';

interface HeaderProps {
  myId?: number;
}

const Header: React.FC<HeaderProps> = ({ myId = 1 }) => {
  const navigate = useNavigate();

  // 1. 상태 관리 구조 분해 할당
  const [isModalOpen, setIsModalOpen] = useState(false);

  // 2. 스타일 상수 완벽 구조 분해 할당
  const {
    headerRoot,
    leftSection,
    logo,
    searchWrapper,
    searchInput,
    rightSection,
    uploadBtn,
    avatar,
  } = HEADER_STYLES;

  // 3. 핸들러 함수 분리 (JSX를 더 깔끔하게 유지)
  const handleLogoClick = () => navigate('/');
  const handleProfileClick = () => navigate(`/profile/${myId}`);
  const openModal = () => setIsModalOpen(true);
  const closeModal = () => setIsModalOpen(false);

  return (
    <>
      <header className={headerRoot}>
        <div className={leftSection}>
          <h1 className={logo} onClick={handleLogoClick}>Pint.</h1>

          <div className={searchWrapper}>
            <input type="text" placeholder="Search" className={searchInput} />
            <Search size={14} />
          </div>
        </div>

        <div className={rightSection}>
          <button className={uploadBtn} onClick={openModal}>
            <Upload size={12} strokeWidth={3} /> Upload
          </button>

          <img
            src="https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=500"
            className={avatar}
            alt="profile"
            onClick={handleProfileClick}
          />
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