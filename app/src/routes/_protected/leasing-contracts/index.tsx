import { createFileRoute, redirect } from "@tanstack/react-router";

import { LeasesIndexPage } from "#src/fragments";
import { useAuthStore } from "#src/shell";

export const Route = createFileRoute("/_protected/leasing-contracts/")({
  beforeLoad() {
    const { isAuthenticated } = useAuthStore.getState().userSession;
    if (!isAuthenticated) {
      throw redirect({
        to: "/login",
        search: { redirect: location.href },
      });
    }
  },
  component: () => <LeasesIndexPage />,
  loader: async () => {
    return {};
  },
  errorComponent: () => <div>Error!</div>,
});
