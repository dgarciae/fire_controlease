import {
  FormFieldDatePicker,
  FormFieldInput,
  FormFieldNumberInput,
} from "#src/shell/ui/";

import { TabFormCard } from "./tabFormCard";

/* **
 * Props and types
 ** */

interface BasicTabProps {
  form: any;
  changeTitle: (title: string) => void;
}

/* **
 * Component
 ** */

export function BasicTab({ form, changeTitle }: BasicTabProps) {
  /* Render */

  return (
    <div className="flex flex-col gap-y-6" id="basic-tab">
      {/* Main details */}

      <TabFormCard title="Property Details">
        {/* Name */}

        <FormFieldInput
          form={form}
          name="contract.basic.name"
          type="text"
          opts={{ isRequired: true }}
          handlers={{ onValueChange: (value: string) => changeTitle(value) }}
          classNames={{ inputWrapper: "sm:col-span-2" }}
        />

        {/* Surface */}

        <FormFieldNumberInput form={form} name="contract.basic.surface" />
      </TabFormCard>

      {/* Location */}

      <TabFormCard title="Location">
        {["country", "region", "state_province", "city", "address"].map((field) => (
          <FormFieldInput
            key={field}
            form={form}
            name={`contract.basic.location.${field}`}
            type="text"
          />
        ))}
      </TabFormCard>

      {/* Dates */}

      <TabFormCard title="Key Dates">
        {[
          "signing",
          "start",
          "delivery",
          "opening",
          "renewal",
          "closed",
          "end",
          "precedent_condition_end",
        ].map((field) => (
          <FormFieldDatePicker
            key={field}
            form={form}
            name={`contract.basic.dates.${field}`}
            showMonthAndYearPickers={true}
          />
        ))}
      </TabFormCard>

      {/* Other details */}

      <TabFormCard title="Other Details">
        {["url", "unit_number, no_competence, exclusivity, notes"].map((field) => (
          <FormFieldInput
            key={field}
            form={form}
            name={`contract.basic.${field}`}
            type="text"
          />
        ))}
      </TabFormCard>
    </div>
  );
}
