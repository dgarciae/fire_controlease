import { nanoid } from "nanoid";

import React, { useMemo } from "react";

import { Input as HeroInput } from "@heroui/input";

/* **
 * Props and types
 ** */

interface InputProps<TValue> {
  type: "text" | "email" | "url" | "password" | "tel" | "search" | "file";
  label?: string;
  value: TValue;
  opts?: {
    name?: string;
    description?: React.ReactNode;
    placeholder?: string;
    variant?: "flat" | "bordered" | "faded" | "underlined";
    color?: "default" | "primary" | "secondary" | "success" | "warning" | "danger";
    size?: "sm" | "md" | "lg";
    radius?: "none" | "sm" | "md" | "lg" | "full";
    labelPlacement?: "inside" | "outside" | "outside-left";
    startContent?: React.ReactNode;
    endContent?: React.ReactNode;
    isRequired?: boolean;
    isInvalid?: boolean;
    isReadOnly?: boolean;
    isClearable?: boolean;
    errorMessage?: string;
  };
  handlers?: {
    onChange?: (value: TValue) => void;
    onBlur?: () => void;
    onKeyDown?: (ev: React.KeyboardEvent<HTMLInputElement>) => void;
  };
  classNames?: {
    label?: string;
    input?: string[];
    innerWrapper?: string;
    inputWrapper?: string[];
  };
}

/* **
 * Component
 ** */

export function Input<TValue>({
  type,
  label,
  opts,
  handlers,
  classNames,
}: InputProps<TValue>) {
  /* Functions */

  const handleChange = (ev: React.ChangeEvent<HTMLInputElement>) => {
    if (!handlers?.onChange) return;

    const nextValue =
      type === "file"
        ? (ev.target.files as unknown as TValue)
        : (ev.target.value as unknown as TValue);

    handlers.onChange(nextValue);
  };

  /* Const */

  const id = useMemo(() => nanoid(), []);

  /* Render */

  return (
    <HeroInput
      type={type}
      label={<label htmlFor={id}>{label}</label>}
      aria-label={label}
      id={id}
      name={opts?.name || label?.toLowerCase().replace(/\s+/g, "-")}
      description={opts?.description}
      placeholder={opts?.placeholder}
      variant={opts?.variant ?? "flat"}
      color={opts?.color ?? "default"}
      size={opts?.size ?? "md"}
      radius={opts?.radius ?? "sm"}
      isRequired={opts?.isRequired ?? false}
      isInvalid={opts?.isInvalid ?? false}
      isReadOnly={opts?.isReadOnly ?? false}
      isClearable={opts?.isClearable ?? false}
      errorMessage={opts?.errorMessage}
      onChange={handleChange}
      onBlur={handlers?.onBlur}
      onKeyDown={handlers?.onKeyDown}
      classNames={classNames}
    />
  );
}
