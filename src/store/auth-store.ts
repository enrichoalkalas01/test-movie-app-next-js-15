import { create } from "zustand";

interface IUseAuthStore {
    authStatus: boolean;
    setAuthStatus: (value: boolean) => void;

    userData: IUserData|null;
    setUserData: (value: IUserData|null) => void;

    userRegistered: IUserData[];
    setUserRegistered: (value: IUserData[]) => void;
}

interface IUserData {
    username: string;
    password: string;
}

export const useAuthStore = create<IUseAuthStore>((set) => {
    return {
        authStatus: false,
        setAuthStatus: (value: boolean) => set({ authStatus: value }),

        userData: null,
        setUserData: (value: IUserData|null) => set({ userData: value }),

        userRegistered: [{ username: "admin", password: "admin" }],
        setUserRegistered: (value: IUserData[]) => set({ userRegistered: value }),
    };
});
