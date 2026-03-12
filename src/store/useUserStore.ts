import { create } from 'zustand';
import type { ProfileResponse } from '../types/ProfileData';

interface UserState {
  myProfile: ProfileResponse;
  // 전체 또는 부분 업데이트를 위한 함수
  updateProfile: (updates: Partial<ProfileResponse>) => void;
}

export const useUserStore = create<UserState>((set) => ({
  myProfile: {
    username: "최 소영",
    description: "백엔드 작업 중이라 잠시 가짜 데이터를 보여주고 있어요!",
    city: "SEOUL, KOREA",
    email: "soyoung@example.com",
    isMe: true,
    // 초기 이미지가 없을 경우 null 혹은 기본 URL
    profileImage: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=500",
    postList: [
      { postId: 1, imgUrl: "https://picsum.photos/seed/1/800/1200" },
      { postId: 2, imgUrl: "https://picsum.photos/seed/2/800/1200" },
      { postId: 3, imgUrl: "https://picsum.photos/seed/3/800/1200" },
      { postId: 4, imgUrl: "https://picsum.photos/seed/4/800/1200" },
      { postId: 5, imgUrl: "https://picsum.photos/seed/5/800/1200" },
      { postId: 6, imgUrl: "https://picsum.photos/seed/6/800/1200" },
    ]
  },
  updateProfile: (updates) => set((state) => ({
    myProfile: { ...state.myProfile, ...updates }
  })),
}));