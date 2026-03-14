import type { PostListResponse } from "../types/PostListResponse";
import api from './apiClient';

export const allPostApi = async (page: number, size: number = 10) => {
    const response = await api.get<PostListResponse>(`/posts?page=${page}&size=${size}`);
    
    return response.data.data;
}