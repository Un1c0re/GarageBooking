import { ref } from "vue";

import GarageEvent from "@/models/GarageEvent";

export const useDrawer = () => {
  const visible = ref(false);
  const editableEvent = ref<GarageEvent | null>(null);

  const setDrawerVisible = (value: boolean) => {
    visible.value = value;
  };

  const setEvent = (date: GarageEvent | null) => {
    editableEvent.value = date;
  };

  return {
    visible,
    event: editableEvent,
    setDrawerVisible,
    setEvent,
  };
};

export type UseDrawerType = ReturnType<typeof useDrawer>;
