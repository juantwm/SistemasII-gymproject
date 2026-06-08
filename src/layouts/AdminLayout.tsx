import { useState } from "react";
import { NavLink, Outlet, useNavigate } from "react-router";
import { Home, Users, Package, DollarSign, User, LogOut, Menu } from "lucide-react";
import { Button } from "../components/ui/button";
import { Sheet, SheetContent, SheetHeader, SheetTitle, SheetTrigger } from "../components/ui/sheet";
import { useGym } from "../context/GymContext";
import logoGym from "figma:asset/924c1e8773429e682229ee140537aae9ba030447.png";

const adminMenuItems = [
  { path: "/admin/dashboard", label: "Inicio", icon: Home },
  { path: "/admin/empleados", label: "Empleados", icon: Users },
  { path: "/admin/equipos", label: "Equipo", icon: Package },
  { path: "/admin/gastos", label: "Gastos", icon: DollarSign },
  { path: "/admin/clientes", label: "Cliente", icon: User },
];

const recepcionistaMenuItems = [
  { path: "/admin/clientes", label: "Cliente", icon: User },
];

function NavItems({ onNavigate }: { onNavigate?: () => void }) {
  const { userType, logout } = useGym();
  const navigate = useNavigate();
  const menuItems = userType === "admin" ? adminMenuItems : recepcionistaMenuItems;

  const handleLogout = () => {
    logout();
    navigate("/admin/login");
    onNavigate?.();
  };

  return (
    <>
      <nav className="flex-1 p-4">
        <ul className="space-y-2">
          {menuItems.map((item) => {
            const Icon = item.icon;
            return (
              <li key={item.path}>
                <NavLink
                  to={item.path}
                  onClick={onNavigate}
                  className={({ isActive }) =>
                    `w-full flex items-center gap-3 px-4 py-3 rounded-lg transition-all ${
                      isActive
                        ? "bg-red-600 text-white shadow-lg"
                        : "text-gray-100 hover:bg-red-800/50"
                    }`
                  }
                >
                  <Icon className="h-5 w-5" />
                  <span>{item.label}</span>
                </NavLink>
              </li>
            );
          })}
        </ul>
      </nav>
      <div className="p-4 border-t border-red-800">
        <Button
          variant="ghost"
          className="w-full justify-start text-gray-100 hover:bg-red-800/50 hover:text-white"
          onClick={handleLogout}
        >
          <LogOut className="h-5 w-5 mr-3" />
          Cerrar Sesión
        </Button>
      </div>
    </>
  );
}

export function AdminLayout() {
  const { userType } = useGym();
  const [mobileOpen, setMobileOpen] = useState(false);

  return (
    <div className="flex flex-col md:flex-row min-h-screen bg-gray-50">
      {/* Mobile header */}
      <header className="md:hidden flex items-center justify-between p-4 bg-gradient-to-r from-black to-red-900 text-white border-b border-red-800">
        <div className="flex items-center gap-3">
          <img src={logoGym} alt="Heracles Logo" className="h-9 w-9 rounded-full bg-white p-1" />
          <div>
            <h2 className="text-sm font-semibold">Heracles</h2>
            <p className="text-xs text-red-200">
              {userType === "admin" ? "Administrador" : "Recepcionista"}
            </p>
          </div>
        </div>
        <Sheet open={mobileOpen} onOpenChange={setMobileOpen}>
          <SheetTrigger asChild>
            <Button variant="ghost" size="icon" className="text-white hover:bg-red-800/50">
              <Menu className="h-6 w-6" />
            </Button>
          </SheetTrigger>
          <SheetContent side="left" className="w-72 p-0 bg-gradient-to-b from-black to-red-900 text-white border-red-800">
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
      <aside className="hidden md:flex w-64 bg-gradient-to-b from-black to-red-900 text-white flex-col shrink-0">
        <div className="p-6 border-b border-red-800">
          <div className="flex items-center gap-3">
            <img src={logoGym} alt="Heracles Logo" className="h-10 w-10 rounded-full bg-white p-1" />
            <div>
              <h2>Heracles</h2>
              <p className="text-xs text-red-200">
                {userType === "admin" ? "Administrador" : "Recepcionista"}
              </p>
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
        <div className="flex justify-around items-center py-2 px-1">
          {(userType === "admin" ? adminMenuItems.slice(0, 4) : recepcionistaMenuItems).map((item) => {
            const Icon = item.icon;
            return (
              <NavLink
                key={item.path}
                to={item.path}
                className={({ isActive }) =>
                  `flex flex-col items-center gap-0.5 px-2 py-1 rounded-lg text-xs transition-colors ${
                    isActive ? "text-white" : "text-red-200"
                  }`
                }
              >
                <Icon className="h-5 w-5" />
                <span className="truncate max-w-[4rem]">{item.label}</span>
              </NavLink>
            );
          })}
        </div>
      </nav>
    </div>
  );
}
