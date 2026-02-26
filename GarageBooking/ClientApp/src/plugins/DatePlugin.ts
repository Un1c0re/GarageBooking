import "dayjs/locale/ru";

import dayjs from "dayjs";
import duration from "dayjs/plugin/duration";
import isBetween from "dayjs/plugin/isBetween";
import isSameOrAfter from "dayjs/plugin/isSameOrAfter";
import isSameOrBefore from "dayjs/plugin/isSameOrBefore";
import LocalizedFormat from "dayjs/plugin/localizedFormat";
import relativeTime from "dayjs/plugin/relativeTime";
import { Plugin } from "vue";

dayjs.extend(isBetween);
dayjs.extend(isSameOrBefore);
dayjs.extend(isSameOrAfter);
dayjs.extend(LocalizedFormat);
dayjs.extend(duration);
dayjs.extend(relativeTime);
dayjs.locale("ru");

export const DatePlugin: Plugin = {
  install() {
    const parse = JSON.parse;

    JSON.parse = function (s, f) {
      const ISO = /^(\d{4})-(\d{2})-(\d{2})T(\d{2}):(\d{2}):(\d{2}(?:\.\d*)?)$/;
      const ISOZ = /^(\d{4})-(\d{2})-(\d{2})T(\d{2}):(\d{2}):(\d{2}(?:\.\d*)?)(Z|([+-]\d{2}:\d{2}))?$/;
      return parse(
        s,
        f
          ? f
          : function (_key, value) {
              return typeof value === "string"
                ? ((ISO.exec(value) || ISOZ.exec(value)) && new Date(value)) || value
                : value;
            },
      );
    };

    Date.prototype.toJSON = function () {
      return dayjs(this).format();
    };
  },
};
