import axios from "axios";

import GarageEvent from "@/models/GarageEvent";

const apiUrlPrefix = "/api/GarageEvent";

const GetEventsByPeriod = async (startDate: Date, endDate: Date) => {
  const { data } = await axios.get<GarageEvent[]>(apiUrlPrefix, { params: { startDate, endDate } });

  return data.map((d) => new GarageEvent(d));
};

const SaveEvent = async (event: GarageEvent) => {
  const { data } = await axios.post<GarageEvent>(apiUrlPrefix, { event });

  return new GarageEvent(data);
};

const DeleteEvent = async (eventId: number) => {
  const { data } = await axios.delete<GarageEvent>(apiUrlPrefix, { params: { id: eventId } });
};

export default {
  GetEventsByPeriod,
  SaveEvent,
  DeleteEvent,
};
