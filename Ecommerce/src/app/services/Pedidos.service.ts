import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Pedidos } from '../models/pedidos.model';

@Injectable({
  providedIn: 'root'
})
export class PedidosService {
  private baseUrl = 'http://localhost:9000/api/pedidos'; // Asegúrate de que la URL del backend sea correcta

  constructor(private http: HttpClient) {}

  // 1. Obtener todos los pedidos
  obtenerTodosLosPedidos(): Observable<Pedidos[]> {
    return this.http.get<Pedidos[]>(`${this.baseUrl}`);
  }

  // 2. Obtener un pedido por ID
  obtenerPedidoPorId(id: number): Observable<Pedidos> {
    return this.http.get<Pedidos>(`${this.baseUrl}/${id}`);
  }

  // 3. Crear un nuevo pedido
  crearPedido(pedido: Pedidos): Observable<Pedidos> {
    return this.http.post<Pedidos>(`${this.baseUrl}`, pedido);
  }

  // 4. Eliminar un pedido por ID
  eliminarPedido(id: number): Observable<void> {
    return this.http.delete<void>(`${this.baseUrl}/${id}`);
  }

  // 5. Buscar pedidos por fecha
  obtenerPedidosPorFecha(fecha: Date): Observable<Pedidos[]> {
    const params = new HttpParams().set('fecha', fecha.toISOString());
    return this.http.get<Pedidos[]>(`${this.baseUrl}/fecha`, { params });
  }

  // 6. Buscar pedidos por rango de fechas
  obtenerPedidosPorRangoDeFechas(fechaInicio: Date, fechaFin: Date): Observable<Pedidos[]> {
    const params = new HttpParams()
      .set('fechaInicio', fechaInicio.toISOString())
      .set('fechaFin', fechaFin.toISOString());
    return this.http.get<Pedidos[]>(`${this.baseUrl}/rango-fechas`, { params });
  }

  // 7. Buscar pedidos por producto
  obtenerPedidosPorProducto(productoId: number): Observable<Pedidos[]> {
    return this.http.get<Pedidos[]>(`${this.baseUrl}/producto/${productoId}`);
  }

  // 8. Buscar pedidos con cantidad mayor a un valor
  obtenerPedidosConCantidadMayorA(cantidadMinima: number): Observable<Pedidos[]> {
    const params = new HttpParams().set('cantidadMinima', cantidadMinima.toString());
    return this.http.get<Pedidos[]>(`${this.baseUrl}/cantidad`, { params });
  }

  // 9. Obtener el total de ventas en un rango de fechas
  obtenerTotalVentasEnRangoDeFechas(fechaInicio: Date, fechaFin: Date): Observable<number> {
    const params = new HttpParams()
      .set('fechaInicio', fechaInicio.toISOString())
      .set('fechaFin', fechaFin.toISOString());
    return this.http.get<number>(`${this.baseUrl}/total-ventas`, { params });
  }
}
