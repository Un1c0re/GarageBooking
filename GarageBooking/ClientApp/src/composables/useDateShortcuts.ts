import { useNow } from "@vueuse/core";
import dayjs from "dayjs";
import { computed } from "vue";

export const useDateShortcuts = () => {
  const now = useNow({ interval: 1000 * 60 });

  const startOfCurrentDay = computed(() => {
    return dayjs(now.value).startOf("day");
  });

  const startOfCurrentWeek = computed(() => {
    return dayjs(now.value).startOf("week");
  });

  const startOfCurrentMonth = computed(() => {
    return dayjs(now.value).startOf("month");
  });

  const endOfCurrentMonth = computed(() => {
    return dayjs(now.value).endOf("month");
  });

  const halfYearStart = computed(() => {
    return dayjs().get("month") <= 4
      ? dayjs(now.value).startOf("year")
      : dayjs().startOf("year").add(6, "month").startOf("month");
  });

  const halfYearEnd = computed(() => {
    return dayjs().get("month") <= 4
      ? dayjs(now.value).startOf("year").add(5, "months").startOf("month")
      : dayjs().endOf("year");
  });

  const startOfYear = computed(() => {
    return dayjs(now.value).startOf("year");
  });

  return {
    now,
    startOfCurrentDay,
    startOfCurrentWeek,
    startOfCurrentMonth,
    halfYearStart,
    startOfYear,
    endOfCurrentMonth,
    halfYearEnd,
  };
};

export type UseDateShortcutsType = ReturnType<typeof useDateShortcuts>;
