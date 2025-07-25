import dayjs from "dayjs";

import { EventStatus } from "@/enums/EventStatus";
import { EventType } from "@/enums/EventType";

export default class GarageEvent {
  constructor(options: Partial<GarageEvent>) {
    this.id = options.id ?? 0;
    this.eventType = options.eventType ?? EventType.Booking;
    this.eventStatus = options.eventStatus ?? EventStatus.Pending;
    this.title = options.title ?? "";
    this.date = options.date ?? new Date();
    this.startDate = options.startDate ?? new Date();
    this.endDate = options.endDate ?? new Date();
    this.userId = options.userId ?? 0;
  }

  id: number;
  eventType: EventType;
  eventStatus: EventStatus;
  title: string;
  date: Date;
  startDate: Date;
  endDate: Date;
  userId: number;

  get startTime() {
    return dayjs(this.startDate).format("HH:mm");
  }

  get endTime() {
    return dayjs(this.endDate).format("HH:mm");
  }

  get startDateTime() {
    return dayjs(this.startDate).format("YYYY-MM-DD HH:mm");
  }

  get endDateTime() {
    return dayjs(this.endDate).format("YYYY-MM-DD HH:mm");
  }

  get toCalendarEvent() {
    return {
      id: this.id,
      title: this.title,
      start: this.startDateTime,
      end: this.endDateTime,
    };
  }
}
