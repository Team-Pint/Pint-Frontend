import type React from "react";
import type { PostUpload } from "../../types/PostUpload";
import { useRef } from "react";

interface Props {
    data: PostUpload;
    setData: React.Dispatch<React.SetStateAction<PostUpload>>;
    isLoading: boolean;
    handleUpload: () => void;
}

const InfoInputStep: React.FC<Props> = ({ data, setData, isLoading, handleUpload }) => {

    const filterInputRef = useRef<HTMLInputElement>(null); // 프리셋 파일 변경 감지

    // 프리셋 파일 삭제
    const handleRemoveFilterFile = (e: React.MouseEvent) => {
        e.preventDefault();
        e.stopPropagation();

        if (filterInputRef.current) {
            filterInputRef.current.value = "";
        }

        setData(prev => ({ ...prev, filterFile: null }));
    }

    const isSubmitDisabled = !data.location || !data.description || !data.filterFile || isLoading;

    return (
        <div className="flex w-full animate-in slide-in-from-right duration-500">
            {/* 왼쪽 섹션 (사진 미리보기) */}
            <div className="flex w-1/2 items-center justify-center p-15">
                <img src={data.previewImage} alt="미리보기" />
            </div>

            {/* 오른쪽 섹션 (정보 입력 필드) */}
            <div className="flex w-1/2 flex-col pr-20 py-15 space-y-8">
                {/* 장소 */}
                <div className="space-y-2">
                    <label className="text-sm">장소</label>
                    <input
                        type="text"
                        placeholder="사진을 찍은 장소를 입력하세요"
                        onChange={(e) => setData({ ...data, location: e.target.value })}
                        className="mt-2 rounded-lg w-full text-sm border p-4 text-xs outline-none focus:border-black transition-colors"
                    />
                </div>

                {/* 프리셋 파일 */}
                <div className="space-y-2">
                    <label className="text-sm">프리셋 파일 (.xmp, .json)</label>
                    <div className="relative">
                        <label
                            htmlFor={data.filterFile ? undefined : "filter-upload"}
                            onClick={(e) => data.filterFile && e.preventDefault()}
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
                            onChange={(e) => setData(prev => ({ ...prev, filterFile: e.target.files?.[0] || null }))}
                            className="hidden"
                            id="filter-upload"
                            accept=".xmp, .json"
                            ref={filterInputRef}
                        />
                    </div>
                </div>

                {/* 설명 */}
                <div className="flex flex-col flex-grow space-y-2">
                    <label className="text-sm">설명</label>
                    <textarea
                        placeholder="사진에 대한 설명을 입력하세요"
                        className="mt-1 w-full flex-grow rounded-lg border p-4 text-xs outline-none resize-none h-30"
                        value={data.description}
                        onChange={(e) => setData({ ...data, description: e.target.value })} />
                </div>

                {/* 업로드 버튼 */}
                <button
                    onClick={handleUpload}
                    disabled={isSubmitDisabled}
                    className="self-end rounded-full bg-black py-2 px-11 text-sm text-white disabled:bg-gray-200 disabled:text-white"
                >
                    {isLoading ? "Uploading..." : "Upload"}
                </button>
            </div>
        </div>
    );
}

export default InfoInputStep;