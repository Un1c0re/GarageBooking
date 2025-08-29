<template>
  <el-date-picker
    v-model="requestFilters.dateRange.value"
    type="daterange"
    format="DD.MM.YYYY"
    range-separator="По"
    start-placeholder="Начало"
    end-placeholder="Окончание"
    class="max-w-60"
    :shortcuts="shortcuts"
  />
</template>

<script setup lang="ts">
import dayjs from "dayjs";
import { inject } from "vue";

import { UseDateShortcutsType } from "@/composables/useDateShortcuts";
import { UseFiltersType } from "@/modules/RequestCabinet/composables/useFilters";

const requestFilters = inject("useFilters") as UseFiltersType;
const dateShortcuts = inject("dateShortcuts") as UseDateShortcutsType;

const datePeriodToString = (dates: Date[]) => {
  return dates.map((x) => dayjs(x).format("DD MMM")).join(" - ");
};

const shortcuts = [
  {
    text: function () {
      return `Сегодня (${datePeriodToString(this.value())})`;
    },
    value: () => {
      return [
        dateShortcuts.startOfCurrentDay.value.toDate(),
        dayjs(dateShortcuts.startOfCurrentDay.value).endOf("day").toDate(),
      ];
    },
  },
  {
    text: function () {
      return `Неделя (${datePeriodToString(this.value())})`;
    },
    value: () => {
      return [
        dateShortcuts.startOfCurrentWeek.value.toDate(),
        dateShortcuts.startOfCurrentWeek.value.add(6, "days").toDate(),
      ];
    },
  },
  {
    text: function () {
      return `Месяц (${datePeriodToString(this.value())})`;
    },
    value: () => {
      return [dateShortcuts.startOfCurrentMonth.value.toDate(), dateShortcuts.endOfCurrentMonth.value.toDate()];
    },
  },
  {
    text: function () {
      return `Полгода (${datePeriodToString(this.value())})`;
    },
    value: () => {
      return [dateShortcuts.halfYearStart.value.toDate(), dateShortcuts.halfYearEnd.value.toDate()];
    },
  },
  {
    text: function () {
      return `Год (${datePeriodToString(this.value())})`;
    },
    value: () => {
      return [
        dateShortcuts.startOfYear.value.toDate(),
        dateShortcuts.startOfYear.value.add(11, "months").add(30, "days").toDate(),
      ];
    },
  },
].map((x) => {
  return {
    text: x.text(),
    value: x.value,
  };
});
</script>

<style>
.el-picker-panel__sidebar {
  width: 240px !important;
  display: flex;
  flex-direction: column;
  align-items: center;
}

.el-date-range-picker.has-sidebar {
  width: 900px !important;
}

.el-picker-panel [slot="sidebar"] + .el-picker-panel__body,
.el-picker-panel__sidebar + .el-picker-panel__body {
  margin-left: 240px !important;
}
</style>
