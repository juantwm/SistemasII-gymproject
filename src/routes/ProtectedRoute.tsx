import type { ReactNode } from "react";
import { Navigate } from "react-router";
import { useGym } from "../context/GymContext";

export function ProtectedAdminRoute({ children }: { children: ReactNode }) {
  const { userType } = useGym();

  if (userType !== "admin" && userType !== "recepcionista") {
    return <Navigate to="/admin/login" replace />;
  }

  return <>{children}</>;
}

export function ProtectedClientRoute({ children }: { children: ReactNode }) {
  const { userType, clienteActual } = useGym();

  if (userType !== "cliente" || !clienteActual) {
    return <Navigate to="/login" replace />;
  }

  return <>{children}</>;
}
