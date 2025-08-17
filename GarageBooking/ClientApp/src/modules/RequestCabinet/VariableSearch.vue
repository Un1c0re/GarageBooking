<template>
  <el-input
    v-model="requestFilters.searchPattern.value"
    :prefix-icon="Search"
    placeholder="Поиск по названию или автору"
  />
</template>

<script setup lang="ts">
import { Search } from "@element-plus/icons-vue";
import { inject } from "vue";

import { UseFiltersType } from "@/modules/RequestCabinet/composables/useFilters";

const requestFilters = inject("useFilters") as UseFiltersType;
</script>
