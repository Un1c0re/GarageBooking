import GarageEvent from "@/models/GarageEvent";
import axiosInstance from "@/services/Identity/AxiosInstance";

const apiUrlPrefix = "/api/Event";

const GetEventsByPeriod = async (startDate: Date, endDate: Date) => {
  const { data } = await axiosInstance.get<GarageEvent[]>(apiUrlPrefix, { params: { startDate, endDate } });

  return data.map((d) => new GarageEvent(d));
};

const SaveEvent = async (event: GarageEvent) => {
  const { data } = await axiosInstance.post<GarageEvent>(apiUrlPrefix, event);

  return new GarageEvent(data);
};

const UpdateEvent = async (event: GarageEvent) => {
  const { data } = await axiosInstance.put<GarageEvent>(apiUrlPrefix, event);

  return new GarageEvent(data);
};

const DeleteEvent = async (eventId: number) => {
  await axiosInstance.delete<GarageEvent>(apiUrlPrefix, { params: { id: eventId } });
};

export default {
  GetEventsByPeriod,
  SaveEvent,
  UpdateEvent,
  DeleteEvent,
};
