import { nanoid } from "nanoid";

import React, { useMemo } from "react";

import { Switch as HeroSwitch, SwitchProps as HeroSwitchProps } from "@heroui/switch";

import { capitalizeText } from "#src/shell";

/* **
 * Props and types
 ** */

interface SwitchWrapperProps {
  form: any;
  name: string;
  validators?: Record<string, any>;
  listeners?: Record<string, any>;
  label?: string;
  opts?: {
    size?: "sm" | "md" | "lg";
    color?: "default" | "primary" | "secondary" | "success" | "warning" | "danger";
    thumbIcon?: HeroSwitchProps["thumbIcon"];
    startContent?: React.ReactNode;
    endContent?: React.ReactNode;
    defaultSelected?: boolean;
    isSelected?: boolean;
    isReadOnly?: boolean;
    isDisabled?: boolean;
  };
  handlers?: {
    onChange?: (ev: React.ChangeEvent<HTMLInputElement>) => void;
    onValueChange?: (isSelected: boolean) => void;
  };
  classNames?: {
    base?: string;
    wrapper?: string;
    thumb?: string;
    label?: string;
    startContent?: string;
    endContent?: string;
    thumbIcon?: string;
  };
}

/* **
 * Component
 ** */

export function FormFieldSwitch({
  form,
  name,
  validators,
  listeners,
  label,
  opts,
  handlers,
  classNames,
}: SwitchWrapperProps) {
  /* Const */

  const id = useMemo(() => nanoid(), []);

  /* Render */

  return (
    <form.Field name={name} validators={validators} listeners={listeners}>
      {(field: any) => (
        <>
          <label htmlFor={`${name}-${id}`} className={classNames?.label}>
            {label ?? capitalizeText(field.name.split(".")[-1].replace("_", " "))}
          </label>
          <HeroSwitch
            value={field.state.value}
            id={`${name}-${id}`}
            {...opts}
            onChange={handlers?.onChange}
            onValueChange={(value) => {
              field.handleChange(value);
              if (handlers?.onValueChange) handlers.onValueChange(value);
            }}
            classNames={classNames}
            aria-label={label}
          >
            <label htmlFor={id}>{label}</label>
          </HeroSwitch>
        </>
      )}
    </form.Field>
  );
}
