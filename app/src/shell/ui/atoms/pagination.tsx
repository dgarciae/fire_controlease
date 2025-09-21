import { Pagination as HeroPagination } from "@heroui/pagination";

/* **
 * Props and types
 ** */

interface PaginationProps {
  currentPage: number;
  total: number;
  onChange: (page: number) => void;
}

/* **
 * Component
 ** */

export function Pagination({ currentPage, total, onChange }: PaginationProps) {
  /* Render */

  return (
    <HeroPagination
      loop
      showControls
      page={currentPage}
      total={total}
      onChange={onChange}
    />
  );
}
