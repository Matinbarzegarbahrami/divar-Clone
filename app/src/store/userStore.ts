import { create } from "zustand";
import { persist } from "zustand/middleware";

type User = {
  loggedIn: boolean;
  phone: string | null;
};

type Store = {
  user: User;
  login: (phone: string) => void;
  logout: () => void;
};

export const useUser = create<Store>()(
  persist(
    (set) => ({
      user: {
        loggedIn: false,
        phone: null,
      },

      login: (phone) =>
        set({
          user: {
            loggedIn: true,
            phone,
          },
        }),

      logout: () =>
        set({
          user: {
            loggedIn: false,
            phone: null,
          },
        }),
    }),
    {
      name: "user-storage",
    }
  )
);