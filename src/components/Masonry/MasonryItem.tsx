import React, { useRef, useState } from 'react';
import { gsap } from 'gsap';

interface MasonryItemProps {
    item: any;
    handleLikeToggle: (e: React.MouseEvent, id: string) => void;
    handleProfile: (e: React.MouseEvent, id: string) => void;
    onItemClick: () => void;
}

const MasonryItem: React.FC<MasonryItemProps> = ({ item, handleLikeToggle, handleProfile, onItemClick }) => {
    const itemRef = useRef<HTMLDivElement>(null);
    const [isAnimating, setIsAnimating] = useState(false);

    const handleMouseEnter = () => {
        const el = itemRef.current;
        if (!el) return;

        // 요소를 각각 찾아서 존재 여부 확인
        const topOverlay = el.querySelector('.top-overlay');
        const bottomOverlay = el.querySelector('.bottom-overlay');
        const topInfo = el.querySelector('.top-info');
        const bottomInfo = el.querySelector('.bottom-info');

        if (topOverlay) gsap.to(topOverlay, { opacity: 1, duration: 0.2 });
        if (bottomOverlay) gsap.to(bottomOverlay, { opacity: 1, duration: 0.2 });
        
        if (topInfo) {
            gsap.fromTo(topInfo, 
                { y: -20, opacity: 0 }, 
                { y: 0, opacity: 1, duration: 0.4, ease: 'power2.out' }
            );
        }
        if (bottomInfo) {
            gsap.fromTo(bottomInfo, 
                { y: 20, opacity: 0 }, 
                { y: 0, opacity: 1, duration: 0.4, ease: 'power2.out' }
            );
        }
    };

    const handleMouseLeave = () => {
        const el = itemRef.current;
        if (!el) return;

        const topOverlay = el.querySelector('.top-overlay');
        const bottomOverlay = el.querySelector('.bottom-overlay');
        const topInfo = el.querySelector('.top-info');
        const bottomInfo = el.querySelector('.bottom-info');

        // null이 아닌 요소들만 필터링하여 애니메이션 적용
        const overlays = [topOverlay, bottomOverlay].filter((item): item is Element => item !== null);
        
        if (overlays.length > 0) {
            gsap.to(overlays, { opacity: 0, duration: 0.3 });
        }
        if (topInfo) {
            gsap.to(topInfo, { y: -10, opacity: 0, duration: 0.3 });
        }
        if (bottomInfo) {
            gsap.to(bottomInfo, { y: 10, opacity: 0, duration: 0.3 });
        }
    };

    const onLikeClick = (e: React.MouseEvent) => {
        // 부모 컴포넌트로 이벤트 전달 (API 호출 등)
        handleLikeToggle(e, item.id);
        
        // 좋아요를 누르는 순간에만 애니메이션 실행
        if (!item.isLiked) {
            setIsAnimating(true);
            setTimeout(() => setIsAnimating(false), 700); 
        }
    };

    return (
        <div
            ref={itemRef}
            data-key={item.id}
            className="absolute overflow-hidden cursor-pointer group"
            onMouseEnter={handleMouseEnter}
            onMouseLeave={handleMouseLeave}
            onClick={onItemClick}
        >
            <div className="relative w-full h-full">
                <img src={item.img} alt="" loading="lazy" className="w-full h-full object-cover" />
                
                {/* 오버레이 배경 (gsap에서 참조할 클래스 포함 필수) */}
                <div className="top-overlay absolute top-0 left-0 w-full h-1/2 bg-gradient-to-b from-black/50 to-transparent opacity-0 pointer-events-none" />
                <div className="bottom-overlay absolute bottom-0 left-0 w-full h-1/2 bg-gradient-to-t from-black/50 to-transparent opacity-0 pointer-events-none" />

                <div className="absolute inset-0 flex flex-col justify-between p-7 text-white pointer-events-none">
                    <div className="top-info opacity-0 flex flex-col gap-1">
                        <p className="text-xl font-semibold">{item.location || '장소 정보 없음'}</p>
                        <p className="text-xs font-light">{item.camera || '카메라 정보 없음'}</p>
                    </div>

                    <div className="bottom-info opacity-0 flex justify-between items-center">
                        <div className="flex items-center gap-2.5 pointer-events-auto" onClick={(e) => handleProfile(e, item.userId)}>
                            <img 
                                src={item.profileUrl?.trim() ? item.profileUrl : "/images/ic_default_profile.svg"} 
                                alt="" 
                                className="w-8 h-8 rounded-full object-cover bg-white" 
                            />
                            <span className="text-sm font-medium">{item.username}</span>
                        </div>
                        
                        <button onClick={onLikeClick} className="relative pointer-events-auto flex flex-col items-center gap-0.5 px-2 py-1">
                            <div className="relative flex items-center justify-center w-5 h-5">
                                {isAnimating && (
                                    <div className="absolute inset-0 flex items-center justify-center">
                                        <div className="heart-ring-effect" />
                                    </div>
                                )}
                                <img 
                                    src={item.isLiked ? "/images/ic_like_true.svg" : "/images/ic_like_false.svg"} 
                                    className={`w-5 h-5 relative z-10 ${isAnimating ? 'heart-active' : ''}`} 
                                    alt="좋아요" 
                                />
                            </div>
                            <span className={`text-[10px] font-medium transition-colors ${item.isLiked ? "text-[#FF0000]" : "text-white"}`}>
                                {item.likeCount}
                            </span>
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default React.memo(MasonryItem);