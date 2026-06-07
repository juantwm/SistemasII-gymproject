import { Alert, AlertDescription } from "./ui/alert";
import { Card } from "./ui/card";
import { AlertCircle, AlertTriangle, Clock } from "lucide-react";

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

interface AlertaVencimientoCuotaProps {
  cuotasCliente: Cuota[];
}

export function AlertaVencimientoCuota({ cuotasCliente }: AlertaVencimientoCuotaProps) {
  const hoy = new Date();
  
  // Buscar la próxima cuota a vencer o vencida
  const cuotaPendiente = cuotasCliente
    .filter(c => c.estado === "Pendiente" || c.estado === "Vencido")
    .sort((a, b) => new Date(a.fechaVencimiento).getTime() - new Date(b.fechaVencimiento).getTime())[0];

  if (!cuotaPendiente) {
    return null; // No mostrar nada si no hay cuotas pendientes
  }

  const fechaVencimiento = new Date(cuotaPendiente.fechaVencimiento);
  const diasParaVencimiento = Math.ceil((fechaVencimiento.getTime() - hoy.getTime()) / (1000 * 60 * 60 * 24));
  
  // Mostrar alerta si está vencida o faltan 7 días o menos
  const mostrarAlerta = diasParaVencimiento <= 7;

  if (!mostrarAlerta && cuotaPendiente.estado !== "Vencido") {
    return null;
  }

  // Determinar el tipo de alerta
  const estaVencida = cuotaPendiente.estado === "Vencido" || diasParaVencimiento < 0;
  const esUrgente = diasParaVencimiento <= 3 && diasParaVencimiento >= 0;

  return (
    <div className="mb-6">
      <Card 
        className={`p-6 ${
          estaVencida 
            ? "bg-gradient-to-r from-red-50 to-red-100 border-red-500 border-2" 
            : esUrgente 
            ? "bg-gradient-to-r from-orange-50 to-orange-100 border-orange-500 border-2"
            : "bg-gradient-to-r from-yellow-50 to-yellow-100 border-yellow-500 border-2"
        }`}
      >
        <div className="flex items-start gap-4">
          <div className={`flex-shrink-0 h-14 w-14 rounded-full flex items-center justify-center ${
            estaVencida 
              ? "bg-red-600" 
              : esUrgente 
              ? "bg-orange-600"
              : "bg-yellow-600"
          }`}>
            {estaVencida ? (
              <AlertCircle className="h-8 w-8 text-white" />
            ) : esUrgente ? (
              <AlertTriangle className="h-8 w-8 text-white" />
            ) : (
              <Clock className="h-8 w-8 text-white" />
            )}
          </div>
          
          <div className="flex-1">
            {estaVencida ? (
              <>
                <h2 className="text-red-900 mb-2">🚨 ALERTA: Tu cuota ha vencido</h2>
                <p className="text-red-800 mb-3">
                  Tu cuota venció el <strong>{new Date(cuotaPendiente.fechaVencimiento).toLocaleDateString('es-ES', { day: 'numeric', month: 'long', year: 'numeric' })}</strong>.
                  Por favor, regulariza tu pago lo antes posible.
                </p>
              </>
            ) : (
              <>
                <h2 className={`mb-2 ${esUrgente ? "text-orange-900" : "text-yellow-900"}`}>
                  {esUrgente ? "⚠️ Recordatorio Urgente" : "📅 Recordatorio: Tu cuota vence pronto"}
                </h2>
                <p className={esUrgente ? "text-orange-800 mb-3" : "text-yellow-800 mb-3"}>
                  Tu cuota vence {diasParaVencimiento === 0 ? "hoy" : diasParaVencimiento === 1 ? "mañana" : `en ${diasParaVencimiento} días`} ({new Date(cuotaPendiente.fechaVencimiento).toLocaleDateString('es-ES', { day: 'numeric', month: 'long' })}).
                </p>
              </>
            )}
            
            <div className="grid grid-cols-2 gap-3 bg-white/60 p-3 rounded-lg">
              <div>
                <p className="text-xs text-gray-600 mb-1">Monto a pagar:</p>
                <p className="text-xl">${cuotaPendiente.monto.toLocaleString()}</p>
              </div>
              <div>
                <p className="text-xs text-gray-600 mb-1">Fecha de vencimiento:</p>
                <p className="font-medium">{new Date(cuotaPendiente.fechaVencimiento).toLocaleDateString('es-ES')}</p>
              </div>
            </div>

            <div className={`mt-3 p-2 rounded text-sm ${
              estaVencida 
                ? "bg-red-100 text-red-900" 
                : esUrgente 
                ? "bg-orange-100 text-orange-900"
                : "bg-yellow-100 text-yellow-900"
            }`}>
              💳 <strong>Medios de pago disponibles:</strong> Efectivo, Tarjeta de Débito/Crédito, Transferencia, QR/Billetera Virtual
            </div>
          </div>
        </div>\n      </Card>
    </div>
  );
}
