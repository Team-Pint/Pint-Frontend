export interface PostList {
    postId: number;
    imgUrl: string;
    width: number;
    height: number;
    location: string;
    camera: string;
    isLiked: boolean
}

export interface PostListResponse {
    status: number;
    message: string;
    data: {
        postList: PostList[];
    };
}