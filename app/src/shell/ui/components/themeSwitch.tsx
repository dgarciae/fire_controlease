import { useEffect, useState } from "react";

import { Switch as HeroSwitch } from "@heroui/react";

import { MoonIcon } from "../icons/moon";
import { SunIcon } from "../icons/sun";

/* **
 * Component
 ** */

export function ThemeSwitch() {
  /* State */

  const [isSelected, setIsSelected] = useState(false);

  /* Hooks */

  useEffect(() => {
    document.documentElement.classList.toggle("dark");
  }, [isSelected]);

  /* Render */

  return (
    <HeroSwitch
      size="lg"
      color="success"
      startContent={<SunIcon />}
      endContent={<MoonIcon />}
      isSelected={isSelected}
      onValueChange={setIsSelected}
    >
      Dark mode
    </HeroSwitch>
  );
}
