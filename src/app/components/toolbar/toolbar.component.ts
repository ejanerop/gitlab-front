import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/services/auth.service';
import { UtilService } from 'src/app/services/util.service';

@Component({
  selector: 'app-toolbar',
  templateUrl: './toolbar.component.html',
  styleUrls: ['./toolbar.component.css']
})
export class ToolbarComponent {

  constructor( private authService : AuthService, private util : UtilService, private router : Router ) { }

  login() {
    this.router.navigateByUrl('/login');
  }

  logout() {
    this.authService.logout().subscribe(( resp : any ) => {
      this.login();
      this.util.openSnackBar('Cierre de sesión exitoso', 'Cerrar');
    });
  }

  isAuth() {
    return this.authService.isAuth();
  }


}
