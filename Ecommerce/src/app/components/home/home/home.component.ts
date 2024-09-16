import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { RouterLink, RouterLinkActive } from '@angular/router';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-home',
  standalone: true,
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css'],
  imports: [CommonModule, FormsModule, RouterLink, RouterLinkActive],
})
export class HomeComponent implements OnInit {
  userName: string = '';  
  password: string = ''; 
  isLoggedIn: boolean = false; 
  userRole: string = '';  

  constructor(private router: Router) {}

  ngOnInit(): void {
   
    const storedUser = localStorage.getItem('userName');
    const storedRole = localStorage.getItem('userRole');
    if (storedUser && storedRole) {
      this.userName = storedUser;
      this.userRole = storedRole;
      this.isLoggedIn = true;
    }
  }
  login(): void {
    if (this.userName && this.password) {
      if (
        (this.userName === 'admin' && this.password === 'admin123') ||
        (this.userName === 'user' && this.password === 'user123')
      ) {
        this.userRole = this.userName === 'admin' ? 'admin' : 'user';
        localStorage.setItem('userName', this.userName);
        localStorage.setItem('userRole', this.userRole);
        this.isLoggedIn = true;
        this.password = '';
  
        Swal.fire({
          icon: 'success',
          title: '¡Bienvenido!',
          text: `Has iniciado sesión como ${this.userRole}`,
          showConfirmButton: false,
          timer: 1500,
          position: 'center'
        });
      } else {
        Swal.fire({
          icon: 'error',
          title: 'Error',
          text: 'Nombre de usuario o contraseña incorrectos.',
          showConfirmButton: true,
          confirmButtonText: 'Reintentar',
          customClass: {
            confirmButton: 'btn btn-danger'
          }
        });
      }
    } else {
      Swal.fire({
        icon: 'warning',
        title: 'Campos vacíos',
        text: 'Por favor, ingrese nombre de usuario y contraseña.',
        showConfirmButton: true,
        confirmButtonText: 'Entendido',
        customClass: {
          confirmButton: 'btn btn-warning'
        }
      });
    }
  }
  

  logout(): void {
    localStorage.removeItem('userName');  
    localStorage.removeItem('userRole');  
    this.isLoggedIn = false;
    this.userName = '';
    this.userRole = '';
    this.router.navigate(['/']);
  }

  isAdmin(): boolean {
    return this.userRole === 'admin';
  }
}
