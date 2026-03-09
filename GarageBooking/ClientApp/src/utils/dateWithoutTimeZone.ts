// src/utils/dateWithoutTimezone.ts
import dayjs from "dayjs";

export const formatLocalDateTime = (date: Date) => dayjs(date).format("YYYY-MM-DDTHH:mm:ss"); // без Z и смещения

function convertDatesRecursively(value: unknown): unknown {
  if (value instanceof Date) {
    return formatLocalDateTime(value);
  }

  if (Array.isArray(value)) {
    return value.map((v) => convertDatesRecursively(v));
  }

  if (value !== null && typeof value === "object") {
    const obj = value as Record<string, unknown>;
    const result: Record<string, unknown> = {};
    for (const key in obj) {
      result[key] = convertDatesRecursively(obj[key]);
    }
    return result;
  }

  return value;
}

export function stripTimeZoneInPayload<T>(payload: T): T {
  return convertDatesRecursively(payload) as T;
}
