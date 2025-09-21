import { Modal } from "#src/shell/ui";

/* **
 * Props and types
 ** */

interface DeleteModalProps {
  method: "POST" | "PUT";
  name: string | undefined;
  isOpen: boolean;
  onOpenChange: (open: boolean) => void;
  onConfirm: () => void;
}

/* **
 * Component
 ** */

export function SubmitModal({
  method,
  name,
  isOpen,
  onOpenChange,
  onConfirm,
}: DeleteModalProps) {
  /* Const */

  const title = method === "POST" ? "Create New Lease" : `Edit Lease ${name}`;
  const text =
    method === "POST"
      ? `Do you want to crete a new lease with the name ${name}?`
      : `Do you want to update lease ${name}?`;

  /* Render */

  return (
    <Modal
      title={title}
      text={text}
      isOpen={isOpen}
      confirmButtonText={method === "POST" ? "CREATE" : "UPDATE"}
      onOpenChange={onOpenChange}
      onConfirm={onConfirm}
    />
  );
}
