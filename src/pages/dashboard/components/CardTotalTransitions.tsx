import { useEffect, useState } from "react";

import { TotalValueOfTransitions } from "../../../components/TotalValueOfTransitions";
import { fetchItems } from "../../../server/apiService";
import { useQuery } from "@tanstack/react-query";

export const CardTotalTransitions = () => {
  const { data: items } = useQuery(["items"], fetchItems);
  const [totalOverall, setTotalOverall] = useState(0);
  const [totalGross, setTotalGross] = useState(0);
  const [totalNet, setTotalNet] = useState(0);

  useEffect(() => {
    if (items) {
      const gross = items.reduce((acc, item) => acc + item.grossAmount, 0);
      setTotalGross(gross);
      const net = items.reduce((acc, item) => acc + item.netAmount, 0);
      setTotalNet(net);
      setTotalOverall(gross + net);
    }
  }, [items]);

  const formatCurrency = (value: number) => {
    const formatter = new Intl.NumberFormat("pt-BR", {
      style: "currency",
      currency: "BRL",
    });
    return formatter.format(value);
  };
  return (
    <div className="flex flex-col gap-3 h-full">
      <div className="grow">
        <TotalValueOfTransitions
          amount={formatCurrency(totalOverall)}
          label="Total das transições"
        />
      </div>
      <div className="grow ">
        <TotalValueOfTransitions
          amount={formatCurrency(totalGross)}
          label="Total bruto"
        />
      </div>
      <div className="grow ">
        <TotalValueOfTransitions
          amount={formatCurrency(totalNet)}
          label="Total líquido"
        />
      </div>
    </div>
  );
};
