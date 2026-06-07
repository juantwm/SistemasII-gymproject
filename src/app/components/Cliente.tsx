import { useState } from "react";
import { Card } from "./ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "./ui/tabs";
import { Users, DollarSign } from "lucide-react";
import { GestionClientes } from "./GestionClientes";
import { GestionCuotas } from "./GestionCuotas";

interface Cliente {
  id: number;
  estado: "Activo" | "Inactivo" | "Pendiente";
  nombreApellido: string;
  dni: string;
  direccion: string;
  telefono: string;
  mail: string;
  fechaNacimiento: string;
}

interface Cuota {
  id: number;
  clienteId: number;
  clienteNombre: string;
  fechaPago: string;
  fechaVencimiento: string;
  monto: number;
  medioPago: string;
  estado: "Pagado" | "Pendiente" | "Vencido";
}

interface ClienteProps {
  clientes: Cliente[];
  cuotas: Cuota[];
  onAgregarCliente: (cliente: Omit<Cliente, "id">) => void;
  onModificarCliente: (id: number, cliente: Omit<Cliente, "id">) => void;
  onEliminarCliente: (id: number) => void;
  onAgregarCuota: (cuota: Omit<Cuota, "id">) => void;
  onModificarCuota: (id: number, cuota: Omit<Cuota, "id">) => void;
}

export function Cliente({ 
  clientes, 
  cuotas, 
  onAgregarCliente, 
  onModificarCliente, 
  onEliminarCliente,
  onAgregarCuota,
  onModificarCuota
}: ClienteProps) {
  return (
    <div>
      <Card className="p-6">
        <Tabs defaultValue="gestion-clientes">
          <TabsList className="grid w-full grid-cols-2 mb-6">
            <TabsTrigger value="gestion-clientes">
              <Users className="h-4 w-4 mr-2" />
              Gestión de Clientes
            </TabsTrigger>
            <TabsTrigger value="gestion-cuotas">
              <DollarSign className="h-4 w-4 mr-2" />
              Gestión de Cuotas
            </TabsTrigger>
          </TabsList>

          <TabsContent value="gestion-clientes">
            <GestionClientes
              clientes={clientes}
              onAgregarCliente={onAgregarCliente}
              onModificarCliente={onModificarCliente}
              onEliminarCliente={onEliminarCliente}
            />
          </TabsContent>

          <TabsContent value="gestion-cuotas">
            <GestionCuotas
              clientes={clientes}
              cuotas={cuotas}
              onAgregarCuota={onAgregarCuota}
              onModificarCuota={onModificarCuota}
            />
          </TabsContent>
        </Tabs>
      </Card>
    </div>
  );
}
