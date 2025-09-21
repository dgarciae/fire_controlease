import { type CommitResult } from "./types.js";

/* **
 * Variables
 * ** */

export const BATCH_LIMIT = 500;

/* **
 * Functions
 * ** */

const sleep = (ms: number) => new Promise((r) => setTimeout(r, ms));

const zipCombine = <A, B, R = A & B>(
  a: A[],
  b: B[],
  combiner: (left: A, right: B) => R = (l, r) => ({ ...(l as any), ...(r as any) }) as any
): R[] => {
  const len = Math.min(a.length, b.length);
  return Array.from({ length: len }, (_, i) => combiner(a[i], b[i]));
};

/* **
 * Chunks
 * ** */

export const divideOnChunks = <T>(arr: T[], size: number): T[][] =>
  Array.from({ length: Math.ceil(arr.length / size) }, (_, i) =>
    arr.slice(i * size, (i + 1) * size)
  );

export const commitChunk = async <T>(
  collection: string,
  dbFunction: (collection: string, items: { id: string; data: T }[]) => Promise<string[]>,
  chunkIds: string[],
  chunk: T[],
  chunkIndex: number,
  maxRetries = 3,
  baseDelayMs = 200
): Promise<CommitResult> => {
  const attempt = async (tryIndex: number): Promise<CommitResult> => {
    try {
      const ids = await dbFunction(
        collection,
        zipCombine(chunkIds, chunk, (id, data) => ({ id, data })) as {
          id: string;
          data: T;
        }[]
      );

      return { chunkIndex, success: true, ids };
    } catch (err: any) {
      if (tryIndex >= maxRetries)
        return { chunkIndex, success: false, ids: chunkIds, error: err };
      const backoff = baseDelayMs * Math.pow(2, tryIndex);
      const jitter = Math.floor(Math.random() * baseDelayMs);
      await sleep(backoff + jitter);

      return attempt(tryIndex + 1);
    }
  };

  return attempt(0);
};
