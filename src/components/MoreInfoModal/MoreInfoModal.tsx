import { useState } from "react";
import { ChevronDown } from "lucide-react";
import type { FilterData } from "../../types/ProfileData";

interface Props {
    imgUrl: string;
    filter: FilterData | null;
    onClose: () => void;
}

interface AccordionSectionProps {
    title: string;
    entries: [string, string][];
    formatKey: (key: string) => string;
    defaultOpen?: boolean;
}

const AccordionSection: React.FC<AccordionSectionProps> = ({ title, entries, formatKey, defaultOpen = false }) => {
    const [isOpen, setIsOpen] = useState(defaultOpen);

    return (
        <div className="border-b border-gray-100 last:border-b-0">
            <button
                className="w-full flex items-center justify-between py-4 cursor-pointer group"
                onClick={() => setIsOpen(!isOpen)}
            >
                <h3 className="text-sm font-semibold uppercase tracking-wider">{title}</h3>
                <div className="flex items-center gap-2">
                    <span className="text-[11px] text-gray-300">{entries.length}</span>
                    <ChevronDown
                        size={16}
                        className={`text-gray-400 transition-transform duration-200 ${isOpen ? 'rotate-180' : ''}`}
                    />
                </div>
            </button>
            <div
                className={`grid transition-all duration-200 ease-out ${isOpen ? 'grid-rows-[1fr] opacity-100 pb-4' : 'grid-rows-[0fr] opacity-0'}`}
            >
                <div className="overflow-hidden">
                    <div className="space-y-1.5">
                        {entries.map(([key, value]) => (
                            <div key={key} className="flex justify-between items-center text-[12px] px-1">
                                <span className="text-gray-500">{formatKey(key)}</span>
                                <span className="font-medium tabular-nums">{value}</span>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </div>
    );
};

const MoreInfoModal: React.FC<Props> = ({ imgUrl, filter, onClose }) => {

    const formatKey = (key: string) => {
        return key
            .replace("2012", "")
            .replace("Adjustment", "")
            .trim()
    }

    const sections = filter ? [
        { title: "Basic", entries: Object.entries(filter.basicAdjustments), defaultOpen: true },
        { title: "Color", entries: Object.entries(filter.colorAdjustments), defaultOpen: false },
        { title: "Detail", entries: Object.entries(filter.detailAdjustments), defaultOpen: false },
    ] : [];

    return (
        <div className="fixed inset-0 z-[60] flex items-center justify-center bg-black/30 backdrop-blur-md p-4">
            <div className="absolute inset-0" onClick={onClose} />

            <div className="relative w-full max-w-4xl rounded-xl shadow-2xl flex flex-col overflow-hidden max-h-[90vh]">

                {/* 상단 영역 (검은 배경) */}
                <div className="bg-black p-10 md:p-12 flex justify-center items-center relative shrink-0">
                    <button onClick={onClose} className="absolute top-8 right-8">
                        <img src="/images/ic_close.svg" alt="닫기" className="w-5 h-5 brightness-0 invert" />
                    </button>

                    <div className="flex justify-center bg-[#D9D9D9] pt-2 pl-2 pr-2 pb-8">
                        <img src={imgUrl} alt="이미지" className="max-h-[320px] w-auto shadow-lg object-contain" />
                    </div>
                </div>

                {/* 하단 영역 (흰색 배경) */}
                <div className="bg-white overflow-y-auto">
                    {filter ? (
                        <div className="max-w-2xl mx-auto px-10 py-6 md:px-12 md:py-8 divide-y divide-gray-100">
                            {sections.map(({ title, entries, defaultOpen }) => (
                                <AccordionSection
                                    key={title}
                                    title={title}
                                    entries={entries}
                                    formatKey={formatKey}
                                    defaultOpen={defaultOpen}
                                />
                            ))}
                        </div>
                    ) : (
                        <p className="text-center text-gray-400 py-10">필터 정보가 없습니다.</p>
                    )}
                </div>
            </div>
        </div>
    );
}

export default MoreInfoModal;
