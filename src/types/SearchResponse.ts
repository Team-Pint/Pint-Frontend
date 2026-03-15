export interface SearchUser {
    userId: number;
    username: string;
    profileImage: string | null;
}

export interface SearchResponse {
    code: number;
    message: string;
    data: {
        userList: SearchUser[];
    } | null;
}