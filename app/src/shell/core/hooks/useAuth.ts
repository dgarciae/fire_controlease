import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
} from "firebase/auth";

import { useNavigate } from "@tanstack/react-router";

import { type Login, apiUrls, firebaseAuth, useAuthStore } from "../../core";
import { httpRequest } from "../services/http";

export function useAuth() {
  /* Store and hooks */

  const register = useAuthStore.getState().register;
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

  const submitRegister = async (credentials: Login) => {
    try {
      const user = await createUserWithEmailAndPassword(
        firebaseAuth,
        credentials.email,
        credentials.password
      );

      register(user);

      navigate({ to: "/leasing-contracts", replace: true });
    } catch (error) {
      console.error(error);
    }
  };

  const submitLogin = async (credentials: Login) => {
    try {
      const user = await signInWithEmailAndPassword(
        firebaseAuth,
        credentials.email,
        credentials.password
      );

      login(user);

      navigate({ to: "/leasing-contracts", replace: true });
    } catch (error) {
      console.error(error);
    }
  };

  /* Return */

  return { submitRegister, submitLogin, checkEmailAvailability };
}
