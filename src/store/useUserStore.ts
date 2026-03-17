import { create } from 'zustand';
import { persist } from 'zustand/middleware';

interface UserState {
    profileImageUrl: string;
    setProfileImageUrl:(url: string) => void;
    clearUser: () => void;
}

export const useUserStore = create<UserState>()(
    persist(
        (set) => ({
            profileImageUrl: "",
            setProfileImageUrl: (url) => {
                console.log("스토어에 이미지 저장 시도:", url);
                set({ profileImageUrl: url })
            },
            clearUser: () => set({ profileImageUrl: "" }),
        }),
        { name: 'user-store' },
    ),
);