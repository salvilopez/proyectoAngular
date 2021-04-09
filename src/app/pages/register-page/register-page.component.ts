import { Component, OnInit } from '@angular/core';
import { FormArray, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { MatSnackBar } from '@angular/material/snack-bar';

import { Subscription } from 'rxjs';
import { User } from 'src/app/models/user/user.model';
import { AuthService } from 'src/app/services/auth.service';
@Component({
  selector: 'app-register-page',
  templateUrl: './register-page.component.html',
  styleUrls: ['./register-page.component.scss'],
})
export class RegisterPageComponent implements OnInit {
  registerForm: FormGroup = new FormGroup({});
  authSubscription: Subscription = new Subscription();
  constructor(
    private formBuilder: FormBuilder,
    private router: Router,
    private auth: AuthService,
    private snackBar: MatSnackBar
  ) {}

  ngOnInit(): void {
    this.registerForm = this.formBuilder.group({
      email: ['', Validators.compose([Validators.required, Validators.email])],
      password: ['', Validators.compose([Validators.required])],
    });
  }
/**
 * Metodo de registro
 */
  submitRegisterForm() {
    if (
      this.registerForm.valid &&
      this.registerForm.value.email &&
      this.registerForm.value.password
    ) {
      let user: User = new User(
        this.registerForm.value.email,
        this.registerForm.value.password
      );
      this.authSubscription = this.auth.register(user).subscribe(
        (response) => {
          if (response.token) {
            this.snackBar.open(
              'Registro realizado con exito',
              `Token: ${response.token}`,
              {
                duration: 2000,
                horizontalPosition: 'center',
                verticalPosition: 'top',
              }
            );
            sessionStorage.setItem('Token', response.token);

            //añadimos el nombre de usuario al local storage
            localStorage.setItem('username', user.email);
            this.router.navigate(['/login']);
          }
        },
        (error) => {
          this.snackBar.open(
            'Fallo en el Registro, No llego el Token de respuesta',
            'Error: ' + error.status + ' : ' + error.message,
            {
              duration: 2000,
              horizontalPosition: 'center',
              verticalPosition: 'top',
            }
          );
          sessionStorage.removeItem('Token');
        }
      );
    } else {
      this.snackBar.open('Fallo en el registro , Algun campo invalido ', '', {
        duration: 2000,
        horizontalPosition: 'center',
        verticalPosition: 'top',
      });
    }
  }
  ngOnDestroy(): void {
    this.authSubscription.unsubscribe();
  }
}
