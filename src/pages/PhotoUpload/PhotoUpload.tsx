import { useRef, useState, type ChangeEvent } from "react";
import { useNavigate } from "react-router-dom";

const PhotoUpload = () => {

    const [previewImage, setPreviewImage] = useState<string | null>(null);
    const [imageValue, setImageValue] = useState<File | null>(null);
    const [placeValue, setPlaceValue] = useState<string>('');
    const [cameraValue, setCameraValue] = useState<string>('');
    const [descriptionValue, setDescriptionValue] = useState<string>('');
    const [filterValue, setFilterValue] = useState<string>('');

    const navigate = useNavigate();
    const fileInputRef = useRef<HTMLInputElement>(null);

    // 사진 변경 감지
    const handleImageChange = (e: ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0]; // 사진 1개만 불러오기 (선택된 첫 번째 파일만)
        if (file) {
            setImageValue(file);

            // 이전 프리뷰 URL이 있다면 삭제 (성능 최적화)
            if (previewImage) {
                URL.revokeObjectURL(previewImage);
            }

            setPreviewImage(URL.createObjectURL(file)); // 화면에 프리뷰로 보여주기 위한 임시 URL
        }
    }

    // 사진 불러오는 input 태그 사용
    const handleImageUpload = () => {
        if (fileInputRef.current) {
            fileInputRef.current.value = '';
            fileInputRef.current.click();
        }
    }

    // 업로드
    const handleSubmit = (e: ChangeEvent<HTMLFormElement>) => {
        e.preventDefault();

        if (!imageValue || !placeValue || !cameraValue || !descriptionValue || !filterValue) {
            alert('필수 항목을 입력해 주세요');
            return;
        }

        alert('업로드 성공!');
        navigate('/profile');
    }

    return (
        <div className="min-h-screen bg-white flex flex-col items-center py-16 px-4">
            <h2 className="text-base font-bold mb-24">Upload</h2>

            <form onSubmit={handleSubmit} className="w-full flex flex-col items-center">
                {/* 사진 선택 */}
                <div className="mb-24 w-full flex justify-center">
                    <input
                        type="file"
                        accept="image/*"
                        onChange={handleImageChange}
                        ref={fileInputRef}
                        className="hidden"
                    />

                    {!previewImage ? (
                        <button
                            type="button"
                            onClick={handleImageUpload}
                            className="bg-black text-white text-sm px-10 py-3 rounded-lg hover:bg-gray-800 transition-colors cursor-pointer"
                        >
                            사진 업로드
                        </button>
                    ) : (
                        <div className="flex flex-col items-center">
                            <img src={previewImage} alt="미리보기" className="w-full max-w-[320px] max-h-[400px] object-cover rounded mb-4" />
                            <button type="button" onClick={handleImageUpload} className="text-xs text-gray-400 hover:text-gray-700 cursor-pointer">다른 사진으로 변경</button>
                        </div>
                    )}
                </div>

                {/* 정보 입력 */}
                <div className="w-full max-w-[600px] flex flex-col gap-10 mb-16">
                    {/* 장소 */}
                    <div>
                        <label className="block text-sm font-bold text-gray-800 mb-2">장소</label>
                        <input
                            type="text"
                            value={placeValue}
                            onChange={(e) => setPlaceValue(e.target.value)}
                            placeholder="사진을 찍은 장소를 입력하세요"
                            className="w-full border border-gray-400 rounded p-3 text-sm placeholder-gray-400 focus:outline-none focus:border-black transition-colors"
                        />
                    </div>

                    {/* 카메라 */}
                    <div>
                        <label className="block text-sm font-bold text-gray-800 mb-2">카메라</label>
                        <input
                            type="text"
                            value={cameraValue}
                            onChange={(e) => setCameraValue(e.target.value)}
                            placeholder="사용한 카메라 정보를 입력하세요"
                            className="w-full border border-gray-400 rounded p-3 text-sm placeholder-gray-400 focus:outline-none focus:border-black transition-colors"
                        />
                    </div>

                    {/* 설명 */}
                    <div>
                        <label className="block text-sm font-bold text-gray-800 mb-2">설명</label>
                        <textarea
                            value={descriptionValue}
                            onChange={(e) => setDescriptionValue(e.target.value)}
                            placeholder="사진에 대한 설명을 입력하세요"
                            rows={8}
                            className="w-full border border-gray-400 rounded p-3 text-sm placeholder-gray-400 focus:outline-none focus:border-black transition-colors resize-none"
                        />
                    </div>

                    {/* 필터 정보 */}
                    <div>
                        <label className="block text-sm font-bold text-gray-800 mb-2">필터 정보</label>
                        <textarea
                            value={filterValue}
                            onChange={(e) => setFilterValue(e.target.value)}
                            placeholder="사용한 필터 정보를 입력하세요"
                            rows={8}
                            className="w-full border border-gray-400 rounded p-3 text-sm placeholder-gray-400 focus:outline-none focus:border-black transition-colors resize-none"
                        />
                    </div>
                </div>

                {/* 업로드 버튼 */}
                <button type="submit" className="bg-black text-white text-sm px-14 py-3 rounded-lg hover:bg-gray-800 transition-colors">
                    Upload
                </button>
            </form>
        </div>
    )
}

export default PhotoUpload;
