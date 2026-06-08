import { useGym } from "../../context/GymContext";
import { Cliente } from "../client/Cliente";

export function ClientesPage() {
  const {
    clientes,
    cuotas,
    agregarCliente,
    modificarCliente,
    eliminarCliente,
    agregarCuota,
    modificarCuota,
  } = useGym();

  return (
    <Cliente
      clientes={clientes}
      cuotas={cuotas}
      onAgregarCliente={agregarCliente}
      onModificarCliente={modificarCliente}
      onEliminarCliente={eliminarCliente}
      onAgregarCuota={agregarCuota}
      onModificarCuota={modificarCuota}
    />
  );
}
