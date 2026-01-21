import type { Dayjs } from "dayjs";

interface DateRange {
  startDate: Dayjs | null;
  endDate: Dayjs | null;
}

interface DateRangePreset {
  label: string;
  getValue: () => DateRange;
}

interface DateRangePickerProps {
  startDate: Dayjs | null;
  endDate: Dayjs | null;
  onStartDateChange: (date: Dayjs | null) => void;
  onEndDateChange: (date: Dayjs | null) => void;
  onApply?: () => void;
  onCancel?: () => void;
  open?: boolean;
  onClose?: () => void;
  anchorEl?: HTMLElement | null;
  presets?: DateRangePreset[];
  showPresets?: boolean;
  selectedPreset?: string | null;
  onPresetSelect?: (presetLabel: string) => void;
}

interface UseDateRangePickerLogicProps {
  startDate: Dayjs | null;
  endDate: Dayjs | null;
  onStartDateChange: (date: Dayjs | null) => void;
  onEndDateChange: (date: Dayjs | null) => void;
  onApply?: () => void;
  onCancel?: () => void;
  onClose?: () => void;
  open: boolean;
  selectedPreset: string | null;
  onPresetSelect?: (presetLabel: string) => void;
}

export type { DateRange, DateRangePickerProps, DateRangePreset, UseDateRangePickerLogicProps };
