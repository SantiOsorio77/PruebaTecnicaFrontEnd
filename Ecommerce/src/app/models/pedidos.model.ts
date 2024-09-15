import { Producto } from './producto.model'; 

export interface Pedidos {
  id: number;
  fecha: Date;       
  producto: Producto; 
  cantidad: number;
  total: number;
}
