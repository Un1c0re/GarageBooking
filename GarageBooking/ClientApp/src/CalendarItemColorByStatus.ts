import { EventStatus } from "@/enums/EventStatus";

export const getCellStyle = (status: EventStatus) => {
  let baseStyle = {
    backgroundColor: "#ecf5ff",
    color: "#1d3a5f",
    borderLeft: "4px solid #409EFF",
  };
  switch (status) {
    case EventStatus.Pending:
      return baseStyle;
    case EventStatus.Approved:
      baseStyle.backgroundColor = "#fffbec";
      baseStyle.color = "#5f4c1d";
      baseStyle.borderLeft = "4px solid #ffd940";
      return baseStyle;
    case EventStatus.Payed:
      baseStyle.backgroundColor = "#f1ffec";
      baseStyle.color = "#215f1d";
      baseStyle.borderLeft = "4px solid #76ff40";
      return baseStyle;
    case EventStatus.Denied:
    default:
      return baseStyle;
  }
};

export const getStatusName = (status: EventStatus) => {
  switch (status) {
    case EventStatus.Pending:
      return "В обработке";
    case EventStatus.Approved:
      return "Ожидает оплаты";
    case EventStatus.Payed:
      return "Оплачено";
    case EventStatus.Denied:
      return "Отклонена";
  }
};
