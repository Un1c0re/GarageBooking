<template>
  <el-date-picker
    v-model="requestFilters.dateRange.value"
    type="daterange"
    format="DD.MM.YYYY"
    range-separator="По"
    start-placeholder="Начало"
    end-placeholder="Окончание"
    class="max-w-60"
  />
</template>

<script setup lang="ts">
import { inject } from "vue";

import { UseFiltersType } from "@/modules/RequestCabinet/composables/useFilters";

const requestFilters = inject("useFilters") as UseFiltersType;
</script>

<style scoped></style>
