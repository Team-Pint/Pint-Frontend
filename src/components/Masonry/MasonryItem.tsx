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
        gsap.to(el.querySelector('.top-overlay'), { opacity: 1, duration: 0.2, overwrite: 'auto' });
        gsap.to(el.querySelector('.bottom-overlay'), { opacity: 1, duration: 0.2, overwrite: 'auto' });
        gsap.fromTo(el.querySelector('.top-info'), { y: -20, opacity: 0 }, { y: 0, opacity: 1, duration: 0.4, ease: 'power2.out', overwrite: 'auto' });
        gsap.fromTo(el.querySelector('.bottom-info'), { y: 20, opacity: 0 }, { y: 0, opacity: 1, duration: 0.4, ease: 'power2.out', overwrite: 'auto' });
    };

    const handleMouseLeave = () => {
        const el = itemRef.current;
        if (!el) return;
        gsap.to([el.querySelector('.top-overlay'), el.querySelector('.bottom-overlay')], { opacity: 0, duration: 0.3, overwrite: 'auto' });
        gsap.to(el.querySelector('.top-info'), { y: -10, opacity: 0, duration: 0.3, overwrite: 'auto' });
        gsap.to(el.querySelector('.bottom-info'), { y: 10, opacity: 0, duration: 0.3, overwrite: 'auto' });
    };

    const onLikeClick = (e: React.MouseEvent) => {
        e.stopPropagation();
        handleLikeToggle(e, item.id);

        if (!item.isLiked) {
            setIsAnimating(true);
            setTimeout(() => setIsAnimating(false), 500);
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
                
                <div className="top-overlay absolute inset-0 opacity-0 pointer-events-none"
                    style={{ background: 'linear-gradient(to bottom, rgba(0,0,0,0.9) 0%, rgba(0,0,0,0) 50%)' }} />
                <div className="bottom-overlay absolute inset-0 opacity-0 pointer-events-none"
                    style={{ background: 'linear-gradient(to top, rgba(0,0,0,0.9) 0%, rgba(0,0,0,0) 50%)' }} />

                <div className="absolute inset-0 flex flex-col justify-between p-7 text-white pointer-events-none">
                    <div className="top-info opacity-0 flex flex-col gap-1">
                        <p className="text-xl font-semibold">{item.location || '장소 정보 없음'}</p>
                        <p className="text-xs font-light">{item.camera || '카메라 정보 없음'}</p>
                    </div>

                    <div className="bottom-info opacity-0 flex justify-between items-center">
                        <div className="flex items-center gap-2.5 pointer-events-auto" onClick={(e) => handleProfile(e, item.userId)}>
                            <img src={item.profileUrl?.trim() ? item.profileUrl : "/images/ic_default_profile.svg"} alt="" className="w-8 h-8 rounded-full object-cover bg-white" />
                            <span className="text-sm font-medium">{item.username}</span>
                        </div>
                        
                        <button onClick={onLikeClick} className="relative pointer-events-auto flex flex-col items-center gap-0.5 px-2 py-1">
                            <div className="relative flex items-center justify-center w-5 h-5">
                                {isAnimating && <div className="heart-ring-effect" />}
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