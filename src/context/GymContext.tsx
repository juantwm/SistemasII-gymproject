import {
  createContext,
  useCallback,
  useContext,
  useMemo,
  useState,
  type ReactNode,
} from "react";
import {
  clientesIniciales,
  cuotasIniciales,
  empleadosIniciales,
  equiposIniciales,
  gastosIniciales,
  ingresosAnuales,
  ingresosMensuales,
} from "../mocks/data";
import type {
  ClienteMiembro,
  Cuota,
  Empleado,
  Equipo,
  Gasto,
  LoginCredentials,
  PreferenciasCliente,
  UserType,
} from "../types";

interface GymContextValue {
  userType: UserType;
  clienteActual: ClienteMiembro | null;
  preferenciasCliente: PreferenciasCliente;
  empleados: Empleado[];
  equipos: Equipo[];
  gastos: Gasto[];
  clientes: ClienteMiembro[];
  cuotas: Cuota[];
  ingresosMensuales: { mes: string; monto: number }[];
  ingresosAnuales: { año: string; monto: number }[];
  agregarEmpleado: (empleado: Omit<Empleado, "id">) => void;
  modificarEmpleado: (id: number, empleado: Omit<Empleado, "id">) => void;
  eliminarEmpleado: (id: number) => void;
  agregarEquipo: (equipo: Omit<Equipo, "id">) => void;
  modificarEquipo: (id: number, equipo: Omit<Equipo, "id">) => void;
  eliminarEquipo: (id: number) => void;
  agregarGasto: (gasto: Omit<Gasto, "id">) => void;
  modificarGasto: (id: number, gasto: Omit<Gasto, "id">) => void;
  eliminarGasto: (id: number) => void;
  agregarCliente: (cliente: Omit<ClienteMiembro, "id">) => void;
  modificarCliente: (id: number, cliente: Omit<ClienteMiembro, "id">) => void;
  eliminarCliente: (id: number) => void;
  agregarCuota: (cuota: Omit<Cuota, "id">) => void;
  modificarCuota: (id: number, cuota: Omit<Cuota, "id">) => void;
  registrarVistaRutina: (dias: number) => void;
  loginAdmin: (credentials: LoginCredentials) => boolean;
  loginCliente: (credentials: LoginCredentials) => boolean;
  logout: () => void;
}

const GymContext = createContext<GymContextValue | null>(null);

export function GymProvider({ children }: { children: ReactNode }) {
  const [userType, setUserType] = useState<UserType>(null);
  const [clienteActual, setClienteActual] = useState<ClienteMiembro | null>(null);
  const [preferenciasCliente, setPreferenciasCliente] = useState<PreferenciasCliente>({
    rutinasMasVistas: [],
    totalVistas: 0,
  });
  const [empleados, setEmpleados] = useState<Empleado[]>(empleadosIniciales);
  const [equipos, setEquipos] = useState<Equipo[]>(equiposIniciales);
  const [gastos, setGastos] = useState<Gasto[]>(gastosIniciales);
  const [clientes, setClientes] = useState<ClienteMiembro[]>(clientesIniciales);
  const [cuotas, setCuotas] = useState<Cuota[]>(cuotasIniciales);

  const agregarEmpleado = useCallback((empleado: Omit<Empleado, "id">) => {
    setEmpleados((prev) => {
      const maxId = Math.max(...prev.map((e) => e.id), 0);
      return [...prev, { ...empleado, id: maxId + 1 }];
    });
  }, []);

  const modificarEmpleado = useCallback((id: number, empleado: Omit<Empleado, "id">) => {
    setEmpleados((prev) => prev.map((e) => (e.id === id ? { ...empleado, id } : e)));
  }, []);

  const eliminarEmpleado = useCallback((id: number) => {
    setEmpleados((prev) => prev.filter((e) => e.id !== id));
  }, []);

  const agregarEquipo = useCallback((equipo: Omit<Equipo, "id">) => {
    setEquipos((prev) => {
      const maxId = Math.max(...prev.map((e) => e.id), 0);
      return [...prev, { ...equipo, id: maxId + 1 }];
    });
  }, []);

  const modificarEquipo = useCallback((id: number, equipo: Omit<Equipo, "id">) => {
    setEquipos((prev) => prev.map((e) => (e.id === id ? { ...equipo, id } : e)));
  }, []);

  const eliminarEquipo = useCallback((id: number) => {
    setEquipos((prev) => prev.filter((e) => e.id !== id));
  }, []);

  const agregarGasto = useCallback((gasto: Omit<Gasto, "id">) => {
    setGastos((prev) => {
      const maxId = Math.max(...prev.map((g) => g.id), 0);
      return [...prev, { ...gasto, id: maxId + 1 }];
    });
  }, []);

  const modificarGasto = useCallback((id: number, gasto: Omit<Gasto, "id">) => {
    setGastos((prev) => prev.map((g) => (g.id === id ? { ...gasto, id } : g)));
  }, []);

  const eliminarGasto = useCallback((id: number) => {
    setGastos((prev) => prev.filter((g) => g.id !== id));
  }, []);

  const agregarCliente = useCallback((cliente: Omit<ClienteMiembro, "id">) => {
    setClientes((prev) => {
      const maxId = Math.max(...prev.map((c) => c.id), 1000);
      return [
        ...prev,
        {
          ...cliente,
          id: maxId + 1,
          membresia: "Mensual",
          fechaInicio: new Date().toISOString().split("T")[0],
        },
      ];
    });
  }, []);

  const modificarCliente = useCallback((id: number, cliente: Omit<ClienteMiembro, "id">) => {
    setClientes((prev) => prev.map((c) => (c.id === id ? { ...c, ...cliente, id } : c)));
  }, []);

  const eliminarCliente = useCallback((id: number) => {
    setClientes((prev) => prev.filter((c) => c.id !== id));
  }, []);

  const agregarCuota = useCallback((cuota: Omit<Cuota, "id">) => {
    setCuotas((prev) => {
      const maxId = Math.max(...prev.map((c) => c.id), 0);
      return [...prev, { ...cuota, id: maxId + 1 }];
    });
  }, []);

  const modificarCuota = useCallback((id: number, cuota: Omit<Cuota, "id">) => {
    setCuotas((prev) => prev.map((c) => (c.id === id ? { ...cuota, id } : c)));
  }, []);

  const registrarVistaRutina = useCallback((dias: number) => {
    setPreferenciasCliente((prev) => ({
      rutinasMasVistas: [...prev.rutinasMasVistas, dias],
      totalVistas: prev.totalVistas + 1,
    }));
  }, []);

  const loginAdmin = useCallback(
    (credentials: LoginCredentials) => {
      const { username, password } = credentials;
      if (username === "admin11" && password === "soyadmin123") {
        setUserType("admin");
        return true;
      }
      return false;
    },
    [],
  );

  const loginCliente = useCallback(
    (credentials: LoginCredentials) => {
      const memberId = parseInt(credentials.memberId || "", 10);
      const miembro = clientes.find((m) => m.id === memberId);

      if (!miembro) {
        alert("ID de miembro no encontrado. Por favor verifica tu ID o contacta a recepción.");
        return false;
      }

      if (miembro.estado !== "Activo") {
        alert(`Tu membresía está ${miembro.estado.toLowerCase()}. Por favor contacta a recepción.`);
        return false;
      }

      setClienteActual(miembro);
      setUserType("cliente");
      return true;
    },
    [clientes],
  );

  const logout = useCallback(() => {
    setUserType(null);
    setClienteActual(null);
    setPreferenciasCliente({ rutinasMasVistas: [], totalVistas: 0 });
  }, []);

  const value = useMemo<GymContextValue>(
    () => ({
      userType,
      clienteActual,
      preferenciasCliente,
      empleados,
      equipos,
      gastos,
      clientes,
      cuotas,
      ingresosMensuales,
      ingresosAnuales,
      agregarEmpleado,
      modificarEmpleado,
      eliminarEmpleado,
      agregarEquipo,
      modificarEquipo,
      eliminarEquipo,
      agregarGasto,
      modificarGasto,
      eliminarGasto,
      agregarCliente,
      modificarCliente,
      eliminarCliente,
      agregarCuota,
      modificarCuota,
      registrarVistaRutina,
      loginAdmin,
      loginCliente,
      logout,
    }),
    [
      userType,
      clienteActual,
      preferenciasCliente,
      empleados,
      equipos,
      gastos,
      clientes,
      cuotas,
      agregarEmpleado,
      modificarEmpleado,
      eliminarEmpleado,
      agregarEquipo,
      modificarEquipo,
      eliminarEquipo,
      agregarGasto,
      modificarGasto,
      eliminarGasto,
      agregarCliente,
      modificarCliente,
      eliminarCliente,
      agregarCuota,
      modificarCuota,
      registrarVistaRutina,
      loginAdmin,
      loginCliente,
      logout,
    ],
  );

  return <GymContext.Provider value={value}>{children}</GymContext.Provider>;
}

export function useGym() {
  const context = useContext(GymContext);
  if (!context) {
    throw new Error("useGym debe usarse dentro de un GymProvider");
  }
  return context;
}
