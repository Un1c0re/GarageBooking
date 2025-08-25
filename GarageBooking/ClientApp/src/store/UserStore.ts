import { defineStore } from "pinia";
import { computed, ref } from "vue";

import User from "@/models/User";

export const useUserStore = defineStore("UserStore", () => {
  const user = ref<User>();
  const isAuthenticated = computed(() => !!user.value);

  function $reset() {
    user.value = undefined;
  }

  const GetUser = () => {
    return new User(user.value!);
  };

  const SetUser = (newUser: User) => {
    user.value = newUser;
  };

  return {
    isAuthenticated,
    $reset,
    GetUser,
    SetUser,
  };
});
