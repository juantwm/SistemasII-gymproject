import { Card } from "../../components/ui/card";
import { Badge } from "../../components/ui/badge";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "../../components/ui/table";
import { CreditCard, Calendar, CheckCircle, Download, Info, AlertCircle } from "lucide-react";
import { ReceiptDownload } from "./ReceiptDownload";
import { Alert, AlertDescription } from "../../components/ui/alert";

interface Miembro {
  id: number;
  nombreApellido: string;
  mail: string;
  membresia: string;
  fechaInicio: string;
}

interface Pago {
  id: number;
  clienteNombre: string;
  fechaPago: string;
  fechaVencimiento: string;
  monto: number;
  medioPago: string;
  estado: "Pagado" | "Pendiente" | "Vencido";
}

interface PagosClienteProps {
  miembro: Miembro;
  pagos: Pago[];
}

export function PagosCliente({ miembro, pagos }: PagosClienteProps) {
  // Calcular próximo pago basado en la fecha de vencimiento del último pago
  const getProximoPago = () => {
    if (pagos.length > 0) {
      const pagosSorted = [...pagos].sort((a, b) => 
        new Date(b.fechaVencimiento).getTime() - new Date(a.fechaVencimiento).getTime()
      );
      return new Date(pagosSorted[0].fechaVencimiento);
    }
    
    const inicio = new Date(miembro.fechaInicio);
    if (miembro.membresia === "Mensual") {
      inicio.setMonth(inicio.getMonth() + 1);
    } else if (miembro.membresia === "Trimestral") {
      inicio.setMonth(inicio.getMonth() + 3);
    } else if (miembro.membresia === "Anual") {
      inicio.setFullYear(inicio.getFullYear() + 1);
    }
    return inicio;
  };

  const proximoPago = getProximoPago();
  const diasParaPago = Math.ceil((proximoPago.getTime() - new Date().getTime()) / (1000 * 60 * 60 * 24));
  
  const getMontoPorMembresia = (tipo: string) => {
    switch (tipo) {
      case "Mensual": return 35000;
      case "Trimestral": return 105000;
      case "Anual": return 420000;
      default: return 0;
    }
  };

  const montoMembresia = getMontoPorMembresia(miembro.membresia);
  const totalPagado = pagos.reduce((sum, p) => sum + p.monto, 0);
  
  // Check for payment alerts
  const showVencimientoProximo = diasParaPago <= 7 && diasParaPago > 0;
  const showCuotaVencida = diasParaPago < 0;
  const diasGracia = diasParaPago < 0 ? Math.abs(diasParaPago) : 0;
  
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-4xl mb-2">Historial de Pagos</h1>
        <p className="text-gray-600">Consulta tu membresía activa y el historial de pagos realizados</p>
      </div>

      {/* Payment Alerts */}
      {showVencimientoProximo && (
        <Alert className="border-orange-500 bg-orange-50">
          <AlertCircle className="h-4 w-4 text-orange-600" />
          <AlertDescription className="text-orange-800">
            <strong>Recordatorio:</strong> Tu cuota vence en {diasParaPago} {diasParaPago === 1 ? 'día' : 'días'}. 
            No olvides realizar tu pago para mantener tu membresía activa.
          </AlertDescription>
        </Alert>
      )}

      {showCuotaVencida && diasGracia <= 2 && (
        <Alert className="border-red-500 bg-red-50">
          <AlertCircle className="h-4 w-4 text-red-600" />
          <AlertDescription className="text-red-800">
            <strong>Cuota Vencida:</strong> Tu cuota ha vencido. Tienes {2 - diasGracia} {2 - diasGracia === 1 ? 'día' : 'días'} para regularizar tu pago. 
            Por favor, acércate a recepción.
          </AlertDescription>
        </Alert>
      )}

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <Card className="p-6">
          <div className="flex items-center justify-between mb-4">
            <div className="h-12 w-12 bg-blue-100 rounded-full flex items-center justify-center">
              <CreditCard className="h-6 w-6 text-blue-600" />
            </div>
            <Badge variant="default" className="bg-green-500">Activa</Badge>
          </div>
          <p className="text-sm text-gray-500">Membresía Actual</p>
          <p className="text-2xl mt-1">{miembro.membresia}</p>
          <p className="text-sm text-gray-500 mt-2">
            ${montoMembresia.toLocaleString('es-AR')}/{miembro.membresia === "Mensual" ? "mes" : miembro.membresia === "Trimestral" ? "3 meses" : "año"}
          </p>
        </Card>

        <Card className="p-6">
          <div className="flex items-center justify-between mb-4">
            <div className="h-12 w-12 bg-purple-100 rounded-full flex items-center justify-center">
              <Calendar className="h-6 w-6 text-purple-600" />
            </div>
            {showVencimientoProximo && (
              <Badge variant="default" className="bg-orange-500">Próximamente</Badge>
            )}
            {showCuotaVencida && (
              <Badge variant="default" className="bg-red-500">Vencido</Badge>
            )}
          </div>
          <p className="text-sm text-gray-500">Próximo Pago</p>
          <p className="text-2xl mt-1">{proximoPago.toLocaleDateString('es-ES', { day: '2-digit', month: 'short', year: 'numeric' })}</p>
          <p className="text-sm text-gray-500 mt-2">
            {diasParaPago > 0 ? `En ${diasParaPago} días` : diasParaPago === 0 ? "Hoy" : `Vencido hace ${Math.abs(diasParaPago)} días`}
          </p>
        </Card>

        <Card className="p-6">
          <div className="flex items-center justify-between mb-4">
            <div className="h-12 w-12 bg-green-100 rounded-full flex items-center justify-center">
              <CheckCircle className="h-6 w-6 text-green-600" />
            </div>
          </div>
          <p className="text-sm text-gray-500">Pagos Realizados</p>
          <p className="text-2xl mt-1">{pagos.length}</p>
          <p className="text-sm text-gray-500 mt-2">Total: ${totalPagado.toLocaleString('es-AR')}</p>
        </Card>
      </div>

      <Card className="p-6">
        <div className="flex justify-between items-center mb-6">
          <div>
            <h2>Historial de Pagos</h2>
            <p className="text-sm text-gray-600">Todos tus pagos realizados en el gimnasio</p>
          </div>
        </div>

        <div className="overflow-x-auto">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Fecha</TableHead>
                <TableHead>Vencimiento</TableHead>
                <TableHead>Método</TableHead>
                <TableHead>Monto</TableHead>
                <TableHead>Estado</TableHead>
                <TableHead>Recibo</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {pagos.length > 0 ? (
                pagos.map((pago) => (
                  <TableRow key={pago.id}>
                    <TableCell>{new Date(pago.fechaPago).toLocaleDateString('es-ES')}</TableCell>
                    <TableCell>{new Date(pago.fechaVencimiento).toLocaleDateString('es-ES')}</TableCell>
                    <TableCell>{pago.medioPago}</TableCell>
                    <TableCell>${pago.monto.toLocaleString('es-AR')}</TableCell>
                    <TableCell>
                      <Badge 
                        variant="default" 
                        className={
                          pago.estado === "Pagado" ? "bg-green-500" :
                          pago.estado === "Pendiente" ? "bg-yellow-500" : "bg-red-500"
                        }
                      >
                        {pago.estado === "Pagado" && <CheckCircle className="h-3 w-3 mr-1" />}
                        {pago.estado === "Vencido" && <AlertCircle className="h-3 w-3 mr-1" />}
                        {pago.estado}
                      </Badge>
                    </TableCell>
                    <TableCell>
                      <ReceiptDownload
                        variant="icon"
                        data={{
                          numero: `${String(pago.id).padStart(5, '0')}`,
                          fecha: new Date(pago.fechaPago).toLocaleDateString('es-ES'),
                          descripcion: `Cuota ${miembro.membresia} - ${new Date(pago.fechaVencimiento).toLocaleDateString('es-ES', { month: 'long', year: 'numeric' })}`,
                          cantidad: 1,
                          precio: pago.monto,
                          total: pago.monto,
                          clienteNombre: miembro.nombreApellido,
                          metodoPago: pago.medioPago,
                          fechaPago: new Date(pago.fechaPago).toLocaleDateString('es-ES', { day: 'numeric', month: 'long', year: 'numeric' })
                        }}
                      />
                    </TableCell>
                  </TableRow>
                ))
              ) : (
                <TableRow>
                  <TableCell colSpan={6} className="text-center text-gray-500 py-8">
                    Sin resultados. No se encontraron pagos registrados.
                  </TableCell>
                </TableRow>
              )}
            </TableBody>
          </Table>
        </div>
      </Card>
    </div>
  );
}