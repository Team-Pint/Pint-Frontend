import type { ChangeEvent } from "react";
import type React from "react";
import { PHOTO_SELECT_STEP } from "../../styles/postUploadStyles";

interface Props {
    previewImage: string;
    handleImageChange: (e: ChangeEvent<HTMLInputElement>) => void;
    onReset: () => void;
    onNext: () => void;
}

const PhotoSelectStep: React.FC<Props> = ({ previewImage, handleImageChange, onReset, onNext }) => {

    const { container, beforeSection, fileInput, label, iconSection, icon, iconText, chooseBtn, afterSection, previewSection, preview, changeBtn, nextBtn } = PHOTO_SELECT_STEP;

    return (
        <div className={container}>
            {!previewImage ? (
                // 사진 선택 전
                <div className={beforeSection}>
                    <input type="file" accept="image/*" onChange={handleImageChange} id="file-input" className={fileInput} />
                    <label htmlFor="file-input" className={label}>
                        <div className={iconSection}>
                            <img src="/images/ic_upload.svg" alt="사진 업로드" className={icon} />
                            <p className={iconText}>Support for JPG, PNG files</p>
                        </div>
                        <span className={chooseBtn}>Choose Photo</span>
                    </label>
                </div>
            ) : (
                // 사진 선택 후
                <div className={afterSection}>
                    {/* 미리보기 사진 */}
                    <div className={previewSection}>
                        <img src={previewImage} alt="미리보기" className={preview} />
                    </div>

                    {/* 사진 재선택 버튼 */}
                    <button
                        onClick={onReset}
                        className={changeBtn}>
                        Change Photo
                    </button>

                    {/* 다음 단계 버튼 */}
                    <button
                        onClick={onNext}
                        className={nextBtn}
                    >
                        Next
                    </button>
                </div>
            )}
        </div>
    );
}

export default PhotoSelectStep;