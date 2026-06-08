import { useState } from "react";
import { Card } from "../../components/ui/card";
import { Button } from "../../components/ui/button";
import { Input } from "../../components/ui/input";
import { Label } from "../../components/ui/label";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "../../components/ui/table";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "../../components/ui/dialog";
import { Badge } from "../../components/ui/badge";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "../../components/ui/select";
import { Plus, DollarSign, Calendar, Search } from "lucide-react";

interface Pago {
  id: number;
  miembroId: number;
  miembroNombre: string;
  monto: number;
  fecha: string;
  membresia: string;
  metodoPago: string;
  estado: "Pagado" | "Pendiente" | "Vencido";
}

interface PagosProps {
  pagos: Pago[];
  miembros: Array<{ id: number; nombre: string }>;
  onAgregarPago: (pago: Omit<Pago, "id" | "miembroNombre">) => void;
}

export function Pagos({ pagos, miembros, onAgregarPago }: PagosProps) {
  const [busqueda, setBusqueda] = useState("");
  const [dialogAbierto, setDialogAbierto] = useState(false);
  const [formData, setFormData] = useState({
    miembroId: 0,
    monto: 0,
    fecha: new Date().toISOString().split('T')[0],
    membresia: "Mensual",
    metodoPago: "Efectivo",
    estado: "Pagado" as const,
  });

  const pagosFiltrados = pagos.filter(p =>
    p.miembroNombre.toLowerCase().includes(busqueda.toLowerCase())
  );

  const totalPagado = pagos.filter(p => p.estado === "Pagado").reduce((sum, p) => sum + p.monto, 0);
  const totalPendiente = pagos.filter(p => p.estado === "Pendiente").reduce((sum, p) => sum + p.monto, 0);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onAgregarPago(formData);
    setDialogAbierto(false);
    setFormData({
      miembroId: 0,
      monto: 0,
      fecha: new Date().toISOString().split('T')[0],
      membresia: "Mensual",
      metodoPago: "Efectivo",
      estado: "Pagado",
    });
  };

  return (
    <div className="space-y-4">
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <Card className="p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-500">Total Pagado</p>
              <p className="text-3xl mt-2">${totalPagado}</p>
            </div>
            <div className="h-12 w-12 bg-green-100 rounded-full flex items-center justify-center">
              <DollarSign className="h-6 w-6 text-green-600" />
            </div>
          </div>
        </Card>

        <Card className="p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-500">Pendiente de Pago</p>
              <p className="text-3xl mt-2">${totalPendiente}</p>
            </div>
            <div className="h-12 w-12 bg-orange-100 rounded-full flex items-center justify-center">
              <Calendar className="h-6 w-6 text-orange-600" />
            </div>
          </div>
        </Card>

        <Card className="p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-500">Pagos del Mes</p>
              <p className="text-3xl mt-2">{pagos.length}</p>
            </div>
            <div className="h-12 w-12 bg-blue-100 rounded-full flex items-center justify-center">
              <DollarSign className="h-6 w-6 text-blue-600" />
            </div>
          </div>
        </Card>
      </div>

      <Card className="p-6">
        <div className="flex flex-col md:flex-row justify-between gap-4 mb-6">
          <div className="relative flex-1 max-w-md">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
            <Input
              placeholder="Buscar por miembro..."
              value={busqueda}
              onChange={(e) => setBusqueda(e.target.value)}
              className="pl-10"
            />
          </div>
          
          <Dialog open={dialogAbierto} onOpenChange={setDialogAbierto}>
            <DialogTrigger asChild>
              <Button>
                <Plus className="h-4 w-4 mr-2" />
                Registrar Pago
              </Button>
            </DialogTrigger>
            <DialogContent>
              <DialogHeader>
                <DialogTitle>Registrar Nuevo Pago</DialogTitle>
              </DialogHeader>
              <form onSubmit={handleSubmit} className="space-y-4">
                <div>
                  <Label htmlFor="miembroId">Miembro</Label>
                  <Select 
                    value={formData.miembroId.toString()} 
                    onValueChange={(value) => setFormData({ ...formData, miembroId: parseInt(value) })}
                  >
                    <SelectTrigger>
                      <SelectValue placeholder="Seleccionar miembro" />
                    </SelectTrigger>
                    <SelectContent>
                      {miembros.map(miembro => (
                        <SelectItem key={miembro.id} value={miembro.id.toString()}>
                          {miembro.nombre}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
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
                  <Label htmlFor="monto">Monto</Label>
                  <Input
                    id="monto"
                    type="number"
                    value={formData.monto || ""}
                    onChange={(e) => setFormData({ ...formData, monto: parseFloat(e.target.value) })}
                    required
                    min="0"
                    step="0.01"
                  />
                </div>
                <div>
                  <Label htmlFor="metodoPago">Método de Pago</Label>
                  <Select value={formData.metodoPago} onValueChange={(value) => setFormData({ ...formData, metodoPago: value })}>
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="Efectivo">Efectivo</SelectItem>
                      <SelectItem value="Tarjeta">Tarjeta</SelectItem>
                      <SelectItem value="Transferencia">Transferencia</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div>
                  <Label htmlFor="fecha">Fecha</Label>
                  <Input
                    id="fecha"
                    type="date"
                    value={formData.fecha}
                    onChange={(e) => setFormData({ ...formData, fecha: e.target.value })}
                    required
                  />
                </div>
                <div>
                  <Label htmlFor="estado">Estado</Label>
                  <Select value={formData.estado} onValueChange={(value) => setFormData({ ...formData, estado: value as any })}>
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="Pagado">Pagado</SelectItem>
                      <SelectItem value="Pendiente">Pendiente</SelectItem>
                      <SelectItem value="Vencido">Vencido</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <Button type="submit" className="w-full">
                  Registrar Pago
                </Button>
              </form>
            </DialogContent>
          </Dialog>
        </div>

        <div className="overflow-x-auto">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Fecha</TableHead>
                <TableHead>Miembro</TableHead>
                <TableHead>Membresía</TableHead>
                <TableHead>Monto</TableHead>
                <TableHead>Método</TableHead>
                <TableHead>Estado</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {pagosFiltrados.map((pago) => (
                <TableRow key={pago.id}>
                  <TableCell>{pago.fecha}</TableCell>
                  <TableCell>{pago.miembroNombre}</TableCell>
                  <TableCell>{pago.membresia}</TableCell>
                  <TableCell>${pago.monto}</TableCell>
                  <TableCell>{pago.metodoPago}</TableCell>
                  <TableCell>
                    <Badge 
                      variant={
                        pago.estado === "Pagado" ? "default" : 
                        pago.estado === "Pendiente" ? "secondary" : 
                        "destructive"
                      }
                    >
                      {pago.estado}
                    </Badge>
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
