import type { PostLikeResponse  } from "../types/PostLikeResponse";
import api from './apiClient';

export const postLikeApi = async (postId: string): Promise<PostLikeResponse> => {
    const resopnse = await api.post<PostLikeResponse>(`/likes/${postId}`);

    return resopnse.data;
}