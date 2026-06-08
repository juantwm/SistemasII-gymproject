import { BrowserRouter, Navigate, Route, Routes } from "react-router";
import { GymProvider } from "./context/GymContext";
import { AdminLayout } from "./layouts/AdminLayout";
import { ClienteLayout } from "./layouts/ClienteLayout";
import { ProtectedAdminRoute, ProtectedClientRoute } from "./routes/ProtectedRoute";
import { Login } from "./pages/auth/Login";
import { DashboardPage } from "./pages/admin/DashboardPage";
import { EmpleadosPage } from "./pages/admin/EmpleadosPage";
import { EquiposPage } from "./pages/admin/EquiposPage";
import { GastosPage } from "./pages/admin/GastosPage";
import { ClientesPage } from "./pages/admin/ClientesPage";
import { InicioClientePage } from "./pages/client/InicioClientePage";
import { PerfilClientePage } from "./pages/client/PerfilClientePage";
import { PagosClientePage } from "./pages/client/PagosClientePage";
import { DetalleRutinaPage } from "./pages/client/DetalleRutinaPage";

function App() {
  return (
    <BrowserRouter>
      <GymProvider>
        <Routes>
          <Route path="/" element={<Navigate to="/login" replace />} />

          <Route path="/login" element={<Login mode="cliente" />} />
          <Route path="/admin/login" element={<Login mode="admin" />} />

          <Route
            path="/admin"
            element={
              <ProtectedAdminRoute>
                <AdminLayout />
              </ProtectedAdminRoute>
            }
          >
            <Route index element={<Navigate to="dashboard" replace />} />
            <Route path="dashboard" element={<DashboardPage />} />
            <Route path="empleados" element={<EmpleadosPage />} />
            <Route path="equipos" element={<EquiposPage />} />
            <Route path="gastos" element={<GastosPage />} />
            <Route path="clientes" element={<ClientesPage />} />
          </Route>

          <Route
            path="/cliente"
            element={
              <ProtectedClientRoute>
                <ClienteLayout />
              </ProtectedClientRoute>
            }
          >
            <Route index element={<Navigate to="perfil" replace />} />
            <Route path="inicio" element={<InicioClientePage />} />
            <Route path="perfil" element={<PerfilClientePage />} />
            <Route path="pagos" element={<PagosClientePage />} />
            <Route path="rutina/:id" element={<DetalleRutinaPage />} />
          </Route>

          <Route path="*" element={<Navigate to="/login" replace />} />
        </Routes>
      </GymProvider>
    </BrowserRouter>
  );
}

export default App;
