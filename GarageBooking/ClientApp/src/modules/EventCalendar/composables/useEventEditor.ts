import { createEventsServicePlugin } from "@schedule-x/events-service";
import dayjs from "dayjs";
import { ElMessage, ElMessageBox, ElNotification } from "element-plus";
import { computed, ref } from "vue";

import { EventStatus } from "@/enums/EventStatus";
import { toMinutes } from "@/helpers/TimeHelpers";
import { Form } from "@/models/Form";
import GarageEvent from "@/models/GarageEvent";
import GarageEventService from "@/services/GarageEventService";
import { useEventStore } from "@/store/EventStore";
import { PermanentDisabledTimes } from "@/utils/PermanentDisabledTimes";

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
    let disabledTimes = [...PermanentDisabledTimes];

    if (event.value) {
      let busyPeriods = eventStore.getTimesByDay(event.value!.date);

      busyPeriods = busyPeriods.filter((t) => {
        const startTime = `${t[0].hour}:${t[0].minutes}`;
        const endTime = `${t[1].hour}:${t[1].minutes}`;

        return event.value!.startTime != startTime && event.value!.endTime != endTime;
      });

      disabledTimes = [...disabledTimes, ...busyPeriods];
    }

    return disabledTimes;
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

  const save = async (form: Form) => {
    if (event.value == null) return;

    const eventToSave = new GarageEvent(event.value);
    const [startHours, startMinutes] = form.startTime.split(":").map(Number);
    const [endHours, endMinutes] = form.endTime.split(":").map(Number);

    eventToSave.title = form.title;
    eventToSave.status = EventStatus.Pending;

    eventToSave.startDate = dayjs(eventToSave.date)
      .set("hour", startHours)
      .set("minute", startMinutes)
      .toDate();

    eventToSave.endDate = dayjs(eventToSave.date)
      .set("hour", endHours)
      .set("minute", endMinutes)
      .toDate();

    try {
      if (eventToSave.id == 0) {
        // const savedEvent = await GarageEventService.SaveEvent(eventToSave);
        eventToSave.id = eventStore.events.length + 1;
        const savedEvent = eventToSave;

        eventStore.addEvent(savedEvent);
        calendar.add(savedEvent.toCalendarEvent);

        ElNotification.success({
          title: "Заявка  создана",
          message: "ожидайте проверки админом",
          type: "success",
        });
      } else {
        const savedEvent = await GarageEventService.UpdateEvent(eventToSave);
        eventStore.updateEvent(savedEvent);
        calendar.update(savedEvent.toCalendarEvent);
      }
      resetEvent();
    } catch (e) {
      ElNotification.error({
        title: "Не удалось сохранить заявку",
        message: `${e}`,
        type: "error",
      });
    }
  };

  const remove = () => {
    if (event.value == null) return;

    ElMessageBox.alert("Удалить заявку?", "Внимание").then(() => {
      eventStore.deleteEvent(event.value!.id);
      calendar.remove(event.value!.id);

      ElMessage.success("Заявка удалена");
      resetEvent();
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
