import React from "react";

/* **
 * Props and types
 ** */

interface NewLeaseTemplateProps {
  header: React.ReactNode;
  actionBar: React.ReactNode;
  leaseForm: React.ReactNode;
  submitModal: React.ReactNode;
}

/* **
 * Component
 ** */

export function NewLeaseTemplate({
  header,
  actionBar,
  leaseForm,
  submitModal,
}: NewLeaseTemplateProps) {
  /* Render */

  return (
    <div className="flex flex-col gap-4 p-4">
      <div className="w-full">{header}</div>
      <div className="w-full">{actionBar}</div>
      <div className="w-full">{leaseForm}</div>
      <div>{submitModal}</div>
    </div>
  );
}
