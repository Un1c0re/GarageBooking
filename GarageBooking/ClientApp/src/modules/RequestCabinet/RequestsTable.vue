<template>
  <el-table-v2
    class="overflow-hidden rounded-t-md"
    v-loading="isLoading"
    element-loading-text="Загрузка данных"
    :columns="tableData.columns.value"
    :data="[]"
    :width="props.tableWidth"
    :height="props.tableHeight"
  />
</template>

<script setup lang="ts">
import { ref, watch } from "vue";

import { useTableData } from "@/modules/RequestCabinet/composables/useTableData";

const props = defineProps<{
  tableWidth: number;
  tableHeight: number;
}>();

const tableData = useTableData();

const isLoading = ref(false);

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
