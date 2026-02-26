import { Column } from "element-plus";
import { h, ref } from "vue";
import dayjs from "dayjs";
import StatusSuccess from "@/modules/RequestCabinet/ui/icons/StatusSuccess.vue";
import StatusPending from "@/modules/RequestCabinet/ui/icons/StatusPending.vue";
import GarageEvent from "@/models/GarageEvent";
import ConfirmButton from "@/modules/RequestCabinet/ConfirmButton.vue";
import DenyButton from "@/modules/RequestCabinet/DenyButton.vue";
import { EventStatus } from "@/enums/EventStatus";
import { getStatusName } from "@/CalendarItemColorByStatus";
import StatusFailure from "@/modules/RequestCabinet/ui/icons/StatusFailure.vue";
import StatusApproved from "@/modules/RequestCabinet/ui/icons/StatusApproved.vue";
import StatusDefault from "@/modules/RequestCabinet/ui/icons/StatusDefault.vue";

export const useTableData = () => {
  const columnStyles = {
    "font-weight": "normal",
    "border-right": "1px solid #f0f2f5",
  };
  const columns = ref<Column[]>([
    {
      key: "status",
      dataKey: "status",
      title: "Статус заявки",
      width: 0.5,
      align: "center",
      style: { ...columnStyles, "border-left": "1px solid #f0f2f5" },
      cellRenderer: ({ cellData }) => {
        switch (cellData) {
          case EventStatus.Pending:
            return <StatusPending />;
          case EventStatus.Approved:
            return <StatusApproved />;
          case EventStatus.Payed:
            return <StatusSuccess />;
          case EventStatus.Denied:
            return <StatusFailure />;
          default:
            return <StatusDefault />;
        }
      },
    },
    {
      key: "userFullName",
      dataKey: "userFullName",
      title: "Автор",
      width: 1,
      style: columnStyles,
      cellRenderer: ({ cellData }) => {
        return <span class={"break-words"}>{cellData}</span>;
      },
    },
    {
      key: "title",
      dataKey: "title",
      title: "Название",
      width: 1,
      style: columnStyles,
      cellRenderer: ({ cellData }) => {
        return <span class={"break-words"}>{cellData}</span>;
      },
    },
    {
      key: "date",
      dataKey: "date",
      title: "Дата",
      width: 1,
      style: columnStyles,
      cellRenderer: ({ cellData }) => {
        const data = dayjs(cellData).format("DD.MM.YYYY");
        return <span>{data}</span>;
      },
    },
    {
      key: "eventTimeRange",
      dataKey: "eventTimeRange",
      title: "Время",
      width: 1,
      style: columnStyles,
      cellRenderer: ({ cellData }) => {
        const time = cellData.join(" - ");
        return <span>{time}</span>;
      },
    },
    {
      key: "action",
      dataKey: "action",
      title: "Действие",
      width: 1,
      style: columnStyles,
      cellRenderer: ({ rowData, cellData }) => {
        const event = new GarageEvent({ ...rowData });

        if (event.status == EventStatus.Pending) {
          return (
            <div>
              <ConfirmButton event={event} />
              <DenyButton event={event} />
            </div>
          );
        }
        return <span>{getStatusName(event.status)}</span>;
      },
    },
  ]);

  const setWeightedColumnWidths = (tableWidth: number) => {
    const totalWeight = columns.value.reduce((sum, col) => sum + col.width, 0);

    let totalAssigned = 0;

    columns.value.forEach((col, index) => {
      const weight = col.width;

      if (index === columns.value.length - 1) {
        col.width = tableWidth - totalAssigned;
      } else {
        const rawWidth = (weight / totalWeight) * tableWidth;
        const assignedWidth = Math.floor(rawWidth);
        col.width = assignedWidth;
        totalAssigned += assignedWidth;
      }
    });
  };

  return {
    columns,
    setWeightedColumnWidths,
  };
};
