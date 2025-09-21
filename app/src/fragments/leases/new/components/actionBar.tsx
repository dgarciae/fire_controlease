import { SubmitFormButtons, useLeasesStore } from "../../shared";

/* **
 * Props ant types
 ** */

interface NewLeaseActionBarProps {}

/* **
 * Component
 ** */

export function NewLeaseActionBar({}: NewLeaseActionBarProps) {
  /* Store */

  const isSubmiting = useLeasesStore((state) => state.form.isSubmiting);

  /* Render */

  return (
    <div className="grid grid-cols-5 gap-x-2">
      <div className="col-span-3"></div>
      <div className="col-span-2 flex justify-end gap-x-1">
        <SubmitFormButtons isFormSubmiting={isSubmiting} />
      </div>
    </div>
  );
}
