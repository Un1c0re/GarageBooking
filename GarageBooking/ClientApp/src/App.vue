<template>
  <main>
    <router-view />
  </main>
</template>
<script lang="ts" setup>
import { createEventsServicePlugin } from "@schedule-x/events-service";
import { provide } from "vue";

import { useDrawer } from "@/composables/useDrawer.js";

provide("drawer", useDrawer());
provide("eventService", createEventsServicePlugin());
</script>
