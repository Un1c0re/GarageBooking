<template>
  <main class="flex h-[100vh]">
    <Menu />
    <section class="w-full overflow-y-auto p-2">
      <router-view />
    </section>
  </main>
</template>
<script lang="ts" setup>
import { createEventsServicePlugin } from "@schedule-x/events-service";
import { provide } from "vue";

import Menu from "@/components/Menu.vue";
import { useDateShortcuts } from "@/composables/useDateShortcuts";
import { useDrawer } from "@/modules/EventCalendar/composables/useDrawer";
import { useEventEditor } from "@/modules/EventCalendar/composables/useEventEditor";

const drawer = useDrawer();
const eventService = createEventsServicePlugin();
const eventEditor = useEventEditor(eventService);
const dateShortcuts = useDateShortcuts();

provide("drawer", drawer);
provide("eventService", eventService);
provide("eventEditor", eventEditor);
provide("dateShortcuts", dateShortcuts);
</script>
