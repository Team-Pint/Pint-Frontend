import api from "./apiClient";
import type {
  ProfileResponse,
  ProfileUpdatePayload,
  UserProfileApiResponse,
} from "../types/ProfileData";

const normalizeProfileResponse = (
  raw: ProfileResponse,
): ProfileResponse => {
  const profileImageUrl =
    raw.profileImageUrl?.trim() || raw.profileImage?.trim() || "";

  return {
    ...raw,
    profileImageUrl,
  };
};

// 프로필 정보 조회
export const fetchUserProfileData = async (
  userId: number,
): Promise<ProfileResponse> => {
  const response = await api.get<UserProfileApiResponse | ProfileResponse>(
    `/profile/${userId}`,
  );
  const payload = response.data as UserProfileApiResponse;

  if (payload?.data) {
    return normalizeProfileResponse(payload.data);
  }

  return normalizeProfileResponse(response.data as ProfileResponse);
};

// 프로필 정보 수정 (필요 시 호출)
export const updateProfileData = async (
  userId: number,
  userData: ProfileUpdatePayload,
): Promise<ProfileResponse | null> => {
  const formData = new FormData();

  if (userData.username !== undefined) {
    formData.append("username", userData.username);
  }

  if (userData.city !== undefined) {
    formData.append("city", userData.city);
  }

  if (userData.introduction !== undefined) {
    formData.append("introduction", userData.introduction);
  }

  if (userData.profileImage instanceof File) {
    formData.append("profileImage", userData.profileImage);
  }

  const response = await api.put(`/profile/${userId}/edit`, formData);
  const payload = response.data as UserProfileApiResponse;

  if (payload?.data) {
    return normalizeProfileResponse(payload.data);
  }

  // Server returned no profile data — return null so caller knows
  return null;
};
