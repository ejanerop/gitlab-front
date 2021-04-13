import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ActivatedRoute, Router } from '@angular/router';
import { UserService } from 'src/app/services/user.service';
import { ValidatorService } from 'src/app/services/validator.service';

@Component({
  selector: 'app-user-edit',
  templateUrl: './user-edit.component.html',
  styleUrls: ['./user-edit.component.css']
})
export class UserEditComponent implements OnInit {

  id : string | null = null;
  form : FormGroup = new FormGroup({});

  constructor(
    private router : Router ,
    private fb : FormBuilder ,
    private route : ActivatedRoute ,
    private userService : UserService ,
    private snack : MatSnackBar ,
    private validators : ValidatorService
    ) {

      this.form = this.fb.group({
        'name' : ['', [Validators.required]],
        'email' : ['', [Validators.required]],
        'password' : ['', [Validators.required , Validators.minLength(8)]],
        'password_confirmation' : ['', [Validators.required , Validators.minLength(8)]],
        'token' : ['', [Validators.required , Validators.maxLength(30)]]
      }, {
        validators : this.validators.passMatch('password', 'password_confirmation')
      });
    }

    ngOnInit(): void {
      this.id = this.route.snapshot.paramMap.get('id');
      console.log(this.id);

      if (!(this.id == 'new' || this.id == null )) {
        this.userService.user(this.id).subscribe((resp : any) => {
          console.log(resp);
          this.form.get('password')?.setValidators(null);
          this.form.get('password')?.setValidators(Validators.minLength(8));
          this.form.get('password_confirmation')?.setValidators(null);
          this.form.get('password_confirmation')?.setValidators(Validators.minLength(8));
          this.form.reset({
            'name' : resp.body.name,
            'email' : resp.body.email,
            'token' : resp.body.gitlab_token
          });
        });
      }

    }

    back(){
      this.router.navigateByUrl('/user');
    }

    save(){

      if (this.form.invalid) {
        this.form.markAllAsTouched();
        return;
      }

      let data = this.form.value;

      console.log(data);


      if (this.id == 'new') {
        this.userService.createUser(data).subscribe(( resp : any ) => {
          this.router.navigateByUrl('/user');
          console.log(resp);
          this.openSnackBar(`Usuario ${data.name} creado correctamente` , 'Cerrar');
        }, error => {
          console.log(error.error.errors);
          if (error.error.errors.name) {
            this.form.get('name')?.setErrors({taken : true});
          }
          if (error.error.errors.email) {
            this.form.get('email')?.setErrors({taken : true});
          }
        });
      } else {
        data.id = this.id;

        this.userService.editUser(data).subscribe(( resp : any ) => {
          this.router.navigateByUrl('/user');
          this.openSnackBar(`Usuario ${data.name} editado correctamente` , 'Cerrar');
        }, error => {
          console.log(error.error.errors);
          if (error.error.errors.name) {
            this.form.get('name')?.setErrors({taken : true});
          }
          if (error.error.errors.email) {
            this.form.get('email')?.setErrors({taken : true});
          }
        });
      }
    }

    openSnackBar(message: string, action: string) {
      this.snack.open(message, action, {
        duration: 2000,
      });
    }

  }
