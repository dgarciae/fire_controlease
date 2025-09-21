import { Outlet, createRootRoute, redirect } from "@tanstack/react-router";

import { NotFoundPage, useAuthStore } from "#src/shell";

export const Route = createRootRoute({
  beforeLoad: ({ location }) => {
    if (location.pathname === "/") {
      const { isAuthenticated } = useAuthStore.getState().userSession;
      if (isAuthenticated) throw redirect({ to: "/leasing-contracts" });
      throw redirect({ to: "/login" });
    }
  },
  component: () => <Outlet />,
  notFoundComponent: () => <NotFoundPage />,
});
