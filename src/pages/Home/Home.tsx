import { useMemo } from "react";
import type { PostList } from "../../types/PostListResponse";
import { MasonryPhotoAlbum } from "react-photo-album";
import "react-photo-album/masonry.css";

const DUMMY_POSTS: PostList[] = [
        { postId: 1, imgUrl: "https://picsum.photos/id/10/800/600", width: 800, height: 600 },
        { postId: 2, imgUrl: "https://picsum.photos/id/20/600/800", width: 600, height: 800 },
        { postId: 3, imgUrl: "https://picsum.photos/id/30/1000/1000", width: 1000, height: 1000 },
        { postId: 4, imgUrl: "https://picsum.photos/id/40/1200/800", width: 1200, height: 800 },
        { postId: 5, imgUrl: "https://picsum.photos/id/50/600/900", width: 600, height: 900 },
        { postId: 6, imgUrl: "https://picsum.photos/id/60/800/800", width: 800, height: 800 },
        { postId: 7, imgUrl: "https://picsum.photos/id/70/1600/900", width: 1600, height: 900 },
        { postId: 8, imgUrl: "https://picsum.photos/id/80/700/1000", width: 700, height: 1000 },
    ]

const Home = () => {
    const photos = useMemo(() => DUMMY_POSTS.map((post) => ({
        src: post.imgUrl,
        width: post.width,
        height: post.height,
    })), []);

    return (
        <div className="block w-full max-w-7xl mx-auto p-14">
            <MasonryPhotoAlbum
                photos={photos}
                spacing={14}
                columns={3}
            />
        </div>
    );
}

export default Home;