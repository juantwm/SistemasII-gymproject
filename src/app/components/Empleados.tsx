import { useState } from "react";
import { Card } from "./ui/card";
import { Button } from "./ui/button";
import { Input } from "./ui/input";
import { Label } from "./ui/label";
import { Badge } from "./ui/badge";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "./ui/select";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "./ui/table";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "./ui/tabs";
import { AlertDialog, AlertDialogAction, AlertDialogCancel, AlertDialogContent, AlertDialogDescription, AlertDialogFooter, AlertDialogHeader, AlertDialogTitle } from "./ui/alert-dialog";
import { Search, UserPlus, Edit, Trash2, Eye, AlertCircle } from "lucide-react";
import { CredencialesDialog } from "./CredencialesDialog";
import { Alert, AlertDescription } from "./ui/alert";

interface Empleado {
  id: number;
  estado: "Activo" | "Inactivo";
  nombreApellido: string;
  dni: string;
  direccion: string;
  telefono: string;
  mail: string;
  estadoCivil: string;
  cantidadHijos: number;
  fechaNacimiento: string;
  rol: string;
  estadoLaboral: string;
  legajo: string;
}

interface EmpleadosProps {
  empleados: Empleado[];
  onAgregarEmpleado: (empleado: Omit<Empleado, "id">) => void;
  onModificarEmpleado: (id: number, empleado: Omit<Empleado, "id">) => void;
  onEliminarEmpleado: (id: number) => void;
  onGenerarCredenciales?: (empleado: Omit<Empleado, "id">) => { usuario: string; contraseña: string };
}

export function Empleados({ empleados, onAgregarEmpleado, onModificarEmpleado, onEliminarEmpleado, onGenerarCredenciales }: EmpleadosProps) {
  const [tabActual, setTabActual] = useState("consultar");
  const [busqueda, setBusqueda] = useState("");
  const [empleadoSeleccionado, setEmpleadoSeleccionado] = useState<Empleado | null>(null);
  const [mostrarTodos, setMostrarTodos] = useState(false);
  const [mostrarDialogBaja, setMostrarDialogBaja] = useState(false);
  const [mostrarCredenciales, setMostrarCredenciales] = useState(false);
  const [credencialesGeneradas, setCredencialesGeneradas] = useState({ usuario: "", contraseña: "", nombreEmpleado: "" });
  const [erroresValidacion, setErroresValidacion] = useState<string[]>([]);
  const [camposConError, setCamposConError] = useState<Set<string>>(new Set());
  const [errorDuplicado, setErrorDuplicado] = useState("");

  // Estado del formulario
  const [formData, setFormData] = useState<Omit<Empleado, "id">>({
    estado: "Activo",
    nombreApellido: "",
    dni: "",
    direccion: "",
    telefono: "",
    mail: "",
    estadoCivil: "",
    cantidadHijos: 0,
    fechaNacimiento: "",
    rol: "",
    estadoLaboral: "",
    legajo: "",
  });

  const resetForm = () => {
    setFormData({
      estado: "Activo",
      nombreApellido: "",
      dni: "",
      direccion: "",
      telefono: "",
      mail: "",
      estadoCivil: "",
      cantidadHijos: 0,
      fechaNacimiento: "",
      rol: "",
      estadoLaboral: "",
      legajo: "",
    });
    setErroresValidacion([]);
    setCamposConError(new Set());
    setErrorDuplicado("");
  };

  const buscarEmpleado = (dniOLegajo: string) => {
    const empleado = empleados.find(
      (e) => e.dni === dniOLegajo || e.legajo === dniOLegajo
    );
    return empleado;
  };

  const handleBusquedaModificar = () => {
    const empleado = buscarEmpleado(busqueda);
    if (empleado) {
      setEmpleadoSeleccionado(empleado);
      setFormData({
        estado: empleado.estado,
        nombreApellido: empleado.nombreApellido,
        dni: empleado.dni,
        direccion: empleado.direccion,
        telefono: empleado.telefono,
        mail: empleado.mail,
        estadoCivil: empleado.estadoCivil,
        cantidadHijos: empleado.cantidadHijos,
        fechaNacimiento: empleado.fechaNacimiento,
        rol: empleado.rol,
        estadoLaboral: empleado.estadoLaboral,
        legajo: empleado.legajo,
      });
    } else {
      alert("Empleado no encontrado");
    }
  };

  const handleBusquedaBaja = () => {
    const empleado = buscarEmpleado(busqueda);
    if (empleado) {
      setEmpleadoSeleccionado(empleado);
    } else {
      alert("Empleado no encontrado");
    }
  };

  const handleBusquedaConsulta = () => {
    const empleado = buscarEmpleado(busqueda);
    if (empleado) {
      setEmpleadoSeleccionado(empleado);
      setMostrarTodos(false);
    } else {
      alert("Empleado no encontrado");
    }
  };

  const handleConfirmarAlta = () => {
    const errores: string[] = [];
    const camposError: Set<string> = new Set();

    if (!formData.nombreApellido) {
      errores.push("El nombre y apellido son obligatorios.");
      camposError.add("nombreApellido");
    }

    if (!formData.dni) {
      errores.push("El DNI es obligatorio.");
      camposError.add("dni");
    } else if (!/^\d{8}$/.test(formData.dni)) {
      errores.push("El DNI debe ser un número de 8 dígitos.");
      camposError.add("dni");
    }

    if (!formData.legajo) {
      errores.push("El número de legajo es obligatorio.");
      camposError.add("legajo");
    } else if (!/^\d+$/.test(formData.legajo)) {
      errores.push("El número de legajo debe ser un número.");
      camposError.add("legajo");
    }

    if (!formData.mail) {
      errores.push("El email es obligatorio.");
      camposError.add("mail");
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.mail)) {
      errores.push("El email no es válido.");
      camposError.add("mail");
    }

    if (errores.length > 0) {
      setErroresValidacion(errores);
      setCamposConError(camposError);
      return;
    }

    const empleadoExistente = empleados.find(
      (e) => e.dni === formData.dni || e.legajo === formData.legajo
    );
    if (empleadoExistente) {
      setErrorDuplicado("Ya existe un empleado con el mismo DNI o número de legajo.");
      return;
    }

    onAgregarEmpleado(formData);
    
    // Generar credenciales
    const usuario = formData.nombreApellido;
    const contraseña = "casa123";
    setCredencialesGeneradas({
      usuario,
      contraseña,
      nombreEmpleado: formData.nombreApellido
    });
    
    resetForm();
    setMostrarCredenciales(true);
  };

  const handleConfirmarModificacion = () => {
    const errores: string[] = [];
    const camposError: Set<string> = new Set();

    if (!formData.nombreApellido) {
      errores.push("El nombre y apellido son obligatorios.");
      camposError.add("nombreApellido");
    }

    if (!formData.dni) {
      errores.push("El DNI es obligatorio.");
      camposError.add("dni");
    } else if (!/^\d{8}$/.test(formData.dni)) {
      errores.push("El DNI debe ser un número de 8 dígitos.");
      camposError.add("dni");
    }

    if (!formData.legajo) {
      errores.push("El número de legajo es obligatorio.");
      camposError.add("legajo");
    } else if (!/^\d+$/.test(formData.legajo)) {
      errores.push("El número de legajo debe ser un número.");
      camposError.add("legajo");
    }

    if (!formData.mail) {
      errores.push("El email es obligatorio.");
      camposError.add("mail");
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.mail)) {
      errores.push("El email no es válido.");
      camposError.add("mail");
    }

    if (errores.length > 0) {
      setErroresValidacion(errores);
      setCamposConError(camposError);
      return;
    }

    const empleadoExistente = empleados.find(
      (e) => e.dni === formData.dni || e.legajo === formData.legajo
    );
    if (empleadoExistente && empleadoExistente.id !== empleadoSeleccionado?.id) {
      setErrorDuplicado("Ya existe un empleado con el mismo DNI o número de legajo.");
      return;
    }

    if (empleadoSeleccionado) {
      onModificarEmpleado(empleadoSeleccionado.id, formData);
      setEmpleadoSeleccionado(null);
      setBusqueda("");
      resetForm();
      alert("Empleado modificado exitosamente");
    }
  };

  const handleConfirmarBaja = () => {
    if (empleadoSeleccionado) {
      onEliminarEmpleado(empleadoSeleccionado.id);
      setEmpleadoSeleccionado(null);
      setBusqueda("");
      setMostrarDialogBaja(false);
      alert("Empleado dado de baja exitosamente");
    }
  };

  const empleadosActivos = empleados.filter((e) => e.estado === "Activo");

  return (
    <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
      {/* Columna Izquierda - Lista de Empleados Activos */}
      <div className="lg:col-span-1">
        <Card className="p-4 sticky top-6">
          <h3 className="mb-4">Empleados Activos</h3>
          <div className="space-y-2 max-h-[calc(100vh-200px)] overflow-y-auto">
            {empleadosActivos.map((empleado) => (
              <div
                key={empleado.id}
                className="p-3 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors"
              >
                <p className="font-medium text-sm">{empleado.nombreApellido}</p>
                <p className="text-xs text-gray-600">DNI: {empleado.dni}</p>
                <p className="text-xs text-gray-600">Legajo: {empleado.legajo}</p>
                <Badge variant="secondary" className="mt-2 text-xs">
                  {empleado.rol}
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

            {/* Consultar */}
            <TabsContent value="consultar" className="space-y-6">
              <div>
                <h2 className="mb-4">Consultar Datos</h2>
                
                <div className="flex gap-4 mb-6">
                  <Button
                    onClick={() => {
                      setMostrarTodos(true);
                      setEmpleadoSeleccionado(null);
                    }}
                    className="flex-1"
                  >
                    Mostrar Todos los Empleados
                  </Button>
                  
                  <div className="flex-1 flex gap-2">
                    <Input
                      placeholder="Buscar por DNI / Nro de Legajo"
                      value={busqueda}
                      onChange={(e) => setBusqueda(e.target.value)}
                    />
                    <Button onClick={handleBusquedaConsulta}>
                      <Search className="h-4 w-4" />
                    </Button>
                  </div>
                </div>

                {/* Mostrar todos */}
                {mostrarTodos && (
                  <div className="overflow-x-auto">
                    <Table>
                      <TableHeader>
                        <TableRow>
                          <TableHead>Estado</TableHead>
                          <TableHead>Nombre</TableHead>
                          <TableHead>DNI</TableHead>
                          <TableHead>Legajo</TableHead>
                          <TableHead>Rol</TableHead>
                          <TableHead>Teléfono</TableHead>
                          <TableHead>Email</TableHead>
                        </TableRow>
                      </TableHeader>
                      <TableBody>
                        {empleados.map((empleado) => (
                          <TableRow key={empleado.id}>
                            <TableCell>
                              <Badge variant={empleado.estado === "Activo" ? "default" : "secondary"}>
                                {empleado.estado}
                              </Badge>
                            </TableCell>
                            <TableCell>{empleado.nombreApellido}</TableCell>
                            <TableCell>{empleado.dni}</TableCell>
                            <TableCell>{empleado.legajo}</TableCell>
                            <TableCell>{empleado.rol}</TableCell>
                            <TableCell>{empleado.telefono}</TableCell>
                            <TableCell>{empleado.mail}</TableCell>
                          </TableRow>
                        ))}
                      </TableBody>
                    </Table>
                  </div>
                )}

                {/* Mostrar empleado individual */}
                {empleadoSeleccionado && !mostrarTodos && (
                  <Card className="p-6 bg-gray-50">
                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <Label className="text-gray-600">Estado</Label>
                        <p className="font-medium">{empleadoSeleccionado.estado}</p>
                      </div>
                      <div>
                        <Label className="text-gray-600">Nombre y Apellido</Label>
                        <p className="font-medium">{empleadoSeleccionado.nombreApellido}</p>
                      </div>
                      <div>
                        <Label className="text-gray-600">DNI</Label>
                        <p className="font-medium">{empleadoSeleccionado.dni}</p>
                      </div>
                      <div>
                        <Label className="text-gray-600">Legajo</Label>
                        <p className="font-medium">{empleadoSeleccionado.legajo}</p>
                      </div>
                      <div>
                        <Label className="text-gray-600">Dirección</Label>
                        <p className="font-medium">{empleadoSeleccionado.direccion}</p>
                      </div>
                      <div>
                        <Label className="text-gray-600">Teléfono</Label>
                        <p className="font-medium">{empleadoSeleccionado.telefono}</p>
                      </div>
                      <div>
                        <Label className="text-gray-600">Email</Label>
                        <p className="font-medium">{empleadoSeleccionado.mail}</p>
                      </div>
                      <div>
                        <Label className="text-gray-600">Estado Civil</Label>
                        <p className="font-medium">{empleadoSeleccionado.estadoCivil}</p>
                      </div>
                      <div>
                        <Label className="text-gray-600">Cantidad de Hijos</Label>
                        <p className="font-medium">{empleadoSeleccionado.cantidadHijos}</p>
                      </div>
                      <div>
                        <Label className="text-gray-600">Fecha de Nacimiento</Label>
                        <p className="font-medium">{empleadoSeleccionado.fechaNacimiento}</p>
                      </div>
                      <div>
                        <Label className="text-gray-600">Rol</Label>
                        <p className="font-medium">{empleadoSeleccionado.rol}</p>
                      </div>
                      <div>
                        <Label className="text-gray-600">Estado Laboral</Label>
                        <p className="font-medium">{empleadoSeleccionado.estadoLaboral}</p>
                      </div>
                    </div>
                  </Card>
                )}
              </div>
            </TabsContent>

            {/* Alta */}
            <TabsContent value="alta" className="space-y-4">
              <h2 className="mb-4">Alta de Empleado</h2>
              
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <Label>Estado</Label>
                  <Select value={formData.estado} onValueChange={(value: "Activo" | "Inactivo") => setFormData({ ...formData, estado: value })}>
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="Activo">Activo</SelectItem>
                      <SelectItem value="Inactivo">Inactivo</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div>
                  <Label>Nombre y Apellido</Label>
                  <Input
                    value={formData.nombreApellido}
                    onChange={(e) => setFormData({ ...formData, nombreApellido: e.target.value })}
                    className={camposConError.has("nombreApellido") ? "border-red-500" : ""}
                  />
                </div>

                <div>
                  <Label>DNI</Label>
                  <Input
                    value={formData.dni}
                    onChange={(e) => setFormData({ ...formData, dni: e.target.value })}
                    className={camposConError.has("dni") ? "border-red-500" : ""}
                  />
                </div>

                <div>
                  <Label>Nro de Legajo</Label>
                  <Input
                    value={formData.legajo}
                    onChange={(e) => setFormData({ ...formData, legajo: e.target.value })}
                    className={camposConError.has("legajo") ? "border-red-500" : ""}
                  />
                </div>

                <div className="col-span-2">
                  <Label>Dirección</Label>
                  <Input
                    value={formData.direccion}
                    onChange={(e) => setFormData({ ...formData, direccion: e.target.value })}
                  />
                </div>

                <div>
                  <Label>Teléfono</Label>
                  <Input
                    value={formData.telefono}
                    onChange={(e) => setFormData({ ...formData, telefono: e.target.value })}
                  />
                </div>

                <div>
                  <Label>Email</Label>
                  <Input
                    type="email"
                    value={formData.mail}
                    onChange={(e) => setFormData({ ...formData, mail: e.target.value })}
                    className={camposConError.has("mail") ? "border-red-500" : ""}
                  />
                </div>

                <div>
                  <Label>Estado Civil</Label>
                  <Select value={formData.estadoCivil} onValueChange={(value) => setFormData({ ...formData, estadoCivil: value })}>
                    <SelectTrigger>
                      <SelectValue placeholder="Seleccionar" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="Soltero/a">Soltero/a</SelectItem>
                      <SelectItem value="Casado/a">Casado/a</SelectItem>
                      <SelectItem value="Divorciado/a">Divorciado/a</SelectItem>
                      <SelectItem value="Viudo/a">Viudo/a</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div>
                  <Label>Cantidad de Hijos</Label>
                  <Input
                    type="number"
                    value={formData.cantidadHijos}
                    onChange={(e) => setFormData({ ...formData, cantidadHijos: parseInt(e.target.value) || 0 })}
                  />
                </div>

                <div>
                  <Label>Fecha de Nacimiento</Label>
                  <Input
                    type="date"
                    value={formData.fechaNacimiento}
                    onChange={(e) => setFormData({ ...formData, fechaNacimiento: e.target.value })}
                  />
                </div>

                <div>
                  <Label>Rol</Label>
                  <Select value={formData.rol} onValueChange={(value) => setFormData({ ...formData, rol: value })}>
                    <SelectTrigger>
                      <SelectValue placeholder="Seleccionar" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="Recepcionista">Recepcionista</SelectItem>
                      <SelectItem value="Administrativo">Administrativo</SelectItem>
                      <SelectItem value="Limpieza">Limpieza</SelectItem>
                      <SelectItem value="Instructor">Instructor</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div>
                  <Label>Estado Laboral</Label>
                  <Select value={formData.estadoLaboral} onValueChange={(value) => setFormData({ ...formData, estadoLaboral: value })}>
                    <SelectTrigger>
                      <SelectValue placeholder="Seleccionar" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="Activo">Activo</SelectItem>
                      <SelectItem value="Licencia">Licencia</SelectItem>
                      <SelectItem value="Suspendido">Suspendido</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>

              {erroresValidacion.length > 0 && (
                <Alert variant="destructive">
                  <AlertCircle className="h-4 w-4" />
                  <AlertDescription>
                    {erroresValidacion.map((error, index) => (
                      <p key={index}>{error}</p>
                    ))}
                    {errorDuplicado && <p>{errorDuplicado}</p>}
                  </AlertDescription>
                </Alert>
              )}

              <Button onClick={handleConfirmarAlta} className="w-full mt-6">
                Confirmar Alta
              </Button>
            </TabsContent>

            {/* Modificar */}
            <TabsContent value="modificar" className="space-y-6">
              <h2 className="mb-4">Modificar Empleado</h2>

              {!empleadoSeleccionado ? (
                <div className="flex gap-2">
                  <Input
                    placeholder="Ingresar DNI o Nro de Legajo"
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
                      <Select value={formData.estado} onValueChange={(value: "Activo" | "Inactivo") => setFormData({ ...formData, estado: value })}>
                        <SelectTrigger>
                          <SelectValue />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="Activo">Activo</SelectItem>
                          <SelectItem value="Inactivo">Inactivo</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>

                    <div>
                      <Label>Nombre y Apellido</Label>
                      <Input
                        value={formData.nombreApellido}
                        onChange={(e) => setFormData({ ...formData, nombreApellido: e.target.value })}
                        className={camposConError.has("nombreApellido") ? "border-red-500" : ""}
                      />
                    </div>

                    <div>
                      <Label>DNI</Label>
                      <Input
                        value={formData.dni}
                        onChange={(e) => setFormData({ ...formData, dni: e.target.value })}
                        className={camposConError.has("dni") ? "border-red-500" : ""}
                      />
                    </div>

                    <div>
                      <Label>Nro de Legajo</Label>
                      <Input
                        value={formData.legajo}
                        onChange={(e) => setFormData({ ...formData, legajo: e.target.value })}
                        className={camposConError.has("legajo") ? "border-red-500" : ""}
                      />
                    </div>

                    <div className="col-span-2">
                      <Label>Dirección</Label>
                      <Input
                        value={formData.direccion}
                        onChange={(e) => setFormData({ ...formData, direccion: e.target.value })}
                      />
                    </div>

                    <div>
                      <Label>Teléfono</Label>
                      <Input
                        value={formData.telefono}
                        onChange={(e) => setFormData({ ...formData, telefono: e.target.value })}
                      />
                    </div>

                    <div>
                      <Label>Email</Label>
                      <Input
                        type="email"
                        value={formData.mail}
                        onChange={(e) => setFormData({ ...formData, mail: e.target.value })}
                        className={camposConError.has("mail") ? "border-red-500" : ""}
                      />
                    </div>

                    <div>
                      <Label>Estado Civil</Label>
                      <Select value={formData.estadoCivil} onValueChange={(value) => setFormData({ ...formData, estadoCivil: value })}>
                        <SelectTrigger>
                          <SelectValue />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="Soltero/a">Soltero/a</SelectItem>
                          <SelectItem value="Casado/a">Casado/a</SelectItem>
                          <SelectItem value="Divorciado/a">Divorciado/a</SelectItem>
                          <SelectItem value="Viudo/a">Viudo/a</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>

                    <div>
                      <Label>Cantidad de Hijos</Label>
                      <Input
                        type="number"
                        value={formData.cantidadHijos}
                        onChange={(e) => setFormData({ ...formData, cantidadHijos: parseInt(e.target.value) || 0 })}
                      />
                    </div>

                    <div>
                      <Label>Fecha de Nacimiento</Label>
                      <Input
                        type="date"
                        value={formData.fechaNacimiento}
                        onChange={(e) => setFormData({ ...formData, fechaNacimiento: e.target.value })}
                      />
                    </div>

                    <div>
                      <Label>Rol</Label>
                      <Select value={formData.rol} onValueChange={(value) => setFormData({ ...formData, rol: value })}>
                        <SelectTrigger>
                          <SelectValue />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="Recepcionista">Recepcionista</SelectItem>
                          <SelectItem value="Administrativo">Administrativo</SelectItem>
                          <SelectItem value="Limpieza">Limpieza</SelectItem>
                          <SelectItem value="Instructor">Instructor</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>

                    <div>
                      <Label>Estado Laboral</Label>
                      <Select value={formData.estadoLaboral} onValueChange={(value) => setFormData({ ...formData, estadoLaboral: value })}>
                        <SelectTrigger>
                          <SelectValue />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="Activo">Activo</SelectItem>
                          <SelectItem value="Licencia">Licencia</SelectItem>
                          <SelectItem value="Suspendido">Suspendido</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                  </div>

                  {erroresValidacion.length > 0 && (
                    <Alert variant="destructive">
                      <AlertCircle className="h-4 w-4" />
                      <AlertDescription>
                        {erroresValidacion.map((error, index) => (
                          <p key={index}>{error}</p>
                        ))}
                        {errorDuplicado && <p>{errorDuplicado}</p>}
                      </AlertDescription>
                    </Alert>
                  )}

                  <div className="flex gap-2">
                    <Button onClick={handleConfirmarModificacion} className="flex-1">
                      Confirmar Modificación
                    </Button>
                    <Button
                      variant="outline"
                      onClick={() => {
                        setEmpleadoSeleccionado(null);
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
              <h2 className="mb-4">Baja de Empleado</h2>

              {!empleadoSeleccionado ? (
                <div className="flex gap-2">
                  <Input
                    placeholder="Ingresar DNI o Nro de Legajo"
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
                      <Label className="text-gray-600">Nombre y Apellido</Label>
                      <p className="font-medium">{empleadoSeleccionado.nombreApellido}</p>
                    </div>
                    <div>
                      <Label className="text-gray-600">DNI</Label>
                      <p className="font-medium">{empleadoSeleccionado.dni}</p>
                    </div>
                    <div>
                      <Label className="text-gray-600">Legajo</Label>
                      <p className="font-medium">{empleadoSeleccionado.legajo}</p>
                    </div>
                    <div>
                      <Label className="text-gray-600">Rol</Label>
                      <p className="font-medium">{empleadoSeleccionado.rol}</p>
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
                        setEmpleadoSeleccionado(null);
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

      {/* Dialog de confirmación de baja */}
      <AlertDialog open={mostrarDialogBaja} onOpenChange={setMostrarDialogBaja}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>¿Está seguro de que desea dar de baja a este empleado?</AlertDialogTitle>
            <AlertDialogDescription>
              Empleado: {empleadoSeleccionado?.nombreApellido}<br />
              DNI: {empleadoSeleccionado?.dni}<br />
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

      {/* Dialog de credenciales */}
      <CredencialesDialog
        open={mostrarCredenciales}
        onOpenChange={setMostrarCredenciales}
        nombreEmpleado={credencialesGeneradas.nombreEmpleado}
        usuario={credencialesGeneradas.usuario}
        contraseña={credencialesGeneradas.contraseña}
      />
    </div>
  );
}