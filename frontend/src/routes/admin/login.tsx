import { createFileRoute, Link, useNavigate } from "@tanstack/react-router";

import { useForm } from "react-hook-form";

import { zodResolver } from "@hookform/resolvers/zod";

import { useState } from "react";

import axiosClient from "@/api/axiosClient";

import { useAuthStore } from "@/store/auth.store";

import { loginSchema } from "@/features/auth/validators";

import { Button } from "@/components/ui/button";

import { Input } from "@/components/ui/input";

export const Route = createFileRoute("/admin/login")({
  head: () => ({
    meta: [
      {
        title: "Admin Login — POS",
      },

      {
        name: "description",

        content: "Restaurant admin login",
      },
    ],
  }),

  component: AdminLoginPage,
});

type LoginForm = {
  username: string;

  password: string;
};

function AdminLoginPage() {
  const {
    register,

    handleSubmit,

    formState: { errors },
  } = useForm<LoginForm>({
    resolver: zodResolver(loginSchema),
  });

  const [loading, setLoading] = useState(false);

  const [error, setError] = useState<string | null>(null);

  const setAuth = useAuthStore((s) => s.setAuth);

  const navigate = useNavigate();

  const onSubmit = async (data: LoginForm) => {
    try {
      setLoading(true);

      setError(null);

      const response = await axiosClient.post(
        "/auth/login",

        {
          username: data.username,

          password: data.password,
        },
      );

      const {
        accessToken,

        user,
      } = response.data;

      // save auth

      setAuth(
        accessToken,

        "",

        user,
      );

      // optional localStorage

      localStorage.setItem("token", accessToken);

      localStorage.setItem("user", JSON.stringify(user));

      // redirect

      navigate({
        to: "/admin/dashboard",
      });
    } catch (err: any) {
      console.log(err);

      setError(err?.response?.data?.message || "Invalid username or password");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 flex items-center justify-center px-6">
      <div className="w-full max-w-md space-y-6 rounded-3xl border border-white/10 bg-slate-900 p-12 shadow-xl">
        <div className="text-center space-y-2">
          <h1 className="text-3xl font-black uppercase tracking-[0.3em] text-brand">POS Admin</h1>

          <p className="text-sm text-muted-foreground">Sign in to manage your restaurant</p>
        </div>

        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
          <div>
            <label className="block text-xs font-bold uppercase mb-2">Username</label>

            <Input
              {...register("username")}
              placeholder="admin"
              className="bg-slate-800 border-white/10"
            />

            {errors.username && (
              <p className="text-red-400 text-xs mt-1">{errors.username.message}</p>
            )}
          </div>

          <div>
            <label className="block text-xs font-bold uppercase mb-2">Password</label>

            <Input
              {...register("password")}
              placeholder="••••••••"
              type="password"
              className="bg-slate-800 border-white/10"
            />

            {errors.password && (
              <p className="text-red-400 text-xs mt-1">{errors.password.message}</p>
            )}
          </div>

          {error && <p className="text-red-400 text-sm text-center">{error}</p>}

          <Button
            type="submit"
            disabled={loading}
            className="w-full bg-brand text-slate-950 font-bold"
          >
            {loading ? "Signing in..." : "Sign in"}
          </Button>
        </form>

        <div className="pt-4 text-center">
          <p className="text-sm text-muted-foreground">Chưa có tài khoản?</p>

          <Link
            to="/admin/register"
            className="mt-2 inline-flex rounded-full bg-white px-4 py-2 text-sm font-semibold text-slate-950 hover:bg-brand hover:text-white transition"
          >
            Tạo tài khoản
          </Link>
        </div>
      </div>
    </div>
  );
}
