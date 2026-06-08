import { useState } from "react";
import { NavLink, Outlet, useNavigate } from "react-router";
import { FileText, DollarSign, LogOut, User, Menu } from "lucide-react";
import { Button } from "../components/ui/button";
import { Sheet, SheetContent, SheetHeader, SheetTitle, SheetTrigger } from "../components/ui/sheet";
import { useGym } from "../context/GymContext";
import logoGym from "figma:asset/924c1e8773429e682229ee140537aae9ba030447.png";

const menuItems = [
  { path: "/cliente/perfil", label: "Mi Perfil", icon: User },
  { path: "/cliente/inicio", label: "Rutinas", icon: FileText },
  { path: "/cliente/pagos", label: "Pagos", icon: DollarSign },
];

function NavItems({ onNavigate }: { onNavigate?: () => void }) {
  const { logout } = useGym();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate("/login");
    onNavigate?.();
  };

  return (
    <>
      <nav className="p-4 space-y-2 flex-1">
        {menuItems.map((item) => {
          const Icon = item.icon;
          return (
            <NavLink
              key={item.path}
              to={item.path}
              onClick={onNavigate}
              className={({ isActive }) =>
                `w-full flex items-center gap-3 px-4 py-3 rounded-lg transition-colors ${
                  isActive
                    ? "bg-red-600 text-white shadow-lg"
                    : "text-gray-100 hover:bg-red-800/50"
                }`
              }
            >
              <Icon className="h-5 w-5" />
              <span>{item.label}</span>
            </NavLink>
          );
        })}
      </nav>
      <div className="p-4 border-t border-red-800">
        <Button
          variant="ghost"
          className="w-full justify-start text-red-400 hover:text-red-300 hover:bg-red-800/50"
          onClick={handleLogout}
        >
          <LogOut className="h-5 w-5 mr-3" />
          Cerrar Sesión
        </Button>
      </div>
    </>
  );
}

export function ClienteLayout() {
  const { clienteActual } = useGym();
  const [mobileOpen, setMobileOpen] = useState(false);

  return (
    <div className="flex flex-col md:flex-row min-h-screen bg-gray-50">
      {/* Mobile header */}
      <header className="md:hidden flex items-center justify-between p-4 bg-gradient-to-r from-black to-red-900 text-white border-b border-red-800">
        <div className="flex items-center gap-3">
          <img src={logoGym} alt="Heracles Logo" className="h-9 w-9 rounded-full bg-white p-1" />
          <div>
            <h2 className="text-sm font-semibold">Heracles</h2>
            <p className="text-xs text-red-200 truncate max-w-[10rem]">
              {clienteActual?.nombreApellido || "Portal Cliente"}
            </p>
          </div>
        </div>
        <Sheet open={mobileOpen} onOpenChange={setMobileOpen}>
          <SheetTrigger asChild>
            <Button variant="ghost" size="icon" className="text-white hover:bg-red-800/50">
              <Menu className="h-6 w-6" />
            </Button>
          </SheetTrigger>
          <SheetContent side="left" className="w-72 p-0 bg-gradient-to-b from-black to-red-900 text-white border-red-800 flex flex-col">
            <SheetHeader className="p-6 border-b border-red-800 text-left">
              <SheetTitle className="text-white flex items-center gap-3">
                <img src={logoGym} alt="Heracles Logo" className="h-10 w-10 rounded-full bg-white p-1" />
                Heracles
              </SheetTitle>
            </SheetHeader>
            <NavItems onNavigate={() => setMobileOpen(false)} />
          </SheetContent>
        </Sheet>
      </header>

      {/* Desktop sidebar */}
      <aside className="hidden md:flex w-64 bg-gradient-to-b from-black to-red-900 border-r flex-col shrink-0 min-h-screen">
        <div className="p-6 border-b border-red-800">
          <div className="flex items-center gap-3">
            <img src={logoGym} alt="Heracles Logo" className="h-12 w-12 rounded-full bg-white p-1" />
            <div>
              <h2 className="text-white">Heracles</h2>
              <p className="text-sm text-red-200">{clienteActual?.nombreApellido || "Portal Cliente"}</p>
            </div>
          </div>
        </div>
        <NavItems />
      </aside>

      {/* Main content */}
      <main className="flex-1 overflow-auto pb-20 md:pb-0">
        <div className="p-4 md:p-8">
          <Outlet />
        </div>
      </main>

      {/* Mobile bottom navigation */}
      <nav className="md:hidden fixed bottom-0 left-0 right-0 bg-gradient-to-r from-black to-red-900 border-t border-red-800 z-50">
        <div className="flex justify-around items-center py-2">
          {menuItems.map((item) => {
            const Icon = item.icon;
            return (
              <NavLink
                key={item.path}
                to={item.path}
                className={({ isActive }) =>
                  `flex flex-col items-center gap-0.5 px-3 py-1 rounded-lg text-xs transition-colors ${
                    isActive ? "text-white" : "text-red-200"
                  }`
                }
              >
                <Icon className="h-5 w-5" />
                <span>{item.label}</span>
              </NavLink>
            );
          })}
        </div>
      </nav>
    </div>
  );
}
