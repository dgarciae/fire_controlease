import { VisuallyHidden, useSwitch } from "@heroui/react";

import { MoonIcon } from "../icons/moon";
import { SunIcon } from "../icons/sun";

/* **
 * Component
 ** */

export function ThemeButton(props: any) {
  /* Hooks */

  const { Component, slots, isSelected, getBaseProps, getInputProps, getWrapperProps } =
    useSwitch(props);

  /* Render */

  return (
    <div className="flex flex-col gap-2">
      <Component {...getBaseProps()}>
        <VisuallyHidden>
          <input {...getInputProps()} />
        </VisuallyHidden>
        <div
          {...getWrapperProps()}
          className={slots.wrapper({
            class: [
              "h-8 w-8",
              "flex items-center justify-center",
              "bg-default-100 hover:bg-default-200 rounded-lg",
            ],
          })}
        >
          {isSelected ? <SunIcon /> : <MoonIcon />}
        </div>
      </Component>
    </div>
  );
}
