import { nanoid } from "nanoid";

import { useMemo, useState } from "react";

import { Input as HeroInput } from "@heroui/input";

import { capitalizeText } from "../../../utils";
import { EyeFilledIcon } from "../../icons/eyeFilled";
import { EyeSlashFilledIcon } from "../../icons/eyeSlashFilled";
import { Button } from "./button";

/* **
 * Props and types
 ** */

interface FormFieldPasswordProps {
  form: any;
  name: string;
  validators?: Record<string, any>;
  listeners?: Record<string, any>;
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
    isRequired?: boolean;
    isInvalid?: boolean;
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

export function FormFieldPassword({
  form,
  validators,
  label,
  opts,
  handlers,
  classNames,
}: FormFieldPasswordProps) {
  /* State */

  const [isVisible, setIsVisible] = useState(false);

  const endContent = isVisible ? (
    <EyeSlashFilledIcon className="pointer-events-none h-5 w-5" />
  ) : (
    <EyeFilledIcon className="pointer-events-none h-5 w-5" />
  );

  /* Const */

  const id = useMemo(() => nanoid(), []);

  /* Render */

  return (
    <form.Field name="password" validators={validators}>
      {(field: any) => (
        <HeroInput
          type={isVisible ? "text" : "password"}
          label={
            <label htmlFor={`password-${id}`}>
              {label ?? capitalizeText(field.name.split(".")[-1].replace("_", " "))}
            </label>
          }
          value={field.state.value}
          id={`password-${id}`}
          name={field.name}
          isInvalid={field.state.meta.errors.length > 0}
          errorMessage={field.state.meta.errors[0]}
          endContent={
            <Button
              opts={{ isIconOnly: true, endContent }}
              handlers={{ onPress: () => setIsVisible(!isVisible) }}
            />
          }
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
          aria-label="password"
        />
      )}
    </form.Field>
  );
}
