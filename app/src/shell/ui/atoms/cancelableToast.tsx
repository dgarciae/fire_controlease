import { toast } from "react-toastify";

/* **
 * Props and types
 ** */

interface CancelableDeleteToastParams {
  toastId: string;
  message: string;
  text?: string;
  autoCloseMs?: number;
  onConfirm: () => Promise<void> | void;
}

/* **
 * Component
 ** */

export function CancelableToast({
  toastId,
  message,
  text = "Cancel",
  autoCloseMs = 2500,
  onConfirm,
}: CancelableDeleteToastParams) {
  const ToastContent = () => (
    <div className="flex w-full items-center justify-between gap-2 md:flex-col md:items-stretch">
      <span className="text-xs leading-5 sm:text-sm">{message}</span>
      <button
        type="button"
        onClick={() => toast.dismiss(toastId)}
        className="rounded bg-red-500 px-2 py-1 text-xs text-white sm:text-sm md:self-end"
      >
        {text}
      </button>
    </div>
  );

  toast(<ToastContent />, {
    toastId,
    autoClose: autoCloseMs,
    closeButton: false,
    onClose: async () => onConfirm(),
  });
}
