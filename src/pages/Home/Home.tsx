import { useMemo } from "react";
import type { PostList } from "../../types/PostListResponse";
import Masonry from "../../components/Masonry/Masonry";

const DUMMY_POSTS: PostList[] = [
        { postId: 1, imgUrl: "https://picsum.photos/id/10/800/600", width: 800, height: 600, location: "장소", camera: "IPHONE X", isLiked: false },
        { postId: 2, imgUrl: "https://picsum.photos/id/20/600/800", width: 600, height: 800, location: "장소", camera: "IPHONE X", isLiked: true },
        { postId: 3, imgUrl: "https://picsum.photos/id/30/1000/1000", width: 1000, height: 1000, location: "장소", camera: "IPHONE X", isLiked: false },
        { postId: 4, imgUrl: "https://picsum.photos/id/40/1200/800", width: 1200, height: 800, location: "장소", camera: "IPHONE X", isLiked: false },
        { postId: 5, imgUrl: "https://picsum.photos/id/50/600/900", width: 600, height: 900, location: "장소", camera: "IPHONE X", isLiked: true },
        { postId: 6, imgUrl: "https://picsum.photos/id/60/800/800", width: 800, height: 800, location: "장소", camera: "IPHONE X", isLiked: false },
        { postId: 7, imgUrl: "https://picsum.photos/id/70/1600/900", width: 1600, height: 900, location: "장소", camera: "IPHONE X", isLiked: false },
        { postId: 8, imgUrl: "https://picsum.photos/id/80/700/1000", width: 700, height: 1000, location: "장소", camera: "IPHONE X", isLiked: false },
    ] 

const Home = () => {
    const masonryItems = useMemo(() => DUMMY_POSTS.map((post) => ({
        id: String(post.postId),
        img: post.imgUrl,
        height: post.height,
        location: post.location,
        camera: post.camera,
        isLiked: post.isLiked
    })), []);

    return (
        <div className="w-full h-screen px-48 py-24">
            <Masonry items={masonryItems} />
        </div>
    );
}

export default Home;