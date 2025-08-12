import dayjs from "dayjs";

import { EventStatus } from "@/enums/EventStatus";
import { EventType } from "@/enums/EventType";

export default class GarageEvent {
  constructor(options: Partial<GarageEvent>) {
    this.id = options.id ?? 0;
    this.title = options.title ?? "";
    this.status = options.status ?? EventStatus.Pending;
    this.startDate = options.startDate ?? new Date();
    this.endDate = options.endDate ?? new Date();
    this.date = options.date ?? new Date();
    this.userId = options.userId ?? 0;
  }

  id: number;
  title: string;
  status: EventStatus;
  startDate: Date;
  endDate: Date;
  userId: number;
  date: Date;

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
