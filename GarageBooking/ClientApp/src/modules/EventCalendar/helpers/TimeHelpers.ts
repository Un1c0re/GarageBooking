import { Time } from "@/models/Time";

export const toMinutes = (time: Time) => {
  return Number(time.hour) * 60 + Number(time.minutes);
};

export const compareTimes = (time1: string, time2: string) => {
  const minutes1 = toMinutes(toTime(time1));
  const minutes2 = toMinutes(toTime(time2));

  return minutes1 < minutes2;
};

export const toTime = (time: string) => {
  const timeArray = time.split(":");
  return {
    hour: timeArray[0],
    minutes: timeArray[1],
  };
};
