import React, { useEffect, useRef, useState } from "react";

import { MagnifyingGlassIcon, XMarkIcon } from "@heroicons/react/24/solid";
import { Input } from "@heroui/input";

/* **
 * Props and types
 ** */

type SearchBarProps = {
  onConfirm: (value: string) => void;
  delay?: number;
  placeholder?: string;
  defaultValue?: string;
  className?: string;
};

/* **
 * Component
 ** */

export default function SearchBar({
  onConfirm,
  delay = 800,
  placeholder = "Buscar...",
  defaultValue = "",
  className = "",
}: SearchBarProps) {
  /* State and effects */

  const [value, setValue] = useState<string>(defaultValue);
  const timerRef = useRef<number | null>(null);

  useEffect(() => {
    return () => {
      if (timerRef.current) {
        window.clearTimeout(timerRef.current);
      }
    };
  }, []);

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

  /* Render */

  return (
    <div className={`relative w-full ${className}`}>
      <MagnifyingGlassIcon className="pointer-events-none absolute top-1/2 left-3 h-5 w-5 -translate-y-1/2 text-gray-400" />
      <Input
        value={value}
        onChange={(ev) => {
          setValue(ev.target.value);
          scheduleConfirm(ev.target.value);
        }}
        onKeyDown={handleKeyDown}
        placeholder={placeholder}
        className="pr-10 pl-10"
        aria-label="search"
      />
      {value.length > 0 && (
        <button
          type="button"
          onClick={clear}
          aria-label="clear search"
          className="absolute top-1/2 right-2 -translate-y-1/2 rounded p-1 hover:bg-gray-100"
        >
          <XMarkIcon className="h-4 w-4 text-gray-500" />
        </button>
      )}
    </div>
  );
}
