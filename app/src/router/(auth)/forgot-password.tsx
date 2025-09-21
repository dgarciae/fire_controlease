import { Outlet, createFileRoute, redirect } from "@tanstack/react-router";

import { AuthLayout, useAuthStore } from "@/shell";

export const Route = createFileRoute("/(auth)/forgot-password")({
  beforeLoad() {
    const { isAuthenticated } = useAuthStore.getState().userSession;
    if (isAuthenticated) throw redirect({ to: "/leasing-contracts" });
  },
  component: () => (
    <AuthLayout>
      <Outlet />
    </AuthLayout>
  ),
});
