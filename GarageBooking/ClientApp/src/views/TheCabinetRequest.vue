<template>
  <el-tabs v-model="activeName" class="demo-tabs">
    <el-tab-pane label="Ждут ответа" name="first">
      <div class="flex flex-col items-center justify-center gap-2 p-2">
        <RequestCard />
      </div>
    </el-tab-pane>
    <el-tab-pane label="Ждут оплаты" name="second">User</el-tab-pane>
    <el-tab-pane label="Одобренные" name="third">Config</el-tab-pane>
    <el-tab-pane label="Отклоненные" name="fourth">Role</el-tab-pane>
  </el-tabs>
</template>

<script setup lang="ts">
import { ref } from "vue";

import RequestCard from "@/modules/RequestCabinet/RequestCard.vue";

const activeName = ref("first");
</script>
