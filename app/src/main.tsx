import React from "react";
import ReactDOM from "react-dom/client";
import { toast } from "react-toastify";

import { HeroUIProvider } from "@heroui/react";
import { RouterProvider, createRouter } from "@tanstack/react-router";

import "./main.css";
import { routeTree } from "./routeTree.gen";
import { ERROR_TOAST_OPTIONS, FIXED_TOAST_OPTIONS, SUCCESS_TOAST_OPTIONS } from "./shell";

/* **
 * Handle Global Network Errors
 ** */

const handleGlobalNetworkError = (event: PromiseRejectionEvent | ErrorEvent) => {
  const errorNamesToCatch = ["TypeError", "NetworkError", "AbortError"];
  const errorMessageKeywords = ["fetch", "aborted", "timeout"];

  const error = event instanceof PromiseRejectionEvent ? event.reason : event.error;

  const isNetworkError =
    error &&
    (errorNamesToCatch.includes(error.name) ||
      (error.message &&
        errorMessageKeywords.some((keyword) =>
          error.message.toLowerCase().includes(keyword)
        )));

  if (isNetworkError) {
    event.preventDefault();
    const isUserOffline = navigator.onLine === false;
    const errorMessage = isUserOffline
      ? "You are currently offline. Check your internet connection."
      : "A network error occurred. Try again later.";

    toast.error(errorMessage, ERROR_TOAST_OPTIONS);
  }
};

/* **
 * Listeners
 ** */

window.addEventListener("unhandledrejection", handleGlobalNetworkError);
window.addEventListener("error", handleGlobalNetworkError);

let offlineToastId: string | number | null = null;

window.addEventListener("offline", () => {
  if (offlineToastId === null) {
    offlineToastId = toast.warning(
      "You are now offline. Some features may not work properly.",
      FIXED_TOAST_OPTIONS
    );
  }
});

window.addEventListener("online", () => {
  if (offlineToastId !== null) {
    toast.dismiss(offlineToastId);
    offlineToastId = null;
  }

  toast.success("You are online again!", SUCCESS_TOAST_OPTIONS);
});

/* **
 * Router
 ** */

const router = createRouter({ routeTree });

declare module "@tanstack/react-router" {
  interface Register {
    router: typeof router;
  }
}

/* **
 * Render
 ** */

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <HeroUIProvider>
      <RouterProvider router={router} />
    </HeroUIProvider>
  </React.StrictMode>
);
