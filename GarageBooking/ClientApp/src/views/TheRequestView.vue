<template>
  <div class="flex flex-col items-stretch gap-2">
    <div class="grid grid-cols-[repeat(3,_min-content)] gap-2">
      <DateRangePicker class="min-w-80" />
      <StatusesSelect :select-class="'w-44'" />
      <VariableSearch class="min-w-80" />
    </div>

    <RequestTable class="col-span-3 self-center" />
  </div>
</template>

<script setup lang="ts">
import { provide } from "vue";

import { useFilters } from "@/modules/RequestCabinet/composables/useFilters";
import DateRangePicker from "@/modules/RequestCabinet/DateRangePicker.vue";
import RequestTable from "@/modules/RequestCabinet/RequestsTable.vue";
import StatusesSelect from "@/modules/RequestCabinet/StatusesSelect.vue";
import VariableSearch from "@/modules/RequestCabinet/VariableSearch.vue";

provide("useFilters", useFilters());
</script>
