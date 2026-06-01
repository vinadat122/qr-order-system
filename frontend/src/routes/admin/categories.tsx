import { createFileRoute } from "@tanstack/react-router";
import { MOCK_CATEGORIES } from "@/mock/mock-data";

export const Route = createFileRoute("/admin/categories")({
  head: () => ({
    meta: [
      { title: "Categories — POS Admin" },
    ],
  }),
  component: CategoriesPage,
});

function CategoriesPage() {
  return (
    <div className="space-y-8">
      <div className="flex flex-col gap-2 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h1 className="text-3xl font-bold">Category Management</h1>
          <p className="text-sm text-muted-foreground">Manage menu categories and organization</p>
        </div>
        <button className="rounded-2xl bg-brand px-5 py-3 text-sm font-black uppercase text-slate-950 hover:bg-brand/90">
          Add Category
        </button>
      </div>

      <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
        {MOCK_CATEGORIES.map((category) => (
          <div key={category.id} className="rounded-3xl border border-white/10 bg-slate-900 p-6">
            <p className="text-sm uppercase tracking-[0.2em] text-muted-foreground">Category</p>
            <h2 className="mt-3 text-2xl font-black">{category.name}</h2>
            <p className="mt-4 text-sm text-muted-foreground">{category.items} menu items</p>
            <div className="mt-6 flex items-center justify-between gap-3">
              <button className="rounded-2xl border border-white/10 px-4 py-2 text-xs uppercase tracking-[0.2em] hover:bg-white/5">
                Edit
              </button>
              <button className="rounded-2xl bg-white/10 px-4 py-2 text-xs uppercase tracking-[0.2em] hover:bg-white/20">
                Delete
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
