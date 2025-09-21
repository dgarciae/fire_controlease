import { createFileRoute } from "@tanstack/react-router";

import { LeasesIndexPage } from "@/fragments";

export const Route = createFileRoute("/(protected)/leasing-contracts/")({
  component: () => <LeasesIndexPage />,
  loader: async () => {
    return {};
  },
  errorComponent: () => <div>Error!</div>,
});
