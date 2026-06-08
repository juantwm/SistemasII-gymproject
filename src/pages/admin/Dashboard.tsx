import { Card } from "../../components/ui/card";
import { Users } from "lucide-react";
import { Bar, BarChart, CartesianGrid, XAxis, YAxis, Tooltip, Legend, ResponsiveContainer } from "recharts";

interface DashboardProps {
  miembrosActivos: number;
  ingresosMensuales: { mes: string; monto: number }[];
  ingresosAnuales: { año: string; monto: number }[];
}

export function Dashboard({ miembrosActivos, ingresosMensuales, ingresosAnuales }: DashboardProps) {
  return (
    <div className="space-y-4 md:space-y-6">
      <div>
        <h1 className="text-2xl md:text-4xl mb-1 md:mb-2">Inicio</h1>
        <p className="text-sm md:text-base text-gray-600">Bienvenido al panel de administración</p>
      </div>

      <Card className="p-4 md:p-8">
        <div className="flex flex-col sm:flex-row items-center gap-4 md:gap-6 text-center sm:text-left">
          <div className="h-16 w-16 md:h-20 md:w-20 bg-gradient-to-br from-blue-600 to-blue-700 rounded-full flex items-center justify-center flex-shrink-0">
            <Users className="h-8 w-8 md:h-10 md:w-10 text-white" />
          </div>
          <div>
            <p className="text-gray-600 mb-1 md:mb-2 text-sm md:text-base">Miembros Activos</p>
            <p className="text-4xl md:text-5xl">{miembrosActivos}</p>
          </div>
        </div>
      </Card>

      <Card className="p-4 md:p-6">
        <h2 className="mb-4 md:mb-6 text-lg md:text-xl">Ingresos Mensuales</h2>
        <ResponsiveContainer width="100%" height={250} className="md:!h-[300px]">
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

      <Card className="p-4 md:p-6">
        <h2 className="mb-4 md:mb-6 text-lg md:text-xl">Ingresos Anuales</h2>
        <ResponsiveContainer width="100%" height={250} className="md:!h-[300px]">
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
