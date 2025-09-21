import React from "react";

/* **
 * Props and types
 ** */

interface LeaseDetailTemplateProps {
  header: React.ReactNode;
  actionBar: React.ReactNode;
  leaseForm: React.ReactNode;
  submitModal: React.ReactNode;
  deleteModal: React.ReactNode;
}

/* **
 * Component
 ** */

export function LeaseDetailTemplate({
  header,
  actionBar,
  leaseForm,
  submitModal,
  deleteModal,
}: LeaseDetailTemplateProps) {
  /* Render */

  return (
    <div className="flex flex-col gap-4 p-4">
      <div className="w-full">{header}</div>
      <div className="w-full">{actionBar}</div>
      <div className="w-full">{leaseForm}</div>
      <div>{submitModal}</div>
      <div>{deleteModal}</div>
    </div>
  );
}
