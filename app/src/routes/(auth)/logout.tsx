import { LoginPage } from "#src/shell";

import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute("/(auth)/logout")({
  component: () => <LoginPage />,
});
