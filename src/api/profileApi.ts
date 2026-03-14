import api from "./apiClient";
import type {
  ProfileResponse,
  ProfileUpdatePayload,
  UserProfileApiResponse,
} from "../types/ProfileData";

// 프로필 정보 조회
export const fetchUserProfileData = async (
  userId: number,
): Promise<ProfileResponse> => {
  const response = await api.get<UserProfileApiResponse | ProfileResponse>(
    `/profile/${userId}`,
  );
  const payload = response.data as UserProfileApiResponse;

  if (payload?.data) {
    return payload.data;
  }

  return response.data as ProfileResponse;
};

// 프로필 정보 수정 (필요 시 호출)
export const updateProfileData = async (
  userId: number,
  userData: ProfileUpdatePayload,
) => {
  const response = await api.put(`/profile/${userId}/edit`, userData);
  return response.data;
};
