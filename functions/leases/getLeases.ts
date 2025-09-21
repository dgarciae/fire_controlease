import { onCall } from "firebase-functions/v2/https";

import { requireAuth } from "../shared/auth.js";
import { buildErrors } from "../shared/errors.js";
import { getDocuments } from "../shared/firestore.js";

/* **
 * Service
 * ** */

async function getLeasesService() {
  const result = await getDocuments("leases");

  return result;
}

/* **
 * Handler
 * ** */

export const getLeasesHandler = onCall(
  requireAuth(async (_) => {
    try {
      const leases = await getLeasesService();
      return { result: { count: null, leases } };
    } catch (err: any) {
      throw buildErrors(err);
    }
  })
);
