<template>
  <div>
    <el-button
      ref="buttonRef"
      :class="props.selectClass"
      class="grid grid-cols-[min-content_120px] items-center justify-start"
      style="font-weight: normal; color: #a8abb2"
    >
      <el-icon>
        <Filter />
      </el-icon>
      <span v-if="requestFilters.statuses.value.length == 0"> Статус заявки </span>
      <el-tag v-else type="primary" style="font-weight: normal">{{ tagDisplayName }}</el-tag>
    </el-button>
    <el-popover
      ref="popoverRef"
      :virtual-ref="buttonRef"
      trigger="click"
      virtual-triggering
      width="240"
    >
      <div class="flex flex-col gap-2">
        <el-checkbox v-model="allTypesSelected">Выбрать все</el-checkbox>
        <el-divider style="margin: 0" />
        <el-checkbox
          v-for="status in requestFilters.statusesOptions"
          :key="status.value"
          v-model="status.selected"
          @change="(val) => handleSetStatus(val, status)"
          >{{ status.label }}
        </el-checkbox>
      </div>
    </el-popover>
  </div>
</template>

<script setup lang="ts">
import { Filter } from "@element-plus/icons-vue";
import { CheckboxValueType } from "element-plus";
import { computed, inject, ref } from "vue";

import { ISelectOption } from "@/models/SelectOption";
import { UseFiltersType } from "@/modules/RequestCabinet/composables/useFilters";

const requestFilters = inject("useFilters") as UseFiltersType;

const props = defineProps<{
  selectClass: string;
}>();

const buttonRef = ref();
const popoverRef = ref();

const tagDisplayName = computed(() => {
  if (requestFilters.statuses.value.length == 1) {
    return requestFilters.statuses.value[0].label;
  } else {
    return `Выбрано ${requestFilters.statuses.value.length}`;
  }
});

const allTypesSelected = computed({
  get: () => requestFilters.statuses.value.length == requestFilters.statusesOptions.length,
  set: (val) => handleAllStatuses(val),
});

const handleAllStatuses = (val: CheckboxValueType) => {
  for (const status of requestFilters.statusesOptions) {
    status.selected = val as boolean;
  }
  requestFilters.setAllStatuses(val as boolean);
};

const handleSetStatus = (val: CheckboxValueType, status: ISelectOption) => {
  requestFilters.setStatus(val as boolean, status);
};
</script>

<style scoped>
.el-checkbox {
  font-weight: normal;
}

.el-button {
  padding-left: 0.5rem;
  padding-right: 0.5rem;
  justify-content: start;
}
</style>
