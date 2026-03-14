export interface PostLikeResponse {
    code: number;
    message: string;
    data: {
        isLiked: boolean;
        likeCount: number;
    }
}