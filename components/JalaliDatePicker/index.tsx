"use client";

import React, { useState } from "react";
import { Calendar } from "@nextui-org/react";
import { I18nProvider } from "@react-aria/i18n";
import { DateValue, today, getLocalTimeZone } from "@internationalized/date";

interface JalaliDatePickerProps {
  value: DateValue | null;
  onChange: (date: DateValue | null) => void;
  allowedDates: DateValue[];
  ignoreRestrictions?: boolean; // New optional prop
}

export default function JalaliDatePicker({
  value,
  onChange,
  allowedDates,
  ignoreRestrictions = false, // Default to false
}: JalaliDatePickerProps) {
  const [selectedDate, setSelectedDate] = useState<DateValue | null>(value);

  const isAllowedDate = (date: DateValue): boolean => {
    const now = today(getLocalTimeZone());
    const max = now.add({ days: 30 });

    return (
      allowedDates.some(
        (allowedDate) =>
          allowedDate.year === date.year &&
          allowedDate.month === date.month &&
          allowedDate.day === date.day
      ) &&
      date.compare(now) >= 0 &&
      date.compare(max) <= 0
    );
  };

  return (
    <I18nProvider locale="fa-IR-u-ca-persian">
      <Calendar
        value={selectedDate}
        aria-label="انتخاب تاریخ (تقویم جلالی)"
        onChange={(newDate) => {
          setSelectedDate(newDate);
          onChange(newDate);
        }}
        isDateUnavailable={(date) =>
          !ignoreRestrictions && !isAllowedDate(date) // Skip logic if ignoreRestrictions is true
        }
      />
    </I18nProvider>
  );
}
