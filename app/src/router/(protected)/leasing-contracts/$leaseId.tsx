import { createFileRoute } from '@tanstack/react-router'

export const Route = createFileRoute('/(protected)/leasing-contracts/$leaseId')({
  component: RouteComponent,
})

function RouteComponent() {
  return <div>Hello "/protected/leasing-contracts/$leaseId"!</div>
}
