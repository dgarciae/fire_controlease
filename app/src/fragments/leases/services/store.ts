import { create } from "zustand";

/* **
 * Types
 ** */

type LeasesStoreStateType = {
  form: { tab: string | null; detailsTab: string | null };
  search: { query: string | null };
  sort: { key: string | null; reverse: boolean };
  markLeases: {
    isActive: boolean;
    items: { id: string; name: string }[];
    reset: () => void;
    toggleActive: () => void;
    toggleLease: (leaseId: string, leaseName: string) => void;
  };
  services: {
    isNew: boolean;
    deleteModalOpen: boolean;
    leaseToDelete: string | null;
  };
  changedFields: string[] | null;
};

/* **
 * Store
 ** */

export const useLeasesStore = create<LeasesStoreStateType>((set) => {
  return {
    form: { tab: null, detailsTab: null },
    search: { query: null },
    sort: { key: null, reverse: false },
    markLeases: {
      isActive: false,
      items: [],
      reset: () => {
        set((prev) => ({
          markLeases: { ...prev.markLeases, isActive: false, ids: [] },
        }));
      },
      toggleActive: () => {
        set((prev) => ({
          markLeases: {
            ...prev.markLeases,
            isActive: !prev.markLeases.isActive,
          },
        }));
      },
      toggleLease: (leaseId: string, leaseName: string) => {
        set((prev) => {
          const exists = prev.markLeases.items.map((item) => item.id).includes(leaseId);
          const items = exists
            ? prev.markLeases.items.filter((item) => item.id !== leaseId)
            : [...prev.markLeases.items, { id: leaseId, name: leaseName }];
          return { markLeases: { ...prev.markLeases, items } };
        });
      },
    },
    services: { isNew: false, deleteModalOpen: false, leaseToDelete: null },
    changedFields: null,
  };
});
