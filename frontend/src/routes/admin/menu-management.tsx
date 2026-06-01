import { createFileRoute } from "@tanstack/react-router";
import { MOCK_MENU_ITEMS, MOCK_MENU_CATEGORIES } from "@/mock/mock-data";

export const Route = createFileRoute("/admin/menu-management")({
  head: () => ({
    meta: [
      { title: "Menu — POS Admin" },
    ],
  }),
  component: MenuManagementPage,
});

function MenuManagementPage() {
  return (
    <div className="space-y-8">
      <div>
        <div className="flex flex-col gap-2 sm:flex-row sm:items-end sm:justify-between">
          <div>
            <h1 className="text-3xl font-bold">Menu Management</h1>
            <p className="text-sm text-muted-foreground">Add, edit, and manage menu items</p>
          </div>
          <button className="rounded-2xl bg-brand px-5 py-3 text-sm font-black uppercase text-slate-950 hover:bg-brand/90">
            Add New Item
          </button>
        </div>
      </div>

      <div className="grid gap-4 md:grid-cols-2">
        {MOCK_MENU_CATEGORIES.map((category) => (
          <div key={category.id} className="rounded-3xl border border-white/10 bg-slate-900 p-6">
            <div className="flex items-start justify-between gap-4">
              <div>
                <h2 className="text-xl font-black">{category.label}</h2>
                <p className="mt-2 text-sm text-muted-foreground">{category.description}</p>
              </div>
              <span className="rounded-full bg-white/10 px-3 py-1 text-xs uppercase tracking-[0.2em] text-muted-foreground">
                {MOCK_MENU_ITEMS.filter((item) => item.categoryId === category.id).length} items
              </span>
            </div>
          </div>
        ))}
      </div>

      <div className="overflow-hidden rounded-3xl border border-white/10 bg-slate-900">
        <table className="min-w-full text-left text-sm">
          <thead className="bg-slate-950">
            <tr>
              <th className="px-6 py-4 uppercase tracking-[0.2em] text-muted-foreground">Item</th>
              <th className="px-6 py-4 uppercase tracking-[0.2em] text-muted-foreground">Category</th>
              <th className="px-6 py-4 uppercase tracking-[0.2em] text-muted-foreground">Price</th>
              <th className="px-6 py-4 uppercase tracking-[0.2em] text-muted-foreground">Actions</th>
            </tr>
          </thead>
          <tbody>
            {MOCK_MENU_ITEMS.map((item) => (
              <tr key={item.id} className="border-t border-white/10 hover:bg-slate-950 transition-colors">
                <td className="px-6 py-4">
                  <div className="font-semibold">{item.name}</div>
                  <div className="text-muted-foreground text-xs">{item.description}</div>
                </td>
                <td className="px-6 py-4 text-muted-foreground">{item.categoryId}</td>
                <td className="px-6 py-4 font-semibold">${item.price}</td>
                <td className="px-6 py-4">
                  <button className="rounded-2xl border border-white/10 px-4 py-2 text-xs font-black uppercase tracking-[0.2em] hover:bg-white/5">
                    Edit
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
