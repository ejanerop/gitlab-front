import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { UserService } from 'src/app/services/user.service';
import { UtilService } from 'src/app/services/util.service';
import { ValidatorService } from 'src/app/services/validator.service';

@Component({
  selector: 'app-user-edit',
  templateUrl: './user-edit.component.html',
})
export class UserEditComponent implements OnInit {
  loading: boolean = false;
  id: string | null = null;
  name: string = '';
  form: FormGroup = new FormGroup({});

  constructor(
    private router: Router,
    private fb: FormBuilder,
    private route: ActivatedRoute,
    private userService: UserService,
    private util: UtilService,
    private validators: ValidatorService
  ) {
    this.form = this.fb.group(
      {
        name: ['', [Validators.required]],
        email: ['', [Validators.required, Validators.email]],
        password: ['', [Validators.required, Validators.minLength(8)]],
        password_confirmation: [
          '',
          [Validators.required, Validators.minLength(8)],
        ],
        token: ['', [Validators.required, Validators.maxLength(30)]],
      },
      {
        validators: this.validators.passMatch(
          'password',
          'password_confirmation'
        ),
      }
    );
  }

  ngOnInit(): void {
    this.id = this.route.snapshot.paramMap.get('id');
    this.loading = true;
    if (!(this.id == 'new' || this.id == null)) {
      this.userService.user(this.id).subscribe(
        (resp: any) => {
          this.form.get('password')?.setValidators(null);
          this.form.get('password')?.setValidators(Validators.minLength(8));
          this.form.get('password_confirmation')?.setValidators(null);
          this.form
            .get('password_confirmation')
            ?.setValidators(Validators.minLength(8));
          this.name = resp.body.name;
          this.form.reset({
            name: resp.body.name,
            email: resp.body.email,
            token: resp.body.gitlab_token,
          });
          this.loading = false;
        },
        (error) => {
          this.loading = false;
          if (error.status == 0) {
            this.util.openSnackBar('Sin respuesta del servidor', 'Cerrar');
          } else if (error.status == 404) {
            this.util.openSnackBar('Usuario no encontrado', 'Cerrar');
            this.router.navigateByUrl('/user');
          } else {
            this.util.openSnackBar(error.error, 'Cerrar');
          }
        }
      );
    }
    this.loading = false;
  }

  get isNew() {
    return this.id == 'new' || this.id == null;
  }

  get emailError() {
    if (this.form.get('email')?.hasError('required')) {
      return 'El email es requerido';
    } else {
      return 'Introduce una direccion de correo válida';
    }
  }

  get passError() {
    if (this.form.get('password')?.hasError('required')) {
      return 'La contraseña es requerida';
    } else {
      return 'La contraseña debe contener al menos 8 caracteres';
    }
  }

  get passConfirmError() {
    if (this.form.get('password_confirm')?.hasError('notEqual')) {
      return 'Las confirmación de contraseña no coincide';
    } else if (this.form.get('password_confirm')?.hasError('minlength')) {
      return 'La contraseña debe contener al menos 8 caracteres';
    } else {
      return 'La confirmación de contraseña es requerida';
    }
  }

  back() {
    this.router.navigateByUrl('/user');
  }

  save() {
    if (this.form.invalid) {
      this.form.markAllAsTouched();
      return;
    }
    let data = this.form.value;

    if (this.id == 'new') {
      this.userService.createUser(data).subscribe(
        (resp: any) => {
          this.router.navigateByUrl('/user');
          this.util.openSnackBar(
            `Usuario ${data.name} creado correctamente`,
            'Cerrar'
          );
        },
        (error) => {
          if (error.status == 0) {
            this.util.openSnackBar('Sin respuesta del servidor', 'Cerrar');
          }
          if (error.error.errors.name) {
            this.form.get('name')?.setErrors({ taken: true });
          }
          if (error.error.errors.email) {
            this.form.get('email')?.setErrors({ taken: true });
          }
        }
      );
    } else {
      data.id = this.id;
      this.userService.editUser(data).subscribe(
        () => {
          this.router.navigateByUrl('/user');
          this.util.openSnackBar(
            `Usuario ${data.name} editado correctamente`,
            'Cerrar'
          );
        },
        (error) => {
          if (error.status == 0) {
            this.util.openSnackBar('Sin respuesta del servidor', 'Cerrar');
          }
          if (error.error.errors.name) {
            this.form.get('name')?.setErrors({ taken: true });
          }
          if (error.error.errors.email) {
            this.form.get('email')?.setErrors({ taken: true });
          }
        }
      );
    }
  }
}
