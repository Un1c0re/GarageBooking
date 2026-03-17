<template>
  <ScheduleXCalendar :calendar-app="calendarApp">
    <template #timeGridEvent="{ calendarEvent }">
      <div
        :style="calendarEvent.isExpired ? getExpiredCellStyle() : getCellStyle(calendarEvent.status)"
        class="flex h-full flex-col items-start px-1"
      >
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
          <el-icon><Opportunity /></el-icon>{{ getStatusName(calendarEvent.status) }}
        </span>
      </div>
    </template>
  </ScheduleXCalendar>
</template>

<script lang="ts" setup>
import "@schedule-x/theme-default/dist/calendar.css";

import { Clock, Opportunity, User } from "@element-plus/icons-vue";
import { createCalendar, createViewWeek } from "@schedule-x/calendar";
import { createEventsServicePlugin } from "@schedule-x/events-service";
import { ScheduleXCalendar } from "@schedule-x/vue";
import dayjs from "dayjs";
import { computed, inject, onMounted, shallowRef } from "vue";

import { getCellStyle, getExpiredCellStyle, getStatusName } from "@/CalendarItemColorByStatus";
import { UseDateShortcutsType } from "@/composables/useDateShortcuts";
import { EventStatus } from "@/enums/EventStatus";
import GarageEvent from "@/models/GarageEvent";
import { UseCalendarEventsType } from "@/modules/EventCalendar/composables/useCalendarEvents";
import { UseDrawerType } from "@/modules/EventCalendar/composables/useDrawer";
import { UseEventEditorType } from "@/modules/EventCalendar/composables/useEventEditor";
import { useUserStore } from "@/store/UserStore";

const drawer = inject("drawer") as UseDrawerType;
const dateShortcuts = inject("dateShortcuts") as UseDateShortcutsType;
const calendarEvents = inject("calendarEvents") as UseCalendarEventsType;
const eventsServicePlugin = inject("eventService") as ReturnType<typeof createEventsServicePlugin>;
const eventEditor = inject("eventEditor") as UseEventEditorType;

const userStore = useUserStore();

const eventList = computed(() => calendarEvents.events.value.filter((x) => x.status != EventStatus.Denied));

const setCalendarEvents = () => {
  calendarApp.value.events.set(
    eventList.value.map((e) => ({
      id: e.id,
      title: e.title,
      author: e.user.fullName,
      start: dayjs(e.startDate).format("YYYY-MM-DD HH:mm"),
      end: dayjs(e.endDate).format("YYYY-MM-DD HH:mm"),
      status: e.status,
      isExpired: e.isExpired,
    })),
  );
};

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

      async onRangeUpdate(range) {
        const startDate = dayjs(range.start).toDate();
        const endDate = dayjs(range.end).toDate();
        await calendarEvents.loadRange(startDate, endDate);
        setCalendarEvents();
      },
    },

    events: [],
  }),
);

onMounted(async () => {
  const startWeek = dateShortcuts.startOfCurrentWeek.value.toDate();
  const endWeek = dateShortcuts.startOfCurrentWeek.value.add(6, "days").toDate();
  await calendarEvents.loadRange(startWeek, endWeek);
  setCalendarEvents();
});

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
  const eventToEdit = calendarEvents.getEventById(eventId);
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
