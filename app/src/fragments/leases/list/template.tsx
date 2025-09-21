import React from "react";

/* **
 * Props and types
 ** */

interface LeasesTemplateProps {
  header: React.ReactNode;
  actionBar: React.ReactNode;
  leasesView: React.ReactNode;
  pagination: React.ReactNode;
  deleteModal: React.ReactNode;
}

/* **
 * Component
 ** */

export function ListLeasesTemplate({
  header,
  actionBar,
  leasesView,
  pagination,
  deleteModal,
}: LeasesTemplateProps) {
  /* Render */

  return (
    <div className="flex flex-col gap-4 p-4">
      <div className="w-full">{header}</div>
      <div className="w-full">{actionBar}</div>
      <div className="w-full">{leasesView}</div>
      <div className="w-full">{pagination}</div>
      <div>{deleteModal}</div>
    </div>
  );
}
