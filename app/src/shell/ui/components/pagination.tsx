import { Pagination as HeroPagination } from "@heroui/pagination";

/* **
 * Props and types
 ** */

interface PaginationProps {
  currentPage: number;
  total: number;
  onChange: (page: number) => void;
  opts?: {
    variant?: "flat" | "bordered" | "light" | "faded";
    color?: "default" | "primary" | "secondary" | "success" | "warning" | "danger";
    size?: "sm" | "md" | "lg";
    radius?: "sm" | "md" | "lg" | "none" | "full" | undefined;
    dotsJump?: number;
    initialPage?: number;
    siblings?: number;
    boundaries?: number;
    loop?: boolean;
    isCompact?: boolean;
    isDisabled?: boolean;
    showShadow?: boolean;
    showControls?: boolean;
    disableCursorAnimation?: boolean;
    disableAnimation?: boolean;
  };
}

/* **
 * Component
 ** */

export function Pagination({ currentPage, total, onChange, opts }: PaginationProps) {
  /* Render */

  return (
    <HeroPagination
      loop
      showControls
      page={currentPage}
      total={total}
      onChange={onChange}
      {...opts}
    />
  );
}
