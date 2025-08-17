import { ref } from "vue";

export const useDrawer = () => {
  const visible = ref(false);

  const setDrawerVisible = (value: boolean) => {
    visible.value = value;
  };

  return {
    visible,
    setDrawerVisible,
  };
};

export type UseDrawerType = ReturnType<typeof useDrawer>;
