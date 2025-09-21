import { onCall } from "firebase-functions/v2/https";

import { requireAuth } from "../shared/auth.js";
import { buildErrors } from "../shared/errors.js";
import { updateDocument } from "../shared/firestore.js";
import { leaseSchema } from "./schemas.js";

/* **
 * Service
 * ** */

async function updateLeaseService(payload: { leaseId: string; data: object }) {
  const parsedLeaseData = leaseSchema.parse(payload);
  const result = await updateDocument("leases", payload.leaseId, parsedLeaseData);

  return result;
}

/* **
 * Handler
 * ** */

export const updateLeaseHandler = onCall(
  requireAuth(async (request) => {
    try {
      await updateLeaseService(request.data);
      return { result: { id: request.data.leaseId } };
    } catch (err: any) {
      throw buildErrors(err);
    }
  })
);
