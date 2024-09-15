import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { Producto } from '../../../models/producto.model';
import { ProductosService } from '../../../services/productos.service';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms'; 
@Component({
  selector: 'app-agregar-producto',
  templateUrl: './agregar-producto.component.html',
  styleUrls: ['./agregar-producto.component.css'],
  standalone: true, 
  imports: [
    CommonModule, 
    FormsModule, 
    ReactiveFormsModule
  ]
})
export class AgregarProductoComponent implements OnInit {
  productoForm: FormGroup;
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

  ngOnInit() {}

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

    const nuevoProducto: Producto = this.productoForm.value;

    console.log('Datos del nuevo producto:', nuevoProducto);
    this.productosService.guardarProducto(nuevoProducto).subscribe(
      (producto: Producto) => {
        this.activeModal.close(producto);  
      },
      error => {
        console.error('Error al agregar producto', error);
      }
    );
  }

  cancelar() {
    this.activeModal.dismiss();
  }
}
