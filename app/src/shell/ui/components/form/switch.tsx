import { nanoid } from "nanoid";

import React, { useMemo } from "react";

import { Switch as HeroSwitch, SwitchProps as HeroSwitchProps } from "@heroui/switch";

/* **
 * Props and types
 ** */

interface SwitchWrapperProps {
  label: string;
  value: string;
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

export function Switch({ value, label, opts, handlers, classNames }: SwitchWrapperProps) {
  /* Const */

  const id = useMemo(() => nanoid(), []);

  /* Render */

  return (
    <div>
      <label htmlFor={id} className={classNames?.label}>
        {label}
      </label>
      <HeroSwitch
        value={value}
        id={id}
        {...opts}
        {...handlers}
        classNames={classNames}
        aria-label={label}
      >
        <label htmlFor={id}>{label}</label>
      </HeroSwitch>
    </div>
  );
}
