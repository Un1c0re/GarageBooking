import { Column, ElButton } from "element-plus";
import { h, ref } from "vue";
import dayjs from "dayjs";
import StatusSuccess from "@/modules/RequestCabinet/ui/icons/StatusSuccess.vue";
import StatusPending from "@/modules/RequestCabinet/ui/icons/StatusPending.vue";

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
        if (cellData == 1) {
          return <StatusSuccess />;
        } else {
          return <StatusPending />;
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
      key: "eventTitle",
      dataKey: "eventTitle",
      title: "Название",
      width: 1,
      style: columnStyles,
      cellRenderer: ({ cellData }) => {
        return <span class={"break-words"}>{cellData}</span>;
      },
    },
    {
      key: "EventDate",
      dataKey: "EventDate",
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
      cellRenderer: ({ cellData }) => {
        return (
          <div>
            <ElButton type={"success"}>Подтвердить</ElButton>
            <ElButton type={"danger"}>Отклонить</ElButton>
          </div>
        );
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
