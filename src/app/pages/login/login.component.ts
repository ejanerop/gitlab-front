import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/services/auth.service';
import { UtilService } from 'src/app/services/util.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
})
export class LoginComponent {
  form: FormGroup;
  loading: boolean = false;

  constructor(
    private service: AuthService,
    private fb: FormBuilder,
    private util: UtilService,
    private router: Router
  ) {
    this.form = new FormGroup({});
    this.createForm();
  }

  createForm() {
    this.form = this.fb.group({
      name: ['', Validators.required],
      password: ['', [Validators.required]],
    });
  }

  openSnackBar(message: string, action: string) {
    this.util.openSnackBar(message, action);
  }

  login() {
    if (this.form.invalid) {
      Object.values(this.form.controls).forEach((ctrl) => {
        ctrl.markAsTouched();
      });
      return;
    }
    this.loading = true;
    this.service.login(this.form.value).subscribe(
      (resp: any) => {
        this.loading = false;
        this.router.navigateByUrl('/home');
        this.service.saveInfo(resp.body.token, resp.body.user.name);
        this.openSnackBar("You're loged", 'Close');
      },
      (error) => {
        if (error.status == 422) {
          this.loading = false;
          this.openSnackBar('Login information incorrect', 'Close');
          Object.values(this.form.controls).forEach((ctrl) => {
            ctrl.setErrors({ incorrect: true });
          });
        } else {
          this.loading = false;
          this.openSnackBar('Server error', 'Close');
        }
      }
    );
  }
}
