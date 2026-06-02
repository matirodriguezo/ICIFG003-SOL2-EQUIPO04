export interface CategoriaProducto {
  id: number;
  nombre_categoria: string;
  descripcion: string;
}

export interface Producto {
  id: number;
  nombre: string;
  descripcion: string;
  precio: number;
  stock: number;
  imagen: string;
  categoria: CategoriaProducto;
}

export interface Cliente {
  id: number | null;
  rut: string;
  nombre: string;
  apellido: string;
  correo: string;
  telefono: string;
  direccion: string;
  fecha_registro: string;
}

export interface Carrito {
  id: number | null;
  fecha_creacion: string;
  total_carrito: number;
  cliente: { id: number };
}

export interface DetalleCarrito {
  id: number | null;
  cantidad: number;
  seleccionado: boolean;
  carrito: { id: number };
  producto: { id: number };
}
