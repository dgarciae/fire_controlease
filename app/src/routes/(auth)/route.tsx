import { Outlet, createFileRoute, redirect } from "@tanstack/react-router";

import { useAuthStore } from "#src/shell";
import { AuthLayout } from "#src/shell/ui";

export const Route = createFileRoute("/(auth)")({
  beforeLoad() {
    const idToken = useAuthStore.getState().idToken;
    if (idToken) {
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
