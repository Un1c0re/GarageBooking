import { FormRules } from "element-plus";

import { Form } from "@/models/Form";
import { Time } from "@/models/Time";
import { compareTimes } from "@/modules/EventCalendar/helpers/TimeHelpers";

export const validateTimeRange = (form: Form, field1: keyof Form, field2: keyof Form, busyRanges: Time[][]) => {
  return (_: any, value: string, callback: (error?: Error) => void) => {
    if (!value || !form[field2]) return callback();

    const startTime = field1 === "startTime" ? value : form[field2];
    const endTime = field1 === "startTime" ? form[field2] : value;

    if (!compareTimes(startTime, endTime)) {
      return callback(
        new Error(
          field1 === "startTime" ? "Начало должно быть раньше окончания" : "окончание должно быть позже начала",
        ),
      );
    }

    const hasOverlap = busyRanges.some(([busyStart, busyEnd]) => {
      const busyStartTime = busyStart.hour + ":" + busyStart.minutes;
      const busyEndTime = busyEnd.hour + ":" + busyEnd.minutes;

      return compareTimes(startTime, busyStartTime) && !compareTimes(endTime, busyEndTime);
    });

    if (hasOverlap) {
      return callback(new Error("Пересекается с существующей записью"));
    }

    callback();
  };
};

export const getFormRules = (form: Form, busyRanges: Time[][]): FormRules<Form> => ({
  title: [
    { required: true, message: "Пожалуйста, заполните поле", trigger: "blur" },
    { min: 3, max: 16, message: "Название должна быть от 3 до 16 символов", trigger: "blur" },
  ],
  startTime: [
    { type: "string", required: true, message: "Выберите время начала", trigger: "change" },
    {
      validator: validateTimeRange(form, "startTime", "endTime", busyRanges),
      trigger: "change",
    },
  ],
  endTime: [
    { type: "string", required: true, message: "Выберите время окончания", trigger: "change" },
    {
      validator: validateTimeRange(form, "endTime", "startTime", busyRanges),
      trigger: "change",
    },
  ],
});
