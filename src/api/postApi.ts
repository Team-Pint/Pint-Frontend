import api from './apiClient';
import type { PostDetailApiResponse } from '../types/ProfileData';

// 포스트 상세 정보 조회
export const fetchPostDetailData = async (postId: number): Promise<PostDetailApiResponse> => {
  const response = await api.get(`/posts/${postId}`);
  console.log(response);
  return response.data.data;
};

// 포스트 수정
export const updatePostApi = async (postId: number, updateData: {
  description: string;
  location: string;
  camera: string;
  filter: File | null;
}) => {
  const formData = new FormData();

    formData.append("description", updateData.description);
    formData.append("location", updateData.location);
    formData.append("camera", updateData.camera);
    if (updateData.filter) {
        formData.append("filter", updateData.filter);
    }

    const response = await api.put(`/posts/${postId}`, formData);

    return response.data;
}

// 포스트 삭제
export const deletePostApi = async (postId: number): Promise<{ code: number; message: string; data: string; }> => {
  const response = await api.delete(`/posts/${postId}`);

  return response.data;
}