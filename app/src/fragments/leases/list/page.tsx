import { useState } from "react";

import { useSuspenseQuery } from "@tanstack/react-query";
import { useLocation, useNavigate } from "@tanstack/react-router";

import { roles, useAuthStore, useGlobalStore } from "#src/shell";
import { PageHeader, Pagination } from "#src/shell/ui";

import { DeleteModal, leaseFiltersSchema, useLeases, useLeasesStore } from "../shared";
import { ListActionBar } from "./components/actionBar";
import { LeasesGrid } from "./components/grid";
import { getLeasesLoader } from "./loader";
import { ListLeasesTemplate } from "./template";

/* **
 * Page
 ** */

export function LeasesIndexPage() {
  /* Query params */

  const location = useLocation();
  const searchParams = leaseFiltersSchema.parse(
    Object.fromEntries(new URLSearchParams(location.search))
  );
  const currentPage = Number(searchParams.page);

  /* Data */

  const leasesQuery = useSuspenseQuery({
    queryKey: ["leases", searchParams],
    queryFn: () => getLeasesLoader({ searchParams }),
  });

  /* State */

  const [delModalOpen, setDelModalOpen] = useState(false);

  /* Store */

  const checkRole = useAuthStore((state) => state.checkRole);
  const perPage = useGlobalStore((state) => state.pagination.perPage);
  const markedLeases = useLeasesStore((state) => state.markLeases.items);

  /* Hooks */

  const navigate = useNavigate();
  const { deleteLeases } = useLeases();

  /* Const */

  const canDelete = checkRole(roles.admin, roles.editor);

  /* Render */

  return (
    <ListLeasesTemplate
      header={<PageHeader title="Leasing Contracts" showShadow={true} />}
      actionBar={
        <ListActionBar
          onSearchConfirm={() => null}
          openDeleteModal={() => setDelModalOpen(true)}
        />
      }
      leasesView={
        <LeasesGrid
          leases={leasesQuery.data.leases}
          openDeleteModal={() => setDelModalOpen(true)}
        />
      }
      pagination={
        <Pagination
          currentPage={currentPage}
          total={Math.ceil(leasesQuery.data.count / perPage)}
          onChange={(page) =>
            navigate({
              to: "/leasing-contracts",
              search: { ...searchParams, page },
            })
          }
        />
      }
      deleteModal={
        canDelete && delModalOpen && markedLeases.length > 0 ? (
          <DeleteModal
            toDelete={markedLeases.map((item) => item.name)}
            isOpen={delModalOpen}
            onOpenChange={(newOpenState) => setDelModalOpen(newOpenState)}
            onConfirm={() => deleteLeases()}
          />
        ) : undefined
      }
    />
  );
}
