// src/stores/userStore.js
import { create } from "zustand";
import { persist } from "zustand/middleware";

const useUserStore = create(
  persist(
    (set) => ({
      user: null,

      setUser: (userData) => set({ user: userData }),

      clearUser: () => {
        set({ user: null });
        localStorage.removeItem("user"); // Clear persisted user from localStorage
      },
    }),
    {
      name: "user", // key in localStorage
    }
  )
);

export default useUserStore;
