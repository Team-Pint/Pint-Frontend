import type { PostList, PostListResponse } from "../types/PostListResponse";
import api from "./apiClient"

export const allPostApi = async (): Promise<PostList[]> => {
    
    const response = await api.get<PostListResponse>("/posts");

    return response.data.data;
}