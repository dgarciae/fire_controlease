import { UserSessionType } from "../domain";

export function useSession() {
  const retrieveUserSession = () => {
    const item = sessionStorage.getItem("userSession");
    return item ? (JSON.parse(item) as UserSessionType) : null;
  };

  const saveUserSession = (item: UserSessionType) =>
    sessionStorage.setItem("userSession", JSON.stringify(item));

  const deleteUserSession = () => sessionStorage.removeItem("userSession");

  return { retrieveUserSession, saveUserSession, deleteUserSession };
}
