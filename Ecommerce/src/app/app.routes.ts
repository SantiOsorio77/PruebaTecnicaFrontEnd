import { Routes } from '@angular/router';
import { ProductosComponent } from './components/productos/productos.component';
import { PedidosComponent } from './components/pedidos/pedidos.component';
import { HomeComponent } from './components/home/home/home.component';
export const routes: Routes = [
  {
    path:'', component: HomeComponent,
  },
  {
    path: 'productos', component: ProductosComponent  },
  {
    path:'pedidos',component: PedidosComponent
  },
 
];
