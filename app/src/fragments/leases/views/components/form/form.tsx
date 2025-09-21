import { AnimatePresence, motion } from "framer-motion";

import { useEffect, useId, useState } from "react";

import { useForm } from "@tanstack/react-form";

import { classNames, eventBus } from "#src/shell";
import { Button } from "#src/shell/ui";

import { Lease } from "../../../domain";
import { useLeasesStore } from "../../../services";
import {
  BOTab,
  BasicTab,
  FilesTab,
  FinancialTab,
  GuaranteesTab,
  SignatoriesTab,
} from "./tabs";

/* **
 * Props and types
 ** */

interface LeaseFormProps {
  lease: Lease | undefined;
  onSubmit: (data: Lease) => void;
  changeTitle: (title: string) => void;
}

/* **
 * Component
 ** */

export function LeaseForm({ lease, onSubmit, changeTitle }: LeaseFormProps) {
  /* State */

  const [currentTab, setCurrentTab] = useState<number>(1);

  /* Render */

  return (
    <div className="flex flex-col gap-y-4">
      <_FormTabs currentTab={currentTab} setCurrentTab={setCurrentTab} />
      <_FormBody
        lease={lease}
        currentTab={currentTab}
        onSubmit={onSubmit}
        changeTitle={changeTitle}
      />
    </div>
  );
}

/* **
 * Form tabs
 ** */

interface FormTabsProps {
  currentTab: number;
  setCurrentTab: (tab: number) => void;
}

function _FormTabs({ currentTab, setCurrentTab }: FormTabsProps) {
  /* Const */

  const tabs = [
    { key: 1, label: "Signatories" },
    { key: 2, label: "Basic" },
    { key: 3, label: "Financial" },
    { key: 4, label: "Break Options" },
    { key: 5, label: "Guarantees" },
    { key: 6, label: "Files" },
  ];

  return (
    <div className="w-full">
      <div className="border-divider border-b">
        <div className="scrollbar-hide flex max-h-16 overflow-x-auto overflow-y-hidden scroll-smooth px-1">
          {tabs.map((tab) => {
            return (
              <Button
                key={`${tab.key}-${tab.label}`}
                handlers={{ onPress: () => setCurrentTab(tab.key) }}
                classNames={classNames(
                  "relative mr-6 flex-shrink-0 px-1 py-4 text-sm font-medium whitespace-nowrap transition",
                  currentTab === tab.key
                    ? "text-accent"
                    : "text-text-muted hover:text-text"
                )}
              >
                {tab.label}
                {currentTab === tab.key && (
                  <motion.div
                    className="bg-accent absolute right-0 bottom-[-1px] left-0 h-[2px]"
                    layoutId={`underline-${useId()}`}
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
  currentTab: number;
  onSubmit: (data: any) => void;
  changeTitle: (title: string) => void;
}

function _FormBody({ lease, currentTab, onSubmit, changeTitle }: FormBodyProps) {
  /* Store */

  const setFormData = useLeasesStore((state) => state.form.setData);
  const isSubmitting = useLeasesStore((state) => state.form.isSubmiting);
  const setIsSubmitting = useLeasesStore((state) => state.form.setIsSubmitting);

  /* Hooks */

  const form = useForm({
    defaultValues: lease ?? {},
    onSubmit: ({ value }) => {
      setFormData(value as Lease);
      onSubmit(value);
    },
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

  /* Const */

  const tabForms: Record<number, React.ReactNode> = {
    1: <SignatoriesTab />,
    2: <BasicTab changeTitle={changeTitle} />,
    3: <FinancialTab />,
    4: <BOTab />,
    5: <GuaranteesTab />,
    6: <FilesTab urls={lease?.contract?.files} />,
  };

  /* Render */

  return (
    <form
      id="lease-form"
      className="w-full"
      onSubmit={(ev) => {
        ev.preventDefault();
        form.handleSubmit();
      }}
      noValidate
    >
      <fieldset
        disabled={isSubmitting}
        className="min-w-0 disabled:cursor-not-allowed disabled:opacity-50"
      >
        <AnimatePresence mode="wait">
          <motion.div
            key={currentTab}
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -20 }}
            transition={{ duration: 0.2 }}
            className="w-full"
          >
            {tabForms[currentTab]}
          </motion.div>
        </AnimatePresence>
      </fieldset>
    </form>
  );
}
