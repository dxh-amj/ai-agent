import dayjs, { type Dayjs } from "dayjs";
import { useEffect, useState } from "react";

import type { DateRangePreset, UseDateRangePickerLogicProps } from "./types";

export const useDateRangePickerLogic = ({
  startDate,
  endDate,
  onStartDateChange,
  onEndDateChange,
  onApply,
  onCancel,
  onClose,
  open,
  selectedPreset: externalSelectedPreset,
  onPresetSelect,
}: UseDateRangePickerLogicProps) => {
  const [internalSelectedPreset, setInternalSelectedPreset] = useState<string | null>(null);
  const [currentMonth, setCurrentMonth] = useState(dayjs());
  const [showCalendar, setShowCalendar] = useState(false);

  const selectedPreset = externalSelectedPreset || internalSelectedPreset;

  useEffect(() => {
    if (open) {
      const isCustomRangeSelected =
        selectedPreset &&
        (selectedPreset.toLowerCase().includes("custom") ||
          selectedPreset.toLowerCase().includes("özel"));

      if (isCustomRangeSelected) {
        setShowCalendar(true);
      } else {
        setShowCalendar(false);
      }
    }
  }, [open, selectedPreset]);

  const handlePresetClick = (preset: DateRangePreset) => {
    const range = preset.getValue();
    const isCustomRange = range.startDate === null && range.endDate === null;

    if (isCustomRange) {
      setInternalSelectedPreset(preset.label);
      onPresetSelect?.(preset.label);
      setShowCalendar(true);
    } else {
      setInternalSelectedPreset(preset.label);
      onPresetSelect?.(preset.label);
      onStartDateChange(range.startDate);
      onEndDateChange(range.endDate);
      const CLOSE_DELAY_MS = 150;
      setTimeout(() => {
        onClose?.();
      }, CLOSE_DELAY_MS);
    }
  };

  const handleDateClick = (date: Dayjs) => {
    if (!startDate || (startDate && endDate)) {
      onStartDateChange(date);
      onEndDateChange(null);
      setInternalSelectedPreset(null);
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      onPresetSelect?.(null as any);
    } else if (startDate && !endDate) {
      if (date.isBefore(startDate)) {
        onStartDateChange(date);
        onEndDateChange(startDate);
      } else {
        onEndDateChange(date);
      }
    }
  };

  const handleApply = () => {
    onApply?.();
    setShowCalendar(false);
    onClose?.();
  };

  const handleCancel = () => {
    onCancel?.();
    setShowCalendar(false);
    onClose?.();
  };

  const formatDateRange = () => {
    if (startDate && endDate) {
      return `${startDate.format("MM/DD/YYYY")} - ${endDate.format("MM/DD/YYYY")}`;
    }
    if (startDate) {
      return startDate.format("MM/DD/YYYY");
    }
    return "";
  };

  const handlePreviousMonth = () => {
    setCurrentMonth(currentMonth.subtract(1, "month"));
  };

  const handleNextMonth = () => {
    setCurrentMonth(currentMonth.add(1, "month"));
  };

  return {
    currentMonth,
    showCalendar,
    selectedPreset,
    handlePresetClick,
    handleDateClick,
    handleApply,
    handleCancel,
    formatDateRange,
    handlePreviousMonth,
    handleNextMonth,
  };
};
