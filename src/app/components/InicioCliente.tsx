import { Card } from "./ui/card";
import { Button } from "./ui/button";
import { Badge } from "./ui/badge";
import { Alert, AlertDescription } from "./ui/alert";
import { Calendar, TrendingUp, Zap, Star, History, Sparkles, AlertCircle } from "lucide-react";

interface InicioClienteProps {
  onVerRutina: (dias: number) => void;
  preferencias: {
    rutinasMasVistas: number[];
    totalVistas: number;
  };
}

const rutinasDisponibles = [
  {
    dias: 3,
    titulo: "Rutina 3 Días",
    descripcion: "Ideal para principiantes o personas con agenda ocupada",
    tipo: "Cuerpo completo + divisiones",
    intensidad: "Moderada",
    color: "from-green-500 to-emerald-600",
  },
  {
    dias: 4,
    titulo: "Rutina 4 Días",
    descripcion: "Balance perfecto entre entrenamiento y recuperación",
    tipo: "División tren superior/inferior",
    intensidad: "Alta",
    color: "from-blue-500 to-cyan-600",
  },
  {
    dias: 5,
    titulo: "Rutina 5 Días",
    descripcion: "Para personas comprometidas con sus objetivos",
    tipo: "División avanzada + cardio",
    intensidad: "Muy Alta",
    color: "from-purple-500 to-pink-600",
  },
];

export function InicioCliente({ onVerRutina, preferencias }: InicioClienteProps) {
  // Check if there are any available routines
  const hayRutinasDisponibles = rutinasDisponibles.length > 0;

  // Determinar rutinas sugeridas basadas en historial
  const getRutinaSugerida = () => {
    if (preferencias.totalVistas === 0) {
      return null;
    }

    // Encontrar la rutina más vista
    const conteoVistas: Record<number, number> = {};
    preferencias.rutinasMasVistas.forEach(dias => {
      conteoVistas[dias] = (conteoVistas[dias] || 0) + 1;
    });

    const rutinaFavorita = Object.entries(conteoVistas).sort((a, b) => b[1] - a[1])[0];
    const diasFavoritos = parseInt(rutinaFavorita[0]);

    // Sugerir rutina actual + opción de progresión
    const sugerencias = [];
    const rutinaActual = rutinasDisponibles.find(r => r.dias === diasFavoritos);
    
    if (rutinaActual) {
      sugerencias.push({
        ...rutinaActual,
        razon: "Tu rutina más consultada"
      });
    }

    // Sugerir progresión si está viendo rutinas de menor intensidad
    if (diasFavoritos < 5) {
      const siguienteNivel = rutinasDisponibles.find(r => r.dias === diasFavoritos + 1);
      if (siguienteNivel) {
        sugerencias.push({
          ...siguienteNivel,
          razon: "Siguiente nivel recomendado"
        });
      }
    }

    // Si está en 5 días, sugerir mantener o bajar si es necesario
    if (diasFavoritos === 5) {
      const alternativa = rutinasDisponibles.find(r => r.dias === 4);
      if (alternativa) {
        sugerencias.push({
          ...alternativa,
          razon: "Opción alternativa para recuperación"
        });
      }
    }

    return sugerencias;
  };

  const rutinaSugerida = getRutinaSugerida();

  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-4xl mb-2">Portal de Entrenamiento</h1>
        <p className="text-gray-600">Explora y consulta tus rutinas personalizadas</p>
      </div>

      {/* Error: No hay rutinas disponibles */}
      {!hayRutinasDisponibles && (
        <Alert className="border-red-500 bg-red-50">
          <AlertCircle className="h-4 w-4 text-red-600" />
          <AlertDescription className="text-red-800">
            <strong>No tienes rutinas disponibles en este momento.</strong> Por favor, contacta a tu entrenador para que te asigne un plan de entrenamiento.
          </AlertDescription>
        </Alert>
      )}

      {/* Error: No hay sugerencias (sin historial de consultas) */}
      {hayRutinasDisponibles && (!rutinaSugerida || rutinaSugerida.length === 0) && preferencias.totalVistas === 0 && (
        <Alert className="border-blue-500 bg-blue-50">
          <AlertCircle className="h-4 w-4 text-blue-600" />
          <AlertDescription className="text-blue-800">
            No podemos sugerir rutinas porque no tienes consultas anteriores. Explora las rutinas disponibles para empezar.
          </AlertDescription>
        </Alert>
      )}

      {/* Rutinas Sugeridas - Solo si hay historial */}
      {hayRutinasDisponibles && rutinaSugerida && rutinaSugerida.length > 0 && (
        <div className="space-y-4">
          <div className="flex items-center gap-3">
            <Sparkles className="h-6 w-6 text-yellow-500" />
            <div>
              <h2>Rutinas Sugeridas Para Ti</h2>
              <p className="text-sm text-gray-600">Basadas en tus consultas anteriores ({preferencias.totalVistas} vistas)</p>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {rutinaSugerida.map((rutina, index) => (
              <Card key={index} className="overflow-hidden hover:shadow-xl transition-all border-2 border-yellow-200">
                <div className="relative">
                  <div className={`h-32 bg-gradient-to-br ${rutina.color} flex items-center justify-center`}>
                    <div className="text-center text-white">
                      <Calendar className="h-12 w-12 mx-auto mb-2" />
                      <p className="text-3xl">{rutina.dias} Días</p>
                    </div>
                  </div>
                  <div className="absolute top-3 right-3">
                    <Badge className="bg-yellow-500 hover:bg-yellow-600">
                      <Star className="h-3 w-3 mr-1" />
                      Sugerida
                    </Badge>
                  </div>
                </div>
                
                <div className="p-6 space-y-4">
                  <div>
                    <div className="flex items-center justify-between mb-2">
                      <h3>{rutina.titulo}</h3>
                      <Badge variant="outline" className="text-xs">
                        {rutina.razon}
                      </Badge>
                    </div>
                    <p className="text-sm text-gray-600">{rutina.descripcion}</p>
                  </div>

                  <div className="space-y-2">
                    <div className="flex items-center gap-2 text-sm">
                      <TrendingUp className="h-4 w-4 text-gray-500" />
                      <span className="text-gray-600">{rutina.tipo}</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <Zap className="h-4 w-4 text-gray-500" />
                      <Badge variant={
                        rutina.intensidad === "Moderada" ? "secondary" :
                        rutina.intensidad === "Alta" ? "default" : "destructive"
                      }>
                        {rutina.intensidad}
                      </Badge>
                    </div>
                  </div>

                  <Button 
                    className="w-full bg-gradient-to-r from-yellow-500 to-orange-500 hover:from-yellow-600 hover:to-orange-600"
                    onClick={() => onVerRutina(rutina.dias)}
                  >
                    Ver Detalles
                  </Button>
                </div>
              </Card>
            ))}
          </div>
        </div>
      )}

      {/* Todas las Rutinas Disponibles */}
      {hayRutinasDisponibles && (
        <div className="space-y-4">
          <div className="flex items-center gap-3">
            <History className="h-6 w-6 text-blue-600" />
            <div>
              <h2>Todas las Rutinas Disponibles</h2>
              <p className="text-sm text-gray-600">Explora nuestro catálogo completo de programas de entrenamiento</p>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {rutinasDisponibles.map((rutina) => (
              <Card key={rutina.dias} className="overflow-hidden hover:shadow-lg transition-shadow">
                <div className={`h-32 bg-gradient-to-br ${rutina.color} flex items-center justify-center`}>
                  <div className="text-center text-white">
                    <Calendar className="h-12 w-12 mx-auto mb-2" />
                    <p className="text-3xl">{rutina.dias} Días</p>
                  </div>
                </div>
                
                <div className="p-6 space-y-4">
                  <div>
                    <h3 className="mb-2">{rutina.titulo}</h3>
                    <p className="text-sm text-gray-600">{rutina.descripcion}</p>
                  </div>

                  <div className="space-y-2">
                    <div className="flex items-center gap-2 text-sm">
                      <TrendingUp className="h-4 w-4 text-gray-500" />
                      <span className="text-gray-600">{rutina.tipo}</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <Zap className="h-4 w-4 text-gray-500" />
                      <Badge variant={
                        rutina.intensidad === "Moderada" ? "secondary" :
                        rutina.intensidad === "Alta" ? "default" : "destructive"
                      }>
                        {rutina.intensidad}
                      </Badge>
                    </div>
                  </div>

                  <Button 
                    className="w-full"
                    onClick={() => onVerRutina(rutina.dias)}
                  >
                    Ver Más
                  </Button>
                </div>
              </Card>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}