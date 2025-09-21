import { useEffect } from "react";
import { toast } from "react-toastify";

import { Input } from "@heroui/input";
import { useForm } from "@tanstack/react-form";

import { useAuth } from "../../../core";
import { ButtonLoadingSpinner, PasswordInput } from "../../atoms";
import firebaseLogo from "../../icons/firebase.svg";

const TOAST_OPTIONS = {
  position: "top-right" as const,
  autoClose: 5000,
  hideProgressBar: false,
  closeOnClick: true,
  pauseOnHover: true,
  draggable: true,
};

/* **
 * Component
 ** */

export function LoginPage() {
  /* Store and hooks */

  const { checkEmailAvailability, submitAuth } = useAuth();

  const form = useForm({
    defaultValues: {
      email: "",
      password: "",
    },
    onSubmit: ({ value }) => submitAuth(value),
  });

  useEffect(() => {
    const raw = sessionStorage.getItem("noUserSessionFlash");
    if (!raw) return;
    try {
      const flash = JSON.parse(raw);
      if (flash?.type === "error") toast.error(flash.text, TOAST_OPTIONS);
    } finally {
      sessionStorage.removeItem("noUserSessionFlash");
    }
  }, []);

  /* Render */

  return (
    <div className="m-auto w-96 p-6" id="login-page">
      <div className="bg-accent-color-pri flex w-full flex-col items-center justify-center rounded-md px-6 py-12 shadow-md">
        {/* Header* */}

        <div className="h-24 w-full">
          <img alt="Firemaker logo" src={firebaseLogo} className="object-contain" />
        </div>

        {/* Body */}

        <div className="mt-8 w-full">
          <form
            onSubmit={(e) => {
              e.preventDefault();
              e.stopPropagation();
              form.handleSubmit();
            }}
            className="flex flex-col gap-y-4"
            noValidate
          >
            {/* Email */}

            <div>
              <form.Field
                name="email"
                validators={{
                  onChange: ({ value }) =>
                    !value
                      ? "Email is required"
                      : !/^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/.test(value)
                        ? "Email is not valid"
                        : undefined,
                  onChangeAsyncDebounceMs: 1000,
                  onChangeAsync: async ({ value }) => {
                    const isAvailable = checkEmailAvailability(value);
                    return !isAvailable ? "Email is already taken" : undefined;
                  },
                }}
                children={(field) => {
                  return (
                    <Input
                      type="text"
                      label="Email"
                      id={`${field.name}-${field.state.value}`}
                      className="max-w-xs"
                      name={field.name}
                      value={field.state.value}
                      onBlur={field.handleBlur}
                      onChange={(ev) => field.handleChange(ev.target.value)}
                      isRequired
                      isInvalid={field.state.meta.errors.length > 0}
                      errorMessage={field.state.meta.errors[0]}
                    />
                  );
                }}
              />
            </div>

            {/* Password */}

            <div>
              <form.Field
                name="password"
                validators={{
                  onChange: ({ value }) => {
                    return !value
                      ? "Password is required"
                      : value.length < 8
                        ? "Password must be at least 8 characters"
                        : !/[a-z]/.test(value)
                          ? "Password must contain at least one lowercase letter"
                          : !/[A-Z]/.test(value)
                            ? "Password must contain at least one uppercase letter"
                            : !/\d/.test(value)
                              ? "Password must contain at least one number"
                              : undefined;
                  },
                }}
                children={(field) => {
                  return (
                    <PasswordInput
                      name={field.name}
                      value={field.state.value}
                      onBlur={field.handleBlur}
                      onChange={(e) => field.handleChange(e.target.value)}
                      error={field.state.meta.errors[0]}
                    />
                  );
                }}
              />
            </div>

            {/* Submit */}

            <form.Subscribe
              selector={(state) => [state.canSubmit, state.isSubmitting]}
              children={([canSubmit, isSubmitting]) => (
                <div className="mt-4 flex w-full justify-center">
                  <button
                    type="submit"
                    disabled={!canSubmit}
                    className="bg-base-color-sec w-2/3 cursor-pointer rounded-md py-2 text-white transition disabled:cursor-not-allowed disabled:opacity-50"
                  >
                    {isSubmitting ? <ButtonLoadingSpinner /> : "Submit"}
                  </button>
                </div>
              )}
            />
          </form>
        </div>
      </div>
    </div>
  );
}
