import { HorizontalLineMap } from "../../../components/HorizontalLineMap";
import { fetchItems } from "../../../server/apiService";
import { useQuery } from "@tanstack/react-query";

const getStatusColor = (status: string) => {
  switch (status) {
    case "Aprovada":
      return "#00FF00";
    case "Pendente":
      return "#FFA500 ";
    case "Negada":
      return "#d10d0d ";
    default:
      return "black";
  }
};

export const GraphicOfProcessedTransactions = () => {
  const { data: items } = useQuery(["items"], fetchItems);

  const months = ["Janeiro", "Fevereiro", "Março", "Abril", "Maio", "Junho"];

  const groupedData: Record<string, number[]> = {
    Aprovada: Array(months.length).fill(0),
    Pendente: Array(months.length).fill(0),
    Negada: Array(months.length).fill(0),
  };

  items?.forEach((item) => {
    const date = new Date(item.date);
    const monthIndex = date.getMonth();

    if (groupedData[item.status] !== undefined) {
      groupedData[item.status][monthIndex] += 1;
    }
  });

  const dataFormated = Object.keys(groupedData).map((status) => ({
    id: status,
    color: getStatusColor(status),
    data: months.map((mes, index) => ({
      x: mes,
      y: groupedData[status][index],
    })),
  }));

  return (
    <div>
      <HorizontalLineMap data={dataFormated} />
    </div>
  );
};
