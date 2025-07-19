import { defineStore } from "pinia";
import { ref } from "vue";

import GarageEvent from "@/models/GarageEvent";

export const useEventStore = defineStore("EventStore", (eventStore) => {
  const events = ref<GarageEvent[]>([]);

  function $reset() {
    events.value = [];
  }

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
    setEvents,
    addEvent,
    updateEvent,
    deleteEvent,
  };
});
