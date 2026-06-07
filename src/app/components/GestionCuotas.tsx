import { useState } from "react";
import { Card } from "./ui/card";
import { Button } from "./ui/button";
import { Input } from "./ui/input";
import { Label } from "./ui/label";
import { Badge } from "./ui/badge";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "./ui/select";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "./ui/table";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "./ui/dialog";
import { Search, Plus, Edit, Download, AlertCircle } from "lucide-react";
import { Alert, AlertDescription } from "./ui/alert";

interface Cliente {
  id: number;
  nombreApellido: string;
  dni: string;
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

interface GestionCuotasProps {
  clientes: Cliente[];
  cuotas: Cuota[];
  onAgregarCuota: (cuota: Omit<Cuota, "id">) => void;
  onModificarCuota: (id: number, cuota: Omit<Cuota, "id">) => void;
}

export function GestionCuotas({ clientes, cuotas, onAgregarCuota, onModificarCuota }: GestionCuotasProps) {
  const [dialogAbierto, setDialogAbierto] = useState(false);
  const [busquedaCliente, setBusquedaCliente] = useState("");
  const [clienteSeleccionado, setClienteSeleccionado] = useState<Cliente | null>(null);
  const [filtroEstado, setFiltroEstado] = useState<string>("todos");
  const [cuotaEditando, setCuotaEditando] = useState<Cuota | null>(null);

  const [formData, setFormData] = useState({
    fechaPago: "",
    fechaVencimiento: "",
    monto: 35000, // Monto fijo
    medioPago: "Efectivo",
    estado: "Pendiente",
  });

  const resetForm = () => {
    setFormData({
      fechaPago: "",
      fechaVencimiento: "",
      monto: 35000, // Monto fijo
      medioPago: "Efectivo",
      estado: "Pendiente",
    });
    setClienteSeleccionado(null);
    setCuotaEditando(null);
  };

  const buscarCliente = () => {
    const cliente = clientes.find(c => c.dni === busquedaCliente || c.id.toString() === busquedaCliente);
    if (cliente) {
      setClienteSeleccionado(cliente);
    } else {
      alert("Cliente no encontrado");
    }
  };

  const handleRegistrarPago = () => {
    if (!clienteSeleccionado) {
      alert("Debe seleccionar un cliente");
      return;
    }

    const nuevaCuota = {
      clienteId: clienteSeleccionado.id,
      clienteNombre: clienteSeleccionado.nombreApellido,
      ...formData,
    };

    if (cuotaEditando) {
      onModificarCuota(cuotaEditando.id, nuevaCuota);
      alert("Cuota modificada exitosamente");
    } else {
      onAgregarCuota(nuevaCuota);
      alert("Pago registrado exitosamente");
    }

    resetForm();
    setDialogAbierto(false);
    setBusquedaCliente("");
  };

  const handleModificarEstado = (cuota: Cuota, nuevoEstado: "Pagado" | "Pendiente" | "Vencido") => {
    onModificarCuota(cuota.id, {
      clienteId: cuota.clienteId,
      clienteNombre: cuota.clienteNombre,
      fechaPago: cuota.fechaPago,
      fechaVencimiento: cuota.fechaVencimiento,
      monto: cuota.monto,
      medioPago: cuota.medioPago,
      estado: nuevoEstado,
    });
  };

  const handleEditarCuota = (cuota: Cuota) => {
    setCuotaEditando(cuota);
    const cliente = clientes.find(c => c.id === cuota.clienteId);
    if (cliente) {
      setClienteSeleccionado(cliente);
      setBusquedaCliente(cliente.dni);
    }
    setFormData({
      fechaPago: cuota.fechaPago,
      fechaVencimiento: cuota.fechaVencimiento,
      monto: cuota.monto,
      medioPago: cuota.medioPago,
      estado: cuota.estado,
    });
    setDialogAbierto(true);
  };

  const cuotasFiltradas = filtroEstado === "todos" 
    ? cuotas 
    : cuotas.filter(c => c.estado === filtroEstado);

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h2>Gestión de Cuotas</h2>
        
        <Dialog open={dialogAbierto} onOpenChange={setDialogAbierto}>
          <DialogTrigger asChild>
            <Button onClick={resetForm}>
              <Plus className="h-4 w-4 mr-2" />
              Registrar Pago
            </Button>
          </DialogTrigger>
          <DialogContent className="max-w-2xl">
            <DialogHeader>
              <DialogTitle>{cuotaEditando ? "Modificar Pago" : "Registrar Nuevo Pago"}</DialogTitle>
            </DialogHeader>
            
            <div className="space-y-4 mt-4">
              {/* Búsqueda de cliente */}
              <div className="space-y-2">
                <Label>Cliente</Label>
                <div className="flex gap-2">
                  <Input
                    placeholder="Ingresar DNI o ID del cliente"
                    value={busquedaCliente}
                    onChange={(e) => setBusquedaCliente(e.target.value)}
                    disabled={!!cuotaEditando}
                  />
                  <Button onClick={buscarCliente} disabled={!!cuotaEditando}>
                    <Search className="h-4 w-4" />
                  </Button>
                </div>
                {clienteSeleccionado && (
                  <Card className="p-3 bg-blue-50">
                    <p className="font-medium">{clienteSeleccionado.nombreApellido}</p>
                    <p className="text-sm text-gray-600">DNI: {clienteSeleccionado.dni}</p>
                    <p className="text-sm text-gray-600">ID: {clienteSeleccionado.id}</p>
                  </Card>
                )}
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <Label>Fecha de Pago</Label>
                  <Input
                    type="date"
                    value={formData.fechaPago}
                    onChange={(e) => setFormData({ ...formData, fechaPago: e.target.value })}
                  />
                </div>

                <div>
                  <Label>Fecha de Vencimiento</Label>
                  <Input
                    type="date"
                    value={formData.fechaVencimiento}
                    onChange={(e) => setFormData({ ...formData, fechaVencimiento: e.target.value })}
                  />
                </div>

                <div>
                  <Label>Monto</Label>
                  <div className="relative">
                    <Input
                      type="number"
                      value={formData.monto}
                      readOnly={!cuotaEditando}
                      onChange={(e) => setFormData({ ...formData, monto: parseFloat(e.target.value) || 0 })}
                      className={!cuotaEditando ? "bg-gray-100 cursor-not-allowed" : ""}
                    />
                    {!cuotaEditando && (
                      <p className="text-xs text-gray-500 mt-1">Monto fijo mensual</p>
                    )}
                  </div>
                </div>

                <div>
                  <Label>Medio de Pago</Label>
                  <Select value={formData.medioPago} onValueChange={(value) => setFormData({ ...formData, medioPago: value })}>
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="Efectivo">Efectivo</SelectItem>
                      <SelectItem value="Tarjeta de Débito">Tarjeta de Débito</SelectItem>
                      <SelectItem value="Tarjeta de Crédito">Tarjeta de Crédito</SelectItem>
                      <SelectItem value="Transferencia">Transferencia</SelectItem>
                      <SelectItem value="QR/Billetera Virtual">QR/Billetera Virtual</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div className="col-span-2">
                  <Label>Estado</Label>
                  <Select value={formData.estado} onValueChange={(value: "Pagado" | "Pendiente" | "Vencido") => setFormData({ ...formData, estado: value })}>
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
              </div>

              <Button onClick={handleRegistrarPago} className="w-full">
                {cuotaEditando ? "Guardar Cambios" : "Confirmar Registro"}
              </Button>
            </div>
          </DialogContent>
        </Dialog>
      </div>

      {/* Filtros */}
      <Card className="p-4">
        <div className="flex gap-4 items-center">
          <Label>Filtrar por Estado:</Label>
          <div className="flex gap-2">
            <Button
              variant={filtroEstado === "todos" ? "default" : "outline"}
              size="sm"
              onClick={() => setFiltroEstado("todos")}
            >
              Todos
            </Button>
            <Button
              variant={filtroEstado === "Pagado" ? "default" : "outline"}
              size="sm"
              onClick={() => setFiltroEstado("Pagado")}
            >
              Pagado
            </Button>
            <Button
              variant={filtroEstado === "Pendiente" ? "default" : "outline"}
              size="sm"
              onClick={() => setFiltroEstado("Pendiente")}
            >
              Pendiente
            </Button>
            <Button
              variant={filtroEstado === "Vencido" ? "default" : "outline"}
              size="sm"
              onClick={() => setFiltroEstado("Vencido")}
            >
              Vencido
            </Button>
          </div>
        </div>
      </Card>

      {/* Historial de Pagos */}
      <Card className="p-6">
        <h3 className="mb-4">Historial de Pagos</h3>
        <div className="overflow-x-auto">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>ID</TableHead>
                <TableHead>Cliente</TableHead>
                <TableHead>Fecha Pago</TableHead>
                <TableHead>Fecha Venc.</TableHead>
                <TableHead>Monto</TableHead>
                <TableHead>Medio</TableHead>
                <TableHead>Estado</TableHead>
                <TableHead>Acciones</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {cuotasFiltradas.length > 0 ? (
                cuotasFiltradas.map((cuota) => (
                  <TableRow key={cuota.id}>
                    <TableCell>{cuota.id}</TableCell>
                    <TableCell>{cuota.clienteNombre}</TableCell>
                    <TableCell>{cuota.fechaPago}</TableCell>
                    <TableCell>{cuota.fechaVencimiento}</TableCell>
                    <TableCell>${cuota.monto}</TableCell>
                    <TableCell>{cuota.medioPago}</TableCell>
                    <TableCell>
                      <Select
                        value={cuota.estado}
                        onValueChange={(value: "Pagado" | "Pendiente" | "Vencido") => handleModificarEstado(cuota, value)}
                      >
                        <SelectTrigger className="w-32">
                          <SelectValue />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="Pagado">Pagado</SelectItem>
                          <SelectItem value="Pendiente">Pendiente</SelectItem>
                          <SelectItem value="Vencido">Vencido</SelectItem>
                        </SelectContent>
                      </Select>
                    </TableCell>
                    <TableCell>
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={() => handleEditarCuota(cuota)}
                      >
                        <Edit className="h-4 w-4" />
                      </Button>
                    </TableCell>
                  </TableRow>
                ))
              ) : (
                <TableRow>
                  <TableCell colSpan={8} className="text-center text-gray-500 py-8">
                    No hay cuotas registradas
                  </TableCell>
                </TableRow>
              )}
            </TableBody>
          </Table>
        </div>
      </Card>

      {/* Resumen */}
      <div className="grid grid-cols-3 gap-4">
        <Card className="p-4">
          <div className="text-center">
            <p className="text-sm text-gray-600">Total Pagado</p>
            <p className="text-2xl">{cuotas.filter(c => c.estado === "Pagado").length}</p>
          </div>
        </Card>
        <Card className="p-4">
          <div className="text-center">
            <p className="text-sm text-gray-600">Pendientes</p>
            <p className="text-2xl text-yellow-600">{cuotas.filter(c => c.estado === "Pendiente").length}</p>
          </div>
        </Card>
        <Card className="p-4">
          <div className="text-center">
            <p className="text-sm text-gray-600">Vencidas</p>
            <p className="text-2xl text-red-600">{cuotas.filter(c => c.estado === "Vencido").length}</p>
          </div>
        </Card>
      </div>
    </div>
  );
}