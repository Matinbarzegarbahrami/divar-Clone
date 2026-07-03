import { create } from "zustand";
import { persist } from "zustand/middleware";

export type cityT = {
  name: string;
  id: number;
  posts: any[];
};

type useCityT = {
  city: cityT;
  setCity: (location: cityT) => void;
};

export const useCity = create<useCityT>()(
  persist(
    (set) => ({
      city: { name: "tehran", id: 1, posts: [] },
      setCity: (location) => set({ city: location }),
    }),
    {
      name: "city-storage",
    }
  )
);