import { ParsedLocation, createFileRoute, useLocation } from "@tanstack/react-router";

import {
  LeaseDetailPage,
  LeaseFilters,
  LeasesIndexPage,
  getLeaseByIdLoader,
  getLeasesLoader,
  leaseFiltersSchema,
} from "#src/fragments";
import { queryClient } from "#src/shell";

/* **
 * Route
 ** */

export const Route = createFileRoute("/_protected/leasing-contracts/")({
  component: () => <RouteComponent />,
  loader: ({ location }) => routeLoader(location),
  pendingComponent: () => <div>Loading...</div>,
  errorComponent: () => <div>Error!</div>,
});

/* **
 * Route component
 ** */

function RouteComponent() {
  const location = useLocation();
  const params = Object.fromEntries(new URLSearchParams(location.search));
  return params.id ? <LeaseDetailPage /> : <LeasesIndexPage />;
}

/* **
 * Route loader
 ** */

async function routeLoader(location: ParsedLocation) {
  const validation = leaseFiltersSchema.safeParse(new URLSearchParams(location.search));

  const validatedParams = validation.success
    ? validation.data
    : leaseFiltersSchema.parse({});

  await (validatedParams.id ? idLoader(validatedParams) : indexLoader(validatedParams));

  return validatedParams;
}

/* **
 * List Loader
 ** */

const indexLoader = async (validatedParams: LeaseFilters) => {
  return queryClient.prefetchQuery({
    queryKey: ["leases", validatedParams],
    queryFn: () => getLeasesLoader({ searchParams: validatedParams }),
    meta: { route: "leases.index", method: "get", params: validatedParams },
  });
};

/* **
 * Id Loader
 ** */

const idLoader = async (validatedParams: LeaseFilters) => {
  return queryClient.prefetchQuery({
    queryKey: ["leasesById", validatedParams.id],
    queryFn: () => getLeaseByIdLoader(validatedParams.id!),
    meta: { route: "leases.index", method: "get", params: validatedParams },
  });
};
