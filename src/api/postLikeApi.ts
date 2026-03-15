import type { PostLikeResponse  } from "../types/PostLikeResponse";
import api from './apiClient';

export const postLikeApi = async (postId: string): Promise<PostLikeResponse> => {
    const response = await api.post<PostLikeResponse>(`/likes/${postId}`);

    return response.data;
}