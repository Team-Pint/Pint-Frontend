import api from './apiClient';

// 프로필 정보 조회
export const fetchUserProfileData = async (userId: number) => {
  const response = await api.get(`/users/${userId}`);
  return response.data;
};

// 프로필 정보 수정 (필요 시 호출)
export const updateProfileData = async (userData: any) => {
  const response = await api.put('/users/me', userData);
  return response.data;
};