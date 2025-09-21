import { useEffect, useRef } from "react";

export function useEffectAfterMount(effect: () => void, deps: any[]) {
  const hasMounted = useRef(false);
  useEffect(function () {
    if (hasMounted.current) return effect();
    hasMounted.current = true;
  }, deps);
}
