import { useNavigate } from "@tanstack/react-router";

import {
  type AuthResponseType,
  type LoginType,
  apiUrls,
  appRoutes,
  useAuthStore,
} from "../../core";
import { httpRequest } from "../services/http";

export function useAuth() {
  /* Store and hooks */

  const login = useAuthStore.getState().login;
  const navigate = useNavigate();

  /* Functions */

  const checkEmailAvailability = async (email: string) => {
    try {
      const res = (await httpRequest({
        url: apiUrls.auth.login,
        method: "POST",
        isProtected: true,
        json: { email },
      })) as { available: boolean };
      return res.available;
    } catch (error) {
      console.error(error);
      return false;
    }
  };

  const submitAuth = async (credentials: LoginType) => {
    try {
      const res = (await httpRequest({
        url: apiUrls.auth.login,
        method: "POST",
        isProtected: false,
        json: credentials,
      })) as AuthResponseType;
      const { accessToken, sessionToken } = res;
      login({ accessToken, sessionToken });
      navigate({ to: `/${appRoutes.leases.list}`, replace: true });
    } catch (error) {
      console.error(error);
    }
  };

  /* Return */

  return { submitAuth, checkEmailAvailability };
}
