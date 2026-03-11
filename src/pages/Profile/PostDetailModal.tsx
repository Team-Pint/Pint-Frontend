import React, { useState } from 'react';
import { X, Pencil, Trash2, Info } from 'lucide-react';
import { cn } from '../../lib/utils';
import { DETAIL_MODAL_STYLES as styles } from '../../constants/styles';
import type { PostDetail } from '../../types/ProfileData';
import MoreInfoModal from '../../components/MoreInfoModal/MoreInfoModal';

interface DetailModalProps {
  post: PostDetail;
  onClose: () => void;
}

const DetailModal: React.FC<DetailModalProps> = ({ post, onClose }) => {
  const { profileImage, username, location, camera, description, imgUrl, isWriter } = post;
  const { overlayBase, backdrop, contentBase, sideInfo, userBar, userAvatar, userName, infoGroup, label, value, descText, moreBtn, imageStage, closeBtn, imageBorder, mainImg, adminBar, editBtn, deleteBtn } = styles;

  const [isPresetOpen, setIsPresetOpen] = useState(false);

  return (
    <div className={cn(overlayBase)}>
      {/* 배경 클릭 시 닫기 */}
      <div className={backdrop} onClick={onClose} />

      <div className={cn(contentBase)}>
        {/* Left Section: Information */}
        <div className={sideInfo}>
          <div>
            <div className={userBar}>
              <img src={profileImage} className={userAvatar} alt={username} />
              <span className={userName}>{username}</span>
            </div>

            <div className={infoGroup}>
              <div>
                <h4 className={label}>장소</h4>
                <p className={value}>{location}</p>
              </div>
              <div>
                <h4 className={label}>카메라</h4>
                <p className={value}>{camera}</p>
              </div>
              <div>
                <h4 className={label}>설명</h4>
                <p className={descText}>{description}</p>
              </div>
            </div>
          </div>

          <button className={moreBtn} onClick={() => setIsPresetOpen(true)}>
            <Info size={14} strokeWidth={1.5} /> More Info
          </button>
        </div>

        {/* Right Section: Visual Content (피그마 디자인 반영) */}
        <div className={imageStage}>
          {/* 하얀색 닫기 버튼 */}
          <button className={closeBtn} onClick={onClose}>
            <X size={28} strokeWidth={1.5} />
          </button>

          {/* 메인 이미지 */}
          <div className={imageBorder}>
            <img src={imgUrl} className={mainImg} alt="focused view" />
          </div>
          
          {/* 작성자일 경우 수정/삭제 버튼 노출 */}
          {isWriter && (
            <div className={adminBar}>
              <button className={editBtn}>
                <Pencil size={12} strokeWidth={2.5} /> Edit
              </button>
              <button className={deleteBtn}>
                <Trash2 size={12} strokeWidth={2.5} /> Delete
              </button>
            </div>
          )}
        </div>
      </div>

      {isPresetOpen && (
        <MoreInfoModal
          imgUrl={imgUrl}
          onClose={() => setIsPresetOpen(false)}
        />
      )}
    </div>
  );
};

export default DetailModal;