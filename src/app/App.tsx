import { useState } from "react";
import { Login } from "./components/Login";
import { AdminLayout } from "./components/AdminLayout";
import { ClienteLayout } from "./components/ClienteLayout";
import { Dashboard } from "./components/Dashboard";
import { Empleados } from "./components/Empleados";
import { Equipo } from "./components/Equipo";
import { Gastos } from "./components/Gastos";
import { Cliente } from "./components/Cliente";
import { InicioCliente } from "./components/InicioCliente";
import { DetalleRutina } from "./components/DetalleRutina";
import { PagosCliente } from "./components/PagosCliente";
import { PerfilCliente } from "./components/PerfilCliente";

type UserType = "admin" | "recepcionista" | "cliente" | null;

// Interfaces
interface Empleado {
  id: number;
  estado: "Activo" | "Inactivo";
  nombreApellido: string;
  dni: string;
  direccion: string;
  telefono: string;
  mail: string;
  estadoCivil: string;
  cantidadHijos: number;
  fechaNacimiento: string;
  rol: string;
  estadoLaboral: string;
  legajo: string;
}

interface Equipo {
  id: number;
  estado: "Activo" | "Inactivo" | "Mantenimiento";
  nombre: string;
  categoria: string;
  fechaIngreso: string;
  modelo: string;
  descripcion: string;
}

interface Gasto {
  id: number;
  estado: "Activo" | "Inactivo";
  nroFactura: string;
  fecha: string;
  concepto: string;
  monto: number;
  categoria: string;
  observaciones: string;
}

interface ClienteMiembro {
  id: number;
  estado: "Activo" | "Inactivo" | "Pendiente";
  nombreApellido: string;
  dni: string;
  direccion: string;
  telefono: string;
  mail: string;
  fechaNacimiento: string;
  membresia?: string;
  fechaInicio?: string;
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

function App() {
  const [userType, setUserType] = useState<UserType>(null);
  const [adminPage, setAdminPage] = useState<string>("inicio");
  const [clientePage, setClientePage] = useState<string>("perfil"); // Changed from "inicio" to "perfil"
  const [rutinaSeleccionada, setRutinaSeleccionada] = useState<number | null>(null);
  const [clienteActual, setClienteActual] = useState<ClienteMiembro | null>(null);

  // Sistema de preferencias del cliente
  const [preferenciasCliente, setPreferenciasCliente] = useState<{
    rutinasMasVistas: number[];
    totalVistas: number;
  }>({
    rutinasMasVistas: [],
    totalVistas: 0,
  });

  // Estados de Empleados
  const [empleados, setEmpleados] = useState<Empleado[]>([
    {
      id: 1,
      estado: "Activo",
      nombreApellido: "Carlos Gómez",
      dni: "20123456",
      direccion: "Av. Principal 123",
      telefono: "555-1001",
      mail: "carlos@heracles.com",
      estadoCivil: "Soltero/a",
      cantidadHijos: 0,
      fechaNacimiento: "1990-05-15",
      rol: "Recepcionista",
      estadoLaboral: "Activo",
      legajo: "EMP001",
    },
    {
      id: 2,
      estado: "Activo",
      nombreApellido: "Laura Fernández",
      dni: "25987654",
      direccion: "Calle Flores 456",
      telefono: "555-1002",
      mail: "laura@heracles.com",
      estadoCivil: "Casado/a",
      cantidadHijos: 2,
      fechaNacimiento: "1985-08-22",
      rol: "Instructor",
      estadoLaboral: "Activo",
      legajo: "EMP002",
    },
  ]);

  // Estados de Equipos
  const [equipos, setEquipos] = useState<Equipo[]>([
    {
      id: 1,
      estado: "Activo",
      nombre: "Cinta de Correr Pro",
      categoria: "Cardio",
      fechaIngreso: "2023-01-15",
      modelo: "TR-5000",
      descripcion: "Cinta de correr profesional con pantalla táctil",
    },
    {
      id: 2,
      estado: "Activo",
      nombre: "Bicicleta Spinning",
      categoria: "Cardio",
      fechaIngreso: "2023-02-20",
      modelo: "SP-300",
      descripcion: "Bicicleta de spinning con resistencia magnética",
    },
  ]);

  // Estados de Gastos
  const [gastos, setGastos] = useState<Gasto[]>([
    {
      id: 1,
      estado: "Activo",
      nroFactura: "F-001-00123",
      fecha: "2024-10-15",
      concepto: "Electricidad",
      monto: 5000,
      categoria: "Servicios",
      observaciones: "Consumo octubre 2024",
    },
    {
      id: 2,
      estado: "Activo",
      nroFactura: "F-002-00456",
      fecha: "2024-10-18",
      concepto: "Mantenimiento equipos",
      monto: 15000,
      categoria: "Mantenimiento",
      observaciones: "Revisión trimestral",
    },
  ]);

  // Estados de Clientes (Miembros)
  const [clientes, setClientes] = useState<ClienteMiembro[]>([
    {
      id: 101010,
      estado: "Activo",
      nombreApellido: "Juan Torres",
      dni: "30123456",
      direccion: "Av. Libertador 789",
      telefono: "555-0101",
      mail: "juanmatorres161@gmail.com",
      fechaNacimiento: "1995-03-10",
      membresia: "Mensual",
      fechaInicio: "2024-01-15",
    },
    {
      id: 1002,
      estado: "Activo",
      nombreApellido: "María García",
      dni: "28456789",
      direccion: "Calle San Martín 321",
      telefono: "555-0102",
      mail: "maria@email.com",
      fechaNacimiento: "1992-07-25",
      membresia: "Trimestral",
      fechaInicio: "2024-02-01",
    },
    {
      id: 1003,
      estado: "Activo",
      nombreApellido: "Carlos López",
      dni: "35789123",
      direccion: "Paseo Colón 654",
      telefono: "555-0103",
      mail: "carlos@email.com",
      fechaNacimiento: "1988-11-30",
      membresia: "Anual",
      fechaInicio: "2024-01-01",
    },
    {
      id: 1004,
      estado: "Activo",
      nombreApellido: "Ana Martínez",
      dni: "32654987",
      direccion: "Av. Belgrano 147",
      telefono: "555-0104",
      mail: "ana@email.com",
      fechaNacimiento: "1998-05-18",
      membresia: "Mensual",
      fechaInicio: "2024-10-20",
    },
    {
      id: 1005,
      estado: "Activo",
      nombreApellido: "Pedro Sánchez",
      dni: "29321654",
      direccion: "Calle Rivadavia 852",
      telefono: "555-0105",
      mail: "pedro@email.com",
      fechaNacimiento: "1990-09-05",
      membresia: "Trimestral",
      fechaInicio: "2023-12-01",
    },
  ]);

  // Estados de Cuotas
  const [cuotas, setCuotas] = useState<Cuota[]>([
    { id: 1, clienteId: 101010, clienteNombre: "Juan Torres", fechaPago: "2024-10-01", fechaVencimiento: "2024-11-01", monto: 35000, medioPago: "Tarjeta", estado: "Pagado" },
    { id: 2, clienteId: 101010, clienteNombre: "Juan Torres", fechaPago: "2024-09-01", fechaVencimiento: "2024-10-01", monto: 35000, medioPago: "Tarjeta", estado: "Pagado" },
    { id: 7, clienteId: 101010, clienteNombre: "Juan Torres", fechaPago: "", fechaVencimiento: "2024-11-24", monto: 35000, medioPago: "", estado: "Pendiente" },
    { id: 3, clienteId: 1002, clienteNombre: "María García", fechaPago: "2024-10-01", fechaVencimiento: "2025-01-01", monto: 105000, medioPago: "Efectivo", estado: "Pagado" },
    { id: 4, clienteId: 1003, clienteNombre: "Carlos López", fechaPago: "2024-01-01", fechaVencimiento: "2025-01-01", monto: 420000, medioPago: "Transferencia", estado: "Pagado" },
    { id: 5, clienteId: 1004, clienteNombre: "Ana Martínez", fechaPago: "2024-10-20", fechaVencimiento: "2024-11-20", monto: 35000, medioPago: "Tarjeta", estado: "Pagado" },
    { id: 6, clienteId: 1005, clienteNombre: "Pedro Sánchez", fechaPago: "2024-10-01", fechaVencimiento: "2025-01-01", monto: 105000, medioPago: "Tarjeta", estado: "Pagado" },
  ]);

  // Datos para dashboard
  const ingresosMensuales = [
    { mes: "Ene", monto: 15000 },
    { mes: "Feb", monto: 18000 },
    { mes: "Mar", monto: 16500 },
    { mes: "Abr", monto: 19000 },
    { mes: "May", monto: 20500 },
    { mes: "Jun", monto: 22000 },
    { mes: "Jul", monto: 21000 },
    { mes: "Ago", monto: 23500 },
    { mes: "Sep", monto: 24000 },
    { mes: "Oct", monto: 25500 },
  ];

  const ingresosAnuales = [
    { año: "2021", monto: 180000 },
    { año: "2022", monto: 210000 },
    { año: "2023", monto: 245000 },
    { año: "2024", monto: 280000 },
  ];

  // Handlers para Empleados
  const handleAgregarEmpleado = (empleado: Omit<Empleado, "id">) => {
    const maxId = Math.max(...empleados.map(e => e.id), 0);
    setEmpleados([...empleados, { ...empleado, id: maxId + 1 }]);
  };

  const handleModificarEmpleado = (id: number, empleado: Omit<Empleado, "id">) => {
    setEmpleados(empleados.map(e => e.id === id ? { ...empleado, id } : e));
  };

  const handleEliminarEmpleado = (id: number) => {
    setEmpleados(empleados.filter(e => e.id !== id));
  };

  // Handlers para Equipos
  const handleAgregarEquipo = (equipo: Omit<Equipo, "id">) => {
    const maxId = Math.max(...equipos.map(e => e.id), 0);
    setEquipos([...equipos, { ...equipo, id: maxId + 1 }]);
  };

  const handleModificarEquipo = (id: number, equipo: Omit<Equipo, "id">) => {
    setEquipos(equipos.map(e => e.id === id ? { ...equipo, id } : e));
  };

  const handleEliminarEquipo = (id: number) => {
    setEquipos(equipos.filter(e => e.id !== id));
  };

  // Handlers para Gastos
  const handleAgregarGasto = (gasto: Omit<Gasto, "id">) => {
    const maxId = Math.max(...gastos.map(g => g.id), 0);
    setGastos([...gastos, { ...gasto, id: maxId + 1 }]);
  };

  const handleModificarGasto = (id: number, gasto: Omit<Gasto, "id">) => {
    setGastos(gastos.map(g => g.id === id ? { ...gasto, id } : g));
  };

  const handleEliminarGasto = (id: number) => {
    setGastos(gastos.filter(g => g.id !== id));
  };

  // Handlers para Clientes
  const handleAgregarCliente = (cliente: Omit<ClienteMiembro, "id">) => {
    const maxId = Math.max(...clientes.map(c => c.id), 1000);
    setClientes([...clientes, { ...cliente, id: maxId + 1, membresia: "Mensual", fechaInicio: new Date().toISOString().split('T')[0] }]);
  };

  const handleModificarCliente = (id: number, cliente: Omit<ClienteMiembro, "id">) => {
    setClientes(clientes.map(c => c.id === id ? { ...c, ...cliente, id } : c));
  };

  const handleEliminarCliente = (id: number) => {
    setClientes(clientes.filter(c => c.id !== id));
  };

  // Handlers para Cuotas
  const handleAgregarCuota = (cuota: Omit<Cuota, "id">) => {
    const maxId = Math.max(...cuotas.map(c => c.id), 0);
    setCuotas([...cuotas, { ...cuota, id: maxId + 1 }]);
  };

  const handleModificarCuota = (id: number, cuota: Omit<Cuota, "id">) => {
    setCuotas(cuotas.map(c => c.id === id ? { ...cuota, id } : c));
  };

  // Handler para navegación de admin
  const handleAdminNavigate = (page: string) => {
    if (page === "logout") {
      setUserType(null);
      setAdminPage("inicio");
      return;
    }
    setAdminPage(page);
  };

  // Handler para navegación de cliente
  const handleClienteNavigate = (page: string) => {
    if (page === "logout") {
      setUserType(null);
      setClientePage("perfil"); // Reset to perfil instead of inicio
      setClienteActual(null);
      setPreferenciasCliente({ rutinasMasVistas: [], totalVistas: 0 });
      return;
    }
    setClientePage(page);
    setRutinaSeleccionada(null);
  };

  const handleVerRutina = (dias: number) => {
    setRutinaSeleccionada(dias);
    setPreferenciasCliente(prev => ({
      rutinasMasVistas: [...prev.rutinasMasVistas, dias],
      totalVistas: prev.totalVistas + 1,
    }));
  };

  const handleVolverInicio = () => {
    setRutinaSeleccionada(null);
  };

  // Handler para login
  const handleLogin = (userType: "admin" | "recepcionista" | "cliente", credentials: { username?: string; password?: string; memberId?: string }) => {
    if (userType === "admin" || userType === "recepcionista") {
      setUserType(userType);
    } else if (userType === "cliente") {
      const memberId = parseInt(credentials.memberId || "");
      const miembro = clientes.find(m => m.id === memberId);
      
      if (miembro) {
        if (miembro.estado === "Activo") {
          setClienteActual(miembro);
          setUserType("cliente");
        } else {
          alert(`Tu membresía está ${miembro.estado.toLowerCase()}. Por favor contacta a recepción.`);
        }
      } else {
        alert("ID de miembro no encontrado. Por favor verifica tu ID o contacta a recepción.");
      }
    }
  };

  // Admin Portal
  const renderAdminContent = () => {
    switch (adminPage) {
      case "inicio":
        return (
          <Dashboard
            miembrosActivos={clientes.filter(c => c.estado === "Activo").length}
            ingresosMensuales={ingresosMensuales}
            ingresosAnuales={ingresosAnuales}
          />
        );
      case "empleados":
        return (
          <Empleados
            empleados={empleados}
            onAgregarEmpleado={handleAgregarEmpleado}
            onModificarEmpleado={handleModificarEmpleado}
            onEliminarEmpleado={handleEliminarEmpleado}
          />
        );
      case "equipo":
        return (
          <Equipo
            equipos={equipos}
            onAgregarEquipo={handleAgregarEquipo}
            onModificarEquipo={handleModificarEquipo}
            onEliminarEquipo={handleEliminarEquipo}
          />
        );
      case "gastos":
        return (
          <Gastos
            gastos={gastos}
            onAgregarGasto={handleAgregarGasto}
            onModificarGasto={handleModificarGasto}
            onEliminarGasto={handleEliminarGasto}
          />
        );
      case "cliente":
        return (
          <Cliente
            clientes={clientes}
            cuotas={cuotas}
            onAgregarCliente={handleAgregarCliente}
            onModificarCliente={handleModificarCliente}
            onEliminarCliente={handleEliminarCliente}
            onAgregarCuota={handleAgregarCuota}
            onModificarCuota={handleModificarCuota}
          />
        );
      default:
        return (
          <Dashboard
            miembrosActivos={clientes.filter(c => c.estado === "Activo").length}
            ingresosMensuales={ingresosMensuales}
            ingresosAnuales={ingresosAnuales}
          />
        );
    }
  };

  // Cliente Portal
  const renderClienteContent = () => {
    if (!clienteActual) return null;

    if (rutinaSeleccionada !== null) {
      return <DetalleRutina dias={rutinaSeleccionada} onVolver={handleVolverInicio} />;
    }

    const cuotasCliente = cuotas.filter(c => c.clienteId === clienteActual.id);

    switch (clientePage) {
      case "inicio":
        return <InicioCliente onVerRutina={handleVerRutina} preferencias={preferenciasCliente} />;
      case "perfil":
        return <PerfilCliente miembro={clienteActual} preferencias={preferenciasCliente} cuotasCliente={cuotasCliente} />;
      case "pagos":
        return <PagosCliente miembro={clienteActual} pagos={cuotasCliente} />;
      default:
        return <InicioCliente onVerRutina={handleVerRutina} preferencias={preferenciasCliente} />;
    }
  };

  // Login
  if (!userType) {
    return <Login onLogin={handleLogin} />;
  }

  // Admin/Recepcionista
  if (userType === "admin" || userType === "recepcionista") {
    return (
      <AdminLayout currentPage={adminPage} onNavigate={handleAdminNavigate} userRole={userType}>
        {renderAdminContent()}
      </AdminLayout>
    );
  }

  // Cliente
  return (
    <ClienteLayout 
      currentPage={clientePage} 
      onNavigate={handleClienteNavigate}
      clienteNombre={clienteActual?.nombreApellido}
    >
      {renderClienteContent()}
    </ClienteLayout>
  );
}

export default App;