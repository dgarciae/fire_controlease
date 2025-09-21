import { nanoid } from "nanoid";

import React from "react";

import { Input } from "@heroui/react";

import { EyeFilledIcon, EyeSlashFilledIcon } from "../icons";

/* **
 * Props
 ** */

interface PasswordInputProps {
  name: string;
  value: string;
  onBlur?: React.FocusEventHandler<HTMLInputElement>;
  onChange?: React.ChangeEventHandler<HTMLInputElement>;
  error?: string;
}

/* **
 * Component
 ** */

export function PasswordInput({
  name,
  value,
  onBlur,
  onChange,
  error = "",
}: PasswordInputProps) {
  /* State */

  const [isVisible, setIsVisible] = React.useState(false);

  /* Render */

  return (
    <Input
      type={isVisible ? "text" : "password"}
      label="Password"
      id={`${name}-${nanoid()}`}
      className="max-w-xs"
      name={name}
      value={value}
      onBlur={onBlur}
      onChange={onChange}
      isRequired
      isInvalid={error !== ""}
      errorMessage={error}
      endContent={
        <button
          aria-label="toggle password visibility"
          className="h-full outline-transparent focus:outline-solid"
          type="button"
          onClick={() => setIsVisible(!isVisible)}
        >
          {isVisible ? (
            <EyeSlashFilledIcon className="text-default-400 pointer-events-none text-2xl" />
          ) : (
            <EyeFilledIcon className="text-default-400 pointer-events-none text-2xl" />
          )}
        </button>
      }
    />
  );
}
