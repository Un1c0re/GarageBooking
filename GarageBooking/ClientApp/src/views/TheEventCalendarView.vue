<template>
  <div>
    <TheEventsCalendar />
    <EventEditor />
  </div>
</template>

<script setup lang="ts">
import { onMounted } from "vue";

import EventEditor from "@/modules/EventCalendar/EventEditor.vue";
import TheEventsCalendar from "@/modules/EventCalendar/EventsCalendar.vue";
import GarageEventService from "@/services/GarageEventService";
import { useEventStore } from "@/store/EventStore";

const eventStore = useEventStore();

onMounted(async () => {
  eventStore.events = await GarageEventService.GetEventsByPeriod(new Date(), new Date());
});
</script>
