import React from "react";

import { LeaseType } from "../domain";

/* **
 * Props and types
 ** */

interface LeasesTemplateProps {
  header: React.ReactNode;
  actionBar: React.ReactNode;
  leases: LeaseType[];
  pagination: React.ReactNode;
  deleteModal: React.ReactNode;
  markedLeases: { id: string; name: string }[];
}

/* **
 * Component
 ** */

export function LeasesTemplate({ header, actionBar, deleteModal }: LeasesTemplateProps) {
  return (
    <div>
      {header}
      {actionBar}
      {deleteModal}
    </div>
  );
}
