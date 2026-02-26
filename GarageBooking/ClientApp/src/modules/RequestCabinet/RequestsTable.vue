<template>
  <el-table-v2
    class="overflow-hidden rounded-t-md"
    v-loading="isLoading"
    element-loading-text="Загрузка данных"
    :columns="tableData.columns.value"
    :data="data"
    :width="props.tableWidth"
    :height="props.tableHeight"
  />
</template>

<script setup lang="ts">
import { computed, ref, watch } from "vue";

import { useTableData } from "@/modules/RequestCabinet/composables/useTableData";
import { useEventStore } from "@/store/EventStore";

const props = defineProps<{
  tableWidth: number;
  tableHeight: number;
}>();

const tableData = useTableData();
const eventStore = useEventStore();

const isLoading = ref(false);

const data = computed(() =>
  eventStore.garageEvents.map((e) => ({
    ...e,
    userFullName: e.user.fullName,
    eventTimeRange: [e.startTime, e.endTime],
  })),
);

watch(
  () => props.tableWidth,
  (newWidth) => {
    if (newWidth > 0) {
      tableData.setWeightedColumnWidths(newWidth);
    }
  },
  { immediate: true },
);
</script>
