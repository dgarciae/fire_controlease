import { toast } from "react-toastify";

import { ERROR_TOAST_OPTIONS, SUCCESS_TOAST_OPTIONS, httpRequest } from "#src/shell";

import { Lease } from "../domain";

export const fetchDeleteLeases = async (url: string, leasesIds: string[]) => {
  try {
    await httpRequest({
      url,
      method: "DELETE",
      isProtected: true,
      json: { ids: leasesIds },
    });
    toast.success("Lease/s deleted successfully.", SUCCESS_TOAST_OPTIONS);
  } catch (_) {
    toast.error("Failed to delete lease/s.", ERROR_TOAST_OPTIONS);
  }
};

export const submitLeaseForm = async ({
  method,
  data,
}: {
  method: "POST" | "PUT";
  data: Lease;
}) => {
  console.log("Submitting lease form with data:", method, data);
};
