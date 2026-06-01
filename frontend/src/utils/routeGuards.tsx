import React from "react";
import { useAuthStore } from "@/store/auth.store";
import { Navigate } from "react-router-dom";

// Note: TanStack Router uses its own navigation. This file provides simple guard utilities

export function requireRole(role: string, Component: React.ComponentType<any>) {
  return function Guarded(props: any) {
    const user = useAuthStore((s) => s.user);
    if (!user) return <>{/* allow outer router to handle redirect */}</>;
    if (user.role !== role) return <>{/* not authorized */}</>;
    return <Component {...props} />;
  };
}
