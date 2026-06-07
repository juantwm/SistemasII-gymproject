import { useState } from "react";
import { Card } from "./ui/card";
import { Button } from "./ui/button";
import { Input } from "./ui/input";
import { Label } from "./ui/label";
import { Badge } from "./ui/badge";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "./ui/select";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "./ui/table";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "./ui/tabs";
import { Textarea } from "./ui/textarea";
import { AlertDialog, AlertDialogAction, AlertDialogCancel, AlertDialogContent, AlertDialogDescription, AlertDialogFooter, AlertDialogHeader, AlertDialogTitle } from "./ui/alert-dialog";
import { Search, Plus, Edit, Trash2, Eye } from "lucide-react";

interface Equipo {
  id: number;
  estado: "Activo" | "Inactivo" | "Mantenimiento";
  nombre: string;
  categoria: string;
  fechaIngreso: string;
  modelo: string;
  descripcion: string;
}

interface EquipoProps {
  equipos: Equipo[];
  onAgregarEquipo: (equipo: Omit<Equipo, "id">) => void;
  onModificarEquipo: (id: number, equipo: Omit<Equipo, "id">) => void;
  onEliminarEquipo: (id: number) => void;
}

export function Equipo({ equipos, onAgregarEquipo, onModificarEquipo, onEliminarEquipo }: EquipoProps) {
  const [tabActual, setTabActual] = useState("consultar");
  const [busqueda, setBusqueda] = useState("");
  const [equipoSeleccionado, setEquipoSeleccionado] = useState<Equipo | null>(null);
  const [mostrarTodos, setMostrarTodos] = useState(false);
  const [mostrarDialogBaja, setMostrarDialogBaja] = useState(false);

  const [formData, setFormData] = useState<Omit<Equipo, "id">>({
    estado: "Activo",
    nombre: "",
    categoria: "",
    fechaIngreso: "",
    modelo: "",
    descripcion: "",
  });

  const resetForm = () => {
    setFormData({
      estado: "Activo",
      nombre: "",
      categoria: "",
      fechaIngreso: "",
      modelo: "",
      descripcion: "",
    });
  };

  const buscarEquipo = (idONombre: string) => {
    const equipo = equipos.find(
      (e) => e.id.toString() === idONombre || e.nombre.toLowerCase().includes(idONombre.toLowerCase())
    );
    return equipo;
  };

  const handleBusquedaModificar = () => {
    const equipo = buscarEquipo(busqueda);
    if (equipo) {
      setEquipoSeleccionado(equipo);
      setFormData({
        estado: equipo.estado,
        nombre: equipo.nombre,
        categoria: equipo.categoria,
        fechaIngreso: equipo.fechaIngreso,
        modelo: equipo.modelo,
        descripcion: equipo.descripcion,
      });
    } else {
      alert("Equipo no encontrado");
    }
  };

  const handleBusquedaBaja = () => {
    const equipo = buscarEquipo(busqueda);
    if (equipo) {
      setEquipoSeleccionado(equipo);
    } else {
      alert("Equipo no encontrado");
    }
  };

  const handleBusquedaConsulta = () => {
    const equipo = buscarEquipo(busqueda);
    if (equipo) {
      setEquipoSeleccionado(equipo);
      setMostrarTodos(false);
    } else {
      alert("Equipo no encontrado");
    }
  };

  const handleConfirmarAlta = () => {
    onAgregarEquipo(formData);
    resetForm();
    alert("Equipo agregado exitosamente");
  };

  const handleConfirmarModificacion = () => {
    if (equipoSeleccionado) {
      onModificarEquipo(equipoSeleccionado.id, formData);
      setEquipoSeleccionado(null);
      setBusqueda("");
      resetForm();
      alert("Equipo modificado exitosamente");
    }
  };

  const handleConfirmarBaja = () => {
    if (equipoSeleccionado) {
      onEliminarEquipo(equipoSeleccionado.id);
      setEquipoSeleccionado(null);
      setBusqueda("");
      setMostrarDialogBaja(false);
      alert("Equipo dado de baja exitosamente");
    }
  };

  const equiposActivos = equipos.filter((e) => e.estado === "Activo");

  return (
    <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
      {/* Columna Izquierda - Lista de Equipos Activos */}
      <div className="lg:col-span-1">
        <Card className="p-4 sticky top-6">
          <h3 className="mb-4">Equipos Activos</h3>
          <div className="space-y-2 max-h-[calc(100vh-200px)] overflow-y-auto">
            {equiposActivos.map((equipo) => (
              <div
                key={equipo.id}
                className="p-3 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors"
              >
                <p className="font-medium text-sm">{equipo.nombre}</p>
                <p className="text-xs text-gray-600">Categoría: {equipo.categoria}</p>
                <Badge variant="secondary" className="mt-2 text-xs">
                  {equipo.modelo}
                </Badge>
              </div>
            ))}
          </div>
        </Card>
      </div>

      {/* Columna Derecha - Área de Trabajo */}
      <div className="lg:col-span-3">
        <Card className="p-6">
          <Tabs value={tabActual} onValueChange={setTabActual}>
            <TabsList className="grid w-full grid-cols-4 mb-6">
              <TabsTrigger value="consultar">
                <Eye className="h-4 w-4 mr-2" />
                Consultar
              </TabsTrigger>
              <TabsTrigger value="alta">
                <Plus className="h-4 w-4 mr-2" />
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

            {/* Consultar */}
            <TabsContent value="consultar" className="space-y-6">
              <div>
                <h2 className="mb-4">Consultar Equipos</h2>
                
                <div className="flex gap-4 mb-6">
                  <Button
                    onClick={() => {
                      setMostrarTodos(true);
                      setEquipoSeleccionado(null);
                    }}
                    className="flex-1"
                  >
                    Mostrar Todos los Equipos
                  </Button>
                  
                  <div className="flex-1 flex gap-2">
                    <Input
                      placeholder="Buscar por ID o Nombre"
                      value={busqueda}
                      onChange={(e) => setBusqueda(e.target.value)}
                    />
                    <Button onClick={handleBusquedaConsulta}>
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
                          <TableHead>Categoría</TableHead>
                          <TableHead>Modelo</TableHead>
                          <TableHead>Fecha Ingreso</TableHead>
                          <TableHead>Descripción</TableHead>
                        </TableRow>
                      </TableHeader>
                      <TableBody>
                        {equipos.map((equipo) => (
                          <TableRow key={equipo.id}>
                            <TableCell>
                              <Badge variant={equipo.estado === "Activo" ? "default" : equipo.estado === "Mantenimiento" ? "secondary" : "destructive"}>
                                {equipo.estado}
                              </Badge>
                            </TableCell>
                            <TableCell>{equipo.nombre}</TableCell>
                            <TableCell>{equipo.categoria}</TableCell>
                            <TableCell>{equipo.modelo}</TableCell>
                            <TableCell>{equipo.fechaIngreso}</TableCell>
                            <TableCell className="max-w-xs truncate">{equipo.descripcion}</TableCell>
                          </TableRow>
                        ))}
                      </TableBody>
                    </Table>
                  </div>
                )}

                {equipoSeleccionado && !mostrarTodos && (
                  <Card className="p-6 bg-gray-50">
                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <Label className="text-gray-600">Estado</Label>
                        <p className="font-medium">{equipoSeleccionado.estado}</p>
                      </div>
                      <div>
                        <Label className="text-gray-600">Nombre</Label>
                        <p className="font-medium">{equipoSeleccionado.nombre}</p>
                      </div>
                      <div>
                        <Label className="text-gray-600">Categoría</Label>
                        <p className="font-medium">{equipoSeleccionado.categoria}</p>
                      </div>
                      <div>
                        <Label className="text-gray-600">Modelo</Label>
                        <p className="font-medium">{equipoSeleccionado.modelo}</p>
                      </div>
                      <div>
                        <Label className="text-gray-600">Fecha de Ingreso</Label>
                        <p className="font-medium">{equipoSeleccionado.fechaIngreso}</p>
                      </div>
                      <div className="col-span-2">
                        <Label className="text-gray-600">Descripción</Label>
                        <p className="font-medium">{equipoSeleccionado.descripcion}</p>
                      </div>
                    </div>
                  </Card>
                )}
              </div>
            </TabsContent>

            {/* Alta */}
            <TabsContent value="alta" className="space-y-4">
              <h2 className="mb-4">Alta de Equipo</h2>
              
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <Label>Estado</Label>
                  <Select value={formData.estado} onValueChange={(value: "Activo" | "Inactivo" | "Mantenimiento") => setFormData({ ...formData, estado: value })}>
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="Activo">Activo</SelectItem>
                      <SelectItem value="Mantenimiento">Mantenimiento</SelectItem>
                      <SelectItem value="Inactivo">Inactivo</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div>
                  <Label>Nombre</Label>
                  <Input
                    value={formData.nombre}
                    onChange={(e) => setFormData({ ...formData, nombre: e.target.value })}
                  />
                </div>

                <div>
                  <Label>Categoría</Label>
                  <Select value={formData.categoria} onValueChange={(value) => setFormData({ ...formData, categoria: value })}>
                    <SelectTrigger>
                      <SelectValue placeholder="Seleccionar" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="Cardio">Cardio</SelectItem>
                      <SelectItem value="Fuerza">Fuerza</SelectItem>
                      <SelectItem value="Funcional">Funcional</SelectItem>
                      <SelectItem value="Pesas">Pesas</SelectItem>
                      <SelectItem value="Accesorios">Accesorios</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div>
                  <Label>Fecha de Ingreso</Label>
                  <Input
                    type="date"
                    value={formData.fechaIngreso}
                    onChange={(e) => setFormData({ ...formData, fechaIngreso: e.target.value })}
                  />
                </div>

                <div className="col-span-2">
                  <Label>Modelo</Label>
                  <Input
                    value={formData.modelo}
                    onChange={(e) => setFormData({ ...formData, modelo: e.target.value })}
                  />
                </div>

                <div className="col-span-2">
                  <Label>Descripción</Label>
                  <Textarea
                    value={formData.descripcion}
                    onChange={(e) => setFormData({ ...formData, descripcion: e.target.value })}
                    rows={3}
                  />
                </div>
              </div>

              <Button onClick={handleConfirmarAlta} className="w-full mt-6">
                Confirmar Alta
              </Button>
            </TabsContent>

            {/* Modificar */}
            <TabsContent value="modificar" className="space-y-6">
              <h2 className="mb-4">Modificar Equipo</h2>

              {!equipoSeleccionado ? (
                <div className="flex gap-2">
                  <Input
                    placeholder="Ingresar ID o Nombre del equipo"
                    value={busqueda}
                    onChange={(e) => setBusqueda(e.target.value)}
                  />
                  <Button onClick={handleBusquedaModificar}>
                    <Search className="h-4 w-4 mr-2" />
                    Buscar
                  </Button>
                </div>
              ) : (
                <div className="space-y-4">
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <Label>Estado</Label>
                      <Select value={formData.estado} onValueChange={(value: "Activo" | "Inactivo" | "Mantenimiento") => setFormData({ ...formData, estado: value })}>
                        <SelectTrigger>
                          <SelectValue />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="Activo">Activo</SelectItem>
                          <SelectItem value="Mantenimiento">Mantenimiento</SelectItem>
                          <SelectItem value="Inactivo">Inactivo</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>

                    <div>
                      <Label>Nombre</Label>
                      <Input
                        value={formData.nombre}
                        onChange={(e) => setFormData({ ...formData, nombre: e.target.value })}
                      />
                    </div>

                    <div>
                      <Label>Categoría</Label>
                      <Select value={formData.categoria} onValueChange={(value) => setFormData({ ...formData, categoria: value })}>
                        <SelectTrigger>
                          <SelectValue />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="Cardio">Cardio</SelectItem>
                          <SelectItem value="Fuerza">Fuerza</SelectItem>
                          <SelectItem value="Funcional">Funcional</SelectItem>
                          <SelectItem value="Pesas">Pesas</SelectItem>
                          <SelectItem value="Accesorios">Accesorios</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>

                    <div>
                      <Label>Fecha de Ingreso</Label>
                      <Input
                        type="date"
                        value={formData.fechaIngreso}
                        onChange={(e) => setFormData({ ...formData, fechaIngreso: e.target.value })}
                      />
                    </div>

                    <div className="col-span-2">
                      <Label>Modelo</Label>
                      <Input
                        value={formData.modelo}
                        onChange={(e) => setFormData({ ...formData, modelo: e.target.value })}
                      />
                    </div>

                    <div className="col-span-2">
                      <Label>Descripción</Label>
                      <Textarea
                        value={formData.descripcion}
                        onChange={(e) => setFormData({ ...formData, descripcion: e.target.value })}
                        rows={3}
                      />
                    </div>
                  </div>

                  <div className="flex gap-2">
                    <Button onClick={handleConfirmarModificacion} className="flex-1">
                      Confirmar Modificación
                    </Button>
                    <Button
                      variant="outline"
                      onClick={() => {
                        setEquipoSeleccionado(null);
                        setBusqueda("");
                        resetForm();
                      }}
                      className="flex-1"
                    >
                      Cancelar
                    </Button>
                  </div>
                </div>
              )}
            </TabsContent>

            {/* Baja */}
            <TabsContent value="baja" className="space-y-6">
              <h2 className="mb-4">Baja de Equipo</h2>

              {!equipoSeleccionado ? (
                <div className="flex gap-2">
                  <Input
                    placeholder="Ingresar ID o Nombre del equipo"
                    value={busqueda}
                    onChange={(e) => setBusqueda(e.target.value)}
                  />
                  <Button onClick={handleBusquedaBaja}>
                    <Search className="h-4 w-4 mr-2" />
                    Buscar
                  </Button>
                </div>
              ) : (
                <Card className="p-6 bg-gray-50">
                  <div className="grid grid-cols-2 gap-4 mb-6">
                    <div>
                      <Label className="text-gray-600">Nombre</Label>
                      <p className="font-medium">{equipoSeleccionado.nombre}</p>
                    </div>
                    <div>
                      <Label className="text-gray-600">Categoría</Label>
                      <p className="font-medium">{equipoSeleccionado.categoria}</p>
                    </div>
                    <div>
                      <Label className="text-gray-600">Modelo</Label>
                      <p className="font-medium">{equipoSeleccionado.modelo}</p>
                    </div>
                    <div>
                      <Label className="text-gray-600">Estado</Label>
                      <p className="font-medium">{equipoSeleccionado.estado}</p>
                    </div>
                  </div>

                  <div className="flex gap-2">
                    <Button
                      variant="destructive"
                      onClick={() => setMostrarDialogBaja(true)}
                      className="flex-1"
                    >
                      Confirmar Baja
                    </Button>
                    <Button
                      variant="outline"
                      onClick={() => {
                        setEquipoSeleccionado(null);
                        setBusqueda("");
                      }}
                      className="flex-1"
                    >
                      Cancelar
                    </Button>
                  </div>
                </Card>
              )}
            </TabsContent>
          </Tabs>
        </Card>
      </div>

      <AlertDialog open={mostrarDialogBaja} onOpenChange={setMostrarDialogBaja}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>¿Está seguro de que desea dar de baja este equipo?</AlertDialogTitle>
            <AlertDialogDescription>
              Equipo: {equipoSeleccionado?.nombre}<br />
              Modelo: {equipoSeleccionado?.modelo}<br />
              Esta acción no se puede deshacer.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>Cancelar</AlertDialogCancel>
            <AlertDialogAction onClick={handleConfirmarBaja} className="bg-red-600 hover:bg-red-700">
              Confirmar Baja
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </div>
  );
}
