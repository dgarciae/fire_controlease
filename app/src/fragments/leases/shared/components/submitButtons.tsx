import { useCallback } from "react";

import { CheckIcon, XMarkIcon } from "@heroicons/react/24/solid";

import { eventBus } from "#src/shell";
import { Button } from "#src/shell/ui";

/* **
 * Props ant types
 ** */

interface SubmitFormButtonsProps {
  isFormSubmiting: boolean;
}

/* **
 * Component
 ** */

export function SubmitFormButtons({ isFormSubmiting }: SubmitFormButtonsProps) {
  /* Functions */

  const triggerReset = useCallback(() => {
    eventBus.emit("leases:form:reset");
  }, []);

  const triggerSubmit = useCallback(() => {
    eventBus.emit("leases:form:submit");
  }, []);

  /* Render */

  return (
    <div className="flex gap-x-3" id="submit-lease-form-buttons">
      <Button
        opts={{ isIconOnly: true, isDisabled: isFormSubmiting }}
        handlers={{ onPress: triggerReset }}
      >
        <XMarkIcon className="h-6 w-6" />
      </Button>
      <Button
        opts={{ isIconOnly: true, isDisabled: isFormSubmiting }}
        handlers={{ onPress: triggerSubmit }}
      >
        <CheckIcon className="h-6 w-6" />
      </Button>
    </div>
  );
}
