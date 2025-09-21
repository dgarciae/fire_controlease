import { useNavigate } from "@tanstack/react-router";

import { Lease, useLeasesStore } from "../../shared";
import { LeaseCard } from "./card";

/* **
 * Props and types
 ** */

interface LeasesGridProps {
  leases: Lease[];
  openDeleteModal: () => void;
}

/* **
 * Component
 ** */

export function LeasesGrid({ leases, openDeleteModal }: LeasesGridProps) {
  /* Store */

  const isMarkLeasesActive = useLeasesStore((state) => state.markLeases.isActive);
  const markedLeases = useLeasesStore((state) => state.markLeases.items);
  const toggleMarkLease = useLeasesStore((state) => state.markLeases.toggleLease);

  /* Hooks */

  const navigate = useNavigate();

  /* Render */

  return (
    <div className="grid grid-cols-1 gap-4 lg:grid-cols-2 xl:grid-cols-3 2xl:grid-cols-4">
      {leases.map((lease) => (
        <LeaseCard
          key={lease.id}
          lease={lease}
          isMarked={markedLeases.map((item) => item.id).includes(lease.id!)}
          onPress={
            isMarkLeasesActive
              ? () => toggleMarkLease(lease.id!, lease.contract.basic.name!)
              : () => navigate({ to: "/leasing-contracts", search: { id: lease.id } })
          }
          deleteLease={() => {
            toggleMarkLease(lease.id!, lease.contract.basic.name!);
            openDeleteModal();
          }}
        />
      ))}
    </div>
  );
}
