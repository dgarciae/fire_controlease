import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute("/_protected/leasing-contracts/create")({
  component: RouteComponent,
});

function RouteComponent() {
  return <div>Hello "/protected/leasing-contracts/create"!</div>;
}
