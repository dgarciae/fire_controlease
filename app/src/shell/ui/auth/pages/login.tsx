import { useEffect } from "react";
import { toast } from "react-toastify";

import { useForm } from "@tanstack/react-form";

import { ERROR_TOAST_OPTIONS, useAuth } from "../../../core";
import { ButtonLoadingSpinner } from "../../components/form/buttonLoadingSpinner";
import { FormFieldInput } from "../../components/form/fieldInput";
import { FormFieldPassword } from "../../components/form/fieldPass";
import firebaseLogo from "../../icons/firebase.svg";

/* **
 * Component
 ** */

export function LoginPage() {
  /* Store */

  const { checkEmailAvailability, submitLogin } = useAuth();

  /* Hooks */

  const form = useForm({
    defaultValues: {
      email: "",
      password: "",
    },
    onSubmit: ({ value }) => submitLogin(value),
  });

  /* Effects */

  useEffect(() => {
    const raw = sessionStorage.getItem("noUserSessionFlash");
    if (!raw) return;
    try {
      const flash = JSON.parse(raw);
      if (flash?.type === "error") toast.error(flash.text, ERROR_TOAST_OPTIONS);
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
              form.handleSubmit();
            }}
            className="flex flex-col gap-y-4"
            noValidate
          >
            {/* Email */}

            <div>
              <FormFieldInput
                form={form}
                name="email"
                validators={{
                  onChange: ({ value }: { value: any }) =>
                    !value
                      ? "Email is required"
                      : !/^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/.test(value)
                        ? "Email is not valid"
                        : undefined,
                  onChangeAsyncDebounceMs: 1000,
                  onChangeAsync: async ({ value }: { value: any }) => {
                    const isAvailable = checkEmailAvailability(value);
                    return !isAvailable ? "Email is already taken" : undefined;
                  },
                }}
                type="text"
                opts={{ radius: "sm", isRequired: true }}
                classNames={{
                  label: "mb-1 block",
                  input: "w-full",
                }}
              />
            </div>

            {/* Password */}

            <div>
              <FormFieldPassword
                form={form}
                name="password"
                validators={{
                  onChange: ({ value }: { value: any }) => {
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
                opts={{ radius: "sm" }}
                classNames={{
                  label: "mb-1 block",
                  input: "w-full",
                }}
              />
            </div>

            {/* Submit */}

            <form.Subscribe
              selector={(state: any) => [state.canSubmit, state.isSubmitting]}
            >
              {([canSubmit, isSubmitting]: any[]) => (
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
            </form.Subscribe>
          </form>
        </div>
      </div>
    </div>
  );
}
