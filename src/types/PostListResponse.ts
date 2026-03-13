export interface PostList {
    id: number;
    imageUrl: string;
    width: number;
    height: number;
    location: string;
    camera: string;
    // isLiked: boolean;
}

export interface PostListResponse {
    code: number;
    message: string;
    data: {
        postList: PostList[];
    }
}