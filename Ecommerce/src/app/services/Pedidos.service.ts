import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Pedidos } from '../models/pedidos.model';

@Injectable({
  providedIn: 'root'
})
export class PedidosService {
  private baseUrl = 'http://localhost:9000/api/pedidos'; 

  constructor(private http: HttpClient) {}

  obtenerTodosLosPedidos(): Observable<Pedidos[]> {
    return this.http.get<Pedidos[]>(`${this.baseUrl}`);
  }

  obtenerPedidoPorId(id: number): Observable<Pedidos> {
    return this.http.get<Pedidos>(`${this.baseUrl}/${id}`);
  }

  crearPedido(pedido: Pedidos): Observable<Pedidos> {
    return this.http.post<Pedidos>(`${this.baseUrl}`, pedido);
  }

  eliminarPedido(id: number): Observable<void> {
    return this.http.delete<void>(`${this.baseUrl}/${id}`);
  }

  obtenerPedidosPorFecha(fecha: Date): Observable<Pedidos[]> {
    const params = new HttpParams().set('fecha', fecha.toISOString());
    return this.http.get<Pedidos[]>(`${this.baseUrl}/fecha`, { params });
  }

  obtenerPedidosPorRangoDeFechas(fechaInicio: Date, fechaFin: Date): Observable<Pedidos[]> {
    const params = new HttpParams()
      .set('fechaInicio', fechaInicio.toISOString())
      .set('fechaFin', fechaFin.toISOString());
    return this.http.get<Pedidos[]>(`${this.baseUrl}/rango-fechas`, { params });
  }
  obtenerPedidosPorProducto(productoId: number): Observable<Pedidos[]> {
    return this.http.get<Pedidos[]>(`${this.baseUrl}/producto/${productoId}`);
  }

  obtenerPedidosConCantidadMayorA(cantidadMinima: number): Observable<Pedidos[]> {
    const params = new HttpParams().set('cantidadMinima', cantidadMinima.toString());
    return this.http.get<Pedidos[]>(`${this.baseUrl}/cantidad`, { params });
  }

  obtenerTotalVentasEnRangoDeFechas(fechaInicio: Date, fechaFin: Date): Observable<number> {
    const params = new HttpParams()
      .set('fechaInicio', fechaInicio.toISOString())
      .set('fechaFin', fechaFin.toISOString());
    return this.http.get<number>(`${this.baseUrl}/total-ventas`, { params });
  }
}
