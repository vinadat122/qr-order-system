import { createFileRoute, Link } from "@tanstack/react-router";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useState } from "react";
import { useNavigate } from "@tanstack/react-router";
import { useAuthStore } from "@/store/auth.store";
import { registerSchema } from "@/features/auth/validators";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

export const Route = createFileRoute("/admin/register")({
  head: () => ({
    meta: [
      { title: "Register Admin — POS" },
      { name: "description", content: "Create a new admin account for POS" },
    ],
  }),
  component: AdminRegisterPage,
});

type RegisterForm = {
  name: string;
  email: string;
  password: string;
  confirmPassword: string;
};

function AdminRegisterPage() {
  const { register, handleSubmit, formState: { errors }, watch } = useForm<RegisterForm>({
    resolver: zodResolver(registerSchema),
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const setAuth = useAuthStore((s) => s.setAuth);
  const navigate = useNavigate();
  const password = watch("password", "");

  const onSubmit = async (data: RegisterForm) => {
    if (data.password !== data.confirmPassword) {
      setError("Mật khẩu xác nhận không khớp.");
      return;
    }

    setLoading(true);
    setError(null);

    try {
      const user = {
        id: `user-demo-${Date.now()}`,
        name: data.name,
        fullName: data.name,
        email: data.email.toLowerCase(),
        username: data.email.toLowerCase(),
        role: "ADMIN" as const,
        active: true,
      };

      setAuth("demo-access-token", "demo-refresh-token", user);
      navigate({ to: "/admin/dashboard" });
    } catch (err) {
      setError("Đăng ký thất bại.");
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 flex items-center justify-center px-6">
      <div className="w-full max-w-md space-y-6 rounded-3xl border border-white/10 bg-slate-900 p-12 shadow-xl">
        <div className="text-center space-y-2">
          <h1 className="text-3xl font-black uppercase tracking-[0.3em] text-brand">Register Admin</h1>
          <p className="text-sm text-muted-foreground">Create a new admin account to access the POS dashboard.</p>
        </div>

        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
          <div>
            <label className="block text-xs font-bold uppercase mb-2">Name</label>
            <Input
              {...register("name", { required: "Name is required" })}
              placeholder="Admin Name"
              className="bg-slate-800 border-white/10"
            />
            {errors.name && <p className="text-red-400 text-xs mt-1">{errors.name.message}</p>}
          </div>

          <div>
            <label className="block text-xs font-bold uppercase mb-2">Email</label>
            <Input
              {...register("email", { required: "Email is required" })}
              placeholder="admin@pos.local"
              type="email"
              className="bg-slate-800 border-white/10"
            />
            {errors.email && <p className="text-red-400 text-xs mt-1">{errors.email.message}</p>}
          </div>

          <div>
            <label className="block text-xs font-bold uppercase mb-2">Password</label>
            <Input
              {...register("password", { required: "Password is required", minLength: { value: 6, message: "Password must be at least 6 characters" } })}
              placeholder="********"
              type="password"
              className="bg-slate-800 border-white/10"
            />
            {errors.password && <p className="text-red-400 text-xs mt-1">{errors.password.message}</p>}
          </div>

          <div>
            <label className="block text-xs font-bold uppercase mb-2">Confirm Password</label>
            <Input
              {...register("confirmPassword", { required: "Please confirm password", validate: (value) => value === password || "Passwords do not match" })}
              placeholder="********"
              type="password"
              className="bg-slate-800 border-white/10"
            />
            {errors.confirmPassword && <p className="text-red-400 text-xs mt-1">{errors.confirmPassword.message}</p>}
          </div>

          {error && <p className="text-red-400 text-sm text-center">{error}</p>}

          <Button type="submit" disabled={loading} className="w-full bg-brand text-slate-950 font-bold">
            {loading ? "Đang tạo tài khoản..." : "Tạo tài khoản"}
          </Button>
        </form>

        <div className="text-center pt-4">
          <p className="text-sm text-muted-foreground">Đã có tài khoản?</p>
          <Link
            to="/admin/login"
            className="mt-2 inline-flex rounded-full bg-white px-4 py-2 text-sm font-semibold text-slate-950 hover:bg-brand hover:text-white transition"
          >
            Quay về đăng nhập
          </Link>
        </div>
      </div>
    </div>
  );
}
