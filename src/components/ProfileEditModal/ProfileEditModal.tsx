import React, { useState } from "react";
import { X, Camera, User } from "lucide-react";
import { MODAL_STYLES } from "../../styles/profileStyles";
import type { ProfileResponse } from "../../types/ProfileData";

type ProfileFormData = Omit<ProfileResponse, "profileImage">;

interface ProfileEditModalProps {
  isOpen: boolean;
  onClose: () => void;
  data: ProfileFormData;
  onSave: (
    updatedData: Partial<ProfileFormData> & { profileImage?: File },
  ) => void;
  isSaving?: boolean;
}

const ProfileEditModal: React.FC<ProfileEditModalProps> = ({
  isOpen,
  onClose,
  data,
  onSave,
  isSaving = false,
}) => {
  // 1. 초기 데이터 구조 분해 및 상태 초기화
  const [tempData, setTempData] = useState<ProfileFormData>(data);
  const [tempImageFile, setTempImageFile] = useState<File | null>(null);
  const [previewImageUrl, setPreviewImageUrl] = useState(
    data.profileImageUrl ?? "",
  );

  // 2. 렌더링에 필요한 스타일 및 데이터 구조 분해
  const {
    overlay,
    content,
    closeBtn,
    profileImgWrapper,
    profileImg,
    profileImgFallback,
    cameraBtn,
    input,
    textarea,
    saveBtn,
  } = MODAL_STYLES;

  const { username, city, introduction } = tempData;
  const hasProfileImage = Boolean(previewImageUrl?.trim());

  if (!isOpen) return null;

  // 이미지 변경 핸들러
  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const imageUrl = URL.createObjectURL(file);
      setTempImageFile(file);
      setPreviewImageUrl(imageUrl);
    }
  };

  // 입력 필드 변경 핸들러
  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
  ) => {
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
          {hasProfileImage ? (
            <img
              src={previewImageUrl}
              className={profileImg}
              alt="Profile Preview"
            />
          ) : (
            <div className={profileImgFallback}>
              <User size={36} />
            </div>
          )}
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
            name="introduction"
            value={introduction}
            onChange={handleChange}
            className={textarea}
            placeholder="Introduction"
          />
        </div>

        <button
          className={saveBtn}
          onClick={() =>
            onSave(
              tempImageFile
                ? { ...tempData, profileImage: tempImageFile }
                : tempData,
            )
          }
          disabled={isSaving}
        >
          {isSaving ? "saving..." : "save"}
        </button>
      </div>
    </div>
  );
};

export default ProfileEditModal;
