import { useEffect, useState } from "react";

import { CardStatus } from "../../../components/CardStatus";
import { fetchItems } from "../../../server/apiService";
import { useQuery } from "@tanstack/react-query";

const Status = {
  Approved: "Aprovada",
  Pending: "Pendente",
  Denied: "Negada",
};

export const PercentageOfTransactions = () => {
  const {
    data: allItems,
    isError,
    isLoading,
  } = useQuery(["items"], fetchItems);
  const [percentageApproved, setPercentageApproved] = useState("");
  const [percentagePending, setPercentagePending] = useState("");
  const [percentageDenied, setPercentageDenied] = useState("");

  useEffect(() => {
    if (!isLoading && !isError && allItems) {
      const total = allItems.length;
      const approvedCount = allItems.filter(
        (item) => item.status === Status.Approved
      ).length;
      const pendingCount = allItems.filter(
        (item) => item.status === Status.Pending
      ).length;
      const deniedCount = allItems.filter(
        (item) => item.status === Status.Denied
      ).length;

      if (total > 0) {
        const percentageAprovada = ((approvedCount / total) * 100).toFixed();
        const percentagePendente = ((pendingCount / total) * 100).toFixed();
        const percentageNegada = ((deniedCount / total) * 100).toFixed();

        setPercentageApproved(percentageAprovada);
        setPercentagePending(percentagePendente);
        setPercentageDenied(percentageNegada);
      } else {
        setPercentageApproved("");
        setPercentagePending("");
        setPercentageDenied("");
      }
    }
  }, [allItems, isLoading, isError]);

  return (
    <div className="flex gap-8 flex-wrap mt-12">
      <div className="grow">
        <CardStatus percentage={percentageApproved} status="approved" />
      </div>
      <div className="grow">
        <CardStatus percentage={percentagePending} status="pending" />
      </div>
      <div className="grow">
        <CardStatus percentage={percentageDenied} status="denied" />
      </div>
    </div>
  );
};
