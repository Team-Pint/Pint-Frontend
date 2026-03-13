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

// 💡 명세서 기반으로 업데이트된 상세 인터페이스
export interface PostDetail {
  postId: number;
  postImgUrl: string; // imgUrl -> postImgUrl
  location: string;
  camera: string;
  description: string;
  isLiked: boolean;
  userInfo: {
    nickname: string;
    profileImage: string;
    isWriter: boolean;
  };
  filter: {
    basicAdjustments?: Record<string, string>;
    colorAdjustments?: Record<string, string>;
    detailAdjustments?: Record<string, string>;
    [key: string]: any; // 기타 커스텀 필터 대비
  };
}