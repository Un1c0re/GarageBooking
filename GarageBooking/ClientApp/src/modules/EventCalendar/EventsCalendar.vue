<template>
  <ScheduleXCalendar :calendar-app="calendarApp">
    <template #timeGridEvent="{ calendarEvent }">
      <div :style="getCellStyle(calendarEvent.status)" class="flex flex-col items-start px-1">
        <p class="font-bold">{{ calendarEvent.title }}</p>
        <span>
          <el-icon>
            <Clock />
          </el-icon>
          {{ dayjs(calendarEvent.start).format("HH:mm") }} - {{ dayjs(calendarEvent.end).format("HH:mm") }}
        </span>
        <span>
          <el-icon><User /></el-icon> {{ calendarEvent.author }}
        </span>
        <span>
          {{ getStatusName(calendarEvent.status) }}
        </span>
      </div>
    </template>
  </ScheduleXCalendar>
</template>

<script lang="ts" setup>
import "@schedule-x/theme-default/dist/calendar.css";

import { Clock, User } from "@element-plus/icons-vue";
import { createCalendar, createViewWeek } from "@schedule-x/calendar";
import { createEventsServicePlugin } from "@schedule-x/events-service";
import { ScheduleXCalendar } from "@schedule-x/vue";
import dayjs from "dayjs";
import { computed, inject, shallowRef } from "vue";

import { getCellStyle, getStatusName } from "@/CalendarItemColorByStatus";
import GarageEvent from "@/models/GarageEvent";
import { UseDrawerType } from "@/modules/EventCalendar/composables/useDrawer";
import { UseEventEditorType } from "@/modules/EventCalendar/composables/useEventEditor";
import { useEventStore } from "@/store/EventStore";
import { useUserStore } from "@/store/UserStore";
import { EventStatus } from "@/enums/EventStatus";

const drawer = inject("drawer") as UseDrawerType;
const eventsServicePlugin = inject("eventService") as ReturnType<typeof createEventsServicePlugin>;
const eventEditor = inject("eventEditor") as UseEventEditorType;

const eventStore = useEventStore();
const userStore = useUserStore();

const eventList = computed(() => eventStore.garageEvents.filter((x) => x.status != EventStatus.Denied));

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
      author: e.user.fullName,
      start: dayjs(e.startDate).format("YYYY-MM-DD HH:mm"),
      end: dayjs(e.endDate).format("YYYY-MM-DD HH:mm"),
      status: e.status,
    })),
  }),
);

const handleCreateEvent = (dateTime: string) => {
  if (dayjs(dateTime).isBefore(dayjs())) {
    return;
  }

  const newEvent = new GarageEvent({
    date: dayjs(dateTime).startOf("day").toDate(),
    user: userStore.GetUser(),
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
