import { useState } from "react";
import { Card } from "../../components/ui/card";
import { Button } from "../../components/ui/button";
import { Input } from "../../components/ui/input";
import { Label } from "../../components/ui/label";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "../../components/ui/table";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "../../components/ui/dialog";
import { Badge } from "../../components/ui/badge";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "../../components/ui/select";
import { Search, Plus, Edit, Trash2 } from "lucide-react";

interface Miembro {
  id: number;
  nombre: string;
  email: string;
  telefono: string;
  membresia: string;
  estado: "Activo" | "Inactivo" | "Pendiente";
  fechaInicio: string;
}

interface GestionMiembrosProps {
  miembros: Miembro[];
  onAgregarMiembro: (miembro: Omit<Miembro, "id">) => void;
  onEditarMiembro: (miembro: Miembro) => void;
  onEliminarMiembro: (id: number) => void;
}

export function GestionMiembros({ miembros, onAgregarMiembro, onEditarMiembro, onEliminarMiembro }: GestionMiembrosProps) {
  const [busqueda, setBusqueda] = useState("");
  const [dialogAbierto, setDialogAbierto] = useState(false);
  const [miembroEditando, setMiembroEditando] = useState<Miembro | null>(null);
  const [formData, setFormData] = useState({
    nombre: "",
    email: "",
    telefono: "",
    membresia: "Mensual",
    estado: "Activo" as const,
    fechaInicio: new Date().toISOString().split('T')[0],
  });

  const miembrosFiltrados = miembros.filter(m =>
    m.nombre.toLowerCase().includes(busqueda.toLowerCase()) ||
    m.email.toLowerCase().includes(busqueda.toLowerCase())
  );

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (miembroEditando) {
      onEditarMiembro({ ...formData, id: miembroEditando.id });
    } else {
      onAgregarMiembro(formData);
    }
    setDialogAbierto(false);
    resetForm();
  };

  const resetForm = () => {
    setFormData({
      nombre: "",
      email: "",
      telefono: "",
      membresia: "Mensual",
      estado: "Activo",
      fechaInicio: new Date().toISOString().split('T')[0],
    });
    setMiembroEditando(null);
  };

  const handleEditar = (miembro: Miembro) => {
    setMiembroEditando(miembro);
    setFormData({
      nombre: miembro.nombre,
      email: miembro.email,
      telefono: miembro.telefono,
      membresia: miembro.membresia,
      estado: miembro.estado,
      fechaInicio: miembro.fechaInicio,
    });
    setDialogAbierto(true);
  };

  return (
    <div className="space-y-4">
      <Card className="p-6">
        <div className="flex flex-col md:flex-row justify-between gap-4 mb-6">
          <div className="relative flex-1 max-w-md">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
            <Input
              placeholder="Buscar miembros..."
              value={busqueda}
              onChange={(e) => setBusqueda(e.target.value)}
              className="pl-10"
            />
          </div>
          
          <Dialog open={dialogAbierto} onOpenChange={(open) => {
            setDialogAbierto(open);
            if (!open) resetForm();
          }}>
            <DialogTrigger asChild>
              <Button>
                <Plus className="h-4 w-4 mr-2" />
                Nuevo Miembro
              </Button>
            </DialogTrigger>
            <DialogContent>
              <DialogHeader>
                <DialogTitle>{miembroEditando ? "Editar Miembro" : "Nuevo Miembro"}</DialogTitle>
              </DialogHeader>
              <form onSubmit={handleSubmit} className="space-y-4">
                <div>
                  <Label htmlFor="nombre">Nombre Completo</Label>
                  <Input
                    id="nombre"
                    value={formData.nombre}
                    onChange={(e) => setFormData({ ...formData, nombre: e.target.value })}
                    required
                  />
                </div>
                <div>
                  <Label htmlFor="email">Email</Label>
                  <Input
                    id="email"
                    type="email"
                    value={formData.email}
                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                    required
                  />
                </div>
                <div>
                  <Label htmlFor="telefono">Teléfono</Label>
                  <Input
                    id="telefono"
                    value={formData.telefono}
                    onChange={(e) => setFormData({ ...formData, telefono: e.target.value })}
                    required
                  />
                </div>
                <div>
                  <Label htmlFor="membresia">Tipo de Membresía</Label>
                  <Select value={formData.membresia} onValueChange={(value) => setFormData({ ...formData, membresia: value })}>
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="Mensual">Mensual</SelectItem>
                      <SelectItem value="Trimestral">Trimestral</SelectItem>
                      <SelectItem value="Anual">Anual</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div>
                  <Label htmlFor="fechaInicio">Fecha de Inicio</Label>
                  <Input
                    id="fechaInicio"
                    type="date"
                    value={formData.fechaInicio}
                    onChange={(e) => setFormData({ ...formData, fechaInicio: e.target.value })}
                    required
                  />
                </div>
                <Button type="submit" className="w-full">
                  {miembroEditando ? "Guardar Cambios" : "Agregar Miembro"}
                </Button>
              </form>
            </DialogContent>
          </Dialog>
        </div>

        <div className="overflow-x-auto">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Nombre</TableHead>
                <TableHead>Email</TableHead>
                <TableHead>Teléfono</TableHead>
                <TableHead>Membresía</TableHead>
                <TableHead>Estado</TableHead>
                <TableHead>Fecha Inicio</TableHead>
                <TableHead>Acciones</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {miembrosFiltrados.map((miembro) => (
                <TableRow key={miembro.id}>
                  <TableCell>{miembro.nombre}</TableCell>
                  <TableCell>{miembro.email}</TableCell>
                  <TableCell>{miembro.telefono}</TableCell>
                  <TableCell>{miembro.membresia}</TableCell>
                  <TableCell>
                    <Badge variant={miembro.estado === "Activo" ? "default" : miembro.estado === "Inactivo" ? "destructive" : "secondary"}>
                      {miembro.estado}
                    </Badge>
                  </TableCell>
                  <TableCell>{miembro.fechaInicio}</TableCell>
                  <TableCell>
                    <div className="flex gap-2">
                      <Button variant="outline" size="sm" onClick={() => handleEditar(miembro)}>
                        <Edit className="h-4 w-4" />
                      </Button>
                      <Button variant="outline" size="sm" onClick={() => onEliminarMiembro(miembro.id)}>
                        <Trash2 className="h-4 w-4" />
                      </Button>
                    </div>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>
      </Card>
    </div>
  );
}
