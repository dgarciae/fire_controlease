import { Button as HeroButton } from "@heroui/react";

/* **
 * Props ant types
 ** */

interface ButtonProps {
  text?: string;
  opts?: {
    variant?: "solid" | "bordered" | "light" | "flat" | "faded" | "shadow" | "ghost";
    color?: "default" | "primary" | "secondary" | "success" | "warning" | "danger";
    size?: "sm" | "md" | "lg";
    radius?: "none" | "sm" | "md" | "lg" | "full";
    isIconOnly?: boolean;
    startContent?: React.ReactNode;
    endContent?: React.ReactNode;
    fullWidth?: boolean;
    disableRipple?: boolean;
    disableAnimation?: boolean;
    isDisabled?: boolean;
    isLoading?: boolean;
    spinner?: React.ReactNode;
    spinnerPlacement?: "start" | "end";
  };
  handlers?: {
    onPress?: () => void;
  };
  classNames?: string;
  children?: React.ReactNode;
}

/* **
 * Component
 ** */

export function Button({ classNames, children, ...props }: ButtonProps) {
  /* Render */

  return (
    <HeroButton {...props} className={classNames}>
      {props.opts?.isIconOnly ? children : props.text}
    </HeroButton>
  );
}
