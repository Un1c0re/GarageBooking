<template>
  <div ref="containerRef" class="flex h-[90vh] flex-col items-stretch overflow-auto" :style="{ gap: GAP + 'px' }">
    <div ref="headerRef" class="grid h-fit grid-cols-[repeat(3,_min-content)] gap-2">
      <DateRangePicker class="min-w-80" />
      <StatusesSelect :select-class="'w-44'" />
      <VariableSearch class="min-w-80" />
    </div>

    <RequestTable class="col-span-3 self-center" :table-width="containerWidth" :table-height="tableHeight" />
  </div>
</template>

<script setup lang="ts">
import { useElementSize } from "@vueuse/core";
import { computed, provide, ref } from "vue";

import { useFilters } from "@/modules/RequestCabinet/composables/useFilters";
import DateRangePicker from "@/modules/RequestCabinet/DateRangePicker.vue";
import RequestTable from "@/modules/RequestCabinet/RequestsTable.vue";
import StatusesSelect from "@/modules/RequestCabinet/StatusesSelect.vue";
import VariableSearch from "@/modules/RequestCabinet/VariableSearch.vue";

provide("useFilters", useFilters());

const GAP = 8;
const PADDING = 8;

const containerRef = ref();
const headerRef = ref();

const { height: containerHeight, width: containerWidth } = useElementSize(containerRef);
const { height: headerHeight } = useElementSize(headerRef);

const tableHeight = computed(() => containerHeight.value - headerHeight.value - GAP - PADDING);
</script>
