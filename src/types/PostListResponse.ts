export interface UserInfo {
    userId: number;
    username: string;
    profileImage: string;
    isWriter: boolean;
}

export interface PostList {
    id: number;
    imageUrl: string;
    width: number;
    height: number;
    location: string;
    camera: string;
    isLiked: boolean;
    likeCount: number;
    userInfo: UserInfo;
}

export interface PostListResponse {
    code: number;
    message: string;
    data: {
        postList: PostList[];
        page: number;
        size: number;
        totalElements: number;
        totalPages: number;
        hasNext: boolean;
        hasPrevious: boolean;
        isFirst: boolean;
        isLast: boolean;
    };
}