import { nanoid } from "nanoid";

import { useMemo } from "react";

import { NumberInput as HeroNumberInput } from "@heroui/number-input";

import { capitalizeText } from "../../../utils";

/* **
 * Props and types
 ** */

interface FormFieldInputProps {
  form: any;
  name: string;
  validators?: Record<string, any>;
  listeners?: Record<string, any>;
  formatOptions?: Intl.NumberFormatOptions;
  label?: string;
  opts?: {
    description?: React.ReactNode;
    placeholder?: string;
    variant?: "flat" | "bordered" | "faded" | "underlined";
    color?: "default" | "primary" | "secondary" | "success" | "warning" | "danger";
    size?: "sm" | "md" | "lg";
    radius?: "none" | "sm" | "md" | "lg" | "full";
    minValue?: number;
    maxValue?: number;
    step?: number;
    hideStepper?: boolean;
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
    onValueChange?: (value: number) => void;
    onClear?: () => void;
  };
  classNames?: {
    base?: string;
    label?: string;
    input?: string;
    clearButton?: string;
    stepperButton?: string;
    description?: string;
    errorMessage?: string;
    mainWrapper?: string;
    inputWrapper?: string;
    innerWrapper?: string;
    helperWrapper?: string;
    stepperWrapper?: string;
  };
}

/* **
 * Component
 ** */

export function FormFieldNumberInput({
  form,
  name,
  validators,
  listeners,
  formatOptions,
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
        <HeroNumberInput
          label={
            <label htmlFor={`${name}-${id}`}>
              {label ?? capitalizeText(field.name.split(".")[-1].replace("_", " "))}
            </label>
          }
          value={field.state.value}
          id={`${name}-${id}`}
          name={field.name}
          formatOptions={formatOptions}
          isInvalid={field.state.isInvalid}
          errorMessage={field.state.meta.errors[0]}
          {...opts}
          onChange={
            handlers?.onChange as React.ChangeEventHandler<HTMLInputElement> &
              ((value: number) => void | undefined)
          }
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
