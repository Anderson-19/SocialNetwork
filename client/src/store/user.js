import { create } from "zustand";
import { persist } from "zustand/middleware";

export const useUserStore = create(
  persist(
    (set, get) => ({
      user: {
        uid: "",
        name: "",
        email: "",
        lastname: "",
        username: "",
        avatar: "",
        banner: "",
        password: "",
        token: "",
        created_at: "",
        isLogged: false
    },

      setUser: (user) => {
        set({ user });
      },
    }),
    {
      name: "user-storage",
    }
  )
);