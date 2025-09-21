import { PlusCircleIcon } from "@heroicons/react/24/solid";
import { useNavigate } from "@tanstack/react-router";

import { roles, useAuthStore } from "#src/shell";
import { Button } from "#src/shell/ui";

/* **
 * Component
 ** */

export function AddLeaseButton() {
  /* Store */

  const checkRole = useAuthStore((state) => state.checkRole);

  /* Hooks */

  const navigate = useNavigate();

  /* Const */

  const canAddLease = checkRole(roles.admin, roles.editor);

  /* Render */

  return (
    <Button
      opts={{ isDisabled: canAddLease === false, isIconOnly: true }}
      handlers={{ onPress: () => navigate({ to: "/leasing-contracts/create" }) }}
    >
      <PlusCircleIcon className="h-5 w-5" />
    </Button>
  );
}
