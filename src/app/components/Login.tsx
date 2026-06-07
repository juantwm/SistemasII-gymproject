import { useState } from "react";
import { Dumbbell, User, Lock, ArrowRight, Hash, Shield, UserCog } from "lucide-react";
import { Card } from "./ui/card";
import { Button } from "./ui/button";
import { Input } from "./ui/input";
import { Label } from "./ui/label";
import { Badge } from "./ui/badge";
import { EmailVerification } from "./EmailVerification";
import logoGym from "figma:asset/924c1e8773429e682229ee140537aae9ba030447.png";

interface LoginProps {
  onLogin: (userType: "admin" | "recepcionista" | "cliente", credentials: { username?: string; password?: string; memberId?: string }) => void;
}

export function Login({ onLogin }: LoginProps) {
  const [selectedType, setSelectedType] = useState<"admin" | "recepcionista" | "cliente" | null>(null);
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [memberId, setMemberId] = useState("");
  const [error, setError] = useState("");
  const [showEmailVerification, setShowEmailVerification] = useState(false);
  const [clienteEmail, setClienteEmail] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    
    if (selectedType === "admin" || selectedType === "recepcionista") {
      // Validate master admin credentials
      if (username === "admin11" && password === "soyadmin123") {
        onLogin("admin", { username, password });
      } else {
        setError("ID o contraseña incorrectos");
      }
    } else if (selectedType === "cliente") {
      if (memberId) {
        // Check if it's the valid member ID
        if (memberId === "101010") {
          // Simulate sending email
          setClienteEmail("juanmatorres161@gmail.com");
          setShowEmailVerification(true);
        } else {
          setError("ID de cliente no encontrado");
        }
      } else {
        setError("Por favor ingresa tu ID de cliente");
      }
    }
  };

  const handleEmailConfirm = () => {
    onLogin("cliente", { memberId: "101010" });
  };

  const handleSelectType = (type: "admin" | "recepcionista" | "cliente") => {
    setSelectedType(type);
    setUsername("");
    setPassword("");
    setMemberId("");
    setError("");
    setShowEmailVerification(false);
  };

  // Email Verification Screen
  if (showEmailVerification) {
    return (
      <EmailVerification
        onConfirm={handleEmailConfirm}
        onBack={() => setShowEmailVerification(false)}
        email={clienteEmail}
      />
    );
  }

  if (!selectedType) {
    return (
      <div className="min-h-screen bg-white flex items-center justify-center p-4">
        <div className="w-full max-w-5xl">
          {/* Header */}
          <div className="text-center mb-12">
            <img src={logoGym} alt="Heracles Logo" className="h-24 mx-auto mb-6" />
            <h1 className="text-4xl mb-2">
              Heracles
            </h1>
            <p className="text-gray-600">Sistema de Gestión de Gimnasio</p>
          </div>

          {/* Options */}
          <div className="grid md:grid-cols-2 gap-6">
            {/* Admin Card */}
            <Card 
              className="p-8 cursor-pointer transition-all hover:shadow-xl hover:scale-105 border-2 hover:border-red-500"
              onClick={() => handleSelectType("admin")}
            >
              <div className="text-center space-y-4">
                <div className="inline-flex items-center justify-center h-16 w-16 bg-gradient-to-br from-red-600 to-black rounded-xl mx-auto">
                  <User className="h-8 w-8 text-white" />
                </div>
                <div>
                  <h2 className="text-2xl mb-2">Administrador</h2>
                  <p className="text-gray-600 mb-4">Acceso al panel administrativo</p>
                </div>
                <div className="space-y-2">
                  <Badge variant="secondary" className="mr-2">Dashboard</Badge>
                  <Badge variant="secondary" className="mr-2">Empleados</Badge>
                  <Badge variant="secondary" className="mr-2">Equipo</Badge>
                  <Badge variant="secondary" className="mr-2">Gastos</Badge>
                  <Badge variant="secondary" className="mr-2">Clientes</Badge>
                </div>
                <Button className="w-full bg-gradient-to-r from-red-600 to-black hover:from-red-700 hover:to-gray-900 mt-6">
                  Ingresar como Admin
                  <ArrowRight className="ml-2 h-4 w-4" />
                </Button>
              </div>
            </Card>

            {/* Cliente Card */}
            <Card 
              className="p-8 cursor-pointer transition-all hover:shadow-xl hover:scale-105 border-2 hover:border-red-500"
              onClick={() => handleSelectType("cliente")}
            >
              <div className="text-center space-y-4">
                <div className="inline-flex items-center justify-center h-16 w-16 bg-gradient-to-br from-red-600 to-black rounded-xl mx-auto">
                  <Dumbbell className="h-8 w-8 text-white" />
                </div>
                <div>
                  <h2 className="text-2xl mb-2">Cliente</h2>
                  <p className="text-gray-600 mb-4">Acceso al portal de miembros</p>
                </div>
                <div className="space-y-2">
                  <Badge variant="secondary" className="mr-2">Mi Perfil</Badge>
                  <Badge variant="secondary" className="mr-2">Rutinas</Badge>
                  <Badge variant="secondary" className="mr-2">Pagos</Badge>
                </div>
                <Button className="w-full bg-gradient-to-r from-red-600 to-black hover:from-red-700 hover:to-gray-900 mt-6">
                  Ingresar como Cliente
                  <ArrowRight className="ml-2 h-4 w-4" />
                </Button>
              </div>
            </Card>
          </div>
        </div>
      </div>
    );
  }

  // Login Form
  return (
    <div className="min-h-screen bg-white flex items-center justify-center p-4">
      <div className="w-full max-w-md">
        {/* Back Button */}
        <button
          onClick={() => setSelectedType(null)}
          className="mb-4 text-gray-600 hover:text-gray-900 flex items-center gap-2"
        >
          ← Volver a selección
        </button>

        <Card className="p-8">
          {/* Header */}
          <div className="text-center mb-8">
            <img src={logoGym} alt="Heracles Logo" className="h-16 mx-auto mb-4" />
            <h2 className="text-2xl mb-2">
              {selectedType === "admin" ? "Administrador" : "Cliente"}
            </h2>
            <p className="text-gray-600">Ingresa tus credenciales</p>
          </div>

          {/* Form */}
          <form onSubmit={handleSubmit} className="space-y-4">
            {(selectedType === "admin" || selectedType === "recepcionista") ? (
              <>
                <div>
                  <Label htmlFor="username">Usuario</Label>
                  <div className="relative mt-1">
                    <User className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-gray-400" />
                    <Input
                      id="username"
                      type="text"
                      placeholder="Ingresa tu usuario"
                      value={username}
                      onChange={(e) => setUsername(e.target.value)}
                      className="pl-10"
                      required
                    />
                  </div>
                </div>

                <div>
                  <Label htmlFor="password">Contraseña</Label>
                  <div className="relative mt-1">
                    <Lock className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-gray-400" />
                    <Input
                      id="password"
                      type="password"
                      placeholder="Ingresa tu contraseña"
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                      className="pl-10"
                      required
                    />
                  </div>
                </div>
              </>
            ) : (
              <div>
                <Label htmlFor="memberId">ID de Cliente</Label>
                <div className="relative mt-1">
                  <Hash className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-gray-400" />
                  <Input
                    id="memberId"
                    type="text"
                    placeholder="Ingresa tu ID de cliente"
                    value={memberId}
                    onChange={(e) => setMemberId(e.target.value)}
                    className="pl-10"
                    required
                  />
                </div>
                <p className="text-xs text-gray-500 mt-2">
                  Ingresa el ID que recibiste al inscribirte en el gimnasio
                </p>
              </div>
            )}
            
            {error && (
              <div className="p-3 bg-red-50 border border-red-200 rounded-lg">
                <p className="text-sm text-red-600">{error}</p>
              </div>
            )}

            <Button
              type="submit"
              className="w-full bg-gradient-to-r from-red-600 to-black hover:from-red-700 hover:to-gray-900"
            >
              {selectedType === "cliente" ? "Enviar enlace de verificación" : "Iniciar Sesión"}
              <ArrowRight className="ml-2 h-4 w-4" />
            </Button>
          </form>
        </Card>
      </div>
    </div>
  );
}