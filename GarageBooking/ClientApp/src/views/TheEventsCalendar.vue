<template>
  <div class="flex flex-col items-center">
    <ScheduleXCalendar :calendar-app="calendarApp" class="h-[90vh] w-[90vw]" />
  </div>
</template>

<script lang="ts" setup>
import "@schedule-x/theme-default/dist/calendar.css";

import { createCalendar, createViewWeek } from "@schedule-x/calendar";
import { createEventsServicePlugin } from "@schedule-x/events-service";
import { ScheduleXCalendar } from "@schedule-x/vue";
import dayjs from "dayjs";
import { computed, inject, shallowRef } from "vue";

import { UseDrawerType } from "@/composables/useDrawer";
import { EventType } from "@/enums/EventType";
import GarageEvent from "@/models/GarageEvent";
import { useEventStore } from "@/store/EventStore";

const drawer = inject("drawer") as UseDrawerType;
const eventsServicePlugin = inject("eventService") as ReturnType<typeof createEventsServicePlugin>;

const eventStore = useEventStore();

const eventList = computed(() => eventStore.events);

const calendarApp = shallowRef(
  createCalendar({
    locale: "ru-RU",
    views: [createViewWeek()],
    selectedDate: dayjs(Date.now()).format("YYYY-MM-DD"),
    plugins: [eventsServicePlugin],

    dayBoundaries: {
      start: "06:00",
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
      start: dayjs(e.startDate).format("YYYY-MM-DD HH:mm"),
      end: dayjs(e.endDate).format("YYYY-MM-DD HH:mm"),
    })),
  }),
);

const handleCreateEvent = (dateTime: string) => {
  const newEvent = new GarageEvent({
    eventType: EventType.Booking,
    date: dayjs(dateTime).startOf("day").toDate(),
  });
  drawer.setEvent(newEvent);
  drawer.setDrawerVisible(true);
};

const handleEditEvent = (eventId: number) => {
  const eventToEdit = eventStore.getEventById(Number(eventId));
  if (eventToEdit == undefined) return;
  drawer.setEvent(eventToEdit);
  drawer.setDrawerVisible(true);
};
</script>

<style>
.sx__week-grid {
  --sx-week-grid-height: 720px;
}

.sx__week-grid__hour {
  --sx-week-grid-hour-height: 40px;
}
</style>
