import { Input } from "./input";

/* **
 * Props and types
 ** */

interface FormFieldInputProps {
  form: any;
  name: string;
  validators: Record<string, any>;
  type: "text" | "email" | "url" | "tel" | "search" | "file";
  isRequired: boolean;
  opts?: {
    description?: React.ReactNode;
    placeholder?: string;
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

export function FormFieldInput({
  form,
  name,
  validators,
  type,
  opts,
  isRequired,
  classNames,
}: FormFieldInputProps) {
  /* Render */

  return (
    <form.Field name={name} validators={validators}>
      {(field: any) => (
        <Input
          type={type}
          label={name.charAt(0).toUpperCase() + name.slice(1)}
          value={field.state.value}
          opts={{
            name: field.name,
            isRequired: isRequired,
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
