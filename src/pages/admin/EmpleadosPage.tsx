import { useGym } from "../../context/GymContext";
import { Empleados } from "./Empleados";

export function EmpleadosPage() {
  const { empleados, agregarEmpleado, modificarEmpleado, eliminarEmpleado } = useGym();

  return (
    <Empleados
      empleados={empleados}
      onAgregarEmpleado={agregarEmpleado}
      onModificarEmpleado={modificarEmpleado}
      onEliminarEmpleado={eliminarEmpleado}
    />
  );
}
