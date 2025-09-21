import { Outlet, createRootRoute, redirect } from "@tanstack/react-router";

import { useAuthStore } from "#src/shell";
import { NotFoundPage } from "#src/shell/ui";

export const Route = createRootRoute({
  beforeLoad: ({ location }) => {
    if (location.pathname === "/") {
      const idToken = useAuthStore.getState().idToken;
      if (idToken) throw redirect({ to: "/leasing-contracts" });
      throw redirect({ to: "/login" });
    }
  },
  component: () => <Outlet />,
  notFoundComponent: () => <NotFoundPage />,
});
