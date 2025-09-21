import { type User, type UserCredential, onAuthStateChanged } from "firebase/auth";
import { create } from "zustand";

import { type UserCredMetadata } from "../domain/types.d";
import { firebaseAuth } from "../services/firebase";

/* **
 * Types
 ** */

type AuthStoreStateType = {
  userSession: UserCredential | null;
  idToken: string | null;
  idTokenClaims: { [key: string]: any } | null;
  expMs: number | null;
  updateUserSession: (user: User) => void;
  register: (userCred: UserCredential) => void;
  login: (userCred: UserCredential) => void;
  logout: () => void;
  setIdToken: () => Promise<void>;
  setIdTokenClaims: () => Promise<void>;
  refreshIdTokenClaims: (force?: boolean) => Promise<void>;
  setIdTokenExp: () => Promise<void>;
  checkRole: (...roles: string[]) => boolean;
  checkPermissions: (...permissions: string[]) => boolean;
  isValidSession: () => boolean;
};

/* **
 * Helpers
 ** */

/* Stored metadata */

const retrieveUserCredMetadata = () => {
  const item = localStorage.getItem("userCredMetadata");
  return item ? (JSON.parse(item) as UserCredMetadata) : null;
};

const saveUserCredMetadata = (item: UserCredMetadata) =>
  localStorage.setItem("userCredMetadata", JSON.stringify(item));

const deleteUserCredMetadata = () => localStorage.removeItem("userCredMetadata");

/* Build and persist user credential  */

const buildUserCredential = (user: User): UserCredential => {
  const metadata = retrieveUserCredMetadata();

  return {
    user,
    providerId: metadata?.providerId ?? user.providerData?.[0]?.providerId ?? null,
    operationType: (metadata?.operationType as any) ?? undefined,
    additionalUserInfo: metadata?.additionalUserInfo ?? undefined,
  } as unknown as UserCredential;
};

const persistMetaFromUserCredential = (userCred: UserCredential) => {
  const meta = {
    providerId: userCred.providerId ?? null,
    operationType: (userCred.operationType as unknown as string) ?? null,
    additionalUserInfo: (userCred as any).additionalUserInfo ?? null,
  };
  saveUserCredMetadata(meta);
};

/* **
 * Store
 ** */

export const useAuthStore = create<AuthStoreStateType>((set, get) => {
  return {
    userSession: null,
    idToken: null,
    idTokenClaims: null,
    expMs: null,
    updateUserSession: (user: User) => {
      const userCred = buildUserCredential(user);
      set({ userSession: userCred });

      /* Update idToken, claims and exp on background */
      void (async () => await get().setIdToken())();
      void (async () => await get().setIdTokenClaims())();
      void (async () => await get().setIdTokenExp())();
    },
    register: async (userCred: UserCredential) => {
      const currentSession = userCred;
      set({ userSession: currentSession });
      persistMetaFromUserCredential(userCred);

      /* Update idToken, claims and exp on background */
      void (async () => await get().setIdToken())();
      void (async () => await get().setIdTokenClaims())();
      void (async () => await get().setIdTokenExp())();
    },
    login: async (userCred: UserCredential) => {
      const currentSession = userCred;
      set({ userSession: currentSession });
      persistMetaFromUserCredential(userCred);

      /* Update idToken, claims and exp on background */
      void (async () => await get().setIdToken())();
      void (async () => await get().setIdTokenClaims())();
      void (async () => await get().setIdTokenExp())();
    },
    logout: () => {
      set({ userSession: null, idToken: null, idTokenClaims: null, expMs: null });
      deleteUserCredMetadata();
    },
    setIdToken: async () => {
      const { userSession } = get();
      try {
        const idToken = await userSession?.user.getIdToken();
        set({ idToken });
      } catch {
        set({ idToken: null });
      }
    },
    setIdTokenClaims: async () => {
      const { userSession } = get();
      try {
        const idTokenResult = await userSession?.user.getIdTokenResult();
        set({ idTokenClaims: idTokenResult?.claims ?? null });
      } catch {
        set({ idTokenClaims: null });
      }
    },
    refreshIdTokenClaims: async (force = false) => {
      const { userSession } = get();
      if (!userSession?.user) return;
      const idTokenResult = await userSession.user.getIdTokenResult(force);
      set({ idTokenClaims: idTokenResult.claims ?? null });
    },
    setIdTokenExp: async () => {
      const { userSession } = get();
      try {
        const idTokenResult = await userSession?.user.getIdTokenResult();
        const expirationTime = idTokenResult?.expirationTime ?? null;
        const parsed = expirationTime ? Date.parse(expirationTime) : NaN;
        const expMs = !Number.isNaN(parsed) ? parsed : null;
        set({ expMs });
      } catch {
        set({ expMs: null });
      }
    },
    checkRole: (...roles: string[]) => {
      const { idTokenClaims } = get();
      if (!idTokenClaims) {
        void get().refreshIdTokenClaims(true);
        return false;
      }
      const role = idTokenClaims.role ?? null;
      return role ? roles.includes(role) : false;
    },
    checkPermissions: (...permissions: string[]) => {
      const { idTokenClaims } = get();
      if (!idTokenClaims) {
        void get().refreshIdTokenClaims(true);
        return false;
      }
      const userPerms: string[] = Array.isArray(idTokenClaims.permissions)
        ? idTokenClaims.permissions
        : [];
      return permissions.every((p) => userPerms.includes(p));
    },
    isValidSession: () => {
      const { expMs } = get();
      return expMs ? expMs > Date.now() : false;
    },
  };
});

/* **
 * Firebase auth listener
 ** */

onAuthStateChanged(firebaseAuth, (user) => {
  if (user) useAuthStore.getState().updateUserSession(user);
  else useAuthStore.getState().logout();
});
