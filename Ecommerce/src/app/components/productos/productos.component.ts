import { AfterViewInit, ChangeDetectionStrategy, Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator, MatPaginatorModule } from '@angular/material/paginator';
import { MatTableDataSource, MatTableModule } from '@angular/material/table';
import { HttpClientModule } from '@angular/common/http';
import { ProductosService } from '../../services/productos.service';
import { Producto } from '../../models/producto.model';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { AgregarProductoComponent } from './agregar-producto/agregar-producto.component';
import { EditarProductoComponent } from './editar-producto/editar-producto.component';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { MatRadioModule } from '@angular/material/radio';
import { RouterModule } from '@angular/router';
import { catchError } from 'rxjs/operators';
import { throwError } from 'rxjs';

@Component({
  standalone: true,
  selector: 'app-productos',
  templateUrl: './productos.component.html',
  styleUrls: ['./productos.component.css'],
  imports: [
    CommonModule,
    FormsModule,
    MatTableModule,
    MatPaginatorModule,
    MatRadioModule,
    HttpClientModule,
    RouterModule
  ],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class ProductosComponent implements OnInit, AfterViewInit {
  displayedColumns: string[] = ['nombre', 'descripcion', 'precio', 'cantidad', 'acciones'];
  dataSource = new MatTableDataSource<Producto>();
  filtroBusqueda: string = '';
  productos: Producto[] = [];

  @ViewChild(MatPaginator) paginator!: MatPaginator;

  constructor(
    private productosService: ProductosService,
    private modalService: NgbModal
  ) {}

  ngOnInit(): void {
    this.cargarProductos();
  }

  ngAfterViewInit(): void {
    this.dataSource.paginator = this.paginator;
  }

  cargarProductos(): void {
    this.productosService.obtenerProductos().subscribe(productos => {
      this.productos = productos;
      this.dataSource.data = productos;
      this.dataSource.filterPredicate = this.crearFiltroPersonalizado();
    }, error => {
      console.error('Error al cargar productos:', error);
    });
  }

  buscarProductos(): void {
    this.applyFilter(this.filtroBusqueda);
  }

  applyFilter(filtro: string): void {
    filtro = filtro.trim().toLowerCase();
    this.dataSource.filter = filtro;
  }

  crearFiltroPersonalizado(): (producto: Producto, filtro: string) => boolean {
    return (producto: Producto, filtro: string): boolean => {
      const dataStr = `${producto.nombre?.toLowerCase()} ${producto.descripcion?.toLowerCase()} ${producto.precio} ${producto.cantidad}`;
      return dataStr.indexOf(filtro) !== -1;
    };
  }

  abrirModalAgregar(): void {
    const modalRef = this.modalService.open(AgregarProductoComponent);
    modalRef.result.then((result) => {
      if (result) {
        const nuevoProducto = result;
        this.dataSource.data.push(nuevoProducto);
        this.dataSource.data = [...this.dataSource.data];
        this.applyFilter(this.filtroBusqueda);
      }
    }).catch((error) => {
      console.log('Modal cerrado con error:', error);
    });
  }

  abrirModalEditar(producto: Producto): void {
    const modalRef = this.modalService.open(EditarProductoComponent);
    modalRef.componentInstance.producto = producto;
    modalRef.result.then((edited) => {
      if (edited) {
        this.cargarProductos();
      }
    });
  }

  eliminarProducto(id: number): void {
    this.productosService.eliminarProducto(id).subscribe(() => {
      this.dataSource.data = this.dataSource.data.filter(p => p.id !== id);
    }, error => {
      console.error('Error al eliminar producto:', error);
    });
  }
}
