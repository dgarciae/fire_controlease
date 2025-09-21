import { Chip as HeroChip } from "@heroui/chip";

/* **
 * Props and types
 ** */

interface ChipProps {
  text: string;
  opts?: {
    variant?: "solid" | "bordered" | "light" | "flat" | "faded" | "shadow" | "dot";
    color?: "default" | "primary" | "secondary" | "success" | "warning" | "danger";
    size?: "sm" | "md" | "lg";
    radius?: "none" | "sm" | "md" | "lg" | "full";
    avatar?: React.ReactNode;
    startContent?: React.ReactNode;
    endContent?: React.ReactNode;
    isDisabled?: boolean;
  };
  classNames?: string;
}

/* **
 * Component
 ** */

export function Chip({ text, opts, classNames }: ChipProps) {
  /* Render */

  return (
    <HeroChip {...opts} className={classNames}>
      {text}
    </HeroChip>
  );
}
