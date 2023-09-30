import IItem from "../types/IAllItems";
import axios from "axios";

export const fetchItems = async (): Promise<IItem[]> => {
  try {
    const response = await axios.get<IItem[]>("/items");
    return response.data;
  } catch (error) {
    throw new Error("Erro ao buscar itens:" + error);
  }
};

export const filterItemsByStatus = async (status: string): Promise<IItem[]> => {
  try {
    const allItems = await fetchItems();
    const filteredItems = allItems.filter((item) => item.status === status);
    return filteredItems;
  } catch (error) {
    throw new Error("Erro ao filtrar itens:" + error);
  }
};
