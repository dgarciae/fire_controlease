import { capitalizeText } from "#src/shell";
import { FormFieldInput } from "#src/shell/ui/";

import { TabFormCard } from "./tabFormCard";

/* **
 * Props and types
 ** */

interface SignatoriesTabProps {
  form: any;
}

/* **
 * Component
 ** */

export function SignatoriesTab({ form }: SignatoriesTabProps) {
  /* Const */

  const classNames = { mainWrapper: "sm:grid-cols-2 lg:grid-cols-3 xl-grid-cols-4" };

  const entities = ["landlord", "brand", "consultant"] as const;

  const fieldNames = [
    "name",
    "activity",
    "contact.name",
    "contact.lastname",
    "contact.email",
    "contact.phone",
    "contact.address",
  ] as const;

  /* Render */

  return (
    <div
      className="xxl:gap-0 grid grid-cols-1 gap-6 lg:grid-cols-2 xl:grid-cols-3"
      id="signatories-tab"
    >
      {entities.map((entity) => (
        <TabFormCard
          key={entity}
          title={capitalizeText(entity)}
          subtitle={
            entity === "landlord" ? form.getFieldValue("lanlord.lanlord_type") : undefined
          }
        >
          {fieldNames.map((field) => (
            <FormFieldInput
              key={`${entity}.${field}`}
              form={form}
              name={`${entity}.${field}`}
              type="text"
              classNames={classNames}
            />
          ))}
        </TabFormCard>
      ))}
    </div>
  );
}
