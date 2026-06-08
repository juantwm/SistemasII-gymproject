import { useState } from "react";
import { Card } from "../../components/ui/card";
import { Button } from "../../components/ui/button";
import { Input } from "../../components/ui/input";
import { Label } from "../../components/ui/label";
import { Badge } from "../../components/ui/badge";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "../../components/ui/select";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "../../components/ui/table";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "../../components/ui/tabs";
import { AlertDialog, AlertDialogAction, AlertDialogCancel, AlertDialogContent, AlertDialogDescription, AlertDialogFooter, AlertDialogHeader, AlertDialogTitle } from "../../components/ui/alert-dialog";
import { Search, UserPlus, Edit, Trash2, Eye } from "lucide-react";

interface Cliente {
  id: number;
  estado: "Activo" | "Inactivo" | "Pendiente";
  nombreApellido: string;
  dni: string;
  direccion: string;
  telefono: string;
  mail: string;
  fechaNacimiento: string;
}

interface GestionClientesProps {
  clientes: Cliente[];
  onAgregarCliente: (cliente: Omit<Cliente, "id">) => void;
  onModificarCliente: (id: number, cliente: Omit<Cliente, "id">) => void;
  onEliminarCliente: (id: number) => void;
}

export function GestionClientes({ clientes, onAgregarCliente, onModificarCliente, onEliminarCliente }: GestionClientesProps) {
  const [tabActual, setTabActual] = useState("consultar");
  const [busqueda, setBusqueda] = useState("");
  const [clienteSeleccionado, setClienteSeleccionado] = useState<Cliente | null>(null);
  const [mostrarTodos, setMostrarTodos] = useState(false);
  const [mostrarDialogBaja, setMostrarDialogBaja] = useState(false);

  const [formData, setFormData] = useState<Omit<Cliente, "id">>({
    estado: "Activo",
    nombreApellido: "",
    dni: "",
    direccion: "",
    telefono: "",
    mail: "",
    fechaNacimiento: "",
  });

  const resetForm = () => {
    setFormData({
      estado: "Activo",
      nombreApellido: "",
      dni: "",
      direccion: "",
      telefono: "",
      mail: "",
      fechaNacimiento: "",
    });
  };

  const buscarCliente = (dni: string) => {
    const cliente = clientes.find((c) => c.dni === dni);
    return cliente;
  };

  const clientesActivos = clientes.filter((c) => c.estado === "Activo");

  return (
    <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
      <div className="lg:col-span-1">
        <Card className="p-4 sticky top-6">
          <h3 className="mb-4">Clientes Activos</h3>
          <div className="space-y-2 max-h-[calc(100vh-300px)] overflow-y-auto">
            {clientesActivos.map((cliente) => (
              <div key={cliente.id} className="p-3 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors">
                <p className="font-medium text-sm">{cliente.nombreApellido}</p>
                <p className="text-xs text-gray-600">DNI: {cliente.dni}</p>
                <p className="text-xs text-gray-600">ID: {cliente.id}</p>
              </div>
            ))}
          </div>
        </Card>
      </div>

      <div className="lg:col-span-3">
        <Tabs value={tabActual} onValueChange={setTabActual}>
          <TabsList className="grid w-full grid-cols-4 mb-6">
            <TabsTrigger value="consultar">
              <Eye className="h-4 w-4 mr-2" />
              Consultar
            </TabsTrigger>
            <TabsTrigger value="alta">
              <UserPlus className="h-4 w-4 mr-2" />
              Alta
            </TabsTrigger>
            <TabsTrigger value="modificar">
              <Edit className="h-4 w-4 mr-2" />
              Modificar
            </TabsTrigger>
            <TabsTrigger value="baja">
              <Trash2 className="h-4 w-4 mr-2" />
              Baja
            </TabsTrigger>
          </TabsList>

          <TabsContent value="consultar" className="space-y-6">
            <div>
              <h2 className="mb-4">Consultar Datos</h2>
              
              <div className="flex gap-4 mb-6">
                <Button
                  onClick={() => {
                    setMostrarTodos(true);
                    setClienteSeleccionado(null);
                  }}
                  className="flex-1"
                >
                  Mostrar Todos los Clientes
                </Button>
                
                <div className="flex-1 flex gap-2">
                  <Input
                    placeholder="Buscar por DNI"
                    value={busqueda}
                    onChange={(e) => setBusqueda(e.target.value)}
                  />
                  <Button onClick={() => {
                    const cliente = buscarCliente(busqueda);
                    if (cliente) {
                      setClienteSeleccionado(cliente);
                      setMostrarTodos(false);
                    } else {
                      alert("Cliente no encontrado");
                    }
                  }}>
                    <Search className="h-4 w-4" />
                  </Button>
                </div>
              </div>

              {mostrarTodos && (
                <div className="overflow-x-auto">
                  <Table>
                    <TableHeader>
                      <TableRow>
                        <TableHead>Estado</TableHead>
                        <TableHead>Nombre</TableHead>
                        <TableHead>DNI</TableHead>
                        <TableHead>Teléfono</TableHead>
                        <TableHead>Email</TableHead>
                        <TableHead>Fecha Nac.</TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {clientes.map((cliente) => (
                        <TableRow key={cliente.id}>
                          <TableCell>
                            <Badge variant={cliente.estado === "Activo" ? "default" : cliente.estado === "Pendiente" ? "secondary" : "destructive"}>
                              {cliente.estado}
                            </Badge>
                          </TableCell>
                          <TableCell>{cliente.nombreApellido}</TableCell>
                          <TableCell>{cliente.dni}</TableCell>
                          <TableCell>{cliente.telefono}</TableCell>
                          <TableCell>{cliente.mail}</TableCell>
                          <TableCell>{cliente.fechaNacimiento}</TableCell>
                        </TableRow>
                      ))}
                    </TableBody>
                  </Table>
                </div>
              )}

              {clienteSeleccionado && !mostrarTodos && (
                <Card className="p-6 bg-gray-50">
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <Label className="text-gray-600">Estado</Label>
                      <p className="font-medium">{clienteSeleccionado.estado}</p>
                    </div>
                    <div>
                      <Label className="text-gray-600">Nombre y Apellido</Label>
                      <p className="font-medium">{clienteSeleccionado.nombreApellido}</p>
                    </div>
                    <div>
                      <Label className="text-gray-600">DNI</Label>
                      <p className="font-medium">{clienteSeleccionado.dni}</p>
                    </div>
                    <div>
                      <Label className="text-gray-600">Dirección</Label>
                      <p className="font-medium">{clienteSeleccionado.direccion}</p>
                    </div>
                    <div>
                      <Label className="text-gray-600">Teléfono</Label>
                      <p className="font-medium">{clienteSeleccionado.telefono}</p>
                    </div>
                    <div>
                      <Label className="text-gray-600">Email</Label>
                      <p className="font-medium">{clienteSeleccionado.mail}</p>
                    </div>
                    <div>
                      <Label className="text-gray-600">Fecha de Nacimiento</Label>
                      <p className="font-medium">{clienteSeleccionado.fechaNacimiento}</p>
                    </div>
                    <div>
                      <Label className="text-gray-600">ID de Miembro</Label>
                      <p className="font-medium">{clienteSeleccionado.id}</p>
                    </div>
                  </div>
                </Card>
              )}
            </div>
          </TabsContent>

          <TabsContent value="alta" className="space-y-4">
            <h2 className="mb-4">Alta de Cliente</h2>
            
            <div className="grid grid-cols-2 gap-4">
              <div>
                <Label>Estado</Label>
                <Select value={formData.estado} onValueChange={(value: "Activo" | "Inactivo" | "Pendiente") => setFormData({ ...formData, estado: value })}>
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="Activo">Activo</SelectItem>
                    <SelectItem value="Pendiente">Pendiente</SelectItem>
                    <SelectItem value="Inactivo">Inactivo</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div>
                <Label>Nombre y Apellido</Label>
                <Input value={formData.nombreApellido} onChange={(e) => setFormData({ ...formData, nombreApellido: e.target.value })} />
              </div>

              <div>
                <Label>DNI</Label>
                <Input value={formData.dni} onChange={(e) => setFormData({ ...formData, dni: e.target.value })} />
              </div>

              <div>
                <Label>Fecha de Nacimiento</Label>
                <Input type="date" value={formData.fechaNacimiento} onChange={(e) => setFormData({ ...formData, fechaNacimiento: e.target.value })} />
              </div>

              <div className="col-span-2">
                <Label>Dirección</Label>
                <Input value={formData.direccion} onChange={(e) => setFormData({ ...formData, direccion: e.target.value })} />
              </div>

              <div>
                <Label>Teléfono</Label>
                <Input value={formData.telefono} onChange={(e) => setFormData({ ...formData, telefono: e.target.value })} />
              </div>

              <div>
                <Label>Email</Label>
                <Input type="email" value={formData.mail} onChange={(e) => setFormData({ ...formData, mail: e.target.value })} />
              </div>
            </div>

            <Button onClick={() => {
              onAgregarCliente(formData);
              resetForm();
              alert("Cliente agregado exitosamente");
            }} className="w-full mt-6">
              Confirmar Alta
            </Button>
          </TabsContent>

          <TabsContent value="modificar" className="space-y-6">
            <h2 className="mb-4">Modificar Cliente</h2>

            {!clienteSeleccionado ? (
              <div className="flex gap-2">
                <Input placeholder="Ingresar DNI" value={busqueda} onChange={(e) => setBusqueda(e.target.value)} />
                <Button onClick={() => {
                  const cliente = buscarCliente(busqueda);
                  if (cliente) {
                    setClienteSeleccionado(cliente);
                    setFormData({
                      estado: cliente.estado,
                      nombreApellido: cliente.nombreApellido,
                      dni: cliente.dni,
                      direccion: cliente.direccion,
                      telefono: cliente.telefono,
                      mail: cliente.mail,
                      fechaNacimiento: cliente.fechaNacimiento,
                    });
                  } else {
                    alert("Cliente no encontrado");
                  }
                }}>
                  <Search className="h-4 w-4 mr-2" />
                  Buscar
                </Button>
              </div>
            ) : (
              <div className="space-y-4">
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <Label>Estado</Label>
                    <Select value={formData.estado} onValueChange={(value: "Activo" | "Inactivo" | "Pendiente") => setFormData({ ...formData, estado: value })}>
                      <SelectTrigger>
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="Activo">Activo</SelectItem>
                        <SelectItem value="Pendiente">Pendiente</SelectItem>
                        <SelectItem value="Inactivo">Inactivo</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>

                  <div>
                    <Label>Nombre y Apellido</Label>
                    <Input value={formData.nombreApellido} onChange={(e) => setFormData({ ...formData, nombreApellido: e.target.value })} />
                  </div>

                  <div>
                    <Label>DNI</Label>
                    <Input value={formData.dni} onChange={(e) => setFormData({ ...formData, dni: e.target.value })} />
                  </div>

                  <div>
                    <Label>Fecha de Nacimiento</Label>
                    <Input type="date" value={formData.fechaNacimiento} onChange={(e) => setFormData({ ...formData, fechaNacimiento: e.target.value })} />
                  </div>

                  <div className="col-span-2">
                    <Label>Dirección</Label>
                    <Input value={formData.direccion} onChange={(e) => setFormData({ ...formData, direccion: e.target.value })} />
                  </div>

                  <div>
                    <Label>Teléfono</Label>
                    <Input value={formData.telefono} onChange={(e) => setFormData({ ...formData, telefono: e.target.value })} />
                  </div>

                  <div>
                    <Label>Email</Label>
                    <Input type="email" value={formData.mail} onChange={(e) => setFormData({ ...formData, mail: e.target.value })} />
                  </div>
                </div>

                <div className="flex gap-2">
                  <Button onClick={() => {
                    if (clienteSeleccionado) {
                      onModificarCliente(clienteSeleccionado.id, formData);
                      setClienteSeleccionado(null);
                      setBusqueda("");
                      resetForm();
                      alert("Cliente modificado exitosamente");
                    }
                  }} className="flex-1">
                    Confirmar Modificación
                  </Button>
                  <Button variant="outline" onClick={() => {
                    setClienteSeleccionado(null);
                    setBusqueda("");
                    resetForm();
                  }} className="flex-1">
                    Cancelar
                  </Button>
                </div>
              </div>
            )}
          </TabsContent>

          <TabsContent value="baja" className="space-y-6">
            <h2 className="mb-4">Baja de Cliente</h2>

            {!clienteSeleccionado ? (
              <div className="flex gap-2">
                <Input placeholder="Ingresar DNI" value={busqueda} onChange={(e) => setBusqueda(e.target.value)} />
                <Button onClick={() => {
                  const cliente = buscarCliente(busqueda);
                  if (cliente) {
                    setClienteSeleccionado(cliente);
                  } else {
                    alert("Cliente no encontrado");
                  }
                }}>
                  <Search className="h-4 w-4 mr-2" />
                  Buscar
                </Button>
              </div>
            ) : (
              <Card className="p-6 bg-gray-50">
                <div className="grid grid-cols-2 gap-4 mb-6">
                  <div>
                    <Label className="text-gray-600">Nombre y Apellido</Label>
                    <p className="font-medium">{clienteSeleccionado.nombreApellido}</p>
                  </div>
                  <div>
                    <Label className="text-gray-600">DNI</Label>
                    <p className="font-medium">{clienteSeleccionado.dni}</p>
                  </div>
                  <div>
                    <Label className="text-gray-600">ID de Miembro</Label>
                    <p className="font-medium">{clienteSeleccionado.id}</p>
                  </div>
                  <div>
                    <Label className="text-gray-600">Estado</Label>
                    <p className="font-medium">{clienteSeleccionado.estado}</p>
                  </div>
                </div>

                <div className="flex gap-2">
                  <Button variant="destructive" onClick={() => setMostrarDialogBaja(true)} className="flex-1">
                    Confirmar Baja
                  </Button>
                  <Button variant="outline" onClick={() => {
                    setClienteSeleccionado(null);
                    setBusqueda("");
                  }} className="flex-1">
                    Cancelar
                  </Button>
                </div>
              </Card>
            )}
          </TabsContent>
        </Tabs>
      </div>

      <AlertDialog open={mostrarDialogBaja} onOpenChange={setMostrarDialogBaja}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>¿Está seguro de que desea dar de baja a este cliente?</AlertDialogTitle>
            <AlertDialogDescription>
              Cliente: {clienteSeleccionado?.nombreApellido}<br />
              DNI: {clienteSeleccionado?.dni}<br />
              Esta acción no se puede deshacer.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>Cancelar</AlertDialogCancel>
            <AlertDialogAction onClick={() => {
              if (clienteSeleccionado) {
                onEliminarCliente(clienteSeleccionado.id);
                setClienteSeleccionado(null);
                setBusqueda("");
                setMostrarDialogBaja(false);
                alert("Cliente dado de baja exitosamente");
              }
            }} className="bg-red-600 hover:bg-red-700">
              Confirmar Baja
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </div>
  );
}
