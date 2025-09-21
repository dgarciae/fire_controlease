import { FunctionsErrorCode, HttpsError } from "firebase-functions/v2/https";
import * as z from "zod";

import { FirestoreError } from "./firestore.js";
import { logErrors, logWithCloud } from "./logging.js";

const PROJECT_ID =
  process.env.GCLOUD_PROJECT || process.env.GCP_PROJECT || process.env.PROJECT_ID;

const isCloud = Boolean(PROJECT_ID);

const isFunctionsErrorCode = (c: unknown): c is FunctionsErrorCode =>
  typeof c === "string" &&
  [
    "ok",
    "cancelled",
    "unknown",
    "invalid-argument",
    "deadline-exceeded",
    "not-found",
    "already-exists",
    "permission-denied",
    "resource-exhausted",
    "failed-precondition",
    "aborted",
    "out-of-range",
    "unimplemented",
    "internal",
    "unavailable",
    "data-loss",
    "unauthenticated",
  ].includes(c);

export const buildErrors = (err: any) => {
  const baseDetails = {
    name: err?.name,
    code: err?.code,
    message: err?.message ?? String(err),
    stack: err?.stack,
  };

  const zodDetails =
    err instanceof z.ZodError
      ? {
          name: "ValidationError",
          type: "ZodError",
          validation: err.errors.map((e) => ({ path: e.path, message: e.message })),
        }
      : {};

  const firestoreDetails = err instanceof FirestoreError ? err : {};

  const detailsToLog = { ...baseDetails, ...zodDetails, ...firestoreDetails };

  if (isCloud) logWithCloud(detailsToLog.name, detailsToLog);
  else logErrors(detailsToLog.name, detailsToLog);

  if (err instanceof z.ZodError) {
    return new HttpsError("invalid-argument", "Invalid lease data", zodDetails);
  }

  if (err instanceof FirestoreError) {
    const code = isFunctionsErrorCode(err.code) ? err.code : "internal";
    return new HttpsError(code, err.message, {
      name: err.name,
      type: err.type,
    });
  }

  return new HttpsError("internal", "An unexpected error occurred", {
    message: err?.message ?? String(err),
  });
};
