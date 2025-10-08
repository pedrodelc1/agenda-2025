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

  openlogoutModal(){
    Swal.fire({
      title: "Do you want to save the changes?",
      showDenyButton: true,
      showConfirmButton: false,
      showCancelButton: true,
      confirmButtonText: "Cerrar sesión",
      denyButtonText: `Cerrar sesión`
    }).then((result) => {
      /* Read more about isConfirmed, isDenied below */
      if (result.isDenied) {
        this.authService.logout();
      }
    });
  }
}