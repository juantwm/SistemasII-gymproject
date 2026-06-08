import { AlertDialog, AlertDialogAction, AlertDialogContent, AlertDialogDescription, AlertDialogFooter, AlertDialogHeader, AlertDialogTitle } from "../../components/ui/alert-dialog";
import { Card } from "../../components/ui/card";
import { CheckCircle2, Copy } from "lucide-react";
import { Button } from "../../components/ui/button";
import { useState } from "react";

interface CredencialesDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  nombreEmpleado: string;
  usuario: string;
  contraseña: string;
}

export function CredencialesDialog({ open, onOpenChange, nombreEmpleado, usuario, contraseña }: CredencialesDialogProps) {
  const [copiado, setCopiado] = useState(false);

  const copiarCredenciales = () => {
    const texto = `Usuario: ${usuario}\nContraseña: ${contraseña}`;
    navigator.clipboard.writeText(texto);
    setCopiado(true);
    setTimeout(() => setCopiado(false), 2000);
  };

  return (
    <AlertDialog open={open} onOpenChange={onOpenChange}>
      <AlertDialogContent className="max-w-md">
        <AlertDialogHeader>
          <div className="flex items-center gap-2 mb-2">
            <CheckCircle2 className="h-6 w-6 text-green-600" />
            <AlertDialogTitle>¡Empleado creado con éxito!</AlertDialogTitle>
          </div>
          <AlertDialogDescription>
            Se ha generado automáticamente las credenciales de acceso para <strong>{nombreEmpleado}</strong>
          </AlertDialogDescription>
        </AlertDialogHeader>

        <Card className="p-4 bg-gradient-to-br from-blue-50 to-indigo-50 border-2 border-blue-200">
          <div className="space-y-3">
            <div>
              <p className="text-sm text-gray-600 mb-1">Usuario:</p>
              <p className="font-mono bg-white px-3 py-2 rounded border">{usuario}</p>
            </div>
            <div>
              <p className="text-sm text-gray-600 mb-1">Contraseña Temporal:</p>
              <p className="font-mono bg-white px-3 py-2 rounded border">{contraseña}</p>
            </div>
          </div>

          <Button
            variant="outline"
            size="sm"
            className="w-full mt-4"
            onClick={copiarCredenciales}
          >
            <Copy className="h-4 w-4 mr-2" />
            {copiado ? "¡Copiado!" : "Copiar Credenciales"}
          </Button>
        </Card>

        <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-3">
          <p className="text-sm text-yellow-800">
            <strong>Importante:</strong> Estas credenciales deben ser entregadas al empleado. La contraseña debe cambiarse en el primer inicio de sesión.
          </p>
        </div>

        <AlertDialogFooter>
          <AlertDialogAction onClick={() => onOpenChange(false)}>
            Entendido
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
}
