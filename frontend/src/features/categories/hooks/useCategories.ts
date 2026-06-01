import { useMemo, useState } from "react";

export type CategoryItem = {
  id: string;
  name: string;
  createdAt: string;
};

const initialCategories: CategoryItem[] = [
  { id: "c1", name: "Ramen", createdAt: "2026-05-18" },
  { id: "c2", name: "Appetizers", createdAt: "2026-05-19" },
  { id: "c3", name: "Desserts", createdAt: "2026-05-20" },
];

export function useCategories() {
  const [categories, setCategories] = useState<CategoryItem[]>(initialCategories);
  const [filter, setFilter] = useState("");

  const filtered = useMemo(
    () => categories.filter((category) => category.name.toLowerCase().includes(filter.toLowerCase())),
    [categories, filter]
  );

  const addCategory = (category: CategoryItem) => setCategories((prev) => [category, ...prev]);
  const updateCategory = (id: string, patch: Partial<CategoryItem>) => setCategories((prev) => prev.map((category) => (category.id === id ? { ...category, ...patch } : category)));
  const deleteCategory = (id: string) => setCategories((prev) => prev.filter((category) => category.id !== id));

  return { categories: filtered, filter, setFilter, addCategory, updateCategory, deleteCategory };
}
