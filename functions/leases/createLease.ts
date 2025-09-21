import { onCall } from "firebase-functions/v2/https";

import { requireAuth } from "../shared/auth.js";
import { buildErrors } from "../shared/errors.js";
import { createDocument } from "../shared/firestore.js";
import { leaseSchema } from "./schemas.js";

/* **
 * Service
 * ** */

async function createLeaseService(payload: object) {
  const parsedLeaseData = leaseSchema.parse(payload);
  const result = await createDocument("leases", parsedLeaseData);

  return result;
}

/* **
 * Handler
 * ** */

export const createLeaseHandler = onCall(
  requireAuth(async (request) => {
    try {
      const createdLeaseId = await createLeaseService(request.data);
      return { result: { id: createdLeaseId } };
    } catch (err: any) {
      throw buildErrors(err);
    }
  })
);
