import { EventStatus } from "@/enums/EventStatus";

export interface TableData {
  id: number;
  status: EventStatus;
  userFullName: string;
  title: string;
  date: string;
  eventTimeRange: string[];
}
