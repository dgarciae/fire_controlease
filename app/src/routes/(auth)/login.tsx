import { createFileRoute } from "@tanstack/react-router";

import { LoginPage } from "#src/shell";

export const Route = createFileRoute("/(auth)/login")({
  component: () => <LoginPage />,
});
