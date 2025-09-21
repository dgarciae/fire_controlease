import { nanoid } from "nanoid";

import { useCallback, useMemo, useState } from "react";

import {
  DropdownItem,
  DropdownMenu,
  DropdownSection,
  DropdownTrigger,
  Dropdown as HeroDropdown,
} from "@heroui/dropdown";
import { Button } from "@heroui/react";

/* **
 * Props ant types
 ** */

interface DropDownProps {
  ariaLabel: string;
  placement?: "top" | "bottom" | "left" | "right";
  backdrop?: "blur";
  selectionMode?: "single" | "multiple" | "none";
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
  setExternalSelectedKeys?: (keys: Set<string>) => void;
}

/* **
 * Component
 ** */

export function DropDown({
  ariaLabel,
  placement,
  backdrop,
  trigger,
  sections,
  hoverVariant,
  selectionMode,
  setExternalSelectedKeys,
}: DropDownProps) {
  /* State */

  const [selectedKeys, setSelectedKeys] = useState(new Set(["all"]));

  /* Const */

  const selectedValue = useMemo(
    () => Array.from(selectedKeys).join(", ").replace(/_/g, ""),
    [selectedKeys]
  );

  const disabledKeys = useMemo(
    () =>
      sections.flatMap((section) =>
        section.items.filter((item) => item.disabled).map((item) => item.key)
      ),
    [sections]
  );

  const actionMap = useMemo(() => {
    const map = new Map<string, () => void>();
    sections.forEach((section) =>
      section.items.forEach((item) => {
        if (item.onSelect) map.set(item.key, item.onSelect);
      })
    );
    return map;
  }, [sections]);

  const handleAction = useCallback(
    (key: string | number) => {
      const fn = actionMap.get(String(key));
      if (fn) fn();
    },
    [actionMap]
  );

  /* Render */

  return (
    <HeroDropdown placement={placement} backdrop={backdrop}>
      <DropdownTrigger>
        {trigger ?? <_DefaultTrigger text={selectedValue} />}
      </DropdownTrigger>
      <DropdownMenu
        aria-label={ariaLabel}
        disabledKeys={disabledKeys}
        onAction={handleAction}
        variant={hoverVariant}
        selectionMode={selectionMode}
        closeOnSelect={selectionMode === "single"}
        selectedKeys={selectedKeys}
        onSelectionChange={(keys) => {
          if (setExternalSelectedKeys) {
            setSelectedKeys(keys as Set<string>);
            setExternalSelectedKeys(keys as Set<string>);
          }
        }}
      >
        {sections.map((section) => (
          <DropdownSection key={nanoid()} showDivider={section.showDivider ?? false}>
            {section.items.map((item) => (
              <DropdownItem
                key={item.key}
                shortcut={item.shortcut}
                startContent={item.startIcon}
                endContent={item.endContent}
                description={item.description}
              >
                {item.label}
              </DropdownItem>
            ))}
          </DropdownSection>
        ))}
      </DropdownMenu>
    </HeroDropdown>
  );
}

/* **
 * Private components
 ** */

const _DefaultTrigger = ({ text }: { text: string }) => (
  <Button variant="bordered">{text}</Button>
);
