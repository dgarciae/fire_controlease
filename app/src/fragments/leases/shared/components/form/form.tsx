import { AnimatePresence, motion } from "framer-motion";
import { nanoid } from "nanoid";

import { useEffect, useMemo, useState } from "react";

import { useForm } from "@tanstack/react-form";

import { classNames, eventBus } from "#src/shell";
import { Button } from "#src/shell/ui";

import { getLeaseFormDefaultValues } from "../../helpers";
import { Lease } from "../../model";
import { useLeasesStore } from "../../store";

/* **
 * Props and types
 ** */

interface FormTabData {
  key: number;
  label: string;
  component: React.ComponentType<any>;
  props?: Record<string, any>;
}

interface LeaseFormProps {
  lease: Lease | undefined;
  formTabsData: FormTabData[];
}

/* **
 * Component
 ** */

export function LeaseForm({ lease, formTabsData }: LeaseFormProps) {
  /* State */

  const [currentTab, setCurrentTab] = useState<number>(1);

  /* Render */

  return (
    <div className="flex flex-col gap-y-4">
      <_FormTabs
        formTabsData={formTabsData}
        currentTab={currentTab}
        setCurrentTab={setCurrentTab}
      />
      <_FormBody lease={lease} formTabsData={formTabsData} currentTab={currentTab} />
    </div>
  );
}

/* **
 * Form tabs
 ** */

interface FormTabsProps {
  formTabsData: FormTabData[];
  currentTab: number;
  setCurrentTab: (tab: number) => void;
}

function _FormTabs({ formTabsData, currentTab, setCurrentTab }: FormTabsProps) {
  /* Const */

  const id = useMemo(() => nanoid(), []);

  /* Render */

  return (
    <div className="w-full">
      <div className="border-divider border-b">
        <div className="scrollbar-hide flex max-h-16 overflow-x-auto overflow-y-hidden scroll-smooth px-1">
          {formTabsData.map((tabData) => {
            return (
              <Button
                key={`${tabData.key}-${tabData.label}`}
                handlers={{ onPress: () => setCurrentTab(tabData.key) }}
                classNames={classNames(
                  "relative mr-6 flex-shrink-0 px-1 py-4 text-sm font-medium whitespace-nowrap transition",
                  currentTab === tabData.key
                    ? "text-accent"
                    : "text-text-muted hover:text-text"
                )}
              >
                {tabData.label}
                {currentTab === tabData.key && (
                  <motion.div
                    className="bg-accent absolute right-0 bottom-[-1px] left-0 h-[2px]"
                    layoutId={`underline-${id}`}
                    transition={{ type: "spring", stiffness: 380, damping: 30 }}
                  />
                )}
              </Button>
            );
          })}
        </div>
      </div>
    </div>
  );
}

/* **
 * Form body
 ** */

interface FormBodyProps {
  lease: Lease | undefined;
  formTabsData: FormTabData[];
  currentTab: number;
}

function _FormBody({ lease, formTabsData, currentTab }: FormBodyProps) {
  /* Store */

  const setFormData = useLeasesStore((state) => state.form.setData);
  const isSubmitting = useLeasesStore((state) => state.form.isSubmiting);
  const setIsSubmitting = useLeasesStore((state) => state.form.setIsSubmitting);

  /* Hooks */

  const form = useForm({
    defaultValues: getLeaseFormDefaultValues(lease),
    onSubmit: ({ value }) => setFormData(value as Lease),
  });

  useEffect(() => {
    const submitHandler = () => {
      if (isSubmitting) return;
      form.handleSubmit();
    };

    const resetHandler = () => {
      form.reset();
      setIsSubmitting(false);
    };

    const unsubSubmit = eventBus.on("leases:form:submit", submitHandler);
    const unsubReset = eventBus.on("leases:form:reset", resetHandler);
    return () => {
      unsubSubmit();
      unsubReset();
    };
  }, [form]);

  /* Functions */

  const getCurrentTabComponent = () => {
    const renderTabComponent = (tabData: FormTabData | undefined) => {
      if (!tabData) return null;
      const { component: Component, props = {} } = tabData;
      return <Component form={form} {...props} />;
    };

    const currentTabData = formTabsData.find((tabData) => tabData.key === currentTab);
    return renderTabComponent(currentTabData);
  };

  /* Const */

  const id = useMemo(() => nanoid(), []);

  /* Render */

  return (
    <form
      onSubmit={(ev) => {
        ev.preventDefault();
        form.handleSubmit();
      }}
      className="w-full"
      id="lease-form"
      noValidate
    >
      <fieldset
        disabled={isSubmitting}
        className="min-w-0 disabled:cursor-not-allowed disabled:opacity-50"
      >
        <AnimatePresence mode="wait">
          <motion.div
            key={id}
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -20 }}
            transition={{ duration: 0.2 }}
            className="w-full"
          >
            {getCurrentTabComponent()}
          </motion.div>
        </AnimatePresence>
      </fieldset>
    </form>
  );
}
