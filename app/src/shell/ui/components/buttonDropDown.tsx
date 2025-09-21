import { useState } from "react";

import { ChevronDownIcon } from "@heroicons/react/24/solid";
import { ButtonGroup as HeroButtonGroup } from "@heroui/react";

import { capitalizeText } from "../../utils";
import { Button } from "../components/form/button";
import { DropDown } from "./dropdown";

/* **
 * Props ant types
 ** */

interface ButtonDropDownProps {
  ariaLabel: string;
  placement?: "top" | "bottom" | "left" | "right";
  backdrop?: "blur";
  hoverVariant?: "solid" | "bordered" | "light" | "flat" | "faded" | "shadow";
  trigger?: React.ReactNode;
  sections: {
    showDivider?: boolean;
    items: {
      key: string;
      label: string;
      disabled?: boolean;
      shortcut?: string;
      startIcon?: React.ReactNode;
      endContent?: React.ReactNode;
      description?: string;
      onSelect: () => void;
    }[];
  }[];
}

/* **
 * Component
 ** */

export function ButtonDropDown(props: ButtonDropDownProps) {
  const [selectedOption, setSelectedOption] = useState(null as string | null);

  return (
    <HeroButtonGroup variant="flat">
      <Button>{capitalizeText(selectedOption ?? "")}</Button>
      <DropDown
        ariaLabel={props.ariaLabel}
        placement={props.placement}
        backdrop={props.backdrop}
        selectionMode="single"
        hoverVariant={props.hoverVariant}
        trigger={<ChevronDownIcon />}
        sections={props.sections}
        setExternalSelectedKeys={(keys: Set<string>) => {
          const firstKey = Array.from(keys)[0];
          setSelectedOption(firstKey === "all" ? null : firstKey);
        }}
      />
    </HeroButtonGroup>
  );
}
