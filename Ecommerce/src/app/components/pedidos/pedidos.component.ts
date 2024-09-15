import { Component, OnInit } from '@angular/core';
import { Producto } from '../../models/producto.model';
import { Pedidos } from '../../models/pedidos.model';
import { ProductosService } from '../../services/productos.service';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { PedidosService } from '../../services/Pedidos.service';

import Swal from 'sweetalert2';  // Importamos SweetAlert2


@Component({
  standalone: true,
  selector: 'app-pedidos',
  templateUrl: './pedidos.component.html',
  styleUrls: ['./pedidos.component.css'],
  imports: [CommonModule, FormsModule]
})
export class PedidosComponent implements OnInit {

  productos: Producto[] = [];
  pedidos: Pedidos[] = [];
  cantidadesSeleccionadas: { [productoId: number]: number } = {};  // Objeto para almacenar las cantidades ingresadas por el usuario

  constructor(
    private pedidosService: PedidosService,
    private productosService: ProductosService
  ) { }

  ngOnInit(): void {
    this.cargarProductos();
    this.cargarPedidos();
  }

  cargarProductos(): void {
    this.productosService.obtenerProductos().subscribe(productos => {
      this.productos = productos;
    }, error => {
      console.error('Error al cargar productos:', error);
      this.mostrarError('Error al cargar productos');
    });
  }

  cargarPedidos(): void {
    this.pedidosService.obtenerTodosLosPedidos().subscribe(pedidos => {
      this.pedidos = pedidos;
    }, error => {
      console.error('Error al cargar pedidos:', error);
      this.mostrarError('Error al cargar pedidos');
    });
  }

  realizarPedido(producto: Producto): void {
    const cantidad = this.cantidadesSeleccionadas[producto.id] || 0;  // Obtenemos la cantidad seleccionada por el usuario

    if (cantidad < 1) {
      this.mostrarError('La cantidad debe ser mayor a 0');
      return;
    }

    const nuevoPedido: Pedidos = {
      id: 0,  // El ID será generado automáticamente por el backend
      fecha: new Date(),  // Fecha actual
      producto: producto,
      cantidad: cantidad,  // Usamos la cantidad seleccionada por el usuario
      total: producto.precio * cantidad
    };

    this.pedidosService.crearPedido(nuevoPedido).subscribe(
      (pedido) => {
        console.log('Pedido creado:', pedido);
        this.mostrarExito('Pedido realizado con éxito');
        this.cargarPedidos();  // Actualizar la lista de pedidos
      },
      (error) => {
        console.error('Error al crear el pedido:', error);
        this.mostrarError('Error al realizar el pedido');
      }
    );
  }

  // Eliminar un pedido
  eliminarPedido(id: number): void {
    Swal.fire({
      title: '¿Estás seguro?',
      text: 'No podrás deshacer esta acción',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Sí, eliminar',
      cancelButtonText: 'Cancelar'
    }).then((result) => {
      if (result.isConfirmed) {
        this.pedidosService.eliminarPedido(id).subscribe(() => {
          this.pedidos = this.pedidos.filter(pedido => pedido.id !== id);
          this.mostrarExito('Pedido eliminado con éxito');
        }, error => {
          console.error('Error al eliminar el pedido:', error);
          this.mostrarError('Error al eliminar el pedido');
        });
      }
    });
  }

  // Funciones para mostrar alertas amigables con SweetAlert2
  mostrarExito(mensaje: string): void {
    Swal.fire({
      icon: 'success',
      title: '¡Éxito!',
      text: mensaje,
      timer: 2000,
      showConfirmButton: false,
      toast: true,
      position: 'top-right'
    });
  }

  mostrarError(mensaje: string): void {
    Swal.fire({
      icon: 'error',
      title: '¡Error!',
      text: mensaje,
      timer: 3000,
      showConfirmButton: false,
      toast: true,
      position: 'top-right'
    });
  }
}
