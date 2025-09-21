import { UserCredential } from "firebase/auth";

import { toast } from "react-toastify";

import {
  AuthError,
  ControlledError,
  ERROR_TOAST_OPTIONS,
  InvalidJSONResponseError,
  UnknownError,
} from "../domain";
import { useAuthStore } from "../stores/auth";
import { log, logError } from "./logging";

/* **
 * Params
 * ** */

interface HttpRequestParams {
  url: string;
  method: string;
  isProtected: boolean;
  multipart?: "general" | "specific" | null;
  json?: object | null;
  userSession?: UserCredential | null;
  files?: FileList[] | null;
}

interface SetHeaderParams {
  isProtected: boolean;
  multipart: "general" | "specific" | null;
}

interface SetMultiPartBodyParams {
  isSpecific: boolean;
  json: object | null;
  files: (FileList | undefined)[] | null;
}

interface SetSpecGenMultipartBodyParams {
  files: (FileList | undefined)[] | null;
  formData: FormData;
}

/* **
 * Helpers
 * ** */

/* Headers */

const _setHttpHeaders = ({ isProtected, multipart }: SetHeaderParams) => {
  const idToken = useAuthStore.getState().idToken;
  const headers = new Headers();

  if (!multipart) headers.set("Content-Type", "application/json");
  if (isProtected) headers.set("Authorization", `Bearer ${idToken}`);

  return headers;
};

/* Multipart */

const _setSpecificMultipartBody = ({
  formData,
  files,
}: SetSpecGenMultipartBodyParams) => {
  files!
    .map((fileListItem, i) => ({ index: i, fileList: fileListItem }))
    .filter((item) => item.fileList !== null && item.fileList !== undefined)
    .forEach((item) => {
      if (item.fileList !== undefined)
        Array.from(item!.fileList).forEach((file) =>
          formData.append(`files_${item.index}`, file)
        );
    });

  return formData;
};

const _setGeneralMultipartBody = ({ formData, files }: SetSpecGenMultipartBodyParams) => {
  files!.map((fileList) =>
    Array.from(fileList!).map((fileItem) => formData.append("file", fileItem))
  );

  return formData;
};

const _setMultipartBody = ({ isSpecific, json, files }: SetMultiPartBodyParams) => {
  const formData = new FormData();
  if (json) formData.append("data", JSON.stringify(json));

  return isSpecific
    ? _setSpecificMultipartBody({
        formData,
        files: files!.filter((item) => item !== undefined),
      })
    : _setGeneralMultipartBody({
        formData,
        files: files!.filter((item) => item !== undefined),
      });
};

/* **
 * Main function
 * ** */

export async function httpRequest({
  url,
  method,
  isProtected = false,
  multipart = null,
  json = null,
  files = null,
}: HttpRequestParams): Promise<any> {
  /* Prepare request */

  const isValidSession = useAuthStore.getState().isValidSession();

  if (!isValidSession && isProtected) {
    throw new AuthError(
      "NoUserSession",
      "Your session has expired. Please log in again."
    );
  }

  const headers = _setHttpHeaders({ isProtected, multipart });
  const options: RequestInit = { method, headers };

  if (method === "POST" || method === "PUT" || method === "PATCH") {
    options.body = multipart
      ? _setMultipartBody({ isSpecific: multipart === "specific", json, files })
      : JSON.stringify(json);
  }

  /* Fetch */

  try {
    log({ caller: "http request", data: { url, options } });
    const res = await fetch(url, options);

    try {
      const data = await res.json();

      if (!res.ok) {
        logError({ caller: "http response", data: data.details });
        throw new ControlledError(data.error, data.details);
      }

      log({ caller: "http response", data: data.result });

      return data.result;
    } catch (_) {
      throw new InvalidJSONResponseError();
    }

    /* Catch errors */
  } catch (error) {
    if (error instanceof TypeError) {
      toast.error("Network error: please check your connection.", ERROR_TOAST_OPTIONS);
      throw error;
    }

    if (error instanceof AuthError) {
      if (error.type === "NoUserSession") {
        useAuthStore.getState().logout();
        toast.error(error.message, ERROR_TOAST_OPTIONS);
        sessionStorage.setItem(
          "noUserSessionFlash",
          JSON.stringify({ type: "error", text: error.message })
        );
        setTimeout(() => {
          window.location.replace("/login");
        }, 1500);
        return;
      }
      toast.error(`${error.type}: ${error.message}`, ERROR_TOAST_OPTIONS);
      throw error;
    }

    if (error instanceof ControlledError) {
      toast.error(`${error.type}: ${error.message}`, ERROR_TOAST_OPTIONS);
      throw error;
    }

    throw new UnknownError();
  }
}
