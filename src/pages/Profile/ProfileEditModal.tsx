import React, { useState } from 'react';
import { X, Camera } from 'lucide-react';
import { MODAL_STYLES } from '../../constants/styles';

interface ProfileEditModalProps {
  isOpen: boolean;
  onClose: () => void;
  data: any;
  onSave: (updatedData: any) => void;
}

const ProfileEditModal: React.FC<ProfileEditModalProps> = ({ 
  isOpen, 
  onClose, 
  data, 
  onSave 
}) => {
  // 1. 초기 데이터 구조 분해 및 상태 초기화
  const [tempData, setTempData] = useState({ ...data });

  // 2. 렌더링에 필요한 스타일 및 데이터 구조 분해
  const { 
    overlay, content, closeBtn, profileImgWrapper, 
    profileImg: profileImgStyle, cameraBtn, input, textarea, saveBtn 
  } = MODAL_STYLES;

  const { username, city, description, profileImage } = tempData;

  if (!isOpen) return null;

  // 이미지 변경 핸들러
  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const imageUrl = URL.createObjectURL(file);
      setTempData({ ...tempData, profileImage: imageUrl });
    }
  };

  // 입력 필드 변경 핸들러
  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setTempData({ ...tempData, [name]: value });
  };

  return (
    <div className={overlay} onClick={onClose}>
      <div className={content} onClick={(e) => e.stopPropagation()}>
        <button className={closeBtn} onClick={onClose}>
          <X size={24} />
        </button>

        <div className={profileImgWrapper}>
          <img 
            src={profileImage} 
            className={profileImgStyle} 
            alt="Profile Preview" 
          />
          <label className={cameraBtn}>
            <Camera size={16} />
            <input 
              type="file" 
              className="hidden" 
              accept="image/*" 
              onChange={handleImageChange} 
            />
          </label>
        </div>

        <div className="w-full flex flex-col space-y-4">
          <input 
            type="text" 
            name="username"
            value={username} 
            onChange={handleChange}
            className={input} 
            placeholder="Name"
          />
          <input 
            type="text" 
            name="city"
            value={city} 
            onChange={handleChange}
            className={input} 
            placeholder="Location"
          />
          <textarea 
            name="description"
            value={description} 
            onChange={handleChange}
            className={textarea} 
            placeholder="Description"
          />
        </div>

        <button 
          className={saveBtn} 
          onClick={() => onSave(tempData)}
        >
          save
        </button>
      </div>
    </div>
  );
};

export default ProfileEditModal;