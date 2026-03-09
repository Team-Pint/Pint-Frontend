import React from 'react';
import { X, Pencil, Trash2, Info } from 'lucide-react';
import { type PostDetail } from '../../types/profile';
import { cn } from '../../lib/utils';

interface DetailModalProps {
  post: PostDetail;
  onClose: () => void;
}

const DetailModal: React.FC<DetailModalProps> = ({ post, onClose }) => {
  // --- 스타일 객체 정의 (피그마 디자인 반영) ---
  const styles = {
    // 1. 전체 오버레이 배경: 피그마처럼 아주 어둡고 불투명하게 조정
    overlayBase: "fixed inset-0 z-[100] flex items-center justify-center p-4",
    backdrop: "absolute inset-0 bg-black/65 backdrop-blur-sm", 
    
    // 2. 모달 컨텐츠 컨테이너
    contentBase: "relative bg-white w-full max-w-6xl h-[85vh] flex rounded-sm shadow-2xl overflow-hidden animate-in fade-in zoom-in duration-300",
    
    // 3. 왼쪽 섹션 (정보 영역): 기존 흰색 배경 유지
    sideInfo: "w-[38%] p-14 flex flex-col justify-between bg-white border-r border-gray-100",
    userBar: "flex items-center gap-4 mb-14",
    userAvatar: "w-10 h-10 rounded-full object-cover",
    userName: "font-bold text-sm tracking-tight uppercase",
    infoGroup: "space-y-8",
    label: "text-[10px] font-bold uppercase text-gray-400 mb-2 tracking-[0.2em]",
    value: "text-sm text-gray-900 font-medium",
    descText: "text-sm text-gray-600 leading-relaxed font-light",
    moreBtn: "flex items-center gap-2 text-[10px] text-gray-400 border border-gray-200 rounded-full px-5 py-2.5 w-fit hover:bg-black hover:text-white hover:border-black transition-all uppercase tracking-widest",
    
    // 4. 오른쪽 섹션 (이미지 영역): 피그마처럼 Deep Black 배경으로 변경
    imageStage: "flex-1 bg-[#EFEFEE] flex items-center justify-center p-12 relative", 
    closeBtn: "absolute top-8 right-8 text-white/50 hover:text-white transition-colors z-10",
    mainImg: "max-w-full max-h-full object-contain shadow-2xl shadow-black/50",
    
    // 5. 관리 버튼 바 스타일: 어두운 배경에서 잘 보이도록 조정
    adminBar: "absolute bottom-4 flex gap-8 justify-center w-full",
    editBtn: "flex items-center gap-2 text-[10px] uppercase tracking-[0.2em] font-bold text-gray-600 hover:text-black transition",
    deleteBtn: "flex items-center gap-2 text-[10px] uppercase tracking-[0.2em] font-bold text-red-500/50 hover:text-red-500 transition",
  };

  const { overlayBase, backdrop, contentBase, sideInfo, userBar, userAvatar, userName, infoGroup, label, value, descText, moreBtn, imageStage, closeBtn, mainImg, adminBar, editBtn, deleteBtn } = styles;

  const { profileImage, username, location, camera, description, imgUrl, isWriter } = post;

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
                <h4 className={label}>Location</h4>
                <p className={value}>{location}</p>
              </div>
              <div>
                <h4 className={label}>Camera</h4>
                <p className={value}>{camera}</p>
              </div>
              <div>
                <h4 className={label}>Description</h4>
                <p className={descText}>{description}</p>
              </div>
            </div>
          </div>
          
          <button className={moreBtn}>
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
          <img src={imgUrl} className={mainImg} alt="focused view" />
          
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
    </div>
  );
};

export default DetailModal;