import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { ProductosComponent } from "./components/productos/productos.component";
import { HttpClientModule } from '@angular/common/http';  

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, ProductosComponent, HttpClientModule], 
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']  
})
export class AppComponent {
  title = 'Ecommerce';
}
