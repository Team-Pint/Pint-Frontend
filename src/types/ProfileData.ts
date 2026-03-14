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
  profileImage?: string;
  postList: PostSummary[];
  likedPostList: PostSummary[];
}

export interface ProfileUpdatePayload {
  username?: string;
  city?: string;
  introduction?: string;
  profileImage?: File;
}

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
