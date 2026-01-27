import dayjs from "dayjs";

import type { DateRangePreset } from "./types";

const DAYS_IN_WEEK = 7;
const DAYS_IN_MONTH = 30;
const LAST_7_DAYS_OFFSET = DAYS_IN_WEEK - 1; // 6 days back from today
const LAST_30_DAYS_OFFSET = DAYS_IN_MONTH - 1; // 29 days back from today

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
      startDate: dayjs().subtract(LAST_7_DAYS_OFFSET, "day").startOf("day"),
      endDate: dayjs().endOf("day"),
    }),
  },
  {
    label: t("date_range.last_30_days"),
    getValue: () => ({
      startDate: dayjs().subtract(LAST_30_DAYS_OFFSET, "day").startOf("day"),
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
