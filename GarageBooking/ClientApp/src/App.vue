<template>
  <main class="flex h-[100vh]">
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
    <section class="w-full overflow-y-auto p-2">
      <router-view />
    </section>
  </main>
</template>
<script lang="ts" setup>
import { Calendar, MessageBox } from "@element-plus/icons-vue";
import { createEventsServicePlugin } from "@schedule-x/events-service";
import { provide } from "vue";

import { useDrawer } from "@/composables/useDrawer.js";
import { useEventEditor } from "@/modules/EventCalendar/composables/useEventEditor";

const drawer = useDrawer();
const eventService = createEventsServicePlugin();
const eventEditor = useEventEditor(eventService);

provide("drawer", drawer);
provide("eventService", eventService);
provide("eventEditor", eventEditor);
</script>
