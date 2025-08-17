<template>
  <el-menu default-active="/calendar" :collapse="true" router>
    <el-menu-item index="/calendar">
      <el-icon>
        <Calendar />
      </el-icon>
      <template #title>Расписание</template>
    </el-menu-item>
    <el-menu-item index="/requests">
      <el-badge :value="7">
        <el-icon>
          <MessageBox />
        </el-icon>
      </el-badge>
      <template #title>Заявки</template>
    </el-menu-item>
  </el-menu>
</template>

<script setup lang="ts">
import { Calendar, MessageBox } from "@element-plus/icons-vue";
</script>
