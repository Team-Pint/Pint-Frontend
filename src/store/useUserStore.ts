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
            setProfileImageUrl: (url) => set({ profileImageUrl: url }),
            clearUser: () => set({ profileImageUrl: "" }),
        }),
        { name: 'user-store' },
    ),
);