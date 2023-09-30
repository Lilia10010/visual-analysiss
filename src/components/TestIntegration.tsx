import { fetchItems, filterItemsByStatus } from "../server/apiService";

import { useQuery } from "@tanstack/react-query";
import { useState } from "react";

interface IStatus {
  status: "Aprovada" | "Pendente" | "Negada";
}

export const ServerFunction = () => {
  const [selectedStatus, setSelectedStatus] =
    useState<IStatus["status"]>("Aprovada");
  const { data: allItems } = useQuery(["items"], fetchItems);

  const { data: filteredItems } = useQuery(
    ["items", selectedStatus],
    async () => {
      if (selectedStatus) {
        const filteredData = await filterItemsByStatus(selectedStatus);
        return filteredData;
      }
      return [];
    }
  );
  console.log(
    "🚀 ~ file: TestIntegration.tsx:16 ~ ServerFunction ~ filteredItems:",
    filteredItems
  );

  return (
    <div>
      <h1>Itens</h1>
      <label htmlFor="statusFilter">Filtrar por status:</label>
      <select
        id="statusFilter"
        onChange={(e) => setSelectedStatus(e.target.value as IStatus["status"])}
        value={selectedStatus}
      >
        <option value="Aprovada">Aprovada</option>
        <option value="Pendente">Pendente</option>
      </select>
      <ul>
        {filteredItems?.map((item, index) => (
          <li key={index}>
            ID: {item.id}
            <br />
            Merchant ID: {item.merchantId}
            <br />
            Status: {item.status}
            <br />
          </li>
        ))}
      </ul>
      <div>
        <div className="w-full h-2 bg-black"></div>
        <h1>Itens: {allItems?.length}</h1>
        <ul>
          {allItems?.map((item, index) => (
            <li key={index}>
              ID: {item.id}
              <br />
              Merchant ID: {item.merchantId}
              <br />
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};
