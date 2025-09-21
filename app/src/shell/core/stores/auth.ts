import { jwtDecode } from "jwt-decode";
import { create } from "zustand";

import {
  type AccessTokenType,
  type SessionDataParams,
  type SessionTokenSchema,
  type UserSessionType,
  initialUser,
} from "../domain";
import { useSession } from "../hooks/useSession";

/* **
 * Types
 ** */

type AuthStoreStateType = {
  userSession: UserSessionType;
  login: (params: SessionDataParams) => void;
  logout: () => void;
  checkRole: (...roles: string[]) => boolean;
  checkPremissions: (...permissions: string[]) => boolean;
  isValidSession: () => boolean;
};

/* **
 * Store
 ** */

export const useAuthStore = create<AuthStoreStateType>((set, get) => {
  const { retrieveUserSession, saveUserSession, deleteUserSession } = useSession();

  return {
    userSession: retrieveUserSession() ?? initialUser,
    login: ({ accessToken, sessionToken }) => {
      const access = jwtDecode<AccessTokenType>(accessToken);
      const session = jwtDecode<SessionTokenSchema>(sessionToken);
      const currentSession = {
        isAuthenticated: true,
        accessToken,
        exp: access.exp,
        activeScope: session.scopes.length > 0 ? session.scopes[0].id : null,
        user: session,
      };
      set({ userSession: currentSession });
      saveUserSession(currentSession);
    },
    logout: () => {
      set({ userSession: initialUser });
      deleteUserSession();
    },
    checkRole: (...roles: string[]) => {
      const { userSession } = get();
      return roles.includes(userSession.user.role);
    },
    checkPremissions: (...permissions: string[]) => {
      const { userSession } = get();
      return permissions.some((permission) =>
        userSession.user.permissions.includes(permission)
      );
    },
    isValidSession: () => {
      const { userSession } = get();
      return userSession!.exp! > Math.floor(Date.now() / 1000) - 120;
    },
  };
});
