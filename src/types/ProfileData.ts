export interface PostSummary {
  postId: number;
  imageUrl: string;
  location?: string;
  camera?: string;
  description?: string;
}

export interface ProfileResponse {
  username: string;
  introduction: string;
  city: string;
  email: string;
  isMe: boolean;
  profileImageUrl?: string;
  postList: PostSummary[];
  likedPostList: PostSummary[];
}

export type ProfileUpdatePayload = Omit<Partial<ProfileResponse>, "postList">;

export interface UserProfileApiResponse {
  code?: number;
  message?: string;
  data?: ProfileResponse;
}

export interface PostDetail {
  postId: number;
  location: string;
  camera: string;
  description: string;
  imgUrl: string;
  username: string;
  profileImage: string;
  isWriter: boolean;
}
