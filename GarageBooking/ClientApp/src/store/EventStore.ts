import dayjs from "dayjs";
import { defineStore } from "pinia";
import { computed, ref } from "vue";

import GarageEvent from "@/models/GarageEvent";
import { Time } from "@/models/Time";

export const useEventStore = defineStore("EventStore", () => {
  const events = ref<GarageEvent[]>([]);

  function $reset() {
    events.value = [];
  }

  const constructedEvents = computed(() => {
    return events.value.map((e) => new GarageEvent(e));
  });

  const getEventById = (id: number) => {
    const eventById = events.value.find((x) => x.id == id);
    if (eventById != undefined) {
      return new GarageEvent(eventById);
    }
  };

  const getEventsBySameDate = (targetDate: Date | dayjs.Dayjs) => {
    const targetDateDayjs = dayjs(targetDate);

    return constructedEvents.value.filter((event: GarageEvent) =>
      dayjs(event.date).isSame(targetDateDayjs, "day"),
    );
  };

  const getTimesByDay = (targetDate: Date | dayjs.Dayjs): Array<Array<Time>> => {
    const eventsWithSameDate = getEventsBySameDate(targetDate);
    if (eventsWithSameDate == undefined) return [];

    let result: Array<Array<Time>> = [];
    eventsWithSameDate.map((e) => {
      if (!e.startTime || !e.endTime) return null;
      result.push([
        {
          hour: e.startTime.split(":")[0],
          minutes: e.startTime.split(":")[1],
        } as Time,
        {
          hour: e.endTime.split(":")[0],
          minutes: e.endTime.split(":")[1],
        } as Time,
      ]);
    });
    return result;
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
    const index = events.value.findIndex((e) => e.id == eventId);
    if (index < 0) return;

    events.value.splice(index, 1);
  };

  return {
    $reset,
    events,
    getEventById,
    getTimesByDay,
    setEvents,
    addEvent,
    updateEvent,
    deleteEvent,
  };
});
