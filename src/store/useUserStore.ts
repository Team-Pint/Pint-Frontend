import { create } from 'zustand';

interface UserState {
    profileImageUrl: string;
    setProfileImageUrl:(url: string) => void;
}

export const useUserStore = create<UserState>((set) => ({
    profileImageUrl: "",
    setProfileImageUrl: (url) => set({ profileImageUrl: url}),
}));