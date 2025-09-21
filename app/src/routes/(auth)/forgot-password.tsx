import { createFileRoute } from "@tanstack/react-router";

import { LoginPage } from "#src/shell/ui";

export const Route = createFileRoute("/(auth)/forgot-password")({
  component: () => <LoginPage />,
});
