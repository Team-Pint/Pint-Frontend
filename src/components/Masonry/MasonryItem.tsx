import React, { useRef } from 'react';
import { gsap } from 'gsap';

interface MasonryItemProps {
    item: any;
    handleLikeToggle: (e: React.MouseEvent, id: string) => void;
    handleProfile: (e: React.MouseEvent, id: string) => void;
    onItemClick: () => void;
}

const MasonryItem: React.FC<MasonryItemProps> = ({ item, handleLikeToggle, handleProfile, onItemClick }) => {
    const itemRef = useRef<HTMLDivElement>(null);

    // 마우스 올렸을 때
    const handleMouseEnter = () => {
        const el = itemRef.current;
        if (!el) return;

        gsap.to(el.querySelector('.top-overlay'), { opacity: 1, duration: 0.2, overwrite: 'auto' });
        gsap.to(el.querySelector('.bottom-overlay'), { opacity: 1, duration: 0.2, overwrite: 'auto' });
        gsap.fromTo(el.querySelector('.top-info'), { y: -20, opacity: 0 }, { y: 0, opacity: 1, duration: 0.4, ease: 'power2.out', overwrite: 'auto' });
        gsap.fromTo(el.querySelector('.bottom-info'), { y: 20, opacity: 0 }, { y: 0, opacity: 1, duration: 0.4, ease: 'power2.out', overwrite: 'auto' });
    };

    // 마우스 내렸을 때
    const handleMouseLeave = () => {
        const el = itemRef.current;
        if (!el) return;

        gsap.to([el.querySelector('.top-overlay'), el.querySelector('.bottom-overlay')], { opacity: 0, duration: 0.3, overwrite: 'auto' });
        gsap.to(el.querySelector('.top-info'), { y: -10, opacity: 0, duration: 0.3, overwrite: 'auto' });
        gsap.to(el.querySelector('.bottom-info'), { y: 10, opacity: 0, duration: 0.3, overwrite: 'auto' });
    };

    return (
        <div
            ref={itemRef}
            data-key={item.id}
            className="absolute overflow-hidden cursor-pointer group"
            style={{ willChange: 'transform, width, height, opacity' }}
            onMouseEnter={handleMouseEnter}
            onMouseLeave={handleMouseLeave}
            onClick={onItemClick}
        >
            <div
                className="relative w-full h-full bg-cover bg-center"
                style={{ backgroundImage: `url(${item.img})` }}
            >
                {/* 검정 배경 그라데이션 */}
                <div className="top-overlay absolute inset-0 opacity-0 pointer-events-none"
                    style={{ background: 'linear-gradient(to bottom, rgba(0,0,0,0.9) 0%, rgba(0,0,0,0) 50%)' }} />
                <div className="bottom-overlay absolute inset-0 opacity-0 pointer-events-none"
                    style={{ background: 'linear-gradient(to top, rgba(0,0,0,0.9) 0%, rgba(0,0,0,0) 50%)' }} />

                <div className="absolute inset-0 flex flex-col justify-between p-7 text-white pointer-events-none">
                    {/* 상단 영역 (장소, 카메라) */}
                    <div className="top-info opacity-0 flex flex-col gap-1">
                        <p className="text-xl font-semibold">{item.location || 'Location unknown'}</p>
                        <p className="text-xs font-light">{item.camera || 'Device info'}</p>
                    </div>

                    {/* 하단 영역 (유저 정보, 좋아요) */}
                    <div className="bottom-info opacity-0 flex justify-between items-center">
                        <div className="flex items-center gap-2.5 pointer-events-auto" onClick={(e) => handleProfile(e, item.userId)}>
                            {item.profileUrl && item.profileUrl.trim() !== "" ? (
                                <img src={item.profileUrl} alt="" className="w-8 h-8 rounded-full object-cover" />
                            ) :
                                <img src="/images/ic_default_profile.svg" className="w-8 h-8 rounded-full object-cover bg-white" alt="프로필 이미지" />
                            }
                            <span className="text-sm font-medium">{item.username}</span>
                        </div>
                        <button
                            onClick={(e) => handleLikeToggle(e, item.id)}
                            className="pointer-events-auto p-2">
                            <img src={item.isLiked ? "/images/ic_like_true.svg" : "/images/ic_like_false.svg"} className="w-5 h-5" alt="" />
                            <span className="text-xs text-[#FF0000]">{item.likeCount}</span>
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default React.memo(MasonryItem);