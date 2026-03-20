import dayjs from "dayjs";

import GarageEvent from "@/models/GarageEvent";
import axiosInstance from "@/services/Identity/AxiosInstance";

const apiUrlPrefix = "/api/Event";

let abortController: null | AbortController;

const GetEvents = async (startDate: Date | null, endDate: Date | null, statuses?: number[] | null) => {
  abortController?.abort();
  abortController = new AbortController();

  const params = new URLSearchParams();

  if (startDate) params.append("startDate", dayjs(startDate).format("YYYY-MM-DD"));
  if (endDate) params.append("endDate", dayjs(endDate).format("YYYY-MM-DD"));
  statuses?.forEach((s) => params.append("statuses", s.toString()));

  const { data } = await axiosInstance.get<GarageEvent[]>(apiUrlPrefix, {
    params,
    signal: abortController?.signal,
  });

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
  GetEvents,
  SaveEvent,
  UpdateEvent,
  DeleteEvent,
};
