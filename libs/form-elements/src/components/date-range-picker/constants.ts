import dayjs from "dayjs";

import type { DateRangePreset } from "./types";

export const getDefaultPresets = (t: (key: string) => string): DateRangePreset[] => [
  {
    label: t("date_range.today"),
    getValue: () => ({
      startDate: dayjs().startOf("day"),
      endDate: dayjs().endOf("day"),
    }),
  },
  {
    label: t("date_range.yesterday"),
    getValue: () => ({
      startDate: dayjs().subtract(1, "day").startOf("day"),
      endDate: dayjs().subtract(1, "day").endOf("day"),
    }),
  },
  {
    label: t("date_range.last_7_days"),
    getValue: () => ({
      startDate: dayjs().subtract(6, "day").startOf("day"),
      endDate: dayjs().endOf("day"),
    }),
  },
  {
    label: t("date_range.last_30_days"),
    getValue: () => ({
      startDate: dayjs().subtract(29, "day").startOf("day"),
      endDate: dayjs().endOf("day"),
    }),
  },
  {
    label: t("date_range.this_month"),
    getValue: () => ({
      startDate: dayjs().startOf("month"),
      endDate: dayjs().endOf("month"),
    }),
  },
  {
    label: t("date_range.last_month"),
    getValue: () => ({
      startDate: dayjs().subtract(1, "month").startOf("month"),
      endDate: dayjs().subtract(1, "month").endOf("month"),
    }),
  },
  {
    label: t("date_range.custom_range"),
    getValue: () => ({
      startDate: null,
      endDate: null,
    }),
  },
];
