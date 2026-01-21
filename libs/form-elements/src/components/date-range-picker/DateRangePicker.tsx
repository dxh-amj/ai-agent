"use client";

import { useMemo } from "react";
import { useTranslation } from "react-i18next";

import {
  Box,
  Button,
  List,
  ListItemButton,
  ListItemText,
  Paper,
  Popover,
  Stack,
  Typography,
} from "@mui/material";
import { DateCalendar, LocalizationProvider } from "@mui/x-date-pickers";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { IconChevronLeft, IconChevronRight } from "@tabler/icons-react";

import { getDefaultPresets } from "./constants";
import { useDateRangePickerLogic } from "./hooks";

import type { DateRangePickerProps } from "./types";

export const DateRangePicker = ({
  startDate,
  endDate,
  onStartDateChange,
  onEndDateChange,
  onApply,
  onCancel,
  open = false,
  onClose,
  anchorEl,
  presets,
  showPresets = true,
  selectedPreset = null,
  onPresetSelect,
}: DateRangePickerProps) => {
  const { t } = useTranslation();
  const defaultPresets = useMemo(() => getDefaultPresets(t), [t]);
  const presetsToUse = presets || defaultPresets;
  const {
    currentMonth,
    showCalendar,
    selectedPreset: computedSelectedPreset,
    handlePresetClick,
    handleDateClick,
    handleApply,
    handleCancel,
    formatDateRange,
    handlePreviousMonth,
    handleNextMonth,
  } = useDateRangePickerLogic({
    startDate,
    endDate,
    onStartDateChange,
    onEndDateChange,
    onApply,
    onCancel,
    onClose,
    open,
    selectedPreset,
    onPresetSelect,
  });

  return (
    <Popover
      open={open}
      anchorEl={anchorEl}
      onClose={onClose}
      anchorOrigin={{
        vertical: "bottom",
        horizontal: "left",
      }}
      transformOrigin={{
        vertical: "top",
        horizontal: "left",
      }}
      slotProps={{
        paper: {
          sx: {
            width: showCalendar ? "auto" : anchorEl?.offsetWidth || "auto",
          },
        },
      }}
      sx={{
        "& .MuiPaper-root": {
          "& button": {
            cursor: "pointer !important",
          },
          "& .MuiPickersDay-root": {
            cursor: "pointer !important",
          },
          "& .MuiListItemButton-root": {
            cursor: "pointer !important",
          },
          "& svg": {
            cursor: "pointer !important",
          },
        },
      }}
    >
      <Paper
        sx={{
          display: "flex",
          flexDirection: { xs: "column", md: "row" },
          minWidth: { xs: "100%", md: showCalendar ? 700 : 200 },
          maxWidth: { xs: "100vw", md: "none" },
          gap: 0,
        }}
      >
        {showPresets && (
          <Box
            sx={{
              width: { xs: "100%", md: showCalendar ? 200 : "100%" },
              borderBottom: { xs: showCalendar ? 1 : 0, md: 0 },
              borderColor: "divider",
              bgcolor: "grey.50",
              flexShrink: 0,
            }}
          >
            <List component="nav" sx={{ p: 0 }}>
              {presetsToUse.map((preset) => (
                <ListItemButton
                  key={preset.label}
                  selected={computedSelectedPreset === preset.label}
                  onClick={() => handlePresetClick(preset)}
                  sx={{
                    cursor: "pointer",
                    "&.Mui-selected": {
                      bgcolor: "primary.main",
                      color: "white",
                      "&:hover": {
                        bgcolor: "primary.dark",
                      },
                    },
                  }}
                >
                  <ListItemText primary={preset.label} />
                </ListItemButton>
              ))}
            </List>
          </Box>
        )}

        {showCalendar && (
          <Box sx={{ p: 2, bgcolor: "grey.50" }}>
            <Stack direction={{ xs: "column", md: "row" }} spacing={2}>
              <LocalizationProvider dateAdapter={AdapterDayjs}>
                <Box>
                  <Stack direction="row" alignItems="center" justifyContent="space-between" mb={1}>
                    <Button
                      size="small"
                      onClick={handlePreviousMonth}
                      sx={{
                        cursor: "pointer !important",
                        minWidth: "auto",
                        "& svg": { cursor: "pointer !important" },
                      }}
                    >
                      <IconChevronLeft size={20} style={{ cursor: "pointer" }} />
                    </Button>
                    <Typography variant="subtitle1" fontWeight={600}>
                      {currentMonth.format("MMM YYYY")}
                    </Typography>
                    <Box sx={{ width: 32 }} />
                  </Stack>
                  <DateCalendar
                    value={startDate}
                    onChange={handleDateClick}
                    referenceDate={currentMonth}
                    sx={{
                      "& .MuiPickersDay-root": {
                        borderRadius: 1,
                        cursor: "pointer",
                      },
                    }}
                  />
                </Box>

                <Box>
                  <Stack direction="row" alignItems="center" justifyContent="space-between" mb={1}>
                    <Box sx={{ width: 32 }} />
                    <Typography variant="subtitle1" fontWeight={600}>
                      {currentMonth.add(1, "month").format("MMM YYYY")}
                    </Typography>
                    <Button
                      size="small"
                      onClick={handleNextMonth}
                      sx={{
                        cursor: "pointer !important",
                        minWidth: "auto",
                        "& svg": { cursor: "pointer !important" },
                      }}
                    >
                      <IconChevronRight size={20} style={{ cursor: "pointer" }} />
                    </Button>
                  </Stack>
                  <DateCalendar
                    value={endDate}
                    onChange={handleDateClick}
                    referenceDate={currentMonth.add(1, "month")}
                    sx={{
                      "& .MuiPickersDay-root": {
                        borderRadius: 1,
                        cursor: "pointer",
                      },
                    }}
                  />
                </Box>
              </LocalizationProvider>
            </Stack>

            <Stack
              direction="row"
              justifyContent="space-between"
              alignItems="center"
              sx={{ mt: 2, pt: 2, borderTop: 1, borderColor: "divider" }}
            >
              <Typography variant="body2" color="text.secondary">
                {formatDateRange()}
              </Typography>
              <Stack direction="row" spacing={1}>
                <Button
                  variant="outlined"
                  onClick={handleCancel}
                  sx={{ cursor: "pointer !important" }}
                >
                  {t("button.cancel")}
                </Button>
                <Button
                  variant="contained"
                  onClick={handleApply}
                  disabled={!startDate || !endDate}
                  sx={{
                    cursor:
                      !startDate || !endDate ? "not-allowed !important" : "pointer !important",
                    "&.Mui-disabled": {
                      cursor: "not-allowed !important",
                    },
                  }}
                >
                  {t("button.apply")}
                </Button>
              </Stack>
            </Stack>
          </Box>
        )}
      </Paper>
    </Popover>
  );
};
