import { create } from "zustand";

/* **
 * Types
 ** */

type AuthStoreStateType = {
  pagination: { perPage: number; setPerPage: (perPage: number) => void };
};

/* **
 * Store
 ** */

export const useGlobalStore = create<AuthStoreStateType>((set, _) => {
  return {
    pagination: {
      perPage: 20,
      setPerPage: (perPage: number) => {
        set((prev) => ({
          pagination: { ...prev.pagination, perPage },
        }));
      },
    },
  };
});
