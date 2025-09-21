import { create } from "zustand";

import { Lease } from "./model";

/* **
 * Types
 ** */

type LeasesStoreState = {
  form: {
    data: Lease | null;
    isSubmiting: boolean;
    setData: (data: Lease) => void;
    setIsSubmitting: (isSubmiting: boolean) => void;
  };
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

export const useLeasesStore = create<LeasesStoreState>((set) => {
  return {
    form: {
      data: null,
      isSubmiting: false,
      setData: (data: Lease) => {
        set((prev) => ({ form: { ...prev.form, data } }));
      },
      setIsSubmitting: (isSubmiting: boolean) => {
        set((prev) => ({ form: { ...prev.form, isSubmiting } }));
      },
    },
    search: { query: null },
    sort: { key: null, reverse: false },
    markLeases: {
      isActive: false,
      items: [],
      reset: () => {
        set((prev) => ({
          markLeases: { ...prev.markLeases, isActive: false, items: [] },
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
