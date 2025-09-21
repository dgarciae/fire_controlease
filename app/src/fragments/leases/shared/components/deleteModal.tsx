import { Modal } from "#src/shell/ui";

/* **
 * Props and types
 ** */

interface DeleteModalProps {
  toDelete: string[];
  isOpen: boolean;
  onOpenChange: (open: boolean) => void;
  onConfirm: () => void;
}

/* **
 * Component
 ** */

export function DeleteModal({
  toDelete,
  isOpen,
  onOpenChange,
  onConfirm,
}: DeleteModalProps) {
  /* Const */

  const title = toDelete.length === 1 ? "Delete Lease" : "Delete Leases";
  const text =
    toDelete.length === 1
      ? `Are you sure you want to delete lease ${toDelete[0]}? This action cannot be undone.`
      : `Are you sure you want to delete these ${toDelete.length} leases? This action cannot be undone.`;

  /* Render */

  return (
    <Modal
      title={title}
      text={text}
      isOpen={isOpen}
      confirmButtonText="DELETE"
      onOpenChange={onOpenChange}
      onConfirm={onConfirm}
    />
  );
}
