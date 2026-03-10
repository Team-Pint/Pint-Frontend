export interface PostList {
    postId: number;
    imgUrl: string;
    width: number;
    height: number;
}

export interface PostListResponse {
    status: number;
    message: string;
    data: {
        postList: PostList[];
    };
}