import api from './apiClient';
import type { PostDetailApiResponse } from '../types/ProfileData';

// 포스트 상세 정보 조회
export const fetchPostDetailData = async (postId: number): Promise<PostDetailApiResponse> => {
  const response = await api.get(`/posts/${postId}`);
  return response.data.data;
};

// 포스트 삭제
export const deletePostApi = async (postId: number): Promise<{ code: number; message: string; data: string; }> => {
  const response = await api.delete(`/posts/${postId}`);

  return response.data;
}