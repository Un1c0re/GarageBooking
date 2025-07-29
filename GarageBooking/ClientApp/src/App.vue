<template>
  <main>
    <router-view />
  </main>
</template>
<script lang="ts" setup>
import { createEventsServicePlugin } from "@schedule-x/events-service";
import { provide } from "vue";

import { useEventEditor } from "@/components/EventEditor/composables/useEventEditor";
import { useDrawer } from "@/composables/useDrawer.js";

const drawer = useDrawer();
const eventService = createEventsServicePlugin();
const eventEditor = useEventEditor(eventService);

provide("drawer", drawer);
provide("eventService", eventService);
provide("eventEditor", eventEditor);
</script>
