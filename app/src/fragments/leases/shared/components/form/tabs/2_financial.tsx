import { useMemo } from "react";

import {
  Button,
  FormFieldDatePicker,
  FormFieldInput,
  FormFieldNumberInput,
  FormFieldSwitch,
} from "#src/shell/ui/";

import { TabFormCard } from "./tabFormCard";

/* **
 * Props and types
 ** */

interface financialTabProps {
  form: any;
}

/* **
 * Component
 ** */

export function FinancialTab({ form }: financialTabProps) {
  /* Const */

  const { getFieldValue, setFieldValue } = form;

  const applyMarketIpc = getFieldValue("contract.financial.ipc.market_ipc.apply");
  const applyIPCSpecificRules = getFieldValue(
    "contract.financial.ipc.specific_rules.apply"
  );

  const currencyFormatOptions: Intl.NumberFormatOptions = {
    style: "currency",
    currency: "EUR",
    currencyDisplay: "symbol",
  };

  const rentalDetailsFieldsAndListeners = useMemo(
    () => ({
      "transitories.monthlySignedRent": {
        onChange: (value: number) =>
          setFieldValue("contract.financial.rents.signed", value * 12),
      },
      "contract.financial.rents.signed": {
        onChange: (value: number) =>
          setFieldValue("transitories.monthlySignedRent", value / 12),
      },
      "transitories.monthlyInvoicedRent": {
        onChange: (value: number) =>
          setFieldValue("contract.financial.rents.invoiced", value * 12),
      },
      "contract.financial.rents.invoiced": {
        onChange: (value: number) =>
          setFieldValue("transitories.monthlyInvoicedRent", value / 12),
      },
      "transitories.monthlyExternalSignedRent": {
        onChange: (value: number) =>
          setFieldValue("contract.financial.rents.external_unit.signed", value * 12),
      },
      "contract.financial.rents.external_unit.signed": {
        onChange: (value: number) =>
          setFieldValue("transitories.monthlyExternalSignedRent", value / 12),
      },
      "transitories.monthlyExternalInvoicedRent": {
        onChange: (value: number) =>
          setFieldValue("contract.financial.rents.external_unit.invoiced", value * 12),
      },
      "contract.financial.rents.external_unit.invoiced": {
        onChange: (value: number) =>
          setFieldValue("transitories.monthlyExternalInvoicedRent", value / 12),
      },
    }),
    [setFieldValue]
  );

  const periodicChargesFieldsAndListeners = useMemo(
    () => ({
      "transitories.monthlyServiceCharges": {
        onChange: (value: number) =>
          setFieldValue("contract.financial.charges.service", value * 12),
      },
      "contract.financial.charges.service": {
        onChange: (value: number) =>
          setFieldValue("transitories.monthlyServiceCharges", value / 12),
      },
      "transitories.monthlyExternalServiceCharges": {
        onChange: (value: number) =>
          setFieldValue("contract.financial.charges.external_unit", value * 12),
      },
      "contract.financial.charges.external_unit": {
        onChange: (value: number) =>
          setFieldValue("transitories.monthlyExternalServiceCharges", value / 12),
      },
      "transitories.monthlyIbi": {
        onChange: (value: number) =>
          setFieldValue("contract.financial.fees.ibi", value * 12),
      },
      "contract.financial.fees.ibi": {
        onChange: (value: number) => setFieldValue("transitories.monthlyIbi", value / 12),
      },
      "transitories.monthlyMarketingFees": {
        onChange: (value: number) =>
          setFieldValue("contract.financial.fees.marketing", value * 12),
      },
      "contract.financial.fees.marketing": {
        onChange: (value: number) =>
          setFieldValue("transitories.monthlyMarketingFees", value / 12),
      },
      "transitories.monthlyOtherChargesAndFees": {
        onChange: (value: number) =>
          setFieldValue("contract.financial.fees.other", value * 12),
      },
      "contract.financial.fees.other": {
        onChange: (value: number) =>
          setFieldValue("transitories.monthlyOtherChargesAndFees", value / 12),
      },
    }),
    [setFieldValue]
  );

  /* Render */

  return (
    <div className="flex flex-col gap-y-6" id="financial-tab">
      {/* Rental details */}

      <TabFormCard title="Rental Details">
        {Object.entries(rentalDetailsFieldsAndListeners).map(([field, listener]) => (
          <FormFieldNumberInput
            key={field}
            form={form}
            name={field}
            listeners={listener}
            formatOptions={currencyFormatOptions}
          />
        ))}
      </TabFormCard>

      {/* Periodic charges */}

      <TabFormCard title="Periodic Charges and Fees">
        {Object.entries(periodicChargesFieldsAndListeners).map(([field, listener]) => (
          <FormFieldNumberInput
            key={field}
            form={form}
            name={field}
            listeners={listener}
            formatOptions={currencyFormatOptions}
          />
        ))}
      </TabFormCard>

      {/* One shot charges */}

      <TabFormCard title="One Shot Charges and Fees">
        {["ecop", "fit_out_contribution", "intermediation", "other_one_shot"].map(
          (field) => (
            <FormFieldNumberInput
              key={field}
              form={form}
              name={`contract.financial.fees.${field}`}
              formatOptions={currencyFormatOptions}
            />
          )
        )}
      </TabFormCard>

      {/* Sales */}

      <TabFormCard title="Sales">
        {/* Amount and forecast */}

        {["amount", "forecast"].map((field) => (
          <FormFieldNumberInput
            key={field}
            form={form}
            name={`contract.financial.sales.${field}`}
            formatOptions={currencyFormatOptions}
          />
        ))}

        {/* Report and clause */}

        {["report", "clause"].map((field) => (
          <FormFieldInput
            key={field}
            form={form}
            name={`contract.financial.sales.${field}`}
            type="text"
          />
        ))}
      </TabFormCard>

      {/* IPC */}

      <TabFormCard title="IPC Adjustments">
        {/* Market IPC */}

        <div
          className="sm:cols-span-2 flex gap-4 lg:col-span-3 xl:col-span-4"
          id="maket-ipc"
        >
          <FormFieldSwitch form={form} name="contract.financial.ipc.market_ipc.apply" />

          {applyMarketIpc && (
            <FormFieldDatePicker
              form={form}
              name="contract.financial.ipc.market_ipc.start_date"
              showMonthAndYearPickers={true}
            />
          )}
        </div>

        {/* IPC specific rules */}

        <div
          className="sm:cols-span-2 flex gap-4 lg:col-span-3 xl:col-span-4"
          id="ipc-specific-rules"
        >
          <FormFieldSwitch
            form={form}
            name="contract.financial.ipc.specific_rules.apply"
          />

          {applyIPCSpecificRules && (
            <form.Field name="contract.financial.ipc.specific_rules.rules" mode="array">
              {(field: any) => {
                return (
                  <div>
                    {field.state.value.map((_: any, i: number) => {
                      return (
                        <div>
                          <form.Field
                            key={`${field}-${i}`}
                            name={`contract.financial.ipc.specific_rules.rules[${i}].apply_market_index`}
                          >
                            {(subField: any) => {
                              return <FormFieldSwitch form={form} name={subField.name} />;
                            }}
                          </form.Field>
                          <form.Field
                            key={`${field}-${i}`}
                            name={`contract.financial.ipc.specific_rules.rules[${i}].max_increase`}
                          >
                            {(subField: any) => {
                              return (
                                <FormFieldNumberInput
                                  form={form}
                                  name={subField.name}
                                  formatOptions={{
                                    style: "percent",
                                    maximumFractionDigits: 2,
                                  }}
                                />
                              );
                            }}
                          </form.Field>
                          <form.Field
                            key={`${field}-${i}`}
                            name={`contract.financial.ipc.specific_rules.rules[${i}].start_date`}
                          >
                            {(subField: any) => {
                              return (
                                <FormFieldDatePicker
                                  form={form}
                                  name={subField.name}
                                  showMonthAndYearPickers={true}
                                />
                              );
                            }}
                          </form.Field>
                        </div>
                      );
                    })}
                    <Button
                      text="Add Rule"
                      handlers={{ onPress: () => field.pushValue({ name: "", age: 0 }) }}
                    />
                  </div>
                );
              }}
            </form.Field>
          )}
        </div>
      </TabFormCard>

      {/* Other details */}
    </div>
  );
}
