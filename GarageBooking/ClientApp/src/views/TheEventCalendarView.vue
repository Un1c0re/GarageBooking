<template>
  <div>
    <TheEventsCalendar />
    <EventEditor />
  </div>
</template>

<script setup lang="ts">
import { inject, onMounted } from "vue";

import { UseDateShortcutsType } from "@/composables/useDateShortcuts";
import EventEditor from "@/modules/EventCalendar/EventEditor.vue";
import TheEventsCalendar from "@/modules/EventCalendar/EventsCalendar.vue";
import GarageEventService from "@/services/GarageEventService";
import { useEventStore } from "@/store/EventStore";

const eventStore = useEventStore();
const dateShortcuts = inject("dateShortcuts") as UseDateShortcutsType;

onMounted(async () => {
  const startWeek = dateShortcuts.startOfCurrentWeek.value.toDate();
  const endWeek = dateShortcuts.startOfCurrentWeek.value.add(6, "days").toDate();
  eventStore.events = await GarageEventService.GetEventsByPeriod(startWeek, endWeek);
});
</script>
