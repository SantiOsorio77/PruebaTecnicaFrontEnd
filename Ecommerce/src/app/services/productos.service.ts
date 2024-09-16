import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { Producto } from '../models/producto.model';

@Injectable({
  providedIn: 'root'
})
export class ProductosService {
  private apiUrl = 'http://localhost:9000/api/productos';  

  constructor(private http: HttpClient) { }

  obtenerProductos(): Observable<Producto[]> {
    return this.http.get<Producto[]>(this.apiUrl)
      .pipe(catchError(this.manejarError));
  }

  


  guardarProducto(producto: Producto): Observable<Producto> {
    return this.http.post<Producto>(this.apiUrl, producto)
      .pipe(catchError(this.manejarError));
  }
  
actualizarProducto(producto: Producto): Observable<Producto> {
  return this.http.put<Producto>(`${this.apiUrl}/${producto.id}`, producto)
    .pipe(
      catchError(this.manejarError)
    );
}

  eliminarProducto(id: number): Observable<void> {
    const url = `${this.apiUrl}/${id}`;
    return this.http.delete<void>(url)
      .pipe(catchError(this.manejarError));
  }

  obtenerProductosPaginados(precioMin: number, precioMax: number, pagina: number, tamano: number): Observable<Producto[]> {
    let params = new HttpParams()
      .set('precioMin', precioMin.toString())
      .set('precioMax', precioMax.toString())
      .set('pagina', pagina.toString())
      .set('tamano', tamano.toString());

    return this.http.get<Producto[]>(`${this.apiUrl}/paginados`, { params })
      .pipe(catchError(this.manejarError));
  }

  buscarProductos(keyword: string): Observable<Producto[]> {
    let params = new HttpParams().set('keyword', keyword);
    return this.http.get<Producto[]>(`${this.apiUrl}/buscar`, { params })
      .pipe(catchError(this.manejarError));
  }

  private manejarError(error: any) {
    console.error('Ocurrió un error:', error);
    return throwError(() => new Error('Algo salió mal. Intenta de nuevo más tarde.'));
  }
}
