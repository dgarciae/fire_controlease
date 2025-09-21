import { Outlet, createFileRoute, redirect } from "@tanstack/react-router";

import { AuthLayout, useAuthStore } from "#src/shell";

export const Route = createFileRoute("/(auth)")({
  beforeLoad() {
    const { isAuthenticated } = useAuthStore.getState().userSession;
    if (isAuthenticated) {
      throw redirect({
        to: "/leasing-contracts",
        search: {
          redirect: location.href,
        },
      });
    }
  },
  component: () => (
    <AuthLayout>
      <Outlet />
    </AuthLayout>
  ),
});
