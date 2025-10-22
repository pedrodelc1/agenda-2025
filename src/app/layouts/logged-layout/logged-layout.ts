import { Component, inject } from '@angular/core';
import { RouterLink, RouterOutlet } from '@angular/router';
import { AuthService } from '../../services/auth-service';
import Swal from 'sweetalert2'

@Component({
  selector: 'app-logged-layout',
  imports: [RouterOutlet, RouterLink],
  templateUrl: './logged-layout.html',
  styleUrl: './logged-layout.scss'
})
export class LoggedLayout {

  authService = inject(AuthService);

  openlogoutModal() {
    Swal.fire({
      title: '¿Seguro que querés cerrar sesión?',
      text: 'Tu sesión actual se cerrará.',
      icon: 'warning',
      background: '#0b1622', 
      color: '#fff',      
      showCancelButton: true,
      confirmButtonText: 'Sí, cerrar sesión',
      cancelButtonText: 'Cancelar',
      confirmButtonColor: '#097b9e',
      cancelButtonColor: 'grey',  
      customClass: {
        cancelButton: 'swal-cancel-button'
      },
    }).then(({ isConfirmed }) => {
      if (isConfirmed) {
        this.authService.logout();
        Swal.fire({
          title: 'Sesión cerrada',
          icon: 'success',
          background: '#0b1622',
          color: '#fff',
          confirmButtonColor: '#097b9e',
          timer: 1500,
          showConfirmButton: false
        });
      }
    });
  }
}