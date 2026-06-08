import { useGym } from "../../context/GymContext";
import { Equipo } from "./Equipo";

export function EquiposPage() {
  const { equipos, agregarEquipo, modificarEquipo, eliminarEquipo } = useGym();

  return (
    <Equipo
      equipos={equipos}
      onAgregarEquipo={agregarEquipo}
      onModificarEquipo={modificarEquipo}
      onEliminarEquipo={eliminarEquipo}
    />
  );
}
