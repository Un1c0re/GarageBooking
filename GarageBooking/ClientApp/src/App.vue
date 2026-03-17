<template>
  <main class="flex h-[100vh]">
    <Menu />
    <section class="w-full overflow-y-auto p-2">
      <router-view v-slot="{ Component, route }">
        <KeepAlive v-if="route.meta.keepAlive">
          <component :is="Component" />
        </KeepAlive>
        <component :is="Component" v-else />
      </router-view>
    </section>
  </main>
</template>
<script lang="ts" setup>
import { createEventsServicePlugin } from "@schedule-x/events-service";
import { KeepAlive, provide } from "vue";

import Menu from "@/components/Menu.vue";
import { useDateShortcuts } from "@/composables/useDateShortcuts";
import { useCalendarEvents } from "@/modules/EventCalendar/composables/useCalendarEvents";
import { useDrawer } from "@/modules/EventCalendar/composables/useDrawer";
import { useEventEditor } from "@/modules/EventCalendar/composables/useEventEditor";

const drawer = useDrawer();
const calendarEvents = useCalendarEvents();
const eventService = createEventsServicePlugin();
const eventEditor = useEventEditor(eventService, calendarEvents);
const dateShortcuts = useDateShortcuts();

provide("drawer", drawer);
provide("calendarEvents", calendarEvents);
provide("eventService", eventService);
provide("eventEditor", eventEditor);
provide("dateShortcuts", dateShortcuts);
</script>
