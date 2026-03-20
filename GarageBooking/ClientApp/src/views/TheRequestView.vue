<template>
  <div ref="containerRef" class="flex h-[90vh] flex-col items-stretch overflow-auto" :style="{ gap: GAP + 'px' }">
    <div ref="headerRef" class="grid h-fit grid-cols-[repeat(3,_min-content)] gap-2">
      <DateRangePicker class="min-w-80" />
      <StatusesSelect :select-class="'w-44'" />
      <VariableSearch class="min-w-80" />
    </div>

    <RequestTable
      class="col-span-3 self-center"
      :table-width="containerWidth"
      :table-height="tableHeight"
      :table-data="tableData"
    />
  </div>
</template>

<script setup lang="ts">
import { useElementSize } from "@vueuse/core";
import axios from "axios";
import dayjs from "dayjs";
import { ElNotification } from "element-plus";
import { isEmpty } from "lodash";
import { computed, onMounted, provide, ref, watch } from "vue";

import { TableData } from "@/models/TableData";
import { useTableFilters } from "@/modules/RequestCabinet/composables/useTableFilters";
import DateRangePicker from "@/modules/RequestCabinet/DateRangePicker.vue";
import RequestTable from "@/modules/RequestCabinet/RequestsTable.vue";
import StatusesSelect from "@/modules/RequestCabinet/StatusesSelect.vue";
import VariableSearch from "@/modules/RequestCabinet/VariableSearch.vue";
import GarageEventService from "@/services/GarageEventService";

const tableFilters = useTableFilters();
provide("useFilters", tableFilters);

const GAP = 8;
const PADDING = 8;

const containerRef = ref();
const headerRef = ref();

const { height: containerHeight, width: containerWidth } = useElementSize(containerRef);
const { height: headerHeight } = useElementSize(headerRef);

const tableHeight = computed(() => containerHeight.value - headerHeight.value - GAP - PADDING);

const isLoading = ref(false);
const tableData = ref<TableData[]>([]);

const loadData = async () => {
  if (isEmpty(tableFilters.dateRange.value) && tableFilters.statuses.value.length == 0) return;

  const dateRange = tableFilters.dateRange.value;
  const statuses = tableFilters.statuses.value.map((x) => x.value);

  let startDate = null;
  let endDate = null;

  if (!isEmpty(dateRange)) {
    const startDateFromRange = tableFilters.dateRange.value[0];
    const endDateFromRange = tableFilters.dateRange.value[1];

    startDate = dayjs(startDateFromRange).toDate();
    endDate = dayjs(endDateFromRange).toDate();
  }

  isLoading.value = true;
  try {
    const data = await GarageEventService.GetEvents(startDate, endDate, statuses);
    tableData.value = data.map(
      (x) =>
        ({
          id: x.id,
          status: x.status,
          title: x.title,
          userFullName: x.user.fullName,
          eventTimeRange: [x.startTime, x.endTime],
        }) as TableData,
    );
  } catch (e) {
    if (axios.isCancel(e)) {
      return;
    }
    ElNotification.error({
      title: "Ошибка получения данных",
      message: `${e}`,
      type: "error",
    });
  } finally {
    isLoading.value = false;
  }
};

watch(
  () => tableFilters.dateRange.value,
  async () => await loadData(),
);

watch(
  () => tableFilters.statuses.value,
  async () => await loadData(),
  { deep: true },
);

onMounted(async () => {
  await loadData();
});
</script>
