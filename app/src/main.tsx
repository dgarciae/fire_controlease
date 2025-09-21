import React from "react";
import ReactDOM from "react-dom/client";
import { toast } from "react-toastify";

import { RouterProvider, createRouter } from "@tanstack/react-router";

import "./main.css";
import { routeTree } from "./router/routeTree.gen";

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

    toast.error(errorMessage, {
      position: "top-right",
      autoClose: 5000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
    });
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
      {
        position: "top-right",
        autoClose: false,
        closeOnClick: false,
        pauseOnHover: true,
        draggable: false,
      }
    );
  }
});

window.addEventListener("online", () => {
  if (offlineToastId !== null) {
    toast.dismiss(offlineToastId);
    offlineToastId = null;
  }

  toast.success("You are online again!", {
    position: "top-right",
    autoClose: 3000,
    hideProgressBar: false,
    closeOnClick: true,
    pauseOnHover: true,
    draggable: true,
  });
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
  <React.StrictMode>{<RouterProvider router={router} />}</React.StrictMode>
);
