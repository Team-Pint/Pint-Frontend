import api from './apiClient';

// 포스트 상세 정보 조회
export const fetchPostDetailData = async (postId: number) => {
  const response = await api.get(`/posts/${postId}`);
  return response.data;
};