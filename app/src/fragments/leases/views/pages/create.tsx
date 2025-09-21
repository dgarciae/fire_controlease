import { useState } from "react";

import { PageHeader } from "#src/shell/ui";

import { submitLeaseForm, useLeasesStore } from "../../services";
import { LeaseForm, NewLeaseActionBar, SubmitModal } from "../components";
import { NewLeaseTemplate } from "../templates/create";

/* **
 * Page
 ** */

export function NewLeasePage() {
  /* State */

  const [title, setTitle] = useState<string>("");
  const [submitModalOpen, setSubmitModalOpen] = useState(false);

  /* Store */

  const formData = useLeasesStore((state) => state.form.data);

  /* Render */

  return (
    <NewLeaseTemplate
      header={<PageHeader title={title || "New Lease"} showShadow={true} />}
      actionBar={<NewLeaseActionBar />}
      leaseForm={
        <LeaseForm
          lease={undefined}
          onSubmit={() => setSubmitModalOpen(true)}
          changeTitle={(title: string) => setTitle(title)}
        />
      }
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
