import { ArrowLeftIcon } from "@heroicons/react/24/solid";
import { useNavigate } from "@tanstack/react-router";

import { Button } from "./form/button";

/* **
 * Props and types
 ** */

type BackButtonProps = {
  to: string;
  replace?: boolean;
  classNames?: string;
};

/* **
 * Component
 ** */

export default function BackButton({ to, replace = false, classNames }: BackButtonProps) {
  /* Hooks */

  const navigate = useNavigate();

  /* Render */

  return (
    <Button
      opts={{
        isIconOnly: true,
        endContent: <ArrowLeftIcon className="h-4 w-4" aria-hidden="true" />,
      }}
      handlers={{ onPress: () => navigate({ to, replace }) }}
      classNames={`inline-flex items-center justify-center gap-2 rounded-md px-2 py-1 hover:bg-gray-100 focus:ring focus:outline-none ${classNames}`}
    />
  );
}
