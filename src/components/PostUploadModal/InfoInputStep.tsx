import type React from "react";
import type { PostUploadRequest } from "../../types/PostUpload";
import { useRef } from "react";
import { INFO_INPUT_STEP } from "../../styles/postUploadStyles";

interface Props {
    data: PostUploadRequest;
    setData: React.Dispatch<React.SetStateAction<PostUploadRequest>>;
    isLoading: boolean;
    handleUpload: () => void;
    mode: 'upload' | 'edit';
}

const InfoInputStep: React.FC<Props> = ({ data, setData, isLoading, handleUpload, mode }) => {

    const { container, leftSection, imageSection, image, rightSection, inputSection, label, textInput, fileUploadSection, uploadIcon, fileName, removeBtn, removeIcon, textArea, submitBtn } = INFO_INPUT_STEP;
    const filterInputRef = useRef<HTMLInputElement>(null); // 프리셋 파일 변경 감지

    // 프리셋 파일 삭제
    const handleRemoveFilterFile = (e: React.MouseEvent) => {
        e.preventDefault();
        e.stopPropagation();

        if (filterInputRef.current) {
            filterInputRef.current.value = "";
        }

        setData(prev => ({ ...prev, filter: null }));
    }

    const isSubmitDisabled = !data.location || !data.description || isLoading;

    return (
        <div className={container}>
            {/* 왼쪽 섹션 (사진 미리보기) */}
            <div className={leftSection}>
                <div className={imageSection}>
                    <img src={data.previewImage} alt="미리보기" className={image} />
                </div>
            </div>

            {/* 오른쪽 섹션 (정보 입력 필드) */}
            <div className={rightSection}>
                {/* 장소 */}
                <div className={inputSection}>
                    <label className={label}>장소</label>
                    <input
                        type="text"
                        placeholder="사진을 찍은 장소를 입력하세요"
                        value={data.location}
                        onChange={(e) => setData({ ...data, location: e.target.value })}
                        className={textInput}
                    />
                </div>

                {mode === 'edit' && (
                    <div className={inputSection}>
                    <label className={label}>카메라</label>
                    <input
                        type="text"
                        placeholder="카메라를 입력하세요"
                        value={(data as any).camera || ""}
                        onChange={(e) => setData({ ...data, camera: e.target.value } as any)}
                        className={textInput}
                    />
                </div>
                )}

                {/* 프리셋 파일 */}
                <div className={inputSection}>
                    <label className={label}>프리셋 파일 (.xmp, .json)</label>
                    <div className="relative">
                        <label
                            htmlFor={data.filter ? undefined : "filter-upload"}
                            onClick={(e) => data.filter && e.preventDefault()}
                            className={`${fileUploadSection} ${data.filter ? "cursor-default" : "cursor-pointer"}`}
                        >
                            <img src="/images/ic_upload.svg" alt="파일 업로드" className={uploadIcon} />
                            <span className={`${fileName} ${data.filter ? 'text-black' : 'text-gray-400'}`}>
                                {data.filter ? data.filter.name : "사용한 프리셋 파일을 업로드 하세요"}
                            </span>
                            {data.filter && (
                                <button
                                    type="button"
                                    className={removeBtn}
                                    onClick={handleRemoveFilterFile}
                                >
                                    <img src="/images/ic_close.svg" alt="삭제" className={removeIcon} />
                                </button>
                            )}
                        </label>

                        <input
                            type="file"
                            onChange={(e) => setData(prev => ({ ...prev, filter: e.target.files?.[0] || null }))}
                            className="hidden"
                            id="filter-upload"
                            accept=".xmp, .json"
                            ref={filterInputRef}
                        />
                    </div>
                </div>

                {/* 설명 */}
                <div className="flex flex-col space-y-2">
                    <label className={label}>설명</label>
                    <textarea
                        placeholder="사진에 대한 설명을 입력하세요"
                        className={textArea}
                        value={data.description}
                        onChange={(e) => setData({ ...data, description: e.target.value })} />
                </div>

                {/* 업로드 버튼 */}
                <button
                    onClick={handleUpload}
                    disabled={isSubmitDisabled}
                    className={submitBtn}
                >
                    {isLoading ? "Uploading..." : "Upload"}
                </button>
            </div>
        </div>
    );
}

export default InfoInputStep;