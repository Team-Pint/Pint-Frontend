export interface PostSummary {
  postId: number;
  imgUrl: string;
}

export interface ProfileResponse {
  username: string;
  description: string;
  city: string;
  email: string;
  isMe: boolean;
  postList: PostSummary[];
  profileImage: string;
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