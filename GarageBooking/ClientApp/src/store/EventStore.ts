import dayjs from "dayjs";
import _ from "lodash";
import { defineStore } from "pinia";
import { ref } from "vue";

import GarageEvent from "@/models/GarageEvent";

export const useEventStore = defineStore("EventStore", () => {
  const events = ref<GarageEvent[]>([]);

  function $reset() {
    events.value = [];
  }

  const getEventById = (id: number) => {
    return events.value.find((x) => x.id == id);
  };

  const getEventsBySameDate = (targetDate: Date | dayjs.Dayjs) => {
    const targetDateDayjs = dayjs(targetDate);

    return events.value.filter((event: GarageEvent) =>
      dayjs(event.date).isSame(targetDateDayjs, "day"),
    );
  };

  const getMaxTimeByDay = (targetDate: Date | dayjs.Dayjs) => {
    const events = getEventsBySameDate(targetDate);
    const eventWithMaxStartDate = _.maxBy(events, (e) => e.endDate);

    if (eventWithMaxStartDate) {
      return dayjs(eventWithMaxStartDate.endDate).format("HH:mm:");
    }

    return null;
  };

  const setEvents = (value: GarageEvent[]) => {
    events.value = value;
  };

  const addEvent = (value: GarageEvent) => {
    events.value.push(value);
  };

  const updateEvent = (value: GarageEvent) => {
    const index = events.value.findIndex((garageEvent) => garageEvent.id === value.id);
    if (index > -1) {
      events.value[index] = value;
    }
  };

  const deleteEvent = (eventId: number) => {
    events.value.splice(eventId, 1);
  };

  return {
    $reset,
    events,
    getEventById,
    getMaxTimeByDay,
    setEvents,
    addEvent,
    updateEvent,
    deleteEvent,
  };
});
