import { Card } from "../../components/ui/card";
import { Badge } from "../../components/ui/badge";
import { Progress } from "../../components/ui/progress";
import { User, Activity, TrendingUp, Award, Calendar, Eye, Mail, Phone, Hash } from "lucide-react";
import { AlertaVencimientoCuota } from "./AlertaVencimientoCuota";

interface Miembro {
  id: number;
  nombreApellido: string;
  mail: string;
  telefono: string;
  membresia: string;
  estado: "Activo" | "Inactivo" | "Pendiente";
  fechaInicio: string;
}

interface Cuota {
  id: number;
  clienteId: number;
  clienteNombre: string;
  fechaPago: string;
  fechaVencimiento: string;
  monto: number;
  medioPago: string;
  estado: "Pagado" | "Pendiente" | "Vencido";
}

interface PerfilClienteProps {
  miembro: Miembro;
  preferencias: {
    rutinasMasVistas: number[];
    totalVistas: number;
  };
  cuotasCliente?: Cuota[];
}

export function PerfilCliente({ miembro, preferencias, cuotasCliente = [] }: PerfilClienteProps) {
  // Calcular estadísticas
  const conteoRutinas: Record<number, number> = {};
  preferencias.rutinasMasVistas.forEach(dias => {
    conteoRutinas[dias] = (conteoRutinas[dias] || 0) + 1;
  });

  const rutinaFavorita = Object.entries(conteoRutinas).sort((a, b) => b[1] - a[1])[0];

  // Calcular meses desde la fecha de inicio
  const getMesesMiembro = () => {
    const inicio = new Date(miembro.fechaInicio);
    const hoy = new Date();
    const meses = (hoy.getFullYear() - inicio.getFullYear()) * 12 + (hoy.getMonth() - inicio.getMonth());
    return Math.max(meses, 0);
  };

  const mesesMiembro = getMesesMiembro();
  const fechaInicioFormateada = new Date(miembro.fechaInicio).toLocaleDateString('es-ES', { 
    year: 'numeric', 
    month: 'long' 
  });

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-4xl mb-2">Mi Perfil</h1>
        <p className="text-gray-600">Información personal y estadísticas de entrenamiento</p>
      </div>

      {/* Información básica */}
      <Card className="p-6">
        <div className="flex items-start gap-4">
          <div className="h-20 w-20 bg-gradient-to-br from-red-600 to-black rounded-full flex items-center justify-center flex-shrink-0">
            <User className="h-10 w-10 text-white" />
          </div>
          <div className="flex-1">
            <h2 className="mb-1">{miembro.nombreApellido}</h2>
            <div className="space-y-1 mb-3">
              <div className="flex items-center gap-2 text-sm text-gray-600">
                <Hash className="h-4 w-4" />
                <span>ID: {miembro.id}</span>
              </div>
              <div className="flex items-center gap-2 text-sm text-gray-600">
                <Mail className="h-4 w-4" />
                <span>{miembro.mail}</span>
              </div>
              <div className="flex items-center gap-2 text-sm text-gray-600">
                <Phone className="h-4 w-4" />
                <span>{miembro.telefono}</span>
              </div>
            </div>
            <div className="flex gap-2 flex-wrap">
              <Badge variant="default" className={
                miembro.estado === "Activo" ? "bg-green-500" :
                miembro.estado === "Pendiente" ? "bg-yellow-500" : "bg-gray-500"
              }>
                {miembro.estado}
              </Badge>
              <Badge variant="secondary">Membresía {miembro.membresia}</Badge>
              <Badge variant="outline">Miembro desde {fechaInicioFormateada}</Badge>
            </div>
          </div>
        </div>
      </Card>

      {/* Estadísticas de actividad */}
      <Card className="p-6">
        <h2 className="mb-6">Estadísticas de Actividad</h2>
        
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
          <div className="flex items-center gap-3">
            <div className="h-12 w-12 bg-blue-100 rounded-full flex items-center justify-center">
              <Eye className="h-6 w-6 text-blue-600" />
            </div>
            <div>
              <p className="text-sm text-gray-500">Rutinas Consultadas</p>
              <p className="text-2xl">{preferencias.totalVistas}</p>
            </div>
          </div>

          <div className="flex items-center gap-3">
            <div className="h-12 w-12 bg-purple-100 rounded-full flex items-center justify-center">
              <Activity className="h-6 w-6 text-purple-600" />
            </div>
            <div>
              <p className="text-sm text-gray-500">Rutinas Diferentes</p>
              <p className="text-2xl">{Object.keys(conteoRutinas).length}</p>
            </div>
          </div>

          <div className="flex items-center gap-3">
            <div className="h-12 w-12 bg-green-100 rounded-full flex items-center justify-center">
              <Award className="h-6 w-6 text-green-600" />
            </div>
            <div>
              <p className="text-sm text-gray-500">Rutina Favorita</p>
              <p className="text-2xl">{rutinaFavorita ? `${rutinaFavorita[0]} días` : "-"}</p>
            </div>
          </div>

          <div className="flex items-center gap-3">
            <div className="h-12 w-12 bg-orange-100 rounded-full flex items-center justify-center">
              <Calendar className="h-6 w-6 text-orange-600" />
            </div>
            <div>
              <p className="text-sm text-gray-500">Meses de Miembro</p>
              <p className="text-2xl">{mesesMiembro}</p>
            </div>
          </div>
        </div>
      </Card>

      {/* Historial de consultas */}
      {preferencias.totalVistas > 0 && (
        <Card className="p-6">
          <h2 className="mb-6">Distribución de Consultas</h2>
          
          <div className="space-y-4">
            {Object.entries(conteoRutinas)
              .sort((a, b) => b[1] - a[1])
              .map(([dias, vistas]) => {
                const porcentaje = (vistas / preferencias.totalVistas) * 100;
                return (
                  <div key={dias}>
                    <div className="flex justify-between mb-2">
                      <span className="text-sm">Rutina {dias} días</span>
                      <span className="text-sm text-gray-600">{vistas} vistas ({porcentaje.toFixed(0)}%)</span>
                    </div>
                    <Progress value={porcentaje} className="h-2" />
                  </div>
                );
              })}
          </div>
        </Card>
      )}

      {/* Preferencias de entrenamiento */}
      <Card className="p-6">
        <h2 className="mb-6">Preferencias de Entrenamiento</h2>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <h3 className="mb-4">Patrón Detectado</h3>
            <div className="space-y-3">
              {preferencias.totalVistas === 0 ? (
                <p className="text-sm text-gray-600">
                  Comienza a explorar rutinas para que podamos identificar tus preferencias.
                </p>
              ) : (
                <>
                  <div className="flex items-center gap-2">
                    <TrendingUp className="h-5 w-5 text-blue-600" />
                    <div>
                      <p className="text-sm">Frecuencia Preferida</p>
                      <p className="font-medium">{rutinaFavorita ? `${rutinaFavorita[0]} días por semana` : "-"}</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-2">
                    <Activity className="h-5 w-5 text-purple-600" />
                    <div>
                      <p className="text-sm">Nivel de Intensidad</p>
                      <p className="font-medium">
                        {rutinaFavorita && parseInt(rutinaFavorita[0]) >= 5 ? "Muy Alta" :
                         rutinaFavorita && parseInt(rutinaFavorita[0]) === 4 ? "Alta" : "Moderada"}
                      </p>
                    </div>
                  </div>
                </>
              )}
            </div>
          </div>

          <div>
            <h3 className="mb-4">Recomendación Personalizada</h3>
            <div className="p-4 bg-blue-50 rounded-lg">
              {preferencias.totalVistas === 0 ? (
                <p className="text-sm text-gray-700">
                  Explora diferentes rutinas para recibir recomendaciones personalizadas basadas en tus preferencias.
                </p>
              ) : (
                <p className="text-sm text-gray-700">
                  Basado en tu historial, te recomendamos mantener tu rutina actual de{" "}
                  <strong>{rutinaFavorita ? rutinaFavorita[0] : ""} días</strong> y complementarla con{" "}
                  <strong>2-3 sesiones de cardio</strong> semanales para resultados óptimos.
                </p>
              )}
            </div>
          </div>
        </div>
      </Card>

      {/* Card informativo */}
      <Card className="p-6 bg-gradient-to-r from-blue-50 to-purple-50 border-blue-200">
        <div className="flex items-start gap-4">
          <div className="h-12 w-12 bg-blue-600 rounded-full flex items-center justify-center flex-shrink-0">
            <Award className="h-6 w-6 text-white" />
          </div>
          <div>
            <h3 className="mb-2">¿Quieres mejorar tu experiencia?</h3>
            <p className="text-sm text-gray-700">
              Cuanto más explores y uses las rutinas, mejor podremos personalizar tus recomendaciones 
              y ayudarte a alcanzar tus objetivos de entrenamiento.
            </p>
          </div>
        </div>
      </Card>

      {/* Alerta de vencimiento de cuota */}
      {cuotasCliente.length > 0 && (
        <AlertaVencimientoCuota cuotasCliente={cuotasCliente} />
      )}
    </div>
  );
}