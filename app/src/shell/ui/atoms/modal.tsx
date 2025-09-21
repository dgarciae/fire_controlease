import {
  Modal as HeroModal,
  ModalBody,
  ModalContent,
  ModalFooter,
  ModalHeader,
} from "@heroui/modal";
import { Button } from "@heroui/react";

/* **
 * Props and types
 ** */

interface ModalProps {
  title: string;
  text: string;
  isOpen: boolean;
  confirmButtonText: string;
  reverseButtons?: boolean;
  onOpenChange: (open: boolean) => void;
  onConfirm: () => void;
}

/* **
 * Component
 ** */

export function Modal({
  title,
  text,
  isOpen,
  confirmButtonText,
  reverseButtons = false,
  onOpenChange,
  onConfirm,
}: ModalProps) {
  /* Render */

  return (
    <HeroModal isOpen={isOpen} onOpenChange={onOpenChange}>
      <ModalContent>
        {(onClose) => (
          <>
            <ModalHeader className="flex flex-col gap-1">{title}</ModalHeader>
            <ModalBody>
              <p>{text}</p>
            </ModalBody>
            <ModalFooter>
              <Button
                variant={reverseButtons ? "light" : "solid"}
                color={reverseButtons ? "danger" : "primary"}
                onPress={onClose}
              >
                CLOSE
              </Button>
              <Button
                variant={reverseButtons ? "solid" : "light"}
                color={reverseButtons ? "primary" : "danger"}
                onPress={onConfirm}
              >
                {confirmButtonText}
              </Button>
            </ModalFooter>
          </>
        )}
      </ModalContent>
    </HeroModal>
  );
}
