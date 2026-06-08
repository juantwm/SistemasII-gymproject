import { useGym } from "../../context/GymContext";
import { PerfilCliente } from "./PerfilCliente";

export function PerfilClientePage() {
  const { clienteActual, preferenciasCliente, cuotas } = useGym();

  if (!clienteActual) return null;

  const cuotasCliente = cuotas.filter((c) => c.clienteId === clienteActual.id);

  return (
    <PerfilCliente
      miembro={clienteActual}
      preferencias={preferenciasCliente}
      cuotasCliente={cuotasCliente}
    />
  );
}
