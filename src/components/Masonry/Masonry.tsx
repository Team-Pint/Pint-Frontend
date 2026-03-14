import React, { useEffect, useLayoutEffect, useRef, useState } from 'react';
import { gsap } from 'gsap';
import { postLikeApi } from "../../api/postLikeApi";
import MasonryItem from './MasonryItem';
import { useMasonryLayout } from '../../hooks/useMasonryLayout';

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
    const hasMounted = useRef(false);

    const { grid, totalHeight } = useMasonryLayout(itemList, width, columns, gap);

    // 초기 위치 계산 함수 (GSAP 초기 애니메이션용)
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

    // 데이터 동기화
    useEffect(() => {
        setItemList(initialItems);
    }, [initialItems])

    // 프리로딩
    useEffect(() => {
        if (initialItems.length > 0) {
            preloadImages(initialItems.map(i => i.img)).then(() => setImagesReady(true));
        }
    }, [initialItems]);

    // 레이아웃 애니메이션 (GSAP)
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
                <MasonryItem
                    key={item.id}
                    item={item}
                    handleLikeToggle={handleLikeToggle} />
            ))}
        </div >
    );
};

export default Masonry;