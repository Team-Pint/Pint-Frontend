import React, { useEffect, useLayoutEffect, useMemo, useRef, useState } from 'react';
import { gsap } from 'gsap';
import { postLikeApi } from "../../api/postLikeApi";

const useMeasure = <T extends HTMLElement>() => {
    const ref = useRef<T | null>(null);
    const [size, setSize] = useState({ width: 0, height: 0 });

    useLayoutEffect(() => {
        if (!ref.current) return;
        const ro = new ResizeObserver(([entry]) => {
            const { width, height } = entry.contentRect;
            setSize({ width, height });
        });
        ro.observe(ref.current);
        return () => ro.disconnect();
    }, []);

    return [ref, size] as const;
};

const preloadImages = async (urls: string[]): Promise<void> => {
    await Promise.all(
        urls.map(
            src =>
                new Promise<void>(resolve => {
                    const img = new Image();
                    img.src = src;
                    img.onload = img.onerror = () => resolve();
                })
        )
    );
};

interface Item {
    id: string;
    img: string;
    url?: string;
    width: number;
    height: number;
    location: string;
    camera: string;
    likeCount: number;
    isLiked: boolean;
    username: string;
    profileUrl: string;
}

interface GridItem extends Item {
    x: number;
    y: number;
    w: number;
    h: number;
}

interface MasonryProps {
    items: Item[];
    columns?: number;
    gap?: number;
    ease?: string;
    duration?: number;
    stagger?: number;
    animateFrom?: 'bottom' | 'top' | 'left' | 'right' | 'center' | 'random';
    blurToFocus?: boolean;
}

const Masonry: React.FC<MasonryProps> = ({
    items: initialItems,
    columns = 3,
    gap = 16,
    ease = 'power3.out',
    duration = 0.6,
    stagger = 0.05,
    animateFrom = 'bottom',
    blurToFocus = true,
}) => {
    const [containerRef, { width }] = useMeasure<HTMLDivElement>();
    const [imagesReady, setImagesReady] = useState(false);
    const [itemList, setItemList] = useState(initialItems);

    const getInitialPosition = (item: GridItem) => {
        const containerRect = containerRef.current?.getBoundingClientRect();
        if (!containerRect) return { x: item.x, y: item.y };

        let direction = animateFrom;
        if (animateFrom === 'random') {
            const dirs = ['top', 'bottom', 'left', 'right'];
            direction = dirs[Math.floor(Math.random() * dirs.length)] as typeof animateFrom;
        }

        switch (direction) {
            case 'top': return { x: item.x, y: -200 };
            case 'bottom': return { x: item.x, y: window.innerHeight + 200 };
            case 'left': return { x: -200, y: item.y };
            case 'right': return { x: window.innerWidth + 200, y: item.y };
            case 'center': return { x: width / 2 - item.w / 2, y: item.y };
            default: return { x: item.x, y: item.y + 100 };
        }
    };

    useEffect(() => {
        setItemList(initialItems);
    }, [initialItems])

    useEffect(() => {
        if (initialItems.length > 0) {
            preloadImages(initialItems.map(i => i.img)).then(() => setImagesReady(true));
        }
    }, [initialItems]);

    const { grid, totalHeight } = useMemo(() => {
        if (!width) return { grid: [], totalHeight: 0 };

        const colHeights = new Array(columns).fill(0);
        const totalGaps = (columns - 1) * gap;
        const columnWidth = (width - totalGaps) / columns;

        const calculatedGrid = itemList.map(item => {
            const col = colHeights.indexOf(Math.min(...colHeights));
            const x = col * (columnWidth + gap);
            const y = colHeights[col];

            const itemHeight = (item.height / item.width) * columnWidth;

            colHeights[col] += itemHeight + gap;

            return { ...item, x, y, w: columnWidth, h: itemHeight };
        });

        return { grid: calculatedGrid, totalHeight: Math.max(...colHeights) };
    }, [columns, itemList, width, gap]);

    const hasMounted = useRef(false);

    useLayoutEffect(() => {
        if (!imagesReady || grid.length === 0) return;

        grid.forEach((item, index) => {
            const selector = `[data-key="${item.id}"]`;
            if (!hasMounted.current) {
                const start = getInitialPosition(item);
                gsap.fromTo(
                    selector,
                    {
                        opacity: 0,
                        x: start.x,
                        y: start.y,
                        width: item.w,
                        height: item.h,
                        ...(blurToFocus && { filter: 'blur(10px)' })
                    },
                    {
                        opacity: 1,
                        x: item.x,
                        y: item.y,
                        width: item.w,
                        height: item.h,
                        ...(blurToFocus && { filter: 'blur(0px)' }),
                        duration: 0.8,
                        ease: 'power3.out',
                        delay: index * stagger
                    }
                );
            } else {
                gsap.to(selector, {
                    x: item.x,
                    y: item.y,
                    width: item.w,
                    height: item.h,
                    duration,
                    ease,
                    overwrite: 'auto'
                });
            }
        });

        hasMounted.current = true;
    }, [grid, imagesReady]);


    // 마우스 올렸을 때
    const handleMouseEnter = (element: HTMLElement) => {
        const topOverlay = element.querySelector('.top-overlay') as HTMLElement;
        const bottomOverlay = element.querySelector('.bottom-overlay') as HTMLElement;
        const topInfo = element.querySelector('.top-info');
        const bottomInfo = element.querySelector('.bottom-info');

        if (topOverlay) gsap.to(topOverlay, { opacity: 1, duration: 0.1, overwrite: 'auto' });
        if (bottomOverlay) gsap.to(bottomOverlay, { opacity: 1, duration: 0.1, overwrite: 'auto' });

        if (topInfo) {
            gsap.fromTo(topInfo,
                { y: -20, opacity: 0 },
                { y: 0, opacity: 1, duration: 0.4, ease: 'power2.out', overwrite: 'auto' }
            );
        }

        if (bottomInfo) {
            gsap.fromTo(bottomInfo,
                { y: 20, opacity: 0 },
                { y: 0, opacity: 1, duration: 0.4, ease: 'power2.out', overwrite: 'auto' }
            );
        }
    };

    // 마우스 내렸을 때
    const handleMouseLeave = (element: HTMLElement) => {
        const topOverlay = element.querySelector('.top-overlay') as HTMLElement;
        const bottomOverlay = element.querySelector('.bottom-overlay') as HTMLElement;
        const topInfo = element.querySelector('.top-info');
        const bottomInfo = element.querySelector('.bottom-info');

        if (topOverlay) gsap.to(topOverlay, { opacity: 0, duration: 0.3, overwrite: 'auto' });
        if (bottomOverlay) gsap.to(bottomOverlay, { opacity: 0, duration: 0.3, overwrite: 'auto' });
        if (topInfo) gsap.to(topInfo, { y: -10, opacity: 0, duration: 0.3, overwrite: 'auto' });
        if (bottomInfo) gsap.to(bottomInfo, { y: 10, opacity: 0, duration: 0.3, overwrite: 'auto' });
    };

    // 좋아요 클릭 이벤트
    const handleLikeToggle = async (e: React.MouseEvent, postId: string) => {
        e.stopPropagation();

        try {
            const response = await postLikeApi(postId);
            if (response.code === 200 && response.message === "Success") {
                const { isLiked, likeCount } = response.data;
                setItemList(prev => prev.map(item =>
                    item.id === postId ? { ...item, isLiked, likeCount } : item
                ));
            }
        } catch (error) {
            console.error("Like error:", error);
        }
    }

    return (
        <div
            ref={containerRef}
            className="relative w-full"
            style={{ height: totalHeight, minHeight: '400px' }}
        >
            {imagesReady && grid.map(item => (
                <div
                    key={item.id}
                    data-key={item.id}
                    className="absolute overflow-hidden cursor-pointer"
                    style={{ willChange: 'transform, width, height, opacity' }}
                    onMouseEnter={e => handleMouseEnter(e.currentTarget)}
                    onMouseLeave={e => handleMouseLeave(e.currentTarget)}
                >
                    <div
                        className="relative w-full h-full bg-cover bg-center"
                        style={{ backgroundImage: `url(${item.img})` }}
                    >
                        {/* 검정 배경 그라데이션 */}
                        <div
                            className="top-overlay absolute inset-0 opacity-0 pointer-events-none"
                            style={{ background: 'linear-gradient(to bottom, rgba(0,0,0,0.9) 0%, rgba(0,0,0,0) 50%)' }}
                        />
                        <div
                            className="bottom-overlay absolute inset-0 opacity-0 pointer-events-none"
                            style={{ background: 'linear-gradient(to top, rgba(0,0,0,0.9) 0%, rgba(0,0,0,0) 50%)' }}
                        />

                        <div className="absolute inset-0 flex flex-col justify-between p-7 text-white pointer-events-none">
                            {/* 상단 영역 (장소, 카메라) */}
                            <div className="top-info opacity-0 flex flex-col gap-1">
                                {/* 장소 */}
                                <div className="flex items-center gap-1.5">
                                    <p className="text-xl font-semibold">{item.location || 'Location unknown'}</p>
                                </div>

                                {/* 카메라 */}
                                <div className="flex items-center gap-1.5">
                                    <p className="text-xs font-light">{item.camera || 'Device info unavailable'}</p>
                                </div>
                            </div>

                            {/* 하단 영역 (유저 정보, 좋아요) */}
                            <div className="bottom-info opacity-0 flex justify-between items-center">
                                {/* 유저 정보 */}
                                <div className="flex items-center gap-2.5">
                                    <img src={item.profileUrl} alt={item.username} className="w-8 h-8 rounded-full object-cover" />
                                    <span className="text-sm font-medium">{item.username}</span>
                                </div>

                                {/* 좋아요 */}
                                <button
                                    onClick={(e) => handleLikeToggle(e, item.id)}
                                    className="pointer-events-auto p-2"
                                >
                                    <img src={item.isLiked ? "/images/ic_like_true.svg" : "/images/ic_like_false.svg"} alt="Like" className="w-5 h-5" />
                                    <span className="text-xs text-[#FF0000]">{item.likeCount}</span>
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            ))}
        </div >
    );
};

export default Masonry;