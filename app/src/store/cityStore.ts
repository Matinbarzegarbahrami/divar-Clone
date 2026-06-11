import { create } from "zustand";
import { persist } from "zustand/middleware";

export type cityT = 'tehran' | 'tabriz';

type useCityT = {
    city:cityT;
    setCity: (location:cityT) => void 
}

export const useCity = create<useCityT>()(
    persist(
        (set)=>({
            city:'tehran',
            setCity: (location) => (
                set({city:location})
            )
        }),
        {
            name:"city-storage"
        }
    )
)