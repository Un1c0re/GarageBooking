import _ from "lodash";
import { reactive, ref } from "vue";

import { ISelectOption } from "@/models/SelectOption";

export const useFilters = () => {
  const searchPattern = ref<string>("");
  const dateRange = ref<string[]>([]);
  const statuses = ref<ISelectOption[]>([]);

  const statusesOptions = reactive([
    {
      label: "Ждут подтверждения",
      value: 1,
      selected: false,
    },
    {
      label: "Ждут оплаты",
      value: 2,
      selected: false,
    },
    {
      label: "Подтвержденные",
      value: 3,
      selected: false,
    },
    {
      label: "Отклоненные",
      value: 4,
      selected: false,
    },
    {
      label: "Завершенные",
      value: 5,
      selected: false,
    },
  ]);

  const setAllStatuses = (val: boolean) => {
    statuses.value = val ? _.cloneDeep(statusesOptions) : [];
  };

  const setStatus = (val: boolean, option: ISelectOption) => {
    if (val) {
      statuses.value.push(option);
    } else {
      const index = statuses.value.findIndex((x) => x.value === option.value);
      if (index > -1) {
        statuses.value.splice(index, 1);
      }
    }
  };

  return {
    searchPattern,
    dateRange,
    statuses,
    statusesOptions,
    setAllStatuses,
    setStatus,
  };
};

export type UseFiltersType = ReturnType<typeof useFilters>;
