import dayjs from "dayjs";
import { ref } from "vue";

import GarageEvent from "@/models/GarageEvent";
import { Time } from "@/models/Time";
import GarageEventService from "@/services/GarageEventService";

export const useCalendarEvents = () => {
  const events = ref<GarageEvent[]>([]);

  const setEvents = (value: GarageEvent[]) => {
    events.value = value.map((e) => new GarageEvent(e));
  };

  const loadRange = async (startDate: Date, endDate: Date) => {
    const loaded = await GarageEventService.GetEvents(startDate, endDate);
    setEvents(loaded);
    return events.value;
  };

  const getEventById = (id: number) => {
    const found = events.value.find((x) => x.id === id);
    return found ? new GarageEvent(found) : undefined;
  };

  const addEvent = (value: GarageEvent) => {
    events.value.push(new GarageEvent(value));
  };

  const updateEvent = (value: GarageEvent) => {
    const index = events.value.findIndex((x) => x.id === value.id);
    if (index >= 0) events.value[index] = new GarageEvent(value);
  };

  const removeEvent = (eventId: number) => {
    const index = events.value.findIndex((x) => x.id === eventId);
    if (index >= 0) events.value.splice(index, 1);
  };

  const getEventsBySameDate = (targetDate: Date | dayjs.Dayjs) => {
    const target = dayjs(targetDate);
    return events.value.filter((event) => dayjs(event.date).isSame(target, "day")).map((e) => new GarageEvent(e));
  };

  const getTimesByDay = (targetDate: Date | dayjs.Dayjs): Array<Array<Time>> => {
    const eventsWithSameDate = getEventsBySameDate(targetDate);
    if (!eventsWithSameDate) return [];

    const result: Array<Array<Time>> = [];
    eventsWithSameDate.forEach((e) => {
      if (!e.startTime || !e.endTime) return;
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

  return {
    events,
    loadRange,
    setEvents,
    getEventById,
    addEvent,
    updateEvent,
    removeEvent,
    getTimesByDay,
  };
};

export type UseCalendarEventsType = ReturnType<typeof useCalendarEvents>;
