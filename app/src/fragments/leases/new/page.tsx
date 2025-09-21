import { useMemo, useState } from "react";

import { useEffectAfterMount } from "#src/shell";
import { PageHeader } from "#src/shell/ui";

import {
  LeaseForm,
  SubmitModal,
  formTabsData,
  submitLeaseForm,
  useLeasesStore,
} from "../shared";
import { NewLeaseActionBar } from "./components/actionBar";
import { NewLeaseTemplate } from "./template";

/* **
 * Page
 ** */

export function NewLeasePage() {
  /* State */

  const [title, setTitle] = useState<string>("");
  const [submitModalOpen, setSubmitModalOpen] = useState(false);

  /* Store */

  const formData = useLeasesStore((state) => state.form.data);

  /* Hooks */

  useEffectAfterMount(() => setSubmitModalOpen(true), [formData]);

  /* Const */

  const NewLeaseFormTabsData = useMemo(
    () =>
      formTabsData.map((tab) =>
        tab.key === 2 ? { ...tab, props: { changeTitle: setTitle } } : tab
      ),
    [formTabsData, setTitle]
  );

  /* Render */

  return (
    <NewLeaseTemplate
      header={<PageHeader title={title || "New Lease"} showShadow={true} />}
      actionBar={<NewLeaseActionBar />}
      leaseForm={<LeaseForm lease={undefined} formTabsData={NewLeaseFormTabsData} />}
      submitModal={
        submitModalOpen ? (
          <SubmitModal
            method="PUT"
            name={formData?.contract.basic.name}
            isOpen={submitModalOpen}
            onOpenChange={(newOpenState) => setSubmitModalOpen(newOpenState)}
            onConfirm={() => submitLeaseForm({ method: "POST", data: formData! })}
          />
        ) : undefined
      }
    />
  );
}
