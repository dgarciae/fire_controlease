import { toast } from "react-toastify";

import { httpRequest } from "#src/shell";

export const fetchDeleteLeases = async (url: string) => {
  try {
    await httpRequest({
      url,
      method: "DELETE",
      isProtected: true,
    });
    toast.success("Lease/s deleted successfully.");
  } catch (error) {
    toast.error("Failed to delete lease/s.");
  }
};
