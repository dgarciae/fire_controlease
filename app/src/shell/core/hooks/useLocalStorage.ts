import { useState } from "react";

/* **
 * Types
 * ** */

interface setItemType {
  key?: string | undefined;
  value: any;
}

/* **
 * Hook
 * ** */

export function useLocalStorage<T>(globalKey?: string) {
  /* State */

  const storedValue = useState<T>(() => {
    const item = localStorage.getItem(globalKey!);
    return item ? JSON.parse(item) : null;
  });

  /* Functions */

  const getItem = (key?: string | undefined) => {
    const item = localStorage.getItem(key ?? globalKey!);
    return item ? JSON.parse(item) : null;
  };

  const setItem = ({ key, value }: setItemType) =>
    localStorage.setItem(key ?? globalKey!, JSON.stringify(value));

  const removeItem = (key?: string | undefined) =>
    localStorage.removeItem(key ?? globalKey!);

  /* Return */

  return { storedValue, getItem, setItem, removeItem };
}
