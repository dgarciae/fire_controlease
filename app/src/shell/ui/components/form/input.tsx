import { nanoid } from "nanoid";

import React, { useMemo } from "react";

import { Input as HeroInput } from "@heroui/input";

import { capitalizeText } from "../../../utils/helpers";

/* **
 * Props and types
 ** */

interface InputProps {
  type: "text" | "email" | "url" | "password" | "tel" | "search" | "file";
  label: string;
  value: string;
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
    isInvalid?: boolean;
    isReadOnly?: boolean;
    isClearable?: boolean;
    errorMessage?: string;
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

export function Input({ type, label, value, opts, handlers, classNames }: InputProps) {
  /* Const */

  const id = useMemo(() => nanoid(), []);

  /* Render */

  return (
    <HeroInput
      type={type}
      label={<label htmlFor={id}>{capitalizeText(label)}</label>}
      value={value}
      id={id}
      {...opts}
      {...handlers}
      classNames={classNames}
      aria-label={label}
    />
  );
}
