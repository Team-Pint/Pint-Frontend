import React, { useEffect, useState, type ChangeEvent } from "react";
import type { PostUpload } from "../../types/PostUpload";
import { useNavigate } from "react-router-dom";
import PhotoSelectStep from "./PhotoSelectStep";
import InfoInputStep from "./InfoInputStep";

interface Props {
    isOpen: boolean;
    onClose: () => void;
}

const PostUploadModal: React.FC<Props> = ({ isOpen, onClose }) => {

    const navigate = useNavigate();
    const [step, setStep] = useState<1 | 2>(1); // 단계별 모달
    const [data, setData] = useState<PostUpload>({ // 포스트 데이터
        imageFile: null,
        previewImage: '',
        location: '',
        filterFile: null,
        description: ''
    });
    const [isLoading, setIsLoading] = useState(false); // 업로드 시 로딩 상태

    // 모달 닫으면 메모리에 저장된 미리보기 사진 임시 URL 삭제
    useEffect(() => {
        return () => {
            if (data.previewImage) URL.revokeObjectURL(data.previewImage);
        };
    }, [data.previewImage]);

    if (!isOpen) return null;

    // 이미지 변경
    const handleImageChange = (e: ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0];

        if (file) {
            if (data.previewImage) URL.revokeObjectURL(data.previewImage); // 기존 사진 임시 URL 삭제
            setData({ ...data, imageFile: file, previewImage: URL.createObjectURL(file) }); // 미리보기용 임시 URL
        }
    };

    // 포스트 업로드
    const handleUpload = () => {
        setIsLoading(true);

        // API 연동 코드 추가'

        navigate('/profile/1');
        onClose();
    }

    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/70 p-4 backdrop-blur-sm">
            <div className="relative w-full max-w-4xl overflow-hidden rounded-xl bg-white shadow-2xl animate-in fade-in zoom-in duration-300">
                {/* 닫기 버튼 */}
                <button
                    className="absolute right-8 top-8 z-10 text-gray-400 cursor-pointer"
                    onClick={onClose}>
                    <img src="/images/ic_close.svg" alt="닫기" className="w-6 h-6" />
                </button>

                {/* 단계별 모달창 */}
                <div className="flex min-h-[550px] w-full">
                    {/* 1단계 (사진 선택) */}
                    {step === 1 && (
                        <PhotoSelectStep
                            previewImage={data.previewImage}
                            handleImageChange={handleImageChange}
                            onReset={() => setData({ ...data, previewImage: '', imageFile: null })}
                            onNext={() => setStep(2)}
                        />
                    )}

                    {/* 2단계 (정보 입력) */}
                    {step === 2 && (
                        <InfoInputStep
                            data={data}
                            setData={setData}
                            isLoading={isLoading}
                            handleUpload={handleUpload}
                        />
                    )}
                </div>
            </div>
        </div >
    );
}

export default PostUploadModal;