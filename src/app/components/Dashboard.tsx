import { Card } from "./ui/card";
import { Users } from "lucide-react";
import { Bar, BarChart, CartesianGrid, XAxis, YAxis, Tooltip, Legend, ResponsiveContainer } from "recharts";

interface DashboardProps {
  miembrosActivos: number;
  ingresosMensuales: { mes: string; monto: number }[];
  ingresosAnuales: { año: string; monto: number }[];
}

export function Dashboard({ miembrosActivos, ingresosMensuales, ingresosAnuales }: DashboardProps) {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-4xl mb-2">Inicio</h1>
        <p className="text-gray-600">Bienvenido al panel de administración</p>
      </div>

      {/* Miembros Activos */}
      <Card className="p-8">
        <div className="flex items-center gap-6">
          <div className="h-20 w-20 bg-gradient-to-br from-blue-600 to-blue-700 rounded-full flex items-center justify-center flex-shrink-0">
            <Users className="h-10 w-10 text-white" />
          </div>
          <div>
            <p className="text-gray-600 mb-2">Miembros Activos</p>
            <p className="text-5xl">{miembrosActivos}</p>
          </div>
        </div>
      </Card>

      {/* Ingresos Mensuales */}
      <Card className="p-6">
        <h2 className="mb-6">Ingresos Mensuales</h2>
        <ResponsiveContainer width="100%" height={300}>
          <BarChart data={ingresosMensuales}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="mes" />
            <YAxis />
            <Tooltip />
            <Legend />
            <Bar dataKey="monto" fill="#3b82f6" name="Ingresos ($)" />
          </BarChart>
        </ResponsiveContainer>
      </Card>

      {/* Ingresos Anuales */}
      <Card className="p-6">
        <h2 className="mb-6">Ingresos Anuales</h2>
        <ResponsiveContainer width="100%" height={300}>
          <BarChart data={ingresosAnuales}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="año" />
            <YAxis />
            <Tooltip />
            <Legend />
            <Bar dataKey="monto" fill="#8b5cf6" name="Ingresos ($)" />
          </BarChart>
        </ResponsiveContainer>
      </Card>
    </div>
  );
}
