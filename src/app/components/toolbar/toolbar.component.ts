import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/services/auth.service';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-toolbar',
  templateUrl: './toolbar.component.html',
  styleUrls: ['./toolbar.component.css']
})
export class ToolbarComponent {

  constructor( private authService : AuthService , private router : Router ) { }

  login() {
    this.router.navigateByUrl('/login');
  }

  logout() {
    this.authService.logout().subscribe(( resp : any ) => {
      this.router.navigateByUrl('/home');
    });
  }

  isAuth() {
    return this.authService.isAuth();
  }

}
