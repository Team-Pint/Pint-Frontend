import React, { useEffect, useRef, useState, type ChangeEvent } from "react";
import type { PostUpload } from "../../types/PostUpload";
import { useNavigate } from "react-router-dom";

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

    const filterInputRef = useRef<HTMLInputElement>(null); // 프리셋 파일 변경 감지

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

    // 프리셋 파일 삭제
    const handleRemoveFilterFile = (e: React.MouseEvent) => {
        e.preventDefault();
        e.stopPropagation();

        if (filterInputRef.current) {
            filterInputRef.current.value = "";
        }

        setData({ ...data, filterFile: null });
    }

    // 포스트 업로드
    const handleUpload = () => {
        setIsLoading(true);

        // API 연동 코드 추가'

        navigate('/profile');
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
                <div className="flex min-h-[550px]">
                    {/* 1단계 (사진 선택) */}
                    {step === 1 && (
                        <div className="flex w-full flex-col items-center justify-center p-12">
                            {!data.previewImage ? (
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
                                <div className="flex flex-col items-center w-full max-w-lg duration-300">
                                    {/* 미리보기 사진 */}
                                    <div className="mb-3 overflow-hidden">
                                        <img src={data.previewImage} alt="미리보기" className="w-full object-contain max-h-[400px]" />
                                    </div>

                                    {/* 사진 재선택 버튼 */}
                                    <button
                                        onClick={() => setData({ ...data, previewImage: '', imageFile: null })}
                                        className="flex items-center text-xs text-gray-400 mb-8 cursor-pointer">
                                        Change Photo
                                    </button>

                                    {/* 다음 단계 버튼 */}
                                    <button
                                        onClick={() => setStep(2)}
                                        className="rounded-full bg-black px-14 py-2 text-sm text-white cursor-pointer"
                                    >
                                        Next
                                    </button>
                                </div>
                            )}
                        </div>
                    )}

                    {/* 2단계 (정보 입력) */}
                    {step === 2 && (
                        <div className="flex w-full animate-in slide-in-from-right duration-500">
                            {/* 왼쪽 섹션 (사진 미리보기) */}
                            <div className="flex w-1/2 items-center justify-center p-15">
                                <img src={data.previewImage} alt="미리보기" />
                            </div>

                            {/* 오른쪽 섹션 (정보 입력 필드) */}
                            <div className="flex w-1/2 flex-col pr-20 py-15 space-y-8">
                                {/* 장소 */}
                                <div className="space-y-2">
                                    <label className="text-sm tracking-tighter">장소</label>
                                    <input
                                        type="text"
                                        placeholder="사진을 찍은 장소를 입력하세요"
                                        onChange={(e) => setData({ ...data, location: e.target.value })}
                                        className="mt-2 rounded-lg w-full text-sm border p-4 text-xs outline-none focus:border-black transition-colors"
                                    />
                                </div>

                                {/* 프리셋 파일 */}
                                <div className="space-y-2">
                                    <label className="text-sm tracking-tighter">프리셋 파일 (.xmp, .json)</label>
                                    <div className="relative">
                                        <label
                                            htmlFor={data.filterFile ? undefined : "filter-upload"}
                                            onClick={(e) => {
                                                if (data.filterFile) {
                                                    e.preventDefault();
                                                }
                                            }}
                                            className={`mt-2 flex items-center w-full px-4 py-3 rounded-lg border ${data.filterFile ? "cursor-default" : "cursor-pointer"}`}
                                        >
                                            <img src="/images/ic_upload.svg" alt="파일 업로드" className="w-5 h-5 mr-3 flex-shrink-0" />
                                            <span className={`text-xs flex-grow truncate ${data.filterFile ? 'text-black' : 'text-gray-400'}`}>
                                                {data.filterFile ? data.filterFile.name : "사용한 프리셋 파일을 업로드 하세요"}
                                            </span>
                                            {data.filterFile && (
                                                <button
                                                    type="button"
                                                    className="p-1 cursor-pointer"
                                                    onClick={handleRemoveFilterFile}
                                                >
                                                    <img src="/images/ic_close.svg" alt="삭제" className="w-4 h-4" />
                                                </button>
                                            )}
                                        </label>

                                        <input
                                            type="file"
                                            onChange={(e) => setData({ ...data, filterFile: e.target.files?.[0] || null })}
                                            className="hidden"
                                            id="filter-upload"
                                            accept=".xmp, .json"
                                            ref={filterInputRef}
                                        />
                                    </div>
                                </div>

                                {/* 설명 */}
                                <div className="flex flex-col flex-grow space-y-2">
                                    <label className="text-sm tracking-tighter">설명</label>
                                    <textarea
                                        placeholder="사진에 대한 설명을 입력하세요"
                                        className="mt-1 w-full flex-grow rounded-lg border p-4 text-xs outline-none resize-none h-30"
                                        value={data.description}
                                        onChange={(e) => setData({ ...data, description: e.target.value })} />
                                </div>

                                {/* 업로드 버튼 */}
                                <button
                                    onClick={handleUpload}
                                    disabled={!data.location || !data.description || !data.filterFile || isLoading}
                                    className="self-end rounded-full bg-black py-2 px-11 text-sm text-white disabled:bg-gray-200 disabled:text-white"
                                >
                                    {isLoading ? "업로드 중..." : "Upload"}
                                </button>
                            </div>
                        </div>
                    )}
                </div>
            </div>
        </div >
    );
}

export default PostUploadModal;