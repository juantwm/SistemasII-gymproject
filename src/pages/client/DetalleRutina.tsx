import { Card } from "../../components/ui/card";
import { Button } from "../../components/ui/button";
import { Badge } from "../../components/ui/badge";
import { ImageWithFallback } from "../../components/figma/ImageWithFallback";
import { ArrowLeft, Calendar, Clock, Target, TrendingUp, Dumbbell, CheckCircle } from "lucide-react";

interface DetalleRutinaProps {
  dias: number;
  onVolver: () => void;
}

const imagenesRutinas = {
  trenInferior: "https://images.unsplash.com/photo-1758274532057-78a02ead8f04?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxsZWclMjB3b3Jrb3V0JTIwc3F1YXR8ZW58MXx8fHwxNzYxMzQyNjI3fDA&ixlib=rb-4.1.0&q=80&w=1080",
  trenSuperior: "https://images.unsplash.com/photo-1659900872152-e11455714df8?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHx1cHBlciUyMGJvZHklMjB3b3Jrb3V0JTIwY2hlc3R8ZW58MXx8fHwxNzYxMzQyNjI3fDA&ixlib=rb-4.1.0&q=80&w=1080",
  cuerpoCompleto: "https://images.unsplash.com/photo-1758875569243-47fe02e1ba04?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxmdWxsJTIwYm9keSUyMHdvcmtvdXR8ZW58MXx8fHwxNzYxMzA0MjkzfDA&ixlib=rb-4.1.0&q=80&w=1080",
};

const rutinas = {
  3: {
    nombre: "Rutina Full Body 3 Días",
    descripcion: "Programa diseñado para trabajar todo el cuerpo en cada sesión, maximizando la eficiencia del entrenamiento.",
    duracion: "60-75 min",
    nivel: "Principiante - Intermedio",
    objetivo: "Tonificación y desarrollo muscular general",
    dias: [
      {
        dia: "Día 1",
        enfoque: "Tren Superior",
        imagen: imagenesRutinas.trenSuperior,
        ejercicios: [
          "Press de Banca - 4 series x 10 reps",
          "Remo con Barra - 4 series x 10 reps",
          "Press Militar - 3 series x 12 reps",
          "Curl de Bíceps - 3 series x 12 reps",
          "Extensiones de Tríceps - 3 series x 12 reps",
        ],
      },
      {
        dia: "Día 2",
        enfoque: "Tren Inferior",
        imagen: imagenesRutinas.trenInferior,
        ejercicios: [
          "Sentadillas - 4 series x 12 reps",
          "Peso Muerto - 4 series x 10 reps",
          "Prensa de Piernas - 3 series x 15 reps",
          "Curl Femoral - 3 series x 12 reps",
          "Pantorrillas - 4 series x 15 reps",
        ],
      },
      {
        dia: "Día 3",
        enfoque: "Cuerpo Completo",
        imagen: imagenesRutinas.cuerpoCompleto,
        ejercicios: [
          "Sentadilla Frontal - 3 series x 10 reps",
          "Pull-ups - 3 series x 8 reps",
          "Peso Muerto Rumano - 3 series x 12 reps",
          "Fondos en Paralelas - 3 series x 10 reps",
          "Plancha Abdominal - 3 series x 45 seg",
        ],
      },
    ],
    reporte: {
      volumen: "18-22 series por grupo muscular por semana",
      intensidad: "Moderada-Alta (70-80% 1RM)",
      recuperacion: "48 horas entre sesiones",
      progresion: "Aumento de peso cada 2-3 semanas",
      recomendaciones: [
        "Ideal para personas que buscan mantener masa muscular y mejorar condición física",
        "Permite suficiente recuperación entre sesiones",
        "Se puede combinar con 2-3 sesiones de cardio semanales",
        "Enfoque en la técnica correcta antes de aumentar peso",
      ],
    },
  },
  4: {
    nombre: "Rutina Upper/Lower 4 Días",
    descripcion: "División optimizada para mayor volumen de entrenamiento, alternando entre tren superior e inferior.",
    duracion: "70-80 min",
    nivel: "Intermedio - Avanzado",
    objetivo: "Hipertrofia y fuerza",
    dias: [
      {
        dia: "Día 1",
        enfoque: "Tren Superior (Empuje)",
        imagen: imagenesRutinas.trenSuperior,
        ejercicios: [
          "Press de Banca - 4 series x 8 reps",
          "Press Inclinado con Mancuernas - 4 series x 10 reps",
          "Press Militar - 4 series x 10 reps",
          "Elevaciones Laterales - 3 series x 15 reps",
          "Extensiones de Tríceps - 3 series x 12 reps",
          "Fondos - 3 series x 12 reps",
        ],
      },
      {
        dia: "Día 2",
        enfoque: "Tren Inferior (Quad dominante)",
        imagen: imagenesRutinas.trenInferior,
        ejercicios: [
          "Sentadillas - 5 series x 8 reps",
          "Prensa de Piernas - 4 series x 12 reps",
          "Zancadas - 3 series x 12 reps/pierna",
          "Extensiones de Cuádriceps - 3 series x 15 reps",
          "Pantorrillas Sentado - 4 series x 15 reps",
        ],
      },
      {
        dia: "Día 3",
        enfoque: "Tren Superior (Tracción)",
        imagen: imagenesRutinas.trenSuperior,
        ejercicios: [
          "Peso Muerto - 4 series x 6 reps",
          "Pull-ups - 4 series x 10 reps",
          "Remo con Barra - 4 series x 10 reps",
          "Face Pulls - 3 series x 15 reps",
          "Curl de Bíceps - 4 series x 12 reps",
          "Curl Martillo - 3 series x 12 reps",
        ],
      },
      {
        dia: "Día 4",
        enfoque: "Tren Inferior (Glúteo/Femoral)",
        imagen: imagenesRutinas.trenInferior,
        ejercicios: [
          "Peso Muerto Rumano - 4 series x 10 reps",
          "Hip Thrust - 4 series x 12 reps",
          "Curl Femoral - 4 series x 12 reps",
          "Sentadilla Búlgara - 3 series x 10 reps/pierna",
          "Pantorrillas de Pie - 4 series x 15 reps",
        ],
      },
    ],
    reporte: {
      volumen: "22-28 series por grupo muscular por semana",
      intensidad: "Alta (75-85% 1RM)",
      recuperacion: "24-48 horas según grupo muscular",
      progresion: "Periodización ondulada, variar reps cada 4 semanas",
      recomendaciones: [
        "Óptimo para ganancia muscular y fuerza",
        "Permite mayor volumen de entrenamiento por grupo muscular",
        "Distribución equilibrada entre empuje y tracción",
        "Requiere buena base de entrenamiento previo",
      ],
    },
  },
  5: {
    nombre: "Rutina Avanzada 5 Días",
    descripcion: "Programa intensivo con alto volumen de entrenamiento para resultados máximos.",
    duracion: "75-90 min",
    nivel: "Avanzado",
    objetivo: "Hipertrofia máxima y definición",
    dias: [
      {
        dia: "Día 1",
        enfoque: "Tren Superior (Pecho/Hombros)",
        imagen: imagenesRutinas.trenSuperior,
        ejercicios: [
          "Press de Banca - 5 series x 8 reps",
          "Press Inclinado - 4 series x 10 reps",
          "Aperturas - 3 series x 12 reps",
          "Press Militar - 4 series x 10 reps",
          "Elevaciones Laterales - 4 series x 15 reps",
          "Elevaciones Frontales - 3 series x 12 reps",
        ],
      },
      {
        dia: "Día 2",
        enfoque: "Tren Inferior (Quad dominante)",
        imagen: imagenesRutinas.trenInferior,
        ejercicios: [
          "Sentadillas - 5 series x 8 reps",
          "Sentadilla Frontal - 4 series x 10 reps",
          "Prensa de Piernas - 4 series x 12 reps",
          "Extensiones - 4 series x 15 reps",
          "Zancadas - 3 series x 12 reps/pierna",
        ],
      },
      {
        dia: "Día 3",
        enfoque: "Tren Superior (Espalda/Brazos)",
        imagen: imagenesRutinas.trenSuperior,
        ejercicios: [
          "Peso Muerto - 5 series x 6 reps",
          "Pull-ups - 4 series x 10 reps",
          "Remo con Barra - 4 series x 10 reps",
          "Remo con Mancuernas - 3 series x 12 reps",
          "Curl de Bíceps - 4 series x 12 reps",
          "Extensiones Tríceps - 4 series x 12 reps",
        ],
      },
      {
        dia: "Día 4",
        enfoque: "Tren Inferior (Glúteo/Femoral)",
        imagen: imagenesRutinas.trenInferior,
        ejercicios: [
          "Peso Muerto Rumano - 4 series x 10 reps",
          "Hip Thrust - 5 series x 12 reps",
          "Curl Femoral - 4 series x 12 reps",
          "Sentadilla Búlgara - 4 series x 10 reps/pierna",
          "Buenos Días - 3 series x 12 reps",
        ],
      },
      {
        dia: "Día 5",
        enfoque: "Cuerpo Completo (Funcional)",
        imagen: imagenesRutinas.cuerpoCompleto,
        ejercicios: [
          "Clean & Press - 4 series x 8 reps",
          "Sentadilla con Salto - 3 series x 10 reps",
          "Dominadas - 3 series x 12 reps",
          "Kettlebell Swings - 4 series x 20 reps",
          "Circuito Abdominal - 4 rondas",
        ],
      },
    ],
    reporte: {
      volumen: "28-35 series por grupo muscular por semana",
      intensidad: "Muy Alta (80-90% 1RM)",
      recuperacion: "24 horas mínimo, requiere nutrición óptima",
      progresion: "Periodización lineal con deload cada 4-6 semanas",
      recomendaciones: [
        "Para atletas con al menos 1 año de experiencia consistente",
        "Requiere excelente recuperación y nutrición",
        "Incluye día de trabajo funcional y explosivo",
        "Monitorear señales de sobreentrenamiento",
        "Considerar suplementación (proteína, creatina)",
      ],
    },
  },
};

export function DetalleRutina({ dias, onVolver }: DetalleRutinaProps) {
  const rutina = rutinas[dias as keyof typeof rutinas];

  if (!rutina) {
    return <div>Rutina no encontrada</div>;
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center gap-4">
        <Button variant="outline" onClick={onVolver}>
          <ArrowLeft className="h-4 w-4 mr-2" />
          Volver
        </Button>
      </div>

      <div className="space-y-2">
        <div className="flex items-center gap-3">
          <h1 className="text-4xl">{rutina.nombre}</h1>
          <Badge variant="default" className="px-3 py-1">
            {dias} Días
          </Badge>
        </div>
        <p className="text-gray-600">{rutina.descripcion}</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <Card className="p-4">
          <div className="flex items-center gap-3">
            <Clock className="h-5 w-5 text-blue-600" />
            <div>
              <p className="text-sm text-gray-500">Duración</p>
              <p className="font-medium">{rutina.duracion}</p>
            </div>
          </div>
        </Card>
        <Card className="p-4">
          <div className="flex items-center gap-3">
            <TrendingUp className="h-5 w-5 text-purple-600" />
            <div>
              <p className="text-sm text-gray-500">Nivel</p>
              <p className="font-medium">{rutina.nivel}</p>
            </div>
          </div>
        </Card>
        <Card className="p-4">
          <div className="flex items-center gap-3">
            <Target className="h-5 w-5 text-green-600" />
            <div>
              <p className="text-sm text-gray-500">Objetivo</p>
              <p className="font-medium">{rutina.objetivo}</p>
            </div>
          </div>
        </Card>
        <Card className="p-4">
          <div className="flex items-center gap-3">
            <Dumbbell className="h-5 w-5 text-orange-600" />
            <div>
              <p className="text-sm text-gray-500">Volumen</p>
              <p className="font-medium">{rutina.reporte.volumen.split(' ')[0]} series/sem</p>
            </div>
          </div>
        </Card>
      </div>

      <div className="space-y-4">
        <h2>Estructura de la Rutina</h2>
        <div className="grid grid-cols-1 gap-4">
          {rutina.dias.map((diaRutina, index) => (
            <Card key={index} className="overflow-hidden">
              <div className="grid md:grid-cols-2 gap-6">
                <div className="relative h-64 md:h-auto">
                  <ImageWithFallback
                    src={diaRutina.imagen}
                    alt={`${diaRutina.enfoque}`}
                    className="w-full h-full object-cover"
                  />
                  <div className="absolute top-4 left-4">
                    <Badge variant="default" className="bg-black/70 backdrop-blur-sm">
                      {diaRutina.dia}
                    </Badge>
                  </div>
                </div>
                <div className="p-6 space-y-4">
                  <div>
                    <h3 className="mb-1">{diaRutina.dia}</h3>
                    <p className="text-gray-600">{diaRutina.enfoque}</p>
                  </div>
                  <div className="space-y-2">
                    {diaRutina.ejercicios.map((ejercicio, idx) => (
                      <div key={idx} className="flex items-start gap-2 text-sm">
                        <CheckCircle className="h-4 w-4 text-green-600 mt-0.5 flex-shrink-0" />
                        <span>{ejercicio}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </Card>
          ))}
        </div>
      </div>

      <Card className="p-6 bg-gradient-to-br from-blue-50 to-purple-50 border-blue-200">
        <h2 className="mb-6">Reporte de la Rutina</h2>
        
        <div className="grid md:grid-cols-2 gap-6 mb-6">
          <div>
            <h3 className="mb-3">Parámetros de Entrenamiento</h3>
            <div className="space-y-3">
              <div className="flex justify-between py-2 border-b">
                <span className="text-gray-600">Volumen Semanal:</span>
                <span className="font-medium">{rutina.reporte.volumen}</span>
              </div>
              <div className="flex justify-between py-2 border-b">
                <span className="text-gray-600">Intensidad:</span>
                <span className="font-medium">{rutina.reporte.intensidad}</span>
              </div>
              <div className="flex justify-between py-2 border-b">
                <span className="text-gray-600">Recuperación:</span>
                <span className="font-medium">{rutina.reporte.recuperacion}</span>
              </div>
              <div className="flex justify-between py-2 border-b">
                <span className="text-gray-600">Progresión:</span>
                <span className="font-medium">{rutina.reporte.progresion}</span>
              </div>
            </div>
          </div>

          <div>
            <h3 className="mb-3">Recomendaciones Clave</h3>
            <div className="space-y-2">
              {rutina.reporte.recomendaciones.map((rec, idx) => (
                <div key={idx} className="flex items-start gap-2 text-sm">
                  <CheckCircle className="h-4 w-4 text-blue-600 mt-0.5 flex-shrink-0" />
                  <span>{rec}</span>
                </div>
              ))}
            </div>
          </div>
        </div>

        <div className="flex gap-3">
          <Button className="flex-1">
            <Calendar className="h-4 w-4 mr-2" />
            Asignar a Mi Calendario
          </Button>
          <Button variant="outline" className="flex-1">
            Descargar PDF
          </Button>
        </div>
      </Card>
    </div>
  );
}
