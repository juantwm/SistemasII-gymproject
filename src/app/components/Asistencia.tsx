import { useState } from "react";
import { Card } from "./ui/card";
import { Button } from "./ui/button";
import { Input } from "./ui/input";
import { Badge } from "./ui/badge";
import { Calendar } from "./ui/calendar";
import { Search, Check, X } from "lucide-react";

interface Miembro {
  id: number;
  nombre: string;
  email: string;
}

interface RegistroAsistencia {
  miembroId: number;
  fecha: string;
  horaEntrada: string;
}

interface AsistenciaProps {
  miembros: Miembro[];
  registrosAsistencia: RegistroAsistencia[];
  onRegistrarAsistencia: (miembroId: number, fecha: string, horaEntrada: string) => void;
}

export function Asistencia({ miembros, registrosAsistencia, onRegistrarAsistencia }: AsistenciaProps) {
  const [busqueda, setBusqueda] = useState("");
  const [fechaSeleccionada, setFechaSeleccionada] = useState<Date>(new Date());

  const fechaStr = fechaSeleccionada.toISOString().split('T')[0];

  const miembrosFiltrados = miembros.filter(m =>
    m.nombre.toLowerCase().includes(busqueda.toLowerCase()) ||
    m.email.toLowerCase().includes(busqueda.toLowerCase())
  );

  const miembrosConAsistencia = miembrosFiltrados.map(miembro => {
    const asistenciaHoy = registrosAsistencia.find(
      r => r.miembroId === miembro.id && r.fecha === fechaStr
    );
    return { ...miembro, asistenciaHoy };
  });

  const totalAsistenciaHoy = registrosAsistencia.filter(r => r.fecha === fechaStr).length;

  const handleRegistrar = (miembroId: number) => {
    const hora = new Date().toLocaleTimeString('es-ES', { hour: '2-digit', minute: '2-digit' });
    onRegistrarAsistencia(miembroId, fechaStr, hora);
  };

  return (
    <div className="space-y-4">
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
        <Card className="p-6 lg:col-span-2">
          <div className="space-y-4">
            <div className="flex justify-between items-center">
              <div>
                <h3>Registro de Asistencia</h3>
                <p className="text-sm text-gray-500 mt-1">
                  {fechaSeleccionada.toLocaleDateString('es-ES', { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' })}
                </p>
              </div>
              <Badge variant="default" className="px-4 py-2">
                {totalAsistenciaHoy} asistencias
              </Badge>
            </div>

            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
              <Input
                placeholder="Buscar miembro..."
                value={busqueda}
                onChange={(e) => setBusqueda(e.target.value)}
                className="pl-10"
              />
            </div>

            <div className="space-y-2 max-h-[500px] overflow-y-auto">
              {miembrosConAsistencia.map((miembro) => (
                <div
                  key={miembro.id}
                  className="flex items-center justify-between p-4 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors"
                >
                  <div>
                    <p className="font-medium">{miembro.nombre}</p>
                    <p className="text-sm text-gray-600">{miembro.email}</p>
                  </div>
                  <div className="flex items-center gap-3">
                    {miembro.asistenciaHoy ? (
                      <div className="flex items-center gap-2">
                        <Badge variant="default" className="bg-green-500">
                          <Check className="h-3 w-3 mr-1" />
                          Registrado {miembro.asistenciaHoy.horaEntrada}
                        </Badge>
                      </div>
                    ) : (
                      <Button onClick={() => handleRegistrar(miembro.id)}>
                        Registrar Entrada
                      </Button>
                    )}
                  </div>
                </div>
              ))}
              {miembrosConAsistencia.length === 0 && (
                <div className="text-center py-8 text-gray-500">
                  <X className="h-12 w-12 mx-auto mb-2 opacity-50" />
                  <p>No se encontraron miembros</p>
                </div>
              )}
            </div>
          </div>
        </Card>

        <Card className="p-6">
          <h3 className="mb-4">Seleccionar Fecha</h3>
          <Calendar
            mode="single"
            selected={fechaSeleccionada}
            onSelect={(date) => date && setFechaSeleccionada(date)}
            className="rounded-md border"
          />
          <div className="mt-6 space-y-3">
            <div className="p-3 bg-blue-50 rounded-lg">
              <p className="text-sm text-gray-600">Total del Día</p>
              <p className="text-2xl mt-1">{totalAsistenciaHoy}</p>
            </div>
          </div>
        </Card>
      </div>
    </div>
  );
}
