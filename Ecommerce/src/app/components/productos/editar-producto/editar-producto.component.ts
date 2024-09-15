import { Component, ElementRef, Input, OnInit, ViewChild } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { Producto } from '../../../models/producto.model';
import { ProductosService } from '../../../services/productos.service';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-editar-producto',
  templateUrl: './editar-producto.component.html',
  styleUrls: ['./editar-producto.component.css'],
  standalone: true, 
  imports: [
    CommonModule, 
    FormsModule, 
    ReactiveFormsModule
  ]
})
export class EditarProductoComponent implements OnInit {
  productoForm: FormGroup;
  @Input() producto!: Producto; 
  @ViewChild('modalContainer', { static: true }) modalContainer!: ElementRef;

  constructor(
    public activeModal: NgbActiveModal,
    private fb: FormBuilder,
    private productosService: ProductosService
  ) {
    this.productoForm = this.fb.group({
      nombre: ['', [Validators.required, Validators.maxLength(300)]],
      descripcion: ['', [Validators.required, Validators.maxLength(500)]],
      precio: ['', [Validators.required, Validators.min(0.01)]],
      cantidad: ['', [Validators.required, Validators.min(1)]]
    });
  }

  ngOnInit() {
    if (this.producto) {
      this.productoForm.patchValue({
        nombre: this.producto.nombre,
        descripcion: this.producto.descripcion,
        precio: this.producto.precio,
        cantidad: this.producto.cantidad
      });
    }
  }

  ngAfterViewInit(): void {
    if (this.modalContainer) {
      this.modalContainer.nativeElement.focus();
    }
  }

  guardar() {
    if (this.productoForm.invalid) {
      this.productoForm.markAllAsTouched();
      return;
    }

    const productoActualizado: Producto = {
      ...this.producto, 
      ...this.productoForm.value 
    };

    console.log('Datos del producto actualizado:', productoActualizado);
    this.productosService.guardarProducto(productoActualizado).subscribe(
      (producto: Producto) => {
        this.activeModal.close(producto);  
      },
      error => {
        console.error('Error al editar producto', error);
      }
    );
  }

  cancelar() {
    this.activeModal.dismiss();
  }
}
