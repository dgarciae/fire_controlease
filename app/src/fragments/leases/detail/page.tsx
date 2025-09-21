import { useMemo, useState } from "react";

import { useSuspenseQuery } from "@tanstack/react-query";
import { useLocation } from "@tanstack/react-router";

import { roles, useAuthStore, useEffectAfterMount } from "#src/shell";
import { PageHeader } from "#src/shell/ui";

import {
  DeleteModal,
  LeaseForm,
  SubmitModal,
  formTabsData,
  leaseFiltersSchema,
  submitLeaseForm,
  useLeases,
  useLeasesStore,
} from "../shared";
import { DetailActionBar } from "./components/actionBar";
import { getLeaseByIdLoader } from "./loader";
import { LeaseDetailTemplate } from "./template";

/* **
 * Page
 ** */

export function LeaseDetailPage() {
  /* Query params */

  const location = useLocation();
  const searchParams = leaseFiltersSchema.parse(
    Object.fromEntries(new URLSearchParams(location.search))
  );
  const id = searchParams.id;

  /* Data */

  const leaseByIDQuery = useSuspenseQuery({
    queryKey: ["leasesById", searchParams.id],
    queryFn: () => getLeaseByIdLoader(id!),
  });

  /* State */

  const [title, setTitle] = useState<string>("");
  const [submitModalOpen, setSubmitModalOpen] = useState(false);
  const [delModalOpen, setDelModalOpen] = useState(false);

  /* Store */

  const checkRole = useAuthStore((state) => state.checkRole);
  const formData = useLeasesStore((state) => state.form.data);
  const markedLeases = useLeasesStore((state) => state.markLeases.items);

  /* Hooks */

  const { deleteLeases } = useLeases();

  useEffectAfterMount(() => setSubmitModalOpen(true), [formData]);

  /* Const */

  const canDelete = checkRole(roles.admin, roles.editor);

  const DetailFormTabsData = useMemo(
    () =>
      formTabsData.map((tab) =>
        tab.key === 2
          ? { ...tab, props: { changeTitle: setTitle } }
          : tab.key === 6
            ? {
                ...tab,
                props: { urls: leaseByIDQuery.data.contract.files },
              }
            : tab
      ),
    [formTabsData, setTitle]
  );

  /* Render */

  return (
    <LeaseDetailTemplate
      header={
        <PageHeader
          title={title || leaseByIDQuery.data.contract.basic.name!}
          showShadow={true}
        />
      }
      actionBar={
        <DetailActionBar
          onSearchConfirm={() => null}
          openDeleteModal={() => setDelModalOpen(true)}
        />
      }
      leaseForm={
        <LeaseForm lease={leaseByIDQuery.data} formTabsData={DetailFormTabsData} />
      }
      submitModal={
        submitModalOpen ? (
          <SubmitModal
            method="PUT"
            name={formData?.contract.basic.name}
            isOpen={submitModalOpen}
            onOpenChange={(newOpenState) => setSubmitModalOpen(newOpenState)}
            onConfirm={() => submitLeaseForm({ method: "PUT", data: formData! })}
          />
        ) : undefined
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
