import { ReactNode } from "react";
import { Dumbbell, Home, Users, Package, DollarSign, User, LogOut } from "lucide-react";
import { Button } from "./ui/button";
import logoGym from "figma:asset/924c1e8773429e682229ee140537aae9ba030447.png";

interface AdminLayoutProps {
  children: ReactNode;
  currentPage: string;
  onNavigate: (page: string) => void;
  userRole: "admin" | "recepcionista";
}

export function AdminLayout({ children, currentPage, onNavigate, userRole }: AdminLayoutProps) {
  // Definir menú según rol
  const menuItems = userRole === "admin" 
    ? [
        { id: "inicio", label: "Inicio", icon: Home },
        { id: "empleados", label: "Empleados", icon: Users },
        { id: "equipo", label: "Equipo", icon: Package },
        { id: "gastos", label: "Gastos", icon: DollarSign },
        { id: "cliente", label: "Cliente", icon: User },
      ]
    : [
        { id: "cliente", label: "Cliente", icon: User },
      ];

  return (
    <div className="flex h-screen bg-gray-50">
      {/* Sidebar */}
      <div className="w-64 bg-gradient-to-b from-black to-red-900 text-white flex flex-col">
        {/* Header */}
        <div className="p-6 border-b border-red-800">
          <div className="flex items-center gap-3">
            <img src={logoGym} alt="Heracles Logo" className="h-10 w-10 rounded-full bg-white p-1" />
            <div>
              <h2>Heracles</h2>
              <p className="text-xs text-red-200">
                {userRole === "admin" ? "Administrador" : "Recepcionista"}
              </p>
            </div>
          </div>
        </div>

        {/* Menu */}
        <nav className="flex-1 p-4">
          <ul className="space-y-2">
            {menuItems.map((item) => {
              const Icon = item.icon;
              const isActive = currentPage === item.id;

              return (
                <li key={item.id}>
                  <button
                    onClick={() => onNavigate(item.id)}
                    className={`w-full flex items-center gap-3 px-4 py-3 rounded-lg transition-all ${
                      isActive
                        ? "bg-red-600 text-white shadow-lg"
                        : "text-gray-100 hover:bg-red-800/50"
                    }`}
                  >
                    <Icon className="h-5 w-5" />
                    <span>{item.label}</span>
                  </button>
                </li>
              );
            })}
          </ul>
        </nav>

        {/* Footer */}
        <div className="p-4 border-t border-red-800">
          <Button
            variant="ghost"
            className="w-full justify-start text-gray-100 hover:bg-red-800/50 hover:text-white"
            onClick={() => onNavigate("logout")}
          >
            <LogOut className="h-5 w-5 mr-3" />
            Cerrar Sesión
          </Button>
        </div>
      </div>

      {/* Main Content */}
      <div className="flex-1 overflow-auto">
        <div className="p-8">{children}</div>
      </div>
    </div>
  );
}