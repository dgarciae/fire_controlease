import { httpsCallable } from "firebase/functions";

import { firebaseFunctions } from "#src/shell";

import { LeaseResponse } from "./types";

export async function getLeaseByIdLoader(leaseId: string) {
  const getLeaseByIdFn = httpsCallable(firebaseFunctions, "get_lease_by_id_fn");
  const res = await getLeaseByIdFn({ leaseId });

  return res.data as LeaseResponse;
}
