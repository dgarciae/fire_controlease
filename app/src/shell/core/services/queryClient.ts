import { toast } from "react-toastify";

import { MutationCache, QueryCache, QueryClient } from "@tanstack/react-query";

import { AuthError, ControlledError, ERROR_TOAST_OPTIONS } from "../domain";

/* **
 * Global Error Handler
 ** */

function _globalErrorHandler(error: unknown, query: any) {
  const message = error instanceof Error ? error.message : String(error);

  const meta = query?.meta ?? {};
  const contextParts = [
    meta.route && `route=${meta.route}`,
    meta.params && `params=${JSON.stringify(meta.params)}`,
    meta.extra && `extra=${JSON.stringify(meta.extra)}`,
  ].filter(Boolean);

  const contextMessage = contextParts.length ? ` (${contextParts.join(", ")})` : "";

  toast.error(`${message}${contextMessage}`, ERROR_TOAST_OPTIONS);
}

/* **
 * Error catching
 ** */

const queryCache = new QueryCache({
  onError: (error: unknown, query: any) => _globalErrorHandler(error, query),
});

const mutationCache = new MutationCache({
  onError: (error: unknown, query: any) => _globalErrorHandler(error, query),
});

/* **
 * Query client
 ** */

export const queryClient = new QueryClient({
  queryCache,
  mutationCache,
  defaultOptions: {
    queries: {
      retry: (failureCount, error) => {
        return error instanceof AuthError || error instanceof ControlledError
          ? false
          : failureCount < 3;
      },
      retryDelay: (attemptIndex) => Math.min(1000 * 2 ** attemptIndex, 30000),
      staleTime: 1000 * 60,
      refetchOnWindowFocus: false,
    },
  },
});
