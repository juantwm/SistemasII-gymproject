import { useNavigate, useParams } from "react-router";
import { DetalleRutina } from "./DetalleRutina";

export function DetalleRutinaPage() {
  const { id } = useParams();
  const navigate = useNavigate();
  const dias = parseInt(id || "3", 10);

  return (
    <DetalleRutina
      dias={dias}
      onVolver={() => navigate("/cliente/inicio")}
    />
  );
}
