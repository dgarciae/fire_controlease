import { onCall } from "firebase-functions/v2/https";

import { requireAuth } from "../shared/auth.js";
import { buildErrors } from "../shared/errors.js";
import { db } from "../shared/firebase.js";
import { createDocumentsOnBatch } from "../shared/firestore.js";
import { BATCH_LIMIT, commitChunk, divideOnChunks } from "../shared/helpers.js";
import { leaseSchema } from "./schemas.js";

/* **
 * Service
 * ** */

async function createLeasesOnBatchService(payload: object[]) {
  const parsedLeases = payload.map((lease: object) => leaseSchema.parse(lease));
  const chunks = divideOnChunks(parsedLeases, BATCH_LIMIT);
  const idsByChunk = chunks.map((chunk) =>
    chunk.map(() => db.collection("leases").doc().id)
  );

  const batchPromises = chunks.map((chunk, index) =>
    commitChunk("leases", createDocumentsOnBatch, idsByChunk[index], chunk, index)
  );

  const results = await Promise.all(batchPromises);

  const successIds = results.filter((r) => r.success).flatMap((r) => r.ids);
  const failedChunks = results.filter((r) => !r.success);

  return { successIds, failedChunks };
}

/* **
 * Handler
 * ** */

export const createLeaseHandler = onCall(
  requireAuth(async (request) => {
    try {
      const result = await createLeasesOnBatchService(request.data);
      return { result };
    } catch (err: any) {
      throw buildErrors(err);
    }
  })
);
