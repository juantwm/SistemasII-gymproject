// src/types/index.ts

export type UserType = "admin" | "recepcionista" | "cliente" | null;

export interface Empleado {
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

export interface Equipo {
  id: number;
  estado: "Activo" | "Inactivo" | "Mantenimiento";
  nombre: string;
  categoria: string;
  fechaIngreso: string;
  modelo: string;
  descripcion: string;
}

export interface Gasto {
  id: number;
  estado: "Activo" | "Inactivo";
  nroFactura: string;
  fecha: string;
  concepto: string;
  monto: number;
  categoria: string;
  observaciones: string;
}

export interface ClienteMiembro {
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

export interface Cuota {
  id: number;
  clienteId: number;
  clienteNombre: string;
  fechaPago: string;
  fechaVencimiento: string;
  monto: number;
  medioPago: string;
  estado: "Pagado" | "Pendiente" | "Vencido";
}

export interface PreferenciasCliente {
  rutinasMasVistas: number[];
  totalVistas: number;
}

export interface LoginCredentials {
  username?: string;
  password?: string;
  memberId?: string;
}