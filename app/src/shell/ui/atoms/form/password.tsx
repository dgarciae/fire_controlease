import React from "react";

import { EyeFilledIcon, EyeSlashFilledIcon } from "../../icons";
import { Button } from "./button";
import { Input } from "./input";

/* **
 * Props
 ** */

interface PasswordInputProps {
  value: string;
  opts?: {
    name?: string;
    description?: React.ReactNode;
    placeholder?: string;
    variant?: "flat" | "bordered" | "faded" | "underlined";
    color?: "default" | "primary" | "secondary" | "success" | "warning" | "danger";
    size?: "sm" | "md" | "lg";
    radius?: "none" | "sm" | "md" | "lg" | "full";
    isRequired?: boolean;
    isInvalid?: boolean;
    isReadOnly?: boolean;
    isClearable?: boolean;
    isDisabled?: boolean;
    errorMessage?: string;
  };
  handlers?: {
    onChange?: (value: string) => void;
    onBlur?: () => void;
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

export function PasswordInput(props: PasswordInputProps) {
  /* State */

  const [isVisible, setIsVisible] = React.useState(false);

  const endContent = isVisible ? (
    <EyeSlashFilledIcon className="pointer-events-none h-5 w-5" />
  ) : (
    <EyeFilledIcon className="pointer-events-none h-5 w-5" />
  );

  /* Render */

  return (
    <Input
      type={isVisible ? "text" : "password"}
      label="Password"
      value={props.value}
      opts={{
        ...props.opts,
        endContent: (
          <Button
            opts={{ isIconOnly: true, endContent }}
            handlers={{ onPress: () => setIsVisible(!isVisible) }}
          />
        ),
      }}
      handlers={props.handlers}
      classNames={props.classNames}
    />
  );
}
