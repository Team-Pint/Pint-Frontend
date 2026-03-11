import type React from "react";

const MOCK_DATA = {
    "filter": {
        "basicAdjustments": {
            "WhiteBalance": "As Shot",
            "Exposure2012": "+0.15",
            "Contrast2012": "+33",
            "Highlights2012": "-51",
            "Shadows2012": "+33",
            "Whites2012": "-40",
            "Blacks2012": "+21",
            "Vibrance": "+23",
            "Saturation": "-12"
        },
        "colorAdjustments": {
            "HueAdjustmentYellow": "+5",
            "HueAdjustmentGreen": "+54",
            "SaturationAdjustmentOrange": "+10",
            "SaturationAdjustmentYellow": "-30",
            "SaturationAdjustmentGreen": "-60",
            "SaturationAdjustmentAqua": "+12",
            "LuminanceAdjustmentOrange": "+21",
            "LuminanceAdjustmentYellow": "+5",
            "LuminanceAdjustmentGreen": "-5",
            "LuminanceAdjustmentAqua": "-12",
        },
        "detailAdjustments": {
            "Sharpness": "18",
            "SharpenRadius": "+1.0",
            "SharpenDetail": "25",
            "LuminanceSmoothing": "14",
            "LuminanceNoiseReductionDetail": "50",
            "ColorNoiseReduction": "25",
            "ColorNoiseReductionDetail": "50",
            "ColorNoiseReductionSmoothness": "50"
        }
    }
}

interface Props {
    imgUrl: string;
    onClose: () => void;
}

const MoreInfoModal: React.FC<Props> = ({ imgUrl, onClose }) => {

    // 필터 정보 글자 정리 (2012, Adjustment 정리)
    const formatKey = (key: string) => {
        return key
            .replace("2012", "")
            .replace("Adjustment", "")
            .trim()
    }

    return (
        <div className="fixed inset-0 z-[60] flex items-center justify-center bg-black/30 backdrop-blur-md p-4">
            {/* 모달 외부 클릭 시 닫기 */}
            <div className="absolute inset-0" onClick={onClose} />

            <div className="relative w-full max-w-4xl rounded-xl shadow-2xl flex flex-col overflow-hidden max-h-[90vh]">

                {/* 상단 영역 (검은 배경) */}
                <div className="bg-black p-10 md:p-12 flex justify-center items-center relative">
                    {/* 닫기 버튼 */}
                    <button onClick={onClose} className="absolute top-8 right-8">
                        <img src="/images/ic_close.svg" alt="닫기" className="w-5 h-5 brightness-0 invert" />
                    </button>

                    {/* 이미지 영역 */}
                    <div className="flex justify-center bg-[#D9D9D9] pt-2 pl-2 pr-2 pb-8">
                        <img src={imgUrl} alt="이미지" className="max-h-[320px] w-auto shadow-lg object-contain" />
                    </div>
                </div>

                {/* 하단 영역 (흰색 배경) */}
                <div className="bg-white p-10 md:p-12 overflow-y-auto">
                    {/* 필터 정보 영역 */}
                    <div className="grid grid-cols-3 mx-auto w-fit">
                        {/* Basic 영역 */}
                        <div>
                            <h3 className="text-xl font-semibold mb-4">Basic</h3>
                            {Object.entries(MOCK_DATA.filter.basicAdjustments).map(([key, value]) => (
                                <div className="flex justify-between items-center text-[12px]">
                                    <p>{formatKey(key)} : {value}</p>
                                </div>
                            ))}
                        </div>

                        {/* Color 영역 */}
                        <div>
                            <h3 className="text-xl font-semibold mb-4">Color</h3>
                            {Object.entries(MOCK_DATA.filter.colorAdjustments).map(([key, value]) => (
                                <div className="flex justify-between items-center text-[12px]">
                                    <p>{formatKey(key)} : {value}</p>
                                </div>
                            ))}
                        </div>

                        {/* Detail 영역 */}
                        <div>
                            <h3 className="text-xl font-semibold mb-4">Detail</h3>
                            {Object.entries(MOCK_DATA.filter.detailAdjustments).map(([key, value]) => (
                                <div className="flex justify-between items-center text-[12px]">
                                    <p>{formatKey(key)} : {value}</p>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default MoreInfoModal;