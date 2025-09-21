import { httpsCallable } from "firebase/functions";

import { firebaseFunctions } from "#src/shell";

import { LeaseFilters, LeaseResponse, LeasesResponse } from "../domain";

/* **
 * Props and types
 ** */

interface GetLeasesLoaderProps {
  searchParams: LeaseFilters;
}

/* **
 * List Loader
 ** */

export async function getLeasesLoader({ searchParams }: GetLeasesLoaderProps) {
  const payload = Object.fromEntries(
    Object.entries(searchParams).filter(([, v]) => v !== undefined)
  );

  const getLeasesFn = httpsCallable(firebaseFunctions, "get_leases_fn");
  const res = await getLeasesFn(payload);

  return res.data as LeasesResponse;
}

/* **
 * Id Loader
 ** */

export async function getLeaseByIdLoader(leaseId: string) {
  const getLeaseByIdFn = httpsCallable(firebaseFunctions, "get_lease_by_id_fn");
  const res = await getLeaseByIdFn({ leaseId });

  return res.data as LeaseResponse;
}
