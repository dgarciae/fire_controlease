import { onCall } from "firebase-functions/v2/https";

import { requireAuth } from "../shared/auth.js";
import { buildErrors } from "../shared/errors.js";
import { deleteDocumentsOnBatch } from "../shared/firestore.js";
import { BATCH_LIMIT, divideOnChunks } from "../shared/helpers.js";
import {
  type CommitFailure,
  type CommitResult,
  type CommitSuccess,
} from "../shared/types.js";

/* **
 * Service
 * ** */

async function deleteLeasesService(payload: string[]) {
  const chunks = divideOnChunks(payload, BATCH_LIMIT);
  const batchPromises = chunks.map((ids, ix) =>
    deleteDocumentsOnBatch("leases", ids)
      .then((): CommitResult => ({ chunkIndex: ix, success: true, ids }) as CommitSuccess)
      .catch(
        (error: any): CommitResult =>
          ({ chunkIndex: ix, success: false, ids, error }) as CommitFailure
      )
  );

  const results = await Promise.all(batchPromises);

  const successIds = results.filter((r) => r.success).flatMap((r) => r.ids);
  const failedChunks = results.filter((r) => !r.success);

  return { successIds, failedChunks };
}

/* **
 * Handler
 * ** */

export const deleteLeasesHandler = onCall(
  requireAuth(async (request) => {
    try {
      await deleteLeasesService(request.data.ids);
      return { result: { ids: request.data } };
    } catch (err: any) {
      throw buildErrors(err);
    }
  })
);
