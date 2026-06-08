import { useGym } from "../../context/GymContext";
import { Dashboard } from "./Dashboard";

export function DashboardPage() {
  const { clientes, ingresosMensuales, ingresosAnuales } = useGym();

  return (
    <Dashboard
      miembrosActivos={clientes.filter((c) => c.estado === "Activo").length}
      ingresosMensuales={ingresosMensuales}
      ingresosAnuales={ingresosAnuales}
    />
  );
}
