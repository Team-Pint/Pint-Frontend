import type { ChangeEvent } from "react";
import type React from "react";

interface Props {
    previewImage: string;
    handleImageChange: (e: ChangeEvent<HTMLInputElement>) => void;
    onReset: () => void;
    onNext: () => void;
}

const PhotoSelectStep: React.FC<Props> = ({ previewImage, handleImageChange, onReset, onNext }) => {
    return (
        <div className="flex flex-1 items-center justify-center p-12">
            {!previewImage ? (
                // 사진 선택 전
                <div className="flex w-full max-w-md flex-col items-center justify-center rounded-xl border-1 border-black py-20 group cursor-pointer">
                    <input type="file" accept="image/*" onChange={handleImageChange} id="file-input" className="hidden" />
                    <label htmlFor="file-input" className="cursor-pointer flex flex-col items-center w-full">
                        <div className="mb-5 flex flex-col items-center">
                            <img src="/images/ic_upload.svg" alt="사진 업로드" className="w-8 h-8 mb-3" />
                            <p className="text-xs tracking-tighter">Support for JPG, PNG files</p>
                        </div>
                        <span className="rounded-full bg-black px-8 py-2.5 text-sm text-white">Choose Photo</span>
                    </label>
                </div>
            ) : (
                // 사진 선택 후
                <div className="flex flex-col items-center w-full max-w-lg">
                    {/* 미리보기 사진 */}
                    <div className="mb-3 overflow-hidden">
                        <img src={previewImage} alt="미리보기" className="w-full object-contain max-h-[400px]" />
                    </div>

                    {/* 사진 재선택 버튼 */}
                    <button
                        onClick={onReset}
                        className="flex items-center text-xs text-gray-400 mb-8 cursor-pointer">
                        Change Photo
                    </button>

                    {/* 다음 단계 버튼 */}
                    <button
                        onClick={onNext}
                        className="rounded-full bg-black px-14 py-2 text-sm text-white cursor-pointer"
                    >
                        Next
                    </button>
                </div>
            )}
        </div>
    );
}

export default PhotoSelectStep;