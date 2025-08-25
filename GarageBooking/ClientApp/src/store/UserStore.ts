import { defineStore } from "pinia";
import { computed, ref } from "vue";

import User from "@/models/User";

export const useUserStore = defineStore("UserStore", () => {
  const user = ref<User | null>(null);

  const isAuthenticated = computed(() => !!user.value);

  function $reset() {
    user.value = null;
  }

  const SetUser = (newUser: User | null) => {
    user.value = newUser;
  };

  return {
    user,
    isAuthenticated,
    $reset,
    SetUser,
  };
});
