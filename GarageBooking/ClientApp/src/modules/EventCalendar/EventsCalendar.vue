<template>
  <ScheduleXCalendar :calendar-app="calendarApp" />
</template>

<script lang="ts" setup>
import "@schedule-x/theme-default/dist/calendar.css";

import { createCalendar, createViewWeek } from "@schedule-x/calendar";
import { createEventsServicePlugin } from "@schedule-x/events-service";
import { ScheduleXCalendar } from "@schedule-x/vue";
import dayjs from "dayjs";
import { computed, inject, shallowRef } from "vue";

import GarageEvent from "@/models/GarageEvent";
import { UseDrawerType } from "@/modules/EventCalendar/composables/useDrawer";
import { UseEventEditorType } from "@/modules/EventCalendar/composables/useEventEditor";
import { useEventStore } from "@/store/EventStore";

const drawer = inject("drawer") as UseDrawerType;
const eventsServicePlugin = inject("eventService") as ReturnType<typeof createEventsServicePlugin>;
const eventEditor = inject("eventEditor") as UseEventEditorType;

const eventStore = useEventStore();

const eventList = computed(() => eventStore.events);

const calendarApp = shallowRef(
  createCalendar({
    locale: "ru-RU",
    views: [createViewWeek()],
    selectedDate: dayjs(Date.now()).format("YYYY-MM-DD"),
    plugins: [eventsServicePlugin],

    dayBoundaries: {
      start: "08:00",
      end: "24:00",
    },

    callbacks: {
      onEventUpdate(updatedEvent) {
        console.log("onEventUpdate", updatedEvent);
      },

      onBeforeEventUpdate(oldEvent, newEvent, $app) {
        return true;
      },

      onEventClick(event) {
        handleEditEvent(Number(event.id));
      },

      onClickDateTime(dateTime, e?: UIEvent) {
        handleCreateEvent(dateTime);
      },
    },

    events: eventList.value.map((e) => ({
      id: e.id,
      title: e.title,
      people: ["тест тестович"],
      start: dayjs(e.startDate).format("YYYY-MM-DD HH:mm"),
      end: dayjs(e.endDate).format("YYYY-MM-DD HH:mm"),
    })),
  }),
);

const handleCreateEvent = (dateTime: string) => {
  const newEvent = new GarageEvent({
    date: dayjs(dateTime).startOf("day").toDate(),
  });
  eventEditor.setEvent(newEvent);
  drawer.setDrawerVisible(true);
};

const handleEditEvent = (eventId: number) => {
  const eventToEdit = eventStore.getEventById(Number(eventId));
  if (eventToEdit == undefined) return;

  eventEditor.setEvent(eventToEdit);
  drawer.setDrawerVisible(true);
};
</script>

<style>
.sx__week-grid {
  --sx-week-grid-height: 640px;
}

.sx__week-grid__hour {
  --sx-week-grid-hour-height: 40px;
}
</style>
