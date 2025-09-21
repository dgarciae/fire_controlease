import { db } from "./firebase.js";

/* **
 * Errors
 * ** */

/* Custom Firestore Error */

export class FirestoreError extends Error {
  readonly name: string = "FirestoreError";
  readonly type: string;
  readonly code: string;

  constructor(type: string, code: string, message: string) {
    super(message);
    this.type = type;
    this.code = code;
  }
}

/* General error handling */

const handleFirestoreError = (type: string, err: any) => {
  return new FirestoreError(
    type,
    err.code || "unknown",
    err.message || "An error occurred while getting documents"
  );
};

/* Method error handling */

const handleFirestoreGetError = (err: any) => {
  return handleFirestoreError("GetDocumentsError", err);
};

const handleFirestorePostError = (err: any) => {
  return handleFirestoreError("CreateDocumentError", err);
};

const handleFirestoreBatchPostError = (err: any) => {
  return handleFirestoreError("CreateDocumentsOnBatchError", err);
};

const handleFirestorePatchError = (err: any) => {
  return handleFirestoreError("UpdateDocumentsError", err);
};

const handleFirestoreBatchPatchError = (err: any) => {
  return handleFirestoreError("UpdateDocumentsOnBatchError", err);
};

const handleFirestoreDeleteError = (err: any) => {
  return handleFirestoreError("DeleteDocumentsError", err);
};

const handleFirestoreBatchDeleteError = (err: any) => {
  return handleFirestoreError("DeleteDocumentsOnBatchError", err);
};

/* **
 * Get
 * ** */

export async function getDocuments<T>(
  collection: string,
  queries?: {
    fieldPath: string;
    opStr: FirebaseFirestore.WhereFilterOp;
    value: any;
  }[],
  orderBy?: { field: string; direction: FirebaseFirestore.OrderByDirection },
  limit?: number
): Promise<Array<T & { id: string }>> {
  let ref: FirebaseFirestore.Query = db.collection(collection);

  if (queries && queries.length) {
    for (const q of queries) {
      ref = ref.where(q.fieldPath, q.opStr, q.value);
    }
  }

  if (orderBy) ref = ref.orderBy(orderBy.field, orderBy.direction);
  if (limit && limit > 0) ref = ref.limit(limit);

  try {
    const snap = await ref.get();
    return snap.docs.map((d) => ({ id: d.id, ...(d.data() as T) }));
  } catch (err: any) {
    throw handleFirestoreGetError(err);
  }
}

/* Get by id */

export async function getDocumentById<T>(
  collection: string,
  id: string
): Promise<T | null> {
  try {
    const doc = await db.collection(collection).doc(id).get();
    if (!doc.exists) return null;

    return { id: doc.id, ...(doc.data() as T) };
  } catch (err: any) {
    throw handleFirestoreGetError(err);
  }
}

/* **
 * Post
 * ** */

export async function createDocument<T>(
  collection: string,
  data: T,
  id?: string
): Promise<string> {
  try {
    if (id) {
      await db
        .collection(collection)
        .doc(id)
        .set(data as FirebaseFirestore.DocumentData);
      return id;
    }

    const ref = await db
      .collection(collection)
      .add(data as FirebaseFirestore.DocumentData);
    return ref.id;
  } catch (err: any) {
    throw handleFirestorePostError(err);
  }
}

/* Batch post */

export async function createDocumentsOnBatch<T>(
  collection: string,
  chunk: { id?: string; data: T }[]
): Promise<string[]> {
  try {
    const batch = db.batch();
    const ids = chunk.map((item) => {
      const docRef = item.id
        ? db.collection(collection).doc(item.id)
        : db.collection(collection).doc();
      batch.set(docRef, item as FirebaseFirestore.DocumentData);
      return docRef.id;
    });
    await batch.commit();

    return ids;
  } catch (err: any) {
    throw handleFirestoreBatchPostError(err);
  }
}

/* **
 * Put
 * ** */

export async function updateDocument<T>(
  collection: string,
  id: string,
  data: Partial<T>
): Promise<void> {
  try {
    await db.collection(collection).doc(id).update(data);
  } catch (err: any) {
    throw handleFirestorePatchError(err);
  }
}

/* Batch put */

export async function updateDocumentsOnBatch<T>(
  collection: string,
  chunk: { id: string; data: Partial<T> }[]
): Promise<void> {
  try {
    const batch = db.batch();
    chunk.forEach((item) => {
      const docRef = db.collection(collection).doc(item.id);
      batch.update(docRef, item.data);
    });

    await batch.commit();
  } catch (err: any) {
    throw handleFirestoreBatchPatchError(err);
  }
}

/* **
 * Delete
 * ** */

export async function deleteDocument(collection: string, id: string) {
  try {
    await db.collection(collection).doc(id).delete();
  } catch (err: any) {
    throw handleFirestoreDeleteError(err);
  }
}

/* Batch delete */

export async function deleteDocumentsOnBatch(
  collection: string,
  chunk: string[]
): Promise<void> {
  try {
    const batch = db.batch();
    chunk.forEach((id) => {
      const docRef = db.collection(collection).doc(id);
      batch.delete(docRef);
    });

    await batch.commit();
  } catch (err: any) {
    throw handleFirestoreBatchDeleteError(err);
  }
}
