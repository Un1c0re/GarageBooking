import axios from "axios";

import GarageEvent from "@/models/GarageEvent";

const apiUrlPrefix = "/api/BookingEvent";

const GetEventsByPeriod = async (startDate: Date, endDate: Date) => {
  const { data } = await axios.get<GarageEvent[]>(apiUrlPrefix, { params: { startDate, endDate } });

  return data.map((d) => new GarageEvent(d));
};

const SaveEvent = async (event: GarageEvent) => {
  const { data } = await axios.post<GarageEvent>(apiUrlPrefix, event);

  return new GarageEvent(data);
};

const UpdateEvent = async (event: GarageEvent) => {
  const { data } = await axios.put<GarageEvent>(apiUrlPrefix, { event });

  return new GarageEvent(data);
};

const DeleteEvent = async (eventId: number) => {
  await axios.delete<GarageEvent>(apiUrlPrefix, { params: { id: eventId } });
};

export default {
  GetEventsByPeriod,
  SaveEvent,
  UpdateEvent,
  DeleteEvent,
};
