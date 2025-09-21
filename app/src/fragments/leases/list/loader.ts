import { httpsCallable } from "firebase/functions";

import { firebaseFunctions } from "#src/shell/";

import { LeaseFilters } from "../shared";
import { LeasesResponse } from "./types";

/* **
 * Props and types
 ** */

interface GetLeasesLoaderProps {
  searchParams: LeaseFilters;
}

/* **
 * List loader
 ** */

export async function getLeasesLoader({ searchParams }: GetLeasesLoaderProps) {
  const payload = Object.fromEntries(
    Object.entries(searchParams).filter(([, v]) => v !== undefined)
  );

  const getLeasesFn = httpsCallable(firebaseFunctions, "get_leases_fn");
  const res = await getLeasesFn(payload);

  return res.data as LeasesResponse;
}
