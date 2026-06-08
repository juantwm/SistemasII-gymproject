import { useGym } from "../../context/GymContext";
import { Gastos } from "./Gastos";

export function GastosPage() {
  const { gastos, agregarGasto, modificarGasto, eliminarGasto } = useGym();

  return (
    <Gastos
      gastos={gastos}
      onAgregarGasto={agregarGasto}
      onModificarGasto={modificarGasto}
      onEliminarGasto={eliminarGasto}
    />
  );
}
