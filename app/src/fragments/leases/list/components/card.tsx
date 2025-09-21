import { useMemo, useState } from "react";

import { TrashIcon } from "@heroicons/react/24/solid";

import { classNames, roles, useAuthStore } from "#src/shell";
import { Button, Card, Chip } from "#src/shell/ui";

import { Lease } from "../../shared";
import { getTotalOccupancyCost, get_next_date } from "../helpers";

/* **
 * Props and types
 ** */

interface LeaseCardProps {
  lease: Lease;
  isMarked: boolean;
  onPress: () => void;
  deleteLease: () => void;
}

/* **
 * Component
 ** */

export function LeaseCard({ lease, isMarked, onPress, deleteLease }: LeaseCardProps) {
  /* State */

  const [isHovered, setIsHovered] = useState(false);

  /* Const */

  const closestEvent = useMemo(get_next_date(lease), [
    lease.contract.basic?.dates?.end,
    lease.contract.break_options,
    lease.contract.guarantees?.additional_guarantees?.bank_guarantee?.renewal_date,
  ]);

  const totalOccupancyCost = useMemo(getTotalOccupancyCost(lease), [
    lease.contract.financial,
  ]);

  /* Render */

  return (
    <div
      className="relative col-span-12 h-full lg:col-span-6 xl:col-span-4"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <Card
        header={
          <_LeaseCardHeader lease={lease} isHovered={isHovered} onDelete={deleteLease} />
        }
        body={
          <_LeaseCardBody
            closestEvent={closestEvent}
            totalOccupancyCost={totalOccupancyCost}
          />
        }
        footer={<_LeaseCardFooter lease={lease} />}
        handlers={{ onPress }}
        classNames={classNames(
          "relative h-full overflow-hidden rounded-xl border shadow-sm",
          isMarked ? "ring-accent ring-2" : "",
          "transition duration-200 hover:shadow-lg active:scale-[0.98]",
          "touch-manipulation select-none"
        )}
      />
    </div>
  );
}

/* **
 * Card header
 ** */

function _LeaseCardHeader({
  lease,
  isHovered,
  onDelete,
}: {
  lease: Lease;
  isHovered: boolean;
  onDelete: () => void;
}) {
  /* Store */

  const checkRole = useAuthStore((state) => state.checkRole);

  /* Const */

  const canDelete = checkRole(roles.admin, roles.editor);

  const LS_CLASSES: Record<string, string> = {
    project: "bg-blue-100 text-blue-800",
    active: "bg-green-100 text-green-800",
    terminated: "bg-red-100 text-red-800",
    deprecated: "bg-gray-100 text-gray-800",
    renewed: "bg-yellow-100 text-yellow-800",
    closed: "bg-purple-100 text-purple-800",
    draft: "bg-indigo-100 text-indigo-800",
    lapsed: "bg-orange-100 text-orange-800",
  };

  /* Render */

  return (
    <div className="flex justify-between">
      <div className="flex flex-col">
        <h3 className="text-lg font-semibold">{lease.contract.basic.name}</h3>
        <p>{lease.contract.basic?.location?.address}</p>
      </div>
      <div className="flex gap-x-3">
        {canDelete && isHovered && (
          <Button
            opts={{ isIconOnly: true, endContent: <TrashIcon className="h-5 w-5" /> }}
            handlers={{ onPress: () => onDelete() }}
          />
        )}
        <Chip
          text={lease.status}
          opts={{ variant: "shadow" }}
          classNames={LS_CLASSES[lease.status]}
        />
      </div>
    </div>
  );
}

/* **
 * Card body
 ** */

function _LeaseCardBody({
  closestEvent,
  totalOccupancyCost,
}: {
  closestEvent: { event: string | undefined; date: string | undefined } | undefined;
  totalOccupancyCost: number;
}) {
  /* Const */

  const formatDateSlash224 = (dateStr: string) => {
    const date = new Date(dateStr);
    const day = String(date.getDate()).padStart(2, "0");
    const month = String(date.getMonth() + 1).padStart(2, "0");
    const year = String(date.getFullYear()).slice(-2);
    return `${day}/${month}/${year}`;
  };

  /* Render */

  return (
    <div className="flex justify-between">
      {closestEvent ? (
        <p className="text-sm">
          <span className="font-medium">Next Event:</span> {closestEvent.event} on{" "}
          {formatDateSlash224(closestEvent.date!)}
        </p>
      ) : (
        <p className="text-sm">No upcoming events</p>
      )}
      <p className="text-sm">
        <span className="font-medium">Total Occupancy Cost:</span> $
        {totalOccupancyCost?.toLocaleString("ES", {
          minimumFractionDigits: 2,
          maximumFractionDigits: 2,
        })}
      </p>
    </div>
  );
}

/* **
 * Card footer
 ** */

function _LeaseCardFooter({ lease }: { lease: Lease }) {
  /* Const */

  const LCT_CLASSES: Record<string, string> = {
    "shopping center": "border-blue-400 text-blue-600",
    street: "border-green-400 text-green-600",
    travel: "border-yellow-400 text-yellow-600",
    park: "border-purple-400 text-purple-600",
  };

  /* Render */

  return (
    <div className="flex justify-between">
      <p>{lease.contract.basic?.location?.state_province}</p>
      <Chip
        text={lease.status}
        opts={{ variant: "bordered" }}
        classNames={LCT_CLASSES[lease.status]}
      />
    </div>
  );
}
