import { EventStatus } from "@/enums/EventStatus";
import { EventType } from "@/enums/EventType";

export default class GarageEvent {
  constructor(options: Partial<GarageEvent>) {
    this.id = options.id ?? 0;
    this.eventType = options.eventType ?? EventType.Booking;
    this.eventStatus = options.eventStatus ?? EventStatus.Pending;
    this.title = options.title ?? "";
    this.startDate = options.startDate ?? new Date();
    this.endDate = options.endDate ?? new Date();
    this.userId = options.userId ?? 0;
  }

  id: number;
  eventType: EventType;
  eventStatus: EventStatus;
  title: string;
  startDate: Date;
  endDate: Date;
  userId: number;
}
