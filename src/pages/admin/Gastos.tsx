import { useState } from "react";
import { Card } from "../../components/ui/card";
import { Button } from "../../components/ui/button";
import { Input } from "../../components/ui/input";
import { Label } from "../../components/ui/label";
import { Badge } from "../../components/ui/badge";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "../../components/ui/select";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "../../components/ui/table";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "../../components/ui/tabs";
import { Textarea } from "../../components/ui/textarea";
import { AlertDialog, AlertDialogAction, AlertDialogCancel, AlertDialogContent, AlertDialogDescription, AlertDialogFooter, AlertDialogHeader, AlertDialogTitle } from "../../components/ui/alert-dialog";
import { Search, Plus, Edit, Trash2, Eye, Download } from "lucide-react";
import { ReceiptDownload } from "../client/ReceiptDownload";

interface Gasto {
  id: number;
  estado: "Activo" | "Inactivo";
  nroFactura: string;
  fecha: string;
  concepto: string;
  monto: number;
  categoria: string;
  observaciones: string;
}

interface GastosProps {
  gastos: Gasto[];
  onAgregarGasto: (gasto: Omit<Gasto, "id">) => void;
  onModificarGasto: (id: number, gasto: Omit<Gasto, "id">) => void;
  onEliminarGasto: (id: number) => void;
}

export function Gastos({ gastos, onAgregarGasto, onModificarGasto, onEliminarGasto }: GastosProps) {
  const [tabActual, setTabActual] = useState("consultar");
  const [busqueda, setBusqueda] = useState("");
  const [gastoSeleccionado, setGastoSeleccionado] = useState<Gasto | null>(null);
  const [mostrarTodos, setMostrarTodos] = useState(false);
  const [mostrarDialogBaja, setMostrarDialogBaja] = useState(false);

  const [formData, setFormData] = useState<Omit<Gasto, "id">>({
    estado: "Activo",
    nroFactura: "",
    fecha: "",
    concepto: "",
    monto: 0,
    categoria: "",
    observaciones: "",
  });

  const resetForm = () => {
    setFormData({
      estado: "Activo",
      nroFactura: "",
      fecha: "",
      concepto: "",
      monto: 0,
      categoria: "",
      observaciones: "",
    });
  };

  const buscarGasto = (nroFactura: string) => {
    const gasto = gastos.find((g) => g.nroFactura === nroFactura);
    return gasto;
  };

  const gastosActivos = gastos.filter((g) => g.estado === "Activo");

  return (
    <div className="grid grid-cols-1 lg:grid-cols-4 gap-4 md:gap-6">
      <div className="lg:col-span-1 order-2 lg:order-1">
        <Card className="p-4 lg:sticky lg:top-6">
          <h3 className="mb-4">Gastos Recientes</h3>
          <div className="space-y-2 max-h-[calc(100vh-200px)] overflow-y-auto">
            {gastosActivos.slice(0, 10).map((gasto) => (
              <div key={gasto.id} className="p-3 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors">
                <p className="font-medium text-sm">{gasto.concepto}</p>
                <p className="text-xs text-gray-600">Factura: {gasto.nroFactura}</p>
                <p className="text-xs text-gray-600">${gasto.monto}</p>
                <Badge variant="secondary" className="mt-2 text-xs">
                  {gasto.categoria}
                </Badge>
              </div>
            ))}
          </div>
        </Card>
      </div>

      <div className="lg:col-span-3 order-1 lg:order-2">
        <Card className="p-4 md:p-6">
          <Tabs value={tabActual} onValueChange={setTabActual}>
            <TabsList className="grid w-full grid-cols-2 md:grid-cols-4 mb-4 md:mb-6 h-auto gap-1">
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

            <TabsContent value="consultar" className="space-y-6">
              <div>
                <h2 className="mb-4">Consultar Gastos</h2>
                
                <div className="flex flex-col sm:flex-row gap-3 md:gap-4 mb-4 md:mb-6">
                  <Button
                    onClick={() => {
                      setMostrarTodos(true);
                      setGastoSeleccionado(null);
                    }}
                    className="w-full sm:flex-1"
                  >
                    Mostrar Todos los Gastos
                  </Button>
                  
                  <div className="w-full sm:flex-1 flex gap-2">
                    <Input
                      placeholder="Buscar por Nro de Factura"
                      value={busqueda}
                      onChange={(e) => setBusqueda(e.target.value)}
                    />
                    <Button onClick={() => {
                      const gasto = buscarGasto(busqueda);
                      if (gasto) {
                        setGastoSeleccionado(gasto);
                        setMostrarTodos(false);
                      } else {
                        alert("Gasto no encontrado");
                      }
                    }}>
                      <Search className="h-4 w-4" />
                    </Button>
                  </div>
                </div>

                {mostrarTodos && (
                  <>
                    <div className="md:hidden space-y-3">
                      {gastos.map((gasto) => (
                        <Card key={gasto.id} className="p-4">
                          <div className="flex items-start justify-between gap-2 mb-2">
                            <p className="font-medium">{gasto.concepto}</p>
                            <Badge variant={gasto.estado === "Activo" ? "default" : "secondary"}>
                              {gasto.estado}
                            </Badge>
                          </div>
                          <div className="grid grid-cols-2 gap-2 text-sm text-gray-600 mb-3">
                            <p><span className="text-gray-400">Factura:</span> {gasto.nroFactura}</p>
                            <p><span className="text-gray-400">Fecha:</span> {gasto.fecha}</p>
                            <p><span className="text-gray-400">Categoría:</span> {gasto.categoria}</p>
                            <p className="font-semibold text-gray-900">${gasto.monto}</p>
                          </div>
                          <ReceiptDownload gasto={gasto} />
                        </Card>
                      ))}
                    </div>
                    <div className="hidden md:block overflow-x-auto">
                      <Table>
                        <TableHeader>
                          <TableRow>
                            <TableHead>Factura</TableHead>
                            <TableHead>Fecha</TableHead>
                            <TableHead>Concepto</TableHead>
                            <TableHead>Categoría</TableHead>
                            <TableHead>Monto</TableHead>
                            <TableHead>Estado</TableHead>
                            <TableHead>Acción</TableHead>
                          </TableRow>
                        </TableHeader>
                        <TableBody>
                          {gastos.map((gasto) => (
                            <TableRow key={gasto.id}>
                              <TableCell>{gasto.nroFactura}</TableCell>
                              <TableCell>{gasto.fecha}</TableCell>
                              <TableCell>{gasto.concepto}</TableCell>
                              <TableCell>{gasto.categoria}</TableCell>
                              <TableCell>${gasto.monto}</TableCell>
                              <TableCell>
                                <Badge variant={gasto.estado === "Activo" ? "default" : "secondary"}>
                                  {gasto.estado}
                                </Badge>
                              </TableCell>
                              <TableCell>
                                <ReceiptDownload gasto={gasto} />
                              </TableCell>
                            </TableRow>
                          ))}
                        </TableBody>
                      </Table>
                    </div>
                  </>
                )}

                {gastoSeleccionado && !mostrarTodos && (
                  <Card className="p-6 bg-gray-50">
                    <div className="flex justify-between items-start mb-4">
                      <h3>Detalle del Gasto</h3>
                      <ReceiptDownload gasto={gastoSeleccionado} />
                    </div>
                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <Label className="text-gray-600">Nro de Factura</Label>
                        <p className="font-medium">{gastoSeleccionado.nroFactura}</p>
                      </div>
                      <div>
                        <Label className="text-gray-600">Fecha</Label>
                        <p className="font-medium">{gastoSeleccionado.fecha}</p>
                      </div>
                      <div>
                        <Label className="text-gray-600">Concepto</Label>
                        <p className="font-medium">{gastoSeleccionado.concepto}</p>
                      </div>
                      <div>
                        <Label className="text-gray-600">Monto</Label>
                        <p className="font-medium">${gastoSeleccionado.monto}</p>
                      </div>
                      <div>
                        <Label className="text-gray-600">Categoría</Label>
                        <p className="font-medium">{gastoSeleccionado.categoria}</p>
                      </div>
                      <div>
                        <Label className="text-gray-600">Estado</Label>
                        <p className="font-medium">{gastoSeleccionado.estado}</p>
                      </div>
                      <div className="col-span-2">
                        <Label className="text-gray-600">Observaciones</Label>
                        <p className="font-medium">{gastoSeleccionado.observaciones || "Sin observaciones"}</p>
                      </div>
                    </div>
                  </Card>
                )}
              </div>
            </TabsContent>

            <TabsContent value="alta" className="space-y-4">
              <h2 className="mb-4">Alta de Gasto</h2>
              
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
                  <Label>Nro de Factura</Label>
                  <Input value={formData.nroFactura} onChange={(e) => setFormData({ ...formData, nroFactura: e.target.value })} />
                </div>

                <div>
                  <Label>Fecha</Label>
                  <Input type="date" value={formData.fecha} onChange={(e) => setFormData({ ...formData, fecha: e.target.value })} />
                </div>

                <div>
                  <Label>Monto</Label>
                  <Input type="number" value={formData.monto} onChange={(e) => setFormData({ ...formData, monto: parseFloat(e.target.value) || 0 })} />
                </div>

                <div className="col-span-2">
                  <Label>Concepto</Label>
                  <Input value={formData.concepto} onChange={(e) => setFormData({ ...formData, concepto: e.target.value })} />
                </div>

                <div className="col-span-2">
                  <Label>Categoría</Label>
                  <Select value={formData.categoria} onValueChange={(value) => setFormData({ ...formData, categoria: value })}>
                    <SelectTrigger>
                      <SelectValue placeholder="Seleccionar" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="Servicios">Servicios</SelectItem>
                      <SelectItem value="Mantenimiento">Mantenimiento</SelectItem>
                      <SelectItem value="Equipamiento">Equipamiento</SelectItem>
                      <SelectItem value="Personal">Personal</SelectItem>
                      <SelectItem value="Impuestos">Impuestos</SelectItem>
                      <SelectItem value="Otros">Otros</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div className="col-span-2">
                  <Label>Observaciones</Label>
                  <Textarea value={formData.observaciones} onChange={(e) => setFormData({ ...formData, observaciones: e.target.value })} rows={3} />
                </div>
              </div>

              <Button onClick={() => {
                onAgregarGasto(formData);
                resetForm();
                alert("Gasto agregado exitosamente");
              }} className="w-full mt-6">
                Confirmar Alta
              </Button>
            </TabsContent>

            <TabsContent value="modificar" className="space-y-6">
              <h2 className="mb-4">Modificar Gasto</h2>

              {!gastoSeleccionado ? (
                <div className="flex gap-2">
                  <Input
                    placeholder="Ingresar Nro de Factura"
                    value={busqueda}
                    onChange={(e) => setBusqueda(e.target.value)}
                  />
                  <Button onClick={() => {
                    const gasto = buscarGasto(busqueda);
                    if (gasto) {
                      setGastoSeleccionado(gasto);
                      setFormData({
                        estado: gasto.estado,
                        nroFactura: gasto.nroFactura,
                        fecha: gasto.fecha,
                        concepto: gasto.concepto,
                        monto: gasto.monto,
                        categoria: gasto.categoria,
                        observaciones: gasto.observaciones,
                      });
                    } else {
                      alert("Gasto no encontrado");
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
                      <Label>Nro de Factura</Label>
                      <Input value={formData.nroFactura} onChange={(e) => setFormData({ ...formData, nroFactura: e.target.value })} />
                    </div>

                    <div>
                      <Label>Fecha</Label>
                      <Input type="date" value={formData.fecha} onChange={(e) => setFormData({ ...formData, fecha: e.target.value })} />
                    </div>

                    <div>
                      <Label>Monto</Label>
                      <Input type="number" value={formData.monto} onChange={(e) => setFormData({ ...formData, monto: parseFloat(e.target.value) || 0 })} />
                    </div>

                    <div className="col-span-2">
                      <Label>Concepto</Label>
                      <Input value={formData.concepto} onChange={(e) => setFormData({ ...formData, concepto: e.target.value })} />
                    </div>

                    <div className="col-span-2">
                      <Label>Categoría</Label>
                      <Select value={formData.categoria} onValueChange={(value) => setFormData({ ...formData, categoria: value })}>
                        <SelectTrigger>
                          <SelectValue />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="Servicios">Servicios</SelectItem>
                          <SelectItem value="Mantenimiento">Mantenimiento</SelectItem>
                          <SelectItem value="Equipamiento">Equipamiento</SelectItem>
                          <SelectItem value="Personal">Personal</SelectItem>
                          <SelectItem value="Impuestos">Impuestos</SelectItem>
                          <SelectItem value="Otros">Otros</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>

                    <div className="col-span-2">
                      <Label>Observaciones</Label>
                      <Textarea value={formData.observaciones} onChange={(e) => setFormData({ ...formData, observaciones: e.target.value })} rows={3} />
                    </div>
                  </div>

                  <div className="flex gap-2">
                    <Button onClick={() => {
                      if (gastoSeleccionado) {
                        onModificarGasto(gastoSeleccionado.id, formData);
                        setGastoSeleccionado(null);
                        setBusqueda("");
                        resetForm();
                        alert("Gasto modificado exitosamente");
                      }
                    }} className="flex-1">
                      Confirmar Modificación
                    </Button>
                    <Button variant="outline" onClick={() => {
                      setGastoSeleccionado(null);
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
              <h2 className="mb-4">Baja de Gasto</h2>

              {!gastoSeleccionado ? (
                <div className="flex gap-2">
                  <Input
                    placeholder="Ingresar Nro de Factura"
                    value={busqueda}
                    onChange={(e) => setBusqueda(e.target.value)}
                  />
                  <Button onClick={() => {
                    const gasto = buscarGasto(busqueda);
                    if (gasto) {
                      setGastoSeleccionado(gasto);
                    } else {
                      alert("Gasto no encontrado");
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
                      <Label className="text-gray-600">Nro de Factura</Label>
                      <p className="font-medium">{gastoSeleccionado.nroFactura}</p>
                    </div>
                    <div>
                      <Label className="text-gray-600">Concepto</Label>
                      <p className="font-medium">{gastoSeleccionado.concepto}</p>
                    </div>
                    <div>
                      <Label className="text-gray-600">Monto</Label>
                      <p className="font-medium">${gastoSeleccionado.monto}</p>
                    </div>
                    <div>
                      <Label className="text-gray-600">Fecha</Label>
                      <p className="font-medium">{gastoSeleccionado.fecha}</p>
                    </div>
                  </div>

                  <div className="flex gap-2">
                    <Button variant="destructive" onClick={() => setMostrarDialogBaja(true)} className="flex-1">
                      Confirmar Baja
                    </Button>
                    <Button variant="outline" onClick={() => {
                      setGastoSeleccionado(null);
                      setBusqueda("");
                    }} className="flex-1">
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
            <AlertDialogTitle>¿Está seguro de que desea dar de baja este gasto?</AlertDialogTitle>
            <AlertDialogDescription>
              Factura: {gastoSeleccionado?.nroFactura}<br />
              Concepto: {gastoSeleccionado?.concepto}<br />
              Esta acción no se puede deshacer.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>Cancelar</AlertDialogCancel>
            <AlertDialogAction onClick={() => {
              if (gastoSeleccionado) {
                onEliminarGasto(gastoSeleccionado.id);
                setGastoSeleccionado(null);
                setBusqueda("");
                setMostrarDialogBaja(false);
                alert("Gasto dado de baja exitosamente");
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