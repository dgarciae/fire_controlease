import { Outlet, createFileRoute, redirect } from "@tanstack/react-router";

import { useAuthStore } from "#src/shell";
import { AppLayout } from "#src/shell/ui";

export const Route = createFileRoute("/_protected")({
  beforeLoad() {
    const idToken = useAuthStore.getState().idToken;
    if (!idToken) {
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
