import type React from "react";

interface Props {
    imgUrl: string;
    onClose: () => void;
    // 💡 아래 속성들에 '?'를 붙여서 "없을 수도 있음"을 알려줍니다.
    filterData?: {
        basicAdjustments?: Record<string, string>;
        colorAdjustments?: Record<string, string>;
        detailAdjustments?: Record<string, string>;
    };
}

const MoreInfoModal: React.FC<Props> = ({ imgUrl, onClose, filterData }) => {

    const formatKey = (key: string) => {
        return key
            .replace("2012", "")
            .replace("Adjustment", "")
            .trim();
    };

    // 💡 filterData가 통째로 없거나, 내부 속성이 없을 경우를 대비한 안전장치
    const basic = filterData?.basicAdjustments || {};
    const color = filterData?.colorAdjustments || {};
    const detail = filterData?.detailAdjustments || {};

    return (
        <div className="fixed inset-0 z-[60] flex items-center justify-center bg-black/30 backdrop-blur-md p-4">
            <div className="absolute inset-0" onClick={onClose} />

            <div className="relative w-full max-w-4xl rounded-xl shadow-2xl flex flex-col overflow-hidden max-h-[90vh]">
                <div className="bg-black p-10 md:p-12 flex justify-center items-center relative">
                    <button onClick={onClose} className="absolute top-8 right-8">
                        <img src="/images/ic_close.svg" alt="닫기" className="w-5 h-5 brightness-0 invert" />
                    </button>

                    <div className="flex justify-center bg-[#D9D9D9] pt-2 pl-2 pr-2 pb-8">
                        <img src={imgUrl} alt="이미지" className="max-h-[320px] w-auto shadow-lg object-contain" />
                    </div>
                </div>

                <div className="bg-white p-10 md:p-12 overflow-y-auto">
                    <div className="grid grid-cols-3 mx-auto w-full gap-8">
                        {/* Basic 영역 - 💡 변수 'basic' 사용 */}
                        <div>
                            <h3 className="text-xl font-semibold mb-4 border-b pb-2">Basic</h3>
                            <div className="space-y-1">
                                {Object.entries(basic).map(([key, value]) => (
                                    <div key={key} className="flex justify-between text-[12px] text-gray-600">
                                        <span>{formatKey(key)}</span>
                                        <span className="font-medium text-black">{value}</span>
                                    </div>
                                ))}
                            </div>
                        </div>

                        {/* Color 영역 - 💡 변수 'color' 사용 */}
                        <div>
                            <h3 className="text-xl font-semibold mb-4 border-b pb-2">Color</h3>
                            <div className="space-y-1">
                                {Object.entries(color).map(([key, value]) => (
                                    <div key={key} className="flex justify-between text-[12px] text-gray-600">
                                        <span>{formatKey(key)}</span>
                                        <span className="font-medium text-black">{value}</span>
                                    </div>
                                ))}
                            </div>
                        </div>

                        {/* Detail 영역 - 💡 변수 'detail' 사용 */}
                        <div>
                            <h3 className="text-xl font-semibold mb-4 border-b pb-2">Detail</h3>
                            <div className="space-y-1">
                                {Object.entries(detail).map(([key, value]) => (
                                    <div key={key} className="flex justify-between text-[12px] text-gray-600">
                                        <span>{formatKey(key)}</span>
                                        <span className="font-medium text-black">{value}</span>
                                    </div>
                                ))}
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default MoreInfoModal;