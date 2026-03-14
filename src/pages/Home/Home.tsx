import { useEffect, useMemo, useState, useRef, useCallback } from "react";
import type { PostList } from "../../types/PostListResponse";
import Masonry from "../../components/Masonry/Masonry";
import { allPostApi } from "../../api/allPostApi";

const Home = () => {
    const [posts, setPosts] = useState<PostList[]>([]);
    const [page, setPage] = useState(0);
    const [loading, setLoading] = useState(false);
    const [hasNext, setHasNext] = useState(true);
    
    const observerRef = useRef<HTMLDivElement | null>(null);
    const lastFetchedPage = useRef<number>(-1);

    useEffect(() => {
        if ('scrollRestoration' in window.history) {
            window.history.scrollRestoration = 'manual';
        }
        window.scrollTo(0, 0);
    }, []);

    const fetchPosts = useCallback(async (currentPage: number) => {
        if (loading || !hasNext || lastFetchedPage.current === currentPage) return;

        setLoading(true);
        try {
            const data = await allPostApi(currentPage, 10);
            
            setPosts(prev => {
                const existingIds = new Set(prev.map(post => post.id));
                const newPosts = data.postList.filter(post => !existingIds.has(post.id));
                return [...prev, ...newPosts];
            });

            setHasNext(data.hasNext);
            lastFetchedPage.current = currentPage;
        } catch (error) {
            console.error("데이터 로드 실패", error);
        } finally {
            setLoading(false);
        }
    }, [loading, hasNext]);

    useEffect(() => {
        fetchPosts(page);
    }, [page, fetchPosts]);

    // Intersection Observer 설정
    useEffect(() => {
        if (loading || !hasNext) return;

        const observer = new IntersectionObserver(
            (entries) => {
                if (entries[0].isIntersecting) {
                    setPage(prev => prev + 1);
                }
            },
            { 
                threshold: 1.0,
                rootMargin: "0px 0px 100px 0px"
            }
        );

        if (observerRef.current) {
            observer.observe(observerRef.current);
        }

        return () => observer.disconnect();
    }, [hasNext, loading]);

    const masonryItems = useMemo(() => posts.map((post) => ({
        id: String(post.id),
        img: post.imageUrl,
        width: post.width,
        height: post.height,
        location: post.location,
        camera: post.camera,
        isLiked: post.isLiked,
        likeCount: post.likeCount,
        username: post.userInfo.username,
        profileUrl: post.userInfo.profileImage
    })), [posts]);

    return (
        <div className="w-full px-48 py-24 min-h-screen">
            {masonryItems.length > 0 ? (
                <>
                    <Masonry items={masonryItems} />
                    {!loading && hasNext && (
                        <div ref={observerRef} className="h-10 w-full" />
                    )}
                    {loading && (
                        <div className="h-20 w-full flex items-center justify-center text-gray-400">
                            데이터를 더 불러오는 중...
                        </div>
                    )}
                </>
            ) : (
                !loading && <div className="text-center text-gray-500 mt-20">등록된 게시글이 없습니다.</div>
            )}
        </div>
    );
}

export default Home;