import { Outlet, createFileRoute, redirect } from "@tanstack/react-router";

import { AppLayout, useAuthStore } from "#src/shell";

export const Route = createFileRoute("/_protected")({
  beforeLoad() {
    const { isAuthenticated } = useAuthStore.getState().userSession;
    if (!isAuthenticated) {
      throw redirect({
        to: "/login",
        search: {
          redirect: location.href,
        },
      });
    }
  },
  component: () => (
    <AppLayout>
      <Outlet />
    </AppLayout>
  ),
});
