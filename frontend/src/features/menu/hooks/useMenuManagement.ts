import { useEffect, useMemo, useState } from "react";


import type {MenuItemResponse } from "@/types/api";

import { getFoods } from "@/services/food.service";

export function useMenuManagement() {
  const [items, setItems] = useState<MenuItemResponse[]>([]);

  const [search, setSearch] = useState("");

  const [categoryFilter, setCategoryFilter] = useState<string | null>(null);

  useEffect(() => {
    fetchFoods();
  }, []);

  const fetchFoods = async () => {
    try {
      const data = await getFoods();

      setItems(data);
    } catch (error) {
      console.log(error);
    }
  };

  const filteredItems = useMemo(
    () =>
      items.filter((item) => {
        const searchMatch =
          item.name.toLowerCase().includes(search.toLowerCase()) ||
          item.description.toLowerCase().includes(search.toLowerCase());

        return searchMatch;
      }),

    [items, search],
  );

  return {
    items,

    filteredItems,

    search,

    setSearch,

    categoryFilter,


    setCategoryFilter,
  };
}
