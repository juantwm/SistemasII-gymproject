import { ReactNode } from "react";
import { Dumbbell, FileText, DollarSign, LogOut, User } from "lucide-react";
import { Button } from "./ui/button";
import logoGym from "figma:asset/924c1e8773429e682229ee140537aae9ba030447.png";

interface ClienteLayoutProps {
  children: ReactNode;
  currentPage: string;
  onNavigate: (page: string) => void;
  clienteNombre?: string;
}

export function ClienteLayout({ children, currentPage, onNavigate, clienteNombre }: ClienteLayoutProps) {
  const menuItems = [
    { id: "perfil", label: "Mi Perfil", icon: User },
    { id: "inicio", label: "Rutinas", icon: FileText },
    { id: "pagos", label: "Historial de Pagos", icon: DollarSign },
  ];

  return (
    <div className="flex min-h-screen bg-gray-50">
      <aside className="w-64 bg-gradient-to-b from-black to-red-900 border-r fixed h-full">
        <div className="p-6 border-b border-red-800">
          <div className="flex items-center gap-3">
            <img src={logoGym} alt="Heracles Logo" className="h-12 w-12 rounded-full bg-white p-1" />
            <div>
              <h2 className="text-white">Heracles</h2>
              <p className="text-sm text-red-200">{clienteNombre || "Portal Cliente"}</p>
            </div>
          </div>
        </div>

        <nav className="p-4 space-y-2">
          {menuItems.map((item) => {
            const Icon = item.icon;
            const isActive = currentPage === item.id;
            
            return (
              <button
                key={item.id}
                onClick={() => onNavigate(item.id)}
                className={`w-full flex items-center gap-3 px-4 py-3 rounded-lg transition-colors ${
                  isActive
                    ? "bg-red-600 text-white shadow-lg"
                    : "text-gray-100 hover:bg-red-800/50"
                }`}
              >
                <Icon className="h-5 w-5" />
                <span>{item.label}</span>
              </button>
            );
          })}
        </nav>

        <div className="absolute bottom-0 left-0 right-0 p-4 border-t border-red-800 bg-black">
          <Button
            variant="ghost"
            className="w-full justify-start text-red-400 hover:text-red-300 hover:bg-red-800/50"
            onClick={() => onNavigate("logout")}
          >
            <LogOut className="h-5 w-5 mr-3" />
            Cerrar Sesión
          </Button>
        </div>
      </aside>

      <main className="flex-1 ml-64 p-8">
        {children}
      </main>
    </div>
  );
}