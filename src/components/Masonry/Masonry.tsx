import React, { useEffect, useLayoutEffect, useMemo, useRef, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { gsap } from 'gsap';

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
    //likeCount: number;
    //isLiked: boolean;
    //username: string;
    //profileUrl: string;
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
    items,
    columns = 3,
    gap = 16,
    ease = 'power3.out',
    duration = 0.6,
    stagger = 0.05,
    animateFrom = 'bottom',
    blurToFocus = true,
}) => {
    const navigate = useNavigate();
    const [containerRef, { width }] = useMeasure<HTMLDivElement>();
    const [imagesReady, setImagesReady] = useState(false);

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
        preloadImages(items.map(i => i.img)).then(() => setImagesReady(true));
    }, [items]);

    const { grid, totalHeight } = useMemo(() => {
        if (!width) return { grid: [], totalHeight: 0 };

        const colHeights = new Array(columns).fill(0);
        const totalGaps = (columns - 1) * gap;
        const columnWidth = (width - totalGaps) / columns;

        const calculatedGrid = items.map(item => {
            const col = colHeights.indexOf(Math.min(...colHeights));
            const x = col * (columnWidth + gap);
            const y = colHeights[col];

            const itemHeight = (item.height / item.width) * columnWidth;

            colHeights[col] += itemHeight + gap;

            return { ...item, x, y, w: columnWidth, h: itemHeight };
        });

        return { grid: calculatedGrid, totalHeight: Math.max(...colHeights) };
    }, [columns, items, width, gap]);

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

    const handleMouseEnter = (element: HTMLElement) => {
        const bgOverlay = element.querySelector('.bg-overlay') as HTMLElement;
        const textContent = element.querySelector('.text-content') as HTMLElement;
        if (bgOverlay) gsap.to(bgOverlay, { opacity: 1, duration: 0.2 });
        if (textContent) gsap.fromTo(textContent, { y: 20, opacity: 0 }, { y: 0, opacity: 1, duration: 0.4 });
    };

    const handleMouseLeave = (element: HTMLElement) => {
        const bgOverlay = element.querySelector('.bg-overlay') as HTMLElement;
        const textContent = element.querySelector('.text-content') as HTMLElement;
        if (bgOverlay) gsap.to(bgOverlay, { opacity: 0, duration: 0.3 });
        if (textContent) gsap.to(textContent, { y: 10, opacity: 0, duration: 0.3 });
    };

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
                    onClick={() => navigate(`/post/${item.id}`)}
                    onMouseEnter={e => handleMouseEnter(e.currentTarget)}
                    onMouseLeave={e => handleMouseLeave(e.currentTarget)}
                >
                    <div
                        className="relative w-full h-full bg-cover bg-center"
                        style={{ backgroundImage: `url(${item.img})` }}
                    >
                        <div className="bg-overlay absolute inset-0 bg-gradient-to-t from-black via-black/40 to-transparent opacity-0 flex flex-col justify-end p-12 text-white pointer-events-none">
                            {/* 정보 영역 */}
                            <div className="text-content opacity-0 flex items-end justify-between w-full">
                                {/* 텍스트 영역 */}
                                <div className="flex-1 min-w-0 pr-4">
                                    <p className="text-base">
                                        {item.location || '장소 정보 없음'}
                                    </p>
                                    <p className="text-xs mt-1 font-light">
                                        {item.camera || '카메라 정보 없음'}
                                    </p>
                                </div>

                                {/* 좋아요 버튼 영역 */}
                                {/* <button onClick={(e) => e.stopPropagation()} className="pointer-events-auto p-2 transition-transform active:scale-90 hover:scale-110">
                                <img src={`${item.isLiked ? "/images/ic_like_true.svg" : "/images/ic_like_false.svg"}`} alt='좋아요 버튼' className="w-4 h-4 object-contain" />
                            </button> */}
                            </div>
                        </div>
                    </div>
                </div>
            ))
            }
        </div >
    );
};

export default Masonry;