import { create } from 'zustand';
import { persist } from 'zustand/middleware';
interface RegisterModalState {
    isOpen: boolean;
    changeIsOpen: (isOpen: boolean) => void;
}
export const useRegisterModal = create<RegisterModalState>()(
  persist(
    (set) => ({
      isOpen: false,
      changeIsOpen: (isOpen) => set({ isOpen }),
    }),
    {
      name: "register-modal",
    }
  )
);