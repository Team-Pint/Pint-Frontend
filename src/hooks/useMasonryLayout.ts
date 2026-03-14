import { useMemo } from 'react';

// 좌표 계산 로직 (라이브러리 파일 분리)
export const useMasonryLayout = (items: any[], width: number, columns: number, gap: number) => {
    return useMemo(() => {
        if (!width) return { grid: [], totalHeight: 0 };

        const colHeights = new Array(columns).fill(0);
        const columnWidth = (width - (columns - 1) * gap) / columns;

        const grid = items.map(item => {
            const col = colHeights.indexOf(Math.min(...colHeights));
            const x = col * (columnWidth + gap);
            const y = colHeights[col];
            const itemHeight = (item.height / item.width) * columnWidth;

            colHeights[col] += itemHeight + gap;
            return { ...item, x, y, w: columnWidth, h: itemHeight };
        });

        return { grid, totalHeight: Math.max(...colHeights) };
    }, [items, width, columns, gap]);
};