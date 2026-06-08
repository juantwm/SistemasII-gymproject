import { Mail, ArrowRight } from "lucide-react";
import { Card } from "../../components/ui/card";
import { Button } from "../../components/ui/button";
import logoGym from "figma:asset/924c1e8773429e682229ee140537aae9ba030447.png";

interface EmailVerificationProps {
  onConfirm: () => void;
  onBack: () => void;
  email: string;
}

export function EmailVerification({ onConfirm, onBack, email }: EmailVerificationProps) {
  return (
    <div className="min-h-screen bg-white flex items-center justify-center p-4">
      <div className="w-full max-w-md">
        {/* Back Button */}
        <button
          onClick={onBack}
          className="mb-4 text-gray-600 hover:text-gray-900 flex items-center gap-2"
        >
          ← Volver
        </button>

        <Card className="p-8 text-center">
          {/* Mail Icon */}
          <div className="inline-flex items-center justify-center h-20 w-20 bg-gradient-to-br from-red-500 to-red-600 rounded-full mb-6">
            <Mail className="h-10 w-10 text-white" />
          </div>

          {/* Message */}
          <h2 className="text-2xl mb-4">¡Revisa tu correo!</h2>
          <p className="text-gray-600 mb-6">
            Te hemos enviado un enlace de confirmación para ingresar a:
          </p>
          <p className="text-gray-900 mb-8">
            {email}
          </p>

          {/* Simulate Email Link */}
          <div className="p-4 bg-gray-50 rounded-lg mb-6">
            <p className="text-sm text-gray-600 mb-3">
              Para el prototipo, haz clic aquí para simular la confirmación del email:
            </p>
            <Button
              onClick={onConfirm}
              className="w-full bg-gradient-to-r from-red-600 to-red-700 hover:from-red-700 hover:to-red-800"
            >
              Confirmar Ingreso
              <ArrowRight className="ml-2 h-4 w-4" />
            </Button>
          </div>

          <p className="text-sm text-gray-500">
            Si no recibes el correo en unos minutos, verifica tu carpeta de spam.
          </p>
        </Card>
      </div>
    </div>
  );
}

// Email Template Component (for design reference)
export function EmailTemplate({ onConfirm, clienteName }: { onConfirm: () => void; clienteName: string }) {
  return (
    <div className="max-w-xl mx-auto bg-white p-8 rounded-lg shadow-lg" style={{ fontFamily: 'Arial, sans-serif' }}>
      {/* Logo */}
      <div className="text-center mb-6">
        <img src={logoGym} alt="Heracles Logo" className="h-20 mx-auto mb-4" />
        <h1 className="text-2xl">Heracles</h1>
      </div>

      {/* Title */}
      <h2 className="text-xl text-center mb-4">Confirma tu inicio de sesión</h2>

      {/* Message */}
      <p className="text-gray-700 mb-6">
        Hola <strong>{clienteName}</strong>, para completar tu ingreso a Heracles, presiona el siguiente botón.
      </p>

      {/* CTA Button */}
      <div className="text-center mb-6">
        <button
          onClick={onConfirm}
          className="inline-block px-8 py-3 bg-gradient-to-r from-red-600 to-red-700 text-white rounded-lg hover:from-red-700 hover:to-red-800 transition-all"
        >
          Confirmar Ingreso
        </button>
      </div>

      {/* Footer */}
      <div className="text-center text-sm text-gray-500 border-t pt-4">
        <p>Si no solicitaste este acceso, puedes ignorar este correo.</p>
        <p className="mt-2">© 2025 Heracles Gym - Sistema de Gestión</p>
      </div>
    </div>
  );
}
