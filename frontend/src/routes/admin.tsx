import { createFileRoute, useNavigate, Outlet, useLocation } from "@tanstack/react-router";
import { useAuthStore } from "@/store/auth.store";
import { useEffect } from "react";
import { Button } from "@/components/ui/button";

export const Route = createFileRoute("/admin")({
  head: () => ({
    meta: [
      { title: "Admin — POS" },
      { name: "description", content: "Restaurant POS admin panel" },
    ],
  }),
  component: AdminLayout,
});

const navItems = [
  { title: "Dashboard", to: "/admin/dashboard", roles: ["ADMIN", "STAFF", "KITCHEN"] },
  { title: "Tables", to: "/admin/tables", roles: ["ADMIN", "STAFF"] },
  { title: "Menu", to: "/admin/menu-management", roles: ["ADMIN"] },
  { title: "Categories", to: "/admin/categories", roles: ["ADMIN"] },
  { title: "Orders", to: "/admin/orders", roles: ["ADMIN", "STAFF"] },
  { title: "Kitchen", to: "/admin/kitchen", roles: ["ADMIN", "KITCHEN"] },
  { title: "Payments", to: "/admin/payments", roles: ["ADMIN", "STAFF"] },
];

function AdminLayout() {
  const user = useAuthStore((s) => s.user);
  const token = useAuthStore((s) => s.accessToken);
  const clearAuth = useAuthStore((s) => s.clearAuth);
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    const unauthenticatedPaths = ["/admin/login", "/admin/register"];

    if (!token || !user) {
      if (!unauthenticatedPaths.includes(location.pathname)) {
        navigate({ to: "/admin/login" });
      }
      return;
    }

    const allowedPaths = navItems
      .filter((item) => item.roles.includes(user.role))
      .map((item) => item.to);

    const defaultPath = user.role === "KITCHEN" ? "/admin/kitchen" : "/admin/dashboard";

    if (location.pathname === "/admin" || unauthenticatedPaths.includes(location.pathname)) {
      navigate({ to: defaultPath });
      return;
    }

    if (!allowedPaths.includes(location.pathname)) {
      navigate({ to: defaultPath });
    }
  }, [token, user, location.pathname, navigate]);

  if (!token || !user) {
    return <Outlet />;
  }

  const allowedNav = navItems.filter((item) => item.roles.includes(user.role));

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100">
      <div className="grid min-h-screen grid-cols-1 lg:grid-cols-[280px_1fr]">
        <aside className="border-r border-white/10 bg-slate-900 px-6 py-8">
          <div className="mb-10">
            <div className="text-xl font-black uppercase tracking-[0.3em] text-brand">POS Admin</div>
            <p className="mt-2 text-sm text-muted-foreground">Role: {user.role}</p>
            <p className="text-xs text-muted-foreground mt-1">{user.fullName}</p>
          </div>
          <nav className="space-y-3">
            {allowedNav.map((item) => (
              <button
                key={item.to}
                onClick={() => navigate({ to: item.to as any })}
                className="w-full text-left rounded-2xl px-4 py-3 text-sm font-semibold transition text-slate-300 hover:bg-white/5"
              >
                {item.title}
              </button>
            ))}
          </nav>
          <div className="mt-10">
            <Button
              variant="secondary"
              onClick={() => {
                clearAuth();
                navigate({ to: "/admin/login" });
              }}
              className="w-full"
            >
              Sign out
            </Button>
          </div>
        </aside>

        <main className="bg-slate-950 p-6 md:p-8 lg:p-10">
          <Outlet />
        </main>
      </div>
    </div>
  );
}
