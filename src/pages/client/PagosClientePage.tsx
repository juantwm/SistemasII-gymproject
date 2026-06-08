import { useGym } from "../../context/GymContext";
import { PagosCliente } from "./PagosCliente";

export function PagosClientePage() {
  const { clienteActual, cuotas } = useGym();

  if (!clienteActual) return null;

  const cuotasCliente = cuotas.filter((c) => c.clienteId === clienteActual.id);

  return <PagosCliente miembro={clienteActual} pagos={cuotasCliente} />;
}
