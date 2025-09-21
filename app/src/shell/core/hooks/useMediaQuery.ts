import { useEffect, useLayoutEffect, useState } from "react";

/* **
 * Props ant types
 ** */

type UseMediaQueryOptions = {
  defaultValue?: boolean;
  initializeWithValue?: boolean;
};

/* **
 * Isomorphic layout effect
 ** */

const useIsomorphicLayoutEffect =
  typeof window !== "undefined" ? useLayoutEffect : useEffect;

/* **
 * Component
 ** */

export function useMediaQuery(
  query: string,
  { defaultValue = false, initializeWithValue = true }: UseMediaQueryOptions = {}
): boolean {
  const getMatches = (query: string): boolean => window.matchMedia(query).matches;

  const [matches, setMatches] = useState<boolean>(() => {
    if (initializeWithValue && typeof window !== "undefined") {
      return getMatches(query);
    }
    return defaultValue;
  });

  const handleChange = () => setMatches(getMatches(query));

  useIsomorphicLayoutEffect(() => {
    const matchMedia = window.matchMedia(query);
    handleChange();

    if (matchMedia.addListener) matchMedia.addListener(handleChange);
    else matchMedia.addEventListener("change", handleChange);

    return () => {
      if (matchMedia.removeListener) matchMedia.removeListener(handleChange);
      else matchMedia.removeEventListener("change", handleChange);
    };
  }, [query]);

  return matches;
}
