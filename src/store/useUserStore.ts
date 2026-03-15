import { create } from 'zustand';
import { persist } from 'zustand/middleware';

interface UserState {
    profileImageUrl: string;
    setProfileImageUrl:(url: string) => void;
}

export const useUserStore = create<UserState>()(
    persist(
        (set) => ({
            profileImageUrl: "",
            setProfileImageUrl: (url) => set({ profileImageUrl: url }),
        }),
        { name: 'user-store' },
    ),
);