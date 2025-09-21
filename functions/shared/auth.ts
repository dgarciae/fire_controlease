import { HttpsError } from "firebase-functions/v2/https";

export function requireAuth<TRequest = any, TResponse = any>(
  handler: (request: TRequest) => Promise<TResponse> | TResponse
) {
  return async (request: TRequest & { auth?: unknown }) => {
    if (!request?.auth) {
      throw new HttpsError("unauthenticated", "Authentication required.");
    }
    return handler(request);
  };
}
