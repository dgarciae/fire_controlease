import { useState } from "react";

import { PageHeader, Pagination, roles, useAuthStore } from "#src/shell";

import { useLeases, useLeasesStore } from "../../services";
import { DeleteModal } from "../components";
import { LeasesTemplate } from "../template";

export function LeasesIndexPage() {
  /* Data */

  /* State */

  const [delModalOpen, setDelModalOpen] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);

  /* Store and hooks */

  const { checkRole } = useAuthStore();
  const markedLeases = useLeasesStore((state) => state.markLeases.items);
  const { deleteLeases } = useLeases();

  /* Variables */

  const canDelete = checkRole(roles.admin, roles.editor);

  /* Render */

  return (
    <LeasesTemplate
      header={<PageHeader title="Leasing Contracts" />}
      actionBar={null}
      leases={[]}
      pagination={
        <Pagination
          currentPage={currentPage}
          total={5}
          onChange={(page) => setCurrentPage(page)}
        />
      }
      deleteModal={
        canDelete && delModalOpen ? (
          <DeleteModal
            toDelete={markedLeases.map((item) => item.name)}
            isOpen={delModalOpen}
            onOpenChange={(newOpenState) => setDelModalOpen(newOpenState)}
            onConfirm={() => deleteLeases()}
          />
        ) : null
      }
      markedLeases={markedLeases}
    />
  );
}
