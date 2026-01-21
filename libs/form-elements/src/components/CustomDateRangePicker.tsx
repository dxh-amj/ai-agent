"use client";

import { useState } from "react";
import { useTranslation } from "react-i18next";

import { TextField } from "@mui/material";
import { IconCalendar } from "@tabler/icons-react";

import { DateRangePicker } from "./date-range-picker/DateRangePicker";

import type { Dayjs } from "dayjs";

interface CustomDateRangePickerProps {
  startDate: Dayjs | null;
  endDate: Dayjs | null;
  onStartDateChange: (date: Dayjs | null) => void;
  onEndDateChange: (date: Dayjs | null) => void;
  id?: string;
  name?: string;
  label?: string;
  placeholder?: string;
  error?: boolean;
  helperText?: string | false;
  fullWidth?: boolean;
  disabled?: boolean;
  onBlur?: (event: any) => void;
  size?: "small" | "medium";
  sx?: any;
}

export const CustomDateRangePicker = ({
  startDate,
  endDate,
  onStartDateChange,
  onEndDateChange,
  id,
  name,
  label,
  placeholder,
  error = false,
  helperText,
  fullWidth = true,
  disabled = false,
  onBlur,
  size = "medium",
  sx,
}: CustomDateRangePickerProps) => {
  const { t } = useTranslation();
  const [anchorEl, setAnchorEl] = useState<HTMLElement | null>(null);
  const [selectedPreset, setSelectedPreset] = useState<string | null>(null);

  const handleOpen = (event: React.MouseEvent<HTMLElement>) => {
    if (!disabled) {
      setAnchorEl(event.currentTarget);
    }
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const formatDateRange = () => {
    if (startDate && endDate) {
      const start = startDate.format("MMM DD, YYYY");
      const end = endDate.format("MMM DD, YYYY");
      return `${start}  →  ${end}`;
    }
    return "";
  };

  return (
    <>
      <TextField
        id={id}
        name={name}
        label={label}
        fullWidth={fullWidth}
        size={size}
        value={formatDateRange()}
        onClick={handleOpen}
        placeholder={placeholder || t("placeholder.select_date_range")}
        disabled={disabled}
        onBlur={onBlur}
        InputProps={{
          readOnly: true,
          endAdornment: (
            <IconCalendar size={20} style={{ cursor: disabled ? "default" : "pointer" }} />
          ),
        }}
        error={error}
        helperText={helperText}
        sx={{
          cursor: disabled ? "default" : "pointer",
          "& .MuiInputBase-root": {
            cursor: disabled ? "default" : "pointer",
          },
          "& .MuiInputBase-input": {
            cursor: disabled ? "default" : "pointer",
          },
          "& .MuiInputAdornment-root": {
            cursor: disabled ? "default" : "pointer",
          },
          "& svg": {
            cursor: disabled ? "default" : "pointer",
          },
          ...sx,
        }}
      />
      <DateRangePicker
        startDate={startDate}
        endDate={endDate}
        onStartDateChange={onStartDateChange}
        onEndDateChange={onEndDateChange}
        open={Boolean(anchorEl)}
        onClose={handleClose}
        anchorEl={anchorEl}
        selectedPreset={selectedPreset}
        onPresetSelect={setSelectedPreset}
      />
    </>
  );
};
