import { toast } from "react-toastify";

import { ERROR_TOAST_OPTIONS, SUCCESS_TOAST_OPTIONS, httpRequest } from "#src/shell";

import { Lease } from "./model";

/* **
 * Fetch delete
 ** */

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

/* **
 * Submit form
 ** */

export const submitLeaseForm = async ({
  method,
  data,
}: {
  method: "POST" | "PUT";
  data: Lease;
}) => {
  console.log("Submitting lease form with data:", method, data);
};

/* **
 * Form helpers
 ** */

export const getLeaseFormDefaultValues = (lease: Lease | undefined) => {
  return lease
    ? {
        ...lease,
        transitories: {
          monthlySignedRent: (lease.contract.financial?.rents?.signed ?? 0) / 12,
          monthlyInvoicedRent: (lease.contract.financial?.rents?.invoiced ?? 0) / 12,
          monthlyExternalSignedRent:
            (lease.contract.financial?.rents?.external_unit?.signed ?? 0) / 12,
          monthlyExternalInvoicedRent:
            (lease.contract.financial?.rents?.external_unit?.invoiced ?? 0) / 12,
          monthlyServiceCharges: (lease.contract.financial?.charges?.service ?? 0) / 12,
          monthlyExternalServiceCharges:
            (lease.contract.financial?.charges?.external_unit ?? 0) / 12,
          monthlyIbi: (lease.contract.financial?.fees?.ibi ?? 0) / 12,
          monthlyMarketingFees: (lease.contract.financial?.fees?.marketing ?? 0) / 12,
          monthlyOtherChargesAndFees: (lease.contract.financial?.fees?.other ?? 0) / 12,
        },
      }
    : {
        transitories: {
          monthlySignedrent: undefined,
          monthlyInvoicedRent: undefined,
          monthlyExternalSignedrent: undefined,
          monthlyExternalInvoicedRent: undefined,
          monthlyServiceCharges: undefined,
          monthlyExternalServiceCharges: undefined,
          monthlyIbi: undefined,
          monthlyMarketingFees: undefined,
          monthlyOtherCharges: undefined,
        },
      };
};
