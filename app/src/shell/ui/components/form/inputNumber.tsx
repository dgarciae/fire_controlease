import { nanoid } from "nanoid";

import React, { useMemo } from "react";

import { NumberInput as HeroNumberInput } from "@heroui/number-input";

import { capitalizeText } from "../../../utils/helpers";

/* **
 * Props and types
 ** */

interface NumberInputProps {
  label: string;
  value: number;
  formatOptions?: Intl.NumberFormatOptions;
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
    isInvalid?: boolean;
    isReadOnly?: boolean;
    isClearable?: boolean;
    errorMessage?: string;
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

export function NumberInput({
  label,
  value,
  formatOptions,
  opts,
  handlers,
  classNames,
}: NumberInputProps) {
  /* Const */

  const id = useMemo(() => nanoid(), []);

  /* Render */

  return (
    <HeroNumberInput
      label={<label htmlFor={id}>{capitalizeText(label)}</label>}
      value={value}
      id={id}
      formatOptions={formatOptions}
      {...opts}
      onChange={
        handlers?.onChange as React.ChangeEventHandler<HTMLInputElement> &
          ((value: number) => void)
      }
      onValueChange={handlers?.onValueChange}
      onClear={handlers?.onClear}
      classNames={classNames}
      aria-label={label}
    />
  );
}
