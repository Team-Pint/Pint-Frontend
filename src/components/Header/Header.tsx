import React, { useState } from 'react';
import { Search, Upload } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { HEADER_STYLES } from '../../constants/headerStyles';
import PostUploadModal from '../PostUploadModal/PostUploadModal';
// 💡 HeaderNav를 가져옵니다!
import HeaderNav from './HeaderNav';

interface HeaderProps {
  myId?: number;
}

const Header: React.FC<HeaderProps> = ({ myId = 1 }) => {
  const navigate = useNavigate();
  const [isModalOpen, setIsModalOpen] = useState(false);

  const {
    headerRoot,
    leftSection,
    logo,
    searchWrapper,
    searchInput,
    rightSection,
    uploadBtn,
  } = HEADER_STYLES;

  const handleLogoClick = () => navigate('/');
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

          {/* 💡 기존 <img> 태그 대신 HeaderNav를 넣습니다! */}
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