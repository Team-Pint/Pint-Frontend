import React from 'react';
import { X, Pencil, Trash2, Info } from 'lucide-react';
import { type PostDetail } from '../../types/profile';
import { cn } from '../../lib/utils';

// 1. 컴포넌트가 받을 props 타입을 정확히 정의
interface DetailModalProps {
  post: PostDetail;
  onClose: () => void;
}

// 2. React.FC<DetailModalProps>를 사용하여 타입을 명시
const DetailModal: React.FC<DetailModalProps> = ({ post, onClose }) => {
  // --- 스타일 객체 정의 ---
  const styles = {
    overlayBase: "fixed inset-0 z-[100] flex items-center justify-center p-4",
    backdrop: "absolute inset-0 bg-black/80 backdrop-blur-sm",
    contentBase: "relative bg-white w-full max-w-6xl h-[85vh] flex rounded-sm shadow-2xl overflow-hidden",
    contentAnim: "animate-in fade-in zoom-in duration-300",
    
    // Left Section
    sideInfo: "w-[38%] p-14 flex flex-col justify-between bg-white border-r border-gray-100",
    userBar: "flex items-center gap-4 mb-14",
    userAvatar: "w-10 h-10 rounded-full object-cover",
    userName: "font-bold text-sm tracking-tight",
    
    infoGroup: "space-y-8",
    label: "text-[10px] font-bold uppercase text-gray-400 mb-2 tracking-[0.2em]",
    value: "text-sm text-gray-900 font-medium",
    descText: "text-sm text-gray-600 leading-relaxed font-light",
    
    moreBtn: "flex items-center gap-2 text-[10px] text-gray-400 border border-gray-200 rounded-full px-5 py-2.5 w-fit hover:bg-black hover:text-white hover:border-black transition-all uppercase tracking-widest",
    
    // Right Section
    imageStage: "flex-1 bg-[#0a0a0a] flex items-center justify-center p-12 relative",
    closeBtn: "absolute top-8 right-8 text-white/50 hover:text-white transition-colors",
    mainImg: "max-w-full max-h-full object-contain shadow-2xl shadow-black/50",
    
    adminBar: "absolute bottom-10 flex gap-8",
    editBtn: "flex items-center gap-2 text-[10px] uppercase tracking-[0.2em] font-bold text-white/40 hover:text-white transition",
    deleteBtn: "flex items-center gap-2 text-[10px] uppercase tracking-[0.2em] font-bold text-red-500/50 hover:text-red-500 transition",
  };

  // 스타일 구조 분해 할당
  const { 
    overlayBase, backdrop, contentBase, contentAnim, sideInfo, userBar, userAvatar, userName, 
    infoGroup, label, value, descText, moreBtn, imageStage, closeBtn, mainImg, 
    adminBar, editBtn, deleteBtn 
  } = styles;

  // 데이터 구조 분해 할당
  const { 
    profileImage, username, location, camera, description, imgUrl, isWriter 
  } = post;

  return (
    <div className={cn(overlayBase)}>
      <div className={backdrop} onClick={onClose} />
      
      <div className={cn(contentBase, contentAnim)}>
        {/* Left Section: Info */}
        <div className={sideInfo}>
          <div>
            <div className={userBar}>
              <img src={profileImage} className={userAvatar} alt="" />
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
            <Info size={14} /> More Info
          </button>
        </div>

        {/* Right Section: Image */}
        <div className={imageStage}>
          <button className={closeBtn} onClick={onClose}>
            <X size={28} strokeWidth={1.5} />
          </button>
          
          <img src={imgUrl} className={mainImg} alt="post" />
          
          {isWriter && (
            <div className={adminBar}>
              <button className={editBtn}>
                <Pencil size={12} /> Edit
              </button>
              <button className={deleteBtn}>
                <Trash2 size={12} /> Delete
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default DetailModal;