import { AuthService } from 'src/app/services/auth.service';
import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { UtilService } from 'src/app/services/util.service';

@Component({
  selector: 'app-toolbar',
  templateUrl: './toolbar.component.html',
  styleUrls: ['./toolbar.component.css'],
})
export class ToolbarComponent {
  constructor(
    private authService: AuthService,
    private util: UtilService,
    private router: Router
  ) {}

  login() {
    this.router.navigateByUrl('/login');
  }

  logout() {
    this.authService.logout().subscribe(
      () => {
        this.login();
        this.util.openSnackBar('Cierre de sesión exitoso', 'Cerrar');
      },
      (error) => {
        console.error(error);
        if (error.status == 0) {
          this.util.openSnackBar('Sin respuesta desde el servidor.', 'Cerrar');
        } else {
          this.util.openSnackBar(error.error, 'Cerrar');
        }
      }
    );
  }

  isAuth() {
    return this.authService.isAuth();
  }
}
