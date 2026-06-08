import { useNavigate } from "react-router";
import { useGym } from "../../context/GymContext";
import { InicioCliente } from "./InicioCliente";

export function InicioClientePage() {
  const navigate = useNavigate();
  const { preferenciasCliente, registrarVistaRutina } = useGym();

  const handleVerRutina = (dias: number) => {
    registrarVistaRutina(dias);
    navigate(`/cliente/rutina/${dias}`);
  };

  return (
    <InicioCliente
      onVerRutina={handleVerRutina}
      preferencias={preferenciasCliente}
    />
  );
}
