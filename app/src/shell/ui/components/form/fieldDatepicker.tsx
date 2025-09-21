import { nanoid } from "nanoid";

import { useMemo } from "react";

import { DatePicker as HeroDatePicker } from "@heroui/date-picker";
import {
  type CalendarDate,
  type CalendarDateTime,
  type ZonedDateTime,
} from "@internationalized/date";

import { capitalizeText } from "../../../utils";

/* **
 * Props and types
 ** */

interface FormFieldDatePickerProps {
  form: any;
  name: string;
  validators?: Record<string, any>;
  listeners?: Record<string, any>;
  showMonthAndYearPickers: boolean;
  opts?: {
    variant?: "flat" | "bordered" | "faded" | undefined;
    color?: "default" | "primary" | "secondary" | "success" | "warning" | "danger";
    size?: "sm" | "md" | "lg";
    radius?: "none" | "sm" | "md" | "lg" | "full";
    defaultValue: string;
    placeholderValue?: ZonedDateTime | CalendarDate | CalendarDateTime | undefined | null;
    description?: React.ReactNode;
    startContent?: React.ReactNode;
    endContent?: React.ReactNode;
    labelPlacement?: "inside" | "outside" | "outside-left";
    fullWidth?: boolean;
    isRequired?: boolean;
    isReadOnly?: boolean;
    isDisabled?: boolean;
    visibleMonths?: number;
    firstDayOfWeek?: "sun" | "mon" | "tue" | "wed" | "thu" | "fri" | "sat";
    selectionAlignment?: "start" | "center" | "end";
    selectorIcon?: React.ReactNode;
    calendarWidth?: number;
    autoFocus?: boolean;
    hourCycle?: 12 | 24;
    granularity?: "day" | "hour" | "minute" | "second";
    hideTimeZone?: boolean;
    shouldForceLeadingZeros?: boolean;
    calendarBottomContent?: React.ReactNode;
  };
  props?: {
    popoverProps?: Record<string, any>;
    selectorButtonProps?: Record<string, any>;
    calendarProps?: Record<string, any>;
    timeInputProps?: Record<string, any>;
  };
  handlers?: {
    onChange?: (value: ZonedDateTime | CalendarDate | CalendarDateTime | null) => void;
    onFocus?: (ev: React.FocusEvent<Element>) => void;
    onBlur?: (ev: React.FocusEvent<Element>) => void;
    onFocusChange?: (isFocused: boolean) => void;
  };
  classNames?: {
    base?: string;
    selectorButton?: string;
    selectorIcon?: string;
    popoverContent?: string;
    calendar?: string;
    calendarContent?: string;
    timeInputLabel?: string;
    timeInput?: string;
  };
}

/* **
 * Component
 ** */

export function FormFieldDatePicker({
  form,
  name,
  validators,
  listeners,
  showMonthAndYearPickers,
  opts,
  handlers,
  classNames,
}: FormFieldDatePickerProps) {
  /* Const */

  const id = useMemo(() => nanoid(), []);

  /* Render */

  return (
    <form.Field name={name} validators={validators} listeners={listeners}>
      {(field: any) => (
        <HeroDatePicker
          showMonthAndYearPickers={showMonthAndYearPickers}
          label={
            <label htmlFor={`${name}-${id}`}>
              {capitalizeText(field.name.split(".")[-1].replace("_", " "))}
            </label>
          }
          value={field.state.value}
          id={`${name}-${id}`}
          name={field.name}
          isInvalid={field.state.meta.errors.length > 0}
          errorMessage={field.state.meta.errors[0]}
          {...opts}
          onChange={(value) => {
            field.handleChange(value);
            if (handlers?.onChange) handlers.onChange(value);
          }}
          onFocus={handlers?.onFocus}
          onBlur={handlers?.onBlur}
          onFocusChange={handlers?.onFocusChange}
          classNames={classNames}
        />
      )}
    </form.Field>
  );
}
