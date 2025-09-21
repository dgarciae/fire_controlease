import { CancelableToast, apiUrls } from "#src/shell";

import { fetchDeleteLeases } from "./helpers";
import { useLeasesStore } from "./store";

/* **
 * Hook
 ** */

export function useLeases() {
  /* Store and hooks */

  const { items: markedLeases, reset: resetMarkLeases } =
    useLeasesStore.getState().markLeases;

  /* Functions */

  const deleteLeases = async () => {
    const toastId = `delete-leases-bulk-toast-${markedLeases.join("-")}`;

    CancelableToast({
      toastId,
      message: `Deleting ${markedLeases.length} lease(s)...`,
      onConfirm: () => fetchDeleteLeases(`${apiUrls.tenant.leasesDelete}`),
    });
    resetMarkLeases();
  };

  /* Return */

  return { deleteLeases };
}
