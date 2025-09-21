import { TrashIcon } from "@heroicons/react/24/solid";

import { Button } from "#src/shell/ui";

import { AddLeaseButton, SubmitFormButtons, useLeasesStore } from "../../shared";

/* **
 * Props ant types
 ** */

interface DetailActionBarProps {
  onSearchConfirm: () => void;
  openDeleteModal: () => void;
}

/* **
 * Component
 ** */

export function DetailActionBar({ openDeleteModal }: DetailActionBarProps) {
  /* Store */

  const isSubmiting = useLeasesStore((state) => state.form.isSubmiting);

  /* Render */

  return (
    <div className="flex justify-end gap-x-4">
      <SubmitFormButtons isFormSubmiting={isSubmiting} />
      <Button
        opts={{ isIconOnly: true, color: "danger" }}
        handlers={{ onPress: openDeleteModal }}
      >
        <TrashIcon className="h-6 w-6" />
      </Button>
      <AddLeaseButton />
    </div>
  );
}
