import { Download } from "lucide-react";
import { Button } from "./ui/button";
import logoGym from "figma:asset/924c1e8773429e682229ee140537aae9ba030447.png";

interface ReceiptData {
  numero: string;
  fecha: string;
  descripcion: string;
  cantidad: number;
  precio: number;
  total: number;
  clienteNombre?: string;
  metodoPago?: string;
  cuentaBancaria?: string;
  fechaPago?: string;
}

interface ReceiptDownloadProps {
  data?: ReceiptData;
  gasto?: {
    id: number;
    nroFactura: string;
    fecha: string;
    concepto: string;
    monto: number;
    categoria: string;
  };
  variant?: "button" | "icon";
}

export function ReceiptDownload({ data, gasto, variant = "button" }: ReceiptDownloadProps) {
  const handleDownload = () => {
    let receiptData: ReceiptData;
    
    if (gasto) {
      // Convert gasto to ReceiptData format
      receiptData = {
        numero: gasto.nroFactura,
        fecha: gasto.fecha,
        descripcion: `${gasto.categoria} - ${gasto.concepto}`,
        cantidad: 1,
        precio: gasto.monto,
        total: gasto.monto,
      };
    } else if (data) {
      receiptData = data;
    } else {
      return;
    }

    // Calculate subtotal and taxes
    const subtotal = (receiptData.total / 1.21).toFixed(2);
    const impuestos = (receiptData.total - parseFloat(subtotal)).toFixed(2);

    // Create receipt HTML
    const receiptHTML = `
      <!DOCTYPE html>
      <html>
      <head>
        <meta charset="UTF-8">
        <title>Recibo ${receiptData.numero}</title>
        <style>
          body {
            font-family: Arial, sans-serif;
            max-width: 800px;
            margin: 0 auto;
            padding: 40px;
            background: white;
          }
          .header {
            display: flex;
            justify-content: space-between;
            align-items: flex-start;
            margin-bottom: 40px;
          }
          .logo-section {
            flex: 1;
          }
          .logo {
            width: 120px;
            height: auto;
          }
          .receipt-info {
            text-align: left;
          }
          .receipt-info h1 {
            font-size: 32px;
            margin: 0 0 10px 0;
            color: #333;
          }
          .receipt-info p {
            margin: 5px 0;
            color: #666;
            font-size: 14px;
          }
          .gym-info {
            margin: 30px 0;
            padding-bottom: 20px;
            border-bottom: 2px solid #333;
          }
          .gym-info h2 {
            font-size: 18px;
            margin: 0 0 10px 0;
          }
          .gym-info p {
            margin: 3px 0;
            color: #666;
            font-size: 14px;
          }
          table {
            width: 100%;
            border-collapse: collapse;
            margin: 30px 0;
          }
          th {
            background: #f5f5f5;
            padding: 12px;
            text-align: left;
            border-bottom: 2px solid #333;
            font-weight: bold;
          }
          td {
            padding: 12px;
            border-bottom: 1px solid #ddd;
          }
          .totals {
            margin-top: 30px;
            text-align: right;
          }
          .totals-row {
            display: flex;
            justify-content: flex-end;
            margin: 8px 0;
          }
          .totals-label {
            width: 200px;
            text-align: right;
            padding-right: 20px;
          }
          .totals-value {
            width: 120px;
            text-align: right;
          }
          .total-final {
            font-size: 20px;
            font-weight: bold;
            border-top: 2px solid #333;
            padding-top: 10px;
            margin-top: 10px;
          }
          .footer {
            margin-top: 50px;
            padding-top: 20px;
            border-top: 2px solid #333;
            display: flex;
            justify-content: space-between;
          }
          .footer-section {
            flex: 1;
          }
          .footer-section h3 {
            font-size: 14px;
            margin: 0 0 10px 0;
            font-weight: bold;
          }
          .footer-section p {
            margin: 3px 0;
            font-size: 12px;
            color: #666;
          }
        </style>
      </head>
      <body>
        <div class="header">
          <div class="receipt-info">
            <h1>RECIBO</h1>
            <p><strong>Recibo N°</strong> ${receiptData.numero}</p>
            <p><strong>Fecha</strong> ${receiptData.fecha}</p>
          </div>
        </div>

        <div class="gym-info">
          <h2>ARDILES 40</h2>
          <p>(2657)425832</p>
          <p>Villa Mercedes-San Luis</p>
        </div>

        <table>
          <thead>
            <tr>
              <th>Descripción</th>
              <th style="text-align: center;">Cantidad</th>
              <th style="text-align: right;">Precio</th>
              <th style="text-align: right;">Total</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>${receiptData.descripcion}</td>
              <td style="text-align: center;">${receiptData.cantidad}</td>
              <td style="text-align: right;">$${receiptData.precio.toLocaleString('es-AR')}</td>
              <td style="text-align: right;">$${receiptData.total.toLocaleString('es-AR')}</td>
            </tr>
          </tbody>
        </table>

        <div class="totals">
          <div class="totals-row">
            <div class="totals-label">Subtotal:</div>
            <div class="totals-value">$${parseFloat(subtotal).toLocaleString('es-AR')}</div>
          </div>
          <div class="totals-row">
            <div class="totals-label">Impuestos (21%):</div>
            <div class="totals-value">$${parseFloat(impuestos).toLocaleString('es-AR')}</div>
          </div>
          <div class="totals-row total-final">
            <div class="totals-label">Total:</div>
            <div class="totals-value">$${receiptData.total.toLocaleString('es-AR')}</div>
          </div>
        </div>

        <div class="footer">
          <div class="footer-section">
            <h3>Información de pago</h3>
            ${receiptData.clienteNombre ? `<p>${receiptData.clienteNombre}</p>` : ''}
            ${receiptData.metodoPago ? `<p>${receiptData.metodoPago}</p>` : ''}
            ${receiptData.cuentaBancaria ? `<p>Cuenta: ${receiptData.cuentaBancaria}</p>` : ''}
            ${receiptData.fechaPago ? `<p>Fecha de pago: ${receiptData.fechaPago}</p>` : ''}
          </div>
          <div class="footer-section" style="text-align: right;">
            <h3>Contacto</h3>
            <p>(2657)425832</p>
            <p>heracles@gmail.com</p>
            <p>Calle Ardiles 40, Villa Mercedes,</p>
            <p>San Luis, Argentina, CP: 5730</p>
          </div>
        </div>
      </body>
      </html>
    `;

    // Create blob and download
    const blob = new Blob([receiptHTML], { type: 'text/html' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `Recibo_${receiptData.numero}.html`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
  };

  if (variant === "icon") {
    return (
      <Button
        onClick={handleDownload}
        size="sm"
        variant="ghost"
        className="h-8 w-8 p-0"
        title="Descargar Recibo"
      >
        <Download className="h-4 w-4" />
      </Button>
    );
  }

  return (
    <Button
      onClick={handleDownload}
      variant="outline"
      size="sm"
    >
      <Download className="h-4 w-4 mr-2" />
      Descargar Recibo
    </Button>
  );
}