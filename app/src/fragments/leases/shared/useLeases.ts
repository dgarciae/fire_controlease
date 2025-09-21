import { apiUrls } from "#src/shell";
import { cancelableToast } from "#src/shell/ui";

import { fetchDeleteLeases } from "./helpers";
import { useLeasesStore } from "./store";

/* **
 * Hook
 ** */

export function useLeases() {
  /* Store */

  const markedLeases = useLeasesStore((state) => state.markLeases.items);
  const resetMarkLeases = useLeasesStore((state) => state.markLeases.reset);

  /* Functions */

  const deleteLeases = async () => {
    const toastId = `delete-leases-bulk-toast-${markedLeases.join("-")}`;
    const leasesIds = markedLeases.map((lease) => lease.id);

    cancelableToast({
      toastId,
      message: `Deleting ${markedLeases.length} lease(s)...`,
      onConfirm: () => fetchDeleteLeases(`${apiUrls.tenants.leasesDelete}`, leasesIds),
    });

    resetMarkLeases();
  };

  /* Return */

  return { deleteLeases };
}
