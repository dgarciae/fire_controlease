import { Outlet, createFileRoute, redirect } from "@tanstack/react-router";

import { AppLayout, useAuthStore } from "@/shell";

export const Route = createFileRoute("/(protected)/_layout")({
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
