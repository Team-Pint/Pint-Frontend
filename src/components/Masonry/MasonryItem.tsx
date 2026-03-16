import React, { useRef } from 'react';
import { gsap } from 'gsap';
import confetti from 'canvas-confetti'; // 라이브러리 임포트

interface MasonryItemProps {
    item: any;
    handleLikeToggle: (e: React.MouseEvent, id: string) => void;
    handleProfile: (e: React.MouseEvent, id: string) => void;
    onItemClick: () => void;
}

const MasonryItem: React.FC<MasonryItemProps> = ({ item, handleLikeToggle, handleProfile, onItemClick }) => {
    const itemRef = useRef<HTMLDivElement>(null);

    // 마우스 올렸을 때 애니메이션
    const handleMouseEnter = () => {
        const el = itemRef.current;
        if (!el) return;

        gsap.to(el.querySelector('.top-overlay'), { opacity: 1, duration: 0.2, overwrite: 'auto' });
        gsap.to(el.querySelector('.bottom-overlay'), { opacity: 1, duration: 0.2, overwrite: 'auto' });
        gsap.fromTo(el.querySelector('.top-info'), { y: -20, opacity: 0 }, { y: 0, opacity: 1, duration: 0.4, ease: 'power2.out', overwrite: 'auto' });
        gsap.fromTo(el.querySelector('.bottom-info'), { y: 20, opacity: 0 }, { y: 0, opacity: 1, duration: 0.4, ease: 'power2.out', overwrite: 'auto' });
    };

    // 마우스 내렸을 때 애니메이션
    const handleMouseLeave = () => {
        const el = itemRef.current;
        if (!el) return;

        gsap.to([el.querySelector('.top-overlay'), el.querySelector('.bottom-overlay')], { opacity: 0, duration: 0.3, overwrite: 'auto' });
        gsap.to(el.querySelector('.top-info'), { y: -10, opacity: 0, duration: 0.3, overwrite: 'auto' });
        gsap.to(el.querySelector('.bottom-info'), { y: 10, opacity: 0, duration: 0.3, overwrite: 'auto' });
    };

    // 화려한 펑 터지는 애니메이션 함수 (라이브러리 활용)
    const fireLikeBurst = (e: React.MouseEvent) => {
        // 클릭한 마우스 위치를 가져옵니다.
        const { clientX, clientY } = e;
        
        // 화면 크기 대비 클릭 위치의 비율을 계산합니다 (0 ~ 1 사이 값).
        const x = clientX / window.innerWidth;
        const y = clientY / window.innerHeight;

        // confetti 함수를 호출하여 애니메이션을 실행합니다.
        confetti({
            particleCount: 15,    // 터지는 파티클 개수
            spread: 60,          // 퍼지는 각도
            origin: { x, y },     // 터지는 시작점 (마우스 클릭 위치)
            colors: ['#FF0000', '#FFCDD2', '#E91E63'], // 빨강, 연분홍, 진분홍 색상 조합
            shapes: ['circle'],    // 파티클 모양 (라이브러리 기본 제공 하트가 없으므로 동그라미로 대체, 커스텀 가능)
            ticks: 200,          // 파티클이 화면에 머무는 시간 (짧게 줘서 순식간에 사라지게 함)
            gravity: 1.2,        // 중력 (살짝 무겁게 줘서 아래로 떨어지는 느낌 추가)
            scalar: 0.7,         // 파티클 크기 배율 (살짝 작게)
        });
    };

    // 좋아요 클릭 핸들러 수정
    const onLikeClick = (e: React.MouseEvent) => {
        handleLikeToggle(e, item.id); // 기존 토글 로직 실행

        // 좋아요를 누르는 순간(isLiked가 false -> true가 될 때)에만 애니메이션 실행
        if (!item.isLiked) {
            fireLikeBurst(e); // 클릭 이벤트를 넘겨줍니다.
        }
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
            <div className="relative w-full h-full">
                <img 
                    src={item.img} 
                    alt=""
                    loading="lazy" 
                    className="w-full h-full object-cover" 
                />

                {/* 검정 배경 그라데이션 오버레이 */}
                <div className="top-overlay absolute inset-0 opacity-0 pointer-events-none"
                    style={{ background: 'linear-gradient(to bottom, rgba(0,0,0,0.9) 0%, rgba(0,0,0,0) 50%)' }} />
                <div className="bottom-overlay absolute inset-0 opacity-0 pointer-events-none"
                    style={{ background: 'linear-gradient(to top, rgba(0,0,0,0.9) 0%, rgba(0,0,0,0) 50%)' }} />

                <div className="absolute inset-0 flex flex-col justify-between p-7 text-white pointer-events-none">
                    {/* 상단 영역 (장소, 카메라 - 데이터 연결 완료) */}
                    <div className="top-info opacity-0 flex flex-col gap-1">
                        <p className="text-xl font-semibold">{item.location || '장소 정보 없음'}</p>
                        <p className="text-xs font-light">{item.camera || '카메라 정보 없음'}</p>
                    </div>

                    {/* 하단 영역 (유저 정보, 좋아요 - 색상 통일 완료) */}
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
                            onClick={onLikeClick} // 수정된 핸들러 연결
                            className="relative pointer-events-auto flex flex-col items-center gap-0.5 px-2 py-1"
                        >
                            <img 
                                src={item.isLiked ? "/images/ic_like_true.svg" : "/images/ic_like_false.svg"} 
                                className="w-5 h-5" 
                                alt="좋아요" 
                            />
                            {/* 좋아요 여부에 따라 숫자 색상을 아이콘과 통일 (isLiked ? 빨간색 : 흰색) */}
                            <span className={`text-[10px] font-medium transition-colors ${
                                item.isLiked ? "text-[#FF0000]" : "text-white"
                            }`}>
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