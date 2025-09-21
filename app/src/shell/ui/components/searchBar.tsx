import React, { useEffect, useRef, useState } from "react";

import { MagnifyingGlassIcon, XMarkIcon } from "@heroicons/react/24/solid";

import { Button } from "../components/form/button";
import { Input } from "../components/form/input";

/* **
 * Props and types
 ** */

type SearchBarProps = {
  onConfirm: (value: string) => void;
  delay?: number;
  placeholder?: string;
  defaultValue?: string;
  classNames?: string;
};

/* **
 * Component
 ** */

export function SearchBar({
  onConfirm,
  delay = 800,
  placeholder = "Buscar...",
  defaultValue,
  classNames,
}: SearchBarProps) {
  /* State */

  const [value, setValue] = useState<string>(defaultValue || "");
  const timerRef = useRef<number | null>(null);

  /* Handlers */

  const scheduleConfirm = (val: string) => {
    if (timerRef.current) {
      window.clearTimeout(timerRef.current);
    }
    timerRef.current = window.setTimeout(() => {
      onConfirm(val);
      timerRef.current = null;
    }, delay);
  };

  const handleKeyDown = (ev: React.KeyboardEvent<HTMLInputElement>) => {
    if (ev.key === "Enter") {
      if (timerRef.current) {
        window.clearTimeout(timerRef.current);
        timerRef.current = null;
      }
      onConfirm(value);
    }
  };

  const clear = () => {
    setValue("");
    if (timerRef.current) {
      window.clearTimeout(timerRef.current);
      timerRef.current = null;
    }
  };

  /* Effects */

  useEffect(() => {
    return () => {
      if (timerRef.current) {
        window.clearTimeout(timerRef.current);
      }
    };
  }, []);

  /* Render */

  return (
    <div className={`relative w-full ${classNames}`}>
      <MagnifyingGlassIcon className="pointer-events-none absolute top-1/2 left-3 h-5 w-5 -translate-y-1/2 text-gray-400" />
      <Input
        type="text"
        value={value}
        opts={{ placeholder: placeholder }}
        handlers={{
          onChange: (value) => {
            setValue(value);
            scheduleConfirm(value);
          },
          onKeyDown: handleKeyDown,
        }}
        classNames={{ input: ["pl-10 pr-8"] }}
      />
      {value.length > 0 && (
        <Button
          opts={{
            isIconOnly: true,
            endContent: <XMarkIcon className="h-4 w-4 text-gray-500" />,
          }}
          handlers={{ onPress: clear }}
        />
      )}
    </div>
  );
}
