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
  onOpenChange: (open: boolean) => void;
  onConfirm: () => void;
}

/* **
 * Component
 ** */

export function Modal({ title, text, isOpen, onOpenChange, onConfirm }: ModalProps) {
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
              <Button color="primary" variant="light" onPress={onClose}>
                CLOSE
              </Button>
              <Button color="danger" onPress={onConfirm}>
                DELETE
              </Button>
            </ModalFooter>
          </>
        )}
      </ModalContent>
    </HeroModal>
  );
}
