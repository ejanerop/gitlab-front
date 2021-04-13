import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  form : FormGroup;

  constructor( private service : AuthService, private fb : FormBuilder, private router : Router ) {
    this.form = new FormGroup({});
    this.createForm();
  }

  createForm(){

    this.form = this.fb.group({
      name : ['', Validators.required],
      password : ['', [Validators.required, Validators.minLength(8)]],
    });

  }

  ngOnInit(): void {
  }

  login() {

    if (this.form.invalid) {
      Object.values(this.form.controls).forEach(ctrl => {
        ctrl.markAsTouched();
      });
      return;
    }

    console.log(this.form.value);

    this.service.login(this.form.value).subscribe((resp : any)=>{
      this.router.navigateByUrl('/home');
      this.service.saveInfo( resp.body.token, resp.body.user.name );
      console.log(resp);

    },error => {
      if (error.status == 422){
        //'Nombre de usuario y/o contraseña incorrectos'
      }else {
        //'Hubo un error con el servidor, pokeale a Andx o Eric'
      }
    });
  }

}
