import { ArrowLeftIcon } from "@heroicons/react/24/solid";
import { useNavigate } from "@tanstack/react-router";

/* **
 * Props and types
 ** */

type BackButtonProps = {
  to: string;
  replace?: boolean;
  className?: string;
  ariaLabel?: string;
};

/* **
 * Component
 ** */

export default function BackButton({
  to,
  replace = false,
  className = "",
  ariaLabel = "Volver",
}: BackButtonProps) {
  /* Hooks */

  const navigate = useNavigate();

  /* Render */

  return (
    <button
      type="button"
      onClick={() => navigate({ to, replace })}
      aria-label={ariaLabel}
      className={`inline-flex items-center gap-2 rounded-md px-3 py-1 hover:bg-gray-100 focus:ring focus:outline-none ${className}`}
    >
      <ArrowLeftIcon className="h-4 w-4" aria-hidden="true" />
    </button>
  );
}
