import { nanoid } from "nanoid";

import { useMemo } from "react";

import { Input as HeroInput } from "@heroui/input";

import { capitalizeText } from "../../../utils";

/* **
 * Props and types
 ** */

interface FormFieldInputProps {
  form: any;
  name: string;
  validators?: Record<string, any>;
  listeners?: Record<string, any>;
  type: "text" | "email" | "url" | "tel" | "search" | "file";
  label?: string;
  opts?: {
    description?: React.ReactNode;
    placeholder?: string;
    variant?: "flat" | "bordered" | "faded" | "underlined";
    color?: "default" | "primary" | "secondary" | "success" | "warning" | "danger";
    size?: "sm" | "md" | "lg";
    radius?: "none" | "sm" | "md" | "lg" | "full";
    labelPlacement?: "inside" | "outside" | "outside-left";
    fullWidth?: boolean;
    startContent?: React.ReactNode;
    endContent?: React.ReactNode;
    isRequired?: boolean;
    isReadOnly?: boolean;
    isClearable?: boolean;
  };
  handlers?: {
    onChange?: (ev: React.ChangeEvent<HTMLInputElement>) => void;
    onValueChange?: (value: string) => void;
    onClear?: () => void;
  };
  classNames?: {
    base?: string;
    label?: string;
    input?: string;
    clearButton?: string;
    description?: string;
    errorMessage?: string;
    mainWrapper?: string;
    inputWrapper?: string;
    innerWrapper?: string;
    helperWrapper?: string;
  };
}

/* **
 * Component
 ** */

export function FormFieldInput({
  form,
  name,
  validators,
  listeners,
  type,
  label,
  opts,
  handlers,
  classNames,
}: FormFieldInputProps) {
  /* Const */

  const id = useMemo(() => nanoid(), []);

  /* Render */

  return (
    <form.Field name={name} validators={validators} listeners={listeners}>
      {(field: any) => (
        <HeroInput
          type={type}
          label={
            <label htmlFor={`${name}-${id}`}>
              {label ?? capitalizeText(field.name.split(".")[-1].replace("_", " "))}
            </label>
          }
          value={field.state.value}
          id={`${name}-${id}`}
          name={field.name}
          isInvalid={field.state.meta.errors.length > 0}
          errorMessage={field.state.meta.errors[0]}
          {...opts}
          onChange={handlers?.onChange}
          onValueChange={(value) => {
            field.handleChange(value);
            if (handlers?.onValueChange) handlers.onValueChange(value);
          }}
          onClear={() => {
            field.onClear();
            if (handlers?.onClear) handlers.onClear();
          }}
          classNames={classNames}
          aria-label={name}
        />
      )}
    </form.Field>
  );
}
