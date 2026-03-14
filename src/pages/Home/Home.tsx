import { useEffect, useMemo, useState } from "react";
import type { PostList } from "../../types/PostListResponse";
import Masonry from "../../components/Masonry/Masonry";
import { allPostApi } from "../../api/allPostApi";

const Home = () => {

    const [posts, setPosts] = useState<PostList[]>([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchPosts = async () => {
            try {
                const data = await allPostApi();
                console.log("API 응답 데이터: ", data);
                setPosts(data);
            } catch (error) {
                console.error("데이터 로드 실패", error);
            } finally {
                setLoading(false);
            }
        };

        fetchPosts();
    }, []);

    const masonryItems = useMemo(() => posts.map((post) => ({
        id: String(post.id),
        img: post.imageUrl,
        width: post.width,
        height: post.height,
        location: post.location,
        camera: post.camera,
        isLiked: post.isLiked,
        likeCount: post.likeCount,
        username: post.username,
        profileUrl: post.profileUrl
    })), [posts]);

    if (loading) return "로딩 중...";

    return (
        <div className="w-full h-screen px-48 py-24">
            {masonryItems.length > 0 ? (
                <Masonry items={masonryItems} />
            ) : (
                <div className="text-center text-gray-500">등록된 게시글이 없습니다.</div>
            )}
        </div>
    );
}

export default Home;