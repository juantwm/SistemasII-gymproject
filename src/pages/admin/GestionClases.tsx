import { useState } from "react";
import { Card } from "../../components/ui/card";
import { Button } from "../../components/ui/button";
import { Input } from "../../components/ui/input";
import { Label } from "../../components/ui/label";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "../../components/ui/dialog";
import { Badge } from "../../components/ui/badge";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "../../components/ui/select";
import { Plus, Edit, Trash2, Clock, Users } from "lucide-react";

interface Clase {
  id: number;
  nombre: string;
  instructor: string;
  dia: string;
  horaInicio: string;
  horaFin: string;
  capacidad: number;
  inscritos: number;
  tipo: string;
}

interface GestionClasesProps {
  clases: Clase[];
  onAgregarClase: (clase: Omit<Clase, "id" | "inscritos">) => void;
  onEditarClase: (clase: Clase) => void;
  onEliminarClase: (id: number) => void;
}

const diasSemana = ["Lunes", "Martes", "Miércoles", "Jueves", "Viernes", "Sábado", "Domingo"];

export function GestionClases({ clases, onAgregarClase, onEditarClase, onEliminarClase }: GestionClasesProps) {
  const [dialogAbierto, setDialogAbierto] = useState(false);
  const [claseEditando, setClaseEditando] = useState<Clase | null>(null);
  const [formData, setFormData] = useState({
    nombre: "",
    instructor: "",
    dia: "Lunes",
    horaInicio: "",
    horaFin: "",
    capacidad: 20,
    tipo: "Grupal",
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (claseEditando) {
      onEditarClase({ ...formData, id: claseEditando.id, inscritos: claseEditando.inscritos });
    } else {
      onAgregarClase(formData);
    }
    setDialogAbierto(false);
    resetForm();
  };

  const resetForm = () => {
    setFormData({
      nombre: "",
      instructor: "",
      dia: "Lunes",
      horaInicio: "",
      horaFin: "",
      capacidad: 20,
      tipo: "Grupal",
    });
    setClaseEditando(null);
  };

  const handleEditar = (clase: Clase) => {
    setClaseEditando(clase);
    setFormData({
      nombre: clase.nombre,
      instructor: clase.instructor,
      dia: clase.dia,
      horaInicio: clase.horaInicio,
      horaFin: clase.horaFin,
      capacidad: clase.capacidad,
      tipo: clase.tipo,
    });
    setDialogAbierto(true);
  };

  const clasesPorDia = diasSemana.map(dia => ({
    dia,
    clases: clases.filter(c => c.dia === dia).sort((a, b) => a.horaInicio.localeCompare(b.horaInicio))
  }));

  return (
    <div className="space-y-4">
      <div className="flex justify-between items-center">
        <h2>Horario de Clases</h2>
        <Dialog open={dialogAbierto} onOpenChange={(open) => {
          setDialogAbierto(open);
          if (!open) resetForm();
        }}>
          <DialogTrigger asChild>
            <Button>
              <Plus className="h-4 w-4 mr-2" />
              Nueva Clase
            </Button>
          </DialogTrigger>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>{claseEditando ? "Editar Clase" : "Nueva Clase"}</DialogTitle>
            </DialogHeader>
            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <Label htmlFor="nombre">Nombre de la Clase</Label>
                <Input
                  id="nombre"
                  value={formData.nombre}
                  onChange={(e) => setFormData({ ...formData, nombre: e.target.value })}
                  required
                />
              </div>
              <div>
                <Label htmlFor="instructor">Instructor</Label>
                <Input
                  id="instructor"
                  value={formData.instructor}
                  onChange={(e) => setFormData({ ...formData, instructor: e.target.value })}
                  required
                />
              </div>
              <div>
                <Label htmlFor="tipo">Tipo</Label>
                <Select value={formData.tipo} onValueChange={(value) => setFormData({ ...formData, tipo: value })}>
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="Grupal">Grupal</SelectItem>
                    <SelectItem value="Personal">Personal</SelectItem>
                    <SelectItem value="Virtual">Virtual</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div>
                <Label htmlFor="dia">Día</Label>
                <Select value={formData.dia} onValueChange={(value) => setFormData({ ...formData, dia: value })}>
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    {diasSemana.map(dia => (
                      <SelectItem key={dia} value={dia}>{dia}</SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="horaInicio">Hora Inicio</Label>
                  <Input
                    id="horaInicio"
                    type="time"
                    value={formData.horaInicio}
                    onChange={(e) => setFormData({ ...formData, horaInicio: e.target.value })}
                    required
                  />
                </div>
                <div>
                  <Label htmlFor="horaFin">Hora Fin</Label>
                  <Input
                    id="horaFin"
                    type="time"
                    value={formData.horaFin}
                    onChange={(e) => setFormData({ ...formData, horaFin: e.target.value })}
                    required
                  />
                </div>
              </div>
              <div>
                <Label htmlFor="capacidad">Capacidad</Label>
                <Input
                  id="capacidad"
                  type="number"
                  value={formData.capacidad}
                  onChange={(e) => setFormData({ ...formData, capacidad: parseInt(e.target.value) })}
                  required
                  min="1"
                />
              </div>
              <Button type="submit" className="w-full">
                {claseEditando ? "Guardar Cambios" : "Agregar Clase"}
              </Button>
            </form>
          </DialogContent>
        </Dialog>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
        {clasesPorDia.map(({ dia, clases }) => (
          <Card key={dia} className="p-4">
            <h3 className="mb-4 pb-2 border-b">{dia}</h3>
            <div className="space-y-3">
              {clases.length === 0 ? (
                <p className="text-sm text-gray-500">Sin clases programadas</p>
              ) : (
                clases.map((clase) => (
                  <div key={clase.id} className="p-3 bg-gray-50 rounded-lg space-y-2">
                    <div className="flex justify-between items-start">
                      <div>
                        <p className="font-medium">{clase.nombre}</p>
                        <p className="text-sm text-gray-600">{clase.instructor}</p>
                      </div>
                      <Badge variant="outline">{clase.tipo}</Badge>
                    </div>
                    <div className="flex items-center gap-4 text-sm text-gray-600">
                      <div className="flex items-center gap-1">
                        <Clock className="h-3 w-3" />
                        <span>{clase.horaInicio} - {clase.horaFin}</span>
                      </div>
                    </div>
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-1 text-sm">
                        <Users className="h-3 w-3" />
                        <span>{clase.inscritos}/{clase.capacidad}</span>
                      </div>
                      <div className="flex gap-1">
                        <Button variant="ghost" size="sm" onClick={() => handleEditar(clase)}>
                          <Edit className="h-3 w-3" />
                        </Button>
                        <Button variant="ghost" size="sm" onClick={() => onEliminarClase(clase.id)}>
                          <Trash2 className="h-3 w-3" />
                        </Button>
                      </div>
                    </div>
                  </div>
                ))
              )}
            </div>
          </Card>
        ))}
      </div>
    </div>
  );
}
