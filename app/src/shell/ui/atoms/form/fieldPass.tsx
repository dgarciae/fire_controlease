import { PasswordInput } from "./password";

/* **
 * Props and types
 ** */

interface FormFieldPasswordProps {
  form: any;
  validators: Record<string, any>;
  opts?: {
    description?: React.ReactNode;
    variant?: "flat" | "bordered" | "faded" | "underlined";
    color?: "default" | "primary" | "secondary" | "success" | "warning" | "danger";
    size?: "sm" | "md" | "lg";
    radius?: "none" | "sm" | "md" | "lg" | "full";
    startContent?: React.ReactNode;
    endContent?: React.ReactNode;
  };
  classNames?: {
    label: string;
    input: string[];
    innerWrapper: string;
    inputWrapper: string[];
  };
}

/* **
 * Component
 ** */

export function FormFieldPassword({
  form,
  validators,
  opts,
  classNames,
}: FormFieldPasswordProps) {
  return (
    <form.Field name="password" validators={validators}>
      {(field: any) => (
        <PasswordInput
          value={field.state.value}
          opts={{
            name: field.name,
            placeholder: "8 chars, 1 lower, 1 upper, 1 number",
            isRequired: true,
            isInvalid: field.state.meta.errors.length > 0,
            isReadOnly: field.state.meta.isReadOnly,
            isClearable: true,
            errorMessage: field.state.meta.errors[0],
            ...opts,
          }}
          handlers={{
            onChange: (value) => field.handleChange(value),
            onBlur: field.handleBlur,
          }}
          classNames={classNames}
        />
      )}
    </form.Field>
  );
}
