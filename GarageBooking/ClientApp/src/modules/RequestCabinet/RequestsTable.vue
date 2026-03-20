<template>
  <el-table-v2
    class="overflow-hidden rounded-t-md"
    v-loading="isLoading"
    element-loading-text="Загрузка данных"
    :columns="tableSetup.columns.value"
    :data="props.tableData"
    :width="props.tableWidth"
    :height="props.tableHeight"
  />
</template>

<script setup lang="ts">
import { ref, watch } from "vue";

import { useTableSetup } from "@/modules/RequestCabinet/composables/useTableSetup";

const props = defineProps<{
  tableWidth: number;
  tableHeight: number;
  tableData: Array<any>;
}>();

const tableSetup = useTableSetup();
const isLoading = ref(false);

watch(
  () => props.tableWidth,
  (newWidth) => {
    if (newWidth > 0) {
      tableSetup.setWeightedColumnWidths(newWidth);
    }
  },
  { immediate: true },
);
</script>
