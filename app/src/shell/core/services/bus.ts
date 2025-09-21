interface AllowedEvents {
  "leases:form:submit": unknown;
  "leases:form:reset": undefined;
}

function createEventBus<T extends Record<string, any> = Record<string, unknown>>() {
  const bus = new EventTarget();

  const emit = <K extends keyof T>(type: K, detail?: T[K]) => {
    const ev = new CustomEvent(String(type), { detail });
    bus.dispatchEvent(ev);
  };

  const on = <K extends keyof T>(type: K, handler: (ev: CustomEvent<T[K]>) => void) => {
    const wrapped = (e: Event) => handler(e as CustomEvent<T[K]>);
    bus.addEventListener(String(type), wrapped as EventListener);
    return () => bus.removeEventListener(String(type), wrapped as EventListener);
  };

  const once = <K extends keyof T>(type: K, handler: (ev: CustomEvent<T[K]>) => void) => {
    const wrapped = (e: Event) => {
      handler(e as CustomEvent<T[K]>);
      bus.removeEventListener(String(type), wrapped as EventListener);
    };
    bus.addEventListener(String(type), wrapped as EventListener);
  };

  return { emit, on, once } as const;
}

export const eventBus = createEventBus<AllowedEvents>();
