import { useState } from "react";
import { useNavigate } from "react-router";
import { Dumbbell, User, Lock, ArrowRight, Hash } from "lucide-react";
import { Card } from "../../components/ui/card";
import { Button } from "../../components/ui/button";
import { Input } from "../../components/ui/input";
import { Label } from "../../components/ui/label";
import { Badge } from "../../components/ui/badge";
import { EmailVerification } from "./EmailVerification";
import { useGym } from "../../context/GymContext";
import logoGym from "figma:asset/924c1e8773429e682229ee140537aae9ba030447.png";

type LoginMode = "cliente" | "admin";

interface LoginProps {
  mode: LoginMode;
}

export function Login({ mode }: LoginProps) {
  const navigate = useNavigate();
  const { loginAdmin, loginCliente } = useGym();
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [memberId, setMemberId] = useState("");
  const [error, setError] = useState("");
  const [showEmailVerification, setShowEmailVerification] = useState(false);
  const [clienteEmail, setClienteEmail] = useState("");

  const isAdmin = mode === "admin";

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setError("");

    if (isAdmin) {
      if (loginAdmin({ username, password })) {
        navigate("/admin/dashboard");
      } else {
        setError("ID o contraseña incorrectos");
      }
      return;
    }

    if (memberId) {
      if (memberId === "101010") {
        setClienteEmail("juanmatorres161@gmail.com");
        setShowEmailVerification(true);
      } else {
        setError("ID de cliente no encontrado");
      }
    } else {
      setError("Por favor ingresa tu ID de cliente");
    }
  };

  const handleEmailConfirm = () => {
    if (loginCliente({ memberId: "101010" })) {
      navigate("/cliente/perfil");
    }
  };

  if (showEmailVerification) {
    return (
      <EmailVerification
        onConfirm={handleEmailConfirm}
        onBack={() => setShowEmailVerification(false)}
        email={clienteEmail}
      />
    );
  }

  if (!isAdmin && mode === "cliente") {
    return (
      <div className="min-h-screen bg-white flex items-center justify-center p-4">
        <div className="w-full max-w-5xl">
          <div className="text-center mb-8 md:mb-12">
            <img src={logoGym} alt="Heracles Logo" className="h-16 md:h-24 mx-auto mb-4 md:mb-6" />
            <h1 className="text-2xl md:text-4xl mb-2">Heracles</h1>
            <p className="text-gray-600">Portal de Miembros</p>
          </div>

          <div className="grid md:grid-cols-2 gap-6">
            <Card className="p-6 md:p-8 border-2 border-red-100">
              <div className="text-center space-y-4">
                <div className="inline-flex items-center justify-center h-14 w-14 md:h-16 md:w-16 bg-gradient-to-br from-red-600 to-black rounded-xl mx-auto">
                  <Dumbbell className="h-7 w-7 md:h-8 md:w-8 text-white" />
                </div>
                <div>
                  <h2 className="text-xl md:text-2xl mb-2">Acceso Cliente</h2>
                  <p className="text-gray-600 mb-4 text-sm md:text-base">Ingresa con tu ID de miembro</p>
                </div>
                <div className="space-y-2">
                  <Badge variant="secondary" className="mr-2">Mi Perfil</Badge>
                  <Badge variant="secondary" className="mr-2">Rutinas</Badge>
                  <Badge variant="secondary" className="mr-2">Pagos</Badge>
                </div>
              </div>
            </Card>

            <Card className="p-6 md:p-8">
              <form onSubmit={handleSubmit} className="space-y-4">
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

                {error && (
                  <div className="p-3 bg-red-50 border border-red-200 rounded-lg">
                    <p className="text-sm text-red-600">{error}</p>
                  </div>
                )}

                <Button
                  type="submit"
                  className="w-full bg-gradient-to-r from-red-600 to-black hover:from-red-700 hover:to-gray-900"
                >
                  Enviar enlace de verificación
                  <ArrowRight className="ml-2 h-4 w-4" />
                </Button>
              </form>
            </Card>
          </div>

          <p className="text-center mt-6 text-sm text-gray-500">
            ¿Eres administrador?{" "}
            <button
              type="button"
              onClick={() => navigate("/admin/login")}
              className="text-red-600 hover:underline"
            >
              Ingresar al panel admin
            </button>
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-white flex items-center justify-center p-4">
      <div className="w-full max-w-md">
        <button
          type="button"
          onClick={() => navigate("/login")}
          className="mb-4 text-gray-600 hover:text-gray-900 flex items-center gap-2 text-sm"
        >
          ← Volver al portal de clientes
        </button>

        <Card className="p-6 md:p-8">
          <div className="text-center mb-6 md:mb-8">
            <img src={logoGym} alt="Heracles Logo" className="h-14 md:h-16 mx-auto mb-4" />
            <h2 className="text-xl md:text-2xl mb-2">Administrador</h2>
            <p className="text-gray-600 text-sm">Ingresa tus credenciales</p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-4">
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

            {error && (
              <div className="p-3 bg-red-50 border border-red-200 rounded-lg">
                <p className="text-sm text-red-600">{error}</p>
              </div>
            )}

            <Button
              type="submit"
              className="w-full bg-gradient-to-r from-red-600 to-black hover:from-red-700 hover:to-gray-900"
            >
              Iniciar Sesión
              <ArrowRight className="ml-2 h-4 w-4" />
            </Button>
          </form>
        </Card>
      </div>
    </div>
  );
}
