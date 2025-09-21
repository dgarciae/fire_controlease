import { toast } from "react-toastify";

import { QueryClient } from "@tanstack/react-query";

class ControlledAPIError extends Error {}

/* **
 * Global Error Handler
 ** */

function _globalErrorHandler(error: unknown) {
  const message = error instanceof Error ? error.message : String(error);
  toast.error(message, {
    position: "top-right",
    autoClose: 5000,
    hideProgressBar: false,
    closeOnClick: true,
    pauseOnHover: true,
    draggable: true,
  });
}

export const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      retry: (failureCount, error) => {
        if (error instanceof ControlledAPIError) return false;
        return failureCount < 3;
      },
      retryDelay: (attemptIndex) => Math.min(1000 * 2 ** attemptIndex, 30000),
    },
    mutations: {
      onError: (error: any) => toast.error(error.message),
    },
  },
});
