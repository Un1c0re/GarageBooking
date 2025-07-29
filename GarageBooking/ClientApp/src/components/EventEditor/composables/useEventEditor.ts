import { createEventsServicePlugin } from "@schedule-x/events-service";
import dayjs from "dayjs";
import { ElMessage, ElMessageBox, ElNotification } from "element-plus";
import { computed, ref } from "vue";

import { EventStatus } from "@/enums/EventStatus";
import { toMinutes } from "@/helpers/TimeHelpers";
import { Form } from "@/models/Form";
import GarageEvent from "@/models/GarageEvent";
import { useEventStore } from "@/store/EventStore";

export const useEventEditor = (calendar: ReturnType<typeof createEventsServicePlugin>) => {
  const eventStore = useEventStore();

  const event = ref<GarageEvent | null>(null);

  const setEvent = (newEvent: GarageEvent | null) => {
    event.value = newEvent;
  };

  const resetEvent = () => {
    setEvent(null);
  };

  const title = computed(() => {
    const date = event.value ? dayjs(event.value.date).format("DD.MM.YYYY") : null;
    return "Заявка на аренду " + date;
  });

  const disabledTimes = computed(() => {
    if (!event.value) return [];
    return eventStore.getTimesByDay(event.value!.date);
  });

  const disabledHours = () => {
    if (!disabledTimes.value) return [];

    const busyRanges = disabledTimes.value.map(([start, end]) => ({
      start: toMinutes(start),
      end: toMinutes(end),
    }));

    const disabled: number[] = [];

    for (let hour = 0; hour < 24; hour++) {
      const hourStart = hour * 60;
      const hourEnd = hourStart + 59;

      if (busyRanges.some((r) => r.start <= hourStart && r.end >= hourEnd)) {
        disabled.push(hour);
      }
    }

    return disabled;
  };

  const disabledMinutes = (hour: number) => {
    if (!disabledTimes.value) return [];

    const busyRanges = disabledTimes.value.map(([start, end]) => ({
      start: toMinutes(start),
      end: toMinutes(end),
    }));

    const disabled: number[] = [];
    const hourStart = hour * 60;

    for (let minute = 0; minute < 60; minute++) {
      const current = hourStart + minute;

      if (busyRanges.some((r) => current >= r.start && current <= r.end)) {
        disabled.push(minute);
      }
    }

    return disabled;
  };

  const save = (form: Form) => {
    if (event.value == null) return;

    const eventToSave = new GarageEvent(event.value);
    const [startHours, startMinutes] = form.startTime.split(":").map(Number);
    const [endHours, endMinutes] = form.endTime.split(":").map(Number);

    eventToSave.title = form.title;
    eventToSave.eventStatus = EventStatus.Pending;

    eventToSave.startDate = dayjs(eventToSave.date)
      .set("hour", startHours)
      .set("minute", startMinutes)
      .toDate();

    eventToSave.endDate = dayjs(eventToSave.date)
      .set("hour", endHours)
      .set("minute", endMinutes)
      .toDate();

    if (eventToSave.id == 0) {
      const eventListLength = eventStore.events.length;
      eventToSave.id = eventListLength == 0 ? 1 : eventStore.events[eventListLength - 1].id + 1;
      eventStore.addEvent(eventToSave);
      calendar.add(eventToSave.toCalendarEvent);
    } else {
      eventStore.updateEvent(eventToSave);
      calendar.update(eventToSave.toCalendarEvent);
    }

    ElNotification.success({
      title: "Заявка  создана",
      message: "ожидайте проверки админом",
      type: "success",
    });

    resetEvent();
  };

  const remove = () => {
    if (event.value == null) return;

    ElMessageBox.alert("Удалить заявку?", "Внимание").then(() => {
      eventStore.deleteEvent(event.value!.id);
      calendar.remove(event.value!.id);

      ElMessage.success("Заявка удалена");
      setEvent(null);
    });
  };

  return {
    event,
    setEvent,
    resetEvent,
    title,
    disabledTimes,
    disabledHours,
    disabledMinutes,
    save,
    remove,
  };
};

export type UseEventEditorType = ReturnType<typeof useEventEditor>;
